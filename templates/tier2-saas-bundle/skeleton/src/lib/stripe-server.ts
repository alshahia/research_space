// src/lib/stripe-server.ts — Tier 2 SaaS bundle skeleton
// Server-side Stripe SDK singleton. Three exports called by `server.ts`:
//
//   verifyWebhook(rawBody, sigHeader) — used by POST /api/webhooks/stripe.
//     Stripe REQUIRES the raw, unparsed body for HMAC verification;
//     `app.post('/api/webhooks/stripe', express.raw(...), handler)` in
//     `server.ts` is what makes that raw body available.
//
//   createCheckoutSession({ priceId, customerId, successUrl, cancelUrl })
//     used by POST /api/checkout. Returns a Stripe Checkout URL.
//
//   createPortalSession(customerId, returnUrl) — used by GET /api/portal.
//     Returns a Stripe Billing portal URL.
//
// ponytail: lazy-init keeps tests from crashing on missing STRIPE_SECRET_KEY;
// tests inject a fixture via `vi.mock('@/lib/stripe-server', ...)`.
import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY ?? "sk_test_fake_for_tests";
  cached = new Stripe(key, { apiVersion: "2026-07-29.dahlia" });
  return cached;
}

/**
 * Verify a Stripe webhook signature. Throws on tampered signature.
 * Returns the parsed Stripe.Event on success.
 */
export function verifyWebhook(rawBody: string | Buffer, sigHeader: string): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_test_fake";
  return getStripe().webhooks.constructEvent(rawBody, sigHeader, secret);
}

export interface CheckoutSessionInput {
  priceId: string;
  customerId?: string | undefined;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string | undefined;
}

export async function createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string; id: string }> {
  // ponytail: only set `customer` / `customer_email` keys when defined;
  // the Stripe SDK's strict types reject `undefined` values under
  // `exactOptionalPropertyTypes: true`.
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    line_items: [{ price: input.priceId, quantity: 1 }],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    allow_promotion_codes: true,
  };
  if (input.customerId) params.customer = input.customerId;
  if (input.customerEmail) params.customer_email = input.customerEmail;
  const session = await getStripe().checkout.sessions.create(params);
  if (!session.url) throw new Error("Stripe checkout session did not return a URL");
  return { url: session.url, id: session.id };
}

export async function createPortalSession(customerId: string, returnUrl: string): Promise<{ url: string }> {
  const portal = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return { url: portal.url };
}
