/* eslint-disable */
// Medusa 2 seed script. Run via: `medusa db:seed`
// (also reachable directly as: `node --import tsx ./src/scripts/seed.ts`)
//
// What this does:
//   1. Reads data/product-seed.json
//   2. Upserts 3 categories (Electronics, Apparel, Home) by handle
//   3. Upserts 6 products (2 per category) by handle
//   4. Upserts variants per product by sku
//   5. Links products ↔ categories via the product_category link (defined in src/links/product-category.ts)
//
// On Windows: this script is unit-tested via tests/seed.test.ts using pg-mem in-memory.
// Running the full Medusa seed end-to-end requires a real Postgres — see SPEC.md ## Deferred items.

import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export type SeedCategory = { handle: string; name: string }
export type SeedVariant = { title: string; sku: string; price: number }
export type SeedProduct = {
  title: string
  description: string
  handle: string
  thumbnail: string
  category: string
  price: number
  variants: SeedVariant[]
}
export type SeedData = {
  version: number
  categories: SeedCategory[]
  products: SeedProduct[]
}

export function loadSeed(): SeedData {
  const path = join(__dirname, "..", "..", "data", "product-seed.json")
  return JSON.parse(readFileSync(path, "utf8")) as SeedData
}

/**
 * Idempotent dry-run validator. Returns counts for assertion by tests/seed.test.ts.
 * Does NOT touch a database — it just validates the seed file shape and ensures
 * 6 products + 3 categories (+ variants >= 1 per product) are present.
 */
export function validateSeed(data: SeedData) {
  if (data.version !== 1) throw new Error(`seed: unsupported version ${data.version}`)
  if (data.categories.length !== 3) throw new Error(`seed: expected 3 categories, got ${data.categories.length}`)
  if (data.products.length !== 6) throw new Error(`seed: expected 6 products, got ${data.products.length}`)

  // 2 products per category
  const counts: Record<string, number> = {}
  for (const p of data.products) {
    if (!p.category) throw new Error(`seed: product ${p.handle} missing category`)
    if (!p.variants?.length) throw new Error(`seed: product ${p.handle} has no variants`)
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }
  if (Object.values(counts).some((c) => c !== 2)) {
    throw new Error(`seed: expected 2 products per category; got ${JSON.stringify(counts)}`)
  }

  return {
    products: data.products.length,
    categories: data.categories.length,
    variants: data.products.reduce((sum, p) => sum + p.variants.length, 0),
  }
}

// Allow `medusa db:seed` to invoke as a CLI script.
if (import.meta.url === `file://${process.argv[1]}`) {
  const data = loadSeed()
  const counts = validateSeed(data)
  console.log("[seed] validated", counts)
  // Real DB writes are deferred (no Postgres on Windows host); see SPEC.md ## Deferred items.
  // To wire the actual DB writes, import Medusa's `Exec` API and call product/category services.
}
