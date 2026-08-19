# Server-Sent Events

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file is for any reader consuming OpenCode events. It documents the single global SSE endpoint, the generated client's retry options, a bounded subscription, the source-verified v1 event type names, and the v2-only delta.

Read [`04_api_map.md`](04_api_map.md) for the Global namespace, [`05_lifecycle.md`](05_lifecycle.md) for owned-server shutdown, and [`07_errors.md`](07_errors.md) for transport error classification. The source mirror is planned for [`99_sources.md`](99_sources.md); until then, `[Sn]` markers resolve to [`../share/notes/01_research_T-2026-08-18-001.md`](../share/notes/01_research_T-2026-08-18-001.md).

## Endpoint

OpenCode exposes the global event stream at [S1][S2]:

```http
GET /global/event
Accept: text/event-stream
```

Use the generated subscription method rather than manually polling when a caller needs state changes as they happen. Research identifies the SDK surface as `client.event.subscribe()` and the underlying HTTP endpoint as `GET /global/event` [S1][S2].

SSE is appropriate for:

- Session and message changes.
- Installation status changes.
- LSP diagnostics and status updates.
- Server instance disposal.
- v2 part-level and step-level streaming.
- v2 permission, question, workspace, worktree, MCP-tool, compaction, and TUI updates.

SSE is not a provider endpoint. Subscribing to the local OpenCode server does not itself invoke a model.

## Subscription ownership

A subscription is a long-lived resource. The caller owns:

1. The client and its `baseUrl`.
2. The retry budget.
3. The abort signal.
4. Event dispatch.
5. Unknown-event handling.
6. Shutdown before an owned server is closed.

If the same agent owns the server, abort the SSE subscription first, wait for its loop to finish, then call `server.close()` as described in [`05_lifecycle.md`](05_lifecycle.md).

## `@hey-api/sse-fetch` option surface

The v1 generated client passes these SSE options through the `@hey-api` SSE layer [S1]:

| Option | Purpose | Dossier policy |
|---|---|---|
| `onSseError` | Observe an SSE transport or parse error | Log a sanitized message; do not dump response bodies |
| `onSseEvent` | Observe each SSE frame as it arrives | Keep work small; hand off heavy processing |
| `sseDefaultRetryDelay` | Base delay when the server does not provide one | Use a bounded positive delay |
| `sseMaxRetryAttempts` | Maximum reconnect attempts | Set a finite budget |
| `sseMaxRetryDelay` | Upper bound for reconnect delay | Cap delay so shutdown remains predictable |

The option names are source-verified. The numeric values below are a dossier retry strategy, not server defaults.

## Recommended retry strategy

For a long-lived agent:

- `sseDefaultRetryDelay: 1000`.
- `sseMaxRetryAttempts: 5`.
- `sseMaxRetryDelay: 10000`.
- One `AbortController` for explicit shutdown.
- No second outer infinite retry loop.
- Reset application health only after a frame is received.
- Escalate to degraded mode after the finite budget is exhausted.

Why finite retries:

- An import/server version mismatch does not heal through reconnects.
- An owned server that is closing should not be restarted by an SSE loop.
- A network outage should surface to orchestration after a bounded wait.
- Two nested retry loops multiply attempts and hide the original failure.

## Runnable TypeScript subscription

The snippet connects to an already-running local server. It does not start a server and does not call a provider.

```ts
// Save as events-subscribe.ts and run with a supported TypeScript runner.
import { createOpencodeClient } from "@opencode-ai/sdk";

const controller = new AbortController();
const stopAfterMs = 30000;
const timer = setTimeout(() => controller.abort(), stopAfterMs);

const client = createOpencodeClient({
  baseUrl: "http://127.0.0.1:4096",
  directory: "/absolute/path/to/project",
});

let framesObserved = 0;

try {
  const subscription = await client.event.subscribe({
    signal: controller.signal,
    onSseError: (value) => {
      const message = value instanceof Error ? value.message : String(value);
      console.error("SSE transport error:", message);
    },
    onSseEvent: () => {
      framesObserved += 1;
    },
    sseDefaultRetryDelay: 1000,
    sseMaxRetryAttempts: 5,
    sseMaxRetryDelay: 10000,
  });

  for await (const event of subscription.stream) {
    const type = (event as { type?: unknown }).type;
    console.log(
      "OpenCode event:",
      typeof type === "string" ? type : "<unknown-type>",
    );
  }
} catch (value) {
  if (!controller.signal.aborted) {
    throw value;
  }
} finally {
  clearTimeout(timer);
  controller.abort();
  console.log("SSE frames observed:", framesObserved);
}
```

