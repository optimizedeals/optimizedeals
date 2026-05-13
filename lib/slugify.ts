import slugify from "slugify";

export function toSlug(value: string): string {
  return slugify(value, { lower: true, strict: true });
}

export const categorySlug = toSlug;
export const tagSlug = toSlug;
