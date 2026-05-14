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
  ArrowRight,
  Search,
  Filter,
  Tag,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";
import { ArticleMeta } from "@/lib/mdx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authorInitials } from "@/lib/authors";
import { categorySlug, tagSlug } from "@/lib/slugify";

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
  featuredArticles: ArticleWithDate[];
  categories: string[];
  activeCategory: string | null;
  activeTag: string | null;
  activeAuthor: string | null;
  totalArticles: number;
}

function buildHref(
  current: {
    category: string | null;
    tag: string | null;
    author: string | null;
  },
  patch: Partial<Record<"category" | "tag" | "author", string | null>>,
): string {
  const next = { ...current, ...patch };
  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.tag) params.set("tag", next.tag);
  if (next.author) params.set("author", next.author);
  const qs = params.toString();
  return qs ? `/insights?${qs}` : "/insights";
}

export function InsightsClient({
  articles,
  featuredArticles,
  categories,
  activeCategory,
  activeTag,
  activeAuthor,
  totalArticles,
}: InsightsClientProps) {
  const t = useTranslations("insights");
  const tCommon = useTranslations("common");
  const current = {
    category: activeCategory,
    tag: activeTag,
    author: activeAuthor,
  };

  const allCategories = [
    { id: null as string | null, label: t("filters.all"), icon: Filter },
    ...categories.map((cat) => ({
      id: categorySlug(cat),
      label: cat,
      icon: categoryIcons[cat] || Layers,
    })),
  ];

  const activeCategoryLabel =
    categories.find((c) => categorySlug(c) === activeCategory) ?? null;

  const authorName = articles[0]?.author ?? activeAuthor ?? "";
  const activeAuthorAvatar = articles[0]?.authorAvatar;

  const tagLabel = activeTag
    ? articles[0]?.tags.find((tg) => tagSlug(tg) === activeTag) ?? activeTag
    : null;

  return (
    <>
      <MegaMenu />
      <main className="min-h-screen bg-background">
        <PageHero
          badge={t("hero.badge")}
          title={t("hero.title")}
          titleHighlight={t("hero.titleHighlight")}
          description={t("hero.description")}
        />

        {activeAuthor && (
          <section className="py-6 border-b border-border/30 bg-card/20">
            <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 ring-1 ring-border/60">
                  {activeAuthorAvatar && (
                    <AvatarImage src={activeAuthorAvatar} alt={authorName} />
                  )}
                  <AvatarFallback className="text-xs font-mono">
                    {authorInitials(authorName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-mono text-brand-gray uppercase tracking-wider">
                    {t("filters.postsBy")}
                  </p>
                  <p className="text-base font-medium text-foreground">
                    {authorName}
                  </p>
                </div>
              </div>
              <Link
                href={buildHref(current, { author: null })}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-card/50 border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <X className="w-3 h-3" />
                {t("filters.clearFilter")}
              </Link>
            </div>
          </section>
        )}

        {activeTag && (
          <section className="py-6 border-b border-border/30 bg-card/20">
            <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center size-10 rounded-full bg-primary/10 border border-primary/20">
                  <Tag className="w-4 h-4 text-accent" />
                </span>
                <div>
                  <p className="text-xs font-mono text-brand-gray uppercase tracking-wider">
                    {t("filters.tagged")}
                  </p>
                  <p className="text-base font-medium text-foreground">
                    {tagLabel}
                  </p>
                </div>
              </div>
              <Link
                href={buildHref(current, { tag: null })}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-card/50 border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <X className="w-3 h-3" />
                {t("filters.clearFilter")}
              </Link>
            </div>
          </section>
        )}

        <section className="py-8 border-b border-border/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap items-center gap-3">
              {allCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                const key = category.id ?? "all";
                return (
                  <Link
                    key={key}
                    href={buildHref(current, { category: category.id })}
                    scroll={false}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {featuredArticles.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-medium text-foreground">
                  {t("featured.title")}
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

        <section
          className={
            featuredArticles.length > 0
              ? "py-16 border-t border-border/30"
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
              <h2 className="text-2xl font-medium text-foreground">
                {activeCategoryLabel ?? t("allArticles.title")}
              </h2>
              <span className="text-sm text-brand-gray font-mono">
                {t("allArticles.count", { count: articles.length })}
              </span>
            </motion.div>

            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    index={index}
                  />
                ))}
              </div>
            ) : totalArticles === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search className="w-12 h-12 text-border mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  {t("empty.noArticles")}
                </p>
                <p className="text-sm text-brand-gray">{t("empty.checkBack")}</p>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search className="w-12 h-12 text-border mx-auto mb-4" />
                <p className="text-muted-foreground">{t("empty.noMatches")}</p>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                  {t("filters.clearAllFilters")}
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        <section className="py-20 border-t border-border/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-accent text-white px-8 py-6 text-base font-medium rounded-lg"
                  asChild
                >
                  <Link href="/book">{tCommon("actions.bookCall")}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border bg-transparent hover:bg-card text-foreground px-8 py-6 text-base font-medium rounded-lg group"
                  asChild
                >
                  <Link href="/labs">
                    {tCommon("actions.exploreLabs")}
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
  const t = useTranslations("insights");
  const tCommon = useTranslations("common");
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
        <div className="relative p-8 md:p-10 bg-linear-to-br from-card/60 to-card/30 border border-border/50 rounded-2xl overflow-hidden hover:border-border transition-all duration-300">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-mono text-accent">
                <CategoryIcon className="w-3 h-3" />
                {article.category}
              </span>
              <span className="px-2 py-0.5 bg-brand-gold/10 border border-brand-gold/30 rounded-full text-xs font-mono text-brand-gold">
                {t("featured.badge")}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4 group-hover:text-white transition-colors">
              {article.title}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              {article.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-brand-gray">
                <span className="flex items-center gap-2">
                  <Avatar className="size-6">
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
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readingTime}
                </span>
              </div>

              <span className="flex items-center gap-2 text-sm font-medium text-accent group-hover:text-foreground transition-colors">
                {tCommon("actions.readArticle")}
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
      className="group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/insights/${article.slug}`} className="block h-full">
        <div className="h-full flex flex-col p-6 bg-card/30 border border-border/30 rounded-xl hover:border-border/60 hover:bg-card/50 transition-all duration-300">
          <div className="flex items-center justify-between gap-2 mb-4">
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
            <div className="flex items-center gap-2 shrink-0">
              <CategoryIcon className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono text-brand-gray">
                {article.category}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-white transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {article.description}
          </p>

          {article.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-2 mb-4">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-border/30 border border-border/50 rounded text-muted-foreground"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className={`flex items-center gap-3 text-xs text-brand-gray ${article.tags.length > 0 ? "" : "mt-auto pt-2"}`}
          >
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
