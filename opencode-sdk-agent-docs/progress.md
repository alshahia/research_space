# Progress -- T-2026-08-18-001 (OpenCode SDK dossier)

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 status=complete -->

This file is the live status board for `opencode-sdk-agent-docs/`. It is updated by the writer (am-coder) as each phase lands and is the first place a reader should look to see what is and is not yet safe to use.

## Task id

T-2026-08-18-001 -- OpenCode SDK agent / LLM documentation dossier.

## Approved provider policy summary

Drawn from `share/handoffs/05_phase2-approved_T-2026-08-18-001.md`:

- **Primary path.** A single Zen primary SDK call on `opencode / deepseek-v4-flash-free`, structured-output with a tiny JSON schema, one attempt, no retry, no model substitution, a 30-second wall-clock timeout, PID-scoped cleanup in `finally`.
- **Backup path.** Full OpenCode Go SDK fallback on `opencode-go / deepseek-v4-flash`, BOTH alternatives A (raw OpenAI-compatible with `max_tokens: 16`) and B (SDK `session.prompt` with tiny json_schema + 30 s wall clock + honest residual) are supported. PLUS 5 additional Go variants (9C provider-side cap, 9D streaming first-token abort, 9E strict-latency SLO, 9F multi-pass speculative, 9G belt-and-suspenders) for different latency / cost / failure-mode tradeoffs. Each variant is recipe-documented in `11_live_validation.md` Appendix D and carries `PASS-RecipeOnly` because no live run was performed within the approved provider-call ceilings. Same one-attempt, no-retry, no-substitution bounds; same 30-second wall clock; same PID-scoped cleanup.
- **Local-loopback raw SSE diagnostic.** One bounded `curl -N` against `http://127.0.0.1:<actual-port>/global/event` on the embedded server (NOT against the Zen provider endpoint). Runs in parallel with the Zen primary prompt to capture `first_event_latency_ms`. No auth header. No Zen spend.
- **Credential discipline.** Reuse the existing global OpenCode provider configuration through the SDK provider loader only. No reads, prints, copies, exports, or stores of any credential. No auth-file reads; no path / mode / chmod inspection. No environment-variable dumps.
- **Accepted residual.** The SDK `session.prompt` path has no verified hard output-token cap. The tiny JSON schema plus the 30-second wall clock are the only output ceilings for the default SDK path. Additional caps (provider-side `max_tokens: 16`, HTTP-layer `timeout: 4500`, 5-second strict SLO wall clock) are available via the Go alternative variants (9A, 9C, 9E, 9G) and the recipe bodies in `11_live_validation.md` Appendix D. The residual is stated honestly in the live-validation file when it lands.
- **Hard ceilings.** One Zen call total. Zero to one Go call (gated). One raw SSE against local loopback. Zero other-provider calls (rows 10-13 are recipe-only). No global CLI upgrade. Synthetic, non-sensitive prompt data only.

## File status table

Status columns: `done` = file exists, passes this phase's minimum line count, and is source-cited. `in-progress` = writing in flight. `todo` or `pending` = not yet started.

