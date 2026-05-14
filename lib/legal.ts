import fs from "fs";
import path from "path";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

const LEGAL_DIR = path.join(process.cwd(), "content/legal");

export const LEGAL_SLUGS = ["privacy-policy", "terms-and-conditions"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(value);
}

/**
 * Load the raw MDX body for a legal slug in `locale`, falling back to the
 * default locale if a translation is missing.
 *
 * Returns `null` only when the slug exists nowhere.
 */
export function loadLegalContent(
  locale: Locale,
  slug: LegalSlug,
): { content: string; language: Locale } | null {
  const tryRead = (loc: Locale) => {
    const filePath = path.join(LEGAL_DIR, loc, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    return { content: fs.readFileSync(filePath, "utf-8"), language: loc };
  };
  return tryRead(locale) ?? tryRead(DEFAULT_LOCALE);
}
