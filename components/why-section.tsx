"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, Award, Building2, Fingerprint, Zap, Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

const highlights = [
  { key: "founderLed", icon: User },
  { key: "senior", icon: Award },
  { key: "enterprise", icon: Building2 },
  { key: "specialization", icon: Fingerprint },
  { key: "execution", icon: Zap },
  { key: "involvement", icon: Code2 },
];

function HighlightCard({
  highlightKey,
  icon: Icon,
  index,
}: {
  highlightKey: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const t = useTranslations("home.why.highlights");

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
          {t(`${highlightKey}.title`)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(`${highlightKey}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

export function WhySection() {
  const t = useTranslations("home.why");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-card/20 via-transparent to-card/20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              {t("badge")}
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
              {t("titleLead")}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                {t("titleHighlight")}
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              {t("body")}
            </p>

            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold text-primary mb-1">
                  {t("stats.yearsExperienceValue")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.yearsExperienceLabel")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">
                  {t("stats.projectsValue")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.projectsLabel")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">
                  {t("stats.seniorValue")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.seniorLabel")}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={highlight.key}
                highlightKey={highlight.key}
                icon={highlight.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
