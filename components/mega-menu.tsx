"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Layers,
  Box,
  ArrowRight,
  Cpu,
  Workflow,
  Zap,
  Brain,
  Wrench,
  ExternalLink,
  FlaskConical,
  FileText,
  Lightbulb,
  Target,
  Heart,
  Calendar,
  Building2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";

type NavItem = {
  key: string;
  href?: string;
  dropdown?: {
    sections: {
      titleKey?: string;
      items: {
        icon: React.ComponentType<{ className?: string }>;
        labelKey: string;
        href: string;
        external?: boolean;
      }[];
    }[];
    featured?: {
      titleKey: string;
      descriptionKey: string;
      href: string;
    };
  };
};

const navItems: NavItem[] = [
  {
    key: "solutions",
    dropdown: {
      sections: [
        {
          titleKey: "solutions.sectionEngineering",
          items: [
            {
              icon: Layers,
              labelKey: "solutions.frontendArchitecture",
              href: "/solutions#frontend-architecture",
            },
            {
              icon: Box,
              labelKey: "solutions.microfrontends",
              href: "/solutions#micro-frontends",
            },
            {
              icon: Workflow,
              labelKey: "solutions.platformEngineering",
              href: "/solutions#platform-engineering",
            },
          ],
        },
        {
          titleKey: "solutions.sectionModernSystems",
          items: [
            {
              icon: Brain,
              labelKey: "solutions.aiIntegration",
              href: "/solutions#ai-integration",
            },
            {
              icon: Wrench,
              labelKey: "solutions.modernization",
              href: "/solutions#modernization",
            },
          ],
        },
      ],
      featured: {
        titleKey: "solutions.featured.title",
        descriptionKey: "solutions.featured.description",
        href: "/solutions",
      },
    },
  },
  {
    key: "products",
    dropdown: {
      sections: [
        {
          titleKey: "products.sectionLive",
          items: [
            {
              icon: Calendar,
              labelKey: "products.agendaZap",
              href: "https://agenda-zap.com",
              external: true,
            },
            {
              icon: Cpu,
              labelKey: "products.interloquia",
              href: "https://interloquia.com",
              external: true,
            },
          ],
        },
        {
          titleKey: "products.sectionExperimental",
          items: [
            {
              icon: FlaskConical,
              labelKey: "products.labsProjects",
              href: "/labs",
            },
          ],
        },
      ],
      featured: {
        titleKey: "products.featured.title",
        descriptionKey: "products.featured.description",
        href: "/products",
      },
    },
  },
  {
    key: "labs",
    dropdown: {
      sections: [
        {
          titleKey: "labs.sectionResearch",
          items: [
            {
              icon: Zap,
              labelKey: "labs.runtimeFederation",
              href: "/labs#runtime-federation",
            },
            {
              icon: Brain,
              labelKey: "labs.aiStreaming",
              href: "/labs#ai-streaming",
            },
            {
              icon: Target,
              labelKey: "labs.performance",
              href: "/labs#performance",
            },
          ],
        },
      ],
      featured: {
        titleKey: "labs.featured.title",
        descriptionKey: "labs.featured.description",
        href: "/labs",
      },
    },
  },
  {
    key: "insights",
    dropdown: {
      sections: [
        {
          titleKey: "insights.sectionCategories",
          items: [
            {
              icon: FileText,
              labelKey: "insights.frontendArchitecture",
              href: "/insights?category=frontend-architecture",
            },
            {
              icon: Brain,
              labelKey: "insights.aiEngineering",
              href: "/insights?category=ai-engineering",
            },
            {
              icon: Lightbulb,
              labelKey: "insights.performance",
              href: "/insights?category=performance",
            },
          ],
        },
      ],
      featured: {
        titleKey: "insights.featured.title",
        descriptionKey: "insights.featured.description",
        href: "/insights",
      },
    },
  },
  {
    key: "company",
    dropdown: {
      sections: [
        {
          titleKey: "company.sectionAbout",
          items: [
            {
              icon: Building2,
              labelKey: "company.about",
              href: "/company",
            },
            {
              icon: Users,
              labelKey: "company.careers",
              href: "/careers",
            },
            {
              icon: Heart,
              labelKey: "company.culture",
              href: "/careers#culture",
            },
          ],
        },
      ],
      featured: {
        titleKey: "company.featured.title",
        descriptionKey: "company.featured.description",
        href: "/company",
      },
    },
  },
];

