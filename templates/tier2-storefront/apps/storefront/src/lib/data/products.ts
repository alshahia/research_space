import { getMedusaClient } from "../medusa"

/**
 * Server-side product fetch. Reaches out to Medusa via @medusajs/js-sdk (Medusa 2.x client).
 * Cached per request by Next.js — no manual memoization needed.
 */

function countryCodeToRegion(countryCode: string): string {
  // Path B scaffold: 1 region per country. Production would have multi-region.
  switch (countryCode) {
    case "us":
      return "reg_us"
    case "gb":
      return "reg_gb"
    case "de":
      return "reg_de"
    default:
      return "reg_us"
  }
}

export async function listFeaturedProducts(countryCode: string, limit = 6) {
  const client = getMedusaClient()
  const { products } = await client.store.product.list({
    limit,
    offset: 0,
    region_id: countryCodeToRegion(countryCode),
  })
  return products
}

export async function listAllProducts(countryCode: string, limit = 100, offset = 0) {
  const client = getMedusaClient()
  const { products } = await client.store.product.list({
    limit,
    offset,
    region_id: countryCodeToRegion(countryCode),
  })
  return products
}

export async function getProductByHandle(countryCode: string, handle: string) {
  const client = getMedusaClient()
  const { products } = await client.store.product.list({
    handle,
    region_id: countryCodeToRegion(countryCode),
  })
  return products[0] ?? null
}

// Back-compat alias for any existing call sites.
export async function getProducts(limit = 6, offset = 0, countryCode = "us") {
  const client = getMedusaClient()
  const { products, count } = await client.store.product.list({
    limit,
    offset,
    region_id: countryCodeToRegion(countryCode),
  })
  return { products, count }
}
