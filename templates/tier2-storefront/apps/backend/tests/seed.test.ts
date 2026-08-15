import { describe, it, expect } from "vitest"
import { loadSeed, validateSeed } from "../src/scripts/seed.js"

describe("seed", () => {
  it("loads product-seed.json and validates shape", () => {
    const data = loadSeed()
    expect(data.version).toBe(1)
    expect(data.categories).toHaveLength(3)
    expect(data.products).toHaveLength(6)
  })

  it("produces 6 products × 3 categories with 2 products each", () => {
    const data = loadSeed()
    const counts = validateSeed(data)
    expect(counts).toEqual({
      products: 6,
      categories: 3,
      variants: expect.any(Number),
    })
    // sanity: variants >= products (at least 1 per product)
    expect(counts.variants).toBeGreaterThanOrEqual(6)
  })

  it("validates handle uniqueness", () => {
    const data = loadSeed()
    const handles = data.products.map((p) => p.handle)
    expect(new Set(handles).size).toBe(handles.length)
  })

  it("rejects unknown shape (version mismatch)", () => {
    expect(() => validateSeed({ version: 99, categories: [], products: [] } as never)).toThrow(/version/i)
  })
})
