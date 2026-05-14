import "../globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CookieConsentMount } from "@/components/cookie-consent-mount";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { routing } from "@/lib/i18n/routing";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/env";
import { buildLocaleMetadata, localizedUrl } from "@/lib/seo";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const [t, tCommon] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  return {
    ...buildLocaleMetadata({
      locale: locale as Locale,
      path: "/",
      title: t("home.title"),
      description: t("home.description"),
      openGraph: {
        title: t("home.ogTitle"),
        description: t("home.ogDescription"),
      },
      keywords: t("home.keywords")
        .split(",")
        .map((k) => k.trim()),
    }),
    title: {
      default: t("home.title"),
      template: `%s | ${tCommon("brand.name")}`,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000216",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required so `useTranslations` works inside server components without
  // implicit dynamic rendering.
  setRequestLocale(locale);

  const meta = LOCALE_META[locale as Locale];
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={meta.htmlLang}
      data-scroll-behavior="smooth"
      className="bg-background"
    >
      <head>
        {/* Framer Motion's SSR output sets `opacity:0` inline styles that
            hide above-the-fold content when JavaScript is disabled. The
            noscript stylesheet below neutralizes the hidden initial state
            so crawlers and no-JS users still see the content. */}
        <noscript>
          <style>{`
            [style*="opacity:0"],
            [style*="opacity: 0"] { opacity: 1 !important; }
            [style*="transform"] { transform: none !important; }
            [style*="visibility:hidden"],
            [style*="visibility: hidden"] { visibility: visible !important; }
            [style*="filter:blur"],
            [style*="filter: blur"] { filter: none !important; }
            .od-anim-fade-up,
            .od-anim-fade-up-lg,
            .od-anim-fade-scale,
            .od-anim-fade-in,
            .od-anim-header-in {
              opacity: 1 !important;
              transform: none !important;
              animation: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-white focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {tCommon("actions.skipToMain")}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: tCommon("brand.name"),
                  url: SITE_URL,
                  logo: `${SITE_URL}/logo-white.svg`,
                  description: tCommon("brand.shortDescription"),
                  sameAs: [
                    "https://linkedin.com/company/optimizedeals",
                    "https://github.com/optimizedeals",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: localizedUrl(locale as Locale),
                  name: tCommon("brand.name"),
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: meta.htmlLang,
                },
              ],
            }),
          }}
        />
        <NextIntlClientProvider locale={locale}>
          <div id="main-content">{children}</div>
          <CookieConsentMount />
        </NextIntlClientProvider>
        <GoogleAnalytics />
        <GoogleTagManager />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
