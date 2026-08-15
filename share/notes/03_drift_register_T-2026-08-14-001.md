# Drift Register — T-2026-08-14-001

**Purpose:** known-accepted drifts between `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` pinned versions and current npm registry. `scripts/verify-stack-claims.ts` consults this register before failing.
**Read-only with respect to time-travel:** newer entries do not invalidate older ones; old drifts stay accepted forever.
**Append-only:** new entries go at the top.

## Entries

| Date | Package | Dossier pin | Current npm | Reason | Decided by |
|---|---|---|---|---|---|
| 2026-08-14 | `typescript` | `^5.9.3` | `7.0.2` | TypeScript 7.0 released between dossier snapshot 2026-08-13 and this dispatch 2026-08-14; dossier pin `^5.9.3` (per spec) is now a major behind. Surfaced via widened audit regex (Phase 3.0b). | am-coder (Phase 3.0b) |
| 2026-08-14 | `@anthropic-ai/sdk` | `^0.116.0` | `0.117.1` | One-day patch since dossier snapshot 2026-08-13; gate working as designed | master (Phase 3.0 fix-loop) |
