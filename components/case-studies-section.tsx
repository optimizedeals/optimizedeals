"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Clock, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const caseStudies = [
  {
    key: "scaling",
    results: [
      { icon: Clock, key: "releases", value: "3x" },
      { icon: Users, key: "independence", value: "100%" },
      { icon: TrendingUp, key: "buildTime", value: "70%" },
    ],
    tags: ["Nx", "Module Federation", "CI/CD", "Monorepo"],
  },
  {
    key: "aiPowered",
    results: [
      { icon: Zap, key: "responseTime", value: "<100ms" },
      { icon: Users, key: "engagement", value: "+45%" },
      { icon: TrendingUp, key: "completion", value: "+60%" },
    ],
    tags: ["OpenAI", "RAG", "Streaming", "AI UX"],
  },
  {
    key: "highPerformance",
    results: [
      { icon: Zap, key: "vitals", value: "100" },
      { icon: TrendingUp, key: "conversion", value: "+35%" },
      { icon: Clock, key: "loadTime", value: "<1s" },
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
  const t = useTranslations("home.caseStudies");
  const tItem = useTranslations(`home.caseStudies.items.${study.key}`);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative h-full p-8 bg-linear-to-b from-card/60 to-card/30 border border-border/50 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 text-xs font-mono text-accent bg-border/30 rounded-full border border-border">
            {tItem("category")}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4 group-hover:text-white transition-colors">
          {tItem("title")}
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">
              {t("challengeLabel")}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tItem("problem")}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">
              {t("solutionLabel")}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tItem("solution")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-border/50">
          {study.results.map((result) => {
            const Icon = result.icon;
            return (
              <div key={result.key} className="text-center">
                <Icon className="w-4 h-4 text-accent mx-auto mb-2" />
                <div className="text-xl font-bold text-primary">
                  {result.value}
                </div>
                <div className="text-xs text-brand-gray">
                  {tItem(`results.${result.key}`)}
                </div>
              </div>
            );
          })}
        </div>

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
  const t = useTranslations("home.caseStudies");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
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
            {t("badge")}
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            {t("titleLead")}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              {t("titleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.key} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
