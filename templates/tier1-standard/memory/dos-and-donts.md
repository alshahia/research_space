# tier1-standard — dos and donts

Distilled rule list. Read before every `edit` call. Reverses three rules from the old `resources/_archived/general-app-template/RULES_GUIDE.md`.

## Do

1. **Write `SPEC.md` before any code.** Restate-and-confirm artifact per `04_INTAKE_PROTOCOL.md`. User replies "go" or "change X to Y".
2. **Use `cn()` from `src/lib/utils.ts` for every classname join.** `cn(baseClass, { 'is-active': isActive })`. No inline `clsx(...)` joins.
3. **Wrap `<App />` in `<DatabaseProvider>` in `src/main.tsx`.** Storage-adapter pattern. Stub by default.
4. **Use `logCreate / logUpdate / logDelete` from `src/lib/audit.ts` for every write.** The audit log writes to the configured storage-adapter sink.
5. **Run `tsc --noEmit && npm run build && npm test` after every edit batch.** Tier 1 done-when per `01_RECOMMENDED_DESIGN.md` Decision 6.
6. **Run `node scripts/verify-stack-claims.ts` after every `package.json` write.** Drift gate; the script consults `share/notes/03_drift_register_T-2026-08-14-001.md` for known-accepted drifts.
7. **Cite `chub get <id>` for every new dep in the coder summary** (Q5 hard rule). Map to `[Sn]` from `02_STACK_MATRIX.md`.
8. **Use `tier.config.json` for app-level (not framework) config.** `locale`, `dir`, `font`, feature flags. Identical shape across all 7 templates.
9. **Install shadcn primitives via `npx shadcn add <component>` per build.** Copy-paste components; not a `package.json` dep.
10. **Default `locale: "en"`, `dir: "ltr"` in `tier.config.json`.** Reverses the old template's Arabic-default; Arabic is one entry in `locales/`, not the default.
11. **Allow comments on exports** (reverses the old "NEVER write comments" rule). JSDoc on exported functions is fine; banner comments are not.
12. **Ship Vitest preconfigured** (reverses the old "NEVER add test framework" rule). One smoke test per tier, runnable in CI.

## Dont

1. **Don't pin a `package.json` dep without `chub get <id>` in the summary.** No training-data fallback; reviewer FAILs the task.
2. **Don't hard-code locale.** `tier.config.json` + the i18n adapter (built lazily) handle it.
3. **Don't use `WatermelonDB`.** Browser-only, no server story, no auth model. Drizzle + Postgres is the default.
4. **Don't use `localStorage` for auth tokens.** XSS-stealable. Use HTTP-only cookies (Clerk handles this).
5. **Don't write a custom card form** for payments. Use Stripe Checkout or Stripe Elements.
6. **Don't bypass the DatabaseProvider for writes.** All writes route through the audit-log pattern; the provider is the seam.
7. **Don't gold-plate scope.** If the user said "no notifications", don't add them.
8. **Don't add abstractions the spec didn't ask for.** No per-template plugin system, no per-template config schema beyond `tier.config.json`.
9. **Don't hand-write SSE / WebSocket plumbing.** AI SDK's `streamText` + `useChat` (Tier 2) handle backpressure, cancellation, message-id correlation.
10. **Don't trust the client for subscription tier.** Server reads `subscriptions`, updated by the webhook handler (Tier 2 saas-bundle).

## Reversed from the old template

| Old rule (`RULES_GUIDE.md`) | Reversed because | New rule |
|---|---|---|
| "NEVER write comments" | Hides API contracts; JSDoc on exports is a net win. | Allow JSDoc on exported functions; banner comments are still forbidden. |
| "NEVER add test framework" | No cheap self-verification → "shipped but broken" mode. | Ship Vitest preconfigured; one smoke test per tier. |
| Arabic / RTL default | Most one-line app ideas are English-first. | Default `en` + `ltr`; Arabic is one entry in `locales/`. |
| WatermelonDB everywhere | Browser-only; no server story in 2026. | Drizzle + Postgres default; WatermelonDB as opt-in adapter behind `tier.config.json` flag. |
| Decorator config (`experimentalDecorators: true`) | Decorators were WatermelonDB's seam. | Standard ESM, no decorators. |

## See also

- `index.md` — what this tier is for.
- `reference-projects.md` — canonical Tier 1 example.
- `../SKILL.md` § Done — Tier 1 definition-of-done.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` — canonical version pins.
- `../../../resources/_archived/general-app-template/APP_ARCHITECTURE_GUIDE.md:566-588` — the audit-log origin (kind-agnostic version lives in `src/lib/audit.ts`).
