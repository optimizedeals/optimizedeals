import { Metadata } from "next"
import { MegaMenu } from "@/components/mega-menu"
import { Footer } from "@/components/footer"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'

export const metadata: Metadata = {
  title: "Labs",
  description: "Exploring the frontiers of frontend architecture, AI integration, and performance optimization through hands-on research and experimentation.",
  openGraph: {
    title: "Engineering research and experimental systems.",
    description: "Exploring the frontiers of frontend architecture, AI integration, and performance optimization.",
    images: [
      {
        url: `${baseUrl}/api/og?path=labs`,
        width: 1200,
        height: 630,
        alt: "OptimizeDeals Labs - Research & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering research and experimental systems.",
    description: "Exploring the frontiers of frontend architecture, AI integration, and performance optimization.",
    images: [`${baseUrl}/api/og?path=labs`],
  },
}

export default function LabsLayout({
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
