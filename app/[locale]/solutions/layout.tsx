import { Metadata } from "next"
import { MegaMenu } from "@/components/mega-menu"
import { Footer } from "@/components/footer"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'

export const metadata: Metadata = {
  title: "Solutions",
  description: "We help companies modernize products, scale frontend ecosystems and build AI-native experiences through architecture-first engineering.",
  openGraph: {
    title: "Engineering systems built for scale.",
    description: "We help companies modernize products, scale frontend ecosystems and build AI-native experiences.",
    images: [
      {
        url: `${baseUrl}/api/og?path=solutions`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals Engineering Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering systems built for scale.",
    description: "We help companies modernize products, scale frontend ecosystems and build AI-native experiences.",
    images: [`${baseUrl}/api/og?path=solutions`],
  },
}

export default function SolutionsLayout({
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
