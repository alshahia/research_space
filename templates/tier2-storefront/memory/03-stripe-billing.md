# Memory — 03 Stripe billing

Quick reference for the Stripe Checkout + webhook flow in `tier2-storefront`. Last verified: 2026-08-14. Source: https://stripe.com/docs/payments/checkout + https://stripe.com/docs/webhooks

## What it is

Stripe Checkout is Stripe's hosted payment page. We redirect the user there, Stripe handles card collection + SCA + 3DS + Apple Pay, then redirects the user back to our `/api/return` route. We **also** receive a webhook POST for `checkout.session.completed`, which is the **authoritative** payment-success signal (the redirect is a UI nicety; the webhook is the truth).

## Flow

```
1. user clicks "Checkout"
2. client → POST /api/checkout { items, countryCode }
3. server: stripe.checkout.sessions.create({
     line_items: items.map(...)  // derive price from Medusa
     currency: countryToCurrency(countryCode),
     success_url: `${SITE_URL}/${countryCode}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
     cancel_url:  `${SITE_URL}/${countryCode}/cart`,
   })
4. server: respond { url: session.url }
5. client: window.location = session.url   // → https://checkout.stripe.com/...
6. user completes payment on Stripe-hosted page
7. stripe: 302 → success_url   // user lands on /order-confirmation
8. stripe POSTS webhook: POST /api/webhooks/stripe
   headers: Stripe-Signature: t=...,v1=...
   body: { id: "evt_...", type: "checkout.session.completed", data: { object: { session... } } }
9. server: Stripe.webhooks.constructEvent(rawBody, signatureHeader, secret)
   // if signature is invalid → 400
   // if event.id already processed → 200 (idempotent)
10. server: medusa.orders.markAsPaid(orderId)  // delegated to Medusa subscriber (deferred)
11. server: return 200
```

## Webhook signature verification

```ts
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const rawBody = await req.text()                       // raw bytes (NOT parsed JSON)
  const sig = req.headers.get("stripe-signature") ?? ""
  try {
    const event = stripe.webhooks.constructEvent(
      rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!
    )
    // ... handle event.type === "checkout.session.completed"
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 })
  }
  return new Response(null, { status: 200 })
}
```

The `stripe-signature` header looks like `t=1234567890,v1=abc123...`. The `constructEvent` method does the HMAC math and the timestamp tolerance check (default 5 minutes).

**Why raw body?** `Stripe.webhooks.constructEvent` computes HMAC over the **exact raw byte sequence** Stripe sent. If you `req.json()` first, the JSON parser may re-serialize the body with different whitespace, the HMAC won't match, and you get `Webhook Error: No signatures found matching the expected signature for payload`. Use `await req.text()` (NOT `await req.json()`).

## Idempotency

Stripe retries webhooks on non-2xx responses — sometimes up to 24 hours. You MUST deduplicate on `event.id`:

```ts
const processedEvents = new Map<string, true>()

function alreadyProcessed(eventId: string): boolean {
  if (processedEvents.has(eventId)) return true
  processedEvents.set(eventId, true)
  // TTL prune every hour (production: Redis SET with EX 86400)
  if (processedEvents.size > 10_000) processedEvents.clear()
  return false
}
```

For production, replace the in-memory Map with Redis:
```ts
const dedupKey = `stripe:event:${eventId}`
const alreadyProcessed = await redis.exists(dedupKey) === 1
if (!alreadyProcessed) await redis.set(dedupKey, "1", "EX", 86400)
```

This scaffold uses the in-memory map (ships the pattern; production noted).

## Stripe Checkout Session shape (response)

```ts
{
  id: "cs_test_a1b2c3...",
  url: "https://checkout.stripe.com/c/pay/cs_test_a1b2c3...",
  // ...
}
```

The `url` field is what the client redirects to. The `tests/stripe-checkout.test.ts` asserts the response shape via mocked `stripe.checkout.sessions.create`.

## Testing webhooks locally

For local development, use the Stripe CLI:
```bash
# In another terminal:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This prints a `whsec_...` secret for your local `.env`. The webhook payload that Stripe CLI forwards is signed with **your** secret (not Stripe's production signing key), so HMAC verification works.

`tests/stripe-webhook.test.ts` mocks this entirely — generates a real HMAC using the test secret and exercises `constructEvent` directly.

## Pricing model

Path B uses Stripe Checkout's **one-time line items**, NOT subscriptions. Recurring billing (tier2-saas-bundle, 3.5) will introduce `mode: 'subscription'` and `mode: 'payment` discrimination.

For Path B:
```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: items.map((item) => ({
    price_data: {
      currency: countryToCurrency(countryCode),
      product_data: { name: item.title, images: [item.thumbnail] },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  })),
  // ...
})
```

`unit_amount` is in **cents** (smallest currency unit).

## Currency mapping

| countryCode | Currency | Stripe currency code |
|---|---|---|
| `us` | USD | `usd` |
| `gb` | GBP | `gbp` |
| `de` | EUR | `eur` |

Hard-coded in `src/lib/stripe.ts`. Adding FR/JP is a one-line update.

## Common gotchas

- **Test mode vs Live mode.** Test mode = `sk_test_...` / `pk_test_...`. The URLs look the same. The webhook secret is **different** — `whsec_..._test_...` vs `whsec_..._live_...`. Copy the right one into `.env`.
- **Country restrictions.** Stripe Checkout respects `country` parameter; a US store can't ship to sanctioned countries.
- **Apple Pay / Google Pay.** Auto-enabled if your Stripe account supports them; no extra code.
- **`STRIPE_WEBHOOK_SECRET` is per-endpoint.** If you add another webhook (e.g., `/api/webhooks/stripe-subscription`), it gets its own secret.
- **`payment_intent.payment_failed` events.** Currently logged-only in the handler; future: surface in Medusa admin.

## What this scaffold does NOT cover

- `Stripe.customer.create` — anonymous Checkout sessions are fine; you only need customers if you want saved cards.
- `setup_future_usage` — defer to tier2-saas-bundle (3.5).
- `Stripe Connect` — marketplace splits. Defer.
- Disputes / refunds API — out of scope.
- 3DS step-up — handled automatically by Stripe Checkout.
- `metadata` field on the session — add later if you want to track `userId` in the webhook.

## Tests

- `apps/storefront/tests/stripe-webhook.test.ts` — happy path + bad-sig path, both with real HMAC (no network).
- `apps/storefront/tests/stripe-checkout.test.ts` — mocks `stripe.checkout.sessions.create`, asserts URL shape.

## See also

- 01-medusa.md — Medusa server, where order status updates happen.
- 02-nextjs-storefront.md — Next.js 15 routes.
- 04-deployment.md — deploy notes (Stripe webhook URL must be HTTPS, not HTTP, in production).
