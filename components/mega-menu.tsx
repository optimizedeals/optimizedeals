"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Layers, Box, Beaker, BookOpen, Building2, Users, ArrowRight, Cpu, Workflow, Zap, Brain, Wrench, ExternalLink, FlaskConical, FileText, Lightbulb, Target, Heart, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

type NavItem = {
  label: string
  href?: string
  dropdown?: {
    sections: {
      title?: string
      items: {
        icon: React.ComponentType<{ className?: string }>
        label: string
        description: string
        href: string
        external?: boolean
      }[]
    }[]
    featured?: {
      title: string
      description: string
      href: string
      image?: string
    }
  }
}

const navItems: NavItem[] = [
  {
    label: "Solutions",
    dropdown: {
      sections: [
        {
          title: "Engineering Services",
          items: [
            {
              icon: Layers,
              label: "Frontend Architecture",
              description: "Scalable React ecosystems and enterprise systems",
              href: "/solutions#frontend-architecture",
            },
            {
              icon: Box,
              label: "Micro-frontends",
              description: "Runtime composition and federated systems",
              href: "/solutions#micro-frontends",
            },
            {
              icon: Workflow,
              label: "Platform Engineering",
              description: "Monorepos, Nx, and build system optimization",
              href: "/solutions#platform-engineering",
            },
          ],
        },
        {
          title: "Modern Systems",
          items: [
            {
              icon: Brain,
              label: "AI Integration",
              description: "RAG systems and AI-native experiences",
              href: "/solutions#ai-integration",
            },
            {
              icon: Wrench,
              label: "Product Modernization",
              description: "Legacy migrations and technical debt reduction",
              href: "/solutions#modernization",
            },
          ],
        },
      ],
      featured: {
        title: "Engineering systems built for scale",
        description: "Discover how we help companies modernize products and scale frontend ecosystems.",
        href: "/solutions",
      },
    },
  },
  {
    label: "Products",
    dropdown: {
      sections: [
        {
          title: "Live Products",
          items: [
            {
              icon: Calendar,
              label: "AgendaZap",
              description: "Scheduling automation with WhatsApp workflows",
              href: "https://agenda-zap.com",
              external: true,
            },
            {
              icon: Cpu,
              label: "Interloquia",
              description: "AI-native communication and workflow platform",
              href: "https://interloquia.com",
              external: true,
            },
          ],
        },
        {
          title: "Experimental",
          items: [
            {
              icon: FlaskConical,
              label: "Labs Projects",
              description: "Research and experimental systems",
              href: "/labs",
            },
          ],
        },
      ],
      featured: {
        title: "Products built through engineering-first thinking",
        description: "Explore our portfolio of production applications and experimental systems.",
        href: "/products",
      },
    },
  },
  {
    label: "Labs",
    dropdown: {
      sections: [
        {
          title: "Research Areas",
          items: [
            {
              icon: Zap,
              label: "Runtime Federation Lab",
              description: "Module federation and dynamic systems",
              href: "/labs#runtime-federation",
            },
            {
              icon: Brain,
              label: "AI Streaming Interfaces",
              description: "Real-time AI interaction patterns",
              href: "/labs#ai-streaming",
            },
            {
              icon: Target,
              label: "Performance Experiments",
              description: "Frontend optimization research",
              href: "/labs#performance",
            },
          ],
        },
      ],
      featured: {
        title: "Engineering research and experimental systems",
        description: "Explore our cutting-edge research in frontend architecture and AI systems.",
        href: "/labs",
      },
    },
  },
  {
    label: "Insights",
    dropdown: {
      sections: [
        {
          title: "Categories",
          items: [
            {
              icon: FileText,
              label: "Frontend Architecture",
              description: "Deep dives into scalable systems",
              href: "/insights?category=frontend-architecture",
            },
            {
              icon: Brain,
              label: "AI Engineering",
              description: "AI integration and RAG systems",
              href: "/insights?category=ai-engineering",
            },
            {
              icon: Lightbulb,
              label: "Performance Engineering",
              description: "Optimization techniques and patterns",
              href: "/insights?category=performance",
            },
          ],
        },
      ],
      featured: {
        title: "Technical writing and engineering insights",
        description: "In-depth articles on modern frontend architecture and AI engineering.",
        href: "/insights",
      },
    },
  },
  {
    label: "Company",
    dropdown: {
      sections: [
        {
          title: "About Us",
          items: [
            {
              icon: Building2,
              label: "About",
              description: "Our philosophy and engineering principles",
              href: "/company",
            },
            {
              icon: Users,
              label: "Careers",
              description: "Join our engineering team",
              href: "/careers",
            },
            {
              icon: Heart,
              label: "Culture",
              description: "How we think and build",
              href: "/careers#culture",
            },
          ],
        },
      ],
      featured: {
        title: "A studio built for engineering excellence",
        description: "Learn about our founder-led approach to technical consulting.",
        href: "/company",
      },
    },
  },
]

