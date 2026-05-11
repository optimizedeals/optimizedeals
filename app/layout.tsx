import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

// Base URL for OG images
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://optimize.deals'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'OptimizeDeals | Frontend Architecture & Platform Engineering Studio',
    template: '%s | OptimizeDeals',
  },
  description: 'We build high-performance React and AI-powered platforms focused on scalability, architecture and execution speed. Specializing in micro-frontends, Module Federation, Nx monorepos, and AI integrations.',
  keywords: ['frontend architecture', 'React', 'Next.js', 'micro-frontends', 'Module Federation', 'Nx', 'platform engineering', 'AI integration', 'TypeScript'],
  authors: [{ name: 'OptimizeDeals' }],
  creator: 'OptimizeDeals',
  publisher: 'OptimizeDeals',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'OptimizeDeals',
    title: 'OptimizeDeals | Frontend Architecture & Platform Engineering Studio',
    description: 'Engineering scalable frontend systems for modern products.',
    images: [
      {
        url: `${baseUrl}/api/og?path=`,
        width: 1200,
        height: 630,
        alt: 'OptimizeDeals - Frontend Architecture Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OptimizeDeals | Frontend Architecture Studio',
    description: 'Engineering scalable frontend systems for modern products.',
    images: [`${baseUrl}/api/og?path=`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: baseUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#000216',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#000216]">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#000216] text-[#F0F5FB]`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
