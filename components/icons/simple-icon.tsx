import type { SimpleIcon as SI } from "simple-icons";

interface SimpleIconProps {
  /** Imported simple-icons object (e.g. `siReact` from "simple-icons"). */
  icon: SI;
  /** Pixel size for both width and height. Defaults to 16. */
  size?: number;
  /** Override fill. Falls back to the icon's brand hex. Pass "currentColor" to inherit. */
  color?: string;
  /** Accessible title. Defaults to the brand name. */
  title?: string;
  className?: string;
}

/**
 * Renders a brand SVG from the `simple-icons` package.
 *
 * Each simple-icons object exposes a single 24×24 path; we render the
 * SVG inline so it scales crisply, supports `currentColor` theming,
 * and ships only the bytes for the icons we actually import.
 */
export function SimpleIcon({
  icon,
  size = 16,
  color,
  title,
  className,
}: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color ?? `#${icon.hex}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title ?? icon.title}
      className={className}
    >
      <title>{title ?? icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
