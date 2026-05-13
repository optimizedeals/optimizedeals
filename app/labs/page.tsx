"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Target,
  Workflow,
  Sparkles,
  GitBranch,
  ArrowRight,
  Activity,
  Layers,
  Box,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";

const experiments = [
  {
    id: "runtime-federation",
    title: "Runtime Federation Lab",
    description:
      "Exploring advanced module federation patterns for runtime composition of independently deployed frontend applications.",
    status: "Active",
    icon: Box,
    color: "#0054D6",
    metrics: {
      label: "Module Load Time",
      value: "<50ms",
    },
    areas: [
      "Dynamic remote loading",
      "Version negotiation",
      "Shared dependency optimization",
      "Failover strategies",
    ],
    technologies: ["Module Federation", "Webpack 5", "React 19", "Vite"],
  },
  {
    id: "ai-streaming",
    title: "AI Streaming Interfaces",
    description:
      "Research into optimal UX patterns for AI-generated content, including streaming responses, loading states, and contextual interactions.",
    status: "Active",
    icon: Brain,
    color: "#3B80EC",
    metrics: {
      label: "Time to First Token",
      value: "~200ms",
    },
    areas: [
      "Streaming UI components",
      "Optimistic UI patterns",
      "Context preservation",
      "Multi-modal responses",
    ],
    technologies: [
      "Vercel AI SDK",
      "React Server Components",
      "OpenAI",
      "Anthropic",
    ],
  },
  {
    id: "performance",
    title: "Frontend Performance Experiments",
    description:
      "Testing advanced optimization techniques for Core Web Vitals, bundle size reduction, and runtime performance.",
    status: "Active",
    icon: Target,
    color: "#22C55E",
    metrics: {
      label: "LCP Improvement",
      value: "40%",
    },
    areas: [
      "Partial hydration strategies",
      "Bundle splitting algorithms",
      "Prefetch optimization",
      "Memory management",
    ],
    technologies: [
      "React Compiler",
      "Partytown",
      "Qwik Insights",
      "Lighthouse CI",
    ],
  },
  {
    id: "rag-ux",
    title: "RAG UX Systems",
    description:
      "Developing UX patterns for retrieval-augmented generation interfaces, including citation displays and context visualization.",
    status: "Research",
    icon: Sparkles,
    color: "#F59E0B",
    metrics: {
      label: "Retrieval Accuracy",
      value: "94%",
    },
    areas: [
      "Citation UI patterns",
      "Context window visualization",
      "Source attribution",
      "Confidence indicators",
    ],
    technologies: ["LangChain", "Pinecone", "pgvector", "OpenAI Embeddings"],
  },
  {
    id: "motion-systems",
    title: "Motion Systems Research",
    description:
      "Creating a systematic approach to animation and motion design in modern frontend applications.",
    status: "Beta",
    icon: Activity,
    color: "#8B5CF6",
    metrics: {
      label: "60fps Compliance",
      value: "99.2%",
    },
    areas: [
      "Physics-based animations",
      "Gesture-driven interfaces",
      "Scroll-linked effects",
      "Performance budgets",
    ],
    technologies: ["Framer Motion", "React Spring", "GSAP", "Lottie"],
  },
  {
    id: "distributed-frontends",
    title: "Distributed Frontend Architectures",
    description:
      "Investigating patterns for globally distributed frontend deployments with edge computing and regional optimization.",
    status: "Research",
    icon: Layers,
    color: "#EC4899",
    metrics: {
      label: "Edge Latency",
      value: "<10ms",
    },
    areas: [
      "Edge computing strategies",
      "Regional data sync",
      "Consistency models",
      "Failover patterns",
    ],
    technologies: [
      "Vercel Edge",
      "Cloudflare Workers",
      "Deno Deploy",
      "Fly.io",
    ],
  },
];

const statusConfig: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  Active: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  Beta: {
    bg: "bg-primary/10",
    text: "text-accent",
    border: "border-primary/30",
    dot: "bg-accent",
  },
  Research: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
};

