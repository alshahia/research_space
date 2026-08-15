# tier1-standard — reference projects

One canonical Tier 1 example. Read before scaffolding. **No code copy-paste — the example is a reference shape, not a template.**

## The example

**Cal.com** (cal.com) — open-source scheduling app. Multi-page (dashboard, booking pages, settings, integrations), one backend (Prisma + Postgres), one external service (Google Calendar OAuth via NextAuth). Production-tier 1 build that has scaled to 100k+ MAU.

Why this is a good Tier 1 reference:

- **App Router-ish structure.** Each route is a self-contained module (list / create / edit / delete). Tier 1 standard encourages the same shape — `src/app/<route>/page.tsx` for production, or `src/pages/<route>` for the Vite-shaped spine.
- **Server-side auth check at the API level, not just UI.** Tier 1's `src/lib/auth.ts` (added by tier2-saas-bundle) follows the same pattern.
- **Audit log for every write.** The audit-log pattern in `src/lib/audit.ts` is the kind-agnostic version of Cal.com's write-side logging (originally WatermelonDB-coupled in the old `resources/general-app-template/`; rewritten here as a generic adapter).
- **Drizzle migrations under `drizzle/`.** Same shape as Cal.com's `prisma/migrations/`. `drizzle-kit generate` + `drizzle-kit migrate` is the runnable equivalent.

## What to copy from the example

- **Route module shape.** `<route>/page.tsx` (or `index.tsx` for the Vite spine) for the list view; `<route>/new` for create; `<route>/[id]` for detail.
- **Provider nesting at the root.** `<ClerkProvider>` → `<DatabaseProvider>` → `<App />` (Clerk added by tier2-saas-bundle; the spine uses a stub).
- **Audit-log every write.** `await logCreate('user', newUser.id)` after every `INSERT`; `await logUpdate(...)` after every `UPDATE`.
- **`cn()` for classnames.** Same helper, same shape (`clsx` + `tailwind-merge`).

## What NOT to copy

- **The full source code.** Cal.com is ~50k LOC; Tier 1 is ~2,500 LOC per `01_RECOMMENDED_DESIGN.md` Decision 4.
- **Prisma over Drizzle.** Cal.com uses Prisma; the spine uses Drizzle (per `02_STACK_MATRIX.md` `tier1-standard` block). Swap is mechanical — schema is schema.
- **NextAuth over Clerk.** Cal.com uses NextAuth; the spine uses Clerk (per the same block). Swap is mechanical.
- **Their exact route map.** Cal.com's routes are scheduling-specific; Tier 1 is generic — the user fills in the route map per `SPEC.md`.

## Other examples worth skimming (for shape, not code)

- **Vercel** (`vercel.com/dashboard`) — multi-tenant dashboard with RBAC at the API layer.
- **Linear** (`linear.app`) — list / detail / edit shape; keyboard-driven; the routing structure is a good fit for the Tier 1 spine.
- **Railway** (`railway.app/dashboard`) — server-side rendering + heavy interactivity; demonstrates the Vite + React + TS spine rendering at scale.

## The 1 thing that breaks Tier 1 most often

Forgetting the audit-log wrapper. Every write MUST go through `logCreate / logUpdate / logDelete`. Skipping this is the single most common Tier 1 bug per the dossier's "agent failure modes" inventory (`02_STACK_MATRIX.md` per-kind rows).

## See also

- `index.md` — what this tier is for.
- `dos-and-donts.md` — distilled rule list.
- `../SKILL.md` § Done — Tier 1 definition-of-done.
- `../../../research/agent-app-templates-2026-08-13/01_RECOMMENDED_DESIGN.md` — Decision 4 (tier map), Decision 6 (definition-of-done).
