# tier2-mobile — memory index

What this tier is for, who it serves, and the one-paragraph mental model.

## One-paragraph model

`tier2-mobile` is the mobile tier of the agent-app-template family. It is `tier1-standard` plus a **multi-target mobile shell**: two co-equal runtime targets picked at scaffold time via `mobile.config.ts` axis `mobile.target`. **`expo`** (default) = Expo SDK 57 + Expo Router + EAS Build + Clerk Expo + Supabase JS; **`capacitor`** = Capacitor 7 + `@capacitor/app` + native iOS/Android platform shells. The same UI layer (React Native primitives + Expo Router file structure) compiles to either target. When the user's idea is **mobile / iOS / Android / app store / react native / expo / capacitor** (selection-rule step 3), pick this tier and follow its `SKILL.md`.

The ~30 skeleton files are the load-bearing artifact: the skeleton must `tsc --noEmit && npm run build && npm test` exit zero on a fresh clone, the smoke test must render `<View />` + `<Text />` from the default route, the deepLinking tests must cover URL parsing for both Expo and Capacitor formats, and the doctor tests must verify the config files have the right structure (the actual `npx expo-doctor` / `npx cap doctor` invocations are deferred to a CI runner with JDK + Android SDK). Every `package.json` dep must cite `chub get <id>` (Q5 hard rule) or pass `npm view <pkg> version` against the dossier.

## Memory files in this directory

| File | Purpose | Loaded when |
|---|---|---|
| `index.md` | This file — what this tier is for. | Tier picked. |
| `dos-and-donts.md` | Distilled rule list. | Before any `edit` call. |
| `reference-projects.md` | One canonical example (no code copy). | Before scaffolding. |

## What this tier inherits (do not re-derive)

- **Tier 1 base spine** from `templates/tier1-standard/` (file layout, tsconfig, vitest config, cn() helper, Tailwind v4 CSS-first `@theme` block).
- **Mobile minimum-viable feature set** from `02_STACK_MATRIX.md` mobile row:
  - Auth (Apple/Google sign-in + email; mandatory for non-trivial apps).
  - Deep linking (mandatory for sharing, push, "open this page in app").
  - Offline cache of last-fetched data (mandatory).
  - App icon + splash + bundle ID + store metadata (mandatory before any "ship" moment).
  - App Store + Play Store builds via EAS (mandatory for production).
  - Push notifications (optional but expected).
  - OTA updates via `expo-updates` (optional; cheap to add).
  - `app.json` privacy manifests (Apple rejects without `NSPrivacyAccessedAPITypes`).
- **Two-target toggle** from `mobile.config.ts` (runtime-readable, single source of truth).

## What this tier does NOT cover (deferred to tier2 + follow-up)

- AI chat on mobile → `tier2-ai-chat` + this template's runtime shell.
- Real-device boot + simulator boot (**DEFERRED** — no Apple Developer account on Windows; no Android SDK installed; tracked in `SPEC.md` `## Deferred items`).
- Commerce backend (Shopify / Medusa) → `tier2-storefront`.
- Stripe Billing + auth flows → `tier2-saas-bundle`.
- Static landing pages → `cinematic-landing`.
- ~150-line brochure sites → `tier0-minimal`.
- Tier 1 CRUD dashboards → `tier1-standard` (or `tier1-standard + admin layer`).

## See also

- `../SKILL.md` — Anthropic Skills Level 1+2 instructions.
- `../prompts/intake-standard.md` — the intake prompt with the `mobile.target` axis.
- `../decisions/decision-log.md` — append-only decision log.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 2 — canonical mobile pins (READ-ONLY).
- `../tier1-standard/SKILL.md` — parent spine (READ for conventions).
- `../tier2-ai-chat/SKILL.md` — sibling Tier 2 (dual-path AI chat; mirror for the dual-target pattern).
