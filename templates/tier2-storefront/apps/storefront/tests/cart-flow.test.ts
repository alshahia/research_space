import { describe, it, expect, beforeEach, vi } from "vitest"
import { add, remove, clear, type CartItem } from "@/lib/cart"

/**
 * Cart-flow tests: 3 transitions (add → remove → clear) using mocked localStorage.
 * The cart helpers are pure functions; this test mounts them via a stub store
 * that mimics localStorage so the AddToCart client component can be tested if
 * we ever add jsdom-mount assertions.
 */

function makeItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    productId: "prod_1",
    variantId: "variant_1",
    title: "Test Item",
    thumbnail: "https://cdn.example/img.png",
    price: 1999,
    quantity: 1,
    ...overrides,
  }
}

describe("cart-flow transitions", () => {
  beforeEach(() => {
    // Stub global localStorage + matchMedia for any client-side mount.
    const store = new Map<string, string>()
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
      key: (i: number) => Array.from(store.keys())[i] ?? null,
      get length() {
        return store.size
      },
    })
    vi.stubGlobal(
      "matchMedia",
      () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
    )
  })

  it("add: appends a new item, then merges qty by variantId", () => {
    const a = makeItem({ variantId: "v1", quantity: 1 })
    const after1 = add([], a)
    expect(after1).toHaveLength(1)
    expect(after1[0]?.quantity).toBe(1)

    const a2 = makeItem({ variantId: "v1", quantity: 2 })
    const after2 = add(after1, a2)
    expect(after2).toHaveLength(1)
    expect(after2[0]?.quantity).toBe(3)
  })

  it("remove: drops the item with matching variantId", () => {
    const items = [
      makeItem({ variantId: "v1", quantity: 1 }),
      makeItem({ variantId: "v2", quantity: 5 }),
    ]
    const after = remove(items, "v1")
    expect(after).toHaveLength(1)
    expect(after[0]?.variantId).toBe("v2")
  })

  it("clear: empties the cart regardless of contents", () => {
    const items = [
      makeItem({ variantId: "v1", quantity: 2 }),
      makeItem({ variantId: "v2", quantity: 3 }),
    ]
    expect(clear(items)).toEqual([])
  })

  it("add: caps quantity at 99", () => {
    const items = [makeItem({ variantId: "v1", quantity: 98 })]
    const after = add(items, makeItem({ variantId: "v1", quantity: 10 }))
    expect(after[0]?.quantity).toBe(99)
  })
})
