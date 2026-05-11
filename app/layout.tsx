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

export const metadata: Metadata = {
  title: 'OptimizeDeals | Frontend Architecture & Platform Engineering Studio',
  description: 'We build high-performance React and AI-powered platforms focused on scalability, architecture and execution speed. Specializing in micro-frontends, Module Federation, Nx monorepos, and AI integrations.',
  keywords: ['frontend architecture', 'React', 'Next.js', 'micro-frontends', 'Module Federation', 'Nx', 'platform engineering', 'AI integration', 'TypeScript'],
  authors: [{ name: 'OptimizeDeals' }],
  creator: 'OptimizeDeals',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'OptimizeDeals',
    title: 'OptimizeDeals | Frontend Architecture & Platform Engineering Studio',
    description: 'Engineering scalable frontend systems for modern products.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OptimizeDeals | Frontend Architecture Studio',
    description: 'Engineering scalable frontend systems for modern products.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
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
