"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { SimpleIcon as SI } from "simple-icons";
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siVite,
  siNx,
  siTurborepo,
  siNodedotjs,
  siNestjs,
  siHono,
  siAnthropic,
  siDocker,
  siCloudflare,
  siVercel,
  siWagmi,
  siEthers,
  siSolidity,
} from "simple-icons";
import { SimpleIcon } from "@/components/icons/simple-icon";

interface TechEntry {
  name: string;
  /** simple-icons brand glyph; undefined entries fall back to a colored dot. */
  icon?: SI;
  /** Used for the dot fallback only. */
  color?: string;
}

const techStack: Record<string, TechEntry[]> = {
  Frontend: [
    { name: "React", icon: siReact },
    { name: "Next.js", icon: siNextdotjs },
    { name: "TypeScript", icon: siTypescript },
    { name: "Tailwind", icon: siTailwindcss },
    { name: "Vite", icon: siVite },
    { name: "Rspack", color: "#FF6D00" },
  ],
  Architecture: [
    { name: "Nx", icon: siNx },
    { name: "Module Federation", color: "#3B80EC" },
    { name: "Turborepo", icon: siTurborepo },
  ],
  Backend: [
    { name: "Node.js", icon: siNodedotjs },
    { name: "NestJS", icon: siNestjs },
    { name: "Hono", icon: siHono },
  ],
  AI: [
    { name: "OpenAI", color: "#10A37F" },
    { name: "Anthropic", icon: siAnthropic },
    { name: "RAG", color: "#9333EA" },
    { name: "Vector Search", color: "#EC4899" },
  ],
  Infrastructure: [
    { name: "Docker", icon: siDocker },
    { name: "Cloudflare", icon: siCloudflare },
    { name: "Vercel", icon: siVercel },
  ],
  Web3: [
    { name: "Viem", color: "#7B3FE4" },
    { name: "Wagmi", icon: siWagmi },
    { name: "Ethers.js", icon: siEthers },
    { name: "Solidity", icon: siSolidity },
  ],
};

function TechItem({ entry, index }: { entry: TechEntry; index: number }) {
  return (
    <motion.div
      className="group relative px-4 py-3 bg-card/40 border border-border/50 rounded-lg hover:border-border transition-all duration-300 cursor-default"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center gap-3">
        {entry.icon ? (
          <SimpleIcon
            icon={entry.icon}
            size={16}
            color={`#${entry.icon.hex}`}
            title={entry.name}
          />
        ) : (
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color ?? "currentColor" }}
            aria-hidden="true"
          />
        )}
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-mono">
          {entry.name}
        </span>
      </div>
    </motion.div>
  );
}

function CategorySection({
  category,
  items,
  categoryIndex,
}: {
  category: string;
  items: TechEntry[];
  categoryIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-4">
        {category}
      </h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <TechItem key={item.name} entry={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-primary/5 rounded-full blur-[150px]" />
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
            className="inline-block px-4 py-1.5 mb-6 bg-card/60 border border-border rounded-full text-xs font-mono text-muted-foreground uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Technology
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            Modern stack for{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              modern products
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We leverage cutting-edge technologies to build performant, scalable,
            and maintainable solutions.
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
  );
}
