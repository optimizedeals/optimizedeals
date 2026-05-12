import { Quote } from "lucide-react"

interface QuoteBlockProps {
  children: React.ReactNode
  author?: string
  source?: string
}

export function QuoteBlock({ children, author, source }: QuoteBlockProps) {
  return (
    <blockquote className="my-8 relative">
      <div className="relative pl-14 pr-6 py-6 border-l-4 border-[#0054D6] bg-[#001535]/30 rounded-r-xl">
        <Quote className="absolute top-4 left-4 w-7 h-7 text-[#0054D6]/40" />
        <div className="text-lg md:text-xl text-[#F0F5FB] italic leading-relaxed [&>p]:m-0">
          {children}
        </div>
        {(author || source) && (
          <footer className="mt-4 text-sm text-[#7A8BA7]">
            {author && <span className="font-medium">{author}</span>}
            {author && source && <span className="mx-2">—</span>}
            {source && <cite className="not-italic">{source}</cite>}
          </footer>
        )}
      </div>
    </blockquote>
  )
}
