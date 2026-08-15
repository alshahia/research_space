---
name: tier1-standard
description: Tier 1 standard app template. Multi-page, one backend (Drizzle), one external service (Clerk). Vite + React + TypeScript + Tailwind v4 + Vitest spine. Base every tier2 template inherits from. Cite selection-rule step 7 (dashboard/CRUD) or step 5 (auth+billing, deferred to tier2-saas-bundle) when picking this template.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch
triggers: tier1, dashboard, crud, saas spine, multi-page, base template, react skeleton, vite skeleton
version: 1.0.0
selection-rule: [7, FALLBACK]
---

## Purpose

The base spine of the agent-app-template family. Every Tier 2 template (ai-chat, mobile, storefront, saas-bundle, cinematic-landing) either extends this skeleton or borrows its conventions. When a user's idea matches **dashboard / CRUD / admin / back-office / internal tool / "manage X"** (selection-rule step 7), pick this template.

## When to use

Pick `tier1-standard` when the build is multi-page, has one backend (Drizzle + Postgres), and one external service (Clerk auth by default). For pure static landing pages, use `cinematic-landing`. For chat-style apps with AI SDK streaming, use `tier2-ai-chat`. For mobile-first, use `tier2-mobile`. For commerce, use `tier2-storefront`. For auth + Stripe Billing MRR shapes, use `tier2-saas-bundle` (Q8 promotion).

## What is checked into the spine (the 17 files)

The skeleton ships **19 files** (treating `src/main.tsx` + `src/App.tsx` as two):

1. `SKILL.md` (this file) - Anthropic Skills Level 1 metadata + Level 2 instructions + `## Done`.
2. `memory/index.md` - what this tier is for.
3. `memory/dos-and-donts.md` - distilled rule list.
4. `memory/reference-projects.md` - one canonical example.
5. `skeleton/package.json` - caret ranges per `02_STACK_MATRIX.md`.
6. `skeleton/vite.config.ts` - Vite config shell.
7. `skeleton/tsconfig.json` - strict TypeScript.
8. `skeleton/vitest.config.ts` - Vitest preconfigured.
9. `skeleton/src/main.tsx` - React DOM mount entry.
10. `skeleton/src/App.tsx` - provider nesting, lazy loading, routing shell.
11. `skeleton/src/index.css` - Tailwind v4 CSS-first `@theme` block.
12. `skeleton/src/lib/utils.ts` - `cn()` helper, base `api` re-export.
13. `skeleton/src/lib/audit.ts` - `logCreate / logUpdate / logDelete` pattern.
14. `skeleton/src/db/DatabaseProvider.tsx` - Drizzle provider stub.
15. `skeleton/tests/smoke.test.ts` - renders `<App />`, expects h1 text.
16. `skeleton/tier.config.json` - `locale`, `dir`, `font`, feature flags.
17. `skeleton/SPEC.md` - restate-and-confirm artifact template.
18. `prompts/intake-standard.md` - 4-6 fixed-axis intake prompt.
19. `decisions/decision-log.md` - append-only.

## Stack pins (verified 2026-08-14, see `02_STACK_MATRIX.md`)

