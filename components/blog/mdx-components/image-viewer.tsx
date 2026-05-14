"use client";

import { type ReactNode, useCallback } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
  useTransformComponent,
} from "react-zoom-pan-pinch";
import { X, Minus, Plus, RotateCcw } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  open: boolean;
  onClose: () => void;
  unoptimized?: boolean;
  children?: ReactNode;
  resetKey?: string | number;
}

function DimensionsBadge() {
  return useTransformComponent(({ state }) => <>{state.scale.toFixed(2)}x</>);
}

function Controls() {
  const { zoomIn, zoomOut, resetTransform, state } = useControls();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-xl select-none">
        <button
          onClick={() => zoomOut()}
          className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs text-white/80 font-mono min-w-14 text-center tabular-nums">
          <DimensionsBadge />
        </span>

        <button
          onClick={() => zoomIn()}
          className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/10" />

        <button
          onClick={() => resetTransform()}
          className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Reset zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function ZoomableImage({
  src,
  alt,
  width,
  height,
  unoptimized,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  unoptimized?: boolean;
}) {
  const { resetTransform } = useControls();
  const onLoad = useCallback(() => resetTransform(), [resetTransform]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1600}
      height={height ?? 1200}
      className="max-w-[90vw] max-h-[85vh] w-auto h-auto select-none"
      priority
      quality={100}
      unoptimized={unoptimized}
      draggable={false}
      onLoad={onLoad}
    />
  );
}

export function ImageViewer({
  src,
  alt,
  width,
  height,
  open,
  onClose,
  unoptimized,
  children,
  resetKey,
}: ImageViewerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl cursor-zoom-out
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            duration-200"
        />

        <DialogPrimitive.Content
          className="fixed inset-0 z-50
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            duration-200"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">
            Image viewer: {alt}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Zoomable image viewer with pan and drag support
          </DialogPrimitive.Description>

          <DialogPrimitive.Close asChild>
            <button
              className="fixed top-4 right-4 z-30 flex items-center justify-center w-10 h-10
                rounded-full bg-black/40 backdrop-blur-sm border border-white/10
                text-white/70 hover:text-white hover:bg-black/60
                transition-all shadow-lg
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogPrimitive.Close>

          <TransformWrapper
            key={`${src}-${resetKey}`}
            centerOnInit
            minScale={0.5}
            maxScale={15}
            wheel={{ step: 0.001 }}
            doubleClick={{ mode: "toggle", step: 1.5 }}
            panning={{
              allowLeftClickPan: true,
              allowRightClickPan: false,
              allowMiddleClickPan: false,
            }}
            limitToBounds={false}
            smooth
          >
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="flex items-center justify-center"
            >
              <ZoomableImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized={unoptimized ?? src.endsWith(".gif")}
              />
            </TransformComponent>
            <Controls />
          </TransformWrapper>

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
