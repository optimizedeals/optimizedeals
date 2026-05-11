"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  User, 
  Award, 
  Building2, 
  Fingerprint, 
  Zap, 
  Code2
} from "lucide-react"

const highlights = [
  {
    icon: User,
    title: "Founder-led engineering",
    description: "Direct involvement from senior architects on every project.",
  },
  {
    icon: Award,
    title: "Senior-level architecture",
    description: "No junior teams. Expert-level execution from day one.",
  },
  {
    icon: Building2,
    title: "Enterprise frontend expertise",
    description: "Proven experience with large-scale frontend systems.",
  },
  {
    icon: Fingerprint,
    title: "Rare specialization",
    description: "Deep focus on frontend infrastructure and platform engineering.",
  },
  {
    icon: Zap,
    title: "Fast execution cycles",
    description: "Rapid iteration with production-ready quality.",
  },
  {
    icon: Code2,
    title: "Deep technical involvement",
    description: "We write code, not just documentation.",
  },
]

function HighlightCard({ highlight, index }: { highlight: typeof highlights[0]; index: number }) {
  const Icon = highlight.icon
  
  return (
    <motion.div
      className="flex items-start gap-4 p-5 rounded-xl bg-[#001535]/30 border border-[#002A6B]/30 hover:bg-[#001535]/50 hover:border-[#002A6B]/60 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#002A6B]/40 border border-[#002A6B]">
        <Icon className="w-5 h-5 text-[#3B80EC]" />
      </div>
      <div>
        <h4 className="text-base font-medium text-[#F0F5FB] mb-1">
          {highlight.title}
        </h4>
        <p className="text-sm text-[#7A8BA7] leading-relaxed">
          {highlight.description}
        </p>
      </div>
    </motion.div>
  )
}

export function WhySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001535]/20 via-transparent to-[#001535]/20" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
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
              Why Optimize
            </motion.span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#F0F5FB] mb-6 text-balance">
              Not another{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0054D6] to-[#3B80EC]">
                software agency
              </span>
            </h2>
            
            <p className="text-lg text-[#7A8BA7] mb-8 leading-relaxed text-pretty">
              We operate as a specialized engineering studio focused on architecture, 
              scalability and long-term technical sustainability. Our approach combines 
              deep frontend expertise with systems thinking to deliver solutions that 
              scale with your business.
            </p>
            
            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold text-[#0054D6] mb-1">10+</div>
                <div className="text-sm text-[#7A8BA7]">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0054D6] mb-1">50+</div>
                <div className="text-sm text-[#7A8BA7]">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0054D6] mb-1">100%</div>
                <div className="text-sm text-[#7A8BA7]">Senior Engineers</div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <HighlightCard key={highlight.title} highlight={highlight} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
