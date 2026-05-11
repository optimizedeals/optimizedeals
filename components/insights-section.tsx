"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Clock } from "lucide-react"

const articles = [
  {
    title: "Scaling React Applications with Module Federation",
    category: "Architecture",
    readTime: "8 min read",
    excerpt: "A deep dive into runtime composition patterns and how to build truly independent micro-frontends.",
  },
  {
    title: "Building AI-Native Interfaces with Streaming",
    category: "AI Engineering",
    readTime: "6 min read",
    excerpt: "Patterns for creating responsive AI-powered experiences with real-time streaming responses.",
  },
  {
    title: "Monorepo Strategies for Enterprise Teams",
    category: "Platform Engineering",
    readTime: "10 min read",
    excerpt: "Comparing Nx and Turborepo for large-scale frontend development and CI optimization.",
  },
  {
    title: "Performance Optimization at the Edge",
    category: "Performance",
    readTime: "5 min read",
    excerpt: "Leveraging edge computing for sub-100ms page loads and improved Core Web Vitals.",
  },
]

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  return (
    <motion.article
      className="group relative p-6 bg-[#001535]/30 border border-[#002A6B]/40 rounded-xl hover:bg-[#001535]/50 hover:border-[#002A6B]/60 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      {/* Category & Read time */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-mono text-[#3B80EC] bg-[#002A6B]/30 rounded-full border border-[#002A6B]">
          {article.category}
        </span>
        <div className="flex items-center gap-1 text-xs text-[#585F78]">
          <Clock className="w-3 h-3" />
          {article.readTime}
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-medium text-[#F0F5FB] mb-3 group-hover:text-white transition-colors leading-snug">
        {article.title}
      </h3>
      
      {/* Excerpt */}
      <p className="text-sm text-[#7A8BA7] mb-4 leading-relaxed">
        {article.excerpt}
      </p>
      
      {/* Read more link */}
      <div className="flex items-center text-sm text-[#3B80EC] font-medium group-hover:text-[#0054D6] transition-colors">
        Read article
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.article>
  )
}

export function InsightsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="insights" ref={ref} className="relative py-24 md:py-32">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 mb-6 bg-[#001535]/60 border border-[#002A6B] rounded-full text-xs font-mono text-[#7A8BA7] uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Insights
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#F0F5FB] mb-6 text-balance">
            Technical writing &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0054D6] to-[#3B80EC]">
              engineering insights
            </span>
          </h2>
          
          <p className="text-lg text-[#7A8BA7] max-w-2xl mx-auto text-pretty">
            Thoughts on frontend architecture, AI integration, and modern 
            product engineering.
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={article.title} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
