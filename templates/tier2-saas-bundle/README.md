# tier2-saas-bundle

Tier 2 SaaS bundle scaffold.

```
npm install
npm run dev          # Vite (5173) + Express (3000) via concurrently
# OR
npm run build && npm start  # single Node process serves SPA + API on :3000
```

## Spine

- **Vite 8 + React 19 + TypeScript strict + Tailwind v4 + Vitest** (matches tier1-standard exactly)
- **React Router 7** in Declarative mode (`createBrowserRouter`) — no SSR
- **Express 4** in a single Node process — serves `dist/` SPA + `/api/*` routes
- **Clerk React** (`@clerk/clerk-react`) for client auth + `@clerk/express` for server middleware
- **Stripe** for billing (Checkout + customer portal + webhook signature verification)
- **Resend** for transactional email (billing-failed, etc.)
- **NOT Next.js.** Vite + Express stays consistent with tier1-standard + tier2-ai-chat + tier2-mobile. Only tier2-storefront uses Next.js.

## Endpoints

- `POST /api/webhooks/stripe` — webhook signature verification (NOT Clerk-authed; sig-verified only). Idempotent on Stripe `event.id`.
- `POST /api/checkout` — Clerk `requireAuth()`. Body `{ priceId }` → `{ url, id, userId }`.
- `GET  /api/portal` — Clerk `requireAuth()`. Returns the Stripe Billing portal URL.
- `GET  *` — SPA fallback (`dist/index.html`).

## Routes

- `/` → marketing/landing (Pricing)
- `/pricing` → `<PricingTable />` (Free / Pro / Team)
- `/sign-in`, `/sign-up` → Clerk pre-built UI
- `/dashboard` → protected; wrapped in `<SignedIn>` via `ProtectedRoute`

## Environment

Copy `.env.example` → `.env`. Fill in real keys:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
PORT=3000
VITE_PORT=5173
```

## Deferred

Real Postgres migrations for `subscriptions` table (`src/db/schema/subscriptions.ts` is a typed placeholder). Skeleton ships an in-memory `Set<string>` for processed Stripe event IDs; replace with a `UNIQUE INDEX` at deploy time.

## More

- `SPEC.md` — restate-and-confirm artifact template.
- `decisions/decision-log.md` — Phase 2 Gate E pivot note.
- `memory/` — Clerk / Stripe Billing / Resend / deployment notes.
- `prompts/intake-saas-bundle.md` — intake axes.
