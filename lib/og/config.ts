// OG Image Configuration
// Brand colors and typography settings for dynamic OG generation

export const OG_CONFIG = {
  // Image dimensions (standard OG)
  width: 1200,
  height: 630,

  // Brand colors
  colors: {
    // Primary blue (from the brand)
    primary: "#0054D6",
    primaryLight: "#3B80EC",

    // Background blues
    bgDark: "#0046B5", // Deep blue background
    bgMedium: "#0054D6", // Medium blue
    bgLight: "#3B80EC", // Light blue accent

    // Text colors
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    textMuted: "rgba(255, 255, 255, 0.6)",
  },

  // Font sizes
  typography: {
    title: {
      large: 64,
      medium: 56,
      small: 48,
    },
    description: {
      large: 32,
      medium: 28,
      small: 24,
    },
    category: 16,
    badge: 14,
  },

  // Spacing
  spacing: {
    padding: 60,
    logoTop: 50,
    logoLeft: 50,
    contentTop: 280,
    contentLeft: 60,
    contentRight: 60,
    titleMaxWidth: 1000,
    descriptionMaxWidth: 900,
  },
} as const;

export type OGConfig = typeof OG_CONFIG;

// Page type definitions for different OG styles
export type PageType =
  | "homepage"
  | "solutions"
  | "products"
  | "labs"
  | "insights"
  | "article"
  | "company"
  | "careers"
  | "default";

// Page metadata interface
export interface PageOGData {
  title: string;
  description?: string;
  category?: string;
  pageType: PageType;
}