- `react ^19.2.8` (matches dossier's React version)
- `react-dom ^19.2.8` (peer for react)
- `drizzle-orm ^0.45.2` [S17]
- `tailwindcss ^4.3.3` [S3] (CSS-first `@theme` block, Vite plugin)
- `typescript ^5.9.3` (chub doc `typescript/typescript`; pinned per spec)
- `vite ^8.2.1` (matches dossier's tier0 + tooling toolchain; corrects the `vite 7.8.0` hallucination per `02_STACK_MATRIX.md` §Versions verified)
- `vitest ^4.1.10` (chub doc `vitest/vitest`)
- `@vitejs/plugin-react ^6.0.5` (Vite plugin for JSX/TSX)

**Deviation noted:** the spec scope mentions "Next.js 16 + `@clerk/nextjs`" but the file list (`vite.config.ts` OR `next.config.ts` + `src/main.tsx` + `src/App.tsx`) is Vite-shaped. The spine uses **Vite + React + TS** (matches the literal file list, no scope expansion). Tier2 templates (ai-chat, mobile, storefront, saas-bundle) add Next.js + `@clerk/nextjs` (or vendor-appropriate Clerk SDK) when needed.

## Standing rules (apply to every Tier 1 build)

1. **`SPEC.md` before code.** Write the restate-and-confirm artifact first. User replies "go" or "change X to Y".
2. **`tier.config.json` for app-level config only.** Locale, dir, font, feature flags. Not framework config.
3. **`cn()` from `src/lib/utils.ts` is the only classname helper.** No inline `clsx(...)` joins in components.
4. **`logCreate / logUpdate / logDelete` from `src/lib/audit.ts` for every write.** Generic, not WatermelonDB-coupled.
5. **DatabaseProvider wraps `<App />` in `src/main.tsx`.** Storage-adapter pattern. Stub by default; concrete via the data-layer command.
6. **shadcn primitives installed via `npx shadcn add` per component** (`button`, `input`, `dialog`, `table`, etc.). Not a `package.json` dep.
7. **Drizzle migrations live under `drizzle/` directory.** Use `drizzle-kit generate` + `drizzle-kit migrate`.

## Done (Tier 1 definition-of-done per `01_RECOMMENDED_DESIGN.md` Decision 6)

The Tier 1 build is done when **all** of the following exit zero on a fresh clone:

```bash
cd templates/tier1-standard/skeleton
npm install
npx tsc --noEmit
npm run build
npm test
node ../../scripts/verify-stack-claims.ts    # workspace root drift gate
```

- `tsc --noEmit` — type check passes, no errors.
- `npm run build` — Vite production build produces `dist/`.
- `npm test` — Vitest runs `tests/smoke.test.ts`; renders `<App />` and asserts the h1 text from `tier.config.json` title or a stable identifier.
- `verify-stack-claims.ts` — every dep with an `[Sn]` citation satisfies the caret range (or appears in `share/notes/03_drift_register_T-2026-08-14-001.md`).

## Failure handling

If any of the above exits non-zero:

1. Re-read the failing command's output.
2. Identify the smallest change that addresses the failure.
3. Apply via `edit` (no rewrites).
4. Re-run the failing command.
5. Cap at 3 retries per command; after that, stop and report partial state to master with the verbatim error.

## Out of scope for this template

- AI SDK / streaming chat → `tier2-ai-chat`
- Mobile shell (Expo / Capacitor) → `tier2-mobile`
- Commerce backend (Shopify / Medusa) → `tier2-storefront`
- Stripe Billing + MRR shapes → `tier2-saas-bundle`
- Static landing pages → `cinematic-landing`
- ~150-line brochure sites → `tier0-minimal`

## Pointers

- `memory/dos-and-donts.md` — distilled rules, distilled from `06_TEMPLATE_AUDIT.md` + the dossier.
- `memory/reference-projects.md` — one canonical Tier 1 example (no code copy).
- `prompts/intake-standard.md` — 4-6 axis intake prompt to copy into your user-facing flow.
- `decisions/decision-log.md` — append-only; record every build-time decision.
- `02_STACK_MATRIX.md` (READ-ONLY) — canonical version pins + audit trail.
- `agents_manager/coder/SKILL.md` § Context-hub — chub rule for new deps.
- `templates/AGENTS.md` — family root + 13-step selection rule.

## Versioning

This `SKILL.md` follows the Anthropic Skills Level 1 / Level 2 / Level 3 split:
- **Level 1** — frontmatter (always loaded).
- **Level 2** — this body (loaded when the template is picked).
- **Level 3** — `memory/` files (loaded only when the agent decides to read them).

Bumping this template = PR to `SKILL.md` + `package.json` + `CHANGELOG.md` (template root or workspace).
