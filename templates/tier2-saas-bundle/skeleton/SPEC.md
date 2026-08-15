# SPEC — tier2-saas-bundle

Skeleton for SaaS apps. Vite + React 19 + React Router 7 (Declarative) + Express 4 + Clerk React + Stripe + Resend.

**Restate-and-confirm artifact** (per `templates/tier1-standard/skeleton/SPEC.md` convention): when adapting this skeleton for a real app, the user replies "go" or "change X to Y" to confirm before coding.

## Stack (verified 2026-08-14)

- **Frontend:** Vite 8 (`^8.2.1`), React 19 (`^19.2.8`), TypeScript strict, Tailwind v4 (`^4.3.3`).
- **Routing:** React Router 7 (`react-router-dom ^7.18.2`) — Declarative mode (`createBrowserRouter`). Pin note: npm `react-router-dom` is on the 7.x track (latest `7.18.2`); the umbrella `react-router` package hit `8.3.0` and matches the user's "Main active stable branch" reference, but the `react-router-dom` legacy-import path is what every existing tutorial uses. Per Phase 2 Gate E, we ship `react-router-dom ^7.18.2`. Migrating to v8 requires `react-router` (no `-dom` suffix) — out of scope for the spine.
- **Auth:** `@clerk/clerk-react ^5.61.3` (client) + `@clerk/express ^2.1.56` (server middleware).
- **Server:** Express 4 (`^4.22.2`) — single Node process serves SPA + API. NOT Express 5 (different req/res API + breaking changes vs the 4.x LTS). Per Phase 2 Gate E directive: "Express 4".
- **Payments:** `stripe ^22.5.0` (server SDK) + `@stripe/stripe-js ^9.13.0` (loaded only if the SPA needs Stripe.js directly; checkout uses hosted Stripe Checkout URL).
- **Email:** `resend ^6.20.0` (server).
- **Dev concurrency:** `concurrently ^10.0.4` (Vite + Express in one terminal).
- **Build env:** `tsx ^4.23.12` runs `server.ts` in dev + prod.
- **Testing:** Vitest 4, jsdom, `@testing-library/react ^16.3.2`, `@testing-library/jest-dom ^7.0.1`.

## Endpoints

| Method | Path | Auth | Handler |
|---|---|---|---|
| `POST` | `/api/webhooks/stripe` | Sig-verified (NO Clerk) | `express.raw({type: "application/json"})` → `verifyWebhook(rawBody, sigHeader)`. Idempotent on Stripe `event.id`. |
| `POST` | `/api/checkout` | Clerk `requireAuth()` | Body `{ priceId }`. Returns `{ url, id, userId }`. |
| `GET`  | `/api/portal`   | Clerk `requireAuth()` | Returns `{ url }` (Stripe Billing portal session). |
| `GET`  | `*`             | Public | `dist/index.html` (SPA fallback). |

## Stripe webhook handling

`server.ts` registers the webhook route BEFORE `express.json()` + `clerkMiddleware()`, because Stripe HMAC verification requires the exact raw body bytes.

```ts
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => { ... }
);
app.use(express.json());
app.use(clerkMiddleware(...));
```

Idempotency: `src/db/schema/subscriptions.ts` exposes `wasStripeEventProcessed(eventId)` + `markStripeEventProcessed(eventId)` backed by an in-process `Set<string>`. **This is the scaffold-time stand-in.** Production deployment replaces it with a Postgres UNIQUE INDEX on `processed_stripe_events(event_id)`.

State machine (driven by webhook events):
- `NONE → TRIALING`: `checkout.session.completed` with `mode=subscription`.
- `TRIALING → ACTIVE`: `invoice.payment_succeeded`.
- `ACTIVE → PAST_DUE`: `invoice.payment_failed` (also triggers `sendBillingFailedEmail`).
- `PAST_DUE → CANCELED`: `customer.subscription.deleted`.

## Idempotency table caveat

The `processed_stripe_events` table is **deferred to deploy-time** (Q5: no real Postgres on Windows). The in-memory `Set<string>` is fine for unit tests + single-process local dev. **In production with multiple Node workers (or horizontally scaled deploys), the in-memory Set is insufficient** — concurrent requests can both pass the `wasStripeEventProcessed` check and apply side effects twice. Postgres UNIQUE INDEX is the only correct cross-process solution.

## Dev workflow

```bash
# Single terminal, two processes (Vite on 5173 + Express on 3000):
npm run dev

# OR run them separately for easier log inspection:
npm run dev:vite   # Vite dev server (proxies /api → :3000)
npm run dev:server # tsx watch server.ts
```

Vite proxies `/api/*` to the Express port (default 3000) so the SPA can call `/api/checkout` from the same origin without CORS preflights in dev.

## Prod workflow (single Node process serves SPA + API)

```bash
npm install
npm run build    # tsc --noEmit && vite build (produces dist/)
npm start        # tsx server.ts (Express serves dist/ + 3 API routes)
```

`server.ts` reads `import "dotenv/config"` at the top, so `.env` is loaded automatically. In production, prefer your platform's secret manager.

## Stripe CLI for local webhook testing

```bash
# In a separate terminal:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# copy the whsec_... it prints into STRIPE_WEBHOOK_SECRET
```

## Node version

`engines.node: ">=22.0.0"`. Verified at scaffold: Node `v24.18.0`.

## Deferred to deploy-time (per Q5)

- Real Postgres UNIQUE INDEX for Stripe event idempotency (in-memory `Set` ships with the spine).
- Drizzle migration for `subscriptions` table (`src/db/schema/subscriptions.ts` is a typed placeholder).
- Real Clerk publishable + secret keys (skeleton uses `pk_test_replace_me` / `sk_test_replace_me`).
- Real Stripe `price_*` IDs (skeleton uses `price_pro_test_replace_me` / `price_team_test_replace_me`).
- Real Resend API key (skeleton uses `re_replace_me`).