function ExperimentCard({
  experiment,
  index,
}: {
  experiment: (typeof experiments)[0];
  index: number;
}) {
  const Icon = experiment.icon;
  const status = statusConfig[experiment.status] || statusConfig.Research;

  return (
    <motion.div
      id={experiment.id}
      className="group relative scroll-mt-24 h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="h-full flex flex-col relative p-8 bg-card/40 border border-border/40 rounded-2xl overflow-hidden hover:border-border/70 transition-all duration-500">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`grid-${experiment.id}`}
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke={experiment.color}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={`url(#grid-${experiment.id})`}
            />
          </svg>
        </div>

        {/* Glow effect */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: experiment.color }}
        />

        <div className="relative flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="size-12 shrink-0 rounded-xl flex items-center justify-center"
                style={{
                  background: `${experiment.color}15`,
                  border: `1px solid ${experiment.color}30`,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon
                  className="size-6 shrink-0"
                  style={{ color: experiment.color }}
                />
              </motion.div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded-full ${status.bg} ${status.text} ${status.border} border`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`}
                    />
                    {experiment.status}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-foreground">
                  {experiment.title}
                </h3>
              </div>
            </div>

            {/* Metric badge */}
            <div className="hidden md:block px-4 py-2 bg-border/30 border border-border/50 rounded-lg text-right">
              <div className="text-xs text-brand-gray font-mono">
                {experiment.metrics.label}
              </div>
              <div className="text-lg font-medium text-foreground">
                {experiment.metrics.value}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {experiment.description}
          </p>

          {/* Research areas */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {experiment.areas.map((area, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: experiment.color }}
                />
                {area}
              </motion.div>
            ))}
          </div>

          {/* Technologies — pinned to the bottom so cards align in the grid */}
          <div className="mt-auto pt-2 flex flex-wrap gap-2">
            {experiment.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-border/20 border border-border/40 rounded-full text-brand-gray"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LabsVisualization() {
  return (
    <motion.div
      className="relative w-full aspect-video bg-card/20 border border-border/30 rounded-2xl overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="labsGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#3B80EC"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#labsGrid)" />
        </svg>
      </div>

      {/* Animated nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {experiments.slice(0, 4).map((exp, i) => {
          const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const Icon = exp.icon;

          return (
            <motion.div
              key={exp.id}
              className="absolute"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm"
                style={{
                  background: `${exp.color}20`,
                  border: `1px solid ${exp.color}40`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: exp.color }} />
              </div>
            </motion.div>
          );
        })}

        {/* Center node */}
        <motion.div
          className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-sm"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 84, 214, 0.2)",
              "0 0 40px rgba(0, 84, 214, 0.4)",
              "0 0 20px rgba(0, 84, 214, 0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Workflow className="w-8 h-8 text-primary" />
        </motion.div>

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0054D6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B80EC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0054D6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => {
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 120;
            const endX = Math.cos(angle) * radius;
            const endY = Math.sin(angle) * radius;
            const centerX = 0;
            const centerY = 0;

            return (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${endX}px)`}
                y2={`calc(50% + ${endY}px)`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Status badge */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-card/80 border border-border rounded-full text-xs font-mono text-muted-foreground flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        Labs Active
      </div>

      {/* Metrics */}
      <div className="absolute bottom-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-gray">
          <Clock className="w-3 h-3" />
          Real-time
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-brand-gray">
          <GitBranch className="w-3 h-3" />6 Active
        </div>
      </div>
    </motion.div>
  );
}

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHero
        badge="Research & Development"
        title="Engineering research and"
        titleHighlight="experimental systems."
        description="Exploring the frontiers of frontend architecture, AI integration, and performance optimization through hands-on research and experimentation."
      />

      {/* Labs Visualization */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <LabsVisualization />
        </div>
      </section>

      {/* Research Status */}
      <section className="py-12 border-y border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {Object.entries(statusConfig).map(([label, config]) => (
              <div key={label} className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-mono text-brand-gray">
                  ({experiments.filter((e) => e.status === label).length})
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Active Experiments
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Deep dives into emerging technologies and architectural patterns
              that shape the future of frontend development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiments.map((experiment, index) => (
              <ExperimentCard
                key={experiment.id}
                experiment={experiment}
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
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Interested in our research?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We share our findings through technical articles and open-source
              contributions. Follow our insights or get in touch to collaborate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-accent text-white px-8 py-6 text-base font-medium rounded-lg"
                asChild
              >
                <Link href="/insights">Read Insights</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border bg-transparent hover:bg-card text-foreground px-8 py-6 text-base font-medium rounded-lg group"
                asChild
              >
                <Link href="/company#contact">
                  Collaborate
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
