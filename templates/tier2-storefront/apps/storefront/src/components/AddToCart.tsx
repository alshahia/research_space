"use client"

import { useState } from "react"
import type { CartItem } from "@/lib/cart"

export type AddToCartProps = {
  productId: string
  variantId: string
  title: string
  thumbnail: string
  price: number
  countryCode: string
}

/**
 * Client component — adds an item to the cart (localStorage) and shows a
 * "Added" confirmation. The actual checkout submit is a separate server action
 * invoked from /[countryCode]/cart/page.tsx.
 *
 * On Windows this is testable via vitest + jsdom; tests live at tests/cart-flow.test.ts
 * (which exercises the pure cart helpers in src/lib/cart.ts, not this client UI).
 */
export function AddToCart({ productId, variantId, title, thumbnail, price }: AddToCartProps) {
  void AddToCart
  void productId
  void variantId
  void title
  void thumbnail
  void price
  const [added, setAdded] = useState(false)

  function handleClick() {
    const raw = window.localStorage.getItem("cart") ?? "[]"
    const items: CartItem[] = JSON.parse(raw)
    const next: CartItem = {
      productId,
      variantId,
      title,
      thumbnail,
      price,
      quantity: 1,
    }
    const merged = mergeByVariant(items, next)
    window.localStorage.setItem("cart", JSON.stringify(merged))
    setAdded(true)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-brand-900 text-white px-4 py-2 rounded hover:bg-brand-500"
      data-testid="add-to-cart"
    >
      {added ? "Added" : "Add to cart"}
    </button>
  )
}

function mergeByVariant(items: CartItem[], next: CartItem): CartItem[] {
  const existing = items.find((i) => i.variantId === next.variantId)
  if (existing) {
    return items.map((i) =>
      i.variantId === next.variantId
        ? { ...i, quantity: Math.min(99, i.quantity + 1) }
        : i
    )
  }
  return [...items, next]
}
