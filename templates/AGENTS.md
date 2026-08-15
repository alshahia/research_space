# AGENTS.md - agent-app-template family

This folder IS the **agent-app-template family**: 7 runnable scaffolds an agent picks between to ship a full app. Each template ships `SKILL.md` (Anthropic Skills Level 1 metadata + Level 2 instructions) plus `skeleton/`, `memory/`, `prompts/`, `decisions/` per the Anthropic Skills 3-level model. One template per kind, not per feature. The router runs a 13-step deterministic decision tree (below) and cites the matching step.

`research/`, `research_doc/`, `agents_manager/`, and `resources/_archived/` are READ-ONLY. New work goes under `templates/<name>/skeleton/`. The verification gate `scripts/verify-stack-claims.ts` (workspace root) exits non-zero when a pinned version in `02_STACK_MATRIX.md` drifts from `npm view <pkg> version`. Run it after every `package.json` write.

## The 7 templates

| # | Folder | Tier | One-line description |
|---|---|---|---|
| 1 | `tier0-minimal/` | 0 | ~150-line Astro app, 1 generated route, fallback when nothing else matches |
| 2 | `tier1-standard/` | 1 | Next.js 16 + Tailwind v4 + Drizzle + Clerk wiring, the base every tier2 inherits |
| 3 | `cinematic-landing/` | specialist | 5-7s hero + scroll pattern, AA contrast verified, copy-with-rebrand of an exemplar |
| 4 | `tier2-ai-chat/` | 2 | AI SDK 7 + streaming chat + multi-turn persistence + markdown pipeline |
| 5 | `tier2-mobile/` | 2 | Multi-target: Expo SDK 57 OR Capacitor 7, toggled at intake via `mobile.config.ts` |
| 6 | `tier2-storefront/` | 2 | Headless commerce (Shopify Path A default; Medusa Path B - RE-GATE at Phase 3.4) |
| 7 | `tier2-saas-bundle/` | 2 | tier1 + Stripe Billing + Resend + webhook signature verification |

**Build order** (locked, Q2 B + Q8 modifier): tier1 (3.1) → ai-chat (3.2) → mobile (3.3) → storefront (3.4) → saas-bundle (3.5) → cinematic-landing (3.6) → tier0-minimal (3.7). The `tier2-tooling/` kind was DROPPED per Q1 D; bot/CLI/extension fold into tier1 + a layer if ever needed.

## The selection rule (13-step deterministic decision tree)

Run these in order; first match wins; fallback is `tier0-minimal`. The agent MUST cite the matching step number in its summary. ~13 string contains, no LLM call, <1ms.

| Step | If the idea mentions... | Pick |
|---|---|---|
| 1 | single page, landing, marketing, "about me", "product page" | `cinematic-landing` |
| 2 | chat, assistant, GPT, Claude, LLM, AI, copilot, agent (in chat sense) | `tier2-ai-chat` |
| 3 | mobile, iOS, Android, app store, react native, expo, capacitor | `tier2-mobile` |
| 4 | store, shop, checkout, cart, product, inventory, e-commerce | `tier2-storefront` |
| 5 | auth, sign in, user accounts, subscription, billing, SaaS, MRR | `tier2-saas-bundle` (promoted from tier1+layer per Q8) |
| 6 | docs, documentation, blog, changelog, marketing site, content | `tier1-standard + content layer` (Astro) |
| 7 | dashboard, admin, CRUD, back-office, internal tool, manage X | `tier1-standard + admin layer` |
| 8 | live, real-time, multiplayer, collaborative, co-edit | `tier1-standard + realtime layer` |
| 9 | API, endpoint, SDK, developer tool, GraphQL gateway | `tier1-standard + api layer` |
| 10 | extension, chrome extension, firefox extension | `tier1-standard + extension layer` *(kind dropped per Q1 D; rebuild as a layer on demand)* |
| 11 | bot, discord bot, slack bot, chatbot (not LLM) | `tier1-standard + bot layer` *(kind dropped per Q1 D; rebuild as a layer on demand)* |
| 12 | CLI, command-line, terminal tool, npm package (binary) | `tier1-standard + cli layer` *(kind dropped per Q1 D; rebuild as a layer on demand)* |
| 13 | agent (autonomous, multi-step, tool-using, "do X for me") | `tier1-standard + tier2-ai-chat` (ToolLoopAgent from AI SDK 7) |
| FALLBACK | nothing matches | `tier0-minimal` + flag `NEEDS_USER_INPUT: what-kind-of-app` |

**Why this order.** The kind with the most distinctive runtime (mobile, storefront, AI chat) wins over generic feature flags (auth, billing). Tier1 base stays one template; a "tier1-mobile" or "tier1-shipping-cart" is rejected per `02_STACK_MATRIX.md` §Overlap analysis (8 templates is the smallest N that still lets each kind specialize its runtime).

## Standing rules

- **No new templates without amending this file.** Adding a tier = PR to `templates/AGENTS.md` + `templates/registry.json` first.
- **No `package.json` writes without `chub get <id>` in the summary.** v0.22.0+ controller rule. See `agents_manager/SKILL.md` §Context-hub protocol.
- **Run `node scripts/verify-stack-claims.ts` after every `package.json` write.** Drift gate; same script runs weekly via `.github/workflows/verify-stack-claims.yml` (created in Phase 3.1+).
- **Append to `decisions/decision-log.md` per template.** Append-only; per-`01_RECOMMENDED_DESIGN.md` Decision 5.
- **Use `tier.config.json` for app-level (not framework) config.** `locale`, `dir`, `font`, feature flags. Identical shape across all 7 templates.
- **Match existing style.** Read the prior template's `SKILL.md` first. Same Anthropic Skills 1/2/3 split everywhere.

## Pointers

- `templates/CLAUDE.md` - short alias for Claude Code's `/init`.
- `templates/README.md` - human entry point.
- `templates/registry.json` - machine-readable version of the selection rule (tiers, kinds, routing).
- `templates/CHANGELOG.md` - family-wide changes.
- `templates/MIGRATION.md` - from this root to `resources/_archived/general-app-template/`.
- `MAINTAINERS.md` (workspace root) - who owns quarterly updates.
- `scripts/verify-stack-claims.ts` (workspace root) - drift gate.
- `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` - canonical version pins (READ-ONLY).