| # | File | Phase | Status | Notes |
|---|---|---|---|---|
| 1 | `00_README.md` | 3A | done | Reading map, audience paths, current verdict, scope, 14-file nav |
| 2 | `01_prerequisites.md` | 3A | done | CLI install matrix, PATH check, version skew label `same-minor-patch-delta-15`, `global.health()` probe, secure provider-presence guidance |
| 3 | `progress.md` | 3A | done | This file |
| 4 | `02_quickstart.md` | 3B | done | Embedded recipe A (createOpencode) + existing-server recipe B (createOpencodeClient + directory); both runnable with `bun run`; no model call; freshness footer; explicit-model pattern shown commented in recipe A |
| 5 | `03_decision_guide.md` | 3B | done | Use / do-not-use rules with citations: SDK vs raw HTTP vs TUI; embedded vs existing; v1 vs v2 subpath; structured output; SSE; auth env vars; createOpencodeTui hang; implicit model defaults; untrimmed filePath; v1/v2 mismatch; unauthenticated non-loopback; endpoint-shape-unverified pointer table |
| 6 | `04_api_map.md` | 3B | done | Unified namespace map; 17 namespaces (Global, Instance, Project, Path, Vcs, Config, Tools Experimental, Ptys, Auth, Providers, Files, Sessions, Commands, MCP, LSP, Formatter, TUI); rows carry `(v1)` / `(v2-only)` / `(both)` markers; contiguous v2-delta block with experimental_workspaceID, HTML guard, data.message.user, v2-only event types; no invented body shapes |
| 7 | `05_lifecycle.md` | 3C | done | Source-verified spawn defaults; explicit free-port policy with `port: 0` left unclaimed; abort / `bindAbort`; `OPENCODE_CONFIG_CONTENT`; PID-scoped Windows `taskkill /T /F`; directory routing; owned-close evidence |
| 8 | `06_security.md` | 3C | done | Server Basic authentication via `OPENCODE_SERVER_PASSWORD` / `OPENCODE_SERVER_USERNAME`; exact-origin CORS; loopback / non-loopback gate; placeholder-only examples; value-free logging |
| 9 | `07_errors.md` | 3C | done | Fields-style tuple versus thrown `Error` + `.cause`; exact v2 HTML guard; empty / no-response strings; structured-output discriminator; sanitized parser |
| 10 | `08_events.md` | 3C | done | `GET /global/event` SSE; five generated retry options; bounded subscription; 7 verified v1 type names; 27 source-surfaced v2 delta names; unverified payload markers |
| 11 | `09_examples.md` | 3D | done | 9 safe recipes (embedded server, existing-server connect, session CRUD, prompting with explicit model, SSE subscription, file search/read, structured output, error handling, cleanup) + 5 unsafe-pattern callouts (createOpencodeTui hang, implicit default model, untrimmed filePath #43112, v1-vs-v2 mismatch, unauthenticated non-loopback) + 2 verified config / provider snippets (config.get, config.providers); each TypeScript block carries purpose/expected/smallest/freshness 4-line comment header; writer-verified subset per the high-level plan; pointer table for unverified bodies (session.command / session.shell / client.auth.set / client.provider.oauth.authorize) with types.gen.ts revalidation; zero em-dash bytes; cross-link back-references to 00-08 + progress.md resolve |
| 12 | `11_live_validation.md` | 3E2 | done | Live-evidence header, expanded matrix (Phase 1 rows 0-8; Phase 2 rows 9A-9G for 7 Go alternatives including BOTH A and B; row 9-go-historical preserved; Phase 3 rows 10-13 for 4 other providers OpenAI/Anthropic/Groq/Ollama; Phase 4 row 14 cleanup), verdict taxonomy (PASS, PASS-RecipeOnly, PASS-Historical, FAIL-Struct, SKIP-UpstreamIncident, sentinel preserved as closed-set member), token-cap residual (4 caps: soft schema, provider-side max_tokens, HTTP timeout, wall-clock abort), harness cleanup confirmation; provenance deviation note recorded; expansion notice documenting the change from the original 11-row bounded matrix to the 22-row expanded matrix |
| 13 | `10_known_issues_and_troubleshooting.md` | 3F | done | Four tables (A verified current, B resolved historical, C generic operational, D live-execution open issues) plus one troubleshooting map symptom-to-cause-to-fix |
| 14 | `99_sources.md` | 3F | done | Authoritative mirror of the [S1]..[S22] citation ledger with access date 2026-08-18; [S18] row preserved even though dossier body does not cite it (provider-class, not SDK) |

## Phase table

| Phase | Goal | Files added | Live calls | Review gate |
|---|---|---|---|---|
| 3A | Scaffold and foundations | `00_README.md`, `01_prerequisites.md`, `progress.md` | 0 | am-review on Phase 3 |
| 3B | Quickstart, decision guide, API map | `02_quickstart.md`, `03_decision_guide.md`, `04_api_map.md` | 0 | included in Phase 3 review |
| 3C | Operational guidance | `05_lifecycle.md`, `06_security.md`, `07_errors.md`, `08_events.md` | 0 | included in Phase 3 review |
| 3D | Verified examples cookbook | `09_examples.md` | 0 | included in Phase 3 review |
| 3E1 | Harness creation, auth-free checks, cleanup rehearsal (zero provider calls) | harness only (outside the tracked repo) | 0 (auth-free only) | mandatory `am-review` PASS before 3E2 |
| 3E2 | Bounded provider execution (with Go A+B expansion + 5 Go variants + 4 other providers as recipe-only rows) | `11_live_validation.md` | 1 Zen + 0-1 Go (gated) + 1 raw SSE on local loopback + 0 other-provider | mandatory `am-review` PASS before 3F |
| 3F | Known issues, sources, final lint | `10_known_issues_and_troubleshooting.md`, `99_sources.md`; `progress.md` flipped to complete | 0 | final Phase 3 review |

## Reading this board

- A file marked `done` is safe to read as source-cited content. It does not mean it has been am-reviewed yet; the dossier-wide review runs at the end of Phase 3.
- A file marked `in-progress` exists but may be incomplete; expect stubbed-out sections.
- A file marked `todo` or `pending` does not exist. Do not link to it; do not assume its content matches the plan.
- The live-validation row (`11_live_validation.md`, currently row 12) flips from `pending` to `done` only after Phase 3E2's `am-review` PASS lands.

## Out-of-scope reminders (still in force)

- Pre-existing unrelated Aug-16 untracked files are preserved as a baseline; nothing in this folder or in the writer's dispatch touches them.
- No commits are made by the writer. The user retains commit authority.
- No global `opencode` CLI upgrade. The CLI stays on whatever the host already has; the dossier pins the SDK at `1.18.18` and reports the skew.
- No auth-file reads or environment dumps. The progress file is the only provider-presence signal a reader needs; do not augment it with credential contents.

## Freshness footer

sdk=1.18.18 cli=1.18.x access=2026-08-18
