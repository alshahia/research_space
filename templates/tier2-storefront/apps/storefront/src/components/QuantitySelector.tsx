"use client"

import { useState } from "react"

export type QuantitySelectorProps = {
  variantId: string
  initial?: number
  onChange?: (qty: number) => void
}

/**
 * Client component — quantity input with bounded +/- buttons.
 *
 * Used inside cart line items. Pure local state; parent passes back via onChange
 * if it needs to persist (server actions in a real app).
 */
export function QuantitySelector({ variantId, initial = 1, onChange }: QuantitySelectorProps) {
  const [qty, setQty] = useState(initial)

  const update = (next: number) => {
    const clamped = Math.max(1, Math.min(99, next))
    setQty(clamped)
    onChange?.(clamped)
  }

  return (
    <div className="flex items-center gap-2" data-testid={`qty-${variantId}`}>
      <button
        type="button"
        onClick={() => update(qty - 1)}
        aria-label="Decrease quantity"
        className="px-2 py-1 border rounded"
      >
        −
      </button>
      <span className="w-8 text-center" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => update(qty + 1)}
        aria-label="Increase quantity"
        className="px-2 py-1 border rounded"
      >
        +
      </button>
    </div>
  )
}
