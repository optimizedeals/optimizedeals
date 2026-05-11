import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { OG_CONFIG, type PageType } from "@/lib/og/config";
import { OGBackground } from "@/lib/og/background";
import { OGLogo } from "@/lib/og/logo";
import {
  OGTitle,
  OGDescription,
  OGCategoryBadge,
  OGPageBadge,
} from "@/lib/og/typography";

export const runtime = "edge";

// Page metadata configuration
const PAGE_META: Record<
  string,
  { title: string; description: string; badge?: string; pageType: PageType }
> = {
  "": {
    title: "Frontend Architecture & Platform Engineering Studio",
    description:
      "We build high-performance React and AI-powered platforms focused on scalability, architecture and execution speed.",
    pageType: "homepage",
  },
  solutions: {
    title: "Engineering systems built for scale.",
    description:
      "We help companies modernize products, scale frontend ecosystems and build AI-native experiences.",
    badge: "Engineering Services",
    pageType: "solutions",
  },
  products: {
    title: "Products built through engineering-first thinking.",
    description:
      "Explore our portfolio of production applications and experimental systems.",
    badge: "Product Portfolio",
    pageType: "products",
  },
  labs: {
    title: "Engineering research and experimental systems.",
    description:
      "Exploring the frontiers of frontend architecture, AI integration, and performance optimization.",
    badge: "Research & Development",
    pageType: "labs",
  },
  insights: {
    title: "Technical Insights",
    description:
      "Technical writing on frontend architecture, AI engineering, and performance optimization.",
    badge: "Technical Insights",
    pageType: "insights",
  },
  company: {
    title: "A studio built for engineering excellence.",
    description:
      "OptimizeDeals is a founder-led engineering studio focused on frontend architecture and AI-native products.",
    badge: "About Us",
    pageType: "company",
  },
  careers: {
    title: "Build systems that scale.",
    description:
      "We're building a culture focused on engineering quality, systems thinking and technical excellence.",
    badge: "Join Our Team",
    pageType: "careers",
  },
  book: {
    title: "Book a Discovery Call",
    description:
      "Let's discuss your engineering challenges and explore how we can help.",
    badge: "Schedule",
    pageType: "default",
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  // For article pages, metadata is passed via URL params to avoid Node.js deps
  // The article page passes title, description, and category
  const articleTitle = searchParams.get("title");
  const articleDescription = searchParams.get("description");
  const articleCategory = searchParams.get("category");

  // Check if this is an article request (has article params or path starts with insights/)
  const isArticle =
    articleTitle || (path.startsWith("insights/") && path !== "insights");

  let title: string;
  let description: string | undefined;
  let category: string | undefined;
  let badge: string | undefined;
  let pageType: PageType = "default";

  if (isArticle && articleTitle) {
    // Article with metadata passed via params
    title = articleTitle;
    description = articleDescription || undefined;
    category = articleCategory || undefined;
    pageType = "article";
  } else if (isArticle) {
    // Fallback for article without metadata
    title = "Technical Insights";
    description = "Engineering insights from OptimizeDeals";
    category = "Engineering";
    pageType = "article";
  } else {
    // Standard page
    const pageMeta = PAGE_META[path] || PAGE_META[""];
    title = pageMeta.title;
    description = pageMeta.description;
    badge = pageMeta.badge;
    pageType = pageMeta.pageType;
  }

  // Generate the appropriate OG image
  const imageContent =
    pageType === "homepage"
      ? renderHomepageOG(title, description)
      : renderPageOG(title, description, badge);

  return new ImageResponse(imageContent, {
    width: OG_CONFIG.width,
    height: OG_CONFIG.height,
  });
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