function NavLinkOrAnchor({
  href,
  external,
  onClick,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

function DropdownContent({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  if (!item.dropdown) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-card backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="megaMenuGrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#megaMenuGrid)" />
            </svg>
          </div>

          <div className="relative grid grid-cols-12 gap-0">
            <div className="col-span-8 p-6 grid grid-cols-2 gap-8">
              {item.dropdown.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {section.titleKey && (
                    <h4 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-4 pl-2">
                      {t(section.titleKey)}
                    </h4>
                  )}
                  <div className="space-y-1">
                    {section.items.map((subItem, subIndex) => {
                      const Icon = subItem.icon;
                      const label = t(`${subItem.labelKey}.label`);
                      const description = t(`${subItem.labelKey}.description`);
                      return (
                        <NavLinkOrAnchor
                          key={subIndex}
                          href={subItem.href}
                          external={subItem.external}
                          onClick={onClose}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-border/30 transition-all duration-200"
                        >
                          <div className="shrink-0 w-9 h-9 rounded-lg bg-border/50 border border-border flex items-center justify-center text-accent group-hover:text-foreground group-hover:border-accent/50 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors">
                                {label}
                              </span>
                              {subItem.external && (
                                <ExternalLink className="w-3 h-3 text-brand-gray" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {description}
                            </p>
                          </div>
                        </NavLinkOrAnchor>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {item.dropdown.featured && (
              <div className="col-span-4 bg-border/20 border-l border-border/40 p-6">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-foreground mb-2">
                      {t(item.dropdown.featured.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(item.dropdown.featured.descriptionKey)}
                    </p>
                  </div>
                  <Link
                    href={item.dropdown.featured.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground transition-colors mt-4 group"
                  >
                    {tCommon("actions.learnMore")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-background/98 backdrop-blur-lg"
            onClick={onClose}
          />
          <motion.nav
            className="absolute top-20 left-0 right-0 bottom-0 overflow-y-auto p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const itemLabel = t(`items.${item.key}`);
                return (
                  <div key={item.key} className="border-b border-border/50">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.key)}
                          className="w-full flex items-center justify-between py-4 text-lg text-foreground"
                        >
                          {itemLabel}
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              expandedItems.includes(item.key)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedItems.includes(item.key) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 pl-4 space-y-4">
                                {item.dropdown.sections.map(
                                  (section, sectionIndex) => (
                                    <div key={sectionIndex}>
                                      {section.titleKey && (
                                        <h4 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">
                                          {t(section.titleKey)}
                                        </h4>
                                      )}
                                      <div className="space-y-2">
                                        {section.items.map(
                                          (subItem, subIndex) => (
                                            <NavLinkOrAnchor
                                              key={subIndex}
                                              href={subItem.href}
                                              external={subItem.external}
                                              onClick={onClose}
                                              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                              {t(`${subItem.labelKey}.label`)}
                                              {subItem.external && (
                                                <ExternalLink className="w-3 h-3" />
                                              )}
                                            </NavLinkOrAnchor>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        onClick={onClose}
                        className="block py-4 text-lg text-foreground"
                      >
                        {itemLabel}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button
                className="w-full bg-primary hover:bg-accent text-white py-6 text-base font-medium rounded-lg"
                onClick={onClose}
                asChild
              >
                <Link href="/book">{tCommon("actions.bookCall")}</Link>
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MegaMenu() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 od-anim-header-in ${
          isScrolled || activeDropdown
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <LogoLink className="flex items-center">
            <Image
              src="/logo-white.svg"
              alt={tCommon("brand.name")}
              width={193}
              height={36}
              priority
            />
          </LogoLink>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {t(`items.${item.key}`)}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm transition-colors duration-200 ${
                      activeDropdown === item.key
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(`items.${item.key}`)}
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.key ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              size="sm"
              className="bg-primary hover:bg-accent text-white px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              asChild
            >
              <Link href="/book">{tCommon("actions.bookCall")}</Link>
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t("ariaToggleMenu")}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {activeDropdown && (
            <div
              onMouseEnter={() => handleMouseEnter(activeDropdown)}
              onMouseLeave={handleMouseLeave}
            >
              {navItems.map(
                (item) =>
                  item.key === activeDropdown &&
                  item.dropdown && (
                    <DropdownContent
                      key={item.key}
                      item={item}
                      onClose={() => setActiveDropdown(null)}
                    />
                  ),
              )}
            </div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
