import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives.
 *
 * These wrap next/link and next/navigation so that `href="/insights"`
 * automatically resolves to `/<current-locale>/insights`, and `useRouter().push`
 * preserves the active locale. Always import from here, never from `next/link`
 * or `next/navigation` directly when targeting localized routes.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
