import { describe, it, expect, vi } from "vitest"

/**
 * Smoke test for the Medusa `/store/products` endpoint shape.
 *
 * This test mocks the Medusa container (`productModuleService`) to return
 * deterministic product data, then asserts that:
 *   1. Calling the route handler with `?limit=6&offset=0` returns 6 products
 *   2. The response shape is `{ products: [...], count: N }`
 *   3. Invalid limit/offset returns a 400 with a meaningful error message
 *
 * We import the route handler and mock its DI container. No real Postgres
 * is required — the test runs on pg-mem (configured in vitest.config.ts) if
 * a downstream importer pulls in pg, otherwise it stays pure.
 */

const productList = Array.from({ length: 6 }).map((_, i) => ({
  id: `prod_${i}`,
  title: `Product ${i}`,
  handle: `product-${i}`,
  thumbnail: `/seed/${i}.jpg`,
  variants: [],
}))

function buildReqRes(query: Record<string, string> = {}) {
  const req: { query: Record<string, string>; scope: { resolve: ReturnType<typeof vi.fn> } } = {
    query,
    scope: {
      resolve: vi.fn().mockReturnValue({
        listAndCount: vi.fn().mockResolvedValue([productList, productList.length]),
      }),
    },
  }
  type Res = {
    status: ReturnType<typeof vi.fn>
    json: ReturnType<typeof vi.fn>
  }
  const res: Res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  }
  return { req, res }
}

describe("GET /store/products (smoke)", () => {
  it("returns 6 products + count with default limit=6&offset=0", async () => {
    const { GET } = await import("../src/api/store/products/route.js")
    const { req, res } = buildReqRes({ limit: "6", offset: "0" })
    await GET(req as never, res as never)
    expect(res.json).toHaveBeenCalledWith({ products: productList, count: 6 })
  })

  it("accepts custom limit/offset", async () => {
    const { GET } = await import("../src/api/store/products/route.js")
    const { req, res } = buildReqRes({ limit: "10", offset: "5" })
    await GET(req as never, res as never)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("rejects invalid limit with 400", async () => {
    const { GET } = await import("../src/api/store/products/route.js")
    const { req, res } = buildReqRes({ limit: "0" })
    await GET(req as never, res as never)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining("limit") })
  })

  it("rejects negative offset with 400", async () => {
    const { GET } = await import("../src/api/store/products/route.js")
    const { req, res } = buildReqRes({ offset: "-1" })
    await GET(req as never, res as never)
    expect(res.status).toHaveBeenCalledWith(400)
  })
})
