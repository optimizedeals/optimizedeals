import { Metadata } from "next";
import { SITE_URL } from "@/lib/env";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Let's discuss your engineering challenges. Architecture, modernization, AI systems and scalable frontend engineering.",
  openGraph: {
    title: "Book a Discovery Call",
    description:
      "Let's discuss your engineering challenges and explore how we can help.",
    images: [
      {
        url: `${SITE_URL}/api/og?path=book`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals - Book a Discovery Call",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Discovery Call",
    description:
      "Let's discuss your engineering challenges and explore how we can help.",
    images: [`${SITE_URL}/api/og?path=book`],
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
