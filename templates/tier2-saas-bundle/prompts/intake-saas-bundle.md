# Intake — tier2-saas-bundle

Used by the agent to gather app-level configuration BEFORE scaffolding. Axes (3 fixed + adaptive):

## Fixed axes

1. **Auth vendor** (single-select)
   - `clerk-react` (default) — drops `@clerk/clerk-react` + `@clerk/express`; pre-built `<SignIn />` / `<SignUp />` UI.
   - `auth0-react` — drops `@auth0/auth0-react`; SPA + Express integration via `@auth0/auth0-jwt-validator`.
   - `supabase-auth` — drops `@supabase/supabase-js`; SSR-friendly via Supabase Auth + Postgres RLS.
   - `custom-lucia` — drops `lucia`; bespoke session table.

2. **Payment tiers** (multi-select, ≥1)
   - `free` — no Stripe price ID; just a "Get started" button.
   - `pro` — Stripe `mode=subscription` `priceId`. Default: $19/mo.
   - `team` — Stripe `mode=subscription` `priceId`. Default: $49/mo.
   - `enterprise` — sales-led contact form (no Stripe).
   - `usage-based` — Stripe metered billing; requires `metered_priceId` + a usage reporter on each event.

3. **Support email** (string, RFC 5322)
   - Used in `from:` for Resend + `<a href="mailto:...">` links.
   - Default if unset: `support@example.com`.

## Adaptive axes (add only if user mentions)

- `email-vendor`: `resend` (default) | `sendgrid` | `postmark`
- `billing-model`: `flat` (default) | `tiered` | `usage-based` | `seats`
- `webhook-retry`: `auto` (default) | `manual`
- `idempotency-strategy`: `in-memory` (scaffold) | `postgres-unique-index` (deploy)
- `regions`: array of Stripe-supported regions (e.g. `["us", "eu"]`); impact is on currency mapping in Stripe Checkout.

## Output shape

Collected answers flow into `skeleton/tier.config.json` + the relevant `.env.example` lines. The agent should NOT scaffold until the user replies "go" or "change X to Y".

## Example intake reply

```
- Auth vendor: clerk-react (the default)
- Tiers: free + pro + team
- Pro price: $19/mo, Stripe priceId: price_PRO_PLACEHOLDER
- Team price: $49/mo, Stripe priceId: price_TEAM_PLACEHOLDER
- Support email: support@myapp.com
```

## Spine invariants

These NEVER change:
- Vite 8 + React 19 + TS strict + Tailwind v4 + Vitest
- React Router 7 (Declarative mode)
- Express 4 in a single Node process
- Webhook sig verification + idempotency before any state mutation
- RBAC at `/api/*` via Clerk `requireAuth()` (or equivalent)

These change WITH each intake:
- Auth vendor (`clerk-react` / `auth0-react` / `supabase-auth`)
- Email vendor (`resend` / `sendgrid` / `postmark`)
- Number of plan cards
- Stripe `priceId` values
