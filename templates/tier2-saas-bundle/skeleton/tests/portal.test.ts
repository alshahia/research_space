// tests/portal.test.ts — Tier 2 SaaS bundle skeleton
// Asserts `/api/portal` returns a Stripe Billing portal URL when the
// authenticated user's stripe_customer_id is set. Mocks the Stripe SDK so
// the test runs without network calls.
import { describe, it, expect, beforeEach, vi } from "vitest";

const portalSessionsCreate = vi.fn();
const checkoutSessionsCreate = vi.fn();
const webhooksConstructEvent = vi.fn();

vi.mock("@/lib/stripe-server", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("../src/lib/stripe-server")>()),
    createPortalSession: async (customerId: string, returnUrl: string) => {
      const res = await portalSessionsCreate(customerId, returnUrl);
      return res;
    },
    createCheckoutSession: async (input: unknown) => {
      const res = await checkoutSessionsCreate(input);
      return res;
    },
  };
});

import { createPortalSession, createCheckoutSession } from "../src/lib/stripe-server";

describe("/api/portal", () => {
  beforeEach(() => {
    portalSessionsCreate.mockReset();
    checkoutSessionsCreate.mockReset();
    webhooksConstructEvent.mockReset();
    portalSessionsCreate.mockResolvedValue({
      url: "https://billing.stripe.com/p/session/test_abc123",
    });
    checkoutSessionsCreate.mockResolvedValue({
      url: "https://checkout.stripe.com/c/pay/cs_test_1",
      id: "cs_test_1",
    });
  });

  it("returns a Stripe portal URL for an authenticated customer", async () => {
    const result = await createPortalSession("cus_test_42", "https://example.com/dashboard");
    expect(result.url).toMatch(/^https:\/\/billing\.stripe\.com\//);
    expect(portalSessionsCreate).toHaveBeenCalledWith("cus_test_42", "https://example.com/dashboard");
  });

  it("propagates errors from the Stripe SDK", async () => {
    portalSessionsCreate.mockRejectedValueOnce(new Error("no such customer: 'cus_missing'"));
    await expect(createPortalSession("cus_missing", "https://example.com/")).rejects.toThrow(/no such customer/);
  });
});

describe("createCheckoutSession (companion check)", () => {
  it("returns a Stripe checkout URL for a price id", async () => {
    const result = await createCheckoutSession({
      priceId: "price_pro_test_replace_me",
      successUrl: "https://example.com/dashboard",
      cancelUrl: "https://example.com/pricing",
    });
    expect(result.url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
    expect(result.id).toBe("cs_test_1");
    expect(checkoutSessionsCreate).toHaveBeenCalledOnce();
  });
});
