"use client"

import { motion } from "framer-motion"
import { Code, Brain, Globe, Heart, Rocket, Target, Users, Lightbulb, ArrowRight, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import Link from "next/link"

const cultureValues = [
  {
    icon: Code,
    title: "Engineering Quality",
    description: "We prioritize clean, maintainable code over quick fixes. Every line of code is written with future developers in mind.",
  },
  {
    icon: Brain,
    title: "Systems Thinking",
    description: "We approach problems holistically, understanding how components interact and influence each other across the system.",
  },
  {
    icon: Globe,
    title: "Remote-First",
    description: "Work from anywhere. We believe great engineering happens when people have the freedom to structure their own environment.",
  },
  {
    icon: Rocket,
    title: "Product Mindset",
    description: "Engineering exists to serve products and users. We make technical decisions that create real business value.",
  },
  {
    icon: Target,
    title: "Long-term Architecture",
    description: "We build systems designed for the next 5 years, not just the next sprint. Sustainability is not optional.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description: "The frontend ecosystem evolves rapidly. We dedicate time to research, experimentation, and skill development.",
  },
]

const technicalStandards = [
  "TypeScript-first development",
  "Comprehensive testing strategies",
  "Performance budgets and monitoring",
  "Accessibility as a requirement",
  "Documentation as code",
  "Code review culture",
  "Automated CI/CD pipelines",
  "Security-conscious development",
]

const howWeThink = [
  {
    title: "Architecture Before Implementation",
    description: "We spend time understanding the problem space and designing solutions before writing code. This upfront investment pays dividends in long-term maintainability.",
  },
  {
    title: "Outcomes Over Output",
    description: "We measure success by impact, not lines of code. The best solution is often the simplest one that achieves the desired outcome.",
  },
  {
    title: "Ownership and Accountability",
    description: "Engineers own their work end-to-end. From design to deployment to monitoring, we take responsibility for the systems we build.",
  },
  {
    title: "Knowledge Sharing",
    description: "We document decisions, share learnings, and invest in making our teammates better. No knowledge silos allowed.",
  },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#000216]">
      <PageHero
        badge="Join Our Team"
        title="Build systems that"
        titleHighlight="scale."
        description="We're building a culture focused on engineering quality, systems thinking and long-term technical excellence."
      />

      {/* Engineering Culture */}
      <section id="culture" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              Our Culture
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Engineering Culture
            </h2>
            <p className="text-[#7A8BA7] max-w-2xl mx-auto">
              The principles and values that define how we work and build together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="group p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl hover:border-[#002A6B]/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0054D6]/10 border border-[#0054D6]/20 flex items-center justify-center mb-4 group-hover:bg-[#0054D6]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#0054D6]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#F0F5FB] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#7A8BA7] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technical Standards */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
                Standards
              </span>
              <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
                Technical Standards
              </h2>
              <p className="text-[#7A8BA7] mb-8">
                Our engineering standards ensure consistency, quality, and maintainability across all projects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technicalStandards.map((standard, index) => (
                  <motion.div
                    key={standard}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#0054D6] flex-shrink-0" />
                    <span className="text-sm text-[#7A8BA7]">{standard}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual element */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square bg-[#001535]/30 border border-[#002A6B]/30 rounded-2xl overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="standardsGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#3B80EC" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#standardsGrid)" />
                  </svg>
                </div>

                {/* Animated elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-24 rounded-2xl bg-[#0054D6]/20 border border-[#0054D6]/40 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Code className="w-10 h-10 text-[#0054D6]" />
                  </motion.div>
                </div>

                {/* Orbiting elements */}
                {[0, 1, 2, 3].map((i) => {
                  const angle = (i / 4) * Math.PI * 2 - Math.PI / 2
                  const radius = 100
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <div className="w-full h-full rounded-lg bg-[#002A6B]/50 border border-[#002A6B]" />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Think */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              Mindset
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              How We Think
            </h2>
          </motion.div>

          <div className="space-y-8">
            {howWeThink.map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0054D6]/10 border border-[#0054D6]/30 flex items-center justify-center text-sm font-mono text-[#3B80EC]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-[#F0F5FB] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#7A8BA7] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              Open Positions
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-8">
              Join Our Team
            </h2>

            {/* No positions message */}
            <div className="p-8 bg-[#001535]/30 border border-[#002A6B]/30 rounded-2xl mb-8">
              <Users className="w-12 h-12 text-[#002A6B] mx-auto mb-4" />
              <p className="text-[#7A8BA7] mb-2">No open positions currently.</p>
              <p className="text-sm text-[#585F78]">
                We&apos;re always interested in connecting with talented engineers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#0054D6] hover:bg-[#3B80EC] text-white px-8 py-6 text-base font-medium rounded-lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Reach Out
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#002A6B] bg-transparent hover:bg-[#001535] text-[#F0F5FB] px-8 py-6 text-base font-medium rounded-lg group"
                asChild
              >
                <Link href="/company">
                  About Us
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