function DropdownContent({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (!item.dropdown) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#001535]/95 backdrop-blur-xl border border-[#002A6B]/60 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="megaMenuGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B80EC" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#megaMenuGrid)" />
            </svg>
          </div>

          <div className="relative grid grid-cols-12 gap-0">
            {/* Navigation sections */}
            <div className="col-span-8 p-6 grid grid-cols-2 gap-8">
              {item.dropdown.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {section.title && (
                    <h4 className="text-xs font-mono text-[#585F78] uppercase tracking-wider mb-4 pl-2">
                      {section.title}
                    </h4>
                  )}
                  <div className="space-y-1">
                    {section.items.map((subItem, subIndex) => {
                      const Icon = subItem.icon
                      return (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          target={subItem.external ? "_blank" : undefined}
                          rel={subItem.external ? "noopener noreferrer" : undefined}
                          onClick={onClose}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#002A6B]/30 transition-all duration-200"
                        >
                          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#002A6B]/50 border border-[#002A6B] flex items-center justify-center text-[#3B80EC] group-hover:text-[#F0F5FB] group-hover:border-[#3B80EC]/50 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[#F0F5FB] group-hover:text-white transition-colors">
                                {subItem.label}
                              </span>
                              {subItem.external && (
                                <ExternalLink className="w-3 h-3 text-[#585F78]" />
                              )}
                            </div>
                            <p className="text-xs text-[#7A8BA7] mt-0.5 leading-relaxed">
                              {subItem.description}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Featured section */}
            {item.dropdown.featured && (
              <div className="col-span-4 bg-[#002A6B]/20 border-l border-[#002A6B]/40 p-6">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-[#F0F5FB] mb-2">
                      {item.dropdown.featured.title}
                    </h3>
                    <p className="text-sm text-[#7A8BA7] leading-relaxed">
                      {item.dropdown.featured.description}
                    </p>
                  </div>
                  <Link
                    href={item.dropdown.featured.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#3B80EC] hover:text-[#F0F5FB] transition-colors mt-4 group"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#000216]/98 backdrop-blur-lg" onClick={onClose} />
          <motion.nav
            className="absolute top-20 left-0 right-0 bottom-0 overflow-y-auto p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-[#002A6B]/50">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className="w-full flex items-center justify-between py-4 text-lg text-[#F0F5FB]"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 text-[#7A8BA7] transition-transform ${
                            expandedItems.includes(item.label) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItems.includes(item.label) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-4 space-y-4">
                              {item.dropdown.sections.map((section, sectionIndex) => (
                                <div key={sectionIndex}>
                                  {section.title && (
                                    <h4 className="text-xs font-mono text-[#585F78] uppercase tracking-wider mb-2">
                                      {section.title}
                                    </h4>
                                  )}
                                  <div className="space-y-2">
                                    {section.items.map((subItem, subIndex) => (
                                      <Link
                                        key={subIndex}
                                        href={subItem.href}
                                        target={subItem.external ? "_blank" : undefined}
                                        rel={subItem.external ? "noopener noreferrer" : undefined}
                                        onClick={onClose}
                                        className="flex items-center gap-2 py-2 text-sm text-[#7A8BA7] hover:text-[#F0F5FB] transition-colors"
                                      >
                                        {subItem.label}
                                        {subItem.external && <ExternalLink className="w-3 h-3" />}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={onClose}
                      className="block py-4 text-lg text-[#F0F5FB]"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                className="w-full bg-[#0054D6] hover:bg-[#3B80EC] text-white py-6 text-base font-medium rounded-lg"
                onClick={onClose}
                asChild
              >
                <Link href="/book">Book a Call</Link>
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function MegaMenu() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || activeDropdown
            ? "bg-[#000216]/90 backdrop-blur-xl border-b border-[#002A6B]/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.svg"
              alt="OptimizeDeals"
              width={160}
              height={30}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-[#7A8BA7] hover:text-[#F0F5FB] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm transition-colors duration-200 ${
                      activeDropdown === item.label ? "text-[#F0F5FB]" : "text-[#7A8BA7] hover:text-[#F0F5FB]"
                    }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              size="sm"
              className="bg-[#0054D6] hover:bg-[#3B80EC] text-white px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              asChild
            >
              <Link href="/book">Book a Call</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#F0F5FB] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Desktop Dropdown */}
        <AnimatePresence>
          {activeDropdown && (
            <div onMouseEnter={() => handleMouseEnter(activeDropdown)} onMouseLeave={handleMouseLeave}>
              {navItems.map(
                (item) =>
                  item.label === activeDropdown &&
                  item.dropdown && (
                    <DropdownContent key={item.label} item={item} onClose={() => setActiveDropdown(null)} />
                  )
              )}
            </div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
