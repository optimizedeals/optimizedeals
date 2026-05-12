interface EmbedProps {
  src: string;
  title?: string;
  caption?: string;
  height?: number | string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9" | "auto";
  allow?: string;
}

export function Embed({
  src,
  title = "Embedded content",
  caption,
  height,
  aspectRatio = "16/9",
  allow,
}: EmbedProps) {
  const containerStyle: React.CSSProperties =
    aspectRatio === "auto"
      ? { height: typeof height === "number" ? `${height}px` : height }
      : { aspectRatio };

  return (
    <figure className="my-8 not-prose">
      <div
        className="relative overflow-hidden rounded-xl border border-border/30 bg-black"
        style={containerStyle}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow={allow}
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
