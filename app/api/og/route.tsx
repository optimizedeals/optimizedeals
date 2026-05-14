import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getTranslations } from "next-intl/server";
import { OG_CONFIG, type PageType } from "@/lib/og/config";
import { OGBackground } from "@/lib/og/background";
import { OGLogo } from "@/lib/og/logo";
import {
  OGTitle,
  OGDescription,
  OGPageBadge,
} from "@/lib/og/typography";

export const runtime = "edge";

const VALID_PAGE_TYPES: readonly string[] = [
  "homepage", "solutions", "products", "labs", "insights",
  "article", "company", "careers", "default",
];

function resolvePageType(type: string): PageType {
  return VALID_PAGE_TYPES.includes(type) ? (type as PageType) : "default";
}

/**
 * Known static page paths that have corresponding entries in
 * translation messages (messages/{locale}/metadata.json → og.{path}).
 * Any path NOT in this set is treated as a dynamic/article page.
 */
const STATIC_PAGE_PATHS = new Set([
  "", "solutions", "products", "labs", "insights",
  "company", "careers", "book",
]);

interface OGPageMeta {
  title: string;
  description: string;
  badge?: string;
  pageType: PageType;
}

async function loadOGPageMeta(
  locale: string,
  key: string,
): Promise<OGPageMeta | null> {
  try {
    const t = await getTranslations({ locale, namespace: "metadata" });
    const keyPath = `og.${key}.title`;
    const title = t(keyPath);
    if (!title || typeof title !== "string") return null;
    if (title === keyPath) return null;
    if (title.endsWith(keyPath)) return null;
    const description = t(`og.${key}.description`);
    const badge = t(`og.${key}.badge`);
    const pageTypeStr = t(`og.${key}.pageType`);
    return {
      title,
      description: description || "",
      badge: badge || undefined,
      pageType: resolvePageType(pageTypeStr),
    };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pathParam = searchParams.get("path");
  const hasPath = searchParams.has("path");
  const path = pathParam ? pathParam.replace(/^\//, "") : "";
  const locale = searchParams.get("locale") || "en-us";

  const articleTitle = searchParams.get("title");
  const articleDescription = searchParams.get("description");
  const articleCategory = searchParams.get("category");

  let title: string;
  let description: string | undefined;
  let badge: string | undefined;
  let pageType: PageType = "default";

  // An article is identified by:
  //   1. An explicit category param, OR
  //   2. A path that is NOT a known static page (e.g. "insights/some-article")
  // This handles both the direct article OG URL (with category)
  // and the Twitter card URL (with path but no category).
  const isArticle = Boolean(articleCategory) ||
    (Boolean(path) && !STATIC_PAGE_PATHS.has(path) && path !== "homepage");

  if (isArticle) {
    title = articleTitle || "Technical Insights";
    description = articleDescription || undefined;
    pageType = "article";
  } else if (articleTitle && (hasPath || path)) {
    const pageMeta = await loadOGPageMeta(locale, path);
    title = articleTitle;
    description = articleDescription || pageMeta?.description;
    badge = pageMeta?.badge;
    pageType = pageMeta?.pageType || "default";
  } else if (articleTitle) {
    title = articleTitle;
    description = articleDescription || undefined;
    pageType = "default";
  } else if (path) {
    const pageMeta = await loadOGPageMeta(locale, path)
      ?? await loadOGPageMeta(locale, "");
    title = pageMeta?.title ?? "OptimizeDeals";
    description = pageMeta?.description;
    badge = pageMeta?.badge;
    pageType = pageMeta?.pageType ?? "default";
  } else {
    const pageMeta = await loadOGPageMeta(locale, "");
    title = pageMeta?.title ?? "OptimizeDeals";
    description = pageMeta?.description;
    pageType = pageMeta?.pageType ?? "default";
  }

  const imageContent =
    pageType === "homepage"
      ? renderHomepageOG(title, description)
      : renderPageOG(title, description, badge);

  const response = new ImageResponse(imageContent, {
    width: OG_CONFIG.width,
    height: OG_CONFIG.height,
  });

  response.headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800, must-revalidate",
  );

  return response;
}

function renderHomepageOG(title: string, description?: string) {
  return (
    <div
      style={{
        width: OG_CONFIG.width,
        height: OG_CONFIG.height,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <OGBackground />
      <OGLogo />

      <div
        style={{
          position: "absolute",
          left: OG_CONFIG.spacing.contentLeft,
          right: OG_CONFIG.spacing.contentRight,
          top: "50%",
          transform: "translateY(-30%)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <OGTitle maxWidth={900}>{title}</OGTitle>
        {description && (
          <OGDescription maxWidth={800}>{description}</OGDescription>
        )}
      </div>
    </div>
  );
}

function renderPageOG(title: string, description?: string, badge?: string) {
  return (
    <div
      style={{
        width: OG_CONFIG.width,
        height: OG_CONFIG.height,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <OGBackground />
      <OGLogo />

      <div
        style={{
          position: "absolute",
          left: OG_CONFIG.spacing.contentLeft,
          right: OG_CONFIG.spacing.contentRight,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {badge && <OGPageBadge>{badge}</OGPageBadge>}
        <OGTitle>{title}</OGTitle>
        {description && <OGDescription>{description}</OGDescription>}
      </div>
    </div>
  );
}
