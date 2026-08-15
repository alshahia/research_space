# 02 — Stripe Billing patterns

Stripe Billing + the `stripe` Node SDK (`^22.5.0`) cover the three jobs the SaaS skeleton needs: sign up for a plan, manage an existing subscription, and react to server-side state changes via webhook.

## Three API endpoints

```ts
// 1. Create a Checkout session — redirect the user to Stripe-hosted checkout.
//    On success, returns `{ url }` (Stripe-hosted page).
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: priceId, quantity: 1 }],
  customer_email: customerEmail,
  success_url: "https://example.com/dashboard",
  cancel_url: "https://example.com/pricing",
});

// 2. Create a customer portal session — let the user manage their subscription.
//    Returns `{ url }`.
const portal = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: "https://example.com/dashboard",
});

// 3. Verify a webhook signature — REQUIRED before reading `event.data`.
//    rawBody must be the exact bytes Stripe sent (NOT parsed JSON).
const event = stripe.webhooks.constructEvent(rawBody, sigHeader, webhookSecret);
```

## Why the webhook route needs raw body

Express's `express.json()` parses the request body into `req.body` (a JS object). Stripe's HMAC signature is computed over the **raw JSON bytes**. By the time the JSON parser has run, you've lost the exact byte sequence.

Fix: register the webhook route BEFORE `express.json()` + Clerk middleware, and use `express.raw({ type: 'application/json' })` on the route specifically:

```ts
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const event = stripe.webhooks.constructEvent(req.body, sigHeader, secret);
    // ...
  },
);

app.use(express.json());
app.use(clerkMiddleware({ secretKey }));
app.post("/api/checkout", requireAuth(), ...);
```

## Why idempotency matters

Stripe retries webhook delivery on non-2xx responses. If your handler does a side effect (DB write, email), retrying after a transient network blip means double-charging an email or double-incrementing a counter. The fix: key idempotency on `event.id`. The skeleton's `Set<string>` is sufficient for single-process dev + tests; production replaces with a Postgres `UNIQUE INDEX` on `processed_stripe_events(event_id)`.

## State machine (webhook-driven)

| Event | Transition | Side effect |
|---|---|---|
| `checkout.session.completed` | `NONE → TRIALING` | Insert subscription row. |
| `invoice.payment_succeeded` | `TRIALING → ACTIVE` | Update row. |
| `customer.subscription.updated` | `* → ACTIVE` / `* → PAST_DUE` | Update row. |
| `invoice.payment_failed` | `ACTIVE → PAST_DUE` | Update row + send `billing_failed` email via Resend. |
| `customer.subscription.deleted` | `* → CANCELED` | Update row. |

## Customer portal

`billingPortal.sessions.create({ customer, return_url })` is the official replacement for the old `subscriptions.update` + ad-hoc UI. Default portal features include: cancel, pause, update payment method, switch plan, view invoice history.

## API version pinning

`new Stripe(key, { apiVersion: "2026-07-29.dahlia" })` — pinned per the API version date. Your Stripe account is locked to whichever version you used in your first API call after that pin; per-request overrides via `stripe.checkout.sessions.create(..., { apiVersion: "X" })` are escape hatches.

## Pitfalls

- Don't share the secret webhook secret across multiple webhooks. One `whsec_...` per endpoint.
- `stripe.webhooks.constructEvent` accepts `string | Buffer` for the payload, but Buffer is preferred (avoids re-stringifying).
- Stripe Checkout for subscriptions requires `mode: "subscription"` (NOT `mode: "payment"`, which is one-off).
- The portal `customer` parameter is the Stripe customer ID (`cus_...`), not the Clerk user ID. Keep a mapping table.
