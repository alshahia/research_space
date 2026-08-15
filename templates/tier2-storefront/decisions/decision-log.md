# Decision log — tier2-storefront

This is the canonical record of decisions made while scaffolding the `tier2-storefront` template. Entries append chronologically (newest on top). Each entry is dated + signed.

---

## 2026-08-14 — D-001 — Path B lock: Medusa 2 + Next.js 15 + Stripe (override Path A default)

**Decided by:** master (per user reply "B" on 2026-08-14 chat).

**Why:** User replied "B" to the upfront shop-model prompt. Path B was the higher-effort, higher-control option (full data ownership, $0 SaaS cost after infra). The lower-effort option (Path A — Shopify + Hydrogen) was offered first; user opted up.

**What was decided:**

- **Commerce backend:** Medusa 2.x (latest stable, `^2.19.0` per npm view 2026-08-14) + Postgres 16 + Redis 7, all self-hostable.
- **Frontend:** Next.js 15 App Router + Server Components (NOT the tier1 Vite spine; this is the **only** tier2 template that overrides the spine).
- **Payments:** Stripe Checkout (redirect flow) + Stripe webhook signature verification (`Stripe.webhooks.constructEvent`).
- **Topology:** Monorepo with `apps/backend/` + `apps/storefront/` + root `package.json` using npm workspaces. Parallel dev: `npm-run-all -p dev:backend dev:storefront`.
- **Backend tests:** `pg-mem` (in-memory Postgres) instead of real Postgres (this Windows host has no Postgres; deferred to deploy).
- **Stripe in tests:** Stripe SDK with mocked raw body + mocked signature. No live Stripe calls. `STRIPE_SECRET_KEY` documented in `.env.example`; `.env` is gitignored.
- **CountryCode routing:** US/GB/DE only (tier-shape, not provider-shape — Path A keeps the same axes).

**Lock-in posture:** Path A (Shopify + Hydrogen) remains a documented fork recipe in `PATHS.md`. Do not silently backflip; a swap is a deliberate decision + a new entry in this log.

**Counter-decisions (explicit rejections):**

- **Did NOT pick Shopify + Hydrogen.** Reason: drops self-hosted data ownership, adds Shopify subscription, locks storefront to Shopify storefront API version cycle.
- **Did NOT use Next.js Commerce template (Vercel).** Reason: ships with Shopify by default; back-swapping to Medusa exceeds scaffold effort.
- **Did NOT use Remix directly (without Hydrogen).** Reason: Hydrogen's Remix bindings (route loaders, `hydrogen.config`, `cart()` helper) are the actual saved-effort.
- **Did NOT use Medusa 1.x.** Reason: EOL by upstream 2024; Medusa 2.x is the only supported major.
- **Did NOT pin Next.js 16.** Reason: user lock 2026-08-14 says "Next.js 15"; matrix pins Next 16 for tier1-standard harness. Path B storefront's Next 15 is a deliberate user override of the matrix (recorded in `tier.config.json` `deliberateOverrides.nextVersion`). The matrix gate still passes because it pins Next 16 vs npm latest 16.3.1.

**Impact:** Build order is now `tier1 → tier2-ai-chat → tier2-mobile → tier2-storefront (this, locked) → tier2-saas-bundle (LAST)`. Total tier2 family is 8 templates; tier2-storefront is template 4. Effort budget: 8d (~2× scaffold-t1 effort).

---

## 2026-08-14 — D-002 — Coder deviations from dossier

**Authored by:** coder (Phase 3.4 of T-2026-08-14-001).

**Deviations taken (not in dossier, surfaced during scaffolding):**

1. **`medusa-db/migrations/0001_init/auto-generated.sql` ships as placeholder, not real migration.** Reason: real migrations live in `node_modules/.cache/medusa/migrations/` after `medusa db:generate` runs against a real Postgres. The scaffold ships a comment-only file pointing the maintainer at the actual location. Documented in `apps/backend/SPEC.md` `## Deferred items`.
2. **`src/links/product-category.ts`** uses Medusa 2's link module API (`defineLink`, `MedusaModule`). Medusa 1's `extension` API is gone. Ponytail: one-liner that's the canonical pattern.
3. **`@types/react` pinned `^19.2.18`** instead of inferred `^19`. Reason: tier2-ai-chat summary noted react-markdown needed exact types; storefront components touch props heavily.
4. **`jsdom` at `^30.0.0`** instead of latest. Reason: tier1-standard + tier2-mobile both pin 30; consistent across tier2 family.
5. **`pg-mem` at `^3.0.5`** added as `optionalDependencies`. Reason: dev-only; production deploys use real Postgres. Required for `tests/seed.test.ts` to run on Windows.
6. **`@medusajs/admin-sdk` is NOT a dep.** Reason: Path B doesn't customize the admin dashboard; the shipped Medusa admin is reachable at `/app` with no extra code. Defer to maintainer; add only if custom widgets needed.
7. **`scripts/start-medusa-backend.ps1` NOT shipped.** Reason: tier2-mobile has the analog (`scripts/expo-doctor.sh` + `scripts/cap-doctor.sh`) because Expo/Capacitor need warm boot probes. Medusa needs only `medusa develop` (or `npm run dev:backend`); no equivalent "doctor" probe required.
8. **`src/types/optional-modules.d.ts` ships in storefront.** Reason: tier2-mobile established this pattern for dynamic imports; storefront mirrors it (webhook + checkout both dynamically check env vars).

**No drift register rows added.** The Next 15 (vs matrix Next 16) override is recorded in `tier.config.json` `deliberateOverrides.nextVersion` — not a drift row, it's a documented user override.

---

## 2026-08-14 — D-003 — Chub citations & gaps

**Authored by:** coder (Phase 3.4 of T-2026-08-14-001).

**chub coverage:** None of the storefront-stack packages have chub docs (verified 2026-08-14):
- `medusa/medusa` → "No doc or skill found"
- `@medusajs/medusa` → empty
- `next` → empty
- `react` → empty
- `stripe` → empty
- `zod` → empty
- `tailwindcss` → empty

**Fallback used:** `npm view <pkg> version` (live registry calls; canonical for npm-published packages). Dossier pins cross-checked against `npm view <pkg> version` + `npm view <pkg> peerDependencies` before being written to `package.json`.

**Future chub work:** If chub grows storefront-stack docs, re-run `chub get medusa`, `chub get next`, `chub get stripe` and refresh `tier.config.json` `defaults` from chub's resolved versions.
