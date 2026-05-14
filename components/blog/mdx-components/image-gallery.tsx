"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageViewer } from "./image-viewer";

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

  const next = () =>
    setOpen((i) => (i === null ? null : (i + 1) % images.length));
  const prev = () =>
    setOpen((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );

  useEffect(() => {
    if (open === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div className="not-prose my-8">
      <div className={cn("grid gap-3", gridCols[columns])}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="relative aspect-square overflow-hidden rounded-xl border border-border/30 group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              unoptimized={img.src.endsWith(".gif")}
              quality={100}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <ImageViewer
          src={images[open].src}
          alt={images[open].alt}
          open
          onClose={() => setOpen(null)}
          unoptimized={images[open].src.endsWith(".gif")}
          resetKey={open}
        >
          <button
            className="fixed left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10
              rounded-full bg-black/40 backdrop-blur-sm border border-white/10
              text-white/70 hover:text-white hover:bg-black/60
              transition-all shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            className="fixed right-16 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10
              rounded-full bg-black/40 backdrop-blur-sm border border-white/10
              text-white/70 hover:text-white hover:bg-black/60
              transition-all shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {images[open].caption && (
            <p className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 text-sm text-white/70 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
              {images[open].caption}
            </p>
          )}
        </ImageViewer>
      )}
    </div>
  );
}
