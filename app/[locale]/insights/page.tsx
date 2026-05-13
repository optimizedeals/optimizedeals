import { Metadata } from "next";
import { getAllArticles, getAllCategories, formatDate } from "@/lib/mdx";
import { authorSlug } from "@/lib/authors";
import { categorySlug, tagSlug } from "@/lib/slugify";
import { InsightsClient } from "./insights-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://optimize.deals";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Technical writing and engineering insights on frontend architecture, AI engineering, and performance optimization.",
  openGraph: {
    title: "Technical Insights",
    description:
      "Technical writing on frontend architecture, AI engineering, and performance optimization.",
    images: [
      {
        url: `${baseUrl}/api/og?path=insights`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals Technical Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Insights",
    description:
      "Technical writing on frontend architecture, AI engineering, and performance optimization.",
    images: [`${baseUrl}/api/og?path=insights`],
  },
};

interface InsightsPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    author?: string;
  }>;
}

export default async function InsightsPage({
  searchParams,
}: InsightsPageProps) {
  const params = await searchParams;
  const activeCategory = params.category;
  const activeTag = params.tag;
  const activeAuthor = params.author;

  const [allArticles, categories] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
  ]);

  const filtered = allArticles.filter((a) => {
    if (activeCategory && categorySlug(a.category) !== activeCategory)
      return false;
    if (activeTag && !a.tags.some((t) => tagSlug(t) === activeTag)) return false;
    if (activeAuthor && authorSlug(a.author) !== activeAuthor) return false;
    return true;
  });

  const hasFilters = Boolean(activeCategory || activeTag || activeAuthor);

  const articlesData = filtered.map((article) => ({
    ...article,
    formattedDate: formatDate(article.date),
  }));

  const featuredArticles = hasFilters
    ? []
    : allArticles
        .filter((a) => a.featured)
        .map((a) => ({ ...a, formattedDate: formatDate(a.date) }));

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
