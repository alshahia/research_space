---
name: tier2-mobile
description: Tier 2 mobile template. Multi-target: Expo SDK 57 OR Capacitor 7, toggled at intake via `mobile.config.ts`. Same UI layer (React Native + Expo Router), two runtime shells. Cite selection-rule step 3 (mobile/iOS/Android/app store/react native/expo/capacitor) when picking this template.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch
triggers: tier2, mobile, ios, android, react native, expo, capacitor, eas, app store, play store
selection-rule: [3]
version: 0.1.0
---

## Purpose

Tier 1 spine + **multi-target mobile shell**. Two co-equal runtime targets picked at scaffold time via `mobile.config.ts` axis `mobile.target`:

- **`expo`** (default) — Expo SDK 57 + Expo Router + EAS Build + Clerk Expo + Supabase JS. Native iOS/Android via React Native.
- **`capacitor`** — Capacitor 7 + `@capacitor/app` + `@capacitor/ios` + `@capacitor/android`. Web bundle wrapped as a native shell.

When the user's idea is **mobile / iOS / Android / app store / react native / expo / capacitor** (selection-rule step 3), pick this template.

## When to use

Pick `tier2-mobile` when the build is a mobile app. The shell choice is the load-bearing fork; the same UI layer (React Native primitives + Expo Router file structure) compiles to either target. For pure web apps, pick `tier1-standard`. For dashboards, pick `tier1-standard + admin layer`. For commerce, pick `tier2-storefront`. For AI chat on mobile, pick `tier2-ai-chat` + this template's runtime shell.

## Two-target setup

`mobile.config.ts` is the **runtime-readable** single source of truth for the active target. The file imports `tier.config.json` and exports a strongly-typed `mobileConfig` object. Every other module (deepLinking, scripts, tests) reads from `mobile.config.ts` — never re-reads `tier.config.json` directly.

- **Expo target:** installs `expo`, `expo-router`, `expo-linking`, `expo-updates`, `expo-status-bar`, `react-native-safe-area-context`, `react-native-screens`, `@clerk/expo`, `lucide-react-native`. The Expo manifest is `app.json`; the EAS Build config is `eas.json`. Universal links configured via `expo-linking`'s `Linking.parse(url)`.
- **Capacitor target:** installs `@capacitor/core`, `@capacitor/cli`, `@capacitor/app`, `@capacitor/ios`, `@capacitor/android`, `@capacitor/haptics`, `@capacitor/keyboard`. The Capacitor config is `capacitor.config.ts` (`appId`, `appName`, `webDir: "dist"`). Universal links via `@capacitor/app`'s `App.addListener('appUrlOpen', ...)` + `App.getLaunchUrl()`.

Both paths share `src/lib/supabase.ts` (Supabase client init) and `src/lib/deepLinking.ts` (URL → route parser + platform-specific adapter). The adapter function uses dynamic imports so the bundle doesn't ship both SDKs.

**Default target:** `expo` (dossier recommendation; EAS Build + native signing handles the iOS/Android workflow). Users flip `mobile.config.ts target` to `capacitor` when they want a web-hybrid shell without React Native.

## Stack pins (verified 2026-08-14, see `02_STACK_MATRIX.md` tier2-mobile block)

