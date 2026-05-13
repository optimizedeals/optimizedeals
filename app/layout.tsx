import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CookieConsentMount } from "@/components/cookie-consent-mount";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Base URL for OG images
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://optimize.deals";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "OptimizeDeals | Frontend Architecture & Platform Engineering Studio",
    template: "%s | OptimizeDeals",
  },
  description:
    "We build high-performance systems and AI-powered platforms focused on scalability, architecture and execution speed. Specializing in micro-frontends, Module Federation, Nx monorepos, and AI integrations.",
  keywords: [
    "Node.js",
    "React",
    "Next.js",
    "micro-frontends",
    "Module Federation",
    "JavaScript",
    "platform engineering",
    "AI integration",
    "TypeScript",
  ],
  authors: [{ name: "OptimizeDeals" }],
  creator: "OptimizeDeals",
  publisher: "OptimizeDeals",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "OptimizeDeals",
    title: "OptimizeDeals | Architecture & Platform Engineering Studio",
    description: "Engineering scalable systems for modern products.",
    images: [
      {
        url: `${baseUrl}/api/og?path=`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals - Architecture & Platform Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OptimizeDeals | Architecture & Platform Engineering Studio",
    description: "Engineering scalable systems for modern products.",
    images: [`${baseUrl}/api/og?path=`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: baseUrl,
  },
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
  return (
    <html lang="en" className="bg-background">
      <head>
        {/*
          When JavaScript is disabled (search engine crawlers, no-JS users),
          Framer Motion's SSR output keeps its `initial={{ opacity: 0, y: 20 }}`
          inline styles applied because the client hydration never runs. That
          hides above-the-fold content from crawlers and tanks SEO scores.
          The noscript stylesheet below neutralizes the hidden initial state
          so all content is immediately visible without JS, while leaving the
          regular animation pipeline untouched when JS is enabled.
        */}
        <noscript>
          <style>{`
            [style*="opacity:0"],
            [style*="opacity: 0"] { opacity: 1 !important; }
            [style*="transform"] { transform: none !important; }
            [style*="visibility:hidden"],
            [style*="visibility: hidden"] { visibility: visible !important; }
            [style*="filter:blur"],
            [style*="filter: blur"] { filter: none !important; }
          `}</style>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* Keyboard-first skip link. Visually hidden until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-white focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          // JSON-LD structured data — improves rich-result eligibility.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${baseUrl}/#organization`,
                  name: "OptimizeDeals",
                  url: baseUrl,
                  logo: `${baseUrl}/logo-white.svg`,
                  description:
                    "Architecture & Platform Engineering studio specializing in Module Federation, distributed frontend architecture, runtime systems, and AI-native developer infrastructure.",
                  sameAs: [
                    "https://linkedin.com/company/optimizedeals",
                    "https://github.com/optimizedeals",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  url: baseUrl,
                  name: "OptimizeDeals",
                  publisher: { "@id": `${baseUrl}/#organization` },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
        <div id="main-content">{children}</div>
        <CookieConsentMount />
        <GoogleAnalytics />
        <GoogleTagManager />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
