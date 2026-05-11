"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Brain,
  Zap,
  GitBranch,
  Box,
  Wrench,
  Clock,
  User,
  ArrowRight,
  Search,
  Filter,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";
import { useState } from "react";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";
import { ArticleMeta } from "@/lib/mdx";

const categoryIcons: { [key: string]: React.ElementType } = {
  "Frontend Architecture": Layers,
  "AI Engineering": Brain,
  "Runtime Systems": Box,
  "Performance Engineering": Zap,
  "Monorepo Systems": GitBranch,
  "Product Engineering": Wrench,
};

interface ArticleWithDate extends ArticleMeta {
  formattedDate: string;
}

interface InsightsClientProps {
  articles: ArticleWithDate[];
  categories: string[];
}

export function InsightsClient({ articles, categories }: InsightsClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const featuredArticles = articles.filter((a) => a.featured);
  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter(
          (a) =>
            a.category.toLowerCase().replace(/\s+/g, "-") === activeCategory,
        );

  const allCategories = [
    { id: "all", label: "All", icon: Filter },
    ...categories.map((cat) => ({
      id: cat.toLowerCase().replace(/\s+/g, "-"),
      label: cat,
      icon: categoryIcons[cat] || Layers,
    })),
  ];

  return (
    <>
      <MegaMenu />
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
              {allCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
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
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {activeCategory === "all" && featuredArticles.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-medium text-[#F0F5FB]">
                  Featured Articles
                </h2>
              </motion.div>

              <div className="space-y-6">
                {featuredArticles.map((article) => (
                  <FeaturedArticle key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles */}
        <section
          className={
            activeCategory === "all" && featuredArticles.length > 0
              ? "py-16 border-t border-[#002A6B]/30"
              : "py-16"
          }
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="mb-8 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-medium text-[#F0F5FB]">
                {activeCategory === "all"
                  ? "All Articles"
                  : allCategories.find((c) => c.id === activeCategory)?.label}
              </h2>
              <span className="text-sm text-[#585F78] font-mono">
                {filteredArticles.length} article
                {filteredArticles.length !== 1 ? "s" : ""}
              </span>
            </motion.div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    index={index}
                  />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search className="w-12 h-12 text-[#002A6B] mx-auto mb-4" />
                <p className="text-[#7A8BA7] mb-4">
                  No articles published yet.
                </p>
                <p className="text-sm text-[#585F78]">
                  Check back soon for engineering insights.
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search className="w-12 h-12 text-[#002A6B] mx-auto mb-4" />
                <p className="text-[#7A8BA7]">
                  No articles found in this category yet.
                </p>
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
                Get notified when we publish new technical articles on frontend
                architecture, AI engineering, and modern development practices.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#0054D6] hover:bg-[#3B80EC] text-white px-8 py-6 text-base font-medium rounded-lg"
                  asChild
                >
                  <Link href="/book">Book a Call</Link>
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
      <Footer />
    </>
  );
}

function FeaturedArticle({ article }: { article: ArticleWithDate }) {
  const CategoryIcon = categoryIcons[article.category] || Layers;

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/insights/${article.slug}`} className="block">
        <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#001535]/60 to-[#001535]/30 border border-[#002A6B]/50 rounded-2xl overflow-hidden hover:border-[#002A6B] transition-all duration-300">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0054D6]/5 rounded-full blur-[100px]" />

          <div className="relative">
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#0054D6]/10 border border-[#0054D6]/30 rounded-full text-xs font-mono text-[#3B80EC]">
                <CategoryIcon className="w-3 h-3" />
                {article.category}
              </span>
              <span className="px-2 py-0.5 bg-[#A17D33]/10 border border-[#A17D33]/30 rounded-full text-xs font-mono text-[#A17D33]">
                Featured
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium text-[#F0F5FB] mb-4 group-hover:text-white transition-colors">
              {article.title}
            </h2>

            <p className="text-[#7A8BA7] leading-relaxed mb-6 max-w-3xl">
              {article.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-[#585F78]">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readingTime}
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
  );
}

function ArticleCard({
  article,
  index,
}: {
  article: ArticleWithDate;
  index: number;
}) {
  const CategoryIcon = categoryIcons[article.category] || Layers;

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/insights/${article.slug}`} className="block">
        <div className="h-full p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl hover:border-[#002A6B]/60 hover:bg-[#001535]/50 transition-all duration-300">
          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <CategoryIcon className="w-4 h-4 text-[#3B80EC]" />
            <span className="text-xs font-mono text-[#585F78]">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-[#F0F5FB] mb-3 group-hover:text-white transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#7A8BA7] leading-relaxed mb-4 line-clamp-3">
            {article.description}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-[#002A6B]/30 border border-[#002A6B]/50 rounded text-[#7A8BA7]"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-[#585F78]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </span>
            <span>·</span>
            <span>{article.formattedDate}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
