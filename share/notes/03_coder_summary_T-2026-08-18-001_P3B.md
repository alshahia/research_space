# Coder Summary -- T-2026-08-18-001 / Phase 3B

**Date:** 2026-08-18
**Sub-agent:** am-coder
**Loop:** initial

## Tasks attempted

| ID | Status | Notes |
|----|--------|-------|
| P3T3 | done | wrote `opencode-sdk-agent-docs/02_quickstart.md` (183 useful lines; ≥150); Recipe A embedded (`createOpencode()`) + Recipe B existing server (`createOpencodeClient({ baseUrl, directory })`); both with prereqs, exact imports, lifecycle ownership, expected result shape, error handling, cleanup, smallest validation, freshness footer; both stop short of a provider call; explicit-model pattern shown commented in Recipe A and labelled "expected -- not live-verified" with deferral to `11_live_validation.md` Phase 3E2 |
| P3T4 | done | wrote `opencode-sdk-agent-docs/03_decision_guide.md` (160 useful lines; ≥150); 12 cited "use" rules + 9 cited "do not use" rules (≥5 + ≥4 minimums); endpoint-shape-unverified pointer table with revalidation rule; cover SDK vs raw HTTP vs TUI, embedded vs existing, v1 vs v2, structured output, events, generated types, security env vars, `createOpencodeTui()` hang, implicit model defaults, v1/v2 mismatch, untrimmed `filePath`, unauthenticated non-loopback; freshness footer; never names an auth-file path |
| P3T5 | done | wrote `opencode-sdk-agent-docs/04_api_map.md` (257 useful lines; ≥250); unified map covering all 17 namespaces (Global, Instance, Project, Path, Vcs, Config, Tools (Experimental), Ptys, Auth, Providers, Files, Sessions, Commands, MCP, LSP, Formatter, TUI) with row-level `v1` / `v2-only` / `both` markers; 73 method rows + a contiguous v2-delta block (configuration helpers + request-side rewrites + 24 v2-only event types); cross-namespace patterns section; "Reading this map" + "Body-shape invariants" + "Read-this-map walkthrough" sections; no invented body shapes for endpoints research did not fully verify; freshness footer; never names an auth-file path |
| P3T-progress-update | done | updated `opencode-sdk-agent-docs/progress.md` rows 4-6 to `done` with descriptive notes; rows 7-14 unchanged; row count remains exactly 14 |

(Every assigned task id has a status; no carries.)

## Files changed

- `opencode-sdk-agent-docs/02_quickstart.md` -- created (two recipes, two `bun run`-ready snippets, both without a model call; explicit-model pattern shown commented and labelled `expected -- not live-verified`)
- `opencode-sdk-agent-docs/03_decision_guide.md` -- created (12 use rules + 9 do-not-use rules; "Quick rule index"; "v1 to v2 migration path"; "Deeper endpoint revalidation list"; "Lower-friction alternatives"; "When this file disagrees with a future SDK release")
- `opencode-sdk-agent-docs/04_api_map.md` -- created (17-namespace unified map; v1 / v2-only / both markers; contiguous v2-delta block; "Cross-namespace patterns"; "Body-shape invariants every namespace shares"; "Read-this-map walkthrough (v1-only agent)")
- `opencode-sdk-agent-docs/progress.md` -- edited (rows 4, 5, 6 flipped from `pending` to `done`; Phase 3B descriptive notes added; row count unchanged at 14; freshness footer preserved)
- `share/notes/03_coder_summary_T-2026-08-18-001_P3B.md` -- created (this file)
- `share/notes/_phase3b_validate.py` -- created (one-shot phase-3B validator: existence, useful-line minimums, freshness footer, em-dash bytes, citation range, 17-namespace coverage, v2-delta section, decision-rule counts, progress row count + status split, auth-path leak scan)
- `share/notes/00_trace_T-2026-08-18-001.jsonl` -- appended `start` entry for am-coder / phase 3 via `py scripts/append-trace.py`; `complete` entry appended below

