"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Beaker, GitBranch, Cpu, Workflow, Wrench, Boxes } from "lucide-react";

const experiments = [
  {
    icon: GitBranch,
    title: "Runtime Federation Labs",
    description:
      "Experimental patterns for dynamic module loading and runtime composition.",
    status: "Active",
  },
  {
    icon: Cpu,
    title: "AI Workflow Engine",
    description:
      "Prototyping intelligent automation systems with LLM orchestration.",
    status: "Research",
  },
  {
    icon: Boxes,
    title: "Micro-frontend Toolkit",
    description:
      "Developer tools for building and debugging federated applications.",
    status: "Active",
  },
  {
    icon: Workflow,
    title: "Architecture Visualizer",
    description:
      "Tools for mapping and analyzing frontend architecture dependencies.",
    status: "Beta",
  },
  {
    icon: Wrench,
    title: "DX Accelerators",
    description:
      "CLI tools and configurations for optimizing developer workflows.",
    status: "Active",
  },
  {
    icon: Beaker,
    title: "Edge Computing Patterns",
    description: "Exploring distributed frontend rendering at the edge.",
    status: "Research",
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Research: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Beta: "bg-primary/20 text-accent border-primary/30",
};

function ExperimentCard({
  experiment,
  index,
}: {
  experiment: (typeof experiments)[0];
  index: number;
}) {
  const Icon = experiment.icon;

  return (
    <motion.div
      className="group relative p-6 bg-card/30 border border-border/40 rounded-xl hover:bg-card/50 hover:border-border/60 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-border/40 border border-border">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-mono rounded-full border ${statusColors[experiment.status]}`}
        >
          {experiment.status}
        </span>
      </div>

      <h4 className="text-base font-medium text-foreground mb-2 group-hover:text-white transition-colors flex items-center gap-2">
        {experiment.title}
      </h4>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {experiment.description}
      </p>
    </motion.div>
  );
}

export function LabsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-card/20 to-transparent" />

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
            Labs
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            Engineering Research &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Experimental Systems
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Exploring the boundaries of frontend architecture through research,
            experimentation, and open-source contributions.
          </p>
        </motion.div>

        {/* Experiments grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiments.map((experiment, index) => (
            <ExperimentCard
              key={experiment.title}
              experiment={experiment}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
