"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Shield,
  Zap,
  Clock,
  Users,
  GitBranch,
  Layers,
  Brain,
  Award,
  Mail,
  Calendar,
  Linkedin,
  Github,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

const principles = [
  { key: "architectureFirst", icon: Layers },
  { key: "outcome", icon: Target },
  { key: "performance", icon: Zap },
  { key: "sustainability", icon: Shield },
  { key: "learning", icon: Brain },
  { key: "collaborative", icon: Users },
];

const TIMELINE_ITEMS = [
  { year: "2014", key: "y2014" },
  { year: "2018", key: "y2018" },
  { year: "2021", key: "y2021" },
  { year: "2023", key: "y2023" },
];

const companies = [
  "IBM",
  "Adobe",
  "Lululemon",
  "Rocketseat",
  "Sony",
  "Itaú",
  "ByteDance",
  "John Deere",
  "Valor Software",
];

const stats = [
  { icon: Clock, value: "10+", labelKey: "yearsLabel" },
  { icon: GitBranch, value: "50+", labelKey: "projectsLabel" },
  { icon: Users, value: "100%", labelKey: "seniorLabel" },
  { icon: Award, value: "Global", labelKey: "clientsLabel" },
];

export default function CompanyPage() {
  const t = useTranslations("company");
  const tCommon = useTranslations("common");

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        badge={t("hero.badge")}
        title={t("hero.title")}
        titleHighlight={t("hero.titleHighlight")}
        description={t("hero.description")}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
                {t("philosophy.title")}
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>{t("philosophy.paragraphs.p1")}</p>
                <p>{t("philosophy.paragraphs.p2")}</p>
                <p>{t("philosophy.paragraphs.p3")}</p>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                const value =
                  stat.labelKey === "clientsLabel"
                    ? t("stats.clientsValue")
                    : stat.value;
                return (
                  <div
                    key={stat.labelKey}
                    className="p-6 bg-card/30 border border-border/30 rounded-xl text-center"
                  >
                    <Icon className="w-6 h-6 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-medium text-foreground mb-1">
                      {value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t(`stats.${stat.labelKey}`)}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
              {t("principles.kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t("principles.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("principles.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.key}
                  className="p-6 bg-card/30 border border-border/30 rounded-xl hover:border-border/60 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t(`principles.items.${principle.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`principles.items.${principle.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
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
              {t("journey.kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t("journey.title")}
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary via-border to-transparent" />

            <div className="space-y-12">
              {TIMELINE_ITEMS.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                  <div
                    className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}
                  >
                    <span className="text-sm font-mono text-primary mb-1 block">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-medium text-foreground mb-2">
                      {t(`journey.items.${item.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`journey.items.${item.key}.description`)}
                    </p>
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
              {t("experience.kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t("experience.title")}
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={company}
                className="px-6 py-3 bg-card/30 border border-border/30 rounded-lg text-muted-foreground font-medium hover:text-foreground hover:border-border/60 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {company}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-xs text-brand-gray font-mono max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("experience.disclaimer")}
          </motion.p>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 border-t border-border/30 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
              {t("contact.kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-accent text-white px-8 py-6 text-base font-medium rounded-lg"
                asChild
              >
                <Link href="/book">
                  <Calendar className="mr-2 h-4 w-4" />
                  {tCommon("actions.bookDiscoveryCall")}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border bg-transparent hover:bg-card text-foreground px-8 py-6 text-base font-medium rounded-lg group"
                asChild
              >
                <a href="mailto:contact@optimize.deals">
                  <Mail className="mr-2 h-4 w-4" />
                  contact@optimize.deals
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://linkedin.com/company/optimizedeals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/optimizedeals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
