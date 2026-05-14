import type { Metadata } from "next";
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/**
 * Centralized multilingual SEO helpers.
 *
 * Every page should derive its canonical URL, alternates, and OG block
 * from these helpers — never hand-roll them. They guarantee:
 *
 *  - self-referencing canonicals (no cross-language canonicals)
 *  - hreflang alternates for every supported locale
 *  - x-default pointing at the default locale
 *  - locale-aware OG URLs and `og:locale` / `og:locale:alternate`
 *
 * The functions are pure; safe to call inside `generateMetadata`,
 * `sitemap.ts`, or anywhere else.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimize.deals";

export type LocalePathBuilder = (locale: Locale) => string;

/**
 * Normalize an internal path: ensures a leading slash, no trailing slash
 * (except for the root), and no duplicate slashes.
 */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const cleaned = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return cleaned;
}

/**
 * Build a fully-qualified URL for a path inside a given locale.
 * Example: `localizedUrl("pt-br", "/insights/foo")` → `https://.../pt-br/insights/foo`.
 * For the locale root (path === "/" or ""), returns `.../<locale>`.
 */
export function localizedUrl(locale: Locale, path: string = "/"): string {
  const normalized = normalizePath(path);
  if (normalized === "/") return `${SITE_URL}/${locale}`;
  return `${SITE_URL}/${locale}${normalized}`;
}

/**
 * Construct the `alternates` block for a page. Produces:
 *  - canonical: self-referencing URL for the current locale
 *  - languages: { "en-US": ..., "pt-BR": ..., "x-default": ... }
 *
 * `buildPath` lets the caller emit different paths per locale when the
 * route slug itself differs across languages (e.g. localized article
 * slugs). For most pages, the same path is shared and you can pass a
 * plain string.
 */
export function buildAlternates(
  currentLocale: Locale,
  pathOrBuilder: string | LocalePathBuilder,
): NonNullable<Metadata["alternates"]> {
  const resolve = (locale: Locale) =>
    typeof pathOrBuilder === "function" ? pathOrBuilder(locale) : pathOrBuilder;

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_META[locale].hreflang] = localizedUrl(
      locale,
      resolve(locale),
    );
  }
  languages["x-default"] = localizedUrl(
    DEFAULT_LOCALE,
    resolve(DEFAULT_LOCALE),
  );

  return {
    canonical: localizedUrl(currentLocale, resolve(currentLocale)),
    languages,
  };
}

/**
 * Build a locale-aware OG image URL.
 */
export function buildOgImageUrl(
  locale: Locale,
  params: { title?: string; description?: string; category?: string; path?: string } = {},
): string {
  const url = new URL(`${SITE_URL}/api/og`);
  url.searchParams.set("locale", locale);
  if (params.path) url.searchParams.set("path", params.path);
  if (params.title) url.searchParams.set("title", params.title);
  if (params.description)
    url.searchParams.set("description", params.description);
  if (params.category) url.searchParams.set("category", params.category);
  return url.toString();
}

interface LocaleMetadataInput {
  locale: Locale;
  path: string | LocalePathBuilder;
  title: string;
  description: string;
  /** Optional OG-specific overrides. Falls back to title/description. */
  openGraph?: {
    title?: string;
    description?: string;
    type?: "website" | "article";
    images?: NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;
    publishedTime?: string;
    authors?: string[];
  };
  keywords?: string[];
  robots?: Metadata["robots"];
  /**
   * Set to true when the current locale serves content authored in another
   * language (e.g. en-us-only article rendered under a pt-br URL). Adds
   * `noindex` to avoid duplicate-content penalties while keeping the page
   * reachable.
   */
  unindexable?: boolean;
}

/**
 * One-stop helper that returns a complete locale-aware Metadata object.
 * Use inside `generateMetadata` to keep every page consistent.
 */
export function buildLocaleMetadata(input: LocaleMetadataInput): Metadata {
  const {
    locale,
    path,
    title,
    description,
    openGraph,
    keywords,
    robots,
    unindexable,
  } = input;

  const resolvedPath = typeof path === "function" ? path(locale) : path;
  const alternates = buildAlternates(locale, path);
  const canonical =
    typeof alternates.canonical === "string"
      ? alternates.canonical
      : (alternates.canonical?.toString() ?? localizedUrl(locale));

  const meta: Metadata = {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      type: openGraph?.type ?? "website",
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale,
      ),
      url: canonical,
      title: openGraph?.title ?? title,
      description: openGraph?.description ?? description,
      siteName: "OptimizeDeals",
      images: openGraph?.images ?? [
        {
          url: buildOgImageUrl(locale, {
            title: openGraph?.title ?? title,
            description: openGraph?.description ?? description,
            path: resolvedPath,
          }),
          width: 1200,
          height: 630,
          alt: openGraph?.title ?? title,
        },
      ],
      ...(openGraph?.type === "article" && openGraph.publishedTime
        ? { publishedTime: openGraph.publishedTime }
        : {}),
      ...(openGraph?.authors ? { authors: openGraph.authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: openGraph?.title ?? title,
      description: openGraph?.description ?? description,
      images: [
        buildOgImageUrl(locale, {
          title: openGraph?.title ?? title,
          description: openGraph?.description ?? description,
          path: resolvedPath,
        }),
      ],
    },
    robots:
      robots ??
      (unindexable
        ? { index: false, follow: true }
        : {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              "max-video-preview": -1,
              "max-image-preview": "large",
              "max-snippet": -1,
            },
          }),
  };

  return meta;
}

/**
 * Build a sitemap entry with per-locale alternate refs. Pass an array
 * of locales the resource exists in; entries are emitted only for those
 * locales but `alternates.languages` covers every available variant so
 * crawlers can discover them.
 */
export function buildSitemapEntries(args: {
  /** Locales the resource is published in. Defaults to all supported. */
  locales?: Locale[];
  /** Path resolver, called per locale. Return null to skip a locale. */
  path: (locale: Locale) => string | null;
  lastModified?: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}): import("next").MetadataRoute.Sitemap {
  const targetLocales = args.locales ?? [...LOCALES];

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    const p = args.path(locale);
    if (p == null) continue;
    languages[LOCALE_META[locale].hreflang] = localizedUrl(locale, p);
  }
  const xDefaultPath = args.path(DEFAULT_LOCALE);
  if (xDefaultPath != null) {
    languages["x-default"] = localizedUrl(DEFAULT_LOCALE, xDefaultPath);
  }

  return targetLocales
    .map((locale) => {
      const p = args.path(locale);
      if (p == null) return null;
      return {
        url: localizedUrl(locale, p),
        lastModified: args.lastModified,
        changeFrequency: args.changeFrequency,
        priority: args.priority,
        alternates: { languages },
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}
