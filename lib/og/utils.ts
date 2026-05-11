import { OG_CONFIG } from './config'

/**
 * Calculates optimal font size based on text length
 * Implements intelligent scaling for titles
 */
export function calculateTitleFontSize(title: string): number {
  const length = title.length
  const { large, medium, small } = OG_CONFIG.typography.title
  
  if (length <= 30) return large
  if (length <= 50) return medium
  if (length <= 80) return small
  
  // For very long titles, scale down further
  return Math.max(40, small - Math.floor((length - 80) / 10) * 2)
}

/**
 * Calculates line height based on font size
 */
export function calculateLineHeight(fontSize: number): number {
  return Math.round(fontSize * 1.2)
}

/**
 * Truncates text with ellipsis if too long
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trim() + '...'
}

/**
 * Formats category text for display
 */
export function formatCategory(category: string): string {
  return category.toUpperCase()
}

/**
 * Generates OG image URL for a given path
 */
export function getOGImageUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}/api/og?path=${encodeURIComponent(cleanPath)}`
}

/**
 * Gets OG metadata for a page
 */
export function getOGMetadata(params: {
  title: string
  description?: string
  path: string
}) {
  const { title, description, path } = params
  const imageUrl = getOGImageUrl(path)
  
  return {
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: OG_CONFIG.width,
          height: OG_CONFIG.height,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [imageUrl],
    },
  }
}

/**
 * Generates OG image URL for an article with metadata
 * This passes title, description, and category as URL params
 * to avoid Node.js dependencies in the edge runtime
 */
export function getArticleOGImageUrl(params: {
  title: string
  description?: string
  category?: string
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'
  const searchParams = new URLSearchParams()
  
  searchParams.set('title', params.title)
  if (params.description) {
    searchParams.set('description', params.description)
  }
  if (params.category) {
    searchParams.set('category', params.category)
  }
  
  return `${baseUrl}/api/og?${searchParams.toString()}`
}
