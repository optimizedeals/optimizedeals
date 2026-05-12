"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-card/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Visual element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Abstract background shapes */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/10 rounded-3xl" />
              <div className="absolute inset-4 bg-card/60 rounded-2xl border border-border/50 backdrop-blur-sm" />

              {/* Logo icon centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-64 h-64 border border-border/30 rounded-full"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-48 h-48 border border-border/20 rounded-full"
                />
                <Image
                  src="/icon.svg"
                  alt="OptimizeDeals"
                  width={80}
                  height={80}
                  className="relative z-10"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-8 right-8 px-3 py-1.5 bg-card/80 border border-border rounded-full text-xs font-mono text-muted-foreground"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                est. 2020
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
                Brazil / Remote
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Content */}
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
              About
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
              A studio built for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                engineering excellence
              </span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                OptimizeDeals was created to help companies solve complex
                frontend and product engineering challenges through modern
                architecture, scalable systems and deep technical execution.
              </p>

              <p>
                We believe that great software is built through intentional
                architecture, not just code. Our approach combines systems
                thinking with hands-on engineering to deliver solutions that
                scale with your business.
              </p>

              <p>
                Founded by senior engineers with experience across enterprise
                products, startups, and open-source ecosystems, we bring a
                unique perspective to every project we take on.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  Focus
                </h4>
                <p className="text-foreground font-medium">
                  Architecture First
                </p>
              </div>
              <div>
                <h4 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  Approach
                </h4>
                <p className="text-foreground font-medium">Systems Thinking</p>
              </div>
              <div>
                <h4 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  Delivery
                </h4>
                <p className="text-foreground font-medium">Production Ready</p>
              </div>
              <div>
                <h4 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">
                  Team
                </h4>
                <p className="text-foreground font-medium">Senior Engineers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
