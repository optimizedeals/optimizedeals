"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Layers,
  GitBranch,
  Box,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Service {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

const services: Service[] = [
  {
    key: "frontendArchitecture",
    icon: Layers,
    tags: ["React", "Next.js", "TypeScript", "Performance"],
  },
  {
    key: "microfrontends",
    icon: GitBranch,
    tags: ["Module Federation", "Runtime", "Scalability"],
  },
  {
    key: "monorepo",
    icon: Box,
    tags: ["Nx", "Turborepo", "CI/CD", "DX"],
  },
  {
    key: "ai",
    icon: Sparkles,
    tags: ["OpenAI", "RAG", "AI Workflows", "LLM"],
  },
  {
    key: "modernization",
    icon: RefreshCw,
    tags: ["Migration", "Refactoring", "Architecture"],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const t = useTranslations("home.services.items");
  const Icon = service.icon;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative h-full p-8 bg-card/40 border border-border/50 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:bg-card/60 hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(0,84,214,0.1)]">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />

        <div className="relative mb-6 inline-flex items-center justify-center w-12 h-12 bg-border/50 rounded-xl border border-border group-hover:border-primary/50 transition-colors duration-300">
          <Icon className="w-6 h-6 text-accent group-hover:text-primary transition-colors duration-300" />
        </div>

        <div className="relative">
          <h3 className="text-xl font-medium text-foreground mb-3 flex items-center gap-2 group-hover:text-white transition-colors">
            {t(`${service.key}.title`)}
          </h3>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {t(`${service.key}.description`)}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-brand-gray bg-border/30 rounded-full border border-border/50 group-hover:border-primary/30 group-hover:text-muted-foreground transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const t = useTranslations("home.services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute top-1/2 left-0 w-100 h-100 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-accent/5 rounded-full blur-[100px]" />

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.key} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
