import { Metadata } from "next";
import { SITE_URL } from "@/lib/env";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We're building a culture focused on engineering quality, systems thinking and long-term technical excellence. Join our team.",
  openGraph: {
    title: "Build systems that scale.",
    description:
      "We're building a culture focused on engineering quality, systems thinking and technical excellence.",
    images: [
      {
        url: `${SITE_URL}/api/og?path=careers`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals Careers - Join Our Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build systems that scale.",
    description:
      "We're building a culture focused on engineering quality, systems thinking and technical excellence.",
    images: [`${SITE_URL}/api/og?path=careers`],
  },
};

export default function CareersLayout({
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
