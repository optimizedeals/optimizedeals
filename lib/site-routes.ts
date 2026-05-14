import type { MetadataRoute } from "next";

/**
 * Single source of truth for the production base URL.
 * Falls back to the canonical domain when NEXT_PUBLIC_SITE_URL is unset
 * (e.g. local dev or preview environments without env config).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://optimize.deals"
).replace(/\/$/, "");

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface StaticRoute {
  /** Path segment relative to SITE_URL. Empty string = homepage. */
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

/**
 * All publicly-indexable static routes. Adding a new top-level page?
 * Register it here once and it appears in the sitemap automatically.
 * Dynamic routes (e.g. /insights/[slug]) are expanded separately by
 * each route's data source.
 */
export const STATIC_ROUTES: StaticRoute[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "solutions", changeFrequency: "monthly", priority: 0.9 },
  { path: "products", changeFrequency: "monthly", priority: 0.9 },
  { path: "labs", changeFrequency: "weekly", priority: 0.8 },
  { path: "insights", changeFrequency: "weekly", priority: 0.9 },
  { path: "company", changeFrequency: "monthly", priority: 0.7 },
  { path: "careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "book", changeFrequency: "monthly", priority: 0.6 },
  { path: "privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

/**
 * Routes excluded from indexing. Listed in robots.ts and never emitted
 * by the sitemap. Match by path prefix.
 */
export const DISALLOWED_PATHS = [
  "/api/",
  "/admin/",
  "/preview/",
  "/internal/",
  "/og-preview",
] as const;

export const canonicalUrl = (path: string): string => {
  const trimmed = path.replace(/^\//, "");
  return trimmed ? `${SITE_URL}/${trimmed}` : SITE_URL;
};
