---
name: tier2-storefront
description: Tier 1 + commerce backend (Medusa 2 + Postgres) + Next.js 15 storefront + Stripe Checkout. Self-hosted, full data ownership. Use when a user asks for "online store", "e-commerce", "storefront", "shop", "Medusa", or wants to embed commerce into a generic app template. Path B override (drops Shopify/Hydrogen for Medusa + Next.js). Trigger words: "online store", "e-commerce", "storefront", "shop", "Medusa", "Next.js + commerce", "Path B storefront".
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch
triggers: online store, e-commerce, storefront, shop, Medusa, Next.js commerce, Path B storefront
selection-rule: [3]
version: 0.1.0
---

# Tier 2 — Storefront (Path B)

## Purpose
Tier 1 base app + a self-hosted commerce backend (Medusa 2 + Postgres + Redis) with a server-rendered storefront (Next.js 15 App Router, Server Components) and Stripe Checkout payments. All data lives in the customer's Postgres; no Shopify/Hydrogen lock-in. This is the only tier2-* template that **overrides the Vite spine** — the storefront is Next.js, not Vite + React Router 7.

## When to use

- A user wants to launch an online store with full data ownership.
- A user wants Stripe Checkout (redirect flow) instead of embedded payment iframes.
- A user wants multi-currency (US/GB/DE) from day one.
- Build order: **tier1-standard → tier2-ai-chat → tier2-mobile → tier2-storefront (here) → tier2-saas-bundle (LAST)**. Do not start tier2-storefront before tier1 completes.

## What ships

| Path | Commerce backend | Frontend | Payments | Lock-in |
|---|---|---|---|---|
| **A** (default, not here) | Shopify + Hydrogen | Remix | Shopify Checkout | Shopify data |
| **B (this template)** | Medusa 2 + Postgres + Redis | Next.js 15 App Router | Stripe Checkout + webhook sig | Self-hosted |

Monorepo: `apps/backend/` (Medusa 2) + `apps/storefront/` (Next.js 15) under root `package.json` with npm workspaces.

## Stack pins (verified 2026-08-14, see 02_STACK_MATRIX.md)

| Package | Pin | npm latest (2026-08-14) | Source |
|---|---|---|---|
| `@medusajs/medusa` | `^2.19.0` | 2.19.0 | matrix `^2.18.0` passes `^2.19.0` |
| `@medusajs/js-sdk` | `^2.19.0` | 2.19.0 | Medusa 2 client (note: not `@medusajs/medusa-js`, that is Medusa 1) |
| `next` | `^15.5.0` | 15.5.23 (latest 15.x) | **user-lock override** (matrix pins 16 for tier1; tier2-storefront uses 15 for App Router Server Components parity with 3.5) |
| `react` / `react-dom` | `^19.2.0` | 19.2.8 | matrix |
| `stripe` | `^22.5.0` | 22.5.0 | matrix |
| `zod` | `^4.4.0` | 4.4.3 | matrix |
| `tailwindcss` | `^4.3.0` | 4.3.3 | matrix |
| `vitest` | `^4.0.0` | 4.1.10 | matrix |
| `typescript` | `^5.9.0` | 5.9.3 (drift accepted) | pre-existing drift row |
| `@types/node` | `^26.2.0` | 26.2.0 | matrix |
| `@types/react` | `^19.2.0` | 19.2.18 | matrix |
| `clsx` | `^2.1.1` | 2.1.1 | tier1 spine |
| `jsdom` | `^30.0.0` | 30.0.x | tier1 spine |
| `pg-mem` | `^3.0.5` | (in-memory Postgres for tests) | not in matrix; backend-only dep |

