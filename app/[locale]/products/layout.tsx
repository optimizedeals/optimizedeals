import { Metadata } from "next";
import { SITE_URL } from "@/lib/env";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our portfolio of production applications and experimental systems built with modern architecture principles.",
  openGraph: {
    title: "Products built through engineering-first thinking.",
    description:
      "Explore our portfolio of production applications and experimental systems.",
    images: [
      {
        url: `${SITE_URL}/api/og?path=products`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals Product Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products built through engineering-first thinking.",
    description:
      "Explore our portfolio of production applications and experimental systems.",
    images: [`${SITE_URL}/api/og?path=products`],
  },
};

export default function ProductsLayout({
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
