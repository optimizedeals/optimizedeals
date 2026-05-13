import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getArticleBySlug, getAllArticles, getRelatedArticles, getLatestArticles, formatDate } from "@/lib/mdx"
import { ArticleLayout } from "@/components/blog/article-layout"
import { MDXContent } from "@/components/blog/mdx-content"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  // Generate dynamic OG image URL for this article with metadata params
  const ogParams = new URLSearchParams({
    title: article.title,
    description: article.description || '',
    category: article.category || '',
  })
  const ogImageUrl = `${baseUrl}/api/og?${ogParams.toString()}`

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    keywords: article.tags,
    alternates: {
      canonical: `${baseUrl}/insights/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `${baseUrl}/insights/${slug}`,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      section: article.category,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.category,
    article.tags,
    3
  )
  const latestArticles = await getLatestArticles(4)

  const articleUrl = `${baseUrl}/insights/${article.slug}`
  const ogImageUrl = `${baseUrl}/api/og?${new URLSearchParams({
    title: article.title,
    description: article.description || '',
    category: article.category || '',
  }).toString()}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: [ogImageUrl],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'OptimizeDeals',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-white.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: article.category,
    keywords: article.tags?.join(', '),
  }

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
        date={formatDate(article.date)}
        author={article.author}
        authorAvatar={article.authorAvatar}
        category={article.category}
        tags={article.tags}
        readingTime={article.readingTime}
        image={article.image}
        relatedArticles={relatedArticles}
        latestArticles={latestArticles}
      >
        <MDXContent content={article.content} />
      </ArticleLayout>
    </>
  )
}
