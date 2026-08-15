"use client"

import { useEffect, useState } from "react"
import type { CartItem } from "@/lib/cart"
import { remove } from "@/lib/cart"

/**
 * Client component — reads the cart from localStorage and renders a side drawer.
 *
 * Used as a slide-out panel triggered from the header. Esc closes; click outside
 * closes. Pure DOM manipulation — no global state library.
 */
export function CartDrawer({
  open,
  onClose,
  countryCode: _countryCode,
}: {
  open: boolean
  onClose: () => void
  countryCode?: string
}) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (!open) return
    const raw = window.localStorage.getItem("cart") ?? "[]"
    setItems(JSON.parse(raw) as CartItem[])
  }, [open])

  useEffect(() => {
    if (!open) return
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [open, onClose])

  function handleRemove(variantId: string) {
    const next = remove(items, variantId)
    setItems(next)
    window.localStorage.setItem("cart", JSON.stringify(next))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end" data-testid="cart-drawer">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="relative bg-white w-96 h-full p-6 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button type="button" onClick={onClose} className="text-sm">
            Close
          </button>
        </div>
        {items.length === 0 ? (
          <p className="text-neutral-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.variantId} className="flex gap-3 border-b pb-3">
                <img src={i.thumbnail} alt={i.title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium">{i.title}</p>
                  <p className="text-sm text-neutral-600">Qty {i.quantity}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(i.variantId)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  )
}
