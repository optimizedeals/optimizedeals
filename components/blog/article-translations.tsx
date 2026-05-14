"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  LOCALE_COOKIE,
  LOCALE_META,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export interface ArticleTranslationAlternate {
  locale: Locale;
  slug: string;
}

interface ArticleTranslationsProps {
  /**
   * Locales (other than the article's authored language) where a real
   * translation of this article exists, with the locale-owned slug. Resolved
   * server-side via `getArticleTranslations` so we never link to a slug that
   * 404s in the target locale.
   */
  alternates: ArticleTranslationAlternate[];
  className?: string;
}

/**
 * Article-level translation indicator. Renders an inline, header-integrated
 * pill row that exposes the locales this article is also published in.
 *
 * Renders nothing when no translations are available, so the rest of the
 * article header layout stays untouched for monolingual posts.
 *
 * Clicking a pill performs a full navigation to the locale-owned slug and
 * persists the user's choice via `NEXT_LOCALE` so future root visits land in
 * the same language (mirrors the footer LanguageSwitcher behavior).
 */
export function ArticleTranslations({
  alternates,
  className,
}: ArticleTranslationsProps) {
  const t = useTranslations("insights.article");

  if (alternates.length === 0) return null;

  const persistLocale = (locale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  };

  return (
    <motion.div
      role="group"
      aria-label={t("translationsAria")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className={cn(
        "inline-flex flex-wrap items-center gap-x-3 gap-y-2",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-brand-gray">
        <Languages className="h-3.5 w-3.5" aria-hidden="true" />
        {t("availableIn")}
      </span>
      <div className="inline-flex flex-wrap items-center gap-1.5">
        {alternates.map(({ locale, slug }) => {
          const meta = LOCALE_META[locale];
          return (
            <Link
              key={locale}
              href={`/${locale}/insights/${slug}`}
              onClick={() => persistLocale(locale)}
              hrefLang={meta.hreflang}
              lang={meta.htmlLang}
              aria-label={t("switchTo", { language: meta.nativeLabel })}
              className="group inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
            >
              <span
                className={cn(
                  "fi",
                  `fi-${meta.flagCode}`,
                  "h-3.5 w-5 rounded-[2px]",
                )}
                aria-hidden="true"
              />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {meta.nativeLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
