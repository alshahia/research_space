import { describe, it, expect, vi, beforeEach } from "vitest"
import { NextRequest } from "next/server"

/**
 * /api/checkout test. Mocks the Stripe SDK at the module level (the only
 * dependency that talks to the network) and asserts the route handler
 * returns a `{ url }` shape.
 *
 * No live Stripe call.
 */

const sessionsCreate = vi.fn()
vi.mock("@/lib/stripe", async () => {
  return {
    getStripe: () => ({ checkout: { sessions: { create: sessionsCreate } } }),
    countryToCurrency: (cc: string) =>
      cc === "gb" ? "gbp" : cc === "de" ? "eur" : "usd",
    STRIPE_API_VERSION: "2025-08-27.basil",
  }
})

// Import after the mock is registered.
const { POST } = await import("@/app/api/checkout/route")

function makeReq(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

describe("/api/checkout", () => {
  beforeEach(() => {
    sessionsCreate.mockReset()
    sessionsCreate.mockResolvedValue({
      id: "cs_test_1",
      url: "https://checkout.stripe.com/c/pay/cs_test_1",
    })
  })

  it("creates a Stripe session for US items and returns the url", async () => {
    const body = {
      items: [
        {
          productId: "p1",
          variantId: "v1",
          title: "Mechanical keyboard",
          thumbnail: "https://cdn.example/kb.png",
          price: 9900,
          quantity: 1,
        },
      ],
      countryCode: "us",
    }
    const res = await POST(makeReq(body) as NextRequest)
    expect(res.status).toBe(200)
    const json = (await res.json()) as { url: string }
    expect(json.url).toMatch(/^https:\/\/checkout\.stripe\.com\//)
    expect(sessionsCreate).toHaveBeenCalledOnce()
    const arg = sessionsCreate.mock.calls[0]?.[0] as { mode: string; line_items: unknown[] }
    expect(arg.mode).toBe("payment")
    expect(Array.isArray(arg.line_items)).toBe(true)
  })

  it("returns 400 for invalid payload (missing items)", async () => {
    const res = await POST(makeReq({ countryCode: "us" }) as NextRequest)
    expect(res.status).toBe(400)
  })

  it("returns 400 for unsupported countryCode", async () => {
    const body = {
      items: [
        {
          productId: "p1",
          variantId: "v1",
          title: "x",
          thumbnail: "t",
          price: 100,
          quantity: 1,
        },
      ],
      countryCode: "fr",
    }
    const res = await POST(makeReq(body) as NextRequest)
    expect(res.status).toBe(400)
  })
})