- Inherits all `tier1-standard` pins: `react ^19.2.8`, `react-dom ^19.2.8`, `drizzle-orm ^0.45.2`, `tailwindcss ^4.3.3`, `typescript ^5.9.3`, `vite ^8.2.1`, `vitest ^4.1.10`, `@vitejs/plugin-react ^6.0.5`.
- `expo ^57.0.12` [S10] — Expo SDK 57 (Expo target).
- `expo-router ^57.0.12` (bundled with Expo 57).
- `expo-linking ^57.0.5` (dekinking parser).
- `expo-updates ^57.0.13` (OTA updates, optional via `mobile.featureFlags.otaUpdates`).
- `expo-status-bar ^57.0.1` (status bar styling).
- `react-native ^0.87.0` (bundled with Expo 57).
- `react-native-safe-area-context ^5.9.0` (bundled).
- `react-native-screens ^4.27.0` (bundled).
- `@clerk/expo ^4.2.8` [S5] (Expo target; latest 4.2.8 vs dossier pin 4.2.7 — one patch newer, accepted).
- `@supabase/supabase-js ^2.112.3` [S13] (both targets; shared client).
- `lucide-react-native ^1.31.0` (bundled via Expo).
- `@capacitor/core ^7.6.8` (Capacitor target; dispatch overrides dossier's `^8.5.0` to `^7.6.8`).
- `@capacitor/cli ^7.6.8` (Capacitor target).
- `@capacitor/app ^7.1.2` (deep linking).
- `@capacitor/ios ^7.6.8` (iOS platform).
- `@capacitor/android ^7.6.8` (Android platform).
- `@capacitor/haptics ^7.0.5` (native haptics).
- `@capacitor/keyboard ^7.0.6` (keyboard handling).

**Deviation noted:** the spec scope mentions "Capacitor 7" but the 02_STACK_MATRIX.md pins `^8.5.0`. The dispatch explicitly overrides to Capacitor 7. The pins above reflect the dispatch (`^7.6.8`). The dossier pin change is a Phase 3.3 follow-up; not blocking this dispatch.

## Standing rules (apply to every Tier 2 mobile build)

1. **`SPEC.md` before code.** User picks `mobile.target` (`expo` / `capacitor`; default `expo`) at intake. SPEC.md template includes the toggle axis.
2. **`mobile.config.ts` is the single source of truth for the active target.** Never re-read `tier.config.json` directly in feature code.
3. **`deepLinking.ts` is the single source for URL parsing.** Both paths use `parseDeepLink(url)` (pure function, fully testable). The adapter function `registerDeepLinkHandler(handler)` handles the platform-specific listener.
4. **`supabase.ts` is the single source for the Supabase client.** Both paths import the same client; only the runtime environment differs.
5. **Mobile-default deps are listed as `optionalDependencies` in `package.json`.** `npm install` succeeds without the platform SDKs; the postinstall script (or `scripts/switch-target.sh`) refreshes deps for the active target.
6. **Run `tsc --noEmit && npm run build && npm test` after every edit batch.** Tier 2 mobile done-when.
7. **Run `node scripts/verify-stack-claims.ts` after every `package.json` write.** Drift gate.
8. **Cite `chub get <id>` for every new dep in the coder summary.** Q5 hard rule.
9. **Real-device boot + simulator boot are DEFERRED.** No Apple Developer account on the Windows verifier; no Android SDK installed. Document in `SPEC.md` `## Deferred items`. The `expo-doctor` and `cap-doctor` scripts verify the config files locally; the actual `npx expo-doctor` / `npx cap doctor` invocations require the full SDK install (Phase 3.3 follow-up on a CI runner with JDK + Android SDK + Xcode).
10. **No `expo` or `capacitor` CLIs globally installed.** Use `npx` only (per dispatch constraint).

## Done (Tier 2 mobile definition-of-done)

The Tier 2 mobile build is done when **all** of the following exit zero on a fresh clone:

```bash
cd templates/tier2-mobile/skeleton
npm install                                              # optional deps may be skipped
npx tsc --noEmit
npm run build                                            # web build target (Capacitor wraps; Expo is SPA fallback)
npm test                                                 # smoke + deepLinking + mobile-config-toggle + expo-doctor + cap-doctor
node ../../scripts/verify-stack-claims.ts                # workspace root drift gate
```

Per-test detail:

- `tests/smoke.test.ts` — renders the default route (home tab) via `<RootLayout>` + `<HomeTab>`. Asserts `<View />` and `<Text />` render + locale text + active target indicator.
- `tests/deepLinking.test.ts` — unit tests for `parseDeepLink(url)` (Expo + Capacitor URL formats) + adapter-path stubs (mock the dynamic imports).
- `tests/mobile-config-toggle.test.ts` — reads `mobile.config.ts` + asserts the active target matches `tier.config.json`; logs node_modules size delta for the active target's deps (informational only; skip if not installed).
- `tests/expo-doctor.test.ts` — reads `app.json` and asserts `expo.ios.bundleIdentifier` + `expo.android.package` + `expo.android.adaptiveIcon` shape. Skips the actual `npx expo-doctor` invocation with a documented reason (requires full Expo SDK install = GB-scale, deferred to CI). Pass condition: config files have the right structure.
- `tests/cap-doctor.test.ts` — reads `capacitor.config.ts` and asserts `appId`, `appName`, `webDir: "dist"` + the optional `ios`/`android` blocks. Skips the actual `npx cap doctor` invocation with a documented reason (requires JDK 21 + Android SDK; Windows host has neither). Pass condition: config file has the right shape.

`verify-stack-claims.ts` — every dep with a matching `[Sn]` in `02_STACK_MATRIX.md` satisfies the caret range (or appears in `share/notes/03_drift_register_T-2026-08-14-001.md`).

## Failure handling

If any of the above exits non-zero:
1. Re-read the failing command's output.
2. Identify the smallest change that addresses the failure.
3. Apply via `edit` (no rewrites).
4. Re-run the failing command.
5. Cap at 3 retries per command; after that, stop and report partial state to master with the verbatim error.

## Out of scope for this template

- AI SDK / streaming chat on mobile → `tier2-ai-chat` + this template's runtime shell.
- Commerce backend (Shopify / Medusa) → `tier2-storefront`.
- Stripe Billing + auth flows → `tier2-saas-bundle`.
- Static landing pages → `cinematic-landing`.
- ~150-line brochure sites → `tier0-minimal`.
- Real-device + simulator boot (deferred; this dispatch scaffolds the runtime shell only).

## Files in scope (the load-bearing artifact)

Skeleton files (~30):

**Config / meta (8):**
1. `package.json` — both target dep sets (Expo + Capacitor) as `optionalDependencies`; toggle-aware postinstall.
2. `tsconfig.json` — strict TS (mirrors tier1).
3. `vite.config.ts` — Vite + React + Tailwind v4 (web build target; Capacitor wraps the `dist/` output).
4. `vitest.config.ts` — Vitest preconfigured (jsdom env + `@testing-library/react`).
5. `mobile.config.ts` — runtime-readable toggle (`target: "expo" | "capacitor"`).
6. `tier.config.json` — `mobile.target` + `mobile.deepLinkScheme` + `mobile.appId` + `mobile.appName` + locale/dir/font.
7. `.env.example` — `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `EXPO_PUBLIC_*` (Expo), `CAPACITOR_*` (Capacitor).
8. `SPEC.md` — restate-and-confirm template (includes `mobile.target` axis).

**Expo target only (3):**
9. `app.json` — Expo manifest with `ios.bundleIdentifier`, `android.package`, `android.adaptiveIcon`, `plugins: ["expo-router"]`, `experiments.typedRoutes`.
10. `eas.json` — EAS Build profiles (development / preview / production).
11. `scripts/expo-doctor.sh` — wraps `npx expo-doctor` (skipped on Windows; the test verifies config shape instead).

**Capacitor target only (2):**
12. `capacitor.config.ts` — `appId`, `appName`, `webDir: "dist"`, optional `ios`/`android` blocks.
13. `scripts/cap-doctor.sh` — wraps `npx cap doctor` (skipped on Windows; the test verifies config shape instead).

**App routes (Expo Router file structure, 3):**
14. `app/_layout.tsx` — Expo Router root layout; wraps `<View>` + `<Text>` primitives.
15. `app/(auth)/sign-in.tsx` — sign-in route (minimal stub; Clerk integration lives in the Clerk Expo flow).
16. `app/(tabs)/index.tsx` — home tab (default route).

**Shared `src/` (5):**
17. `src/main.tsx` — Vite entry; mounts `<RootLayout>` + `<HomeTab>` into `#root`.
18. `src/index.css` — Tailwind v4 CSS-first `@theme` block.
19. `src/lib/supabase.ts` — Supabase client init (shared).
20. `src/lib/deepLinking.ts` — `parseDeepLink(url)` (pure) + `registerDeepLinkHandler(handler)` (adapter with dynamic imports).
21. `src/App.tsx` — re-export of `<RootLayout>` for Vite entry compatibility.

**Tests (5):**
22. `tests/smoke.test.ts` — renders default route + `<View>` + `<Text>`.
23. `tests/deepLinking.test.ts` — `parseDeepLink` cases + adapter stubs.
24. `tests/mobile-config-toggle.test.ts` — reads `mobile.config.ts` + checks active target deps.
25. `tests/expo-doctor.test.ts` — reads `app.json` for bundle ID / package / adaptiveIcon.
26. `tests/cap-doctor.test.ts` — reads `capacitor.config.ts` for appId / appName / webDir.

**Scripts (1):**
27. `scripts/switch-target.sh` — flips `mobile.config.ts` target + re-runs `npm install` (cross-platform; spawns `npm.cmd` on Windows).

Plus meta files (4):
- `memory/{index,dos-and-donts,reference-projects}.md`
- `prompts/intake-standard.md`
- `decisions/decision-log.md`

## Pointers

- `memory/dos-and-donts.md` — distilled rules, distilled from the dossier + the Phase 3.3 spec.
- `memory/reference-projects.md` — one canonical Tier 2 mobile example.
- `prompts/intake-standard.md` — intake prompt with the `mobile.target` axis.
- `decisions/decision-log.md` — append-only.
- `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 2 — canonical mobile pins (READ-ONLY).
- `templates/tier1-standard/SKILL.md` — parent spine (READ for conventions).

## Versioning

This `SKILL.md` follows the Anthropic Skills Level 1 / Level 2 / Level 3 split. Bumping this template = PR to `SKILL.md` + `package.json` + `CHANGELOG.md` (template root or workspace).
