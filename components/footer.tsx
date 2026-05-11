"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

const navigation = {
  services: [
    { name: "Frontend Architecture", href: "#services" },
    { name: "Micro-frontends", href: "#services" },
    { name: "Platform Engineering", href: "#services" },
    { name: "AI Integration", href: "#services" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Case Studies", href: "#work" },
    { name: "Insights", href: "#insights" },
    { name: "Labs", href: "#" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Email", href: "mailto:hello@optimizedeals.com", icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#002A6B]/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001535]/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-white.svg"
                alt="OptimizeDeals"
                width={160}
                height={30}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-[#7A8BA7] max-w-md mb-6 leading-relaxed">
              A specialized engineering studio focused on frontend architecture, 
              platform engineering, and modern product development.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
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

          {/* Services column */}
          <div>
            <h4 className="text-sm font-mono text-[#585F78] uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
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
                    className="text-sm text-[#7A8BA7] hover:text-[#F0F5FB] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#002A6B]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#585F78] font-mono">
            © {new Date().getFullYear()} OptimizeDeals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-[#585F78] hover:text-[#7A8BA7] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-[#585F78] hover:text-[#7A8BA7] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
