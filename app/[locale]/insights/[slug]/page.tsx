import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getArticleBySlug,
  getAllArticlesAcrossLocales,
  getArticleTranslations,
  getRelatedArticles,
  getLatestArticles,
  formatDate,
} from "@/lib/mdx";
import { ArticleLayout } from "@/components/blog/article-layout";
import { MDXContent } from "@/components/blog/mdx-content";
import { SITE_URL } from "@/lib/env";
import {
  buildLocaleMetadata,
  localizedUrl,
  buildOgImageUrl,
} from "@/lib/seo";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import type { ArticleTranslationAlternate } from "@/components/blog/article-translations";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  // Each (locale, slug) pair is only pre-rendered for the locale that
  // actually owns a translation under that slug. Cross-locale requests fall
  // back at runtime through `getArticleBySlug`, which redirects when the
  // current locale has a real translation and renders `noindex` otherwise.
  const articles = await getAllArticlesAcrossLocales();
  return articles.map((article) => ({
    locale: article.language,
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const localeTyped = locale as Locale;
  const article = await getArticleBySlug(slug, { locale: localeTyped });

  if (!article) {
    const t = await getTranslations({ locale, namespace: "insights.article" });
    return {
      title: t("notFound"),
      robots: { index: false, follow: false },
    };
  }

  const translations = await getArticleTranslations(article.translationKey);
  const pathForLocale = (l: Locale): string | null => {
    if (l === localeTyped) return `/insights/${slug}`;
    const translated = translations[l];
    return translated ? `/insights/${translated.slug}` : null;
  };

  const ogImage = buildOgImageUrl(localeTyped, {
    title: article.title,
    description: article.description,
    category: article.category,
  });

  // When the article only exists in another locale, the current URL is
  // serving a body in a foreign language. Mark it unindexable to prevent
  // duplicate-content penalties while keeping the page reachable.
  const unindexable =
    article.language !== localeTyped && !translations[localeTyped];

  return buildLocaleMetadata({
    locale: localeTyped,
    path: pathForLocale,
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
  const localeTyped = locale as Locale;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug, { locale: localeTyped });
  if (!article) notFound();

  // When a foreign-locale slug is requested but a real translation exists
  // for the active locale, redirect to the canonical localized slug so
  // there is exactly one indexable URL per (locale, article) pair.
  if (article.language !== localeTyped) {
    const translations = await getArticleTranslations(article.translationKey);
    const localized = translations[localeTyped];
    if (localized && localized.slug !== slug) {
      redirect(`/${localeTyped}/insights/${localized.slug}`);
    }
  }

  // Resolve every locale that publishes a real translation of this article,
  // then strip the article's own authoring language so the UI lists *other*
  // available languages. Driven by `translationKey` so adding a new locale
  // only requires content + a config entry — no UI changes.
  const translations = await getArticleTranslations(article.translationKey);
  const translationAlternates: ArticleTranslationAlternate[] = LOCALES
    .filter((l) => l !== article.language)
    .map((l) => {
      const translated = translations[l];
      return translated ? { locale: l, slug: translated.slug } : null;
    })
    .filter((entry): entry is ArticleTranslationAlternate => entry !== null);

  // Related uses the article's authoring locale so suggestions stay
  // readable in the same language as the article body, regardless of the
  // interface locale.
  const [relatedArticles, latestArticles] = await Promise.all([
    getRelatedArticles(
      article.slug,
      article.category,
      article.tags,
      { locale: article.language, limit: 3 },
    ),
    getLatestArticles({
      locale: localeTyped,
      limit: 4,
    }),
  ]);

  const articleUrl = localizedUrl(localeTyped, `/insights/${article.slug}`);
  const ogImageUrl = buildOgImageUrl(localeTyped, {
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
        date={formatDate(article.date, localeTyped)}
        author={article.author}
        authorAvatar={article.authorAvatar}
        category={article.category}
        tags={article.tags}
        readingTime={article.readingTime}
        image={article.image}
        articleLanguage={article.language}
        interfaceLocale={localeTyped}
        translationAlternates={translationAlternates}
        relatedArticles={relatedArticles}
        latestArticles={latestArticles}
      >
        <MDXContent content={article.content} />
      </ArticleLayout>
    </>
  );
}
