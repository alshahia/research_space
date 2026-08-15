# Decision log — tier2-ai-chat

Append-only. Record every build-time decision with date, author, and reason. Per `01_RECOMMENDED_DESIGN.md` Decision 5.

## Entries

| Date | Author | Decision | Reason |
|---|---|---|---|
| 2026-08-14 | am-coder (Phase 3.2) | Dual-path spine: Path A (Vercel AI SDK direct) + Path B (OpenCode SDK bridge) co-equal, picked at intake via `tier.config.json` `modelPath`. | User request chain (2026-08-14): "opencode go" + "minimax token plan provider" + "gemini model" + "you provide two options either ai from scratch or with opencode" → two paths, user choice. Research at `share/notes/04_opencode_research_T-2026-08-14-001.md`. |
| 2026-08-14 | am-coder (Phase 3.2) | Used `@opencode-ai/sdk` (not `@opencode/sdk` as spec said). | The actual canonical package is `@opencode-ai/sdk` (npm `1.18.18`, MIT, matches host opencode CLI `1.18.5`). The spec's `@opencode/sdk` placeholder was a typo. Verified via `npm search opencode`. |
| 2026-08-14 | am-coder (Phase 3.2) | Path B uses `@opencode-ai/sdk` HTTP client mode, not `child_process` to `opencode run --format json`. | The SDK is canonical, well-typed, and matches the host's installed opencode version (1.18.5) within patch distance. SDK is simpler than shelling out + parsing JSON; `client.session.prompt({...})` returns typed `AssistantMessage`. `child_process` fallback is documented in `opencode.ts` but not used. |
| 2026-08-14 | am-coder (Phase 3.2) | Default `modelPath: "direct"` + `modelFamily: "google"`. | Google tier is cheapest on this host (`GOOGLE_API_KEY` already set); `gemini-2.5-flash` is the default model. Users override at intake. |
| 2026-08-14 | am-coder (Phase 3.2) | Smoke test renders seed messages inline in `<App />` (not via `useChat` hook). | `useChat` requires a live `/api/chat` backend; jsdom + Vitest don't ship one. Inline seed messages + `cn()` + `react-markdown` is the smallest path that satisfies "user/assistant bubble rendered for Path A". Tier 2 SaaS / production builds wire `useChat` to the real route. |
| 2026-08-14 | am-coder (Phase 3.2) | OpenCode bridge unit test stubs the `@opencode-ai/sdk` client constructor (not the SDK source). | Stubbing the SDK source requires importing it at test time, which couples the test to the SDK's internal transport. Stubbing the client object (passed as a parameter to the bridge) keeps the bridge testable in isolation. |
| 2026-08-14 | am-coder (Phase 3.2) | Dropped `@ai-sdk/react` from `package.json` deps. | `@ai-sdk/react` is bundled inside the `ai` package as of AI SDK 7.x; not a separate npm dep. Verified via `npm view ai`. |
| 2026-08-14 | am-coder (Phase 3.2) | `DatabaseProvider.tsx` ships unchanged from tier1; the `messages` table + `session_id` column extension is documented as a comment for future tier2-saas-bundle work. | Tier1's storage-adapter stub is intentionally minimal. Adding Drizzle + Postgres schema is the tier2-saas-bundle's job (per Phase 3.5 plan). The comment anchors the extension point without expanding scope. |
