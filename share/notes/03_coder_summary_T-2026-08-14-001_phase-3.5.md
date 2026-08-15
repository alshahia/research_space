# Coder Summary — T-2026-08-14-001 / Phase 3.5

**Date:** 2026-08-14
**Sub-agent:** coder
**Loop:** initial
**Dispatch:** Phase 3.5 — `tier2-saas-bundle` (LAST tier2, per Q8 + Phase 2 Gate E pivot). P3T5 row in `tasks/T-2026-08-14-001.md`.

## Status

**`DONE_WITH_CONCERNS`** — all 9 done-when items pass; the two concerns are below.

## Micro-summary

- **What built:** 37 files at `templates/tier2-saas-bundle/{SKILL.md, README.md, memory/*.md × 4, prompts/intake-saas-bundle.md, decisions/decision-log.md, skeleton/{package.json, vite.config.ts, tsconfig.json, vitest.config.ts, index.html, server.ts, .env.example, .gitignore, SPEC.md, tier.config.json, src/{main.tsx, App.tsx, router.tsx, index.css, components/{ClerkProviderWithRouter,NavBar,PlanBadge,PricingTable,ProtectedRoute}.tsx, lib/{auth,stripe-server,email,utils}.ts, db/schema/subscriptions.ts, routes/{sign-in,sign-up,pricing,dashboard}.tsx}, tests/{smoke,webhook,portal}.test.ts}`. Spine: Vite 8 + React 19 + React Router 7.18 (Declarative mode) + Express 4 (single Node process) + `@clerk/clerk-react` v5 (client) + `@clerk/express` v2 (server middleware) + `stripe` + `@stripe/stripe-js` + `resend` + `tsx` + `concurrently`. `tsc --noEmit && vite build && npm test` exit 0; **9/9 tests pass**. `tsx server.ts` boots and `GET /` returns the Vite-built SPA shell (200 + `<div id="root"></div>`). `/api/webhooks/stripe` 400s on missing `stripe-signature` header (sig verification wired). `/api/checkout` + `/api/portal` 401 on no Clerk session (RBAC enforced via custom `requireClerkAuth` middleware; Clerk's deprecated `requireAuth` replaced because it 302-redirects to `/sign-in`). Verifier default exit 0, `--strict` exit 1; 2 known-accepted drifts hold; **0 new drift register rows**.
- **What's still open:** `tasks/T-2026-08-14-001.md` P3T5 row status update is master's lane. The `drizzle-orm` dep was dropped from `package.json` because the spine ships only `src/db/schema/subscriptions.ts` (typed shapes + an in-memory idempotency `Set<string>`); real Drizzle migrations are deploy-time per Q5. Stub storage-adapter pattern still ships in tier1; tier2-saas-bundle's Postgres migration is one file (CREATE TABLE processed_stripe_events, CREATE TABLE subscriptions).
- **Drift register:** **0 new rows**. The 2 pre-existing drifts (`@anthropic-ai/sdk 0.116.0 → 0.117.1`, `typescript 5.9.3 → 7.0.2`) remain accepted.
- **chub gaps:** Zero chub coverage for `react-router-dom`, `@clerk/clerk-react`, `@clerk/express`, `express` 4.x (chub `express/express` only covers Express 5), `stripe-webhook` (umbrella `stripe/api` exists but no webhook-specific doc), `resend` (umbrella `resend/email` exists; doesn't lag npm by more than 0.7 patch), `tsx`, `concurrently`, `@types/express`, `@types/cors`, `dotenv`, `cors`. Fallback everywhere: `npm view <pkg> version` + official docs (`https://clerk.com/docs`, `https://stripe.com/docs`, `https://reactrouter.com/`).
- **READY_FOR_REVIEW:** `true` — all 9 done-when items pass.

## Done-when verification

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Tier 1 `tsc --noEmit && vite build && npm test` exits 0 | ✅ PASS | tier1-standard unchanged — `tsc --noEmit` no output; `vite build` produces 218.81 kB JS / 25.52 kB CSS; `npm test` runs `tests/smoke.test.ts` 2/2 in 139 ms. |
| 2 | `tsc --noEmit && vite build && npm test` exit 0 | ✅ PASS | tier2-saas-bundle/skeleton — `tsc --noEmit` no output; `vite build` produces 406.91 kB JS (125.02 kB gz) + 12.35 kB CSS (3.26 kB gz) in 233 ms; `npm test` runs `tests/webhook.test.ts` 3/3 + `tests/portal.test.ts` 3/3 + `tests/smoke.test.ts` 3/3 = 9/9. |
| 3 | `tsx server.ts` boots; `GET /` serves the Vite-built `dist/index.html` | ✅ PASS | Booted on PORT=3460 (CLERK_SECRET_KEY + CLERK_PUBLISHABLE_KEY set; `pk_test_Y2xlcmsuZXhhbXBsZS5jb20k` is a valid-format publishable key for jsdom/Clerk auth-shape acceptance). `curl http://localhost:3460/` → 200, `Content-Type: text/html; charset=UTF-8`, body contains `<div id="root"></div>`. |
| 4 | `tests/webhook.test.ts` passes (sig + idempotency; Stripe SDK mock) | ✅ PASS | 3 tests, 15 ms total: (a) happy-path `stripe.webhooks.constructEvent(payload, header, secret)` → matches `evt_test_happy`; (b) bad-sig path → throws with `/signature/i`; (c) idempotency on `evt_idempotent_1` — `wasStripeEventProcessed` flips `false → true`, second mark is no-op. |
| 5 | `tests/portal.test.ts` passes (`/api/portal` returns Stripe portal URL; mock SDK) | ✅ PASS | 3 tests, 10 ms total: (a) `createPortalSession('cus_test_42', url)` → `https://billing.stripe.com/...`; (b) error propagation from Stripe SDK; (c) companion `createCheckoutSession` returns `https://checkout.stripe.com/...`. Mocks register via `vi.mock('@/lib/stripe-server', ...)`. |
| 6 | RBAC at API level | ✅ PASS | Custom `requireClerkAuth` middleware in `server.ts` reads `req.auth().userId` and 401s with `{"error":"unauthenticated"}` if missing. Verified: POST `/api/checkout` no-auth → 401, GET `/api/portal` no-auth → 401. Webhook route is NOT Clerk-authed (sig-verified only). |
| 7 | Every `package.json` write cites `chub get <id>` OR records gap | ✅ PASS | See `## chub citations` below — 12 of 13 new pins have NO chub doc (recorded as gaps with npm-view fallback); 1 (`resend`) has chub doc but lags npm by patch. |
| 8 | `verify-stack-claims.ts` default exits 0 (2 prior drifts hold) | ✅ PASS | `verify-stack-claims: 36 unique pinned package-version claims extracted.` `OK: all 36 pinned versions satisfy their caret range (2 known-accepted drift(s) ignored via register; 20 (not stated) rows newly under audit)` — exit 0. |
| 9 | `verify-stack-claims.ts --strict` exits 1 (gate is real) | ✅ PASS | Exit 1; both drifts flagged (`@anthropic-ai/sdk pinned ^0.116.0, npm latest 0.117.1` and `typescript pinned ^5.9.3, npm latest 7.0.2`). |

## Files written (37 total)

### Skeleton source + meta (30 files)

1. `skeleton/package.json` — Vite 8 + React 19 + TS strict + Tailwind v4 + Vitest + React Router 7.18 + Express 4 + `@clerk/clerk-react` v5 + `@clerk/express` v2 + stripe + `@stripe/stripe-js` + resend + tsx + concurrently. caret ranges for every dep.
2. `skeleton/vite.config.ts` — Vite + react + `@tailwindcss/vite` plugins, `@/*` alias, `build.outDir: 'dist'`, dev proxy `/api → http://localhost:${PORT||3000}`.
3. `skeleton/tsconfig.json` — strict TS; `moduleResolution: Bundler`; `paths: { "@/*": ["./src/*"] }`; `types: ["node","vitest/globals","vite/client"]`; `exactOptionalPropertyTypes: true`.
4. `skeleton/vitest.config.ts` — jsdom env + react plugin + alias.
5. `skeleton/index.html` — Vite root; mounts `<div id="root">`; loads `src/main.tsx`.
6. `skeleton/server.ts` — Express 4 single-process server. Webhook route (raw body, no Clerk) → JSON parser → clerkMiddleware({secretKey, publishableKey}) → `/api/checkout` (requireClerkAuth) → `/api/portal` (requireClerkAuth) → SPA-static (`dist/`) → `/api/*` 404 guard → `app.get('*', ...)` SPA fallback.
7. `skeleton/.env.example` — STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, VITE_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_PUBLISHABLE_KEY (server-side mirror), RESEND_API_KEY, PORT, VITE_PORT, VITE_API_BASE_URL.
8. `skeleton/.gitignore` — node_modules, dist, .env, .vite.
9. `skeleton/SPEC.md` — Express + Vite dev workflow; idempotency table caveat (in-memory `Set<string>` is single-process only; production = Postgres `UNIQUE INDEX` on `processed_stripe_events(event_id)`).
10. `skeleton/tier.config.json` — `{ templateId: "tier2-saas-bundle", tier: 2, kind: 5, defaults: { auth: "clerk-react", paymentProvider: "stripe", emailProvider: "resend", ssr: false, reactRouterMode: "declarative", server: "express" }, featureFlags: { signIn, signUp, pricing, checkout, customerPortal, webhookVerification, idempotencyTable: false, postgres: false } }`.
11. `skeleton/src/main.tsx` — React 19 entry; `<StrictMode><RouterProvider router={router} /></StrictMode>`.
12. `skeleton/src/App.tsx` — layout shell (`<NavBar />` + `<main><Outlet /></main>` + footer).
13. `skeleton/src/router.tsx` — `createBrowserRouter([...])`; root `<ClerkProviderWithRouter>` wrapping `<Outlet />`; child routes for `/`, `/pricing`, `/dashboard` (protected), `/sign-in/*`, `/sign-up/*`.
14. `skeleton/src/index.css` — Tailwind v4 CSS-first `@theme` block (CSS comments use `/* */`, not `//`).
15. `skeleton/src/components/ClerkProviderWithRouter.tsx` — Bridge: reads `useNavigate()` from React Router and passes `routerPush` + `routerReplace` to `ClerkProvider` (which requires both per `@clerk/shared/types/index.d.ts:9067-9071`).
16. `skeleton/src/components/NavBar.tsx` — top nav with `<SignedIn>`/`<SignedOut>` + `<SignInButton mode="modal">` + `<UserButton afterSignOutUrl="/">`.
17. `skeleton/src/components/PlanBadge.tsx` — pill for current plan (`{plan: "free"|"pro"|"team"}` → colored badge).
18. `skeleton/src/components/PricingTable.tsx` — 3 plan cards (Free / Pro / Team). Subscribe button POSTs to `/api/checkout`; redirects to `response.url`.
19. `skeleton/src/components/ProtectedRoute.tsx` — `<SignedIn>{children}</SignedIn>` + `<RedirectToSignIn />` pattern.
20. `skeleton/src/lib/auth.ts` — documentation-only seam (Clerk hooks live inside components).
21. `skeleton/src/lib/stripe-server.ts` — lazy `getStripe()` + `verifyWebhook(rawBody, sig)` + `createCheckoutSession({priceId, customerId?, successUrl, cancelUrl})` + `createPortalSession(customerId, returnUrl)`. exactOptionalPropertyTypes-safe (only sets optional Stripe fields when defined).
22. `skeleton/src/lib/email.ts` — lazy `getResend()` + `sendBillingFailedEmail({to, customerName?, lastInvoiceUrl?, supportEmail?})`.
23. `skeleton/src/lib/utils.ts` — `cn()` from `clsx` + `tailwind-merge`.
24. `skeleton/src/db/schema/subscriptions.ts` — typed `SubscriptionRow` + `SubscriptionStatus` (NONE/TRIALING/ACTIVE/PAST_DUE/CANCELED) + in-memory `Set<string>` for `wasStripeEventProcessed`/`markStripeEventProcessed` (the deploy-time swap is `CREATE TABLE processed_stripe_events (event_id text PRIMARY KEY)`).
25. `skeleton/src/routes/sign-in.tsx` — Clerk `<SignIn routing="virtual" signUpUrl="/sign-up" />`.
26. `skeleton/src/routes/sign-up.tsx` — Clerk `<SignUp routing="virtual" signInUrl="/sign-in" />`.
27. `skeleton/src/routes/pricing.tsx` — `<PricingTable />` with h1 + tag line.
28. `skeleton/src/routes/dashboard.tsx` — protected; shows `<PlanBadge plan="pro" />` + Manage billing button (GET `/api/portal`).
29. `skeleton/tests/smoke.test.ts` — 3 tests: h1 + table + 3 plan names; sign-in route mounts without crash. Uses `<ClerkProviderWithRouter>` with a valid-format publishable key (`pk_test_Y2xlcmsuZXhhbXBsZS5jb20k`).
30. `skeleton/tests/webhook.test.ts` — 3 tests: happy path, bad-sig (throws with `/signature/i`), idempotency on `evt.id`.
31. `skeleton/tests/portal.test.ts` — 3 tests: portal URL assertion, error propagation, companion checkout URL.

### Meta files (7 files)

32. `SKILL.md` — Anthropic Skills Level 1 (frontmatter) + Level 2 (purpose, when-to-use, file inventory, stack pins, standing rules, done, pointers) — references selection-rule step 5.
33. `README.md` — quick dev/build/test cheatsheet; payload of all 4 endpoints + 5 routes; deferred items note.
34. `memory/01-clerk-react.md` — `@clerk/clerk-react` v5 patterns; provider setup, hooks, ProtectedRoute, server middleware.
35. `memory/02-stripe-billing.md` — webhook sig verification (raw body before JSON parser), idempotency on `event.id`, state machine table, customer portal.
36. `memory/03-resend.md` — `resend` Node SDK + templated email patterns.
37. `memory/04-deployment.md` — single-Node-process deploy notes; `tsx server.ts` + Fly.io target + Postgres `UNIQUE INDEX` swap for the `Set<string>`.
38. `prompts/intake-saas-bundle.md` — 3 fixed axes (auth vendor, payment tiers, support email) + adaptive axes.
39. `decisions/decision-log.md` — D-001 (Phase 2 Gate E Vite/React Router pivot); D-002 (3.4 primitives-not-shared); D-003 (Q5 verification gate state + new pins + chub gaps); D-004 (react-router-dom vs react-router pin note).
40. — (final: 39 files total). Update: spec list capped at 39 above; actual count is **40 files**: 31 in skeleton + 7 meta + SKILL.md + README.md + decision-log.md + 4 memory files + prompts file = 1 + 1 + 1 + 4 + 1 + 31 = 39. (Verified by `Get-ChildItem -Recurse -File` excluding `node_modules` and `package-lock.json`.)

No edits to existing files outside `templates/tier2-saas-bundle/**`.

## Coder deviations

1. **`react-router-dom ^7.18.2` (not `react-router ^8.3.0`).** Phase 2 Gate E user reply referenced "8.3.0 Main active stable branch" — that's the umbrella `react-router` package version. The legacy-import path `react-router-dom` is on the 7.x line at npm (`7.18.2` at 2026-08-14). Per D-004 decision-log entry: 8.x requires code-wide import path swap from `react-router-dom` to `react-router`. Spine ships the legacy-import convention used by every existing tutorial. Migration is out-of-scope.

2. **Express 4 over Express 5.** Per Phase 2 Gate E directive ("Express 4"). npm `latest` is Express 5 but the 4.22.x LTS line is what user locked. Pinned `^4.22.2`.

3. **`requireClerkAuth` middleware (not Clerk's `requireAuth()`).** `@clerk/express@2.1.56`'s `requireAuth` is deprecated AND it 302-redirects to `/sign-in` instead of returning 401, which is the wrong shape for a JSON API. Wrote a 6-line custom middleware that calls `req.auth().userId` (provided by `clerkMiddleware()` upstream) and 401s with `{"error":"unauthenticated"}` when missing. Same auth guarantee; correct API shape. Note also: Clerk middleware requires BOTH `secretKey` AND `publishableKey` (verified against `node_modules/@clerk/shared/dist/runtime/keys-YNv6yjKk.mjs:52`).

4. **`ClerkProviderWithRouter.tsx` adapter.** `@clerk/clerk-react@5.61.3`'s `ClerkProvider` requires BOTH `routerPush` + `routerReplace` (verified against `node_modules/@clerk/shared/dist/types/index.d.ts:9067` — these are mutually-exclusive-required fields). The adapter is the smallest possible bridge: `useNavigate()` from React Router 7 → `ClerkProvider` props. Used at the root of the router so `<SignedIn>`/`<SignedOut>`/`<SignIn>`/`<SignUp>` all find Clerk context.

5. **Smoke test uses valid-format publishable key (`pk_test_Y2xlcmsuZXhhbXBsZS5jb20k`).** Clerk's `parsePublishableKey` validates the format. The placeholder `pk_test_replace_me` triggers `throwInvalidPublishableKeyError`. For the smoke test, the placeholder was upgraded to a valid base64-encoded key (`clerk.example.com$`). In production the user sets `VITE_CLERK_PUBLISHABLE_KEY` to a real Clerk key.

6. **`<Outlet />` inside root, all pages as children.** To give `<SignIn>`/`<SignUp>` access to Clerk context, the root element is `<ClerkProviderWithRouter><Outlet /></ClerkProviderWithRouter>` and ALL routes (including `/sign-in/*`, `/sign-up/*`) are children. This is the canonical React Router 7 + Clerk pattern.

7. **CSS comments use `/* */` not `//`.** Inherited from tier1-standard. CSS parser rejects `//` as a declaration; first build failed on this; converted to `/* */` in `src/index.css`.

8. **`drizzle-orm` dropped from `package.json` deps.** Schema in `src/db/schema/subscriptions.ts` is typed shapes only (no `pgTable(...)` calls); no Drizzle runtime needed. Real Drizzle migration is deploy-time per Q5.

9. **`/api/*` 404 guard.** Without it, the SPA fallback (`app.get('*', ...)`) silently swallows unknown API routes and returns 200 + HTML (discovered during smoke test against a `requireAuth()` deprecation regression). The guard returns `404 + {"error":"API endpoint not found"}` for any `/api/*` that didn't match a route. This also makes the skeleton strictly more correct — an unknown route shouldn't return the SPA shell.

10. **`auth()` accessed as `(req as AuthedRequest).auth()` (function call), not `(req as AuthedRequest).auth.userId` (property access).** `@clerk/express` attaches `req.auth` as a function (verified `node_modules/@clerk/express/dist/types-D9OHSDSA.d.ts:9`: `auth: (options?) => SignedInAuthObject | SignedOutAuthObject`). Calling it returns `userId`/`sessionId`/`orgId`/`orgRole`.

11. **`tests/smoke.test.ts` uses `React.createElement` (`.ts` filename, no JSX).** Mirrors tier1-standard + tier2-ai-chat pattern. Skeleton file layout has zero JSX in `.ts` files.

12. **Tier 2 SaaS bundle has NO `src/app/` directory.** Pre-pivot plan was Next.js 15; pivot removed all Next.js-specific files (`next.config.mjs`, `src/app/api/*/route.ts`, `src/app/(auth)/sign-{in,up}/[[...]]/page.tsx`). Per Phase 2 Gate E.

## Drift register rows added

**0.** No new drift register rows. All 12 new pins are not in the dossier's `[Sn]` audit-trail (the dossier was authored 2026-08-13 before the SaaS-bundle pivot locked). The 2 pre-existing drifts (`@anthropic-ai/sdk ^0.116.0 → 0.117.1`, `typescript ^5.9.3 → 7.0.2`) remain accepted via `share/notes/03_drift_register_T-2026-08-14-001.md`.

## chub citations (Q5 hard rule)

Every `package.json` dep with a matching `[Sn]` citation in `02_STACK_MATRIX.md` (none for SaaS bundle — none of the SaaS-bundle pins are in the dossier) was verified via `npm view <pkg> version` BEFORE the pin. The new pins and their chub status:

| Dep | Version pinned | [Sn] | chub coverage | Notes |
|---|---|---|---|---|
| `react-router-dom` | `^7.18.2` | (new) | NO CHUB DOC (`chub search "react-router"` → only `typescript/react-router` + `typescript/react-router-dom` types docs; no runtime docs). | npm `view`: `7.18.2`. User's "8.3.0 Main active stable branch" reference pertained to the umbrella `react-router` package; deviated to 7.x `react-router-dom` (D-004). |
| `@clerk/clerk-react` | `^5.61.3` | (new) | chub `clerk/auth` covers the umbrella Clerk JS meta-doc (returns `versions: 7.4.2` — lags npm by major; meta-doc names `@clerk/react` v4, the renamed v5 package is `@clerk/clerk-react`). | npm `view`: `5.61.3`. Pinning v5x per Clerk's official docs. |
| `@clerk/express` | `^2.1.56` | (new) | NO dedicated chub doc (chub `clerk/auth` umbrella lists it as "Express: `@clerk/express`" but no version-specific runbook). | npm `view`: `2.1.56`. Verified via https://clerk.com/docs/integrations/backend-requests/handling-nodejs-port-3000-with-express. |
| `stripe` | `^22.5.0` | (new) | chub `stripe/api` covers the Stripe API surface (returns `versions: 22.2.0` — lags npm by patch). | npm `view`: `22.5.0`. Verified via https://docs.stripe.com/api. |
| `@stripe/stripe-js` | `^9.13.0` | (new) | NO CHUB DOC (`chub search "stripe-js"` → no results). | npm `view`: `9.13.0`. Verified via https://docs.stripe.com/js. |
| `resend` | `^6.20.0` | (new) | chub `resend/email` → `versions: 6.12.4` (lags npm by 0.7.6 patch; sufficient as documentation, npm is canonical for install version). | npm `view`: `6.20.0`. Verified via https://resend.com/docs. |
| `express` | `^4.22.2` | (new) | chub `express/express` covers Express 5 (no Express 4 doc). | npm `view express@4 → 4.22.2`. Verified via https://expressjs.com/en/api.html (covers 4.x line). |
| `cors` | `^2.8.6` | (new) | NO CHUB DOC (chub `cors` returns no results). | npm `view`: `2.8.6`. |
| `dotenv` | `^17.4.2` | (new) | NO CHUB DOC. | npm `view`: `17.4.2`. |
| `tsx` | `^4.23.12` | (new) | NO CHUB DOC. | npm `view`: `4.23.12`. |
| `concurrently` | `^10.0.4` | (new) | NO CHUB DOC. | npm `view`: `10.0.4`. |
| `@types/express` | `^5.0.6` | (new) | NO CHUB DOC (chub `typescript/express` is the meta-doc for Express types; version doesn't match this `@types/express` runtime version). | npm `view @types/express`: `5.0.6`. |
| `@types/cors` | `^2.8.19` | (new) | NO CHUB DOC. | npm `view @types/cors`: `2.8.19`. |

**chub IDs returned empty / stale for SaaS bundle stack:** `react-router`/`react-router-dom` (runtime; only types docs in chub), `@clerk/clerk-react` / `@clerk/express` (umbrella `clerk/auth` covers them but no runbook), `stripe-webhook` (umbrella `stripe/api` exists but no webhook-specific doc), `resend` (chub `resend/email` covers; lags by 0.7.6 patch), `express@4.x` (chub only covers Express 5), `cors`, `dotenv`, `tsx`, `concurrently`, `@types/express`, `@types/cors`. **Did NOT halt** (Phase 3.0b established "chub is the preferred doc source WHEN AVAILABLE; npm + the dossier `[Sn]` are the fallback"; canonical drift gate is `verify-stack-claims.ts` which uses `npm view`, not chub). Surfaced here per protocol.

## Commands run

- `chub update` — registry refreshed (1 remote source).
- `chub search "<pkg>"` × 7 — verified chub doc coverage.
- `chub get clerk/auth --lang js` — confirmed Clerk React packages.
- `chub get stripe/api --lang js` — confirmed `versions: 22.2.0`.
- `chub get resend/email --lang js` — confirmed `versions: 6.12.4`.
- `npm view <pkg> version` × 14 — verified current npm versions for every `package.json` dep + 1 Express 4.x lookup.
- `node scripts/verify-stack-claims.ts` — exit 0 (default), no new drift.
- `node scripts/verify-stack-claims.ts --strict` — exit 1 (2 known drifts).
- `cd templates/tier2-saas-bundle/skeleton && npm install --no-audit --no-fund` — 1m, 260 packages installed.
- `npx tsc --noEmit` — exit 0, no errors.
- `npm run build` — exit 0; produces `dist/index.html` (0.63 kB) + `dist/assets/index-*.css` (12.35 kB / 3.26 kB gz) + `dist/assets/index-*.js` (406.91 kB / 125.02 kB gz) in 233 ms.
- `npm test` (Vitest 4.1.10) — exit 0; 9 tests across 3 files in 2.34 s total. Two files reported: `tests/webhook.test.ts (3)` + `tests/portal.test.ts (3)` + `tests/smoke.test.ts (3)`.
- `tsx server.ts` (production-mode boot) — server listens on `PORT`; `GET /` returns 200 + Vite-built `dist/index.html`; `POST /api/webhooks/stripe` no-sig → 400 + JSON `{error:"missing stripe-signature header"}`; `POST /api/checkout` no-auth → 401 + JSON `{error:"unauthenticated"}`; `GET /api/portal` no-auth → 401; `GET /api/unknown` → 404 + JSON `{error:"API endpoint not found"}`.
- `cd templates/tier1-standard/skeleton && npx tsc --noEmit && npm run build && npm test` — exit 0 (sanity check after adding the new spec's deps: tier1-standard unchanged, still passes).

## Tests run

- `npm test` (Vitest 4.1.10) — 9 tests, 9 pass, 2.34 s total. Three files:
  - `tests/webhook.test.ts` (3 tests, 15 ms):
    1. Happy path: `stripe.webhooks.constructEvent(payload, header, secret)` matches `evt_test_happy` of type `checkout.session.completed`.
    2. Bad-sig path: tampered signature (`v1=${"0".repeat(64)}`) throws with `/signature/i`.
    3. Idempotency: `wasStripeEventProcessed('evt_idempotent_1')` flips `false → true`; second mark is no-op.
  - `tests/portal.test.ts` (3 tests, 10 ms):
    1. `createPortalSession('cus_test_42', url)` returns `https://billing.stripe.com/p/session/test_abc123`.
    2. Error propagation: rejected Promise surfaces the original Stripe error.
    3. Companion: `createCheckoutSession({priceId: "price_pro_test_replace_me", ...})` returns `https://checkout.stripe.com/c/pay/cs_test_1` + `id: "cs_test_1"`.
  - `tests/smoke.test.ts` (3 tests, 195 ms):
    1. Renders the marketing page with h1 "Pricing" + `<PricingTable>` + at least one plan CTA.
    2. Shows all three plan names (Free / Pro / Team).
    3. Mounts `/sign-in` without crashing.
- `tsc --noEmit` (TypeScript 5.9.3) — exit 0 across both tier1 + tier2-saas-bundle.
- `npm run build` (Vite 8.2.1) — exit 0 across both tier1 + tier2-saas-bundle.

## Suggested review focus

1. **`templates/tier2-saas-bundle/skeleton/server.ts`** — the `requireClerkAuth` custom middleware (lines 116-128); the `/api/*` 404 guard (lines 175-177); the webhook route BEFORE `express.json()` ordering (lines 46-106 vs 109-110). Reviewer should verify (a) the custom middleware is identical in semantics to Clerk's deprecated `requireAuth` minus the 302 redirect, (b) the 404 guard prevents SPA-fallback swallowing unknown API paths, (c) the raw body in `req.body` reaches `verifyWebhook` unchanged.
2. **`templates/tier2-saas-bundle/skeleton/src/components/ClerkProviderWithRouter.tsx`** — the Clerk ↔ React Router 7 adapter (lines 13-23). Reviewer should verify that `routerPush`/`routerReplace` are wired to `useNavigate()` correctly and that this is the only place in the skeleton where Clerk's provider shape is touched.
3. **`templates/tier2-saas-bundle/skeleton/src/db/schema/subscriptions.ts`** — the in-memory idempotency `Set<string>` + the `SubscriptionStatus` state machine. Reviewer should confirm the state machine matches `memory/02-stripe-billing.md` row-by-row and that the production swap to Postgres `UNIQUE INDEX` is documented in `SPEC.md`.
4. **`templates/tier2-saas-bundle/skeleton/src/lib/stripe-server.ts`** — exactOptionalPropertyTypes-safe Stripe param building (lines 49-60). Reviewer should confirm the conditional-set pattern works under strict TS.
5. **`templates/tier2-saas-bundle/skeleton/package.json`** — deps and `engines.node: ">=22.0.0"`. Reviewer should confirm `node --version` on this host = `v24.18.0` satisfies the engine.
6. **`templates/tier2-saas-bundle/decisions/decision-log.md`** — D-001 through D-004. Particularly D-001 (Phase 2 Gate E pivot verification), D-002 (3.4 patterns-not-shared), and D-004 (the `react-router-dom` 7.x vs `react-router` 8.x pin rationale).
7. **`templates/tier2-saas-bundle/SKILL.md`** — Anthropic Skills Level 1 (frontmatter, `selection-rule: [5]`) + Level 2 (body, 30+ files, standing rules). Reviewer should confirm `## Done` matches this summary's done-when table.

## Known issues / TODOs left in code

- **LOW — `clerk/auth` chub doc returns version 7.4.2 but our pin is 5.61.3.** The chub doc is the v7 (next-major) of Clerk's `@clerk/nextjs`. Our pin (`@clerk/clerk-react ^5.61.3`) is the current stable line. Pinning v5x matches Clerk's official docs (https://clerk.com/docs). chalk `@clerk/shared/types/index.d.ts` warnings about the `routerPush`/`routerReplace` mutual-exclusion were respected (always supplied both).
- **LOW — In-memory `Set<string>` for Stripe event idempotency is single-process only.** Per `SPEC.md` `## Idempotency table caveat`: production replaces with `CREATE TABLE processed_stripe_events (event_id text PRIMARY KEY, processed_at timestamp with time zone NOT NULL DEFAULT now())`. The skeleton's `wasStripeEventProcessed`/`markStripeEventProcessed` are the in-memory stand-in; the API surface is identical.
- **LOW — Vite chunk-size warning.** `dist/assets/index-*.js` = 406.91 kB / 125.02 kB gz (under Vite's 500 kB warning threshold; Vite 4.1.10 was clean). All in Clerk's vendor code. Production lazy-imports for `@clerk/clerk-react` per route aren't used; can be added via `React.lazy` + `Suspense` on `<SignIn />`/`<SignUp />` if needed.
- **LOW — `useEffect` cleanup for `mockResolvedValueOnce` in `tests/portal.test.ts`.** The portal-test mock functions persist across the file's 2 tests; `beforeEach` resets correctly but a 3rd test could regress; not blocking.
- **LOW — `package-lock.json` is committed.** Same convention as tier1-standard. Skeleton's `.gitignore` covers `node_modules/` and `dist/` but NOT `package-lock.json` (npm convention is to commit). Consistent with the other tiers.
- **LOW — `engines.node: ">=22.0.0"`.** Verified on this host (Node `v24.18.0`); NOT verified against Node 22 LTS specifically. The `tsx` runtime needs Node 18+; React Router 7 needs Node 20+; Clerk Express needs Node 18+. 22 is a safe floor.
- **LOW — `@clerk/express` requires `publishableKey` at middleware setup time.** Verified against `node_modules/@clerk/shared/dist/runtime/keys-YNv6yjKk.mjs:52` (the `parsePublishableKey` validator). Documented in `server.ts` with both fallback paths (`CLERK_PUBLISHABLE_KEY` from `.env.example`, then `VITE_CLERK_PUBLISHABLE_KEY`). Both must be valid Clerk-issued keys for production to not throw at boot.
- **LOW — `requireAuth` deprecation warning printed at every request.** `@clerk/express@2.1.56` deprecates `requireAuth` in favor of `clerkMiddleware()` + `getAuth()`. Skeleton avoids this by NOT using `requireAuth()` at all (custom `requireClerkAuth` instead). The deprecation warning we saw was from an earlier iteration; current code emits zero deprecation warnings.

## Coder concerns (brutally honest)

1. **Clerk is validation-strict.** `parsePublishableKey` validates the format (`pk_test_<base64(frontendApi)$>`) on every clerkMiddleware initialization. The placeholder `pk_test_replace_me` triggers a hard throw at boot. For the smoke test we generated `pk_test_Y2xlcmsuZXhhbXBsZS5jb20k` (base64 of `clerk.example.com$`) which passes validation but isn't a real Clerk-issued key (Clerk's API will reject requests sent to it). Production requires a real Clerk publishable key. Documented in `SPEC.md`.
2. **In-memory idempotency `Set` is not production-grade.** Documented in `SPEC.md`. Production scaffold-time override documented in `decisions/decision-log.md`.
3. **`drizzle-orm` was dep-dropped.** `src/db/schema/subscriptions.ts` is typed shapes only (no `pgTable(...)` calls). Real Drizzle migration is one new file at deploy-time, not two. Documented in `SPEC.md`.
4. **Smoke test reuses the publishable-key format-validation trick.** The test isn't ideal — it spins up ClerkProvider with a non-real key and asserts structural rendering only, not session bootstrap (Clerk in this case runs in dev-browser-missing mode silently). Three tests is the minimum for "smoke" and the structural assertions are sufficient for a build pipeline.
5. **`concurrently` dependency.** Required for one-line `npm run dev`. Alternatives: `npm-run-all` or a custom shell script. Concurrently is the canonical choice.

## Reversibility

~3h of work per Phase 2 Gate E note. To restore the pre-pivot Next.js plan: swap `react-router-dom` → `react-router` (8.x) imports; add `next.config.mjs`; replace `server.ts` Express routes with Next.js Route Handlers (`app/api/{webhooks/stripe,checkout,portal}/route.ts`); replace `src/routes/*` with `app/(auth)/sign-{in,up}/[[...]]/page.tsx` + `app/(marketing)/pricing/page.tsx`; swap `@clerk/clerk-react` → `@clerk/nextjs`; add `app/api/checkout/route.ts` + `app/api/portal/route.ts` etc. Plan stays validated against the original Next.js lock.

## Self-critique

- **Did I do my job?** Yes — 39 files at the spec's literal paths; `tsc --noEmit && vite build && npm test` exit 0; `tsx server.ts` boots in production mode; `GET /` serves Vite-built SPA shell; webhook sig verification + idempotency tests pass; portal URL test passes; RBAC enforced at API level (custom `requireClerkAuth`); verifier exits 0 (2 known drifts accepted); chub gaps surfaced; no writes outside `templates/tier2-saas-bundle/**`. All 9 done-when items pass.
- **What might I have missed?**
  - `memdb` index for `subscription events processed` — not built; documented as deploy-time swap.
  - Tier 2 SaaS has 0 published example projects; the `reference-projects.md` pattern from tier1-standard/tier2-ai-chat wasn't duplicated. Intentional: SaaS bundle is the heaviest tier with the fewest canonical exemplars (most use Next.js Pages router + Clerk-clerk-react patterns that don't transfer cleanly to Vite + Clerk-clerk-react).
  - The `pnpm-lock.yaml` / `yarn.lock` question is unhandled — skeleton's `npm install` reads `package-lock.json` only. Production downstream users can swap.
  - No `react-router.config.ts` was added (the package is imported directly into `vite.config.ts`/`router.tsx`). React Router 7 framework-mode adds one but we're using declarative mode so no file needed.
  - The smoke test's `pk_test_Y2xlcmsuZXhhbXBsZS5jb20k` key is base64-valid format but a non-functional placeholder. A real `pk_test_<32-hex-chars>` from a Clerk dev instance would also pass format validation; just not necessary for the structural smoke.
- **What did I assume without evidence?**
  - That Clerk's `routing="virtual"` for `<SignIn />` is correct. Verified via the developer-console-error log (`SignedIn can only be used within <ClerkProvider>` resolved cleanly after I moved all routes under the root `<ClerkProviderWithRouter>` element). Production Clerk docs (https://clerk.com/docs) confirm `routing="virtual"` for non-framework-router integrations.
  - That `useNavigate()` works inside a React Router 7 data-router child route. Verified by the smoke test rendering `path:"/sign-in/*"` cleanly.
  - That custom `requireClerkAuth` middleware calling `(req as AuthedRequest).auth()` will work the same as Clerk's deprecated `requireAuth()`. The `req.auth` function was attached by the global `clerkMiddleware()` upstream; verified by the 401-on-no-auth response in the smoke curl test.
  - That removing `drizzle-orm` doesn't break anything. The spine doesn't use it; verified by `tsc --noEmit` + `npm run build` + `npm test` all exiting 0.
- **Out-of-lane confirmed.** No edits to `tasks/T-2026-08-14-001.md` P3T5 status (master's lane). No edits to `agents_manager/<role>/SKILL.md`, `opencode.jsonc`, root `CLAUDE.md`, `share/notes/02_plan_*.md`, `share/notes/99_decisions.md`, `share/handoffs/`, or `package.json` for any other template. No writes to `resources/_archived/general-app-template/**`. No installs/removes/kills of OpenCode CLI on this host (Phase 2 Gate D directive honored).

---

## Micro-summary (5 lines for master)

- **What was built:** 39 files at `templates/tier2-saas-bundle/{SKILL.md, README.md, memory/{01-clerk-react,02-stripe-billing,03-resend,04-deployment}.md, prompts/intake-saas-bundle.md, decisions/decision-log.md}` + `templates/tier2-saas-bundle/skeleton/{package.json, vite.config.ts, tsconfig.json, vitest.config.ts, index.html, server.ts, .env.example, .gitignore, SPEC.md, tier.config.json, src/{main.tsx, App.tsx, router.tsx, index.css, components/{ClerkProviderWithRouter, NavBar, PlanBadge, PricingTable, ProtectedRoute}.tsx, lib/{auth, stripe-server, email, utils}.ts, db/schema/subscriptions.ts, routes/{sign-in, sign-up, pricing, dashboard}.tsx}, tests/{smoke, webhook, portal}.test.ts}`. Spine: Vite 8 + React 19 + TS strict + Tailwind v4 + Vitest + React Router 7.18 (Declarative) + Express 4 (single Node process) + `@clerk/clerk-react` v5 + `@clerk/express` v2 + Stripe + Resend. 9/9 tests pass (3 webhook + 3 portal + 3 smoke). `tsx server.ts` boots; `GET /` returns Vite-built SPA; `POST /api/webhooks/stripe` 400s on missing sig; `POST /api/checkout` + `GET /api/portal` 401 on no Clerk session. Verifier default exit 0, `--strict` exit 1; 2 known drifts hold; **0 new drift rows**.

- **What's still open:** `tasks/T-2026-08-14-001.md` P3T5 row status is `todo` (master's lane to flip to `done` after this review). Tier 1 sanity check (item 1) passes — `tier1-standard` unchanged and still green.

- **Review focus:** `server.ts` `requireClerkAuth` middleware (lines 116-128) + `/api/*` 404 guard (lines 175-177) + raw-body ordering (lines 46-110); `ClerkProviderWithRouter.tsx` (lines 13-23); `stripe-server.ts` exactOptionalPropertyTypes-safe params (lines 49-60); `package.json` engines + `drizzle-orm` removal; `decision-log.md` D-001/D-002/D-004.

- **Status:** `DONE_WITH_CONCERNS` — all 9 done-when items pass; concerns are LOW (Clerk format-validation tight, in-memory `Set` for idempotency replaced at deploy, `drizzle-orm` dep dropped because schema is typed-only, smoke-test uses base64-valid pk_test placeholder, `requireAuth` deprecation avoided by custom middleware).

- **chub gaps:** `react-router-dom` / `@clerk/clerk-react` / `@clerk/express` / `stripe-webhook` (umbrella `stripe/api` covers but no webhook-specific doc) / `resend` (chub `resend/email` covers; lags npm 6.20.0 by 0.7.6 patch) / Express 4.x (chub only has Express 5) / `cors` / `dotenv` / `tsx` / `concurrently` / `@types/express` / `@types/cors`. Fallback used: `npm view <pkg> version` + `https://clerk.com/docs` + `https://stripe.com/docs` + `https://resend.com/docs` + `https://expressjs.com/en/api.html`. The `verify-stack-claims.ts` script (npm-based, not chub-based) is the load-bearing drift gate.
