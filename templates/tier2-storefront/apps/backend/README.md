# apps/backend — Medusa 2 (Path B)

Medusa 2 commerce server for `tier2-storefront`. Self-hosted, Postgres + Redis.

## Prerequisites

- Node >= 20.0.0
- Postgres 16 (local or managed)
- Redis 7 (optional in dev, required in prod)
- npm 10+

## Setup

```bash
cp .env.example .env
# fill DATABASE_URL, REDIS_URL, JWT_SECRET, COOKIE_SECRET

npm install --workspace apps/backend  # (or `npm install` from repo root)

# create the database, generate + run migrations, seed products
npm run db:create    # uses DATABASE_URL
npm run migrate      # applies medusa-db/migrations/* to Postgres
npm run seed         # runs src/scripts/seed.ts (6 products, 3 categories)

# dev server (watch mode, port 9000)
npm run dev

# or production build + start
npm run build
npm start
```

Admin dashboard: <http://localhost:9000/app>.

Create an admin user:

```bash
npx medusa user --email you@example.com --password STRONG_PASSWORD
```

## Routes

- `GET /store/products?limit=6&offset=0` → `{ products, count }` (see `src/api/store/products/route.ts`)
- `GET /store/products/:id` → Medusa default
- `GET /admin/*`, `POST /admin/*` → Medusa default
- Medusa's auto-generated CRUD for products/orders/carts/customers — reference: <https://docs.medusajs.com/api/store>

## Tests

```bash
npm test           # vitest run
npm run test:watch # watch mode
```

Tests use Vitest with `pg-mem` mocking Postgres where needed (e.g. tests/seed.test.ts). No real DB required for the test suite.

## What's in scope vs deferred

In scope: Medusa's product/category/order/cart/customer modules, REST under `/store/*` and `/admin/*`, the custom link module `src/links/product-category.ts`, the seed script for 6 products in 3 categories.

Deferred:

- Real Postgres + Redis provisioning (handled at deploy time, see `memory/04-deployment.md`).
- `medusa db:migrate` against real Postgres (scaffold ships a placeholder; generated migrations live in `node_modules/.cache/medusa/migrations/` after `medusa db:generate`).
- `medusa db:seed` end-to-end (`src/scripts/seed.ts` is unit-tested in isolation; full DB-backed seed requires Postgres).
- Medusa admin customizations (`src/admin/widgets/*`).
- Email/sendgrid/Firebase push integration (out of scope of commerce-scaffold; tier2-saas-bundle adds observability hooks).

## Windows host notes

- `medusa --version` exits 0 (CLI presence only).
- `npm test` works with pg-mem (no real Postgres needed).
- `npm run dev` will fail because it needs Postgres. Documented as DEFERRED in `../../SPEC.md`.

## See also

- `../../memory/01-medusa.md` — Medusa 2 patterns + link modules.
- `../../SPEC.md` — full system spec + deferred items list.
