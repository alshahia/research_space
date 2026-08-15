import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * GET /store/products?limit=6&offset=0
 *
 * Returns Medusa's product list shape: { products: Product[], count: number }.
 * Default limit is 6 (matches the storefront's "featured products" landing page).
 *
 * Tests mock this via supertest + a pg-mem-backed Medusa service container;
 * see apps/backend/tests/smoke-backend.test.ts.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productModule = req.scope.resolve("productModuleService") as {
    listAndCount: (selector: object, config: { skip: number; take: number }) => Promise<[unknown[], number]>
  }

  const limit = Number(req.query.limit ?? 6)
  const offset = Number(req.query.offset ?? 0)

  if (!Number.isFinite(limit) || limit < 1 || limit > 100) {
    res.status(400).json({ error: "limit must be 1-100" })
    return
  }
  if (!Number.isFinite(offset) || offset < 0) {
    res.status(400).json({ error: "offset must be >= 0" })
    return
  }

  const [products, count] = await productModule.listAndCount(
    {},
    { skip: offset, take: limit }
  )

  res.json({ products, count })
}
