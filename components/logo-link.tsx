import type { ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";

interface LogoLinkProps {
  className?: string;
  children: ReactNode;
  href?: string;
}

/**
 * Brand logo link. Wraps next-intl's locale-aware `Link` so the logo
 * always points to the current-locale root.
 */
export function LogoLink({
  href,
  className,
  children,
}: LogoLinkProps) {
  return (
    <Link href={href ?? "/"} className={className}>
      {children}
    </Link>
  );
}
