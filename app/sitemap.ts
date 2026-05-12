import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";
import { STATIC_ROUTES, canonicalUrl } from "@/lib/site-routes";

/**
 * Dynamic sitemap. Generated server-side at request time (or at build
 * time when statically exportable). Combines:
 *   1. Static top-level routes from lib/site-routes.ts
 *   2. Every published MDX article under content/insights
 *
 * New content collections (e.g. case studies, experiments) plug in by
 * appending another async source below — no other file needs to change.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: canonicalUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articles = await getAllArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: canonicalUrl(`insights/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: article.featured ? 0.8 : 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
