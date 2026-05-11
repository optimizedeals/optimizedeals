"use client"

import { motion } from "framer-motion"
import { Calendar, Cpu, ExternalLink, ArrowRight, MessageSquare, Zap, Clock, Workflow, Brain, Sparkles, FlaskConical, Box, Server, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import Link from "next/link"

const liveProducts = [
  {
    name: "AgendaZap",
    tagline: "Scheduling automation platform",
    description: "Scheduling automation platform focused on operational simplicity, WhatsApp workflows and modern booking experiences.",
    href: "https://agenda-zap.com",
    icon: Calendar,
    color: "#0054D6",
    highlights: [
      { icon: MessageSquare, text: "WhatsApp integrations" },
      { icon: Calendar, text: "Scheduling flows" },
      { icon: Zap, text: "Automation" },
      { icon: Clock, text: "Operational efficiency" },
    ],
    technologies: ["Next.js", "TypeScript", "WhatsApp API", "PostgreSQL", "Vercel"],
  },
  {
    name: "Interloquia",
    tagline: "AI-native communication platform",
    description: "AI-native communication and workflow platform designed for contextual interactions, intelligent systems and modern AI experiences.",
    href: "https://interloquia.com",
    icon: Cpu,
    color: "#3B80EC",
    highlights: [
      { icon: Brain, text: "AI workflows" },
      { icon: Workflow, text: "Contextual interfaces" },
      { icon: Sparkles, text: "RAG-ready systems" },
      { icon: Zap, text: "Streaming interactions" },
    ],
    technologies: ["React", "OpenAI", "LangChain", "Vercel AI SDK", "PostgreSQL"],
  },
]

const experimentalProducts = [
  {
    name: "Federation Runtime",
    description: "Experimental module federation orchestration layer for complex micro-frontend deployments.",
    status: "Research",
    icon: Box,
  },
  {
    name: "StreamUI Kit",
    description: "Component library optimized for AI streaming interfaces and real-time content generation.",
    status: "Beta",
    icon: Sparkles,
  },
  {
    name: "Nx Cloud Connect",
    description: "Internal tooling for distributed cache optimization across monorepo builds.",
    status: "Internal",
    icon: Server,
  },
  {
    name: "RAG Playground",
    description: "Testing environment for retrieval-augmented generation systems and context strategies.",
    status: "Active",
    icon: Brain,
  },
  {
    name: "Deploy Graph",
    description: "Dependency visualization and deployment orchestration for multi-service architectures.",
    status: "Research",
    icon: GitBranch,
  },
  {
    name: "Perf Monitor",
    description: "Real-time frontend performance monitoring and Core Web Vitals tracking dashboard.",
    status: "Beta",
    icon: Zap,
  },
]

function ProductCard({ product, index }: { product: typeof liveProducts[0]; index: number }) {
  const Icon = product.icon

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      <div className="relative p-8 bg-[#001535]/50 border border-[#002A6B]/50 rounded-2xl overflow-hidden hover:border-[#002A6B] transition-colors duration-300">
        {/* Background gradient */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: product.color }}
        />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: `${product.color}20`, border: `1px solid ${product.color}40` }}
              >
                <Icon className="w-7 h-7" style={{ color: product.color }} />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-[#F0F5FB]">{product.name}</h3>
                <p className="text-sm text-[#7A8BA7]">{product.tagline}</p>
              </div>
            </div>
            <Link
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#002A6B]/30 border border-[#002A6B]/50 rounded-lg text-sm text-[#7A8BA7] hover:text-[#F0F5FB] hover:border-[#002A6B] transition-colors"
            >
              Visit
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Description */}
          <p className="text-[#7A8BA7] leading-relaxed mb-8">{product.description}</p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {product.highlights.map((highlight, i) => {
              const HighlightIcon = highlight.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <HighlightIcon className="w-4 h-4 text-[#3B80EC]" />
                  <span className="text-sm text-[#7A8BA7]">{highlight.text}</span>
                </div>
              )
            })}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {product.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-[#002A6B]/30 border border-[#002A6B]/50 rounded-full text-[#585F78]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ExperimentalCard({ product, index }: { product: typeof experimentalProducts[0]; index: number }) {
  const Icon = product.icon

  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    Active: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
    Beta: { bg: "bg-[#0054D6]/10", text: "text-[#3B80EC]", border: "border-[#0054D6]/30" },
    Research: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
    Internal: { bg: "bg-[#002A6B]/30", text: "text-[#7A8BA7]", border: "border-[#002A6B]/50" },
  }

  const status = statusColors[product.status] || statusColors.Internal

  return (
    <motion.div
      className="group p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl hover:border-[#002A6B]/60 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#002A6B]/30 border border-[#002A6B]/50 flex items-center justify-center text-[#7A8BA7] group-hover:text-[#3B80EC] transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className={`px-2 py-0.5 text-xs font-mono rounded-full ${status.bg} ${status.text} ${status.border} border`}>
          {product.status}
        </span>
      </div>
      <h4 className="text-base font-medium text-[#F0F5FB] mb-2">{product.name}</h4>
      <p className="text-sm text-[#7A8BA7] leading-relaxed">{product.description}</p>
    </motion.div>
  )
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#000216]">
      <PageHero
        badge="Product Portfolio"
        title="Products built through"
        titleHighlight="engineering-first thinking."
        description="Explore our portfolio of production applications and experimental systems built with modern architecture principles."
      />

      {/* Live Products */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              Live Products
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB]">
              Production Applications
            </h2>
          </motion.div>

          <div className="space-y-8">
            {liveProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experimental Products */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-2">
              <FlaskConical className="w-5 h-5 text-[#3B80EC]" />
              <span className="text-xs font-mono text-[#3B80EC] uppercase tracking-wider">
                Experimental
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Experimental Products & Internal Systems
            </h2>
            <p className="text-[#7A8BA7] max-w-2xl">
              Research projects, internal tooling, and experimental systems we&apos;re developing to push the boundaries of frontend architecture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experimentalProducts.map((product, index) => (
              <ExperimentalCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Have a product idea?
            </h2>
            <p className="text-[#7A8BA7] mb-8 max-w-2xl mx-auto">
              We help companies transform ideas into production-ready applications with modern architecture and engineering excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#0054D6] hover:bg-[#3B80EC] text-white px-8 py-6 text-base font-medium rounded-lg"
                asChild
              >
                <Link href="/company#contact">Start a Conversation</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#002A6B] bg-transparent hover:bg-[#001535] text-[#F0F5FB] px-8 py-6 text-base font-medium rounded-lg group"
                asChild
              >
                <Link href="/labs">
                  Explore Labs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
