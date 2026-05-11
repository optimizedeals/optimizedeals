"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

const navigation = {
  solutions: [
    { name: "Frontend Architecture", href: "/solutions#frontend-architecture" },
    { name: "Micro-frontends", href: "/solutions#micro-frontends" },
    { name: "Platform Engineering", href: "/solutions#platform-engineering" },
    { name: "AI Integration", href: "/solutions#ai-integration" },
    { name: "Product Modernization", href: "/solutions#modernization" },
  ],
  products: [
    { name: "AgendaZap", href: "https://agenda-zap.com", external: true },
    { name: "Interloquia", href: "https://interloquia.com", external: true },
    { name: "Labs", href: "/labs" },
  ],
  resources: [
    { name: "Insights", href: "/insights" },
    { name: "Case Studies", href: "/#work" },
    { name: "Research", href: "/labs" },
    { name: "Contact", href: "/company#contact" },
  ],
  company: [
    { name: "About", href: "/company" },
    { name: "Careers", href: "/careers" },
    { name: "LinkedIn", href: "https://linkedin.com/company/optimizedeals", external: true },
    { name: "GitHub", href: "https://github.com/optimizedeals", external: true },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/optimizedeals", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/company/optimizedeals", icon: Linkedin },
    { name: "Email", href: "mailto:contact@optimize.deals", icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#002A6B]/50 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footerGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3B80EC" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001535]/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0054D6]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-white.svg"
                alt="OptimizeDeals"
                width={160}
                height={30}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-[#7A8BA7] max-w-sm mb-6 leading-relaxed">
              Engineering scalable frontend and AI-native systems for modern products.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#001535]/50 border border-[#002A6B]/50 text-[#7A8BA7] hover:text-[#F0F5FB] hover:border-[#002A6B] transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="sr-only">{item.name}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Solutions column */}
          <div>
            <h4 className="text-sm font-mono text-[#585F78] uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#7A8BA7] hover:text-[#F0F5FB] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h4 className="text-sm font-mono text-[#585F78] uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-[#7A8BA7] hover:text-[#F0F5FB] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-sm font-mono text-[#585F78] uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#7A8BA7] hover:text-[#F0F5FB] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-mono text-[#585F78] uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-[#7A8BA7] hover:text-[#F0F5FB] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#002A6B]/50 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#585F78] font-mono">
            © {new Date().getFullYear()} OptimizeDeals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/company" className="text-xs text-[#585F78] hover:text-[#7A8BA7] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/company" className="text-xs text-[#585F78] hover:text-[#7A8BA7] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
