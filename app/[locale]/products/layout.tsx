import { Metadata } from "next"
import { MegaMenu } from "@/components/mega-menu"
import { Footer } from "@/components/footer"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'

export const metadata: Metadata = {
  title: "Products",
  description: "Explore our portfolio of production applications and experimental systems built with modern architecture principles.",
  openGraph: {
    title: "Products built through engineering-first thinking.",
    description: "Explore our portfolio of production applications and experimental systems.",
    images: [
      {
        url: `${baseUrl}/api/og?path=products`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals Product Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products built through engineering-first thinking.",
    description: "Explore our portfolio of production applications and experimental systems.",
    images: [`${baseUrl}/api/og?path=products`],
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MegaMenu />
      {children}
      <Footer />
    </>
  )
}