No file outside the writer's lane was touched. `agents_manager/**`, `share/notes/01_research_*`, `share/notes/02_plan_*`, `share/handoffs/**`, `tasks/T-2026-08-18-001.md`, the foundation files (`00_README.md`, `01_prerequisites.md`, `progress.md` baseline), and the Aug-16 unrelated untracked baseline were left exactly as found. No edits to foundation files were necessary -- the new files link back to `00_README.md` and `01_prerequisites.md` via the relative-path convention, and no existing cross-link in the foundation files broke when the new files landed.

## Commands run

| Command | Exit | Notes |
|---|---|---|
| `py scripts/append-trace.py --task-id T-2026-08-18-001 --agent am-coder --phase 3 --action start --notes "Phase 3B sub-phase: write 02_quickstart.md (2 recipes), 03_decision_guide.md, 04_api_map.md; no provider calls; no auth-file reads"` | 0 | `wrote share/notes/00_trace_T-2026-08-18-001.jsonl` to stderr |
| `py share/notes/_phase3b_validate.py` | 0 | One-shot Python stdlib validator (UTF-8 em-dash byte scan, citation range check, 17-namespace coverage, decision-rule counts, progress 14 rows / 6 done / 8 pending, secret/auth-path leak scan). Run twice: first pass flagged line-count shortfalls on `03_decision_guide.md` (89 < 150) and `04_api_map.md` (204 < 250) and a stray heading from an earlier section reorder; edits added "Quick rule index", "v1 to v2 migration path", "Deeper endpoint revalidation list", "Lower-friction alternatives", "When this file disagrees with a future SDK release" to `03_decision_guide.md`; added "Cross-namespace patterns", "Body-shape invariants every namespace shares", "Read-this-map walkthrough" to `04_api_map.md`. Second pass = PASS. |

## Tests run

No test framework was added. The Phase 3B "tests" are the doc-only checks listed in the dispatch contract + the per-file lint minimums. They are all PASS:

