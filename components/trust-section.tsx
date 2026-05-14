"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

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

function CompanyLogo({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      className="flex items-center justify-center px-8 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <span className="text-xl md:text-2xl font-medium text-brand-gray hover:text-muted-foreground transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

export function TrustSection() {
  const t = useTranslations("home.trust");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/30 to-transparent" />

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

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10" />

          <div className="overflow-hidden">
            <motion.div
              className="flex items-center"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...companies, ...companies, ...companies].map(
                (company, index) => (
                  <CompanyLogo
                    key={`${company}-${index}`}
                    name={company}
                    index={index % companies.length}
                  />
                ),
              )}
            </motion.div>
          </div>
        </div>

        <motion.p
          className="text-center text-xs text-brand-gray mt-12 font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {t("disclaimer")}
        </motion.p>
      </div>
    </section>
  );
}
