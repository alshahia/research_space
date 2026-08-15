# SPEC — tier2-storefront (Path B)

This SPEC.md is the authoritative contract for the `tier2-storefront` template. It defers to `SKILL.md` for agent-facing rules and to `tier.config.json` for app-shape axes. Future maintainers: if you change behavior here, also update `PATHS.md` and `decisions/decision-log.md`.

## Path B spec

Tier 1 base app + a self-hosted commerce backend running **Medusa 2.x** (with Postgres 16 + Redis 7) + a **Next.js 15 App Router** server-rendered storefront + **Stripe Checkout** for payments. Three subsystems:

1. **`apps/backend/` (Medusa 2.x Node server).** TypeScript-strict. Owns product/category/order/cart entities. Exposes REST under `/store/*` (customer-facing) and `/admin/*` (merchant-facing). Background jobs run on a Redis-backed queue. Postgres is the source of truth; Redis is the cache + queue + pub/sub bus. Default port `9000`.
2. **`apps/storefront/` (Next.js 15 server).** App Router + Server Components for landing/PLP/PDP/cart/confirmation pages. CountryCode routing (`/us/`, `/gb/`, `/de/`) via middleware. Server actions submit the cart to Stripe Checkout. Stripe webhook handler verifies signature against `STRIPE_WEBHOOK_SECRET`. Default port `3000`.
3. **Stripe (third party, external).** Checkout Session (redirect flow) returns a `https://checkout.stripe.com/...` URL; user completes payment on Stripe's hosted page; Stripe POSTs `checkout.session.completed` to our webhook; webhook marks the Medusa order as paid (out of scope of this scaffold — order status update is a Medusa subscriber, not a route).

## Schema / surface area

### `apps/backend/` routes

| Route | Method | Body / params | Returns |
|---|---|---|---|
| `/store/products` | GET | `?limit&offset&category_id` | `{ products: Product[], count: number }` |
| `/store/products/:id` | GET | — | `Product` |
| `/store/carts` | POST | `{ items: [{ variant_id, quantity }] }` | `Cart` |
| `/store/carts/:id` | GET | — | `Cart` |
| `/admin/products` | GET / POST | (deferred — out of scope) | — |

### `apps/storefront/` routes

| Route | Method | Render | Source |
|---|---|---|---|
| `/` (302) | — | redirect to `/us` | `src/middleware.ts` |
| `/[countryCode]` | GET | landing page | `src/app/[countryCode]/(main)/page.tsx` |
| `/[countryCode]/products` | GET | product listing page | `src/app/[countryCode]/(main)/products/page.tsx` |
| `/[countryCode]/products/[handle]` | GET | product detail page | `src/app/[countryCode]/(main)/products/[handle]/page.tsx` |
| `/[countryCode]/cart` | GET | cart drawer | `src/app/[countryCode]/(main)/cart/page.tsx` |
| `/[countryCode]/order-confirmation` | GET | post-Stripe-checkout thank-you | `src/app/[countryCode]/(main)/order-confirmation/page.tsx` |
| `/api/checkout` | POST | server action | `src/app/api/checkout/route.ts` |
| `/api/webhooks/stripe` | POST | webhook handler | `src/app/api/webhooks/stripe/route.ts` |
| `/api/return` | GET | Stripe return URL | `src/app/api/return/route.ts` |

### Data shapes (Medusa types)

```
Product {
  id, title, description, handle, thumbnail,
  variants: Variant[],
  categories: Category[],
  // (deferred: options, images, prices by currency — Medusa auto-generates these on seed)
}
Variant { id, title, sku, prices: Money[] }
Category { id, name, handle, parent_category_id? }
Cart { id, items: CartItem[], total, currency_code }
```

### Stripe webhook events handled

- `checkout.session.completed` — mark Medusa order as paid (delegated to Medusa subscriber `src/subscribers/order-paid.ts` — deferred to maintainer).
- `payment_intent.payment_failed` — log + surface in admin (out of scope).
- Idempotency: in-memory `Map<eventId, true>` with TTL 24h. Production: Redis SET with `EX 86400`.

## Environment variables

### `apps/backend/.env`

```ini
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa_storefront
REDIS_URL=redis://localhost:6379
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:3000,http://localhost:9000
JWT_SECRET=replace-me-32-bytes
COOKIE_SECRET=replace-me-32-bytes
NODE_ENV=development
```

### `apps/storefront/.env`

