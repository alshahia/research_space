# tier2-ai-chat — dos and donts

Distilled rule list. Read before every `edit` call. Reverses + adds rules from `resources/_archived/general-app-template/RULES_GUIDE.md` and the dossier's AI chat "Agent failure modes" section.

## Do

1. **Write `SPEC.md` before any code.** Restate-and-confirm artifact per `04_INTAKE_PROTOCOL.md`. User replies "go" or "change X to Y". Capture both `modelPath` and `modelFamily` axes in the spec.
2. **Use `cn()` from `src/lib/utils.ts` for every classname join.** Inherits tier1.
3. **Wrap `<App />` in `<DatabaseProvider>` in `src/main.tsx`.** Storage-adapter pattern (tier1); tier2 adds the messages schema stub.
4. **Use `logCreate / logUpdate / logDelete` from `src/lib/audit.ts` for every write.** Inherits tier1.
5. **Run `tsc --noEmit && npm run build && npm test` after every edit batch.** Tier 2 done-when per `01_RECOMMENDED_DESIGN.md` Decision 6 ai-chat row.
6. **Run `node scripts/verify-stack-claims.ts` after every `package.json` write.** Drift gate.
7. **Cite `chub get <id>` for every new dep in the coder summary** (Q5 hard rule). Map to `[Sn]` from `02_STACK_MATRIX.md`.
8. **Use `tier.config.json` for app-level (not framework) config.** Adds `modelPath` + `modelFamily` to the tier1 shape.
9. **Render model output via `react-markdown` + `remark-gfm` + `rehype-highlight`.** NEVER use `dangerouslySetInnerHTML` — model output is untrusted text.
10. **Surface Path B latency expectation in the user-facing copy.** Path B is a full agent loop per message (5–60s typical); not streaming-token-shaped. Don't promise Path A's "snappy chat" UX when Path B is selected.
11. **Cache OpenCode sessions per `conversationId` in `runtime/opencode-sessions.json`.** Keyed by the client-supplied conversation id; survives page reloads; gitignored (per-port, per-machine).
12. **Default `modelPath: "direct"` + `modelFamily: "google"` in `tier.config.json`.** Cheapest path on this host (Google tier). Users override at intake.
13. **Path B stub tests** (don't require a live `opencode serve`). Pass `--stub` to skip the live-spawn branch; the bridge client must compile + unit test against a stub.

## Dont

1. **Don't pin a `package.json` dep without `chub get <id>` in the summary.** No training-data fallback.
2. **Don't handcraft SSE.** AI SDK's `streamText` + `useChat` already solve backpressure, cancellation, message-id correlation, and resumability.
3. **Don't use LangChain for simple chat.** AI SDK is simpler and 10x smaller.
4. **Don't save tokens to `localStorage`.** XSS-stealable.
5. **Don't use `dangerouslySetInnerHTML` on model output.** Pipe through `react-markdown` (it sanitizes by default).
6. **Don't stream JSON without `Output.object({ schema: z.object(...) })`.** Hand-rolled JSON parsing of partial streams breaks on the first nested object.
7. **Don't skip context window management.** Agent re-sending whole history every turn blows the window. Client-side trim to last N or server-side summarization.
8. **Don't trust the client for model identity.** Server reads `tier.config.json` (committed in repo) and `modelPath`/`modelFamily` from there; never trust a client-sent header.
9. **Don't spawn `opencode serve` as part of the test/verify cycle.** The bridge client should compile + pass unit tests against a stub. Live spawn only when running `scripts/start-opencode-server.ps1` for development.
10. **Don't edit `~/.config/opencode/opencode.json` or write under `~/.config/opencode/`.** Read-only on this Windows box.
11. **Don't install / remove / kill the OpenCode CLI on this host.** Use what's there (`C:\Users\AhmadMhmoud\AppData\Roaming\npm\opencode.ps1` v1.18.5).
12. **Don't add `@clerk/nextjs` or Next.js-specific packages.** The spine is Vite-shaped; tier2-saas-bundle picks its own auth vendor if needed.

## Reversed from the old template + tier1 carries forward

| Old rule (`RULES_GUIDE.md`) | Reversed because | New rule |
|---|---|---|
| "NEVER write comments" | Hides API contracts; JSDoc on exports is a net win. | Allow JSDoc on exported functions; banner comments are still forbidden. |
| "NEVER add test framework" | No cheap self-verification → "shipped but broken" mode. | Ship Vitest preconfigured; smoke + bridge unit test. |
| Arabic / RTL default | Most one-line app ideas are English-first. | Default `en` + `ltr`; Arabic is one entry in `locales/`. |
| WatermelonDB everywhere | Browser-only; no server story in 2026. | Drizzle + Postgres default; WatermelonDB as opt-in adapter behind `tier.config.json` flag. |
| Handcrafted SSE | AI SDK already solves it. | `streamText` + `useChat` only. |

## See also

- `index.md` — what this tier is for.
- `reference-projects.md` — canonical Tier 2 ai-chat example.
- `../SKILL.md` § Done — Tier 2 definition-of-done.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 1 — canonical AI chat pins.
- `../../../share/notes/04_opencode_research_T-2026-08-14-001.md` — Path B OpenCode capability research.
- `../tier1-standard/memory/dos-and-donts.md` — tier1 carries forward.
