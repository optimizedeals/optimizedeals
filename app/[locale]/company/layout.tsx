import { Metadata } from "next";
import { SITE_URL } from "@/lib/env";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Company",
  description:
    "OptimizeDeals is a founder-led engineering studio focused on frontend architecture, scalable systems, AI-native products, and modern engineering infrastructure.",
  openGraph: {
    title: "A studio built for engineering excellence.",
    description:
      "OptimizeDeals is a founder-led engineering studio focused on frontend architecture and AI-native products.",
    images: [
      {
        url: `${SITE_URL}/api/og?path=company`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A studio built for engineering excellence.",
    description:
      "OptimizeDeals is a founder-led engineering studio focused on frontend architecture and AI-native products.",
    images: [`${SITE_URL}/api/og?path=company`],
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MegaMenu />
      {children}
      <Footer />
    </>
  );
}
