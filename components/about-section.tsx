"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("home.about");
  const tCommon = useTranslations("common");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-card/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/10 rounded-3xl" />
              <div className="absolute inset-4 bg-card/60 rounded-2xl border border-border/50 backdrop-blur-sm" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-64 h-64 border border-border/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-48 h-48 border border-border/20 rounded-full"
                />
                <Image
                  src="/icon.svg"
                  alt={tCommon("brand.name")}
                  width={80}
                  height={80}
                  className="relative z-10"
                />
              </div>

              <motion.div
                className="absolute top-8 right-8 px-3 py-1.5 bg-card/80 border border-border rounded-full text-xs font-mono text-muted-foreground"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t("founded")}
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-8 px-3 py-1.5 bg-card/80 border border-border rounded-full text-xs font-mono text-muted-foreground"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t("location")}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 bg-card/60 border border-border rounded-full text-xs font-mono text-muted-foreground uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {t("badge")}
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
              {t("titleLead")}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                {t("titleHighlight")}
              </span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>{t("paragraphs.p1")}</p>
              <p>{t("paragraphs.p2")}</p>
              <p>{t("paragraphs.p3")}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  {t("values.focusLabel")}
                </h3>
                <p className="text-foreground font-medium">
                  {t("values.focusValue")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  {t("values.approachLabel")}
                </h3>
                <p className="text-foreground font-medium">
                  {t("values.approachValue")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  {t("values.deliveryLabel")}
                </h3>
                <p className="text-foreground font-medium">
                  {t("values.deliveryValue")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  {t("values.teamLabel")}
                </h3>
                <p className="text-foreground font-medium">
                  {t("values.teamValue")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
