import Medusa from "@medusajs/js-sdk"

/**
 * Server-side Medusa JS SDK client (Medusa 2.x).
 * Singleton — Next.js caches modules across requests.
 *
 * `MEDUSA_BACKEND_URL` defaults to `http://localhost:9000` (matches `apps/backend`'s dev port).
 * `publishableKey` is optional in self-hosted dev; pass it in production for per-key rate-limits.
 */
let cached: Medusa | null = null

export function getMedusaClient(): Medusa {
  if (cached) return cached

  const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  // Ponytail: construct config without undefined fields so the SDK accepts
  // exactOptionalPropertyTypes: true.
  const config: { baseUrl: string; debug: boolean; publishableKey?: string } = {
    baseUrl,
    debug: process.env.NODE_ENV === "development",
  }
  if (publishableKey) config.publishableKey = publishableKey
  cached = new Medusa(config)
  return cached
}

export type { Medusa }
