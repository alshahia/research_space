---
name: tier2-saas-bundle
description: Tier 2 SaaS bundle template. Vite + React 19 + React Router 7 (Declarative mode) + Express 4 + Clerk React + Stripe Billing + Resend. Single Node process serves SPA + API. Adds auth, billing-portal, and webhook signature verification on top of tier1-standard. Cite selection-rule step 5 (auth + billing / SaaS / MRR) when picking this template.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch
triggers: tier2, saas, auth, billing, stripe, checkout, portal, mrr, subscription, clerk, react router, express
version: 1.0.0
selection-rule: [5]
---

## Purpose

The heaviest tier2 surface: tier1 base + auth (Clerk React) + billing (Stripe Checkout + customer portal + webhook signature verification) + transactional email (Resend). Use when the build is a paid SaaS product with authenticated users + subscriptions + revenue events.

## When to use

Pick `tier2-saas-bundle` when the build needs **authentication + subscription billing + webhook-driven state changes**. For just auth (no billing), use `tier1-standard` and add Clerk. For just commerce (one-off cart + checkout, no recurring billing), use `tier2-storefront`.

## What is checked into the spine (the ~33 files)

### Skeleton (27 files)

1. `package.json` — Vite + React 19 + TS strict + Tailwind v4 + Vitest + React Router 7 + Express 4 + Clerk + Stripe + Resend + tsx + concurrently.
2. `vite.config.ts` — Vite + react plugin + `@tailwindcss/vite` + `@/*` alias + `/api` proxy.
3. `tsconfig.json` — strict TS + Node 22 target + `@/*` path alias.
4. `vitest.config.ts` — jsdom env + react plugin + alias.
5. `index.html` — Vite root; mounts `<div id="root">`.
6. `server.ts` — Express 4 single-process server. Webhook route (raw body, no auth) → JSON parser + Clerk middleware → `/api/checkout` + `/api/portal` (both `requireAuth()`). SPA fallback for `*`.
7. `src/main.tsx` — React 19 entry; `<ClerkProvider>` + `<RouterProvider>`.
8. `src/router.tsx` — `createBrowserRouter` with `/`, `/pricing`, `/sign-in`, `/sign-up`, `/dashboard` (protected).
9. `src/App.tsx` — layout shell (NavBar + `<Outlet>` + footer).
10. `src/index.css` — Tailwind v4 `@theme` block.
11. `src/lib/utils.ts` — `cn()` helper.
12. `src/lib/auth.ts` — Clerk seam (re-exports + documentation; actual usage is inside components).
13. `src/lib/stripe-server.ts` — `getStripe()` lazy singleton + `verifyWebhook(rawBody, sig)` + `createCheckoutSession()` + `createPortalSession()`.
14. `src/lib/email.ts` — Resend client + `sendBillingFailedEmail()`.
15. `src/db/schema/subscriptions.ts` — typed schema placeholder + in-memory `Set<string>` for processed Stripe event IDs (scaffold-time idempotency stand-in; production = Postgres UNIQUE INDEX).
16. `src/routes/sign-in.tsx` — Clerk `<SignIn />` component.
17. `src/routes/sign-up.tsx` — Clerk `<SignUp />` component.
18. `src/routes/pricing.tsx` — public marketing page using `<PricingTable />`.
19. `src/routes/dashboard.tsx` — protected; shows `<PlanBadge />` + "Manage billing" button.
20. `src/components/NavBar.tsx` — top nav with `<SignedIn>` / `<SignedOut>` + `<UserButton>`.
21. `src/components/PricingTable.tsx` — 3 plan cards; Subscribe POSTs to `/api/checkout`.
22. `src/components/PlanBadge.tsx` — small pill for the current plan.
23. `src/components/ProtectedRoute.tsx` — `<SignedIn>` + `<RedirectToSignIn />` pattern.
24. `tests/smoke.test.ts` — Vite SPA renders `<App />` + pricing table + 3 plan names.
25. `tests/webhook.test.ts` — Stripe sig verification (happy + bad-sig) + idempotency.
26. `tests/portal.test.ts` — `/api/portal` returns portal URL (mocked Stripe).
27. `.env.example` — Stripe + Clerk + Resend + PORT + VITE_PORT + VITE_API_BASE_URL.
28. `.gitignore` — node_modules, dist, .env.
29. `tier.config.json` — `{ templateId: "tier2-saas-bundle", tier: 2, kind: 5, defaults: { auth: "clerk-react", paymentProvider: "stripe", emailProvider: "resend", ssr: false, reactRouterMode: "declarative", server: "express" }, featureFlags: { signIn, signUp, pricing, checkout, customerPortal, webhookVerification, idempotencyTable: false, postgres: false } }`.
30. `SPEC.md` — Express + Vite dev workflow; idempotency table caveat; deploy notes (single Node process serves SPA + API); React Router 7.18.x pinned (npm `react-router-dom` is on the 7.x track; the umbrella `react-router` package hit 8.3.0 per user's "Main active stable branch" reference).

### Meta files (~6 files)

31. `SKILL.md` (this file)
32. `memory/01-clerk-react.md` — Clerk React patterns (provider, hooks, redirects)
33. `memory/02-stripe-billing.md` — Stripe webhook sig verification + idempotency + customer portal
34. `memory/03-resend.md` — Resend Node SDK + templated transactional email
35. `memory/04-deployment.md` — single-Node-process deploy notes; Postgres webhook event log replaces in-memory Set
36. `prompts/intake-saas-bundle.md` — intake axes (auth vendor, payment tiers, support email)
37. `decisions/decision-log.md` — Vite + React Router 7 pivot note + 3.4 primitives-not-shared note
38. `README.md` — quick dev/test/deploy cheatsheet

## Stack pins (verified 2026-08-14)

**Inherited from tier1-standard (verified 2026-08-14, see `02_STACK_MATRIX.md`):**
- `react ^19.2.8`
- `react-dom ^19.2.8`
- `tailwindcss ^4.3.3` [S3]
- `typescript ^5.9.3` (chub + npm agree on `5.9.3`; npm `latest` = `7.0.2` — drift accepted via register)
- `vite ^8.2.1` [S14] (chub `vite/vite` returns the dossier-flagged HALLUCINATED `7.8.0`; npm `8.2.1` is correct)
- `vitest ^4.1.10`
- `@vitejs/plugin-react ^6.0.5`
- `clsx ^2.1.1` / `tailwind-merge ^3.6.0`

**Added by tier2-saas-bundle:**
- `react-router-dom ^7.18.2` — npm `react-router-dom` is on the 7.x track; the umbrella `react-router` is 8.3.0 but `react-router-dom` is the legacy-import path that existing code uses.
- `@clerk/clerk-react ^5.61.3` — chub `clerk/auth` returns `7.4.2` (different package; the React v5 package name changed from `@clerk/react` to `@clerk/clerk-react` in v5 — verified via `clerk/auth`).
- `@clerk/express ^2.1.56` — server middleware.
- `stripe ^22.5.0` — chub `stripe/api` returns `22.2.0` (chub lags by patch).
- `@stripe/stripe-js ^9.13.0` — Stripe.js loader (loaded by `<PricingTable>` only when SPA-side checkout is needed).
- `resend ^6.20.0` — chub `resend/email` returns `6.12.4` (lags by patch).
- `express ^4.22.2` — Express 4 LTS line (the npm `latest` is Express 5 but per Phase 2 Gate E directive: "Express 4").
- `cors ^2.8.6` — required for CORS preflights in dev.
- `dotenv ^17.4.2` — `.env` loader in `server.ts`.
- `tsx ^4.23.12` — runs `server.ts` directly.
- `concurrently ^10.0.4` — dev script fan-out.
- `@types/express ^5.0.6` + `@types/cors ^2.8.19` — TypeScript types.

**Dropped relative to the pre-pivot Next.js plan:**
- `next`, `@clerk/nextjs`, `next.config.mjs` — replaced by Vite + Express + Clerk React.

## Standing rules (apply to every Tier 2 SaaS build)

1. **`SPEC.md` before code.** Write the restate-and-confirm artifact first. User replies "go" or "change X to Y".
2. **`tier.config.json` for app-level config only.** `defaults.auth`, `defaults.paymentProvider`, `defaults.emailProvider`, `defaults.ssr`, `featureFlags.*`. Not framework config.
3. **`cn()` from `src/lib/utils.ts` is the only classname helper.** No inline `clsx(...)` joins in components.
4. **Webhook route is mounted BEFORE `express.json()` + `clerkMiddleware()`.** Stripe HMAC verification needs the raw body bytes; any parser ahead of it would mangle them.
5. **Idempotency on Stripe `event.id`.** Use `wasStripeEventProcessed()` / `markStripeEventProcessed()` from `src/db/schema/subscriptions.ts`. Production replaces the in-memory `Set` with a Postgres UNIQUE INDEX.
6. **Server-side RBAC at `/api/*` via Clerk `requireAuth()`.** The protected routes (`/api/checkout`, `/api/portal`) MUST require a Clerk session in `server.ts`. Client-only checks (`<SignedIn>`) are UX, not security.
7. **`.env` keys never reach the browser except `VITE_*`-prefixed vars.** `CLERK_SECRET_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` are server-only. `VITE_CLERK_PUBLISHABLE_KEY` is the only Clerk key the SPA sees.
8. **`concurrently` for dev with two processes.** Single `npm run dev` script fans out Vite (5173) + Express (3000). Vite proxies `/api/*` → Express.
9. **Production: single Node process serves SPA + API.** `npm run build` then `npm start` boots `server.ts`, which serves `dist/index.html` for `*` (SPA fallback).

## Done (Tier 2 SaaS bundle definition-of-done per Phase 3.5 spec)

The build is done when **all** of these exit zero on a fresh clone:

```bash
cd templates/tier2-saas-bundle/skeleton
npm install
npx tsc --noEmit
npm run build
npm test                                          # vitest run; webhook + portal + smoke all pass
node ../../scripts/verify-stack-claims.ts          # workspace root drift gate
```

Plus the env-deferred items (post `npm run build`):
- `tsx server.ts` boots; `curl http://localhost:3000/` returns the Vite-built `dist/index.html`.
- `curl -X POST http://localhost:3000/api/checkout -H 'content-type: application/json' -d '{"priceId":"price_pro"}'` returns a 401 (no Clerk session) or a 200 + checkout URL with a real `CLERK_SECRET_KEY`. Skeleton treats this as env-deferred.

## Failure handling

If any of the above exits non-zero:

1. Re-read the failing command's output.
2. Identify the smallest change that addresses the failure.
3. Apply via `edit` (no rewrites).
4. Re-run the failing command.
5. Cap at 3 retries per command; after that, stop and report partial state to master with the verbatim error.

## Out of scope for this template

- One-off cart / checkout (no recurring billing) → `tier2-storefront`
- AI SDK / streaming chat → `tier2-ai-chat`
- Mobile shell (Expo / Capacitor) → `tier2-mobile`
- Static landing pages → `cinematic-landing`
- ~150-line brochure sites → `tier0-minimal`
- Multi-page CRUD without auth → `tier1-standard`

## Pointers

- `memory/01-clerk-react.md` — Clerk provider + hooks + redirects.
- `memory/02-stripe-billing.md` — webhook sig verification + idempotency + customer portal.
- `memory/03-resend.md` — Resend Node SDK + templated transactional email.
- `memory/04-deployment.md` — single-Node-process deploy notes.
- `prompts/intake-saas-bundle.md` — intake axes.
- `decisions/decision-log.md` — append-only; record every build-time decision.
- `02_STACK_MATRIX.md` (READ-ONLY) — canonical version pins + audit trail.
- `agents_manager/coder/SKILL.md` § Context-hub — chub rule for new deps.
- `templates/AGENTS.md` — family root + 13-step selection rule.

## Versioning

This `SKILL.md` follows the Anthropic Skills Level 1 / Level 2 / Level 3 split:
- **Level 1** — frontmatter (always loaded).
- **Level 2** — this body (loaded when the template is picked).
- **Level 3** — `memory/` files (loaded only when the agent decides to read them).

Bumping this template = PR to `SKILL.md` + `package.json` + `tier.config.json` + `CHANGELOG.md` (template root or workspace).
