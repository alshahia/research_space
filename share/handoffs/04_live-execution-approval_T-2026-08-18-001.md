# Live execution approval - T-2026-08-18-001

**Captured:** 2026-08-18
**Primary research:** `share/notes/01_research_T-2026-08-18-001_zen-live-validation.md`
**Backup research:** `share/notes/01_research_T-2026-08-18-001_opencode-go-backup.md`
**Prior choices:** `share/handoffs/03_live-validation-choices_T-2026-08-18-001.md`

## Final user authorization

- OpenCode Zen primary: use only `opencode/deepseek-v4-flash-free`.
- Never fall back to a paid Zen model.
- OpenCode Go backup: subscription is active; use `opencode-go/deepseek-v4-flash` only if the Zen free path produces a bounded upstream/free-limit/SSE incident.
- Go timing: run when needed, even during peak pricing.
- Go budget: one synthetic prompt, no retry, maximum 16 output tokens, 30-second hard timeout, no tool calls, no file input, no model substitution.
- Structured output: include the live JSON-schema path.
- Events: include SDK subscription plus bounded raw SSE diagnostic.
- Credentials: reuse existing global OpenCode CLI configuration without reading, printing, copying, or storing any key.
- Data: synthetic, non-sensitive inputs only.

## Required verdict handling

- Zen valid incident verdicts: `SKIP-FreeLimitError`, `SKIP-SSE-Hang`, `SKIP-UpstreamIncident`.
- Go valid incident verdicts: `SKIP-LoopIncident`, `SKIP-GibberishIncident`, `SKIP-AUTH`, `SKIP-Cost-Overage`, `SKIP-UpstreamIncident`.
- Distinguish SDK failure from upstream/provider failure.
- Record any issue with sanitized reproduction, versions, timestamp, expected, actual, verdict, official issue ID, workaround if verified, and cleanup result.
- Stop after the bounded backup. Do not try another model.

## Planning direction

- Refine the current 13-file docs plan to include live execution and sanitized evidence.
- Add the minimum number of final artifacts. Prefer one dedicated live-validation Markdown file; add machine-readable evidence only if it materially improves agent use or review reproducibility.
- Keep temporary SDK installations, test harnesses, logs, and credentials outside the tracked repository or remove them before completion.
- The revised plan must return to the user confirmation gate before writer dispatch.
