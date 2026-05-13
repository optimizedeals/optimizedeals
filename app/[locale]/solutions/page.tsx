"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Box,
  Workflow,
  Brain,
  Wrench,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Users,
  GitBranch,
  Cpu,
  Database,
  Globe,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";

const solutions = [
  {
    id: "frontend-architecture",
    icon: Layers,
    title: "Frontend Architecture",
    tagline: "Scalable React ecosystems for enterprise",
    description:
      "We design and implement frontend systems that scale with your organization. From component libraries to state management patterns, we build foundations that last.",
    problem:
      "Many companies struggle with fragmented frontend codebases, inconsistent patterns, and architecture that doesn&apos;t scale with team growth.",
    approach: [
      "Comprehensive architecture audits and system design",
      "Component library development with design system integration",
      "State management patterns optimized for your use case",
      "Performance-first rendering strategies",
    ],
    outcomes: [
      "50% reduction in code duplication",
      "Faster feature delivery cycles",
      "Improved developer experience",
      "Consistent UI across products",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Storybook",
    ],
  },
  {
    id: "micro-frontends",
    icon: Box,
    title: "Micro-frontends & Module Federation",
    tagline: "Runtime composition for distributed teams",
    description:
      "Break monolithic frontends into independently deployable applications. Enable teams to ship faster without coordination overhead.",
    problem:
      "Large frontend applications become bottlenecks when multiple teams need to deploy features independently. Coordination costs slow everyone down.",
    approach: [
      "Module federation architecture design",
      "Runtime composition strategies",
      "Shared dependency management",
      "Independent deployment pipelines",
    ],
    outcomes: [
      "Independent team deployments",
      "Reduced time to production",
      "Technology flexibility per module",
      "Improved fault isolation",
    ],
    technologies: ["Module Federation", "Webpack 5", "Nx", "React", "Vite"],
  },
  {
    id: "platform-engineering",
    icon: Workflow,
    title: "Platform Engineering",
    tagline: "Monorepos and build system optimization",
    description:
      "Build internal platforms that accelerate development. From monorepo setup to CI optimization, we create infrastructure that multiplies team productivity.",
    problem:
      "Engineering teams lose hours to slow builds, manual processes, and tooling that doesn&apos;t scale. Developer experience directly impacts velocity.",
    approach: [
      "Monorepo architecture with Nx or Turborepo",
      "Build caching and optimization strategies",
      "CI/CD pipeline acceleration",
      "Developer tooling and automation",
    ],
    outcomes: [
      "10x faster build times",
      "Simplified dependency management",
      "Improved code sharing",
      "Enhanced developer productivity",
    ],
    technologies: ["Nx", "Turborepo", "GitHub Actions", "Docker", "pnpm"],
  },
  {
    id: "ai-integration",
    icon: Brain,
    title: "AI Product Integration",
    tagline: "RAG systems and AI-native experiences",
    description:
      "Integrate AI capabilities into your products with production-ready architecture. From RAG systems to streaming interfaces, we build AI experiences that feel native.",
    problem:
      "Teams struggle to move AI prototypes to production. Integration challenges, latency issues, and UX patterns are common blockers.",
    approach: [
      "RAG architecture design and implementation",
      "Streaming UI patterns for AI responses",
      "Context window optimization strategies",
      "AI workflow automation systems",
    ],
    outcomes: [
      "Production-ready AI features",
      "Sub-second response latency",
      "Seamless user experiences",
      "Scalable AI infrastructure",
    ],
    technologies: [
      "OpenAI",
      "LangChain",
      "Vercel AI SDK",
      "Pinecone",
      "PostgreSQL",
    ],
  },
  {
    id: "modernization",
    icon: Wrench,
    title: "Product Modernization",
    tagline: "Legacy migrations and technical debt reduction",
    description:
      "Transform legacy applications into modern, maintainable systems. We plan and execute migrations that minimize risk while maximizing value.",
    problem:
      "Legacy codebases accumulate technical debt that slows development and increases maintenance costs. Complete rewrites are risky and expensive.",
    approach: [
      "Incremental modernization strategies",
      "Strangler fig pattern implementation",
      "Technology stack upgrades",
      "Performance and security improvements",
    ],
    outcomes: [
      "Reduced maintenance burden",
      "Improved system performance",
      "Modern developer experience",
      "Lower operational costs",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
];

const stats = [
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Users, value: "50+", label: "Projects Delivered" },
  { icon: GitBranch, value: "100%", label: "Senior Engineers" },
  { icon: Zap, value: "40%", label: "Avg. Performance Gain" },
];

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[0];
  index: number;
}) {
  const Icon = solution.icon;

  return (
    <motion.section
      id={solution.id}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left column - Overview */}
        <div>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">
              0{index + 1}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-3">
            {solution.title}
          </h2>
          <p className="text-lg text-accent mb-6">{solution.tagline}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {solution.description}
          </p>

          {/* Problem statement */}
          <div className="p-6 bg-card/50 border border-border/50 rounded-xl mb-6">
            <h4 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-3">
              The Problem
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {solution.problem}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {solution.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-border/30 border border-border/50 rounded-full text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right column - Approach & Outcomes */}
        <div className="space-y-6">
          {/* Approach */}
          <div className="p-6 bg-card/30 border border-border/30 rounded-xl">
            <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-accent" />
              Engineering Approach
            </h4>
            <ul className="space-y-3">
              {solution.approach.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-accent">{i + 1}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div className="p-6 bg-linear-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl">
            <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Expected Outcomes
            </h4>
            <ul className="space-y-3">
              {solution.outcomes.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ArchitectureDiagram() {
  return (
    <motion.div
      className="relative w-full aspect-video bg-card/30 border border-border/30 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="archGrid"
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
          <rect width="100%" height="100%" fill="url(#archGrid)" />
        </svg>
      </div>

      <div className="relative h-full flex items-center justify-center p-8">
        <div className="flex items-center gap-8">
          {/* Client Layer */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-20 h-20 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Globe className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="text-xs font-mono text-brand-gray">Client</span>
          </div>

          {/* Connection line */}
          <motion.div
            className="w-16 h-0.5 bg-linear-to-r from-primary to-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* Edge Layer */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-20 h-20 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Server className="w-8 h-8 text-accent" />
            </motion.div>
            <span className="text-xs font-mono text-brand-gray">Edge</span>
          </div>

          {/* Connection line */}
          <motion.div
            className="w-16 h-0.5 bg-linear-to-r from-accent to-primary"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          {/* Origin Layer */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-20 h-20 rounded-xl bg-border/50 border border-border flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Cpu className="w-8 h-8 text-muted-foreground" />
            </motion.div>
            <span className="text-xs font-mono text-brand-gray">Origin</span>
          </div>

          {/* Connection line */}
          <motion.div
            className="w-16 h-0.5 bg-linear-to-r from-border to-primary"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />

          {/* Data Layer */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Database className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="text-xs font-mono text-brand-gray">Data</span>
          </div>
        </div>
      </div>

      {/* Floating labels */}
      <motion.div
        className="absolute top-4 left-4 px-3 py-1.5 bg-card/80 border border-border rounded-full text-xs font-mono text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Architecture Overview
      </motion.div>
    </motion.div>
  );
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHero
        badge="Engineering Services"
        title="Engineering systems built for"
        titleHighlight="scale."
        description="We help companies modernize products, scale frontend ecosystems and build AI-native experiences through architecture-first engineering."
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-accent text-white px-8 py-6 text-base font-medium rounded-lg"
            asChild
          >
            <Link href="/book">Start a Project</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border bg-transparent hover:bg-card text-foreground px-8 py-6 text-base font-medium rounded-lg group"
            asChild
          >
            <Link href="/labs">
              Explore Labs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Stats */}
      <section className="py-16 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-medium text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
              Modern Architecture Patterns
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We design systems optimized for performance, scalability, and
              developer experience.
            </p>
          </motion.div>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Solutions list */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-32">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Ready to scale your engineering?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help modernize your frontend
              architecture and accelerate your product development.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-accent text-white px-8 py-6 text-base font-medium rounded-lg"
              asChild
            >
              <Link href="/book">Book a Discovery Call</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
