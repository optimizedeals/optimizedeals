"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const techStack = {
  Frontend: [
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#FFFFFF" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind", color: "#06B6D4" },
    { name: "Vite", color: "#646CFF" },
    { name: "Rspack", color: "#FF6D00" },
  ],
  Architecture: [
    { name: "Nx", color: "#143055" },
    { name: "Module Federation", color: "#3B80EC" },
    { name: "Turborepo", color: "#EF4444" },
  ],
  Backend: [
    { name: "Node.js", color: "#339933" },
    { name: "NestJS", color: "#E0234E" },
    { name: "Hono", color: "#FF6B35" },
  ],
  AI: [
    { name: "OpenAI", color: "#00A67E" },
    { name: "Anthropic", color: "#D4A574" },
    { name: "RAG", color: "#9333EA" },
    { name: "Vector Search", color: "#EC4899" },
  ],
  Infrastructure: [
    { name: "Docker", color: "#2496ED" },
    { name: "Cloudflare", color: "#F38020" },
    { name: "Vercel", color: "#FFFFFF" },
  ],
  Web3: [
    { name: "Viem", color: "#1C1C1C" },
    { name: "Wagmi", color: "#1C1C1C" },
    { name: "Ethers.js", color: "#2535A0" },
    { name: "Solidity", color: "#363636" },
  ],
}

function TechItem({ name, color, index }: { name: string; color: string; index: number }) {
  return (
    <motion.div
      className="group relative px-4 py-3 bg-[#001535]/40 border border-[#002A6B]/50 rounded-lg hover:border-[#002A6B] transition-all duration-300 cursor-default"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-[#7A8BA7] group-hover:text-[#F0F5FB] transition-colors font-mono">
          {name}
        </span>
      </div>
    </motion.div>
  )
}

function CategorySection({ category, items, categoryIndex }: { 
  category: string
  items: typeof techStack.Frontend
  categoryIndex: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-sm font-mono text-[#585F78] uppercase tracking-wider mb-4">
        {category}
      </h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <TechItem 
            key={item.name} 
            name={item.name} 
            color={item.color} 
            index={index} 
          />
        ))}
      </div>
    </motion.div>
  )
}

export function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="stack" ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0054D6]/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 mb-6 bg-[#001535]/60 border border-[#002A6B] rounded-full text-xs font-mono text-[#7A8BA7] uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Technology
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#F0F5FB] mb-6 text-balance">
            Modern stack for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0054D6] to-[#3B80EC]">
              modern products
            </span>
          </h2>
          
          <p className="text-lg text-[#7A8BA7] max-w-2xl mx-auto text-pretty">
            We leverage cutting-edge technologies to build performant, 
            scalable, and maintainable solutions.
          </p>
        </motion.div>

        {/* Tech grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(techStack).map(([category, items], index) => (
            <CategorySection 
              key={category} 
              category={category} 
              items={items} 
              categoryIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
