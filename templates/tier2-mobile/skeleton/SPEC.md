# Build spec — restate-and-confirm artifact

**Date:** <YYYY-MM-DD>
**Template:** tier2-mobile
**Selection-rule step:** <3> (mobile / iOS / Android / app store / react native / expo / capacitor)

## App idea (your words)

> <verbatim user input>

## Axes (filled by intake)

| Axis | Answer | Default? | Notes |
|---|---|---|---|
| **Kind** | <Mobile / iOS / Android / app store / react native / expo / capacitor> | 4 (Mobile) | |
| **Tier** | 2 | 2 | |
| **Mobile target** | <expo / capacitor> | expo | Expo SDK 57 (path A; EAS Build + native signing) OR Capacitor 7 (path B; web bundle wrapped). Toggle at intake via `mobile.config.ts` `mobile.target`. See `SKILL.md` §Two-target setup. |
| **Auth vendor** | <clerk / supabase / none> | clerk (Expo) / none (Capacitor) | Clerk Expo (`@clerk/expo`) for OAuth pre-wired; Supabase Auth for lower cost at scale. |
| **Data layer** | <supabase / drizzle / none> | supabase | `@supabase/supabase-js` for direct DB + auth + storage + realtime. |
| **Deep-link scheme** | <myapp:// / https://myapp.example.com> | myapp:// | Universal links require a hosted domain. |
| **Bundle ID** | <com.example.tier2mobile / your-domain.your-app> | com.example.tier2mobile | Apple/iOS reject builds without a valid `bundleIdentifier`. |
| **Locale** | <English LTR / Arabic RTL / Kurdish RTL / bilingual / other> | 1 (English LTR) | |
| **Scope (OUT of v1)** | <payments / notifications / realtime / search / uploads / charts / push / OTA> | none | |

## Stack (per `02_STACK_MATRIX.md` tier2-mobile block)

- Tier 1 spine: React 19 + Vite 8 + TypeScript 5 (strict) + Tailwind v4 + Drizzle + Vitest
- Expo target: `expo ^57.0.12` + `expo-router` + `expo-linking` + `expo-updates` + `expo-status-bar` + `react-native` + `@clerk/expo` + `@supabase/supabase-js`
- Capacitor target: `@capacitor/core ^7.6.8` + `@capacitor/cli` + `@capacitor/app` + `@capacitor/ios` + `@capacitor/android` + `@capacitor/haptics` + `@capacitor/keyboard`
- Shared: `src/lib/supabase.ts` + `src/lib/deepLinking.ts` (URL parser + platform-specific adapter)

## What I will build

- Multi-target mobile shell (Expo OR Capacitor) with the same UI layer.
- Expo Router file structure (`app/_layout.tsx`, `app/(auth)/sign-in.tsx`, `app/(tabs)/index.tsx`).
- Single Supabase client shared across both targets.
- `deepLinking.ts` with a pure `parseDeepLink(url)` function + a dynamic-import adapter for the platform-specific listener.
- `mobile.config.ts` runtime-readable toggle.
- `app.json` (Expo) + `eas.json` (Expo) + `capacitor.config.ts` (Capacitor) config files.
- Smoke test rendering `<View />` + `<Text />` from the default route.
- DeepLinking tests for both URL formats.
- Doctor tests verifying the config files have the right structure (the actual `npx expo-doctor` / `npx cap doctor` invocations are deferred).

## What I will NOT build (per your scope answer)

- <bullet per out-of-scope answer>
- AI chat on mobile → `tier2-ai-chat` + this template's runtime shell
- Commerce backend → `tier2-storefront`
- Stripe Billing → `tier2-saas-bundle`
- Real-device boot + simulator boot → **DEFERRED** (see `## Deferred items` below)

## Deferred items

The following are scoped OUT of this Phase 3.3 dispatch (per the dispatch constraint + the Windows host's toolchain limitations):

- **Real-device boot (iOS / Android).** No Apple Developer account on the Windows verifier; would require a Mac + Xcode + a connected iPhone. Documented; production deploy follows the standard `eas build --profile production` (Expo) or `npx cap run ios` / `npx cap run android` (Capacitor) flow.
- **Simulator boot (iOS Simulator / Android Emulator).** Windows host has no Xcode (iOS Simulator) and no Android SDK (Android Emulator). The smoke test renders the UI in jsdom via the Vite build; visual verification requires a follow-up on a Mac.
- **Android SDK + JDK 21 setup.** `npx cap doctor` requires JDK 21 + Android SDK + Gradle. The Windows host has neither. The cap-doctor test verifies the config file shape only; the actual `npx cap doctor` invocation is deferred to a CI runner provisioned with the toolchain.
- **Full Expo SDK install.** `npx expo-doctor` requires the full Expo SDK (~500MB+; pulls in native iOS/Android toolchains). The expo-doctor test verifies the config file shape only; the actual `npx expo-doctor` invocation is deferred to a CI runner with the SDK installed.
- **Universal links configuration with a real domain.** The default `myapp://` scheme + `com.example.tier2mobile` bundle ID are placeholders. Production deploys require a real domain for universal links + a registered bundle ID for App Store / Play Store.
- **App icon + splash assets.** The `app.json` references `./assets/icon.png` + `./assets/splash.png`; the assets are not shipped in this scaffold. Production deploys add the real assets via `npx expo-asset` or `npx @capacitor/assets`.

## Confidence

<0.85+ = green / 0.7–0.85 = yellow, here are the gaps / <0.7 = red, ask more>

| Sub-axis | Confidence (0-1) |
|---|---|
| Kind | |
| Mobile target | |
| Auth vendor | |
| Data layer | |
| Locale | |
| **Mean** | |

## Tier 2 mobile done-when (per Phase 3.3 spec + `01_RECOMMENDED_DESIGN.md` Decision 6)

```bash
cd templates/tier2-mobile/skeleton
npm install                                              # optional deps may be skipped
npx tsc --noEmit
npm run build                                            # web build target (Capacitor wraps; Expo is SPA fallback)
npm test                                                 # smoke + deepLinking + mobile-config-toggle + expo-doctor + cap-doctor
node ../../scripts/verify-stack-claims.ts                # workspace root drift gate
```

All five must exit zero before this build is "done" for the Tier 2 mobile spine.

**Reply "go" to start, or "change X to Y" to adjust.**