The snippet reads only the common `type` discriminator defensively. It does not assume any event-specific payload field.

## Smallest validation contract

For an approved local test with an already-running server:

- The client connects to `GET /global/event`.
- The process remains bounded by the 30-second abort.
- Any received frame logs a string type or `<unknown-type>`.
- The process exits after abort.
- No provider call is made.
- No event payload body is printed.

This Phase 3C dispatch does not execute the snippet. Observed live evidence is reserved for the gated [`11_live_validation.md`](11_live_validation.md).

## Event name versus runtime discriminator

The tables below list generated TypeScript event type names, because that is what [S15] and [S16] verify. Do not assume the TypeScript export name is the literal runtime `event.type` string. Inspect the corresponding generated type before writing a `switch` on a runtime discriminator.

For every payload row below, the event type name is verified but the full payload body is not copied into this dossier. The required marker is therefore repeated: `Body shape unverified -- revalidate against types.gen.ts`.

## Verified v1 event types

The canonical research explicitly verifies these seven v1 generated event type names [S15]. No additional v1 name is asserted here.

| # | Verified v1 type name | What research establishes | Payload policy |
|---|---|---|---|
| 1 | `EventServerInstanceDisposed` | Type exists in v1 generated types | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventInstallationUpdated` | Type exists in v1 generated types | Body shape unverified -- revalidate against types.gen.ts |
| 3 | `EventInstallationUpdateAvailable` | Type exists in v1 generated types | Body shape unverified -- revalidate against types.gen.ts |
| 4 | `EventLspClientDiagnostics` | Type exists in v1 generated types | Body shape unverified -- revalidate against types.gen.ts |
| 5 | `EventLspUpdated` | Type exists in v1 generated types | Body shape unverified -- revalidate against types.gen.ts |
| 6 | `EventMessageUpdated` | Type exists in v1 generated types | Body shape unverified -- revalidate against types.gen.ts |
| 7 | `EventMessageRemoved` | Type exists in v1 generated types | Body shape unverified -- revalidate against types.gen.ts |

### v1 handling rule

A v1 consumer should:

- Compile against `@opencode-ai/sdk`.
- Import generated types from the same pinned package version.
- Handle only runtime discriminator values verified in that generated file.
- Keep an explicit unknown-event branch.
- Avoid asserting payload fields from the type name alone.
- Revisit the generated file after any SDK upgrade.

## v2 delta overview

The v2 generated types add a richer event surface not present in v1 [S16]. Use `@opencode-ai/sdk/v2` only after the version probe confirms the running server matches that surface.

The verified v2 delta groups are:

- `EventMessagePartDelta`, `EventMessagePartUpdated`, `EventMessagePartRemoved`.
- The `EventSessionNext*` family.
- The `EventPermissionV2*` family.
- The `EventQuestionV2*` family.
- The `EventWorkspace*` family.
- The `EventWorktree*` family.
- `EventMcpToolsChanged`.
- `EventSessionCompacted`.
- The `EventTui*2` family.

The exact source-surfaced names follow. Do not synthesize sibling names that are not listed.

## v2 message-part events

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventMessagePartDelta` | Part-level streaming delta | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventMessagePartUpdated` | Part update | Body shape unverified -- revalidate against types.gen.ts |
| 3 | `EventMessagePartRemoved` | Part removal | Body shape unverified -- revalidate against types.gen.ts |

These types are source-verified in the v2 generated file [S16]. They are not part of the verified v1 set.

## v2 `EventSessionNext*` family

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventSessionNextText` | Next text chunk | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventSessionNextReasoning` | Next reasoning chunk | Body shape unverified -- revalidate against types.gen.ts |
| 3 | `EventSessionNextTool` | Next tool step | Body shape unverified -- revalidate against types.gen.ts |
| 4 | `EventSessionNextShell` | Next shell step | Body shape unverified -- revalidate against types.gen.ts |
| 5 | `EventSessionNextCompaction` | Next compaction step | Body shape unverified -- revalidate against types.gen.ts |
| 6 | `EventSessionNextRevert` | Next revert step | Body shape unverified -- revalidate against types.gen.ts |
| 7 | `EventSessionNextStepFinish` | Step completion | Body shape unverified -- revalidate against types.gen.ts |

The family coverage mirrors the research categories for text, reasoning, tool, shell, compaction, revert, and step completion [S16].

## v2 permission events

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventPermissionV2Asked` | Permission request | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventPermissionV2Replied` | Permission response | Body shape unverified -- revalidate against types.gen.ts |

Do not invent another `EventPermissionV2*` sibling. The two names above are the source-surfaced set [S16].

## v2 question events

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventQuestionV2Asked` | Question request | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventQuestionV2Replied` | Question response | Body shape unverified -- revalidate against types.gen.ts |
| 3 | `EventQuestionV2Rejected` | Question rejection | Body shape unverified -- revalidate against types.gen.ts |

A historical v2 question-broadcast issue was reported and closed before this dossier's access date [S20]. The planned troubleshooting file records that history; this file only lists the current source-surfaced type names.

## v2 workspace events

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventWorkspaceReady` | Workspace ready | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventWorkspaceFailed` | Workspace initialization failed | Body shape unverified -- revalidate against types.gen.ts |
| 3 | `EventWorkspaceStatus` | Workspace status | Body shape unverified -- revalidate against types.gen.ts |

Workspace events pair with v2's workspace routing surface in [`04_api_map.md`](04_api_map.md) [S10][S16].

## v2 worktree events

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventWorktreeReady` | Worktree ready | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventWorktreeFailed` | Worktree initialization failed | Body shape unverified -- revalidate against types.gen.ts |

Do not infer a `Status` sibling for worktrees. Research surfaced only the two names above [S16].

## v2 MCP and compaction events

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventMcpToolsChanged` | MCP tool-set change | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventSessionCompacted` | Session compaction complete | Body shape unverified -- revalidate against types.gen.ts |

Both names are explicit in the v2 generated-types ledger entry [S16].

## v2 `EventTui*2` family

| # | Verified v2-only type name | Category | Payload policy |
|---|---|---|---|
| 1 | `EventTuiPromptAppend2` | TUI prompt append | Body shape unverified -- revalidate against types.gen.ts |
| 2 | `EventTuiPromptSubmit2` | TUI prompt submit | Body shape unverified -- revalidate against types.gen.ts |
| 3 | `EventTuiPromptClear2` | TUI prompt clear | Body shape unverified -- revalidate against types.gen.ts |
| 4 | `EventTuiCommandExecute2` | TUI command execution | Body shape unverified -- revalidate against types.gen.ts |
| 5 | `EventTuiToastShow2` | TUI toast display | Body shape unverified -- revalidate against types.gen.ts |

These are the source-surfaced `EventTui*2` names already mirrored in the dossier's v2 delta [S16]. Non-interactive agents should not build behavior around TUI events unless they intentionally integrate a controlling terminal.

## Complete verified type-name inventory in this file

### v1 count

Seven names:

1. `EventServerInstanceDisposed`.
2. `EventInstallationUpdated`.
3. `EventInstallationUpdateAvailable`.
4. `EventLspClientDiagnostics`.
5. `EventLspUpdated`.
6. `EventMessageUpdated`.
7. `EventMessageRemoved`.

### v2 delta count

Twenty-seven source-surfaced names:

- 3 message-part names.
- 7 session-next names.
- 2 permission names.
- 3 question names.
- 3 workspace names.
- 2 worktree names.
- 2 MCP/compaction names.
- 5 TUI names.

This count is a documentation inventory, not a claim that v2 has only 27 event types. The canonical full list remains the pinned v2 `types.gen.ts` [S16].

## Unknown-event policy

Generated event surfaces change. A robust consumer must not crash on an unknown event.

```ts
function describeEvent(value: unknown) {
  if (!value || typeof value !== "object") {
    return { type: "<non-object-event>" };
  }

  const type = (value as { type?: unknown }).type;
  return {
    type: typeof type === "string" ? type : "<unknown-type>",
  };
}
```

Use the description for routing or sanitized diagnostics. Do not log the entire payload by default.

Unknown-event rules:

- Preserve the connection.
- Count the event.
- Record the string discriminator when safe.
- Do not cast to the nearest known type.
- Do not infer payload fields.
- Upgrade generated types deliberately, not automatically.

## Retry and error routing

| Observation | Retry behavior | Owner action |
|---|---|---|
| Transient `onSseError` and budget remains | Let the generated SSE layer retry | Keep one finite retry budget |
| Retry budget exhausted | Stop reconnecting | Mark event channel degraded |
| Caller aborts | Do not reconnect | Exit loop and continue shutdown |
| Owned server starts closing | Abort subscription | Await loop completion, then close server |
| Exact v2 HTML guard | Do not reconnect | Align SDK and server using [`07_errors.md`](07_errors.md) |
| Unknown event type | Keep stream open | Route to default branch |

Do not add an unbounded `while (true)` around `client.event.subscribe()`. The generated retry options already own reconnect attempts.

## Backpressure policy

`onSseEvent` should do minimal work:

- Increment a counter.
- Validate the common discriminator.
- Enqueue a small internal record.
- Return quickly.

Do not:

- Run a model call directly inside the callback.
- Perform blocking filesystem scans.
- Await an unbounded queue.
- Log full payloads.
- Start one retry loop per event.

When processing is expensive, hand the event to a bounded queue and apply an application-specific drop or backpressure policy.

## Shutdown ordering

For an agent that owns both subscription and server:

1. Stop accepting new application work.
2. Abort the SSE controller.
3. Wait for the async iterator to finish.
4. Remove process signal handlers.
5. Call `server.close()` in `finally`.
6. Record subscription and server cleanup separately.

For a client that connects to somebody else's server:

1. Abort only the local subscription.
2. Wait for the iterator to finish.
3. Do not dispose or close the external server.

## Version boundary

The default import is the v1 surface. The v2 delta requires the explicit `@opencode-ai/sdk/v2` subpath [S17]. The public docs page covers v1; v2 event types are verified from source [S1][S16].

Before adopting a v2-only type:

- Probe `global.health()`.
- Align the SDK import with the server line.
- Compile against the matching generated types.
- Keep unknown-event handling.
- Re-run the static type-name inventory check after upgrades.

If the pinned coordinates are CLI `1.18.3` and SDK `1.18.18`, the dossier label is `same-minor-patch-delta-15`; it does NOT claim compatibility from semver alone.

## What this file does not claim

- It does not claim the 7-name v1 set is exhaustive beyond what research verified.
- It does not claim the 27-name v2 delta is the full generated event set.
- It does not claim TypeScript export names equal runtime discriminator strings.
- It does not publish event payload bodies.
- It does not start a server.
- It does not invoke a provider.
- It does not report live latency or retry outcomes.

Observed event evidence belongs in the planned [`11_live_validation.md`](11_live_validation.md) after its review gate. Known event incidents belong in the planned [`10_known_issues_and_troubleshooting.md`](10_known_issues_and_troubleshooting.md).

## Cross-file reading path

- Start with [`00_README.md`](00_README.md) for v1/v2 policy.
- Use [`03_decision_guide.md`](03_decision_guide.md) for SSE versus polling.
- Use [`04_api_map.md`](04_api_map.md) for the Global endpoint map.
- Use [`05_lifecycle.md`](05_lifecycle.md) for shutdown ordering.
- Use [`07_errors.md`](07_errors.md) for the HTML guard and transport messages.

## Freshness footer

sdk=1.18.18 cli=1.18.x access=2026-08-18
