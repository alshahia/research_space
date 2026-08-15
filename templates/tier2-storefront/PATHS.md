# tier2-storefront — Path A Swap Recipe

Future-fork insurance: if Medusa + Stripe ever loses the calculus (e.g., user wants Shopify turnkey, wants to drop Redis/Postgres ops), this template can flip to **Path A (Shopify + Hydrogen + Shopify Checkout)** with a controlled set of edits. Do not silently rewrite — record in `decisions/decision-log.md`.

## What Path A replaces

| Layer | Path B (this template) | Path A (Shopify) |
|---|---|---|
| Commerce backend | `apps/backend/` (Medusa 2 + Postgres + Redis) | `apps/shopify/` (Hydrogen + Remix — `@shopify/hydrogen` + `@remix-run/*`) OR nothing (Shopify is the backend) |
| Storefront | `apps/storefront/` (Next.js 15) | `apps/shopify/` (Hydrogen 2025) |
| Database | Postgres + Redis (self-hosted) | None — Shopify hosts the data |
| Payments | Stripe Checkout + webhook sig (`Stripe.webhooks.constructEvent`) | Shopify Checkout (no signature verification — Shopify hosts) |
| Auth | Medusa customer auth | Shopify Customer Account API |
| CountryCode routing | Next.js middleware (US/GB/DE) | Same pattern |
| Cart | localStorage + server action submit | Hydrogen Cart API (server-side) |

## Swap steps (in order)

1. **Decide what "Path A" actually is.** Two sub-paths exist:
   - **A1: Shopify + Hydrogen.** Customer provides a `myshopify.com` URL + storefront token. No backend app at all — storefront talks to Shopify GraphQL directly.
   - **A2: Shopify + custom backend.** Keep a backend app (Node/Express or Hono), talk to Shopify Admin REST. Drop Medusa only.
2. **Delete Path B's `apps/backend/`.** The medusa-js SDK + Medusa routes stop being valid. `apps/backend/package.json` deleted.
3. **Replace `apps/storefront/` with `apps/hydrogen/` (or keep monorepo shell).** Remix-based, not Next.js. Re-uses `countryCode` middleware pattern.
4. **Update `tier.config.json`:**
   ```diff
   - "path": "B"
   - "commerce": "medusa-b2c-self-hosted"
   - "backendFramework": "medusa"
   - "frontendFramework": "nextjs-15"
   - "paymentProvider": "stripe"
   + "path": "A1"
   + "commerce": "shopify-b2c-hosted"
   + "backendFramework": "none"
   + "frontendFramework": "hydrogen-remix"
   + "paymentProvider": "shopify-checkout"
   ```
5. **Update `featureFlags`:**
   ```diff
   -  "monorepo": true,
   -  "serverActions": true,
   -  "stripeCheckout": true,
   -  "stripeWebhook": true,
   +  "monorepo": false,
   +  "serverActions": false,
   +  "shopifyCheckout": true,
   +  "shopifyWebhook": false,
   ```
6. **Update root `package.json`:** remove `"workspaces": ["apps/*"]` if A1 (single-app), keep if A2.
7. **Rotate `memory/`:**
   - Replace `01-medusa.md` with `01-shopify-admin.md`.
   - Replace `02-nextjs-storefront.md` with `02-hydrogen-remix.md`.
   - **Delete** `03-stripe-billing.md`; replace with `03-shopify-payments.md` (no webhook sig — Shopify Checkout is hosted).
   - Update `04-deployment.md` (Shopify + Vercel instead of Medusa-on-Railway + Vercel).
8. **Rotate `prompts/intake-storefront.md`:**
   - **Intake axis 5 (commerce model):** default `"shopify-b2c-hosted"`.
   - **Intake axis 6 (payment provider):** default `"shopify-checkout"`; stripe becomes a deprecated legacy option.
9. **Update `SPEC.md` `## Path B spec` → `## Path A1 spec` (or A2).**
10. **Update `tier.config.json` `deliberateOverrides.nextVersion`:** Path A uses Hydrogen (`@shopify/hydrogen` v2025.x) — `next` is no longer involved. Delete the `nextVersion` override.
11. **Verify the gate:** `scripts/verify-stack-claims.ts` default exit 0 with new matrix pins. The matrix's Path A block (lines 22-72, ahead of Path B block 745-763) already pins `@shopify/hydrogen ^2025.1.x`, `@shopify/cli ^3.x`. Path A swap should be a no-drift event.
12. **Re-run the verification checklist**:
    - `tsc --noEmit` exit 0
    - `npm test` exit 0 (3 storefront test files become 3 hydrogen test files)
    - `npm run build` exit 0 (`hydrogen build` replaces `next build`)

## What stays the same

- `templates/tier2-storefront/{SKILL.md, PATHS.md, SPEC.md, README.md, tier.config.json}` — the **shape** is tier-shape, not provider-shape.
- `prompts/intake-storefront.md` — the **question shape** (axis 5 = commerce, axis 6 = payment) stays; only defaults change.
- `decisions/decision-log.md` — append the swap record; never delete history.
- `memory/` index — only individual entries change; their titles (`01-*`, `02-*`, etc.) reflect which sub-path is active.

## Warning

Do not mix Path A + Path B in the same `apps/` tree. Medusa + Shopify+local + Stripe + Shopify payments = ID conflicts at the SDK layer. Pick one path per template version; if the user later wants Path A, clone this template, rename to `tier2-shopify`, and let the two coexist as siblings.
