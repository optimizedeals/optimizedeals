import { Metadata } from "next"
import { getAllArticles, getAllCategories, formatDate } from "@/lib/mdx"
import { InsightsClient } from "./insights-client"

export const metadata: Metadata = {
  title: "Insights",
  description: "Technical writing and engineering insights on frontend architecture, AI engineering, and performance optimization.",
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
