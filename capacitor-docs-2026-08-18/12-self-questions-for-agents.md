# Self-Questions for LLM Code Agents (Capacitor 8.5.0)

**Audience:** LLM code agent + reviewer. The agent adopts this question set as a per-phase pause-and-confirm contract; the reviewer uses the question set as a per-PR rubric.

**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). v9.0.0-alpha.6 is watch-only (#8560). v7 is historical context only. The dossier in `capacitor-docs-2026-08-18/` is the source of truth for every factual claim; the citation backstop is `13-sources-and-references.md`.

**Cross-references:** back to `00_README.md` (the dossier index); forward to `11-system-prompt-for-llms.md` (the paired system prompt); to every other dossier file by path as needed.

This is the SECOND of the two dossier files where pre-existing universal phrases (such as the canonical "do not use this plugin" warnings) are allowed per the plan's explicit bound. The self-question set is grouped by six phases; each question maps to a row in the do/don't matrix (`09-do-and-dont.md`) and to an axis / row in the native-like checklist (`06-native-like-delivery-checklist.md`). An unanswered question is a blocker, not a default.

---

## How to use

Before each task, ask yourself the questions in the relevant phase. If a question's answer is "I don't know" or "no," STOP and read the linked dossier file before proceeding. The answer to each question should be a single sentence + a file-path pointer (or a `[Sn]` marker for an external source) in the PR description; the reviewer walks the list before approving. The "good answer hint" below each question is the corrective file inside this dossier -- it is NOT the answer; the answer is what the agent writes in the PR.

---

## Phase 1 -- Setup

Five questions. Answer before `npm install`.

### Setup Q1 -- What is the target framework (React, Vue, Svelte, vanilla) and the target Capacitor version?

A wrong version pin sends the entire PR into a corner. If the answer is v9-alpha, flag the breaking-change risk in the PR before writing a line; v9 is pre-release and ships a broken iOS framework (#8560). The pin is `@capacitor/*` to `~8.5.0` for any production work in 2026.

**Good answer hint:** READ `02-install-and-setup.md` § v8.5.0 anchor + `10-known-issues-and-solutions.md` H1 (#8560).

### Setup Q2 -- Which UI kit -- Ionic, Konsta UI, Tailwind + framework-native, or fully custom?

The UI kit choice changes the keyboard resize default, the safe-area CSS strategy, and the theming primitives. If Ionic, the keyboard resize default is `KeyboardResize.Ionic`; if not, it is `KeyboardResize.Native` regardless of what the docs first-page suggests. Reach for Ionic when the team knows the framework Ionic pairs with AND the app needs auth / push / camera parity; reach for Konsta when the project is Tailwind-first and wants a lighter mobile kit; reach for vanilla Tailwind when the app is a marketing shell.

**Good answer hint:** READ `07-best-companion-libraries.md` § UI library decision rule + `06-native-like-delivery-checklist.md` Axis 5.

### Setup Q3 -- What is the icon source -- a 1024x1024 PNG, or do you have separate foreground / background for Android 12+ adaptive icons?

If only one PNG, the agent must say so and pick the default-mode `@capacitor/assets` pipeline; if separate foreground / background exist, the agent runs custom mode with four files (`icon-foreground.png`, `icon-background.png`, `splash.png`, `splash-dark.png`). Default mode produces a flat icon that fails Android 12+ device parity.

**Good answer hint:** READ `08-build-and-ship.md` § Pre-build asset pipeline + `09-do-and-dont.md` row 3.

### Setup Q4 -- What is the splash source -- a 2732x2732 PNG, separate dark + light, or generated from the icon?

Pick the smallest set that covers the design. A dark splash variant is required if the app supports dark mode; the splash background color must match the app's dark-mode background so the launch transition does not flash white.

**Good answer hint:** READ `08-build-and-ship.md` § `@capacitor/assets` recipe + `06-native-like-delivery-checklist.md` Axis 3.

### Setup Q5 -- Which package manager (npm, pnpm, yarn, bun) and which Node version is in `package.json` engines?

Mismatch causes silent install failures on `cap sync`; Capacitor 8 requires Node 22+. Verify the CI matrix runner image matches the local Node version (`macos-14` GH Actions runner ships Node 22 by default; `ubuntu-latest` may differ).

**Good answer hint:** READ `02-install-and-setup.md` § Node 22 / Xcode 26.0 / Android Studio 2025.2.1 floors + `08-build-and-ship.md` § CI/CD matrix.

---

## Phase 2 -- Conversion

Four questions. Answer before `npm run build` and `cap sync`.

### Conversion Q1 -- Does the existing web project have a router in `history` mode, and is `server.allowNavigation` set for every external domain the SPA may hit at runtime?

Without `allowNavigation`, the WebView blocks the first cross-origin fetch (auth callback, analytics endpoint, payment processor) and returns `ERR_BLOCKED_BY_RESPONSE` with no console message. Add every external domain to `server.allowNavigation` BEFORE the route is hit; do not rely on the WebView's "open" fallback.

**Good answer hint:** READ `04-conversion-guide.md` § Routing & navigation + `03-configuration-reference.md` § server block + `09-do-and-dont.md` row 13.

### Conversion Q2 -- Is `webDir` correctly pointed at the post-build folder (`dist/`, `build/`, `.next/`) and NOT the source folder?

Capacitor copies the bundle into the native shell on `cap sync`; a wrong `webDir` produces a working native shell with an empty WebView. The post-build folder must contain an `index.html` at the root; verify by running `cap copy ios` and checking `ios/App/public/index.html` exists with content.

**Good answer hint:** READ `02-install-and-setup.md` § `cap sync` vs `cap copy` semantics + `04-conversion-guide.md` § Vite recipe + `09-do-and-dont.md` row 7.

### Conversion Q3 -- Are there existing CORS or `credentials: 'include'` assumptions in the JS code?

Inside the Capacitor WebView CORS does not apply for same-origin to the configured `server.url`, but `fetch` with `credentials: 'include'` will attempt same-site cookie behavior that may not match the web production behavior. The agent must audit every `fetch` / `axios` call for `credentials` and `mode` flags.

**Good answer hint:** READ `04-conversion-guide.md` § Routing & navigation + `08-build-and-ship.md` § Debugging on devices.

### Conversion Q4 -- What is the asset strategy -- bundler-emitted, `@capacitor/assets` for icons / splash, or both?

Icons and splash go through `@capacitor/assets` (custom mode with 4 files for Android 12+); web fonts go through the bundler (or `Fontsource` per style + weight); local web icons use Ionicons / Lucide / Phosphor per the UI kit decision in Setup Q2. External font CDN at runtime is the universal "FOIT on cold start" tell; bundle the font.

**Good answer hint:** READ `04-conversion-guide.md` § Asset management + `07-best-companion-libraries.md` § Fonts + `09-do-and-dont.md` row 14.

---

## Phase 3 -- Native shell

Four questions. Answer before `npx cap add ios android` and the first native build.

### Native Shell Q1 -- What iOS deployment target and what Android `minSdkVersion` / `targetSdkVersion` are pinned in the native projects?

iOS 15.0+ is required for Capacitor 8; Android API 24+ (Android 7.0 Nougat) is the minimum; Android `targetSdkVersion` is 36 (locked for Capacitor 8.x; do not customize). Verify the values in `ios/App.xcodeproj/project.pbxproj` (`IPHONEOS_DEPLOYMENT_TARGET = 15.0`) and `android/variables.gradle` (`minSdk = 24`, `compileSdk = 36`, `targetSdk = 36`).

**Good answer hint:** READ `02-install-and-setup.md` § Floor matrix + `03-configuration-reference.md` § Per-platform blocks + `10-known-issues-and-solutions.md` B (v8 migration).

### Native Shell Q2 -- What is the signing strategy -- local keystore / `fastlane match`, or App Store Connect API key?

iOS signing requires a provisioning profile + a distribution certificate; the safe default is `fastlane match` with a git-ignored `keys/` directory or App Store Connect API key in CI. Android signing requires an upload keystore (`.jks` or `.keystore`); the safe default is a Play Console upload key generated via `keytool` and stored in CI secrets (`KEYSTORE_PATH`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`). Never commit the keystore to the repo.

**Good answer hint:** READ `08-build-and-ship.md` § CI/CD matrix + `03-configuration-reference.md` § Per-platform `android.buildOptions` block.

### Native Shell Q3 -- Are Universal Links (iOS) and App Links (Android) registered for deep-link routing?

If the app uses `https://yourapp.com/auth/callback` or a similar HTTPS deep link, register the `apple-app-site-association` (AASA) file at `https://yourapp.com/.well-known/apple-app-site-association` and the `assetlinks.json` at `https://yourapp.com/.well-known/assetlinks.json`. Verify the Capacitor App plugin's `appUrlOpen` listener handles the deep link before merge.

**Good answer hint:** READ `05-plugin-system-and-lifecycle.md` § CFBundleURLTypes + intent-filter + `08-build-and-ship.md` § Universal Links / App Links.

### Native Shell Q4 -- Is a custom URL scheme registered for OAuth callbacks?

Custom schemes (`capacitor://`, `myapp://`) are required for `@capacitor/browser` OAuth flows that need to round-trip from a `SFSafariViewController` / Chrome Custom Tab back into the app. Register the scheme in `ios/App/Info.plist` (`CFBundleURLTypes`) and in `android/app/src/main/AndroidManifest.xml` (`<intent-filter>` with `<data android:scheme="..." />`). Verify the scheme is unique to the app (Apple rejects duplicate schemes).

**Good answer hint:** READ `05-plugin-system-and-lifecycle.md` § Custom URL schemes + `04-conversion-guide.md` § Routing & navigation.

---

## Phase 4 -- Runtime

Four questions. Answer before merging the feature branch.

### Runtime Q1 -- What plugin scope does this PR touch -- official `@capacitor/*`, community plugin, or custom native plugin?

Official plugins are preferred for the 35 APIs in `capacitorjs.com/docs/v8/apis`; community plugins require the 4-step audit (`npm view <name> time`, LICENSE check, permissions check, maintainer check); custom native plugins require a JS bridge file + Swift / Java class + `registerPlugin<T>('PluginName')` and a hand-written TypeScript definition. The scope drives the verification command and the PR description's `## Audit` block.

**Good answer hint:** READ `05-plugin-system-and-lifecycle.md` § Plugin lifecycle + `09-do-and-dont.md` row 2 + `11-system-prompt-for-llms.md` Hard constraint 11.

### Runtime Q2 -- Which lifecycle events does the PR subscribe to, and is cleanup wired in `useEffect` return (or framework equivalent)?

The `@capacitor/app` plugin emits `appStateChange`, `pause`, `resume`, `appUrlOpen`, `appRestoredResult`, `backButton`. Each `addListener(...)` must have a matching `removeListener(...)` in cleanup; double-handlers fire on resume; native references leak; in-memory state grows on each `pause` / `resume` cycle.

**Good answer hint:** READ `05-plugin-system-and-lifecycle.md` § Lifecycle events + `09-do-and-dont.md` row 8.

### Runtime Q3 -- Are custom URL schemes + deep links routed through `appUrlOpen`, and is the route handler tested with a real deep link?

The App plugin's `appUrlOpen` event fires for both custom URL schemes and Universal / App Links. The handler must parse the URL, validate the host + path, and route to the correct screen. Test with a real deep link (`xcrun simctl openurl <device-id> "myapp://auth/callback?token=..."` on iOS, `adb shell am start -a android.intent.action.VIEW -d "myapp://auth/callback?token=..."` on Android).

**Good answer hint:** READ `05-plugin-system-and-lifecycle.md` § `appUrlOpen` + `04-conversion-guide.md` § Routing & navigation.

### Runtime Q4 -- Is the auth flow a native form, an in-app `@capacitor/browser` OAuth round-trip, or a backend-redirect?

Each pattern has a different security + UX trade-off. Native form: simplest, no round-trip, but you store the session token. `@capacitor/browser` OAuth: best for third-party providers (Google, Apple, GitHub), uses `SFSafariViewController` / Chrome Custom Tab, callback to a custom scheme. Backend-redirect: app calls `/auth/login`, server returns a redirect to the provider, the provider returns to your callback URL, the callback fires `appUrlOpen`. Pick from the brief; do not default to web-redirect for a consumer app or native form for a B2B OAuth-heavy app.

**Good answer hint:** READ `07-best-companion-libraries.md` § Auth + `04-conversion-guide.md` § OAuth callback loss.

---

## Phase 5 -- Performance

Three questions. Answer before requesting review.

### Performance Q1 -- Any list view with > 100 rows ships with TanStack Virtual (or framework equivalent)?

Render a 1000-row list with `.map()` and the frame budget is lost at row 200-400 on mid-range Android; 60 fps scroll collapses to ~25 fps. Use `useVirtualizer` (React), `useVirtualRows` (Vue / Svelte / Solid), or the framework's equivalent. The key prop must be stable across re-renders; an unstable key forces a full unmount + remount on every update.

**Good answer hint:** READ `06-native-like-delivery-checklist.md` long-tail row 14 (performance) + `09-do-and-dont.md` row 11.

### Performance Q2 -- What animation strategy is used -- `transform` + `opacity` only, or layout-thrashing properties?

Animate `transform` + `opacity` only (compositor path, 60 fps). Any animation that touches `top` / `left` / `width` / `height` / `right` / `bottom` is a layout-thrash regression; surface it in the PR under `## Self-critique` and refactor to `transform` + `opacity`. `will-change` is transient only -- set just before the animation, clear after; do not apply `will-change: transform` globally.

**Good answer hint:** READ `06-native-like-delivery-checklist.md` long-tail row 14 + `09-do-and-dont.md` rows 9 + 10.

### Performance Q3 -- What font loading strategy is used -- system font stack, bundled Fontsource, or external CDN at runtime?

System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) is the default; the platform picks the native font per OS. Bundled Fontsource (npm-installable per style + weight) is the right pick for brand-required custom fonts. External CDN at runtime is the wrong answer -- the WebView pays a network round-trip on first launch (FOIT); the app feels slow to render.

**Good answer hint:** READ `06-native-like-delivery-checklist.md` Axis 9 (typography) + `07-best-companion-libraries.md` § Fonts.

---

## Phase 6 -- Ship

Three questions. Answer before tagging the release.

### Ship Q1 -- Are `package.json` version, iOS `CFBundleShortVersionString` + `CFBundleVersion`, and Android `versionName` + `versionCode` all bumped in lockstep in the release commit?

Store uploads fail when build numbers do not advance monotonically; analytics breaks when JS bundle version diverges from native build number. Verify the version matrix in the PR description's `## Version bump` block.

**Good answer hint:** READ `08-build-and-ship.md` § Version bumps in lockstep + `09-do-and-dont.md` row 20.

### Ship Q2 -- Does the CI matrix gate the release on `npx cap doctor` clean, lint clean, test green, AND a real-device smoke?

`cap doctor` validates the local env; lint + test validate the JS / TS code; a real-device smoke (iPhone 12+, Pixel 5+) on the actual release build validates the native shell + the WebView integration. The CI matrix in `08-build-and-ship.md` § CI/CD matrix is the template.

**Good answer hint:** READ `08-build-and-ship.md` § CI/CD matrix + `11-system-prompt-for-llms.md` Hard constraint 14.

### Ship Q3 -- Is the OTA story explicit -- ship-then-store-review (safe default), `@capgo/capacitor-updater` (commercial), or `vite-plugin-pwa` for the marketing site only?

Ship-then-store-review is the safe default for most apps; `@capgo/capacitor-updater` is the commercial option for hotfixes (data-residency must be verified); `vite-plugin-pwa` is a marketing-site cache invalidation, not a JS-bundle OTA. The React-Native-side over-the-air service (the managed App Center service that previously hosted the RN OTA client) is not the right answer for Capacitor; the managed service was sunset 2025-09-30.

**Good answer hint:** READ `08-build-and-ship.md` § OTA caveat + `09-do-and-dont.md` row 12 + `07-best-companion-libraries.md` § Common traps #6.

---

## Answer summary table template

Copy this template into the PR description; fill one row per question. The reviewer walks the table.

| # | Question | Agent answer | File-path / source |
|---|---|---|---|
| Setup Q1 | Target framework + Capacitor version | <one sentence> | `02-install-and-setup.md` § ... |
| Setup Q2 | UI kit | <one sentence> | `07-best-companion-libraries.md` § ... |
| Setup Q3 | Icon source | <one sentence> | `08-build-and-ship.md` § ... |
| Setup Q4 | Splash source | <one sentence> | `08-build-and-ship.md` § ... |
| Setup Q5 | Package manager + Node version | <one sentence> | `02-install-and-setup.md` § ... |
| Conversion Q1 | History-mode router + `allowNavigation` | <one sentence> | `03-configuration-reference.md` § ... |
| Conversion Q2 | `webDir` correct | <one sentence> | `04-conversion-guide.md` § ... |
| Conversion Q3 | CORS / `credentials` audit | <one sentence> | `04-conversion-guide.md` § ... |
| Conversion Q4 | Asset strategy | <one sentence> | `08-build-and-ship.md` § ... |
| Native Shell Q1 | iOS deployment target + Android SDK | <one sentence> | `02-install-and-setup.md` § ... |
| Native Shell Q2 | Signing strategy | <one sentence> | `08-build-and-ship.md` § ... |
| Native Shell Q3 | Universal Links / App Links | <one sentence> | `05-plugin-system-and-lifecycle.md` § ... |
| Native Shell Q4 | Custom URL scheme registered | <one sentence> | `05-plugin-system-and-lifecycle.md` § ... |
| Runtime Q1 | Plugin scope | <one sentence> | `05-plugin-system-and-lifecycle.md` § ... |
| Runtime Q2 | Lifecycle event cleanup | <one sentence> | `05-plugin-system-and-lifecycle.md` § ... |
| Runtime Q3 | Deep-link routing tested | <one sentence> | `05-plugin-system-and-lifecycle.md` § ... |
| Runtime Q4 | Auth flow | <one sentence> | `07-best-companion-libraries.md` § ... |
| Performance Q1 | List virtualization | <one sentence> | `06-native-like-delivery-checklist.md` § ... |
| Performance Q2 | Animation strategy | <one sentence> | `06-native-like-delivery-checklist.md` § ... |
| Performance Q3 | Font loading | <one sentence> | `07-best-companion-libraries.md` § ... |
| Ship Q1 | Version bump matrix | <one sentence> | `08-build-and-ship.md` § ... |
| Ship Q2 | CI gate | <one sentence> | `08-build-and-ship.md` § ... |
| Ship Q3 | OTA story | <one sentence> | `08-build-and-ship.md` § ... |

23 questions, 6 phases. Every question has a file-path pointer in the dossier body. An unanswered question is a blocker, not a default.

---

## When to stop and ask the user

Four-rule heuristic. The agent stops and surfaces the question to the master / user when ANY of the following holds; otherwise the agent defaults and surfaces the default in the PR description.

1. **The user's brief is silent on the UI kit, AND the agent cannot infer from the project name + the existing dependencies.** Default to framework-native + Tailwind; surface the default; ask if the user wants Ionic / Konsta instead.
2. **The user's brief is silent on the OTA story, AND the app's hotfix cadence matters (e.g., "we need to ship a bug fix to users within 24 hours").** Default to ship-then-store-review; surface the default; ask if the user wants `@capgo/capacitor-updater` instead.
3. **The user's brief is silent on the auth flow, AND the app has a third-party OAuth requirement (Google, Apple, GitHub, etc.).** Default to `@capacitor/browser` + custom scheme callback; surface the default; ask if the user wants in-app native form instead.
4. **The agent is about to introduce a new dependency** (a new `@capacitor/*` plugin, a new community plugin, a new companion library). Surface the dependency in the PR description under `## New dependency` with the 4-step audit; ask the user if they accept the dependency before installing.

---

## Pairing with the system prompt

This question set is paired with `11-system-prompt-for-llms.md`. The prompt gives the standing rules (persona, mission, hard constraints, anti-patterns, output format, when-to-ask heuristic, quality bars); the questions force per-phase pause-and-confirm. Adopt BOTH files as standing instructions when the user's task is "build / extend / debug a Capacitor app on iOS + Android + Web."

The system prompt lives at `capacitor-docs-2026-08-18/11-system-prompt-for-llms.md`. The two files together are the operating contract for a Capacitor code agent.

---

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0
- anchor_url: https://capacitorjs.com/docs
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560
- paired_with: `capacitor-docs-2026-08-18/11-system-prompt-for-llms.md`
- question_count: 23 (Setup 5, Conversion 4, Native shell 4, Runtime 4, Performance 3, Ship 3)
- citation_backstop: `capacitor-docs-2026-08-18/13-sources-and-references.md`
- encoding_clean: 0 em-dashes, 0 en-dashes, 0 smart quotes (verified by raw-byte scan `E2 80 94` / `E2 80 93` / `E2 80 98` / `E2 80 99` / `E2 80 9C` / `E2 80 9D`)

## References

The `[Sn]` markers below resolve in `capacitor-docs-2026-08-18/13-sources-and-references.md`'s `## Unified ledger`. Each row also names the dossier file where the cited claim lives in long-form.

- [S1] -- https://registry.npmjs.org/@capacitor/core -- accessed 2026-08-18 (npm dist-tags; the do-not-pin-v9-alpha evidence in `02-install-and-setup.md` + `10-known-issues-and-solutions.md` H1; the source for Setup Q1)
- [S11] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor Web/PWA; service worker is no-platform-mode; the source for the system prompt hard constraint 6 referenced from this file)
- [S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (v9-alpha broken iOS framework; the source for Setup Q1 + the system prompt hard constraint 5)
- [S25] -- https://capacitorjs.com/docs/ -- accessed 2026-08-18 (Capacitor introduction page; the dossier entry point)
- [S28] -- https://capacitorjs.com/docs/v8/config -- accessed 2026-08-18 (full `CapacitorConfig` schema; `server.allowNavigation` field; the source for Conversion Q1 + Runtime Q1)
- [S30] -- https://capacitorjs.com/docs/android/configuration -- accessed 2026-08-18 (Configuring Android; `versionCode` + `versionName` source; the source for Native Shell Q1 + Ship Q1)
- [S31] -- https://capacitorjs.com/docs/ios/configuration -- accessed 2026-08-18 (Configuring iOS; `CFBundleVersion` + `CFBundleShortVersionString` source; the source for Native Shell Q1 + Ship Q1)
- [S34] -- https://capacitorjs.com/docs/apis/status-bar -- accessed 2026-08-18 (`@capacitor/status-bar` API; `Style` enum + `setStyle` + `setBackgroundColor`; the source for Runtime Q2)
- [S62] -- https://capacitorjs.com/docs/v8/apis -- accessed 2026-08-18 (Capacitor v8 APIs page; 35 official plugins list; the source for Runtime Q1)
- [S64] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- accessed 2026-08-18 ("Using Plugins" docs; Community org pointer; the source for Runtime Q1)
- [S65] -- https://github.com/riderx/awesome-capacitor -- accessed 2026-08-18 (curated community plugin index by Capgo; the 4-step audit source for Runtime Q1)
- [S75] -- https://capacitorjs.com/docs/cli -- accessed 2026-08-18 (CLI command list; the `npx cap doctor` invocation; the source for Ship Q2)
- [S88] -- https://capgo.io/ -- accessed 2026-08-18 (Capgo home; commercial + self-hosted OTA for Capacitor; the source for Ship Q3)
- [S101] -- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/viewport -- accessed 2026-08-18 (MDN viewport meta tag; the source for the system prompt hard constraint 9 referenced from this file)

The 14 `[Sn]` markers above resolve in `13-sources-and-references.md`'s `## Unified ledger`. Every `[Sn]` is also a row in the dossier-wide ledger; the per-file index in `13-` `## Per-file reference indexes` names this file (`12-self-questions-for-agents.md`) as the first-cited-by.
