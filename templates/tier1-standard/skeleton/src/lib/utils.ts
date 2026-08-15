// src/lib/utils.ts — Tier 1 standard skeleton
// ponytail: cn() + tailwind-merge. The single classname helper for the whole app.
// clsx + tailwind-merge is the standard shadcn/ui pattern; do not re-implement.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
