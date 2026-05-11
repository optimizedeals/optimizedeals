import { Metadata } from "next"
import { getAllArticles, getAllCategories, formatDate } from "@/lib/mdx"
import { InsightsClient } from "./insights-client"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'

export const metadata: Metadata = {
  title: "Insights",
  description: "Technical writing and engineering insights on frontend architecture, AI engineering, and performance optimization.",
  openGraph: {
    title: "Technical Insights",
    description: "Technical writing on frontend architecture, AI engineering, and performance optimization.",
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
    description: "Technical writing on frontend architecture, AI engineering, and performance optimization.",
    images: [`${baseUrl}/api/og?path=insights`],
  },
}

export default async function InsightsPage() {
  const articles = await getAllArticles()
  const categories = await getAllCategories()

  // Transform articles for client component
  const articlesData = articles.map((article) => ({
    ...article,
    formattedDate: formatDate(article.date),
  }))

  return <InsightsClient articles={articlesData} categories={categories} />
}
