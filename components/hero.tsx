"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingLabels = [
  { text: "Runtime Federation", x: "10%", y: "20%", delay: 0 },
  { text: "Nx Monorepos", x: "85%", y: "15%", delay: 0.2 },
  { text: "AI Workflows", x: "75%", y: "75%", delay: 0.4 },
  { text: "Edge Rendering", x: "5%", y: "70%", delay: 0.6 },
  { text: "Platform Engineering", x: "80%", y: "45%", delay: 0.8 },
  { text: "Modular Systems", x: "15%", y: "45%", delay: 1 },
];

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
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
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial gradient overlays */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0054D6]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#3B80EC]/10 rounded-full blur-[100px]" />

      {/* Animated orbit lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0054D6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B80EC" stopOpacity="1" />
            <stop offset="100%" stopColor="#0054D6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.ellipse
          cx="500"
          cy="300"
          rx="400"
          ry="150"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
        <motion.ellipse
          cx="500"
          cy="300"
          rx="300"
          ry="100"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="0.5"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
      </svg>

      {/* Animated connection dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#3B80EC] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function FloatingLabel({
  text,
  x,
  y,
  delay,
}: {
  text: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.5, duration: 0.6 }}
    >
      <motion.div
        className="px-3 py-1.5 bg-[#001535]/80 border border-[#002A6B] rounded-full text-xs font-mono text-[#7A8BA7] backdrop-blur-sm"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />

      {/* Floating technical labels */}
      {floatingLabels.map((label) => (
        <FloatingLabel key={label.text} {...label} />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#001535]/60 border border-[#002A6B] rounded-full text-sm text-[#7A8BA7] backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-[#0054D6] rounded-full animate-pulse" />
            Frontend Architecture Studio
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#F0F5FB] mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Engineering scalable frontend{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0054D6] to-[#3B80EC]">
              systems
            </span>{" "}
            for modern products.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-[#7A8BA7] max-w-3xl mx-auto mb-10 text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We build high-performance React and AI-powered platforms focused on
            scalability, architecture and execution speed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-[#0054D6] hover:bg-[#3B80EC] text-white px-8 py-6 text-base font-medium rounded-lg transition-all duration-300 group"
              asChild
            >
              <a href="/book">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Call
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#002A6B] bg-transparent hover:bg-[#001535] text-[#F0F5FB] px-8 py-6 text-base font-medium rounded-lg transition-all duration-300 group"
              asChild
            >
              <a href="/solutions">
                Explore Systems
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-[#002A6B] rounded-full flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-[#0054D6] rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
