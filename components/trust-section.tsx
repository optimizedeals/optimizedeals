"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Company logos - using text representations for cleaner rendering
const companies = [
  { name: "IBM", width: 80 },
  { name: "Adobe", width: 90 },
  { name: "Lululemon", width: 100 },
  { name: "Rocketseat", width: 110 },
  { name: "Sony", width: 70 },
  { name: "Itaú", width: 60 },
  { name: "ByteDance", width: 100 },
  { name: "John Deere", width: 100 },
  { name: "Valor Software", width: 120 },
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
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
            Experience
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 text-balance">
            Built through real-world{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              engineering ecosystems
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Professional experience contributing to products, platforms and
            engineering initiatives connected to globally recognized companies.
          </p>
        </motion.div>

        {/* Logo cloud with infinite scroll effect */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Logo container */}
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
              {/* Duplicate logos for seamless loop */}
              {[...companies, ...companies, ...companies].map(
                (company, index) => (
                  <CompanyLogo
                    key={`${company.name}-${index}`}
                    name={company.name}
                    index={index % companies.length}
                  />
                ),
              )}
            </motion.div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-xs text-brand-gray mt-12 font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Logos represent previous professional experience and ecosystem
          participation.
        </motion.p>
      </div>
    </section>
  );
}