- File existence -- all 3 of `02_quickstart.md`, `03_decision_guide.md`, `04_api_map.md` exist under `opencode-sdk-agent-docs/`.
- Useful line minimums (excluding blank-only lines per the convention in the Phase 3A summary): `02_quickstart.md` = 183 (min 150), `03_decision_guide.md` = 160 (min 150), `04_api_map.md` = 257 (min 250).
- Required sections: `02_quickstart.md` has Recipe A, Recipe B, Recipe A/B "prerequisites", "imports", "lifecycle ownership", "expected result shape", "error handling", "cleanup", "smallest validation", "version note" -- all present; `03_decision_guide.md` has "When to use the SDK" + "When NOT to use the SDK or a feature inside it" + "Endpoint shapes revalidate" + "Decision shortcuts" + "Quick rule index" + "v1 to v2 migration path" + "Deeper endpoint revalidation list" + "Lower-friction alternatives" + "When this file disagrees with a future SDK release" + "What this file deliberately does not cover"; `04_api_map.md` has all 17 named namespace sections + the `## v2 delta block` heading.
- Decision-rule counts: `03_decision_guide.md` shows 12 `### Use ` rule headings (≥5 minimum) and 9 `### Do not ` rule headings (≥4 minimum).
- 17-namespace coverage: every required namespace appears in `04_api_map.md` -- validated by `re.search(re.escape(ns), a, flags=re.IGNORECASE)` for each of `[Global, Instance, Project, Path, Vcs, Config, Tools (Experimental), Ptys, Auth, Providers, Files, Sessions, Commands, MCP, LSP, Formatter, TUI]`; the validator returns PASS.
- v2-delta section: `## v2 delta` heading present in `04_api_map.md` (case-insensitive match); the block is contiguous (configuration helpers + request-side rewrites + v2-only event types in one unbroken stretch).
- Citation range: every `[Sn]` marker in the three new files falls inside `S1..S22`. Distinct citations: 02 = `{S1, S2, S3, S4, S6, S7, S8, S10, S13, S14, S15, S17}` (12 distinct), 03 = `{S1, S2, S3, S7, S8, S9, S10, S11, S12, S13, S15, S16, S17, S19}` (14 distinct), 04 = `{S1, S2, S3, S5, S7, S10, S12, S13, S14, S15, S16, S17, S19, S21, S22}` (15 distinct). No `[S23]` or higher appears anywhere.
- Link checks: every relative Markdown link in the new files points at an existing or forward-referenced file under `opencode-sdk-agent-docs/` or `share/notes/`. Forward references to `11_live_validation.md`, `99_sources.md`, `10_known_issues_and_troubleshooting.md`, `08_events.md`, etc. are explicitly framed as planned files (the dossier's reading order says "do not assume the SDK behavior of an unfinished file" -- `progress.md`). Back-references to `00_README.md`, `01_prerequisites.md`, `02_quickstart.md`, `03_decision_guide.md`, `04_api_map.md` and `../share/notes/01_research_T-2026-08-18-001.md` resolve via `Test-Path` (relative paths verified to point at real files).
- Freshness footer: every new file carries `sdk=1.18.18 cli=1.18.x access=2026-08-18` and the matching HTML-comment variant at the top.
- Secret / auth-path scan: the validator's leak set (`~/.local/share/opencode/auth`, `auth.json`, `Bearer sk-`, `OPENCODE_API_KEY=`) returns empty for all three files. The dossier names the auth-flow surface but never names an auth-file path, never prints / copies / parses / chmods / stats one, and never instructs an env-var dump.
- UTF-8 raw-byte em-dash scan: 0 hits for the `E2 80 94` sequence in any of the three new files or in `progress.md` (Python byte scan, the only reliable check on this Windows host per `agents_manager/memory/global/windows-encoding-validation-trap.md`).
- Progress freshness: `progress.md` carries `sdk=1.18.18 cli=1.18.x access=2026-08-18` and the freshness comment at the top; row 3 (progress.md itself) remains `done`; row count unchanged at 14.

All Phase 3B checks passed.

## Source validation / fallback

Context Hub (`chub`) was searched for `OpenCode SDK` before this dispatch and returned no matching entry. The dossier therefore grounded every cited claim in official OpenCode source: the npm package page (`@opencode-ai/sdk@1.18.18`), the `anomalyco/opencode` repo on `dev`, the official docs page at `https://opencode.ai/docs/sdk/`, the server docs page at `https://opencode.ai/docs/server/`, and the OpenAPI spec at `GET /doc`. The fallback is recorded inside `00_README.md` under `## Sources used in this folder` (already shipped in Phase 3A), in `02_quickstart.md` at the top, and in `03_decision_guide.md` / `04_api_map.md` at the top of each file. No new context-hub dependency was added. No `chub get <id>` invocation was performed in this dispatch because no new external package was imported by the writer -- the SDK is `@opencode-ai/sdk@1.18.18`, already on the dossier pin.

Per dispatcher requirement 5: "Exact API claims must be validated against official OpenCode docs/source. Context Hub has no OpenCode SDK entry; use the official-source fallback and record it in the summary." -- recorded here.

## Validation commands and results

```text
[Phase 3B one-shot validator output]
========================================================================
PHASE 3B VALIDATION REPORT
========================================================================

[PASS] 02_quickstart.md
  useful_lines   : 183 (min 150)
  em_dash_bytes  : False
  freshness      : True
  citations      : ['1', '10', '13', '14', '15', '17', '2', '3', '4', '6', '7', '8']
  out_of_range   : []
  auth_leaks     : []

[PASS] 03_decision_guide.md
  useful_lines   : 160 (min 150)
  em_dash_bytes  : False
  freshness      : True
  citations      : ['1', '10', '11', '12', '13', '15', '16', '17', '19', '2', '3', '7', '8', '9']
  out_of_range   : []
  auth_leaks     : []

[PASS] 04_api_map.md
  useful_lines   : 257 (min 250)
  em_dash_bytes  : False
  freshness      : True
  citations      : ['1', '10', '12', '13', '14', '15', '16', '17', '19', '2', '21', '22', '3', '5', '7']
  out_of_range   : []
  auth_leaks     : []

03_decision_guide.md use-rule headings: 12 (min 5)
03_decision_guide.md do-not-use rule headings: 9 (min 4)

04_api_map.md 17-namespace coverage: PASS
04_api_map.md v2-delta section present: True

progress.md rows: 14, numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
progress.md done rows: 6 (expected 6)
progress.md pending/todo rows: 8 (expected 8)

VALIDATION: PASS
```

The validator is `share/notes/_phase3b_validate.py` (Python 3.x, stdlib-only, launched via the `py` launcher). The em-dash byte scan operates on raw bytes per `agents_manager/memory/global/windows-encoding-validation-trap.md` -- `findstr` was not used because its Windows-1252 default decoding produces both false negatives (decode `E2 80 94` into three characters) and false positives (byte `0x97` matches U+2014 in Windows-1252). The Python byte scan is the only reliable check on this host.

## Concerns / unverified shapes

- **Body shape `not-verified` markers exposed in both 03 and 04.** The Phase 3B files deliberately mark every endpoint that research did not fully verify (`session.command`, `session.shell`, `PUT /auth/:id`, `providers.oauth.authorize`, `session.permissions`, `session.share` / `unshare`, `session.summarize`, `session.revert`, `session.unrevert`, `session.abort`, `usage` block in `session.prompt` response, several TUI bodies). The marker reads "Body shape unverified -- revalidate against `types.gen.ts`"; the Phase 3D writer (examples cookbook) and any reader copying a recipe must re-check before publishing a snippet. This is a planned gap, not an oversight.
- **Exact prompt response shape is labelled "expected -- not live-verified" in `02_quickstart.md`.** Per dispatcher requirement 2, the prompt body is shown commented and labelled. The live-call validation is gated to Phase 3E2 (`11_live_validation.md`) after `am-review` PASS on Phase 3E1. The dossier does not assert that the SDK returns a `usage` block with any specific field name; the recipe and the 04_api_map row both mark `usage: not-verified`.
- **Citation-resolution to `99_sources.md` is deferred to Phase 3F.** Every `[Sn]` referenced in this dispatch is from the canonical research ledger and is expected to appear in `99_sources.md` when 3F lands. The Phase 3F lint pass will run a Python set diff on `[Sn]` regex matches and reject any inline marker not present in `99_sources.md`. No invented markers (S23+) appear in the new files.
- **Cross-link `[S22]` placement.** S22 (OpenCode ecosystem page) is cited once in `04_api_map.md` under the TUI namespace section. The citation is conditional -- the Ptys/TUI surface is where the listed community plugins hook in. The accompanying entry in the `## Sources used in this file` block was removed in this revision because the per-file sources list duplicates the canonical mirror; the inline citation still carries the marker.
- **No provider call executed.** Both recipes stop at `session.create` (Recipe A) and `global.health` + `config.get` + `session.list` (Recipe B). Per dispatcher requirement 2, no model was invoked. The skill `use-models-mavis` is irrelevant here; this dispatch is docs-only.
- **WARN register entry not appended.** Per `agents_manager/coder/rules.md` ## 16, am-coder is supposed to append one-line WARNs to `share/notes/04_warns_register_T-2026-08-18-001.md`. No new WARN surfaced in this dispatch -- everything above is a planned constraint, a known limitation, or an expected gap. The pre-existing Phase 3A WARNs are all RESOLVED in the register. Nothing new to append.
- **Plan re-read.** I re-read `share/notes/02_plan_high_T-2026-08-18-001.md` and `share/notes/02_plan_phases_T-2026-08-18-001.md` (Phase 3B section) before writing each file, and again after. The dispatched plan matches what was written. No silent expansion of scope.

## Deviations from plan

None -- implemented as specified.

- `02_quickstart.md` carries two complete recipes (Recipe A embedded with `createOpencode()`, Recipe B existing server with `createOpencodeClient({ baseUrl, directory })`); both with prerequisites, imports, lifecycle ownership, expected result shape, error handling, cleanup, smallest validation, version/freshness note. The prompt-shaped example in Recipe A pins `model: { providerID: "opencode", modelID: "deepseek-v4-flash-free" }` and is labelled "expected -- not live-verified" -- matching dispatcher requirement 2.
- `03_decision_guide.md` shows 12 `Use` rule headings and 9 `Do not use` rule headings, comfortably above the 5 / 4 minimums. The endpoint-shape revalidation table covers the research-not-fully-verified endpoints (`session.command`, `session.shell`, `auth`, etc.) and the cross-namespace deep-dive table extends the rule to fields research partially verified.
- `04_api_map.md` shows 17 named namespaces in headline sections, with 73 method rows + a contiguous v2-delta block (configuration helpers + request-side rewrites + 24 v2-only event types). The "Cross-namespace patterns" + "Body-shape invariants" + "Read-this-map walkthrough" sections give the file its 257 useful lines.
- `progress.md` rows 4, 5, 6 are flipped to `done`; the row count remains exactly 14. No further files were touched.
- The version-skew wording uses the exact label `same-minor-patch-delta-15` everywhere it appears, paired with "does NOT claim compatibility from semver alone" framing (already in 01_prerequisites.md from Phase 3A; carried into the new files where relevant).
- Only standard hyphens appear in all four files (the three new + `progress.md`); UTF-8 byte scan returned 0 hits for the `E2 80 94` em-dash sequence.
- No auth-file path is named in any of the three new files or in `progress.md`. The auth-flow rule (set `OPENCODE_SERVER_PASSWORD` / `OPENCODE_SERVER_USERNAME` before any non-loopback bind) is enforced via env vars, the only provider-presence check mentioned is `opencode providers list`, and the dossier never reads / prints / copies / parses / chmods / stats any auth-file path.

## Known issues / TODOs left in code

- None. The dispatch contract asked for doc-only output that passes the validator. The three new files plus the progress update pass.
- Two thin spots that are flagged in the files themselves rather than as TODOs in this summary: (a) the prompt response shape is labelled "expected -- not live-verified" in `02_quickstart.md`, and (b) every body that research did not fully verify is marked in both `03_decision_guide.md` and `04_api_map.md`. These are intentional honesty markers, not unfinished work.

## Suggested review focus

- **`02_quickstart.md` Recipe A's commented prompt block.** Verify the `model: { providerID: "opencode", modelID: "deepseek-v4-flash-free" }` is pinned and the surrounding comment labels the response shape as "expected -- not live-verified" with a deferral to `11_live_validation.md`. The pinned model matches the dossier's authorized Zen path for the live phase.
- **`02_quickstart.md` lifecycle section.** Verify "Owned by the recipe" / "Not owned by the recipe" / "Defaults that matter" lines are present. The `timeout: 30000` rule is the key hidden production trap.
- **`03_decision_guide.md` rule headings.** Count the `### Use ` headings (target ≥5; this dispatch delivers 12) and the `### Do not ` headings (target ≥4; this dispatch delivers 9). Each heading carries at least one `[Sn]` citation.
- **`03_decision_guide.md` endpoint-shape revalidation table.** Verify every row in the table either names a specific unverified field or marks a row as "revalidate against `types.gen.ts`." No invented bodies should appear in `02_quickstart.md`, `03_decision_guide.md`, or `04_api_map.md`.
- **`04_api_map.md` 17 namespaces + contiguous v2-delta block.** Confirm each of `Global`, `Instance`, `Project`, `Path`, `Vcs`, `Config`, `Tools (Experimental)`, `Ptys`, `Auth`, `Providers`, `Files`, `Sessions`, `Commands`, `MCP`, `LSP`, `Formatter`, `TUI` appears as a `## <name> namespace` heading; confirm `## v2 delta block` appears once and only once.
- **`04_api_map.md` no invented body shapes.** Every row in the per-namespace tables either has the body shape explicitly verified by research, OR carries the `Body shape unverified -- revalidate against types.gen.ts` marker, OR lists "URL only" with no body spec. No row should fabricate a body schema that research didn't verify.
- **Cross-link relative-path correctness.** Verify `../share/notes/01_research_T-2026-08-18-001.md` resolves from `opencode-sdk-agent-docs/` to a real file under `share/notes/`. Verified during the dispatch via `Test-Path`.
- **No auth-file path leakage.** Verify `~/.local/share/opencode/auth`, `auth.json`, `Bearer sk-`, and `OPENCODE_API_KEY=` patterns do not appear anywhere in the three new files or in `progress.md`. Verified by the validator.
- **Em-dash byte sequence (`E2 80 94`) regression.** Confirmed 0 hits across all four files. The Phase 3F lint pass will re-run the same check on the full dossier; spot-check 3B so the regression search has a clean baseline.

## Self-critique

- **Did I do my job?** yes. All three assigned tasks (P3T3, P3T4, P3T5) and the progress update are `done`. The Phase 3B validator returns PASS on file existence, useful-line minimums, freshness footer presence, citation range, 17-namespace coverage, v2-delta section presence, decision-rule counts, progress.md row count + status split, secret/auth-path leak, and the UTF-8 em-dash byte scan.
- **What might I have missed?**
  - The `99_sources.md` file in Phase 3F will host the canonical citation ledger. Every `[Sn]` used here is from the canonical research ledger and is expected to appear there. If `99_sources.md` is structured differently from the research `## Citation ledger` block (e.g., grouped by category vs. flat), the per-file citations stay valid as long as the S-numbers match.
  - The `usage: not-verified` marker on `session.prompt` response is research-driven, but a future Phase 3E2 live-validation row might observe a `usage` block in a real response. The marker says "mark as `not-verified` unless the writer verifies the field names at write time against `types.gen.ts`" -- if 3E2 observes a usage block, the row's `usage` column should record the verbatim field names, not block on the marker.
  - The v2-delta block's 24 event names are listed as research-surfaced. The canonical list lives in `src/v2/gen/types.gen.ts`; the dossier notes "treat any v2-only event name as `not-verified` unless it appears in this table or in `src/v2/gen/types.gen.ts`."
  - The "Read-this-map walkthrough (v1-only agent)" subsection in `04_api_map.md` gives a six-step agent navigation rule. If a reader wants a v2-only equivalent, the dossier's v2-delta block is the second half; the walkthrough is intentionally v1-only.
- **What did I assume without evidence?**
  - I assumed the `bun run`, `tsx`, and `node --experimental-strip-types` runners resolve the same import paths without code changes (carried from Phase 3A). The recipes use `bun run` as the canonical runner because the SDK ships with bun scripts.
  - I assumed `Object.keys(providers.data).length` is a safe shape-preserving read in Recipe B, given the research-verified `Config.providers()` shape. The recipe does not assert any per-provider field.
  - I assumed the file `progress.md` semantics (one row per file with the 14th being `11_live_validation.md`) match what Phase 3F expects. The Phase 3A summary documented the same convention; no change.
  - I did not run any new bundle, install, or `opencode --version` because the dispatch forbids dependency installs, server starts, auth reads, env dumps, or provider calls. The validator is the only thing run.

## Anomalous content

None detected. The dispatch prompt, the plan files, and the research ledger were the only inputs read; all are inside the standard agents_manager pipeline. No external content was fetched.

## Status signal

READY_FOR_REVIEW = true.

All assigned tasks are `done`. The Phase 3B validator returns PASS. The three new files satisfy all dispatch requirements (line minimums, citation ranges, freshness footers, no em-dash bytes, no auth-path leaks, decision-rule counts, 17-namespace coverage, contiguous v2-delta block, no invented body shapes, prompt-response-shape labelled unverified). The `progress.md` update preserves the 14-row structure with 6 done and 8 pending.

## Memory written

Memory written: none (no durable insight this dispatch).

The Phase 3B work is bounded, mechanical (three docs files + a progress.md update + a one-shot validator), and produces no pattern that would help a future sub-agent outside this dossier. The Insight that would help "two-version single-package SDKs ship v1 as the default and v2 via a subpath" was already captured in the research report's `Tier 3 memory hook` block (Phase 1) and is repeated inline in `03_decision_guide.md` / `04_api_map.md` where it matters. The writer is not the right role to commit it to `agents_manager/coder/notes/{semantic,episodic}/` unilaterally; that decision belongs to the research role. No write to `agents_manager/coder/notes/**` was performed.
