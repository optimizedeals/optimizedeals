"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { LogoLink } from "@/components/logo-link";

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
    { name: "Sitemap", href: "/sitemap.xml" },
    { name: "AI Index (llm.txt)", href: "/llm.txt" },
  ],
  company: [
    { name: "About", href: "/company" },
    { name: "Careers", href: "/careers" },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/optimizedeals",
      external: true,
    },
    {
      name: "GitHub",
      href: "https://github.com/optimizedeals",
      external: true,
    },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/optimizedeals", icon: Github },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/optimizedeals",
      icon: Linkedin,
    },
    { name: "Email", href: "mailto:contact@optimize.deals", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footerGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-card/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <LogoLink className="inline-block mb-6">
              <Image
                src="/logo-white.svg"
                alt="OptimizeDeals"
                width={160}
                height={36}
                className="h-9 w-auto"
              />
            </LogoLink>
            <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Engineering scalable systems and AI-native solutions for modern
              products.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="sr-only">{item.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Solutions column */}
          <div>
            <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-linear-to-r from-transparent via-border/50 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-gray font-mono">
            © {new Date().getFullYear()} OptimizeDeals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-brand-gray hover:text-muted-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-xs text-brand-gray hover:text-muted-foreground transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