**chub citations:** All `package.json` writes cite `chub get <id>` OR fall back to `npm view <pkg> version` (see coder summary §chub citations). No `medusa`, `next`, `react`, `stripe`, `@medusajs/medusa*`, `tailwindcss`, `zod`, `vitest` doc found in chub — fallback to `npm view` + official docs (https://docs.medusajs.com/, https://nextjs.org/docs, https://stripe.com/docs).

## Standing rules

1. **One-template-only override.** Do NOT refactor tier1/tier2-ai-chat/tier2-mobile to Next.js — they stay Vite. The override lives here.
2. **No OpenCode on this template.** Path B = Medusa + Next.js + Stripe. `@opencode-ai/sdk` only appears in tier2-ai-chat.
3. **Backend tests use `pg-mem`.** No real Postgres on Windows. Medusa 2's TypeScript types are checked via `tsc --noEmit`; HTTP routes use Vitest with mocked `medusa-js`.
4. **No live Stripe calls.** Webhook signature verification uses Stripe SDK's `Stripe.webhooks.constructEvent` with a mocked raw body + mocked signature (no network). `STRIPE_SECRET_KEY` is documented but `.env` is gitignored.
5. **CountryCode is mandatory in URLs.** US/GB/DE. Middleware redirects unknown countries to `/us`.
6. **Cart state stays client-side** until checkout. server actions submit to Medusa + Stripe at checkout time only.
7. **Server Components default.** Pages are `.tsx` server components by default; client islands (`'use client'`) only where state requires.
8. **Idempotency:** Stripe webhook handler deduplicates on `event.id` (in-memory map + TTL; production notes in memory/03-stripe-billing.md).
9. **Strict TS:** `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes` enabled.

## Files in scope (47 files)

- Root: `package.json`, `tier.config.json`, `SKILL.md`, `SPEC.md`, `PATHS.md`, `README.md`, `memory/{01-medusa,02-nextjs-storefront,03-stripe-billing,04-deployment}.md`, `prompts/intake-storefront.md`, `decisions/decision-log.md`
- `apps/backend/`: `package.json`, `medusa-config.ts`, `.env.example`, `tsconfig.json`, `src/api/middlewares.ts`, `src/api/store/products/route.ts`, `src/scripts/seed.ts`, `src/links/product-category.ts`, `medusa-db/migrations/0001_init/auto-generated.sql`, `data/product-seed.json`, `tests/{seed,smoke-backend}.test.ts`, `README.md`
- `apps/storefront/`: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, 5 page files, `layout.tsx`, 3 API routes, 4 lib files, 7 components, `src/styles/globals.css`, `src/middleware.ts`, `src/types/optional-modules.d.ts`, 3 test files, `.env.example`, `README.md`

## Deferred items

These are env-blocked on this Windows host. Track them; do not silently drop them.

1. **Real Postgres + Redis provisioning.** Defer to deploy time. Backend tests use `pg-mem` in-memory Postgres.
2. **`medusa db:migrate` against real Postgres.** Requires local Postgres or Docker. Document in `apps/backend/SPEC.md`.
3. **`medusa db:seed` end-to-end.** Same dependency as above; the seed script (`src/scripts/seed.ts`) is test-able in isolation; full Medusa seed requires the DB.
4. **Live Stripe Checkout session creation + return.** `.env` is gitignored; only `STRIPE_TEST_FAKE_KEY` is set in tests. Real Stripe Checkout URL is mocked in `tests/stripe-checkout.test.ts`.
5. **`medusa start` / `medusa develop` long-running server.** Defer to a future CI loop; this scaffold only verifies `medusa --version` (CLI presence).
6. **Medusa admin dashboard (`apps/backend/src/admin`).** Optional in Path B — admin is reachable at `http://localhost:9000/app` once the backend runs, but no custom admin routes ship in this scaffold.
7. **Internationalisation beyond US/GB/DE.** CountryCode middleware hardcodes those three; adding FR/JP is a one-line config change in `tier.config.json` + `middleware.ts`.

## Verification (done-when — see coder summary)

- `tsc --noEmit` exit 0 in `apps/backend/` + `apps/storefront/`
- `npm test` exit 0 in both apps
- `npm run build` exit 0 in both apps (`medusa build`; `next build`)
- `medusa --version` exit 0
- `next build && next start` exit 0
- `GET /products` renders 6 product cards (unit test)
- `POST /api/checkout` returns Stripe Checkout URL (mocked)
- `verify-stack-claims.ts` default exit 0; `--strict` exit 1

## PATHS.md — Path A swap recipe

A future maintainer can swap to Path A (Shopify + Hydrogen + Shopify Checkout) by:
1. Deleting `apps/backend/` and `apps/storefront/`.
2. Cloning `templates/tier2-shopify/` (not yet built) into `apps/`.
3. Updating `tier.config.json` `storefront.path = "A"`, `commerce = "shopify-b2c-hosted"`, `paymentProvider = "shopify-checkout"`.
4. Removing `medusa-*` and `stripe` deps; adding `@shopify/hydrogen`, `@shopify/cli`, `@shopify/storefront-api-client`.
5. Keeping this template's `memory/`, `prompts/`, `decisions/`, `SPEC.md` structure — those are tier-shape, not provider-shape.

## Done

- [x] Schema locked 2026-08-14 (Tier 1 + Medusa 2 + Next.js 15 + Stripe).
- [x] `apps/backend/` (Medusa 2) scaffolded.
- [x] `apps/storefront/` (Next.js 15) scaffolded.
- [x] Monorepo workspaces wired.
- [x] 4 memory files + decisions log + PATHS.md.
- [x] Deferred items documented in `SPEC.md`.
