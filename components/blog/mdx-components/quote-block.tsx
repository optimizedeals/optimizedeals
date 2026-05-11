import { Quote } from "lucide-react"

interface QuoteBlockProps {
  children: React.ReactNode
  author?: string
  source?: string
}

export function QuoteBlock({ children, author, source }: QuoteBlockProps) {
  return (
    <blockquote className="my-8 relative">
      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#0054D6]/20" />
      <div className="pl-8 pr-4 py-4 border-l-4 border-[#0054D6] bg-[#001535]/30 rounded-r-xl">
        <p className="text-lg md:text-xl text-[#F0F5FB] italic leading-relaxed">
          {children}
        </p>
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
