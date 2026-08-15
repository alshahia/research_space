# tier2-storefront — Storefront app (apps/storefront)

Next.js 15 App Router storefront. Path B override of the tier1 Vite spine. Talks to the Medusa 2 backend in `../backend` and Stripe Checkout for payments.

## Quick start

```bash
# from the workspace root
npm install

# 1. Configure env
cp .env.example .env
# Edit .env: fill STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
#            NEXT_PUBLIC_MEDUSA_BACKEND_URL, NEXT_PUBLIC_SITE_URL.

# 2. Dev (Next.js only — assumes backend is reachable)
npm run dev:storefront
# or directly:
cd apps/storefront && npm run dev
```

App is on `http://localhost:3000`. Middleware redirects `/` → `/us`.

## Layout

```
src/
  app/
    [countryCode]/
      (main)/
        page.tsx                    # landing — 6 featured cards
        products/page.tsx           # PLP
        products/[handle]/page.tsx  # PDP
        cart/page.tsx               # cart drawer page
        order-confirmation/page.tsx # post-Stripe thank-you
      layout.tsx                    # country-scoped shell (Header/Footer)
    api/
      checkout/route.ts             # POST → Stripe Checkout session
      webhooks/stripe/route.ts      # POST → signature verification + dispatch
      return/route.ts               # GET → Stripe Checkout return redirect
  components/                       # 7 components (server + 'use client')
  lib/
    medusa.ts                       # Medusa JS client singleton
    stripe.ts                       # Stripe SDK singleton + country → currency
    cart.ts                         # zod schemas + pure transitions
    data/{products,cart}.ts         # server-side fetchers
  middleware.ts                     # countryCode detection
  styles/globals.css                # Tailwind v4
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | `next dev -p 3000` (the storefront only) |
| `npm run build` | `next build` (standalone output) |
| `npm start` | `next start -p 3000` |
| `npm run type-check` | `tsc --noEmit` |
| `npm test` | Vitest (cart-flow, stripe-webhook, stripe-checkout) |

## Tests

```bash
cd apps/storefront
npm test
```

- **cart-flow.test.ts** — pure cart transitions (add/remove/clear/cap-at-99).
- **stripe-webhook.test.ts** — signature verify: happy path + bad-sig path, real Stripe SDK against local payload (no live call).
- **stripe-checkout.test.ts** — `/api/checkout` happy + 400 paths, Stripe SDK mocked.

## Country routing

Middleware (`src/middleware.ts`) checks the first path segment. Supported: `us`, `gb`, `de`. Anything else → 307 to `/us`. `/api/*` and `/_next/*` are excluded.

## Deferred items (Windows host)

- **Stripe webhook secret** without `stripe listen`: `.env.example` ships a `whsec_replace_me` placeholder. Use `stripe listen --forward-to localhost:3000/api/webhooks/stripe` for a real one.
- **Medusa 2 `medusa develop`** requires Postgres + Redis. Not present on this Windows host. Deploy-time concern (see `apps/backend/README.md`).
- **Idempotency table** lives in-process (`seenEventIds: Set<string>` in `webhooks/stripe/route.ts`). For HA, promote to Postgres.
- **No live Stripe test**: tests mock the SDK; checkout route is exercised via unit test only.
- **`next build` React #31 on Windows** (env-deferred 2026-08-14): the static-prerender step for `/404` + `/500` throws React #31 on Windows + Next 15.5. Reproduces on a 2-file hello-world; verified to be an env-level Next 15.5 + Windows prerender pipeline bug (NOT a scaffold defect). All other dev/build steps (`next dev`, `next start` after `next dev`, `tsc --noEmit`, all 9 tests) work on Windows. Production CI runs on Linux/macOS, where the build is unblocked. To unblock on Windows: downgrade `next` to `14.2.x` LTS (changes the spine lock — reserved for Phase 3.5 if 3.5 also hits this). Skeleton ships with Next 15.5.
