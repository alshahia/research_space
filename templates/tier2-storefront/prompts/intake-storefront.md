# Intake prompt — tier2-storefront

Used by the controller when a user signals they want a storefront (Path B: Medusa + Next.js + Stripe). Asks the **5 commerce axes** that change the scaffold. Default answer set in the file matches Path B; user override flips it to Path A.

## Axes

### Axis 1 (commerce model) — *"Where does the product/order data live?"*

| Option | Default? | What it means |
|---|---|---|
| `medusa-b2c-self-hosted` | YES | Medusa 2 + Postgres + Redis. Full ownership. |
| `shopify-b2c-hosted` | no | Shopify hosts the data. Drop Medusa, add Hydrogen. |
| `medusa-b2b-self-hosted` | no | Same stack, add B2B pricing, customer groups, quotes. Defer. |
| `saleor-b2c-self-hosted` | no | Saleor (GraphQL-first). Different stack entirely. Defer. |

### Axis 2 (backend framework) — *"Which headless commerce framework?"*

| Option | Default? | What it means |
|---|---|---|
| `medusa` | YES (Path B) | Node.js, MikroORM, modular. The right answer for most. |
| `shopify-hydrogen` | no (Path A) | Remix-based; requires Shopify backend. |
| `none` | no | If the user wants only a static storefront + manual order fulfillment. |

### Axis 3 (frontend framework) — *"Which storefront framework?"*

| Option | Default? | What it means |
|---|---|---|
| `nextjs-15` | YES (Path B) | App Router, Server Components. **Overrides tier1 Vite spine.** |
| `hydrogen-remix` | no (Path A) | Remix-based, Shopify-blessed. |
| `astro` | no | Static-first, islands. |

### Axis 4 (payment provider) — *"Which payment processor?"*

| Option | Default? | What it means |
|---|---|---|
| `stripe` | YES (Path B) | Stripe Checkout (redirect), webhook sig verification. |
| `shopify-checkout` | no (Path A) | Shopify hosts payment; no sig verification. |
| `adyen` | no | More international; complex. Defer. |
| `square` | no | In-person + online. Defer. |

### Axis 5 (hosting topology) — *"How do you want to run it?"*

| Option | Default? | What it means |
|---|---|---|
| `monorepo` | YES | `apps/backend/` + `apps/storefront/` in one repo; npm workspaces. |
| `polyrepo` | no | Separate repos for backend and storefront; CI is per-repo. |
| `serverless` | no | Backend on Vercel Functions or AWS Lambda. Medusa 2 doesn't ship Lambda-ready by default. Defer. |

## Defaults (Path B)

- commerce: `medusa-b2c-self-hosted`
- backendFramework: `medusa`
- frontendFramework: `nextjs-15`
- paymentProvider: `stripe`
- hosting: `monorepo`

Defaults are encoded in `tier.config.json` `defaults`. Override per user answer; record overrides in `decisions/decision-log.md`.

## Recommended question phrasing

For an automated controller, surface this as 5 single-select questions before scaffolding. For an LLM-orchestrated flow, one combined question is fine:

> "I'll set up a Tier-2 storefront. Quick check on 5 axes:
> 1. **Commerce model:** Medusa self-hosted (default), Shopify hosted, or other?
> 2. **Backend framework:** Medusa (default), Shopify Hydrogen, or none?
> 3. **Frontend framework:** Next.js 15 (default, overrides tier1 Vite), Hydrogen/Remix, or Astro?
> 4. **Payment provider:** Stripe Checkout (default), Shopify Checkout, or other?
> 5. **Hosting:** Monorepo (default), polyrepo, or serverless?
>
> Defaults are Path B (Medusa + Next.js + Stripe + monorepo). Reply with overrides, or 'default' to confirm."

## After scaffolding

- Move values to `tier.config.json` `defaults` if changed.
- Record in `decisions/decision-log.md` with `D-NNN` ID.
- Re-run `scripts/verify-stack-claims.ts` to confirm pins.
