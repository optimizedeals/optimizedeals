"use client"

import { motion } from "framer-motion"
import { Layers, Brain, Zap, GitBranch, Box, Wrench, Clock, User, ArrowRight, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import Link from "next/link"
import { useState } from "react"

const categories = [
  { id: "all", label: "All", icon: Filter },
  { id: "frontend-architecture", label: "Frontend Architecture", icon: Layers },
  { id: "ai-engineering", label: "AI Engineering", icon: Brain },
  { id: "runtime-systems", label: "Runtime Systems", icon: Box },
  { id: "performance", label: "Performance Engineering", icon: Zap },
  { id: "monorepo", label: "Monorepo Systems", icon: GitBranch },
  { id: "product-engineering", label: "Product Engineering", icon: Wrench },
]

const articles = [
  {
    id: "micro-frontend-architecture-2024",
    title: "Micro-frontend Architecture in 2024: Patterns That Scale",
    excerpt: "An in-depth exploration of modern micro-frontend patterns, from module federation to runtime composition strategies that enable independent team deployments.",
    category: "frontend-architecture",
    author: "Engineering Team",
    date: "2024-01-15",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "building-ai-streaming-interfaces",
    title: "Building AI Streaming Interfaces with Vercel AI SDK",
    excerpt: "How to create responsive, user-friendly interfaces for AI-generated content using streaming patterns and optimistic UI updates.",
    category: "ai-engineering",
    author: "Engineering Team",
    date: "2024-01-10",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "nx-monorepo-at-scale",
    title: "Nx Monorepo at Scale: Lessons from 50+ Projects",
    excerpt: "Practical insights from managing large-scale Nx monorepos, including caching strategies, task orchestration, and CI optimization techniques.",
    category: "monorepo",
    author: "Engineering Team",
    date: "2024-01-05",
    readTime: "15 min read",
    featured: false,
  },
  {
    id: "optimizing-core-web-vitals",
    title: "Optimizing Core Web Vitals: A Technical Deep Dive",
    excerpt: "Advanced techniques for improving LCP, FID, and CLS scores through strategic code splitting, resource prioritization, and render optimization.",
    category: "performance",
    author: "Engineering Team",
    date: "2023-12-28",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "module-federation-runtime-composition",
    title: "Module Federation: Runtime Composition Strategies",
    excerpt: "Exploring different approaches to runtime module composition, including version negotiation, shared dependency management, and failover patterns.",
    category: "runtime-systems",
    author: "Engineering Team",
    date: "2023-12-20",
    readTime: "14 min read",
    featured: false,
  },
  {
    id: "rag-systems-for-products",
    title: "Building RAG Systems for Production Products",
    excerpt: "A practical guide to implementing retrieval-augmented generation in production environments, including embedding strategies and context optimization.",
    category: "ai-engineering",
    author: "Engineering Team",
    date: "2023-12-15",
    readTime: "11 min read",
    featured: false,
  },
  {
    id: "react-server-components-architecture",
    title: "React Server Components: Architecture Patterns",
    excerpt: "Understanding the architectural implications of React Server Components and how to design applications that leverage their benefits effectively.",
    category: "frontend-architecture",
    author: "Engineering Team",
    date: "2023-12-10",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "build-caching-strategies",
    title: "Build Caching Strategies for Large Codebases",
    excerpt: "How to implement effective build caching across monorepos, including remote caching, cache invalidation strategies, and CI/CD optimization.",
    category: "monorepo",
    author: "Engineering Team",
    date: "2023-12-05",
    readTime: "13 min read",
    featured: false,
  },
  {
    id: "product-modernization-patterns",
    title: "Product Modernization: Incremental Migration Patterns",
    excerpt: "Strategies for modernizing legacy applications without full rewrites, using the strangler fig pattern and incremental adoption techniques.",
    category: "product-engineering",
    author: "Engineering Team",
    date: "2023-11-28",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: "bundle-size-optimization",
    title: "Bundle Size Optimization: Beyond Tree Shaking",
    excerpt: "Advanced techniques for reducing JavaScript bundle sizes, including module analysis, dependency auditing, and dynamic import strategies.",
    category: "performance",
    author: "Engineering Team",
    date: "2023-11-20",
    readTime: "10 min read",
    featured: false,
  },
]

function FeaturedArticle({ article }: { article: typeof articles[0] }) {
  const category = categories.find((c) => c.id === article.category)
  const CategoryIcon = category?.icon || Layers

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/insights/${article.id}`} className="block">
        <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#001535]/60 to-[#001535]/30 border border-[#002A6B]/50 rounded-2xl overflow-hidden hover:border-[#002A6B] transition-all duration-300">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0054D6]/5 rounded-full blur-[100px]" />
          
          <div className="relative">
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#0054D6]/10 border border-[#0054D6]/30 rounded-full text-xs font-mono text-[#3B80EC]">
                <CategoryIcon className="w-3 h-3" />
                {category?.label}
              </span>
              <span className="px-2 py-0.5 bg-[#A17D33]/10 border border-[#A17D33]/30 rounded-full text-xs font-mono text-[#A17D33]">
                Featured
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium text-[#F0F5FB] mb-4 group-hover:text-white transition-colors">
              {article.title}
            </h2>

            <p className="text-[#7A8BA7] leading-relaxed mb-6 max-w-3xl">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-[#585F78]">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>

              <span className="flex items-center gap-2 text-sm font-medium text-[#3B80EC] group-hover:text-[#F0F5FB] transition-colors">
                Read article
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const category = categories.find((c) => c.id === article.category)
  const CategoryIcon = category?.icon || Layers

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/insights/${article.id}`} className="block">
        <div className="h-full p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl hover:border-[#002A6B]/60 hover:bg-[#001535]/50 transition-all duration-300">
          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <CategoryIcon className="w-4 h-4 text-[#3B80EC]" />
            <span className="text-xs font-mono text-[#585F78]">{category?.label}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-[#F0F5FB] mb-3 group-hover:text-white transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#7A8BA7] leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-[#585F78]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span>·</span>
            <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  
  const featuredArticles = articles.filter((a) => a.featured)
  const filteredArticles = activeCategory === "all"
    ? articles.filter((a) => !a.featured)
    : articles.filter((a) => a.category === activeCategory && !a.featured)

  return (
    <main className="min-h-screen bg-[#000216]">
      <PageHero
        badge="Technical Content"
        title="Technical writing and"
        titleHighlight="engineering insights."
        description="In-depth articles on modern frontend architecture, AI engineering, and performance optimization from our engineering team."
      />

      {/* Category Filter */}
      <section className="py-8 border-b border-[#002A6B]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#0054D6] text-white"
                      : "bg-[#001535]/50 border border-[#002A6B]/50 text-[#7A8BA7] hover:text-[#F0F5FB] hover:border-[#002A6B]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {activeCategory === "all" && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-medium text-[#F0F5FB]">Featured Articles</h2>
            </motion.div>

            <div className="space-y-6">
              {featuredArticles.map((article) => (
                <FeaturedArticle key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className={activeCategory === "all" ? "py-16 border-t border-[#002A6B]/30" : "py-16"}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="mb-8 flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium text-[#F0F5FB]">
              {activeCategory === "all" ? "All Articles" : categories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <span className="text-sm text-[#585F78] font-mono">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="w-12 h-12 text-[#002A6B] mx-auto mb-4" />
              <p className="text-[#7A8BA7]">No articles found in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Stay updated on engineering insights
            </h2>
            <p className="text-[#7A8BA7] mb-8 max-w-2xl mx-auto">
              Get notified when we publish new technical articles on frontend architecture, AI engineering, and modern development practices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#0054D6] hover:bg-[#3B80EC] text-white px-8 py-6 text-base font-medium rounded-lg"
                asChild
              >
                <Link href="/company#contact">Subscribe to Updates</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#002A6B] bg-transparent hover:bg-[#001535] text-[#F0F5FB] px-8 py-6 text-base font-medium rounded-lg group"
                asChild
              >
                <Link href="/labs">
                  Explore Labs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
