# agent-app-template family

A 7-template scaffold family for shipping full-stack apps with an AI agent. Each template is a runnable Next.js / Astro / Vite / Expo skeleton with auth, DB, and build wired, picked via a 13-step deterministic decision tree so the agent never has to guess.

## The 7 templates

| # | Folder | Tier | What it is |
|---|---|---|---|
| 1 | [`tier0-minimal/`](./tier0-minimal/SKILL.md) | 0 | ~150-line Astro fallback when nothing else matches |
| 2 | [`tier1-standard/`](./tier1-standard/SKILL.md) | 1 | Next.js 16 + Tailwind v4 + Drizzle + Clerk wiring - the base |
| 3 | [`cinematic-landing/`](./cinematic-landing/SKILL.md) | specialist | 5-7s hero + scroll pattern, AA contrast verified |
| 4 | [`tier2-ai-chat/`](./tier2-ai-chat/SKILL.md) | 2 | Vercel AI SDK 7 + streaming + multi-turn persistence |
| 5 | [`tier2-mobile/`](./tier2-mobile/SKILL.md) | 2 | Expo SDK 57 OR Capacitor 7, toggled at intake |
| 6 | [`tier2-storefront/`](./tier2-storefront/SKILL.md) | 2 | Headless commerce - Shopify Path A default, Medusa Path B (RE-GATE) |
| 7 | [`tier2-saas-bundle/`](./tier2-saas-bundle/SKILL.md) | 2 | tier1 + Stripe Billing + Resend + webhook signature |

Tier2-tooling (extension / bot / CLI) was dropped per Q1 D - rebuild as a layer on tier1 if ever needed.

## Quick start

1. Read `AGENTS.md` for the 13-step selection rule. Always cite the matching step in the summary.
2. Open the chosen template's `SKILL.md`. Follow its intake prompt (in `prompts/intake-<tier>.md`).
3. Copy `skeleton/` to your app dir. Customise `tier.config.json` for locale, dir, font.
4. `npm install && npm run build && npm test` exits 0 = done for that template's tier-1 definition-of-done.
5. Every `package.json` write must include `chub get <id>` in the coder summary (v0.22.0+).

## Operational pointers

- **`templates/AGENTS.md`** - family-root standing instructions, the selection rule, and the template index (this is what `/init` lands on).
- **`templates/registry.json`** - machine-readable `{tiers, kinds, routing}` for tooling that wants to query the selection rule.
- **`templates/CHANGELOG.md`** - family-wide changes (first entry = Phase 3 ship).
- **`templates/MIGRATION.md`** - link from this root to the archived `resources/_archived/general-app-template/`.
- **`MAINTAINERS.md`** (workspace root) - quarterly maintainer + 1-2 days/quarter budget.
- **`scripts/verify-stack-claims.ts`** (workspace root) - drift gate; runs weekly + on every `package.json` write.

## Source of truth for stack pins

`research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` is the canonical version table (READ-ONLY per `AGENTS.md`). Every package version cited in any template's `SKILL.md` must cite the matching `[Sn]` from that matrix. The `verify-stack-claims.ts` script enforces this on every drift check.

## Migration from the old template

This root replaces the prior `resources/general-app-template/` (now archived). See `templates/MIGRATION.md`. The selection rule documented above is locked; if you want to change the template count or the routing, that is a `templates/AGENTS.md` PR first, not a silent code change.
