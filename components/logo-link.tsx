import Link, { LinkProps } from "next/link";
import type { ReactNode } from "react";

interface LogoLinkProps extends Omit<LinkProps, "href"> {
  className?: string;
  children: ReactNode;
  href?: LinkProps["href"];
}

/**
 * Brand logo link.
 *
 * Behavior:
 * - On any page other than `/`, behaves as a normal Next.js link to home.
 *   Next's router scrolls to the top of the new page by default.
 * - When already on `/`, intercepts the click and smoothly scrolls back to
 *   the top of the document instead of being a no-op.
 */
export function LogoLink({
  href,
  className,
  children,
  ...props
}: LogoLinkProps) {
  return (
    <Link href={href ?? "/#"} className={className} {...props}>
      {children}
    </Link>
  );
}
