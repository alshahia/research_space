# tier2-mobile — reference projects

One canonical Tier 2 mobile example. Read before scaffolding. **No code copy-paste — the example is a reference shape, not a template.**

## The example

**Expo's `with-router` example** (`https://github.com/expo/examples/tree/main/with-router`) — the canonical Expo Router file-structure example from the Expo team. Uses Expo SDK 57 + Expo Router + Clerk Expo + Supabase JS. The reference shape for the Expo target of this template.

Why this is a good Tier 2 mobile reference:

- **Expo Router file structure.** `app/_layout.tsx` as the root layout + `app/(tabs)/index.tsx` for the home tab + `app/(auth)/sign-in.tsx` for the sign-in route. File-based routing; typed routes when `experiments.typedRoutes: true` is set in `app.json`.
- **`expo-linking` deep linking.** The `Linking.parse(url)` shape returns `{ path, queryParams }`; this template's `parseDeepLink(url)` mirrors that shape.
- **Clerk Expo integration.** `ClerkProvider` wraps the root layout; `useAuth()` + `useUser()` hooks are first-class. Same user state across web + mobile.
- **Supabase JS client.** `createClient(url, anonKey)` is platform-agnostic; the same import works in Expo and Capacitor (the active runtime matters for OAuth hand-off, not the client init).
- **EAS Build profiles.** `eas.json` has `development` + `preview` + `production` profiles; `eas build --profile preview` is the typical inner-loop command.

## What to copy from the example

- **App Router file structure.** `app/_layout.tsx` (root) + `app/(group)/route.tsx` (route groups). The parenthesized group names are arbitrary but conventional: `(auth)` for unauthenticated routes, `(tabs)` for the main tab bar.
- **`expo-linking` parser shape.** `Linking.parse(url)` returns `{ path, queryParams }` — this template's `parseDeepLink(url)` returns `{ route, params, raw }` (extended shape with the raw URL for audit logs).
- **`experiments.typedRoutes: true` in `app.json`.** Toggles compile-time route validation. Without it, `router.push('/items/123')` is `string -> void`; with it, the route is checked against the file structure.
- **Clerk Expo provider nesting.** `<ClerkProvider>` wraps `<Stack>` or `<RootLayout>` in `app/_layout.tsx`. The spine documents this pattern but doesn't ship the `@clerk/expo` install (it's optional).

## What NOT to copy

- **The full source code.** The Expo example is ~200 files; this template is ~30 files. The example is for shape, not for mass.
- **Supabase Auth.** The example uses Supabase Auth for the OAuth handoff; this template's spine uses `@supabase/supabase-js` for direct DB access + Clerk Expo for auth. The two are complementary, not redundant.
- **The exact route map.** The example's `app/(tabs)/` has `index.tsx`, `settings.tsx`, `two.tsx`. The spine ships `index.tsx` only; users add their own route map per `SPEC.md`.
- **`expo-secure-store` for OAuth tokens.** The example uses it; the spine defers to Clerk Expo's built-in token storage.
- **AsyncStorage for non-token data.** Per the mobile "Agent failure modes" row, OOMs on 4GB phones for >1MB. Use `expo-sqlite` (bundled) for large data.

## The 1 thing that breaks Tier 2 mobile most often

Forgetting `bundleIdentifier` / `package` / `applicationId`. EAS build fails on the first run; the user has to fix `app.json` and re-run `eas build`. The `expo-doctor.test.ts` in this template verifies these are present before the user ever pushes to EAS.

## Other examples worth skimming (for shape, not code)

- **Capacitor's official `capacitor-react` example** (`https://github.com/ionic-team/capacitor-react-app`) — the Capacitor + React + Vite shim. Demonstrates the web-bundle-into-native-shell pattern this template's Capacitor target uses.
- **Clerk's `expo-quickstart`** (`https://github.com/clerkinc/clerk-expo-quickstart`) — drops Clerk Expo into a default Expo project. Same shape as this template's `app/(auth)/sign-in.tsx`.
- **Vercel's `react-native-skia` template** (`https://github.com/vercel/react-native-skia`) — full-fidelity Expo + native module pattern. Demonstrates when to drop down to bare React Native (when Expo doesn't have the native module).

## See also

- `index.md` — what this tier is for.
- `dos-and-donts.md` — distilled rule list.
- `../SKILL.md` § Done — Tier 2 definition-of-done.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 2 — canonical mobile pins.
