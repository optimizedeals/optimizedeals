"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * Locale toggle. Renders one button per supported locale, switches via
 * next-intl's locale-aware router so the active pathname is preserved, and
 * sets the NEXT_LOCALE cookie via document.cookie before navigating so the
 * choice survives the next root visit.
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations("switcher");
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (next: Locale) => {
    if (next === current) return;
    // Persist preference for future root visits. The proxy reads this cookie
    // first and skips geo-detection when present.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/40 p-1 backdrop-blur-sm",
        className,
      )}
    >
      {LOCALES.map((locale) => {
        const meta = LOCALE_META[locale];
        const isActive = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleSwitch(locale)}
            aria-current={isActive ? "true" : undefined}
            aria-label={t("locales." + locale)}
            disabled={isPending && !isActive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors",
              isActive
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-border/40",
              isPending && !isActive && "opacity-60 cursor-progress",
            )}
          >
            <span
              className={cn("fi", `fi-${meta.flagCode}`, "h-3.5 w-5 rounded-[2px]")}
              aria-hidden="true"
            />
            <span>{t("shortLocales." + locale)}</span>
          </button>
        );
      })}
    </div>
  );
}
