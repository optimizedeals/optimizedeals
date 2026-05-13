const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

export function authorSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function authorAvatarSrc(name: string): string {
  return `/posts/authors/${authorSlug(name)}.png`;
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
