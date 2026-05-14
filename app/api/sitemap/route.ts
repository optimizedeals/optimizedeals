import {
  getAllArticlesAcrossLocales,
  getArticleTranslations,
} from "@/lib/mdx";
import { STATIC_ROUTES } from "@/lib/site-routes";
import { localizedUrl } from "@/lib/seo";
import {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_META,
  type Locale,
} from "@/lib/i18n/config";
import { LEGAL_SLUGS } from "@/lib/legal";

/**
 * Sitemap generator. Exposed publicly via the rewrite in `next.config.ts`
 * mapping `/sitemap.xml` to this handler. We use a custom route instead
 * of Next's `app/sitemap.ts` metadata convention so we can:
 *
 *   1. Emit a `<?xml-stylesheet?>` processing instruction so Chrome
 *      120+ (which dropped its built-in XML tree viewer) renders the
 *      file as a readable HTML table via `/sitemap.xsl`. Crawlers
 *      ignore the stylesheet and parse the raw XML.
 *   2. Set `Content-Type: application/xml; charset=utf-8` explicitly.
 *   3. Skip the RSC `Vary` headers Next attaches to routed pages, which
 *      pollute downstream cache keys for crawlers.
 *
 * Hreflang model matches `lib/seo.buildSitemapEntries`: every URL
 * carries `<xhtml:link rel="alternate">` for each supported locale plus
 * `x-default`.
 */

const NONINDEXABLE_PATHS = new Set<string>(["/og-preview"]);

function isIndexable(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return !NONINDEXABLE_PATHS.has(normalized);
}

interface Entry {
  url: string;
  lastmod: string;
  changefreq?: string;
  priority?: number;
  alternates: Record<string, string>;
}

function alternatesFor(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of LOCALES) {
    out[LOCALE_META[locale].hreflang] = localizedUrl(locale, path);
  }
  out["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return out;
}

/**
 * Build alternates for a translated resource that has different paths per
 * locale. Only locales where `pathFor(locale)` returns a string get emitted,
 * so hreflang links never point at routes that 404. `x-default` falls back
 * to the default locale or, if missing there, to the first available locale.
 */
function alternatesForLocalized(
  pathFor: (locale: Locale) => string | null,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of LOCALES) {
    const p = pathFor(locale);
    if (p == null) continue;
    out[LOCALE_META[locale].hreflang] = localizedUrl(locale, p);
  }
  const xDefault =
    pathFor(DEFAULT_LOCALE) ??
    LOCALES.map(pathFor).find((p): p is string => p != null) ??
    null;
  if (xDefault != null) {
    const xDefaultLocale =
      pathFor(DEFAULT_LOCALE) != null
        ? DEFAULT_LOCALE
        : LOCALES.find((l) => pathFor(l) != null) ?? DEFAULT_LOCALE;
    out["x-default"] = localizedUrl(xDefaultLocale, xDefault);
  }
  return out;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderEntry(entry: Entry): string {
  const parts: string[] = ["  <url>"];
  parts.push(`    <loc>${escapeXml(entry.url)}</loc>`);
  for (const [hreflang, href] of Object.entries(entry.alternates)) {
    parts.push(
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`,
    );
  }
  parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
  if (entry.changefreq) {
    parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  }
  if (entry.priority !== undefined) {
    parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
  }
  parts.push("  </url>");
  return parts.join("\n");
}

export async function GET() {
  const now = new Date().toISOString();
  const entries: Entry[] = [];

  for (const route of STATIC_ROUTES) {
    if (!isIndexable(route.path)) continue;
    const path = `/${route.path}`;
    const alternates = alternatesFor(path);
    for (const locale of LOCALES) {
      entries.push({
        url: localizedUrl(locale, path),
        lastmod: now,
        changefreq: route.changeFrequency,
        priority: route.priority,
        alternates,
      });
    }
  }

  for (const slug of LEGAL_SLUGS) {
    const path = `/${slug}`;
    const alternates = alternatesFor(path);
    for (const locale of LOCALES) {
      entries.push({
        url: localizedUrl(locale, path),
        lastmod: now,
        changefreq: "yearly",
        priority: 0.3,
        alternates,
      });
    }
  }

  const articles = await getAllArticlesAcrossLocales();
  // De-dupe by translationKey so each article emits one entry per locale
  // it has a translation in, with alternates that only point at locales
  // where the translation actually exists.
  const articlesByKey = new Map<string, typeof articles>();
  for (const article of articles) {
    const list = articlesByKey.get(article.translationKey) ?? [];
    list.push(article);
    articlesByKey.set(article.translationKey, list);
  }
  for (const [translationKey] of articlesByKey) {
    const translations = await getArticleTranslations(translationKey);
    const pathFor = (locale: Locale): string | null => {
      const t = translations[locale];
      return t ? `/insights/${t.slug}` : null;
    };
    const alternates = alternatesForLocalized(pathFor);
    for (const locale of LOCALES) {
      const translated = translations[locale];
      if (!translated) continue;
      entries.push({
        url: localizedUrl(locale, `/insights/${translated.slug}`),
        lastmod: new Date(translated.date).toISOString(),
        changefreq: "monthly",
        priority: translated.featured ? 0.8 : 0.7,
        alternates,
      });
    }
  }

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...entries.map(renderEntry),
    `</urlset>`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
