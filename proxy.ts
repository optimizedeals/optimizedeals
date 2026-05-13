import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./lib/i18n/config";
import { detectLocale } from "./lib/i18n/detect";

/**
 * Edge proxy (Next.js 16+ name for middleware).
 *
 * Responsibilities, in order:
 *   1. Skip excluded paths (API, _next, monitoring).
 *   2. Route LLM-shaped requests (`*.md`, `Accept: text/markdown`, known bot
 *      user-agents) to /api/geo for the Markdown-friendly response. These
 *      requests bypass locale handling because LLM consumers do not care.
 *   3. For all other paths, delegate to next-intl's middleware so that:
 *      - the locale segment is always present in the URL,
 *      - locale detection runs only at the root level,
 *      - the NEXT_LOCALE cookie persists user choice,
 *      - alternate-locale URLs Link-header annotations are emitted.
 *
 * The geo-based locale preference (Vercel x-vercel-ip-country) is applied
 * only for the bare root path. See `detectLocale()` for the resolution
 * order; we never auto-redirect internal pages by IP.
 */

const INTERNAL_FETCH_HEADER = "x-llm-internal-fetch";
const GEO_ROUTE = "/api/geo";

const EXCLUDE_PATHS = ["/api/*", "/_next/*", "/monitoring*"];

const BOT_USER_AGENTS = [
  "ChatGPT-User",
  "ClaudeBot",
  "GPTBot",
  "PerplexityBot",
  "Applebot-Extended",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "cohere-ai",
  "Claude-SearchTool",
];

function isExcluded(pathname: string): boolean {
  for (const pattern of EXCLUDE_PATHS) {
    if (pattern.endsWith("*")) {
      if (pathname.startsWith(pattern.slice(0, -1))) return true;
    } else if (pathname === pattern) {
      return true;
    }
  }
  return false;
}

function parseAcceptMarkdown(accept: string): number {
  for (const part of accept.split(",").map((s) => s.trim())) {
    const [mediaType, ...params] = part.split(";").map((s) => s.trim());
    if (mediaType?.toLowerCase() === "text/markdown") {
      const qParam = params.find((p) => p.startsWith("q="));
      if (qParam) {
        const q = parseFloat(qParam.slice(2));
        return isNaN(q) ? 1 : q;
      }
      return 1;
    }
  }
  return 0;
}

function detectLlmSignal(
  pathname: string,
  accept: string | null,
  userAgent: string | null,
): { targetPath: string } | null {
  if (pathname.endsWith(".md")) {
    return { targetPath: pathname.slice(0, -3) || "/" };
  }

  if (accept && parseAcceptMarkdown(accept) > 0) {
    return { targetPath: pathname };
  }

  if (userAgent) {
    for (const bot of BOT_USER_AGENTS) {
      if (userAgent.includes(bot)) {
        return { targetPath: pathname };
      }
    }
  }

  return null;
}

const intlMiddleware = createIntlMiddleware(routing);

function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export default function proxy(request: NextRequest): Response | undefined {
  if (request.headers.get(INTERNAL_FETCH_HEADER)) return undefined;

  const { pathname } = request.nextUrl;
  if (isExcluded(pathname)) return undefined;

  // LLM-shaped requests: keep the original behavior, bypass locale handling.
  const accept = request.headers.get("accept");
  const userAgent = request.headers.get("user-agent");
  const signal = detectLlmSignal(pathname, accept, userAgent);

  if (signal) {
    const url = request.nextUrl.clone();
    url.pathname = GEO_ROUTE;
    url.searchParams.set("path", signal.targetPath);

    const response = NextResponse.rewrite(url, {
      request: {
        headers: new Headers({
          ...Object.fromEntries(request.headers),
          "x-llm-target-path": signal.targetPath,
        }),
      },
    });

    response.headers.set("Vary", "Accept, User-Agent");
    return response;
  }

  // Only the bare root performs geo-aware locale detection. Internal pages
  // accept whatever locale prefix the user typed and stay there.
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const detected = detectLocale(request.headers, cookieLocale);
    if (detected !== DEFAULT_LOCALE || cookieLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${detected}`;
      const response = NextResponse.redirect(url);
      response.cookies.set(LOCALE_COOKIE, detected, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
      return response;
    }
  }

  // If the path is missing a locale (any non-root URL), let next-intl insert
  // the default; otherwise just let next-intl handle pass-through, cookie
  // rotation, and Link-header alternate annotations.
  const response = intlMiddleware(request);

  // Persist the active locale as a cookie so the switcher and future visits
  // remember the choice. next-intl will already do this on explicit changes,
  // but doing it for first visits with no cookie keeps the contract uniform.
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
  // Match everything except: Next internals, static assets, OG endpoint, geo
  // endpoint. The locale handling is performed inside `proxy` so we still see
  // every request that could land on a localizable route.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/og|api/geo).*)"],
};
