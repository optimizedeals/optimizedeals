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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const benefits = [
  "Discuss your technical challenges",
  "Explore architecture solutions",
  "Review project scope and timeline",
  "No obligation consultation",
];

export default function BookPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[#000216]">
        {/* Background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0054D6]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3B80EC]/5 rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern */}
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

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.svg"
                alt="OptimizeDeals"
                width={160}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#7A8BA7] hover:text-[#F0F5FB] hover:bg-[#001535]/50"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </nav>

        {/* Main content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#001535]/60 border border-[#002A6B] rounded-full text-sm text-[#7A8BA7]">
                <span className="w-2 h-2 bg-[#0054D6] rounded-full animate-pulse" />
                Discovery Call
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#F0F5FB] mb-4 text-balance">
                Let&apos;s discuss your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0054D6] to-[#3B80EC]">
                  engineering challenges.
                </span>
              </h1>

              <p className="text-lg text-[#7A8BA7] mb-8 text-pretty">
                Architecture, modernization, AI systems and scalable frontend
                engineering.
              </p>

              {/* Call details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-[#7A8BA7]">
                  <div className="w-10 h-10 rounded-lg bg-[#001535]/50 border border-[#002A6B]/50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#3B80EC]" />
                  </div>
                  <span>30 minute consultation</span>
                </div>
                <div className="flex items-center gap-3 text-[#7A8BA7]">
                  <div className="w-10 h-10 rounded-lg bg-[#001535]/50 border border-[#002A6B]/50 flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#3B80EC]" />
                  </div>
                  <span>Google Meet video call</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl mb-8">
                <h3 className="text-sm font-medium text-[#F0F5FB] mb-4">
                  What we&apos;ll cover
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm text-[#7A8BA7]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#0054D6]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternative contact */}
              <div className="p-4 bg-[#002A6B]/20 border border-[#002A6B]/30 rounded-lg">
                <p className="text-sm text-[#7A8BA7] mb-2">
                  Prefer email? Reach out directly:
                </p>
                <a
                  href="mailto:contact@optimize.deals"
                  className="inline-flex items-center gap-2 text-sm text-[#3B80EC] hover:text-[#F0F5FB] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@optimize.deals
                </a>
              </div>
            </motion.div>

            {/* Right column - Cal.com embed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#001535]/50 border border-[#002A6B]/50 rounded-2xl overflow-hidden">
                {/* Cal.com inline embed */}
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

                {/* Fallback content while loading */}
                <noscript>
                  <div className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-[#0054D6] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#F0F5FB] mb-2">
                      Schedule a Discovery Call
                    </h3>
                    <p className="text-sm text-[#7A8BA7] mb-4">
                      JavaScript is required to load the calendar.
                    </p>
                    <Button
                      asChild
                      className="bg-[#0054D6] hover:bg-[#3B80EC] text-white"
                    >
                      <a
                        href="https://cal.com/optimizedeals/discovery"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Calendar
                      </a>
                    </Button>
                  </div>
                </noscript>
              </div>

              {/* Powered by Cal.com */}
              <p className="text-center text-xs text-[#585F78] mt-4 font-mono">
                Powered by Cal.com
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
