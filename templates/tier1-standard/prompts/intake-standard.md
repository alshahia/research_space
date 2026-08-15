# Intake prompt — tier1-standard

Use this prompt at the start of every Tier 1 build. Batched (one message), MC over open-ended, one default per axis. Per `04_INTAKE_PROTOCOL.md`.

## The prompt (copy-paste)

> **Building a Tier 1 app. Answer these six in one word each, or "skip" to take every default:**
>
> 1. **Kind?** (1-9, default 2 = Dashboard / CRUD)
>    1. Landing / marketing · 2. Dashboard / CRUD · 3. SaaS (auth+billing) · 4. Mobile · 5. AI chat · 6. Storefront · 7. Content / docs · 8. Bot / extension / CLI · 9. Not sure
> 2. **Tier?** (1-3, default 1 = Standard) — affects complexity budget.
> 3. **Data?** (1-6, default 2 = SQLite/Postgres) — where state lives.
> 4. **Auth?** (1-4, default 3 = magic-link / OAuth) — who can use it.
> 5. **Locale?** (1-5, default 1 = English LTR) — language + reading direction.
> 6. **Out of scope (v1)?** (list any of 1-8, default none)
>    1. Payments · 2. Notifications · 3. Realtime · 4. Search · 5. Uploads · 6. Charts · 7. Mobile-specific UX · 8. i18n beyond the locale
>
> Reply in one line: `"<kind>, <tier>, <data>, <auth>, <locale>, <scope>"` or `"skip"` to take every default.

## Adaptive axes (fired only when unlocked)

- **Visual identity** — fired only if Kind = 1 (Landing) or 7 (Content), or if the user said visuals are load-bearing.
- **Deploy target** — fired after the 6 fixed axes (default Vercel).
- **External integrations** — fired only if Kind = 3 (SaaS), 5 (AI chat), or 6 (Storefront).

Hard cap: 8 axes for Tier 1 (per `04_INTAKE_PROTOCOL.md` Per-tier budget).

## What the agent does next

1. Parse the 6 axes (or apply defaults).
2. Write `SPEC.md` from `templates/tier1-standard/skeleton/SPEC.md` (restate-and-confirm artifact template).
3. User replies "go" or "change X to Y".
4. `cp -r templates/tier1-standard/skeleton/ ./` (the spine).
5. Customise `tier.config.json` from the locale answer.
6. Edit the delta (route map, theme, name, one CRUD page).
7. Run the Tier 1 done-when gate (`tsc --noEmit && npm run build && npm test && verify-stack-claims.ts`).

## See also

- `04_INTAKE_PROTOCOL.md` — full question bank + adaptive branching.
- `templates/tier1-standard/SKILL.md` — Tier 1 standing instructions.
- `templates/tier1-standard/skeleton/SPEC.md` — restate-and-confirm template.
