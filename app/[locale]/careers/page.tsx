"use client";

import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Globe,
  Rocket,
  Target,
  Users,
  Lightbulb,
  ArrowRight,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

const cultureValues = [
  { key: "quality", icon: Code },
  { key: "systems", icon: Brain },
  { key: "remote", icon: Globe },
  { key: "product", icon: Rocket },
  { key: "longTerm", icon: Target },
  { key: "learning", icon: Lightbulb },
];

const STANDARD_KEYS = [
  "typescript",
  "testing",
  "performance",
  "accessibility",
  "documentation",
  "review",
  "cicd",
  "security",
] as const;

const MINDSET_KEYS = [
  "architecture",
  "outcomes",
  "ownership",
  "knowledge",
] as const;

export default function CareersPage() {
  const t = useTranslations("careers");
  const tCommon = useTranslations("common");

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        badge={t("hero.badge")}
        title={t("hero.title")}
        titleHighlight={t("hero.titleHighlight")}
        description={t("hero.description")}
      />

      <section id="culture" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
              {t("culture.kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t("culture.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("culture.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  className="group p-6 bg-card/30 border border-border/30 rounded-xl hover:border-border/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t(`culture.values.${value.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`culture.values.${value.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
                {t("standards.kicker")}
              </span>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                {t("standards.title")}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t("standards.subtitle")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STANDARD_KEYS.map((key, index) => (
                  <motion.div
                    key={key}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {t(`standards.items.${key}`)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square bg-card/30 border border-border/30 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="standardsGrid"
                        width="30"
                        height="30"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 30 0 L 0 0 0 30"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#standardsGrid)"
                    />
                  </svg>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Code className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>

                {[0, 1, 2, 3].map((i) => {
                  const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      <div className="w-full h-full rounded-lg bg-border/50 border border-border" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
              {t("mindset.kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t("mindset.title")}
            </h2>
          </motion.div>

          <div className="space-y-8">
            {MINDSET_KEYS.map((key, index) => (
              <motion.div
                key={key}
                className="p-6 bg-card/30 border border-border/30 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-mono text-accent">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t(`mindset.items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`mindset.items.${key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
              {t("openings.kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8">
              {t("openings.title")}
            </h2>

            <div className="p-8 bg-card/30 border border-border/30 rounded-2xl mb-8">
              <Users className="w-12 h-12 text-border mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">{t("openings.empty")}</p>
              <p className="text-sm text-brand-gray">
                {t("openings.emptySub")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-accent text-white px-8 py-6 text-base font-medium rounded-lg"
                asChild
              >
                <a href="mailto:career@optimize.deals">
                  <Mail className="mr-2 h-4 w-4" />
                  {tCommon("actions.reachOut")}
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border bg-transparent hover:bg-card text-foreground px-8 py-6 text-base font-medium rounded-lg group"
                asChild
              >
                <Link href="/company">
                  {tCommon("actions.aboutUs")}
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
