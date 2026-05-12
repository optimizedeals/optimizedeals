"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const next = () => setOpen((i) => (i === null ? null : (i + 1) % images.length));
  const prev = () =>
    setOpen((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );

  return (
    <div className="not-prose my-8">
      <div className={cn("grid gap-3", gridCols[columns])}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="relative aspect-square overflow-hidden rounded-xl border border-[#002A6B]/30 group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              unoptimized={img.src.endsWith(".gif")}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#000216]/95 backdrop-blur-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-[#7A8BA7] hover:text-[#F0F5FB]"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-[#7A8BA7] hover:text-[#F0F5FB]"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#7A8BA7] hover:text-[#F0F5FB]"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <motion.div
              key={open}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[open].src}
                alt={images[open].alt}
                width={1600}
                height={1200}
                className="w-auto h-auto max-w-[90vw] max-h-[80vh] rounded-xl"
                unoptimized={images[open].src.endsWith(".gif")}
              />
              {images[open].caption && (
                <p className="mt-4 text-center text-sm text-[#7A8BA7]">
                  {images[open].caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
