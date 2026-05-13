/**
 * Locale configuration. Single source of truth for supported locales,
 * default locale, display metadata, and type helpers. Importable by
 * server, client, edge, and Node code (no runtime side effects).
 */

export const LOCALES = ["en-us", "pt-br"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en-us";

/**
 * Locale metadata used by the UI (switcher, html lang, hreflang, OG locale).
 *
 * - `htmlLang` is the value placed on `<html lang>` and `inLanguage` JSON-LD.
 *   We use the BCP-47 form ("en-US", "pt-BR") here because that's the casing
 *   crawlers expect, while the URL segment stays lowercase ("en-us", "pt-br")
 *   to match the convention from the task spec.
 * - `ogLocale` maps to OpenGraph's underscore form.
 * - `hreflang` is what we emit in <link rel="alternate" hreflang>.
 */
export const LOCALE_META: Record<
  Locale,
  {
    htmlLang: string;
    ogLocale: string;
    hreflang: string;
    label: string;
    nativeLabel: string;
    flagCode: "us" | "br";
  }
> = {
  "en-us": {
    htmlLang: "en-US",
    ogLocale: "en_US",
    hreflang: "en-US",
    label: "English",
    nativeLabel: "English (US)",
    flagCode: "us",
  },
  "pt-br": {
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    hreflang: "pt-BR",
    label: "Portuguese",
    nativeLabel: "Português (Brasil)",
    flagCode: "br",
  },
};

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function asLocale(value: string | undefined | null): Locale {
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}
