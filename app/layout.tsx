import type { Metadata, Viewport } from "next";

/**
 * Root layout is intentionally minimal because the localized layout at
 * `app/[locale]/layout.tsx` renders the real `<html>` / `<body>` shell.
 * Next still requires this file to exist, but it only needs to forward
 * children. Locale-aware metadata is generated per-route inside the
 * `[locale]` tree using `lib/seo`.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://optimize.deals";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
};

export const viewport: Viewport = {
  themeColor: "#000216",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
