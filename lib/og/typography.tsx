import { OG_CONFIG } from "./config";
import {
  calculateTitleFontSize,
  calculateLineHeight,
  truncateText,
  formatCategory,
} from "./utils";

interface TitleProps {
  children: string;
  maxWidth?: number;
}

/**
 * Title component for OG images
 * Automatically scales font size based on content length
 */
export function OGTitle({ children, maxWidth }: TitleProps) {
  const fontSize = calculateTitleFontSize(children);
  const lineHeight = calculateLineHeight(fontSize);
  const width = maxWidth || OG_CONFIG.spacing.titleMaxWidth;

  return (
    <h1
      style={{
        fontSize,
        fontWeight: 900,
        color: OG_CONFIG.colors.textPrimary,
        lineHeight: `${lineHeight}px`,
        maxWidth: width,
        letterSpacing: "-0.02em",
        margin: 0,
        fontFamily: "Geist, system-ui, sans-serif",
        textWrap: "balance",
      }}
    >
      {children}
    </h1>
  );
}

interface DescriptionProps {
  children: string;
  maxLength?: number;
  maxWidth?: number;
}

/**
 * Description component for OG images
 * Truncates long descriptions and maintains readability
 */
export function OGDescription({
  children,
  maxLength = 150,
  maxWidth,
}: DescriptionProps) {
  const text = truncateText(children, maxLength);
  const width = maxWidth || OG_CONFIG.spacing.descriptionMaxWidth;

  return (
    <p
      style={{
        fontSize: OG_CONFIG.typography.description.medium,
        color: OG_CONFIG.colors.textSecondary,
        lineHeight: 1.5,
        maxWidth: width,
        margin: 0,
        fontFamily: "Geist, system-ui, sans-serif",
        fontWeight: 700,
      }}
    >
      {text}
    </p>
  );
}

interface CategoryBadgeProps {
  children: string;
}

/**
 * Category badge for article OG images
 */
export function OGCategoryBadge({ children }: CategoryBadgeProps) {
  return (
    <span
      style={{
        display: "flex",
        alignSelf: "flex-start",
        alignItems: "center",
        padding: "8px 16px",
        fontSize: OG_CONFIG.typography.category,
        fontWeight: 500,
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 6,
        letterSpacing: "0.05em",
        fontFamily: "Geist Mono, monospace",
        textTransform: "uppercase",
      }}
    >
      {formatCategory(children)}
    </span>
  );
}

interface PageBadgeProps {
  children: string;
}

/**
 * Page type badge for section OG images
 */
export function OGPageBadge({ children }: PageBadgeProps) {
  return (
    <span
      style={{
        display: "flex",
        alignSelf: "flex-start",
        alignItems: "center",
        padding: "6px 14px",
        fontSize: OG_CONFIG.typography.badge,
        fontWeight: 500,
        color: "rgba(255, 255, 255, 0.9)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 4,
        letterSpacing: "0.1em",
        fontFamily: "Geist Mono, monospace",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
