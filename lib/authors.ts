import { toSlug } from "@/lib/slugify";

export function authorSlug(name: string): string {
  return toSlug(name);
}

export function authorInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
