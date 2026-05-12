"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Layers, 
  GitBranch, 
  Box, 
  Sparkles, 
  RefreshCw,
  ArrowUpRight
} from "lucide-react"

const services = [
  {
    icon: Layers,
    title: "Frontend Architecture",
    description: "Scalable React ecosystems, enterprise frontend systems, modular architecture, and performance engineering.",
    tags: ["React", "Next.js", "TypeScript", "Performance"],
  },
  {
    icon: GitBranch,
    title: "Micro-frontends & Module Federation",
    description: "Runtime composition, federated systems, independent deployments, and multi-team scalability.",
    tags: ["Module Federation", "Runtime", "Scalability"],
  },
  {
    icon: Box,
    title: "Monorepo & Platform Engineering",
    description: "Nx, Turborepo, shared tooling, CI acceleration, and developer experience optimization.",
    tags: ["Nx", "Turborepo", "CI/CD", "DX"],
  },
  {
    icon: Sparkles,
    title: "AI Product Integration",
    description: "AI-native experiences, RAG systems, OpenAI integrations, intelligent workflows, and contextual systems.",
    tags: ["OpenAI", "RAG", "AI Workflows", "LLM"],
  },
  {
    icon: RefreshCw,
    title: "Product Modernization",
    description: "Legacy migration, architecture recovery, frontend restructuring, and scalability planning.",
    tags: ["Migration", "Refactoring", "Architecture"],
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative h-full p-8 bg-card/40 border border-border/50 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:bg-card/60 hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(0,84,214,0.1)]">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />
        
        {/* Icon */}
        <div className="relative mb-6 inline-flex items-center justify-center w-12 h-12 bg-border/50 rounded-xl border border-border group-hover:border-primary/50 transition-colors duration-300">
          <Icon className="w-6 h-6 text-accent group-hover:text-primary transition-colors duration-300" />
        </div>
        
        {/* Content */}
        <div className="relative">
          <h3 className="text-xl font-medium text-foreground mb-3 flex items-center gap-2 group-hover:text-white transition-colors">
            {service.title}
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-accent" />
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-brand-gray bg-border/30 rounded-full border border-border/50 group-hover:border-primary/30 group-hover:text-muted-foreground transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 mb-6 bg-card/60 border border-border rounded-full text-xs font-mono text-muted-foreground uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Services
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            High-impact engineering for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              scalable digital products
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Specialized services focused on frontend architecture, platform engineering, 
            and modern product development.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
