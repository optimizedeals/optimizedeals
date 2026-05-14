import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllArticles, getAllCategories, formatDate } from "@/lib/mdx";
import { authorSlug } from "@/lib/authors";
import { categorySlug, tagSlug } from "@/lib/slugify";
import { buildLocaleMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { InsightsClient } from "./insights-client";

interface InsightsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    tag?: string;
    author?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.insights" });
  return buildLocaleMetadata({
    locale: locale as Locale,
    path: "/insights",
    title: t("title"),
    description: t("description"),
  });
}

export default async function InsightsPage({
  params,
  searchParams,
}: InsightsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const search = await searchParams;
  const activeCategory = search.category;
  const activeTag = search.tag;
  const activeAuthor = search.author;

  const [allArticles, categories] = await Promise.all([
    getAllArticles({ locale: locale as Locale }),
    getAllCategories({ locale: locale as Locale }),
  ]);

  const filtered = allArticles.filter((a) => {
    if (activeCategory && categorySlug(a.category) !== activeCategory) {
      return false;
    }
    if (activeTag && !a.tags.some((t) => tagSlug(t) === activeTag))
      return false;
    if (activeAuthor && authorSlug(a.author) !== activeAuthor) return false;
    return true;
  });

  const hasFilters = Boolean(activeCategory || activeTag || activeAuthor);

  const articlesData = filtered.map((article) => ({
    ...article,
    formattedDate: formatDate(article.date, locale as Locale),
  }));

  const featuredArticles = hasFilters
    ? []
    : allArticles
        .filter((a) => a.featured)
        .map((a) => ({
          ...a,
          formattedDate: formatDate(a.date, locale as Locale),
        }));

  return (
    <InsightsClient
      articles={articlesData}
      featuredArticles={featuredArticles}
      categories={categories}
      activeCategory={activeCategory ?? null}
      activeTag={activeTag ?? null}
      activeAuthor={activeAuthor ?? null}
      totalArticles={allArticles.length}
    />
  );
}
