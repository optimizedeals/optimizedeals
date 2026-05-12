interface YouTubeProps {
  id: string;
  title?: string;
  caption?: string;
  start?: number;
  aspectRatio?: "16/9" | "4/3" | "1/1";
}

export function YouTube({
  id,
  title = "YouTube video",
  caption,
  start,
  aspectRatio = "16/9",
}: YouTubeProps) {
  const params = new URLSearchParams();
  if (start) params.set("start", String(start));
  const query = params.toString();
  const src = `https://www.youtube-nocookie.com/embed/${id}${query ? `?${query}` : ""}`;

  return (
    <figure className="my-8 not-prose">
      <div
        className="relative overflow-hidden rounded-xl border border-[#002A6B]/30 bg-black"
        style={{ aspectRatio }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[#7A8BA7]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
