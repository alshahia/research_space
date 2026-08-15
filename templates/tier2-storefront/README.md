# tier2-storefront — Tier 2 + commerce backend (Path B)

A monorepo with:

- **`apps/backend/`** — Medusa 2 commerce server (Node.js, Postgres, Redis)
- **`apps/storefront/`** — Next.js 15 storefront (App Router, Server Components, Stripe Checkout)

Template-shape decisions in `tier.config.json`. Full spec in `SPEC.md`. How-to-swap to Path A in `PATHS.md`. Memory entries in `memory/`. Decision log in `decisions/decision-log.md`. Skills in `SKILL.md`.

## Local dev

```bash
# Postgres + Redis must be running locally (or use Docker: docker compose up postgres redis)
cp apps/backend/.env.example apps/backend/.env
cp apps/storefront/.env.example apps/storefront/.env
# fill in DATABASE_URL, REDIS_URL, STRIPE_*_KEY

npm install              # workspaces install both apps
npm run dev              # parallel: backend (9000) + storefront (3000)
```

Open <http://localhost:3000>. Open Medusa admin at <http://localhost:9000/app> after creating a user (`medusa user --email you@example.com --password test123`).

## Test

```bash
npm test                  # vitest in both apps
npm --workspace apps/backend run build  # medusa build
npm --workspace apps/storefront run build  # next build
```

## Deploy

See `memory/04-deployment.md`. Quick path:

- Postgres: Neon / Supabase
- Redis: Upstash
- Medusa backend: Railway / Fly.io
- Next.js storefront: Vercel
- Stripe webhook URL: `https://www.example.com/api/webhooks/stripe`

## What's in scope vs deferred

| In scope | Deferred |
|---|---|
| Medusa 2 + Postgres schema (products, categories, orders, carts, customers) | Real Postgres + Redis provisioning (deploy-time) |
| Next.js 15 App Router: landing, PLP, PDP, cart, order-confirmation | `medusa db:migrate` against real Postgres |
| Stripe Checkout + webhook signature verification | Live Stripe Checkout session creation (test mode only in scaffold) |
| CountryCode routing (US/GB/DE) | Internationalisation beyond US/GB/DE |
| Medusa admin defaults | Custom Medusa admin widgets |
| `pg-mem` for backend tests on Windows | Medusa `src/subscribers/order-paid.ts` |
| Vitest for storefront + backend tests | E2E tests (Playwright) |

See `SPEC.md` `## Deferred items` for the full list with rationale.
