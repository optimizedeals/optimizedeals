"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, TrendingUp, Clock, Users, Zap } from "lucide-react";

const caseStudies = [
  {
    title: "Scaling Frontend Delivery Across Large Teams",
    category: "Platform Engineering",
    problem:
      "Frontend monolith causing slow deployments, duplicated systems, and scaling bottlenecks across multiple development teams.",
    solution:
      "Implemented Nx monorepo with Module Federation for runtime composition, shared architecture patterns, and optimized CI pipelines.",
    results: [
      { icon: Clock, label: "Faster Releases", value: "3x" },
      { icon: Users, label: "Team Independence", value: "100%" },
      { icon: TrendingUp, label: "Build Time Reduction", value: "70%" },
    ],
    tags: ["Nx", "Module Federation", "CI/CD", "Monorepo"],
  },
  {
    title: "AI-powered Product Experiences",
    category: "AI Integration",
    problem:
      "Legacy product lacking intelligent features, manual workflows, and no contextual user assistance.",
    solution:
      "Integrated OpenAI-powered features including streaming interfaces, RAG-enabled UX, contextual AI assistance, and workflow automation.",
    results: [
      { icon: Zap, label: "Response Time", value: "<100ms" },
      { icon: Users, label: "User Engagement", value: "+45%" },
      { icon: TrendingUp, label: "Task Completion", value: "+60%" },
    ],
    tags: ["OpenAI", "RAG", "Streaming", "AI UX"],
  },
  {
    title: "High-performance Marketing Infrastructure",
    category: "Performance Engineering",
    problem:
      "Slow landing pages affecting conversion rates, poor SEO scores, and limited analytics capabilities.",
    solution:
      "Built edge-rendered marketing infrastructure with ultra-fast page loads, comprehensive analytics, and conversion-focused optimization.",
    results: [
      { icon: Zap, label: "Core Web Vitals", value: "100" },
      { icon: TrendingUp, label: "Conversion Rate", value: "+35%" },
      { icon: Clock, label: "Load Time", value: "<1s" },
    ],
    tags: ["Edge", "Performance", "SEO", "Analytics"],
  },
];

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative h-full p-8 bg-linear-to-b from-card/60 to-card/30 border border-border/50 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/50">
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 text-xs font-mono text-accent bg-border/30 rounded-full border border-border">
            {study.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4 group-hover:text-white transition-colors">
          {study.title}
        </h3>

        {/* Problem & Solution */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">
              Challenge
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {study.problem}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">
              Solution
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-border/50">
          {study.results.map((result) => {
            const Icon = result.icon;
            return (
              <div key={result.label} className="text-center">
                <Icon className="w-4 h-4 text-accent mx-auto mb-2" />
                <div className="text-xl font-bold text-primary">
                  {result.value}
                </div>
                <div className="text-xs text-brand-gray">{result.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono text-brand-gray bg-border/20 rounded border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-primary/5 rounded-full blur-[150px]" />

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
            Case Studies
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            Solving complex{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              engineering challenges
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real-world examples of how we help teams overcome technical
            obstacles and deliver scalable solutions.
          </p>
        </motion.div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.title} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
