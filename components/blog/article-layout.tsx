"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  User,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";
import { TableOfContents } from "./table-of-contents";
import { ReadingProgress } from "./reading-progress";
import { ArticleMeta } from "@/lib/mdx";

interface ArticleLayoutProps {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  image?: string;
  relatedArticles: ArticleMeta[];
  latestArticles: ArticleMeta[];
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  description,
  date,
  author,
  category,
  tags,
  readingTime,
  image,
  relatedArticles,
  latestArticles,
  children,
}: ArticleLayoutProps) {
  const tagsAndShare = (
    <div className="space-y-8">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="p-6 bg-card/30 border border-border/30 rounded-xl">
          <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/insights?tag=${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono bg-border/30 border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="p-6 bg-card/30 border border-border/30 rounded-xl">
        <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-4">
          Share
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-border bg-transparent hover:bg-border/30 text-muted-foreground hover:text-foreground"
            asChild
          >
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://optimize.deals/insights/${title.toLowerCase().replace(/\s+/g, "-")}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-border bg-transparent hover:bg-border/30 text-muted-foreground hover:text-foreground"
            asChild
          >
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://optimize.deals/insights/${title.toLowerCase().replace(/\s+/g, "-")}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ReadingProgress />
      <MegaMenu />

      <main className="min-h-screen bg-background pt-20">
        {/* Article Header */}
        <header className="relative py-16 md:py-24">
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-150 h-150 bg-primary/5 rounded-full blur-[150px]" />
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="articleGrid"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#articleGrid)" />
              </svg>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href="/insights"
                className="hover:text-foreground transition-colors"
              >
                Insights
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/insights?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-foreground transition-colors"
              >
                {category}
              </Link>
            </motion.nav>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href={`/insights?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-accent hover:bg-primary/20 transition-colors"
              >
                {category}
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance leading-tight break-words"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-3xl break-words"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>

            {/* Meta info */}
            <motion.div
              className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime}</span>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Article Content */}
        <div className="relative mx-auto px-4 sm:px-6 pb-20 max-w-450">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block lg:w-72 lg:shrink-0">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 min-w-0 w-full mx-auto prose prose-invert prose-lg !max-w-7xl break-words overflow-x-hidden">
              {children}
              <div className="xl:hidden mt-12 not-prose">{tagsAndShare}</div>
            </article>

            {/* Sidebar - xl+ only */}
            <aside className="hidden xl:block xl:w-72 xl:shrink-0">
              <div className="sticky top-24">{tagsAndShare}</div>
            </aside>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-20 border-t border-border/30">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-medium text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest Articles */}
        <section className="py-20 border-t border-border/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium text-foreground">
                Latest Posts
              </h2>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/insights">
                  View all
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} compact />
              ))}
            </div>
          </div>
        </section>

        {/* Back to Insights CTA */}
        <section className="py-12 border-t border-border/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Button
              variant="outline"
              className="border-border bg-transparent hover:bg-card text-foreground"
              asChild
            >
              <Link href="/insights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ArticleCard({
  article,
  compact = false,
}: {
  article: ArticleMeta;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block p-6 bg-card/30 border border-border/30 rounded-xl hover:border-border/60 transition-all duration-300"
    >
      <span className="text-xs font-mono text-primary mb-2 block">
        {article.category}
      </span>
      <h3
        className={`font-medium text-foreground group-hover:text-accent transition-colors mb-2 ${compact ? "text-base" : "text-lg"}`}
      >
        {article.title}
      </h3>
      {!compact && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {article.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-xs text-brand-gray">
        <span>{article.readingTime}</span>
      </div>
    </Link>
  );
}
