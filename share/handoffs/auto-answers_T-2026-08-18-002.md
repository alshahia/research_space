# Auto-answers - T-2026-08-18-002 (user gate defaults)

**Task ID:** T-2026-08-18-002
**Date:** 2026-08-18 (UTC+3)
**Mode:** `fill_defaults: true`; defaults are documented here and used to advance past Phase 1 without waiting for explicit user confirmation.

If the user wishes to override any default, they call it out at the Phase 2 gate. The canonical research index at `share/notes/01_research_T-2026-08-18-002.md` has a condensed version of this table.

## Q1 (A-01) -- Anchor version: 8 or 9?

- **An (default):** **8.5.0**. v9.0.0-alpha.6 ships broken iOS framework (#8560).
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-core.md` § Risks and doubts, ###HIGH-A1; npm `view @capacitor/core` returns `8.5.0` as stable, `9.0.0-alpha.6` as the next-channel broken build.

## Q2 (A-02) -- Skip the v7->v8 "upgrading" doc coverage?

- **An (default):** **Include it** (one sub-section of the Configuration reference). Capacitor 8 dropped `cordova-plugin-fcm` shims and renamed `webContentsDebuggingEnabled` to `webContentsDebuggingEnabled` (no change in name, but the default flipped -- verify). Migration is short -- one table of "what was renamed / what was deleted / what to use instead."
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-core.md` § Existing solutions (landscape scan); `https://capacitorjs.com/docs/updating/8-0`.

## Q3 (A-03) -- Push notifications: FCM only or also APNs?

- **An (default):** **Document both**; recommend `@capacitor/push-notifications` + Firebase Cloud Messaging for cross-platform; APNs requires an extra native `@capacitor-community/native-audio`-style wrapper -- call it out as a "medium cost" item.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-core.md` § Technical findings, plugin inventory.

## Q4 (A-04) -- Dashboard/marketing page: separate web bundle?

- **An (default):** **No** -- ship one web bundle, two apps; the marketing page is part of the same `webDir` and the Capacitor WebView shows it on launch (or deep-links from a notification into it).
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-core.md` § What we don't know (ambiguities).

## Q5 (A-05) -- Auth: native form or web-redirect?

- **An (default):** **Document both**, with recommendation by app shape:
  - Lightweight apps (consumer, marketing-first) -> in-app native form + `@capacitor/preferences` for session.
  - OAuth-heavy apps (B2B, third-party integration) -> `@capacitor/browser` + custom scheme redirect + state token + server-side validation.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-core.md` § What we don't know (ambiguities); `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` § 4.

## Q6 (B-01) -- Bundlers covered: Vite-only or all?

- **An (default):** **All seven**: Vite (lead), Next.js, Vue+Vite, Angular, SvelteKit, plain Webpack/CRA (with a note to migrate to Vite), plain HTML.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` § Open questions for the user; § Existing solutions (landscape scan).

## Q7 (B-02) -- SPA routing: hash or history?

- **An (default):** **History** for Vite/Vue/React Router; **hash** for any router that uses the bundler dev server's 404 fallback (legacy Webpack setups). The Capacitor WebView is configured to serve a static `webDir`, so history-mode SPA routes need the `server.allowNavigation` block.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` § Technical findings, routing sub-section.

## Q8 (B-03) -- iOS + Android + Web scope?

- **An (default):** **All three**. Web = dev loop; Android + iOS = ship targets.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` § Open questions for the user.

## Q9 (B-04) -- Asset strategy: bundler-emitted or `@capacitor/assets`?

- **An (default):** **`@capacitor/assets`** for app icon and splash (single 1024x1024 source). Bundler handles web fonts. Local web icons use the Ionicons / Lucide / Phosphor library.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` § Technical findings, asset management.

## Q10 (B-05) -- Service-worker / PWA coexistence?

- **An (default):** **Optional**, document both modes:
  - Native-only (no SW): `webDir` is shipped as the Capacitor bundle; the web route is dead-code.
  - PWA-aware: register SW only when the UA indicates a browser engine (Safari/Chrome), NOT Android WebView; gate via `navigator.userAgent.includes('; wv)')` -- the Android WebView always appends `; wv)` to the UA.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` § Technical findings, PWA coexistence.

## Q11 (B-06) -- Cordova predecessor: yes/no?

- **An (default):** **Conditional**; document `npx cap migrate cordova` and the compat shim in a separate "Migrating from Cordova" sub-section; do not assume any user is migrating.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` § Technical findings, Cordova migration; `https://capacitorjs.com/docs/cordova`.

## Q12 (B-07) -- Env handling: how are secrets shipped?

- **An (default):** **`import.meta.env` (Vite-style) or `process.env.NEXT_PUBLIC_*` (Next.js)** at build time; **no Capacitor-side env block** -- configurations live in `capacitor.config.ts` and are constants. Use a `.env.production` + bundler injection; use a runtime "config.json" fetched from a `/api/config` endpoint if it must rotate per-build.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` § Technical findings, env handling.

## Q13 (C-01) -- UI library: Ionic or Konsta or vanilla?

- **An (default):** **Ionic Framework for full apps with auth / push / camera / Capacitor-native parity**; **Konsta UI + Tailwind for lightweight shells**; **vanilla Tailwind / NativeCSS for marketing sites ported into a WebView**. Decision rule documented in `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` § 1.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` § 1.

## Q14 (C-02) -- CI/CD vendor: GitHub Actions, Codemagic, fastlane, Bitrise?

- **An (default):** **GitHub Actions as primary** (best Capacitor community support + free tier); **Codemagic as a hosted option** (paid; vendor ships pre-built Capacitor workflows); **fastlane as the native-build sign+upload layer** inside either; **Bitrise as enterprise alternative**. All four documented; default recommendation is GH Actions + fastlane.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` § 5; § 6.

## Q15 (C-03) -- What does "near-native" mean?

- **An (default):** **The user's six-axis priority list** (from the brief): safe-area insets + status bar + splash + haptics + back-button handling + dark-mode-follow. The dossier's native-like checklist ranks these 6 first, then the long tail of "polish" items. Use this list as the calibration knob, not a single bullet point.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` § 3.

## Q16 (C-04) -- LLM system prompt audience: coding agent or doc agent?

- **An (default):** **Coding agent** ("you are extending a Capacitor app"). The prompt instructs the agent on best path + anti-paths. The doc-agent variant is a thin wrapper that references the same prompt but adds a "produce cite-from-source" rule.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` § 7a.

## Q17 (C-05) -- Examples: docstring-style or runnable?

- **An (default):** **Runnable-shape code blocks** -- they look like copy-paste-ready snippets but aren't executed as part of the dossier build. The dossier includes them in fenced code blocks with the language tag and a "what this snippet does / how to test" 2-3 line caption per block. No tests are run; the code is verified for syntactic correctness by a separate Phase 4 lint pass.
- **Source:** `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` § 8.
