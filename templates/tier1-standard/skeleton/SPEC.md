# Build spec — restate-and-confirm artifact

**Date:** <YYYY-MM-DD>
**Template:** tier1-standard
**Selection-rule step:** <7 | FALLBACK> (dashboard/CRUD or when nothing else matches)

## App idea (your words)

> <verbatim user input>

## Axes (filled by intake)

| Axis | Answer | Default? | Notes |
|---|---|---|---|
| **Kind** | <Dashboard / CRUD / admin / internal tool / "manage X" / fallback> | 2 (Dashboard) | |
| **Tier** | 1 (Standard) | 1 | |
| **Data** | <browser-only / SQLite / hosted BaaS / serverless KV / external / none> | 2 (SQLite) | |
| **Auth** | <anyone / email+password / magic-link+OAuth / multi-tenant+roles> | 3 (magic-link+OAuth) | |
| **Locale** | <English LTR / Arabic RTL / Kurdish RTL / bilingual / other> | 1 (English LTR) | |
| **Scope (OUT of v1)** | <payments / notifications / realtime / search / uploads / charts / mobile-UX / i18n> | none | |

## Stack (per `02_STACK_MATRIX.md` tier1-standard block)

- React 19 + Vite 8 + TypeScript 5 (strict) + Tailwind v4
- Drizzle ORM + Postgres (driver wired by tier2-saas-bundle)
- shadcn primitives via `npx shadcn add <component>` (not a `package.json` dep)
- Vitest + @testing-library/react for the smoke test

## What I will build

- Multi-page React app with one backend (Drizzle + Postgres).
- One external service for auth (added by tier2-saas-bundle: Clerk).
- One CRUD surface per the user's "manage X" framing.
- Audit log on every write (`logCreate / logUpdate / logDelete` from `src/lib/audit.ts`).
- Smoke test rendering `<App />` and asserting the h1 text.

## What I will NOT build (per your scope answer)

- <bullet per out-of-scope answer>
- AI SDK streaming → tier2-ai-chat
- Mobile shell → tier2-mobile
- Commerce backend → tier2-storefront
- Stripe Billing → tier2-saas-bundle

## Confidence

<0.85+ = green / 0.7–0.85 = yellow, here are the gaps / <0.7 = red, ask more>

| Sub-axis | Confidence (0-1) |
|---|---|
| Kind | |
| Data | |
| Auth | |
| Locale | |
| **Mean** | |

## Tier 1 done-when (per `01_RECOMMENDED_DESIGN.md` Decision 6)

```bash
cd templates/tier1-standard/skeleton
npm install
npx tsc --noEmit
npm run build
npm test
node ../../scripts/verify-stack-claims.ts
```

All five must exit zero before this build is "done" for the Tier 1 spine.

**Reply "go" to start, or "change X to Y" to adjust.**
