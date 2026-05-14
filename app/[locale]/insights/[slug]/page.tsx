import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getArticleBySlug,
  getAllArticlesAcrossLocales,
  getRelatedArticles,
  getLatestArticles,
  formatDate,
} from "@/lib/mdx";
import { ArticleLayout } from "@/components/blog/article-layout";
import { MDXContent } from "@/components/blog/mdx-content";
import {
  buildLocaleMetadata,
  localizedUrl,
  buildOgImageUrl,
  SITE_URL,
} from "@/lib/seo";
import { LOCALES, type Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  // Static-generate every (locale, slug) pair. Slugs are shared across
  // locales: if an article does not exist in a given locale we still
  // render the same URL there and surface the only-language banner.
  const articles = await getAllArticlesAcrossLocales();
  const slugs = Array.from(new Set(articles.map((a) => a.slug)));
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, { locale: locale as Locale });

  if (!article) {
    const t = await getTranslations({ locale, namespace: "insights.article" });
    return {
      title: t("notFound"),
      robots: { index: false, follow: false },
    };
  }

  const path = `/insights/${slug}`;
  const ogImage = buildOgImageUrl(locale as Locale, {
    title: article.title,
    description: article.description,
    category: article.category,
  });

  // When the article only exists in another locale, mark unindexable to
  // avoid duplicate-content penalties while keeping the page reachable.
  const unindexable = article.language !== (locale as Locale);

  return buildLocaleMetadata({
    locale: locale as Locale,
    path,
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    keywords: article.tags,
    unindexable,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug, { locale: locale as Locale });
  if (!article) notFound();

  // Related uses the article's authoring locale so suggestions stay
  // readable in the same language as the article body, regardless of the
  // interface locale.
  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.category,
    article.tags,
    { locale: article.language, limit: 3 },
  );
  const latestArticles = await getLatestArticles({
    locale: locale as Locale,
    limit: 4,
  });

  const articleUrl = localizedUrl(locale as Locale, `/insights/${article.slug}`);
  const ogImageUrl = buildOgImageUrl(locale as Locale, {
    title: article.title,
    description: article.description,
    category: article.category,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [ogImageUrl],
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: article.language === "pt-br" ? "pt-BR" : "en-US",
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "OptimizeDeals",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-white.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: article.category,
    keywords: article.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        slug={article.slug}
        title={article.title}
        description={article.description}
        date={formatDate(article.date, locale as Locale)}
        author={article.author}
        authorAvatar={article.authorAvatar}
        category={article.category}
        tags={article.tags}
        readingTime={article.readingTime}
        image={article.image}
        articleLanguage={article.language}
        interfaceLocale={locale as Locale}
        relatedArticles={relatedArticles}
        latestArticles={latestArticles}
      >
        <MDXContent content={article.content} />
      </ArticleLayout>
    </>
  );
}
