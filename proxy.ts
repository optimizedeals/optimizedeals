import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./lib/i18n/config";
import { detectLocale } from "./lib/i18n/detect";

/**
 * Edge proxy (Next.js 16+ name for middleware).
 *
 * Responsibilities, in order:
 *   1. Bypass everything that must never receive a locale prefix:
 *      Next.js internals, API endpoints, file-shaped public assets, and
 *      crawler-targeted system files (sitemap.xml, robots.txt, llm.txt).
 *   2. On the bare root path only, perform geo + Accept-Language
 *      detection and 307-redirect to the right locale. Internal pages
 *      keep whatever locale prefix the user typed.
 *   3. Hand off to next-intl's middleware for cookie rotation,
 *      Link-header alternates, and missing-prefix insertion.
 *
 * The matcher itself is broad on purpose; the bypass list below is the
 * single source of truth for what skips the i18n layer.
 */

/**
 * Exact-match system files that must serve raw from Next's metadata
 * routes / public/. They live at the site root, never under a locale.
 */
const SYSTEM_FILES = new Set<string>([
  "/sitemap.xml",
  "/robots.txt",
  "/llm.txt",
  "/llms.txt",
  "/manifest.webmanifest",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon.svg",
  "/icon.svg",
  "/apple-touch-icon.png",
  "/opensearch.xml",
  "/.well-known/security.txt",
]);

/**
 * Extension allow-list for files that must pass through untouched. The
 * matcher already trims most of these, but keeping the check explicit
 * here protects us from matcher regressions.
 */
const PASSTHROUGH_EXT = /\.(?:xml|xsl|txt|json|map|webmanifest|woff2?|ttf|otf|ico|png|jpe?g|gif|webp|svg|avif|mp4|webm|mp3|wav|pdf)$/i;

function shouldBypass(pathname: string): boolean {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname === "/api"
  ) {
    return true;
  }
  if (SYSTEM_FILES.has(pathname)) return true;
  // Anything that looks like a file (has an extension) is treated as a
  // static asset and bypassed. The locale prefix only applies to HTML
  // pages.
  if (PASSTHROUGH_EXT.test(pathname)) return true;
  return false;
}

const intlMiddleware = createIntlMiddleware(routing);

function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export default function proxy(request: NextRequest): Response | undefined {
  const { pathname } = request.nextUrl;

  // System files (sitemap.xml, robots.txt, llm.txt, assets) must not be
  // localized. Return early so next-intl never sees them.
  if (shouldBypass(pathname)) return undefined;

  // Only the bare root performs geo-aware locale detection. Internal
  // pages accept whatever locale prefix the user typed.
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const detected = detectLocale(request.headers, cookieLocale);
    const url = request.nextUrl.clone();
    url.pathname = `/${detected}`;
    const response = NextResponse.redirect(url, 307);
    response.cookies.set(LOCALE_COOKIE, detected, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    // Honest signal to caches that the redirect target depends on
    // request headers (cookie + IP geo). Prevents shared caches from
    // pinning a single locale for everyone.
    response.headers.set("Vary", "Cookie, Accept-Language");
    if (detected !== DEFAULT_LOCALE) {
      response.headers.set("X-Locale-Detection", "header-or-geo");
    }
    return response;
  }

  const response = intlMiddleware(request);

  // Persist the active locale as a cookie so the switcher and future
  // visits remember the choice. next-intl already does this on explicit
  // changes; doing it on first visits with no cookie keeps the contract
  // uniform.
  if (pathnameHasLocale(pathname)) {
    const seg = pathname.split("/")[1];
    if (seg && (LOCALES as readonly string[]).includes(seg)) {
      response.cookies.set(LOCALE_COOKIE, seg, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  // Run on everything except Next internals + obvious assets. The
  // `shouldBypass` check inside `proxy` is the real arbiter; the matcher
  // is just a performance hint.
  matcher: [
    "/((?!_next/static|_next/image|_next/data|favicon\\.ico|.*\\.(?:xml|xsl|txt|json|map|webmanifest|woff2?|ttf|otf|ico|png|jpe?g|gif|webp|svg|avif|mp4|webm|mp3|wav|pdf)).*)",
  ],
};
