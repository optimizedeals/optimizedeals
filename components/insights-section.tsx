"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/mdx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authorInitials } from "@/lib/authors";

interface InsightsSectionProps {
  articles: ArticleMeta[];
}

function ArticleCard({
  article,
  index,
}: {
  article: ArticleMeta;
  index: number;
}) {
  return (
    <motion.article
      className="group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/insights/${article.slug}`}
        className="relative h-full flex flex-col p-6 bg-card/30 border border-border/40 rounded-xl hover:bg-card/50 hover:border-border/60 transition-all duration-300"
      >
        {/* Category & Read time */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-mono text-accent bg-border/30 rounded-full border border-border">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-brand-gray">
            <Clock className="w-3 h-3" />
            {article.readingTime}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-white transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
          {article.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="size-6 shrink-0">
              {article.authorAvatar && (
                <AvatarImage
                  src={article.authorAvatar}
                  alt={article.author}
                />
              )}
              <AvatarFallback className="text-[10px] font-mono">
                {authorInitials(article.author)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-mono text-brand-gray truncate">
              {article.author}
            </span>
          </div>
          <span className="flex items-center text-sm text-accent font-medium group-hover:text-primary transition-colors shrink-0">
            Read
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function InsightsSection({ articles }: InsightsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (articles.length === 0) return null;

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
            className="inline-block px-4 py-1.5 mb-6 bg-card/60 border border-border rounded-full text-xs font-mono text-muted-foreground uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Insights
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            Technical writing &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              engineering insights
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Thoughts on frontend architecture, AI integration, and modern
            product engineering.
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all insights
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
