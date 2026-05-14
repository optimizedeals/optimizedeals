import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";
import { DISALLOWED_PATHS } from "@/lib/site-routes";

/**
 * Standards-compliant robots.txt.
 *
 * - Allows every crawler (Googlebot, Bingbot, plus AI crawlers like
 *   GPTBot, ClaudeBot, PerplexityBot) to index public content under
 *   /en-us/ and /pt-br/.
 * - Disallows internal API routes, dev tooling, and the OG preview
 *   surface.
 * - Points to the canonical multilingual sitemap so crawlers can
 *   discover every locale variant without scraping.
 *
 * `host` keeps a single canonical hostname even if the site is reached
 * via a CNAME or preview URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOWED_PATHS],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
