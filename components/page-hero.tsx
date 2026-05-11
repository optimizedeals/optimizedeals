"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageHeroProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  children?: ReactNode
}

export function PageHero({ badge, title, titleHighlight, description, children }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3B80EC" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGrid)" />
          </svg>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0054D6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3B80EC]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#001535]/60 border border-[#002A6B] rounded-full text-sm text-[#7A8BA7] backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-[#0054D6] rounded-full animate-pulse" />
              {badge}
            </motion.div>
          )}

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F0F5FB] mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {title}
            {titleHighlight && (
              <>
                {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0054D6] to-[#3B80EC]">
                  {titleHighlight}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#7A8BA7] max-w-3xl mx-auto mb-10 text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {description}
          </motion.p>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
