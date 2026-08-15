import Stripe from "stripe"

/**
 * Server-side Stripe SDK singleton. Lazy-init keeps tests from crashing on
 * missing STRIPE_SECRET_KEY (tests inject a fixture via vi.mock).
 *
 * apiVersion is pinned to a known-good release; bump deliberately after testing.
 */
let cached: Stripe | null = null

export function getStripe(): Stripe {
  if (cached) return cached

  const key = process.env.STRIPE_SECRET_KEY ?? "sk_test_fake_for_tests"
  cached = new Stripe(key, { apiVersion: "2026-07-29.dahlia" })
  return cached
}

export const STRIPE_API_VERSION = "2026-07-29.dahlia"

/**
 * Map countryCode (us/gb/de) → Stripe currency code (usd/gbp/eur).
 */
export function countryToCurrency(countryCode: string): "usd" | "gbp" | "eur" {
  switch (countryCode) {
    case "us":
      return "usd"
    case "gb":
      return "gbp"
    case "de":
      return "eur"
    default:
      return "usd"
  }
}
