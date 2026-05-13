import "server-only";
import type { Locale } from "./config";

/**
 * Namespaced message loader.
 *
 * Each locale's messages are split across one file per domain
 * (`common.json`, `nav.json`, `home.json`, …) and merged at request
 * time into a single object keyed by namespace. Splitting keeps files
 * small enough to edit by hand and makes diffs reviewable per-domain.
 *
 * Adding a new namespace: drop the JSON file into both locales, then
 * append its name to `NAMESPACES`. No other code needs to change.
 *
 * Adding a new locale: create `messages/<new-locale>/` with the same
 * file set, then add it to `lib/i18n/config.ts`.
 */
export const NAMESPACES = [
  "common",
  "nav",
  "footer",
  "home",
  "company",
  "careers",
  "solutions",
  "labs",
  "products",
  "book",
  "insights",
  "legal",
  "errors",
  "metadata",
  "cookie",
  "forms",
  "switcher",
] as const;

export type Namespace = (typeof NAMESPACES)[number];

export type Messages = Record<Namespace, Record<string, unknown>>;

export async function loadMessages(locale: Locale): Promise<Messages> {
  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      const mod = await import(`../../messages/${locale}/${ns}.json`);
      return [ns, mod.default ?? mod] as const;
    }),
  );

  return Object.fromEntries(entries) as Messages;
}
