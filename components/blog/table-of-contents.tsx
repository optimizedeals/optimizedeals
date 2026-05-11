"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Get all headings from the article
    const article = document.querySelector("article")
    if (!article) return

    const elements = article.querySelectorAll("h2, h3")
    const items: TOCItem[] = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: element.tagName === "H2" ? 2 : 3,
    }))

    setHeadings(items)

    // Set up intersection observer for active heading tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0% -80% 0%",
        threshold: 0,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl">
      <h3 className="text-xs font-mono text-[#585F78] uppercase tracking-wider mb-4">
        On This Page
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-sm transition-colors duration-200 py-1",
                activeId === heading.id
                  ? "text-[#3B80EC]"
                  : "text-[#7A8BA7] hover:text-[#F0F5FB]"
              )}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(heading.id)
                if (element) {
                  const top = element.offsetTop - 100
                  window.scrollTo({ top, behavior: "smooth" })
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
