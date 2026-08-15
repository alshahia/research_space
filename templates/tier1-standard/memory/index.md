# tier1-standard — memory index

What this tier is for, who it serves, and the one-paragraph mental model.

## One-paragraph model

`tier1-standard` is the **base spine** of the agent-app-template family. It is the Vite + React + TypeScript + Tailwind v4 + Drizzle + Vitest scaffold that every Tier 2 template (ai-chat, mobile, storefront, saas-bundle, cinematic-landing) either extends or borrows conventions from. When the user's idea is **multi-page, one backend, one external service** (selection-rule step 7 — dashboard / CRUD / admin / "manage X"), pick this tier and follow its `SKILL.md`.

The 17 files are the load-bearing artifact: the skeleton must `npm install && npm run build && npm test` exit zero on a fresh clone, the smoke test must render `<App />`, and every `package.json` dep must cite `chub get <id>` (Q5 hard rule) with the matching `[Sn]` from `02_STACK_MATRIX.md`.

## Memory files in this directory

| File | Purpose | Loaded when |
|---|---|---|
| `index.md` | This file — what this tier is for. | Tier picked. |
| `dos-and-donts.md` | Distilled rule list (reverses the "no tests" rule from the old `resources/general-app-template/`; locks "comments on exports OK"; locks `cn()` as the only classname helper). | Before any `edit` call. |
| `reference-projects.md` | One canonical example (a real Tier 1 app, no code copy-paste). | Before scaffolding. |

## What this tier inherits (do not re-derive)

- **Router-first reading** from `templates/AGENTS.md` (family root).
- **13-step selection rule** — this tier is step 7 (dashboard/CRUD) and FALLBACK (when nothing else matches but the user wants more than `tier0-minimal`).
- **Intake protocol** from `04_INTAKE_PROTOCOL.md` — 5-6 fixed axes, 1-3 adaptive, hard cap 8.
- **Verification gate** from `scripts/verify-stack-claims.ts` — run after every `package.json` write.
- **Audit-log pattern** from the old `resources/_archived/general-app-template/APP_ARCHITECTURE_GUIDE.md:566-588` (recovered per `06_TEMPLATE_AUDIT.md` Part 2; rewritten in `src/lib/audit.ts` as kind-agnostic, not WatermelonDB-coupled).

## What this tier does NOT cover (deferred to tier2)

- Streaming chat (AI SDK) → `tier2-ai-chat`.
- Mobile shell (Expo / Capacitor) → `tier2-mobile`.
- Commerce backend → `tier2-storefront`.
- Stripe Billing + auth → `tier2-saas-bundle`.
- Static landing pages → `cinematic-landing`.
- ~150-line brochure site → `tier0-minimal`.

## See also

- `../SKILL.md` — Anthropic Skills Level 1+2 instructions.
- `../prompts/intake-standard.md` — the 4-6 axis intake prompt.
- `../decisions/decision-log.md` — append-only decision log (per `01_RECOMMENDED_DESIGN.md` Decision 5).
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` — canonical version pins (READ-ONLY).
