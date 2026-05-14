import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

const CONTENT_DIR = path.join(process.cwd(), "content/insights");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export interface ArticleMeta {
  slug: string;
  /** ISO locale ("en-us" / "pt-br") the MDX body was authored in. */
  language: Locale;
  /**
   * Stable identity shared across locales. Translations of the same article
   * carry the same `translationKey` even though their `slug` differs. When the
   * frontmatter omits it, the loader falls back to the English source slug.
   */
  translationKey: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime: string;
  featured?: boolean;
  /** When true, the article is hidden from production builds. */
  dev?: boolean;
}

export interface Article extends ArticleMeta {
  content: string;
}

function readArticle(locale: Locale, file: string): Article | null {
  const filePath = path.join(CONTENT_DIR, locale, file);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const slug = file.replace(/\.mdx$/, "");
  const stats = readingTime(content);
  const translationKey =
    typeof data.translationKey === "string" && data.translationKey.length > 0
      ? data.translationKey
      : slug;

  return {
    slug,
    language: locale,
    translationKey,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || data.publishedAt || new Date().toISOString(),
    author: data.author || "OptimizeDeals Engineering",
    authorAvatar: data.authorAvatar,
    category: data.category || "Engineering",
    tags: data.tags || [],
    image: data.image,
    readingTime: stats.text,
    featured: data.featured || false,
    dev: data.dev === true,
    content,
  };
}

function readAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const out: Article[] = [];
  for (const locale of LOCALES) {
    const dir = path.join(CONTENT_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const article = readArticle(locale, file);
      if (!article) continue;
      if (IS_PRODUCTION && article.dev) continue;
      out.push(article);
    }
  }
  return out;
}

function stripContent({ content: _content, ...rest }: Article): ArticleMeta {
  void _content;
  return rest;
}

function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

interface LocaleOptions {
  locale: Locale;
}

/**
 * Return every article whose authoring language matches `locale`. The list
 * intentionally does *not* fall back across languages because the insights
 * index per locale shows only what was written in that locale; cross-locale
 * discovery happens through the article-level fallback below.
 */
export async function getAllArticles(
  options: LocaleOptions,
): Promise<ArticleMeta[]> {
  const filtered = readAllArticles().filter(
    (a) => a.language === options.locale,
  );
  return sortByDateDesc(filtered).map(stripContent);
}

/**
 * Return every article authored in *any* locale, sorted newest first. Used
 * for sitemap generation and cross-locale aware lookups.
 */
export async function getAllArticlesAcrossLocales(): Promise<ArticleMeta[]> {
  return sortByDateDesc(readAllArticles()).map(stripContent);
}

/**
 * Resolve an article by the URL slug visible inside `locale`.
 *
 * - Primary path: match `(language === locale, slug === slug)`. This is the
 *   only outcome that participates in `generateStaticParams`, the sitemap,
 *   and canonical metadata, because each locale owns its own translated slug.
 * - Defensive fallback: when a request hits a slug that does not exist in
 *   the active locale (e.g. someone shares a link across locales), try to
 *   resolve the same slug in any other locale. Such pages render with
 *   `noindex` so they cannot create duplicate-content issues.
 * - Returns `null` only when no locale carries the slug.
 */
export async function getArticleBySlug(
  slug: string,
  options: LocaleOptions,
): Promise<Article | null> {
  const all = readAllArticles();
  const direct = all.find(
    (a) => a.slug === slug && a.language === options.locale,
  );
  if (direct) return direct;
  return all.find((a) => a.slug === slug) ?? null;
}

/**
 * Group every locale variant of an article by its shared `translationKey`.
 * Used by route metadata to emit hreflang alternates that point only to
 * locales where the translation actually exists.
 */
export async function getArticleTranslations(
  translationKey: string,
): Promise<Partial<Record<Locale, ArticleMeta>>> {
  const out: Partial<Record<Locale, ArticleMeta>> = {};
  for (const article of readAllArticles()) {
    if (article.translationKey !== translationKey) continue;
    out[article.language] = stripContent(article);
  }
  return out;
}

/**
 * Returns the slug of the article in `locale` whose `translationKey` matches
 * the given one, or `null` when no translation exists there.
 */
export async function getTranslatedSlug(
  translationKey: string,
  locale: Locale,
): Promise<string | null> {
  const translations = await getArticleTranslations(translationKey);
  return translations[locale]?.slug ?? null;
}

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  tags: string[],
  options: LocaleOptions & { limit?: number },
): Promise<ArticleMeta[]> {
  const limit = options.limit ?? 3;
  const candidates = readAllArticles()
    .filter((a) => a.language === options.locale && a.slug !== currentSlug)
    .map(stripContent);

  const scored = candidates
    .map((article) => {
      let score = 0;
      if (article.category.toLowerCase() === category.toLowerCase()) score += 10;
      const matchingTags = article.tags.filter((tag) =>
        tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      );
      score += matchingTags.length * 5;
      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article }) => article);

  return scored;
}

export async function getLatestArticles(
  options: LocaleOptions & { limit?: number },
): Promise<ArticleMeta[]> {
  const limit = options.limit ?? 4;
  const articles = await getAllArticles(options);
  return articles.slice(0, limit);
}

export async function getAllCategories(
  options: LocaleOptions,
): Promise<string[]> {
  const articles = await getAllArticles(options);
  return Array.from(new Set(articles.map((a) => a.category)));
}

export async function getAllTags(options: LocaleOptions): Promise<string[]> {
  const articles = await getAllArticles(options);
  return Array.from(new Set(articles.flatMap((a) => a.tags)));
}

export function formatDate(date: string, locale: Locale = DEFAULT_LOCALE): string {
  const intlLocale = locale === "pt-br" ? "pt-BR" : "en-US";
  return new Date(date).toLocaleDateString(intlLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
