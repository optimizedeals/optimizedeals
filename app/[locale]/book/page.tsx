"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  ArrowLeft,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const BENEFIT_KEYS = ["discuss", "explore", "scope", "noObligation"] as const;

export default function BookPage() {
  const t = useTranslations("book");
  const tCommon = useTranslations("common");

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-150 h-150 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="bookGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#3B80EC"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bookGrid)" />
        </svg>
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.svg"
              alt={tCommon("brand.name")}
              width={160}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-card/50"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {tCommon("actions.backToHome")}
            </Link>
          </Button>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-card/60 border border-border rounded-full text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {t("badge")}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
              {t("titleLead")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t("titleHighlight")}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              {t("subtitle")}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <span>{t("duration")}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center">
                  <Video className="w-5 h-5 text-accent" />
                </div>
                <span>{t("video")}</span>
              </div>
            </div>

            <div className="p-6 bg-card/30 border border-border/30 rounded-xl mb-8">
              <h3 className="text-sm font-medium text-foreground mb-4">
                {t("whatWeCover")}
              </h3>
              <ul className="space-y-3">
                {BENEFIT_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {t(`benefits.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-border/20 border border-border/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                {t("emailPrompt")}
              </p>
              <a
                href="mailto:contact@optimize.deals"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@optimize.deals
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden">
              <Cal
                namespace="30min"
                calLink="optimizedeals/30min"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{
                  layout: "month_view",
                  useSlotsViewOnSmallScreen: "true",
                  theme: "light",
                }}
              />

              <noscript>
                <div className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t("noscript.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("noscript.subtitle")}
                  </p>
                  <Button
                    asChild
                    className="bg-primary hover:bg-accent text-white"
                  >
                    <a
                      href="https://cal.com/optimizedeals/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tCommon("actions.openCalendar")}
                    </a>
                  </Button>
                </div>
              </noscript>
            </div>

            <p className="text-center text-xs text-brand-gray mt-4 font-mono">
              {t("poweredBy")}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
