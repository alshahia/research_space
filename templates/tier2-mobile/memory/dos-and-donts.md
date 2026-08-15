# tier2-mobile — dos and donts

Distilled rule list. Read before every `edit` call. Adds rules from `02_STACK_MATRIX.md` mobile "Agent failure modes" section + the Phase 3.3 spec.

## Do

1. **Write `SPEC.md` before any code.** Restate-and-confirm artifact per `04_INTAKE_PROTOCOL.md`. User replies "go" or "change X to Y". Capture `mobile.target` axis (expo / capacitor; default expo).
2. **Use `mobile.config.ts` as the single source of truth for the active target.** Never re-read `tier.config.json` directly in feature code. The `mobile.config.ts` file is **runtime-readable** (not just a build-time constant) and is exercised by `tests/mobile-config-toggle.test.ts`.
3. **Use `parseDeepLink(url)` from `src/lib/deepLinking.ts` for every URL parse.** Pure function, fully testable. Both Expo and Capacitor paths share the parser.
4. **Default `mobile.target: "expo"` in `tier.config.json`.** Dossier recommendation (EAS Build + native signing handles the iOS/Android workflow). Users flip to `capacitor` when they want a web-hybrid shell without React Native.
5. **Run `tsc --noEmit && npm run build && npm test` after every edit batch.** Tier 2 mobile done-when.
6. **Run `node scripts/verify-stack-claims.ts` after every `package.json` write.** Drift gate.
7. **Cite `chub get <id>` for every new dep in the coder summary** (Q5 hard rule). Map to `[Sn]` from `02_STACK_MATRIX.md` where available.
8. **List mobile-default deps as `optionalDependencies` in `package.json`.** `npm install` succeeds without the platform SDKs; the postinstall script (or `scripts/switch-target.sh`) refreshes deps for the active target.
9. **Set `bundleIdentifier` in `app.json` `ios` block + `package` in `android` block.** Apple + EAS will reject the build without these. The expo-doctor test verifies their presence.
10. **Set `appId` + `appName` + `webDir: "dist"` in `capacitor.config.ts`.** Capacitor requires these for `npx cap add ios` and `npx cap add android`. The cap-doctor test verifies them.
11. **Use `npx` for the Expo and Capacitor CLIs.** Do NOT install them globally. Per dispatch constraint.
12. **Document deferred items in `SPEC.md` `## Deferred items`.** Real-device boot, simulator boot, Android SDK setup, JDK 21 install — list each with reason.

## Dont

1. **Don't pin a `package.json` dep without `chub get <id>` in the summary.** No training-data fallback.
2. **Don't install Expo or Capacitor CLIs globally.** Use `npx` only.
3. **Don't attempt real-device or simulator boot from this dispatch.** No Apple Developer account on the Windows verifier; no Android SDK installed. Document and defer.
4. **Don't use `dangerouslySetInnerHTML` on deep link inputs.** `parseDeepLink` returns a route + params object; the consumer navigates to the route, never evals the URL.
5. **Don't skip the `applicationId` / `bundleIdentifier` in `app.json`.** EAS build fails on first run.
6. **Don't use AsyncStorage for large data (>1MB).** OOMs on 4GB phones. Use `expo-sqlite` (bundled with Expo 57) for large data.
7. **Don't store push tokens in `localStorage`.** XSS-stealable. Use the SecureStore abstraction or the platform's secure keychain.
8. **Don't make iOS-only or Android-only deep-link schemas.** Use both `expo-linking` (Expo) and `@capacitor/app` (Capacitor) universal-link patterns.
9. **Don't forget the `experiments.typedRoutes: true` flag in `app.json`.** Without it, route typing is `string` (no compile-time route validation).
10. **Don't hand-rewrite the Capacitor web build URL.** `webDir: "dist"` is the load-bearing key; `vite build` produces `dist/`; Capacitor wraps it for native.
11. **Don't import `expo-linking` or `@capacitor/app` as top-level imports.** Use dynamic `await import()` so the Vite bundle doesn't ship both SDKs. The adapter function in `src/lib/deepLinking.ts` handles this.
12. **Don't edit `agents_manager/coder/SKILL.md` or any other specialist's `SKILL.md`.** Out of lane.
13. **Don't edit `templates/AGENTS.md` or `templates/registry.json`.** Master's lane (the registry already has the `tier2-mobile` entry).

## Reversed from the old template + tier1 carries forward

| Old rule (`RULES_GUIDE.md`) | Reversed because | New rule |
|---|---|---|
| "NEVER write comments" | Hides API contracts; JSDoc on exports is a net win. | Allow JSDoc on exported functions; banner comments are still forbidden. |
| "NEVER add test framework" | No cheap self-verification → "shipped but broken" mode. | Ship Vitest preconfigured; smoke + deepLinking + mobile-config-toggle + doctor tests. |
| Arabic / RTL default | Most one-line app ideas are English-first. | Default `en` + `ltr`; Arabic is one entry in `locales/`. |
| WatermelonDB everywhere | Browser-only; no server story in 2026. | Drizzle + Postgres default; WatermelonDB as opt-in adapter behind `tier.config.json` flag. |
| Bare React Native from `npx @react-native-community/cli init` | Spend a day fixing Android SDK paths, JDK versions, Gradle. | Expo handles it; or Capacitor for web-hybrid. |

## See also

- `index.md` — what this tier is for.
- `reference-projects.md` — canonical Tier 2 mobile example.
- `../SKILL.md` § Done — Tier 2 definition-of-done.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 2 — canonical mobile pins.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` mobile section — "Agent failure modes" (bundleIdentifier, deep-link schemas, AsyncStorage, push token refresh, privacy manifests).
- `../tier1-standard/memory/dos-and-donts.md` — tier1 carries forward.
