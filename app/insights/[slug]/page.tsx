import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getArticleBySlug, getAllArticles, getRelatedArticles, getLatestArticles, formatDate } from "@/lib/mdx"
import { ArticleLayout } from "@/components/blog/article-layout"
import { MDXContent } from "@/components/blog/mdx-content"

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

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: article.image ? [{ url: article.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
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

  return (
    <ArticleLayout
      title={article.title}
      description={article.description}
      date={formatDate(article.date)}
      author={article.author}
      category={article.category}
      tags={article.tags}
      readingTime={article.readingTime}
      image={article.image}
      relatedArticles={relatedArticles}
      latestArticles={latestArticles}
    >
      <MDXContent content={article.content} />
    </ArticleLayout>
  )
}
