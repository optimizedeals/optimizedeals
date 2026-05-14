import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXContent } from "@/components/blog/mdx-content";
import {
  LEGAL_SLUGS,
  type LegalSlug,
  isLegalSlug,
  loadLegalContent,
} from "@/lib/legal";
import { buildLocaleMetadata } from "@/lib/seo";
import { LOCALES, type Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { locale: Locale; slug: LegalSlug }[] = [];
  for (const locale of LOCALES) {
    for (const slug of LEGAL_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

function metadataKey(slug: LegalSlug): "privacy" | "terms" {
  return slug === "privacy-policy" ? "privacy" : "terms";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: "legal" });
  const key = metadataKey(slug);

  return buildLocaleMetadata({
    locale: locale as Locale,
    path: `/${slug}`,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  });
}

export default async function LegalPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isLegalSlug(slug)) notFound();

  const loaded = loadLegalContent(locale as Locale, slug);
  if (!loaded) notFound();

  return (
    <article className="prose prose-invert prose-lg max-w-none wrap-break-word">
      <MDXContent content={loaded.content} />
    </article>
  );
}
