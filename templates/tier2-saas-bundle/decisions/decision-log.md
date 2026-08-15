# Decision Log — tier2-saas-bundle

Append-only. Each entry tagged with phase + agent + date + rationale + effect.

---

## D-001 — Phase 2 Gate E spine pivot: Vite + React Router 7 + Express (2026-08-14)

**Phase:** Phase 2 Gate E (locked 2026-08-14 by user reply).

**Decision:** Vite + React Router 7 (Declarative mode) + Express 4 + Clerk React. Replaces the original Phase 3.5 plan which specified Next.js 15 + `@clerk/nextjs`.

**Trigger:** Master surfaced the Next.js 15.5 + React 19 + Windows `next build` env-block from Phase 3.4 (React #31 on `/404` static prerender). For Phase 3.5 to keep the same Vite spine canonical status without inheriting the React #31 risk, Vite + React Router + Express is the lighter alternative.

**User reply (verbatim):** "Vite + react-router (Core / Full-Stack)8.3.0 Main active stable branch. Requires Node 22+ and React 19+"

**Net effect on this template:**
- Spine: Vite 8 + React 19 + TS strict + Tailwind v4 + Vitest (matches tier1-standard + tier2-ai-chat + tier2-mobile).
- Routing: React Router 7 Declarative mode (`createBrowserRouter`). No SSR.
- Server: Express 4 single Node process; serves SPA + 3 API routes.
- Auth: `@clerk/clerk-react ^5.61.3` (client) + `@clerk/express ^2.1.56` (server middleware). NO `@clerk/nextjs`.
- No `next.config.mjs`. No `src/app/` directory.

**Files rewritten relative to the pre-pivot plan:**
- Removed: `src/app/api/{webhooks/stripe,checkout,portal}/route.ts`, `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`, `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`, `src/app/(marketing)/pricing/page.tsx`.
- Added: `index.html`, `vite.config.ts`, `server.ts` (Express), `src/router.tsx`, `src/routes/{sign-in,sign-up,pricing,dashboard}.tsx`, `src/components/{PricingTable,PlanBadge,NavBar,ProtectedRoute}.tsx`, `src/lib/stripe-server.ts`, `src/lib/email.ts`.
- Renamed: `src/lib/auth.ts` switched from Clerk-Next helpers to Clerk-React helpers.

**Reversibility:** ~3h of work. Drop `server.ts`, add `next.config.mjs`, swap `react-router-dom` → `next/app-router` conventions, swap `@clerk/clerk-react` → `@clerk/nextjs`. Plan stays validated against the original Next.js lock.

---

## D-002 — 3.4 storefront primitives-not-shared (2026-08-14)

**Context:** Phase 2 P2G-A re-gate locked `tier2-storefront` at Path B (Medusa 2 + Next.js 15 + Postgres + Stripe). Phase 3.4 shipped that.

**Decision:** 3.5 CONCEPTUALLY reuses the Stripe webhook + checkout patterns from 3.4 BUT DOES NOT CODE-SHARE.

**Why not code-share:** 3.4 storefront's `src/app/api/checkout/route.ts` and `src/app/api/webhooks/stripe/route.ts` are Next.js Route Handlers + a `@medusajs/js-sdk` customer fetch. 3.5 SaaS's `server.ts` is Express + Clerk + (placeholder for) Drizzle. Different runtimes, different auth surfaces, different data layer. Code-sharing across the two would force a parallel "hosted API" abstraction that neither stack needs.

**What 3.5 DOES reuse (the pattern, not the code):**
- `stripe.webhooks.constructEvent(rawBody, sigHeader, secret)` signature-verification shape — covered in `memory/02-stripe-billing.md`.
- The `mode: "subscription"` + `customer_email` + `success_url` / `cancel_url` Checkout shape — covered in `memory/02-stripe-billing.md`.
- The state machine (`NONE → TRIALING → ACTIVE → PAST_DUE → CANCELED`) driven by webhook events — covered in `memory/02-stripe-billing.md`.
- Customer portal `stripe.billingPortal.sessions.create({ customer, return_url })` — covered in `memory/02-stripe-billing.md`.

**Build-order effect:** 3.4 SHOULD ship before 3.5 (so 3.5 can reference patterns via this log + the memory docs), but 3.5 doesn't BLOCK on 3.4 — both templates are independent. The "MUST" in the original plan softened to "SHOULD".

---

## D-003 — Q5 verification gate state (2026-08-14)

**State after this dispatch:**
- `verify-stack-claims.ts` (default) — exit 0. No new drift rows.
- `verify-stack-claims.ts --strict` — exit 1.
- 2 pre-existing drifts still on the register: `typescript ^5.9.3 → 7.0.2` and `@anthropic-ai/sdk ^0.116.0 → 0.117.1`.

**New version pins (added by this template):**
- `react-router-dom ^7.18.2` — npm latest in the 7.x track.
- `@clerk/clerk-react ^5.61.3` — chub `clerk/auth` returns `7.4.2` for the umbrella Clerk JS meta-doc; npm `@clerk/clerk-react` (the v5 React package) is at `5.61.3`.
- `@clerk/express ^2.1.56` — server middleware.
- `stripe ^22.5.0` — chub `stripe/api` lags at `22.2.0`.
- `@stripe/stripe-js ^9.13.0`.
- `resend ^6.20.0` — chub `resend/email` lags at `6.12.4`.
- `express ^4.22.2` — Express 4 LTS line; npm `latest` is Express 5 but Phase 2 Gate E directive pins to 4.
- `cors ^2.8.6`, `dotenv ^17.4.2`, `tsx ^4.23.12`, `concurrently ^10.0.4`.
- `@types/express ^5.0.6`, `@types/cors ^2.8.19`.

**chub gaps surfaced:**
- `react-router` / `react-router-dom` — no chub doc.
- `@clerk/clerk-react` — chub `clerk/auth` covers the umbrella but names `@clerk/react` (the v4 name). npm is canonical for the v5 package name.
- `@clerk/express` — no dedicated chub doc; same `clerk/auth` umbrella covers it.
- `stripe-webhook` — chub `stripe/api` covers the umbrella; no webhook-specific doc.
- `resend` — chub `resend/email` covers `^6.12.4` (lags npm `^6.20.0` by patch).
- `express` — chub `express/express` covers Express 5; no Express 4 doc.

Fallback used everywhere: `npm view <pkg> version` + the official docs at `https://clerk.com/docs` and `https://stripe.com/docs` (both verified accessible 2026-08-14).

---

## D-004 — React Router 7 pin note: react-router-dom vs react-router (2026-08-14)

**Observation:** Phase 2 Gate E user reply referenced "8.3.0 Main active stable branch" — that's the umbrella `react-router` package version on npm. The legacy-import path `react-router-dom` is still on the 7.x line (`7.18.2` at 2026-08-14).

**Decision:** Pin `react-router-dom ^7.18.2`. The skeleton's import paths (`createBrowserRouter`, `RouterProvider`, `Link`, `Outlet`, `useUser`-style hooks) all use the `react-router-dom` namespace.

**Migration path to `react-router` v8 (out of scope for the spine):** swap imports from `react-router-dom` to `react-router`; rename `<Outlet />` etc. unchanged. Each component's import line changes; the Router shape does not.
