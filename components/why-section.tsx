"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Award, Building2, Fingerprint, Zap, Code2 } from "lucide-react";

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
    description:
      "Deep focus on frontend infrastructure and platform engineering.",
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
];

function HighlightCard({
  highlight,
  index,
}: {
  highlight: (typeof highlights)[0];
  index: number;
}) {
  const Icon = highlight.icon;

  return (
    <motion.div
      className="flex items-start gap-4 p-5 rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 hover:border-border/60 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-border/40 border border-border">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <h3 className="text-base font-medium text-foreground mb-1">
          {highlight.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {highlight.description}
        </p>
      </div>
    </motion.div>
  );
}

export function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-card/20 via-transparent to-card/20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
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
              Why Optimize
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
              Not another{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                software agency
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              We operate as a specialized engineering studio focused on
              architecture, scalability and long-term technical sustainability.
              Our approach combines deep frontend expertise with systems
              thinking to deliver solutions that scale with your business.
            </p>

            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">
                  Senior Engineers
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={highlight.title}
                highlight={highlight}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
