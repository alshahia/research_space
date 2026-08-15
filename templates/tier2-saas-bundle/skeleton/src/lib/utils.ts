// src/lib/utils.ts — Tier 2 SaaS bundle skeleton
// cn() helper: clsx + tailwind-merge. The only classname utility.
// ponytail: same pattern as tier1 + tier2-ai-chat; one place to change it.
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
