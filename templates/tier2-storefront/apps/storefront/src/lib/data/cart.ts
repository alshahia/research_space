import { getMedusaClient } from "../medusa"

/**
 * Server-side cart fetch (post-Stripe-checkout). The cart is keyed by Medusa's
 * cart id (a UUID); the storefront stores the id in a cookie so server components
 * can read it.
 *
 * Client-side cart lives in localStorage (see src/lib/cart.ts); this is the
 * authoritative server-side view after checkout submission.
 */
export async function getCart(cartId: string) {
  const client = getMedusaClient()
  try {
    const { cart } = await client.store.cart.retrieve(cartId)
    return cart
  } catch {
    // Cart doesn't exist yet (typical on first visit) — caller handles null.
    return null
  }
}
