"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Target, Shield, Zap, Clock, Users, GitBranch, Layers, Brain, Lightbulb, Award, Mail, Calendar, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import Link from "next/link"
import Image from "next/image"

const principles = [
  {
    icon: Layers,
    title: "Architecture-First",
    description: "Every project starts with careful architecture design. We believe that well-designed systems are easier to maintain, scale, and evolve over time.",
  },
  {
    icon: Target,
    title: "Outcome-Oriented",
    description: "We focus on business outcomes, not just technical deliverables. Our engineering decisions are always grounded in practical value creation.",
  },
  {
    icon: Zap,
    title: "Performance Obsessed",
    description: "Performance is not an afterthought. We optimize for speed from day one, understanding that user experience depends on it.",
  },
  {
    icon: Shield,
    title: "Technical Sustainability",
    description: "We build systems designed for long-term success. No shortcuts that create technical debt or maintenance nightmares.",
  },
  {
    icon: Brain,
    title: "Continuous Learning",
    description: "The frontend ecosystem evolves rapidly. We stay at the cutting edge through research, experimentation, and knowledge sharing.",
  },
  {
    icon: Users,
    title: "Collaborative Engineering",
    description: "We work as partners, not vendors. Close collaboration with your team ensures knowledge transfer and sustainable outcomes.",
  },
]

const timeline = [
  {
    year: "2014",
    title: "Engineering Foundation",
    description: "Started professional frontend development journey, building enterprise applications.",
  },
  {
    year: "2018",
    title: "Architecture Focus",
    description: "Transitioned to architecture-focused roles, designing scalable frontend systems.",
  },
  {
    year: "2021",
    title: "AI Integration",
    description: "Began specializing in AI-native product development and RAG systems.",
  },
  {
    year: "2023",
    title: "OptimizeDeals Launch",
    description: "Founded OptimizeDeals as a specialized engineering studio.",
  },
]

const companies = [
  "IBM", "Adobe", "Lululemon", "Rocketseat", "Sony", "Itaú", "ByteDance", "John Deere", "Valor Software"
]

const stats = [
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: GitBranch, value: "50+", label: "Projects Delivered" },
  { icon: Users, value: "100%", label: "Senior Engineers" },
  { icon: Award, value: "Global", label: "Client Base" },
]

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-[#000216]">
      <PageHero
        badge="About OptimizeDeals"
        title="A studio built for"
        titleHighlight="engineering excellence."
        description="OptimizeDeals is not a traditional agency. It is a founder-led engineering studio focused on frontend architecture, scalable systems, AI-native products, and modern engineering infrastructure."
      />

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-6">
                Philosophy
              </h2>
              <div className="space-y-6 text-[#7A8BA7] leading-relaxed">
                <p>
                  We believe that exceptional engineering is the foundation of exceptional products. In a world where frontend complexity continues to grow, having a partner who understands both the technical depth and business context is invaluable.
                </p>
                <p>
                  OptimizeDeals was founded on the principle that modern products deserve modern engineering. We bring expertise in React ecosystems, micro-frontend architectures, AI integration, and platform engineering to help companies build systems that scale.
                </p>
                <p>
                  Our approach is deliberately founder-led. This means direct access to senior engineering expertise, no account managers or junior developers learning on your project. Every engagement gets our full attention and technical depth.
                </p>
              </div>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl text-center"
                  >
                    <Icon className="w-6 h-6 text-[#0054D6] mx-auto mb-4" />
                    <div className="text-3xl font-medium text-[#F0F5FB] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#7A8BA7]">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Engineering Principles
            </h2>
            <p className="text-[#7A8BA7] max-w-2xl mx-auto">
              The values and standards that guide every project we undertake.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={principle.title}
                  className="p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl hover:border-[#002A6B]/60 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-8 h-8 text-[#0054D6] mb-4" />
                  <h3 className="text-lg font-medium text-[#F0F5FB] mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[#7A8BA7] leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Engineering Journey
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0054D6] via-[#002A6B] to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0054D6] border-4 border-[#000216]" />

                  {/* Content */}
                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="text-sm font-mono text-[#0054D6] mb-1 block">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-medium text-[#F0F5FB] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#7A8BA7]">
                      {item.description}
                    </p>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-20 border-t border-[#002A6B]/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Professional Experience Across Engineering Ecosystems
            </h2>
          </motion.div>

          {/* Company logos */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={company}
                className="px-6 py-3 bg-[#001535]/30 border border-[#002A6B]/30 rounded-lg text-[#7A8BA7] font-medium hover:text-[#F0F5FB] hover:border-[#002A6B]/60 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {company}
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            className="text-center text-xs text-[#585F78] font-mono max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Logos represent previous professional experience and ecosystem participation.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-[#002A6B]/30 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-[#0054D6] uppercase tracking-wider mb-2 block">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#F0F5FB] mb-4">
              Ready to discuss your project?
            </h2>
            <p className="text-[#7A8BA7] mb-10 max-w-2xl mx-auto">
              Book a discovery call to discuss your engineering challenges and explore how we can help.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-[#0054D6] hover:bg-[#3B80EC] text-white px-8 py-6 text-base font-medium rounded-lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Discovery Call
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#002A6B] bg-transparent hover:bg-[#001535] text-[#F0F5FB] px-8 py-6 text-base font-medium rounded-lg group"
              >
                <Mail className="mr-2 h-4 w-4" />
                hello@optimizedeals.com
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://linkedin.com/company/optimizedeals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#001535]/50 border border-[#002A6B]/50 text-[#7A8BA7] hover:text-[#F0F5FB] hover:border-[#002A6B] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/optimizedeals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#001535]/50 border border-[#002A6B]/50 text-[#7A8BA7] hover:text-[#F0F5FB] hover:border-[#002A6B] transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
