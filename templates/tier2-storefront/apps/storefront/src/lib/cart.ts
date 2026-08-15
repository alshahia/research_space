import { z } from "zod"

/**
 * Cart types + zod schemas. Client-side cart is localStorage-backed; the schema
 * validates items before sending to /api/checkout.
 */

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  title: z.string().min(1),
  thumbnail: z.string().min(1),
  price: z.number().int().positive(), // cents
  quantity: z.number().int().positive().max(99),
})

export type CartItem = z.infer<typeof cartItemSchema>

export const checkoutBodySchema = z.object({
  items: z.array(cartItemSchema).min(1),
  countryCode: z.enum(["us", "gb", "de"]),
})

export type CheckoutBody = z.infer<typeof checkoutBodySchema>

/**
 * Pure cart transitions. The cart is a localStorage-backed list of items in the
 * client; these helpers are pure functions on the item array.
 *
 * Three transitions asserted by tests/cart-flow.test.ts:
 *   - add(): append or merge by variantId
 *   - remove(): drop by variantId
 *   - clear(): empty list
 */
export function add(items: CartItem[], next: CartItem): CartItem[] {
  const existing = items.find((i) => i.variantId === next.variantId)
  if (existing) {
    return items.map((i) =>
      i.variantId === next.variantId
        ? { ...i, quantity: Math.min(99, i.quantity + next.quantity) }
        : i
    )
  }
  return [...items, next]
}

export function remove(items: CartItem[], variantId: string): CartItem[] {
  return items.filter((i) => i.variantId !== variantId)
}

export function clear(_items: CartItem[]): CartItem[] {
  void _items
  return []
}
