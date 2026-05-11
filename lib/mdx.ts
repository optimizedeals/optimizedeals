import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const CONTENT_DIR = path.join(process.cwd(), "content/insights")

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: string
  featured?: boolean
}

export interface Article extends ArticleMeta {
  content: string
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  // Ensure directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"))

  const articles = files.map((file) => {
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)
    const slug = file.replace(".mdx", "")
    const stats = readingTime(content)

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "OptimizeDeals Engineering",
      category: data.category || "Engineering",
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
      featured: data.featured || false,
    }
  })

  // Sort by date (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    author: data.author || "OptimizeDeals Engineering",
    category: data.category || "Engineering",
    tags: data.tags || [],
    image: data.image,
    readingTime: stats.text,
    featured: data.featured || false,
    content,
  }
}

export async function getArticlesByCategory(category: string): Promise<ArticleMeta[]> {
  const articles = await getAllArticles()
  return articles.filter((article) => article.category.toLowerCase() === category.toLowerCase())
}

export async function getArticlesByTag(tag: string): Promise<ArticleMeta[]> {
  const articles = await getAllArticles()
  return articles.filter((article) => 
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  tags: string[],
  limit: number = 3
): Promise<ArticleMeta[]> {
  const articles = await getAllArticles()
  
  // Filter out current article and find related ones
  const related = articles
    .filter((article) => article.slug !== currentSlug)
    .map((article) => {
      let score = 0
      // Same category = high score
      if (article.category.toLowerCase() === category.toLowerCase()) {
        score += 10
      }
      // Matching tags
      const matchingTags = article.tags.filter((tag) =>
        tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
      score += matchingTags.length * 5
      return { ...article, score }
    })
    .filter((article) => article.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return related
}

export async function getLatestArticles(limit: number = 4): Promise<ArticleMeta[]> {
  const articles = await getAllArticles()
  return articles.slice(0, limit)
}

export async function getAllCategories(): Promise<string[]> {
  const articles = await getAllArticles()
  const categories = new Set(articles.map((article) => article.category))
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles()
  const tags = new Set(articles.flatMap((article) => article.tags))
  return Array.from(tags)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
