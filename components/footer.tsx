"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { LogoLink } from "@/components/logo-link";
import { LanguageSwitcher } from "@/components/language-switcher";

interface FooterLink {
  key: string;
  href: string;
  external?: boolean;
}

const SOLUTIONS: FooterLink[] = [
  { key: "frontendArchitecture", href: "/solutions#frontend-architecture" },
  { key: "microfrontends", href: "/solutions#micro-frontends" },
  { key: "platformEngineering", href: "/solutions#platform-engineering" },
  { key: "aiIntegration", href: "/solutions#ai-integration" },
  { key: "modernization", href: "/solutions#modernization" },
];

const PRODUCTS: FooterLink[] = [
  { key: "agendaZap", href: "https://agenda-zap.com", external: true },
  { key: "interloquia", href: "https://interloquia.com", external: true },
  { key: "labs", href: "/labs" },
];

const RESOURCES: FooterLink[] = [
  { key: "insights", href: "/insights" },
  { key: "caseStudies", href: "/#work" },
  { key: "research", href: "/labs" },
  { key: "contact", href: "/company#contact" },
  { key: "sitemap", href: "/sitemap.xml" },
  { key: "llmIndex", href: "/llm.txt" },
];

const COMPANY: FooterLink[] = [
  { key: "about", href: "/company" },
  { key: "careers", href: "/careers" },
  {
    key: "linkedin",
    href: "https://linkedin.com/company/optimizedeals",
    external: true,
  },
  { key: "github", href: "https://github.com/optimizedeals", external: true },
];

const SOCIAL = [
  { key: "github", href: "https://github.com/optimizedeals", icon: Github },
  {
    key: "linkedin",
    href: "https://linkedin.com/company/optimizedeals",
    icon: Linkedin,
  },
  { key: "email", href: "mailto:contact@optimize.deals", icon: Mail },
];

function FooterLinkItem({ link, label }: { link: FooterLink; label: string }) {
  if (link.external || link.href.startsWith("http") || link.href.endsWith(".xml") || link.href.endsWith(".txt") || link.href.startsWith("/sitemap") || link.href.startsWith("/llm")) {
    return (
      <a
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        {label}
      </a>
    );
  }
  return (
    <Link
      href={link.href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      {label}
    </Link>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  const columns = [
    { title: t("columns.solutions"), items: SOLUTIONS },
    { title: t("columns.products"), items: PRODUCTS },
    { title: t("columns.resources"), items: RESOURCES },
    { title: t("columns.company"), items: COMPANY },
  ];

  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
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

      <div className="absolute inset-0 bg-linear-to-t from-card/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2">
            <LogoLink className="inline-block mb-6">
              <Image
                src="/logo-white.svg"
                alt={tCommon("brand.name")}
                width={160}
                height={36}
                className="h-9 w-auto"
              />
            </LogoLink>
            <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
              {t("tagline")}
            </p>

            <div className="flex items-center gap-3 mb-6">
              {SOCIAL.map((item) => {
                const Icon = item.icon;
                const label = t(`links.${item.key}`);
                return (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                );
              })}
            </div>

            <LanguageSwitcher />
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.items.map((link) => (
                  <li key={link.key}>
                    <FooterLinkItem
                      link={link}
                      label={t(`links.${link.key}`)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-border/50 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-gray font-mono">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-brand-gray hover:text-muted-foreground transition-colors"
            >
              {t("links.privacyPolicy")}
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-xs text-brand-gray hover:text-muted-foreground transition-colors"
            >
              {t("links.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