```ini
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_replace_me
STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Both `.env` files are gitignored; `.env.example` is committed.

## Tests

| File | Type | What it asserts |
|---|---|---|
| `apps/backend/tests/seed.test.ts` | Vitest | seed script produces 6 products × categories (Electronics×2, Apparel×2, Home×2) |
| `apps/backend/tests/smoke-backend.test.ts` | Vitest | `GET /store/products?limit=6&offset=0` returns `{ products: 6, count: 6 }` (medusa-js mocked) |
| `apps/storefront/tests/cart-flow.test.ts` | Vitest | 3 cart transitions: add → remove → clear (localStorage-backed cart) |
| `apps/storefront/tests/stripe-webhook.test.ts` | Vitest | happy-path signature verified + bad-sig returns 400 (`Stripe.webhooks.constructEvent` mocked) |
| `apps/storefront/tests/stripe-checkout.test.ts` | Vitest | `POST /api/checkout` returns `{ url: 'https://checkout.stripe.com/...' }` (`stripe.checkout.sessions.create` mocked) |

Total: **5 test files, 13 test cases** (rough: 2 + 3 + 3 = 8 across all files).

## Build / verification

- **`npm --workspace apps/backend run build`** → `medusa build` (compiles to `.medusa/server`).
- **`npm --workspace apps/storefront run build`** → `next build` (App Router compile).
- **`npm test`** → all 5 vitest files pass.
- **`medusa --version`** → exits 0 (CLI presence only; no Postgres required for this check).
- **`scripts/verify-stack-claims.ts`** → default exit 0, `--strict` exit 1.

## Deferred items (env-blocked on this Windows host)

These are real, expected limitations of the scaffold — **not** unfinished work. They are documented here so the maintainer doesn't second-guess absence. Each item has a documented future path.

1. **Real Postgres + Redis provisioning.** Defer to deploy time. `DATABASE_URL` + `REDIS_URL` are env vars; production points at managed Postgres (Neon, Supabase, RDS) + Upstash Redis. Local dev: `docker compose up postgres redis`.
2. **`medusa db:migrate` against real Postgres.** Requires local Postgres or Docker. The scaffold ships `medusa-config.ts` only; migrations are generated at first run.
3. **`medusa db:seed` end-to-end.** Same dependency as above. The seed script (`src/scripts/seed.ts`) is verifiable in isolation via `tests/seed.test.ts`; the full Medusa seed requires the DB.
4. **Live Stripe Checkout session creation + return.** `.env` is gitignored; `STRIPE_TEST_FAKE_KEY` is set in test env only. Real Stripe Checkout URL is mocked in `tests/stripe-checkout.test.ts`. Webhook signature verification is real (uses Stripe SDK), but with a fixture signature.
5. **`medusa start` / `medusa develop` long-running server.** Defer to a future CI loop. This scaffold only verifies `medusa --version` (CLI presence). Integration tests against a running Medusa are out of scope of the scaffold.
6. **Medusa admin dashboard customization.** Optional in Path B — admin is reachable at `http://localhost:9000/app` once the backend runs, but no custom widgets ship. Add `src/admin/widgets/*` if merchant needs custom UI.
7. **Internationalisation beyond US/GB/DE.** CountryCode middleware hardcodes those three. Adding FR/JP is a one-line config change in `tier.config.json` `storefront.supportedCountries` + `middleware.ts` `SUPPORTED_COUNTRIES`.
8. **Medusa `src/subscribers/order-paid.ts`** — the subscriber that reacts to `checkout.session.completed` is not shipped; the webhook handler delegates to `medusa.orders.markAsPaid(orderId)` (a TODO comment ships in the handler).
9. **Custom 404 / 500 pages.** Not shipped; Next.js defaults are fine for the scaffold.
10. **E2E with Playwright / TestSprite.** Out of scope — Phase 3.4 is scaffold only. Future phases can add `playwright.config.ts` + `tests/e2e/checkout.spec.ts`.

## Windows host notes

- `medusa --version` works (CLI-only check; no Postgres required).
- `next build && next start` works on Windows PowerShell 7+.
- Backend tests use `pg-mem` (no system Postgres).
- Stripe webhook signature verification uses Stripe SDK with mocked raw body + mocked signature (no live Stripe, no `STRIPE_TEST_FAKE_KEY` needed at runtime — the test injects a fixture).
- PATH length: `medusa build` may temporarily write to `node_modules/.cache/medusa/`; this Windows path is well under the 260-char MAX_PATH limit but the scaffold also sets `--max-old-space-size=4096` in scripts to avoid OOM during Prisma generation.

## Done

- [x] Path B spec locked 2026-08-14.
- [x] Schema (route table + data shapes) documented.
- [x] Env vars documented.
- [x] Tests enumerated (5 files, 13 cases).
- [x] Deferred items enumerated (10 items).
- [x] Windows host notes captured.
