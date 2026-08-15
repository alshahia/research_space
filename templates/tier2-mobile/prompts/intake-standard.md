# Intake prompt — tier2-mobile

Use this prompt at the start of every Tier 2 mobile build. Batched (one message), MC over open-ended, one default per axis. Per `04_INTAKE_PROTOCOL.md`.

## The prompt (copy-paste)

> **Building a Tier 2 mobile app. Answer these seven in one word each, or "skip" to take every default:**
>
> 1. **Kind?** (1-9, default 4 = Mobile)
>    1. Landing / marketing · 2. Dashboard / CRUD · 3. SaaS (auth+billing) · 4. Mobile · 5. AI chat · 6. Storefront · 7. Content / docs · 8. Bot / extension / CLI · 9. Not sure
> 2. **Tier?** (1-3, default 2 = Tier 2)
> 3. **Mobile target?** (default `expo` = Expo SDK 57)
>    - **`expo`** = Expo SDK 57 + Expo Router + EAS Build + React Native. Native iOS / Android. Largest native perf ceiling.
>    - **`capacitor`** = Capacitor 7 + `@capacitor/app` + native shell. Web bundle wrapped as native. Smaller native perf ceiling but faster path.
> 4. **Auth vendor?** (Expo default = `clerk`; Capacitor default = `none`)
>    - `clerk` — Clerk Expo (`@clerk/expo`). OAuth pre-wired, Apple/Google sign-in, magic links, MFA.
>    - `supabase` — `@supabase/supabase-js` + Supabase Auth. Lower cost at scale.
>    - `none` — defer auth to a follow-up.
> 5. **Data layer?** (default `supabase` = Supabase JS)
>    - `supabase` — Supabase JS (Postgres + auth + storage + realtime).
>    - `drizzle` — Drizzle + hosted Postgres (Neon / Supabase Postgres).
>    - `none` — client-only.
> 6. **Locale?** (default `en` = English LTR)
> 7. **Out of scope (v1)?** (list any of 1-8, default none)
>    1. Payments · 2. Notifications · 3. Realtime · 4. Search · 5. Uploads · 6. Charts · 7. Push notifications · 8. OTA updates
>
> Reply in one line: `"<kind>, <tier>, <target>, <auth>, <data>, <locale>, <scope>"` or `"skip"` to take every default.

## Adaptive axes (fired only when unlocked)

- **Bundle ID** — fired only if the user supplies a domain (e.g. `myapp.example.com` → `com.example.myapp`). Default `com.example.tier2mobile`.
- **Deep-link scheme** — fired only if the user says "universal links" or supplies a domain. Default `myapp://`.
- **Push notifications** — fired only if the user says "notifications" or "push". Default off.
- **OTA updates** — fired only if the user says "OTA" or "hot update". Default off.
- **EAS Build profile** — fired only if the user mentions "preview" / "production" / "TestFlight". Default `development`.

Hard cap: 10 axes for Tier 2 (per `04_INTAKE_PROTOCOL.md` Per-tier budget).

## What the agent does next

1. Parse the 7 axes (or apply defaults).
2. Write `SPEC.md` from `templates/tier2-mobile/skeleton/SPEC.md` (restate-and-confirm artifact template).
3. User replies "go" or "change X to Y".
4. `cp -r templates/tier2-mobile/skeleton/ ./` (the spine).
5. Customise `tier.config.json` from the target + bundle ID + deep-link scheme answers.
6. Edit `mobile.config.ts` if the target differs from the default `expo`.
7. Wire `.env` from the auth + data answers:
   - **Clerk** + **Supabase**: set `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` + `EXPO_PUBLIC_SUPABASE_URL` + `EXPO_PUBLIC_SUPABASE_ANON_KEY` (Expo path) or `VITE_CLERK_PUBLISHABLE_KEY` + `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (Capacitor path).
   - **Supabase Auth** (no Clerk): same `*_SUPABASE_URL` + `*_SUPABASE_ANON_KEY`.
8. Run `npm install --omit=optional` (skips mobile SDKs during install), then `npm install <mobile-deps>` for the active target.
9. Run the Tier 2 mobile done-when gate (`tsc --noEmit && npm run build && npm test && verify-stack-claims.ts`).
10. Smoke-test bundling: `npm run build` produces `dist/` (Capacitor consumes this directly; Expo runs `npx expo export` for a full bundle).
11. **Real-device / simulator boot = DEFERRED.** Document in `SPEC.md` `## Deferred items`.

## See also

- `04_INTAKE_PROTOCOL.md` — full question bank + adaptive branching.
- `templates/tier2-mobile/SKILL.md` — Tier 2 mobile standing instructions.
- `templates/tier2-mobile/skeleton/SPEC.md` — restate-and-confirm template.
- `templates/tier2-mobile/skeleton/mobile.config.ts` — runtime-readable toggle.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 2 — canonical mobile pins.
