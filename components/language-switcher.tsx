"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Inline SVG flag icons. Keeping them inline avoids an extra HTTP round-trip
 * for a 2-flag UI and stays consistent with the icon style used elsewhere
 * (lucide-react glyphs render at the same dimensions).
 */
function FlagIcon({ code, className }: { code: "us" | "br"; className?: string }) {
  if (code === "us") {
    return (
      <svg
        viewBox="0 0 60 30"
        className={cn("h-3.5 w-auto rounded-[2px] overflow-hidden", className)}
        aria-hidden="true"
      >
        <rect width="60" height="30" fill="#B22234" />
        {[1, 3, 5, 7, 9, 11].map((i) => (
          <rect
            key={i}
            y={(i * 30) / 13}
            width="60"
            height={30 / 13}
            fill="#fff"
          />
        ))}
        <rect width="24" height={(30 / 13) * 7} fill="#3C3B6E" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 720 504"
      className={cn("h-3.5 w-auto rounded-[2px] overflow-hidden", className)}
      aria-hidden="true"
    >
      <rect width="720" height="504" fill="#009B3A" />
      <polygon points="360,63 671,252 360,441 49,252" fill="#FEDF00" />
      <circle cx="360" cy="252" r="91" fill="#002776" />
    </svg>
  );
}

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
            <FlagIcon code={meta.flagCode} />
            <span>{t("shortLocales." + locale)}</span>
          </button>
        );
      })}
    </div>
  );
}
