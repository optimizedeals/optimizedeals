"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { ImageViewer } from "./image-viewer";

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
  const [open, setOpen] = useState(false);

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
          onClick={() => setOpen(true)}
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

      <ImageViewer
        src={src}
        alt={alt}
        width={width * 2}
        height={height * 2}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
