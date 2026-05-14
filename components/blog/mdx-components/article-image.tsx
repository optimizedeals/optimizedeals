"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function ArticleImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: ArticleImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <figure
        className="my-8"
        style={
          width !== 800
            ? { maxWidth: width, marginLeft: "auto", marginRight: "auto" }
            : undefined
        }
      >
        <div
          className="relative group cursor-zoom-in overflow-hidden rounded-xl border border-border/30"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto"
            quality={100}
            unoptimized={src.endsWith(".gif")}
          />
          <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-foreground" />
          </div>
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={width * 2}
                height={height * 2}
                className="w-full h-auto rounded-xl"
                quality={100}
                unoptimized={src.endsWith(".gif")}
              />
              {caption && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  {caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
