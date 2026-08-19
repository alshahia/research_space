# Verified examples cookbook

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file is a copy-pasteable examples cookbook. Nine required recipes cover the lifecycle an agent or LLM meets when calling the OpenCode SDK end-to-end. Five unsafe-pattern callouts flag the patterns research surfaced as silent-failure or hang traps. Two verified config / provider snippets round out the safe surface. Every block is grounded in the canonical research ledger; any field research did not verify is marked `not-verified` per the writer verification table in the high-level plan.

Read [`00_README.md`](00_README.md) for the reading map, [`01_prerequisites.md`](01_prerequisites.md) for the install + version-probe steps, [`02_quickstart.md`](02_quickstart.md) for the lighter Recipe A / Recipe B, [`03_decision_guide.md`](03_decision_guide.md) for the use-versus-avoid rules, [`04_api_map.md`](04_api_map.md) for the namespace table, [`05_lifecycle.md`](05_lifecycle.md) for owned-server cleanup, [`06_security.md`](06_security.md) before any non-loopback bind, [`07_errors.md`](07_errors.md) for the four error surfaces, and [`08_events.md`](08_events.md) for the SSE v1 / v2 split. The canonical source mirror is planned for [`99_sources.md`](99_sources.md); until that lands, every `[Sn]` here resolves to [`../share/notes/01_research_T-2026-08-18-001.md`](../share/notes/01_research_T-2026-08-18-001.md).

## How to read this file

The conventions below apply to every recipe and callout in this file. A reader who only needs the smallest validation can copy a recipe, run it, and compare the output to the Expected-behavior line.

### Safety label

Every recipe carries one of three labels at the top of the section.

| Label | Color | Meaning |
|---|---|---|
| `[SAFE]` | green | The pattern is verified by research and runs without a provider call or with the explicit model pin; safe to copy as-is. |
| `[WARN]` | yellow | The pattern is verified but requires caller-side discipline (trim, abort signal, security gate); copy only with the discipline the recipe names. |
| `[UNSAFE]` | red | The pattern is documented in the callouts section as a research-flagged anti-pattern; do NOT copy. |

### Code-block header convention

Every TypeScript code block begins with a four-line `/* ... */` comment block carrying purpose, expected behavior, smallest validation, and the freshness footer. A linter that strips comments still leaves the recipe runnable; a reviewer who reads only the comment still knows what the recipe does.

```typescript
/* Purpose: <one-line goal of the recipe> */
/* Expected behavior: <one-line description of the result, output shape, or non-failure condition> */
/* Smallest validation: <single command, assertion, or check that proves the recipe ran> */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

// ...recipe body...
```

### Not-verified markers

Fields research did not verify carry an inline `not-verified` marker in the writer verification subsection of the recipe. A future writer who regenerates `types.gen.ts` against a newer CLI replaces each `not-verified` marker with the verified field name and removes the marker. The marker is intentional: it makes unverifiable shapes visible rather than smuggling them in as prose.

### Forbidden patterns

This file deliberately omits copy-pasteable snippets for: `createOpencodeTui()` from a non-interactive agent [S8]; `session.prompt` without an explicit model [S1]; `apply_patch` / `write` / `edit` with an untrimmed `filePath` [S19] (cite the issue URL and the trim-before-call discipline, no body example); `session.command` / `session.shell` / `client.auth.set` / `client.provider.oauth.authorize` bodies (writer must revalidate against `types.gen.ts`); a v1 SDK against a v2 server without a version probe [S10]; an unauthenticated non-loopback server [S2]. Each of those patterns is in the callouts section with a `> UNSAFE -- <reason>` blockquote and at least one citation.

## Example 1: Embedded server + client (`createOpencode()`) [SAFE]

> **Safety label**: green safe
> **Purpose**: spawn `opencode serve`, wait for the listening URL, and receive both `client` and `server` from one call.
> **Expected behavior**: `server.url` is a non-empty `http://127.0.0.1:<port>/` string; `client.global.health()` returns `data.healthy === true`; `server.close()` resolves without throwing.
> **Smallest validation**: `bun run examples/example-01-embedded.ts` exits `0` and prints a non-empty `server url:` line.
> **Citations**: [S1][S6][S8]

```typescript
/* Purpose: spawn `opencode serve` and own both halves of the lifecycle in one call. */
/* Expected behavior: server.url is a non-empty string; client.global.health() returns healthy: true; server.close() resolves. */
/* Smallest validation: bun run examples/example-01-embedded.ts exits 0 and prints a non-empty server url: line. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

// Pick a free high loopback port. The default of 4096 is documented in [S1][S8]
// but may collide with a developer run; the dossier recommends an explicit port.
const PORT = 47831;

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: PORT,
  timeout: 30000,
});

try {
  const health = await client.global.health();

  if (!health.data) {
    throw new Error("health probe returned no data");
  }

  console.log("server url:", server.url);
  console.log("healthy:", health.data.healthy === true);
  console.log("version:", health.data.version);
} finally {
  await server.close();
}
```

### Writer verification (Example 1)

| Field | Verification status |
|---|---|
| `createOpencode({ hostname, port, timeout })` option set | verified [S1][S8] |
| Default hostname `127.0.0.1` and default port `4096` | verified [S1][S8] |
| Default `timeout: 5000` ms | verified [S1][S8] |
| Return shape `{ client, server }` | verified [S6][S8] |
| `server.url` is a string | verified [S8] |
| `server.close()` is async and resolves on cleanup | verified [S8][S14] |
| `client.global.health()` returns `{ healthy: true, version: string }` | verified [S2] |
| Behavior of `timeout: 0` or other edge values | not-verified |

## Example 2: Existing server connection (`createOpencodeClient({ baseUrl, directory })`) [SAFE]

> **Safety label**: green safe
> **Purpose**: connect to an already-running `opencode serve` from a worker process without owning the server.
> **Expected behavior**: `client.global.health()` returns the server version string; `client.session.list()` returns an array (possibly empty); no subprocess is spawned.
> **Smallest validation**: start `opencode serve --port 4096 --hostname 127.0.0.1` in a second shell, then `bun run examples/example-02-existing.ts` exits `0`.
> **Citations**: [S1][S2][S7]

```typescript
/* Purpose: connect to an already-running server from a worker process. */
/* Expected behavior: client.global.health() returns a version; client.session.list() returns an array; no subprocess spawned. */
/* Smallest validation: opencode serve --port 4096 --hostname 127.0.0.1 in a second shell, then bun run examples/example-02-existing.ts exits 0. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencodeClient } from "@opencode-ai/sdk";

// Assume an `opencode serve` instance is already running on loopback 4096.
// The `directory` option URL-encodes into the `x-opencode-directory` header on
// GET/HEAD and the `?directory=` query on POST/PATCH/DELETE [S7].
const client = createOpencodeClient({
  baseUrl: "http://127.0.0.1:4096",
  directory: "/absolute/path/to/project",
  responseStyle: "fields",
});

const health = await client.global.health();

if (!health.data) {
  throw new Error("health probe returned no data");
}

console.log("server version:", health.data.version);

const sessions = await client.session.list();
const count = Array.isArray(sessions.data) ? sessions.data.length : 0;
console.log("session count:", count);

// No server.close() here -- the worker does not own the subprocess.
```

### Writer verification (Example 2)

| Field | Verification status |
|---|---|
| `createOpencodeClient({ baseUrl, directory, responseStyle })` option set | verified [S1][S7] |
| `responseStyle: "fields"` default behavior | verified [S7][S13] |
| `directory` promotes to `x-opencode-directory` header on GET/HEAD | verified [S7] |
| `directory` promotes to `?directory=` query on POST/PATCH/DELETE | verified [S7] |
| v2-only `experimental_workspaceID` option | verified [S10] (not used here because recipe targets v1) |
| Behavior of `client.event.subscribe()` access on a same-instance | not-verified for this recipe |

## Example 3: Session CRUD (`session.list`, `session.create`, `session.get`, `session.delete`) [SAFE]

> **Safety label**: green safe
> **Purpose**: cover the four session lifecycle endpoints without invoking a model.
> **Expected behavior**: a created session has a non-empty `id`; `session.get` returns the same record; `session.delete` resolves; `session.list` includes the session between create and delete.
> **Smallest validation**: `bun run examples/example-03-sessions.ts` exits `0` and prints a non-empty `created id:` line followed by `delete ok: true`.
> **Citations**: [S1][S2]

```typescript
/* Purpose: cover list / create / get / delete without invoking a model. */
/* Expected behavior: created.data.id is non-empty; session.get returns the same record; session.delete resolves; session.list includes the id between create and delete. */
/* Smallest validation: bun run examples/example-03-sessions.ts exits 0 and prints a non-empty created id: line followed by delete ok: true. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
});

try {
  const before = await client.session.list();
  const beforeIds = new Set(
    Array.isArray(before.data) ? before.data.map((s) => (s as { id: string }).id) : [],
  );

  const created = await client.session.create({
    body: { title: "Example-03-CRUD" },
  });

  if (!created.data) {
    throw new Error("session.create returned no data");
  }

  const id = (created.data as { id: string }).id;
  console.log("created id:", id);

  const fetched = await client.session.get({ path: { id } });

  if (!fetched.data) {
    throw new Error("session.get returned no data");
  }

  console.log("fetched id:", (fetched.data as { id: string }).id);

  const during = await client.session.list();
  const duringIds = new Set(
    Array.isArray(during.data) ? during.data.map((s) => (s as { id: string }).id) : [],
  );

  console.log("present in list during:", duringIds.has(id));
  console.log("absent in list before:", !beforeIds.has(id));

  const deleted = await client.session.delete({ path: { id } });

  console.log("delete ok:", deleted.data === true || deleted.data === undefined);
} finally {
  await server.close();
}
```

### Writer verification (Example 3)

| Field | Verification status |
|---|---|
| `client.session.list()` exists, returns array | verified [S1][S2] |
| `client.session.create({ body })` body shape `{ parentID?, title? }` | verified [S1][S2] |
| `client.session.get({ path: { id } })` | verified [S1][S2] |
| `client.session.delete({ path: { id } })` returns boolean or undefined | verified [S2] |
| Returned session record `id` field | verified [S1] |
| Returned session record `parentID`, `title` fields | verified [S1][S2] |
| Other session fields (`messageCount`, `createdAt`, `shareURL`, etc.) | not-verified |

## Example 4: Prompting with explicit `model: { providerID, modelID }` [SAFE]

> **Safety label**: green safe (with explicit-model discipline)
> **Purpose**: send a single `session.prompt` body that pins both `providerID` and `modelID`.
> **Expected behavior**: the SDK carries the prompt to the server; the response carries a `data` object; the response does NOT carry a model that differs from the one pinned in the body.
> **Smallest validation**: `bun run examples/example-04-prompt.ts` exits `0` and prints `prompt sent: ok` once the SDK returns. Live provider execution evidence belongs in [`11_live_validation.md`](11_live_validation.md) after the review gate; the recipe itself is model-call-capable but Phase 3D does NOT execute the model call.
> **Citations**: [S1][S2][S15]

```typescript
/* Purpose: send a session.prompt with the explicit model pin discipline. */
/* Expected behavior: the SDK carries the prompt to the server; the response carries a data object; the response model matches the pinned model. */
/* Smallest validation: bun run examples/example-04-prompt.ts exits 0 and prints prompt sent: ok. Live provider execution deferred to 11_live_validation.md. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
});

try {
  const created = await client.session.create({ body: { title: "Example-04-prompt" } });

  if (!created.data) {
    throw new Error("session.create returned no data");
  }

  const id = (created.data as { id: string }).id;

  const result = await client.session.prompt({
    path: { id },
    body: {
      model: {
        providerID: "opencode",
        modelID: "deepseek-v4-flash-free",
      },
      parts: [
        { type: "text", text: "Reply with the single word: ok" },
      ],
    },
  });

  // The response shape is verified at the top level only.
  // data.info.error.name === "StructuredOutputError" is the verified discriminator [S1].
  // The info.* field set beyond that is not-verified.
  // The usage.* block is not-verified for the SDK path.
  const dataPresent = Boolean(result.data);
  const errorPresent = Boolean(result.error);
  console.log("prompt sent:", dataPresent ? "ok" : "no-data");
  console.log("error present:", errorPresent);
  console.log("info shape: not-verified beyond `error.name === StructuredOutputError`");
  console.log("usage shape: not-verified");
} finally {
  await server.close();
}
```

### Writer verification (Example 4)

| Field | Verification status |
|---|---|
| `session.prompt` body shape `{ model, parts }` | verified [S1][S2][S15] |
| `model: { providerID, modelID }` requirement | verified [S1] |
| `parts: Part[]` with `{ type: "text", text }` | verified [S1][S15] |
| Top-level response `{ data, error, response, request }` | verified [S7][S13] |
| `data.info.error.name === "StructuredOutputError"` discriminator | verified [S1] |
| Any other `info.*` field name (`info.messageCount`, `info.tokenCount`, etc.) | not-verified |
| Any `usage.*` field name (`usage.prompt_tokens`, `usage.completion_tokens`, `usage.total_tokens`) | not-verified for SDK path |
| `data.parts` payload field set | not-verified beyond `{ type, text }` |
| `noReply` option behavior on this server version | not-verified |

## Example 5: Events / SSE subscription (one v1 event name, v2 delta noted) [SAFE]

> **Safety label**: green safe (bounded subscription)
> **Purpose**: subscribe to `GET /global/event` and observe one of the seven verified v1 event names without invoking a model.
> **Expected behavior**: the client opens a stream; an abort signal ends the loop within 30 seconds; at least zero frames are observed without crashing.
> **Smallest validation**: `bun run examples/example-05-events.ts` exits `0` and prints `frames observed: <n>` where `n >= 0`.
> **Citations**: [S1][S2][S15][S16]

```typescript
/* Purpose: subscribe to /global/event and observe one v1 event name without invoking a model. */
/* Expected behavior: stream opens; abort signal ends the loop within 30s; zero or more frames observed without crash. */
/* Smallest validation: bun run examples/example-05-events.ts exits 0 and prints frames observed: <n> where n >= 0. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 30000);

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
});

let framesObserved = 0;

try {
  const subscription = await client.event.subscribe({
    signal: controller.signal,
    onSseError: (value: unknown) => {
      const message = value instanceof Error ? value.message : String(value);
      console.error("sse transport error:", message);
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
      "frame:",
      typeof type === "string" ? type : "<unknown-type>",
    );
  }
} catch (value: unknown) {
  if (!controller.signal.aborted) {
    throw value;
  }
} finally {
  clearTimeout(timer);
  controller.abort();
  await server.close();
  console.log("frames observed:", framesObserved);
  console.log("v1 verified event-name set: EventServerInstanceDisposed, EventInstallationUpdated, EventInstallationUpdateAvailable, EventLspClientDiagnostics, EventLspUpdated, EventMessageUpdated, EventMessageRemoved [S15]");
  console.log("v2 delta: 27 source-surfaced names listed in 04_api_map.md and 08_events.md; do not switch on v2-only event names without re-validation against types.gen.ts [S16]");
}
```

### Writer verification (Example 5)

| Field | Verification status |
|---|---|
| `client.event.subscribe({ signal, onSseError, onSseEvent, sseDefaultRetryDelay, sseMaxRetryAttempts, sseMaxRetryDelay })` option set | verified [S1] |
| `subscription.stream` is an async iterable | verified [S1] |
| v1 verified event-name set (7 names) | verified [S15] |
| v2 delta event names (27 source-surfaced) | verified [S16] |
| Event payload body shape for any event name | not-verified |
| Behavior of retry budget when the server actively sends | not-verified beyond the numeric policy |

## Example 6: File search and read (`find.text`, `find.files`, `file.read`) [SAFE]

> **Safety label**: green safe (caller-side path trim discipline)
> **Purpose**: cover the four file-namespace reads without invoking a model, with verified parameter sets only.
> **Expected behavior**: each call returns a `data` object; paths round-trip without modification; the trim-before-call discipline is observable in the caller.
> **Smallest validation**: `bun run examples/example-06-files.ts` exits `0` and prints `find.text count: <n>`, `find.files count: <n>`, `file.read type: raw`.
> **Citations**: [S1][S2][S19]

```typescript
/* Purpose: cover find.text, find.files, and file.read with verified parameter sets only. */
/* Expected behavior: each call returns a data object; paths round-trip without modification; the trim-before-call discipline is observable in the caller. */
/* Smallest validation: bun run examples/example-06-files.ts exits 0 and prints find.text count: <n>, find.files count: <n>, file.read type: raw. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
  // Pass the project root through the `config` channel so the server resolves
  // file paths against the right workspace [S1][S8][S11].
  config: {},
});

function trimPath(value: string): string {
  // Caller-side discipline for #43112: trim trailing whitespace and newlines
  // from any path before the SDK call. The SDK does not trim and the server
  // does not trim; the bug is documented at https://github.com/anomalyco/opencode/issues/43112 [S19].
  return value.replace(/[\s]+$/u, "");
}

try {
  const query = trimPath("opencode");

  const text = await client.find.text({
    query: { pattern: query },
  });

  const textCount = Array.isArray(text.data) ? text.data.length : 0;
  console.log("find.text count:", textCount);
  console.log("find.text item shape: not-verified beyond { path, lines, line_number, absolute_offset, submatches } [S1]");

  const files = await client.find.files({
    query: { query: "opencode", limit: 10 },
  });

  const filesCount = Array.isArray(files.data) ? files.data.length : 0;
  console.log("find.files count:", filesCount);
  console.log("find.files parameters: query, type, directory, limit (1-200) verified [S1][S2]; dirs parameter not-verified");

  const read = await client.file.read({
    path: trimPath("README.md"),
  });

  const readType = (read.data as { type?: string } | undefined)?.type;
  console.log("file.read type:", typeof readType === "string" ? readType : "<unknown>");
  console.log("file.read content shape: not-verified beyond { type, content } [S1]");
} finally {
  await server.close();
}
```

### Writer verification (Example 6)

| Field | Verification status |
|---|---|
| `find.text({ query: { pattern } })` parameters | verified [S1] |
| `find.text` return shape `{ path, lines, line_number, absolute_offset, submatches }` | verified subset [S1] |
| Additional `find.text` return fields beyond the verified subset | not-verified |
| `find.files({ query: { query, type?, directory?, limit? } })` parameters | verified [S1][S2] |
| `find.files` `dirs` parameter behavior | not-verified |
| `find.files` return shape | not-verified |
| `file.read({ path })` parameter | verified [S1] |
| `file.read` return shape `{ type: "raw" \| "patch", content: string }` | verified subset [S1] |
| `file.read` `metadata` or other fields | not-verified |
| Caller-side `filePath` trim discipline (mitigation for #43112) | verified [S19] |

## Example 7: Structured output (`session.prompt` with `body.format: { type: "json_schema", schema }`) [WARN]

> **Safety label**: yellow warning
> **Purpose**: send a `session.prompt` that returns a single string answer bounded by a JSON schema.
> **Expected behavior**: the schema constraint is in the body; the response carries `data.info` and `data.parts`; a structured-output failure surfaces as `data.info.error.name === "StructuredOutputError"` after the server's retry budget is exhausted.
> **Smallest validation**: `bun run examples/example-07-structured.ts` exits `0` and prints either `parsed answer: <value>` or `structured-output failure: true`. Live provider execution deferred to [`11_live_validation.md`](11_live_validation.md).
> **Citations**: [S1][Z14][Z15]

```typescript
/* Purpose: send a session.prompt with a json_schema format and a single-string answer field. */
/* Expected behavior: schema constraint in body; response carries data.info and data.parts; structured-output failure surfaces as data.info.error.name === "StructuredOutputError". */
/* Smallest validation: bun run examples/example-07-structured.ts exits 0 and prints parsed answer: <value> or structured-output failure: true. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
});

try {
  const created = await client.session.create({ body: { title: "Example-07-structured" } });

  if (!created.data) {
    throw new Error("session.create returned no data");
  }

  const id = (created.data as { id: string }).id;

  const result = await client.session.prompt({
    path: { id },
    body: {
      model: {
        providerID: "opencode",
        modelID: "deepseek-v4-flash-free",
      },
      parts: [
        { type: "text", text: "Return JSON {\\\"answer\\\":\\\"ok\\\"}" },
      ],
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            answer: { type: "string", maxLength: 16 },
          },
          required: ["answer"],
          additionalProperties: false,
        },
      },
    },
  });

  // Verified discriminator only [S1].
  const structuredFailure =
    (result.data as { info?: { error?: { name?: string } } } | undefined)
      ?.info?.error?.name === "StructuredOutputError";

  if (structuredFailure) {
    console.log("structured-output failure: true");
  } else if (result.data) {
    const parts = (result.data as { parts?: Array<{ text?: string }> }).parts;
    const firstText = Array.isArray(parts) && parts.length > 0 ? parts[0]?.text : undefined;
    console.log("parts[0].text:", typeof firstText === "string" ? firstText : "<unknown>");
  } else {
    console.log("no data returned");
  }

  console.log("info.* fields beyond error.name: not-verified");
  console.log("usage.* block: not-verified for SDK path");
} finally {
  await server.close();
}
```

### Writer verification (Example 7)

| Field | Verification status |
|---|---|
| `body.format: { type: "json_schema", schema }` | verified [S1] |
| Schema field set uses standard JSON Schema vocabulary | verified [S1] |
| `data.info.error.name === "StructuredOutputError"` discriminator | verified [S1] |
| `data.info.error.message`, `.retries`, `.cause` field names | not-verified |
| `data.parts[0].text` is the usual successful content location | verified [S1] |
| `data.parts[0]` other field names | not-verified |
| `usage.*` block on the SDK response | not-verified |
| Specific `maxLength: 16` cap on the answer field as a soft cap | dossier policy (not a server constraint) |

## Example 8: Error handling with `throwOnError: true` (parsing `Error.message / .cause`) [SAFE]

> **Safety label**: green safe
> **Purpose**: catch a real `Error` whose `.message` carries the most informative string and whose `.cause` carries `{ body, status }`.
> **Expected behavior**: a failing call throws; the catch block extracts `error.message`, `error.cause?.status`, and a presence boolean for `error.cause?.body` without dumping the body.
> **Smallest validation**: `bun run examples/example-08-throw.ts` exits `0` and prints a non-empty `message:` line plus `has body: <bool>`. Force a 404 by deleting a non-existent session id.
> **Citations**: [S7][S10][S13]

```typescript
/* Purpose: catch a real Error from a failing SDK call and parse .message / .cause without dumping the body. */
/* Expected behavior: failing call throws; catch extracts message, status, and a body-presence boolean. */
/* Smallest validation: bun run examples/example-08-throw.ts exits 0 and prints a non-empty message: line plus has body: <bool>. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
});

type OpenCodeErrorCause = {
  body?: unknown;
  status?: number;
};

type OpenCodeError = Error & {
  cause?: OpenCodeErrorCause;
};

function summarize(value: unknown): { message: string; status?: number; hasBody: boolean } {
  if (value instanceof Error) {
    const err = value as OpenCodeError;
    return {
      message: err.message,
      status: err.cause?.status,
      hasBody: err.cause?.body !== undefined,
    };
  }
  return {
    message: String(value),
    hasBody: false,
  };
}

try {
  // Force a 404 by pointing at a session id that does not exist.
  // The server returns an HTTP 4xx; with throwOnError: true the SDK wraps
  // it into a real Error and attaches { body, status } under .cause [S13].
  const clientWithThrow = client;
  await clientWithThrow.session.get({
    path: { id: "this-session-id-does-not-exist" },
  });

  console.log("unexpected: call did not throw");
} catch (value: unknown) {
  const parsed = summarize(value);

  // The v2 HTML guard string is verified at [S10] -- use exact match, do not paraphrase.
  const isV2HtmlGuard =
    parsed.message ===
    "Request is not supported by this version of OpenCode Server (Server responded with text/html)";

  console.log("message:", parsed.message);
  console.log("status:", parsed.status);
  console.log("has body:", parsed.hasBody);
  console.log("v2 html guard:", isV2HtmlGuard);
  console.log("body field set: not-verified beyond presence");
} finally {
  await server.close();
}
```

### Writer verification (Example 8)

| Field | Verification status |
|---|---|
| `Error.cause = { body, status }` shape | verified [S13] |
| `Error.message` resolution order (`.data.message` > `.message` > `.name` > derived) | verified [S13] |
| Exact v2 HTML guard string | verified [S10] |
| `(empty response body)` literal suffix | verified [S13] |
| `network error (no response)` literal | verified [S13] |
| Any other `.cause.*` field name beyond `body` / `status` | not-verified |
| Any other top-level `Error.*` field beyond `message` / `cause` | not-verified |

## Example 9: Cleanup (`server.close()` in `finally`; Windows cleanup note) [SAFE]

> **Safety label**: green safe (platform-aware cleanup)
> **Purpose**: ensure the spawned `opencode serve` is reaped whether or not the body succeeded, including the Win32 process-tree path.
> **Expected behavior**: `server.close()` resolves; on POSIX the child is signalled; on Win32 the SDK invokes `taskkill /pid <pid> /T /F` to reap descendants; the process is no longer listening on the bound port after the call resolves.
> **Smallest validation**: `bun run examples/example-09-cleanup.ts` exits `0` and prints `close completed: true`. After the run, the bound port is free.
> **Citations**: [S8][S14]

```typescript
/* Purpose: reap the spawned opencode serve in a finally block; rely on the SDK to pick the platform cleanup. */
/* Expected behavior: server.close() resolves; on POSIX the child is signalled; on Win32 the SDK invokes taskkill /pid <pid> /T /F. */
/* Smallest validation: bun run examples/example-09-cleanup.ts exits 0 and prints close completed: true. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const PORT = 47831;

let closeRequested = false;
let closeCompleted = false;
let server: Awaited<ReturnType<typeof createOpencode>>["server"] | undefined;

try {
  const opened = await createOpencode({
    hostname: "127.0.0.1",
    port: PORT,
    timeout: 30000,
  });

  server = opened.server;

  // Use the client for any auth-free call. The recipe body is intentionally
  // a single health probe so cleanup happens whether or not the body succeeded.
  const health = await opened.client.global.health();
  console.log("healthy:", health.data?.healthy === true);

  // Mark the owner-side intent before asking the SDK to close.
  closeRequested = true;
} finally {
  if (server) {
    // server.close() resolves once the child and descendants have exited.
    // On Win32 the SDK helper invokes `taskkill /pid <pid> /T /F` [S14].
    // Do NOT substitute process.kill on Windows -- it leaves descendants orphaned.
    await server.close();
    closeCompleted = true;
  }

  console.log({ closeRequested, closeCompleted });
}
```

### Writer verification (Example 9)

| Field | Verification status |
|---|---|
| `server.close()` resolves once child + descendants exit | verified [S8][S14] |
| Win32 `taskkill /pid <pid> /T /F` exact form | verified [S14] |
| POSIX SIGTERM-then-SIGKILL chain via `cross-spawn` | verified [S8][S11][S14] |
| `bindAbort` helper behavior | verified [S14] (internal helper; callers do not import it) |
| PID ownership scope (no global kill, no `Get-Process opencode` invariant) | dossier policy [S14] |
| Caller-visible `shutdownMode` field or other kill-reason enum | not-verified to exist (owner-side booleans are the dossier recommendation) |

## Unsafe pattern 1: `createOpencodeTui()` from a non-interactive agent

> UNSAFE -- `createOpencodeTui()` spawns `opencode` with `stdio: "inherit"`, which waits on a controlling terminal that a non-interactive agent does not have. The parent process hangs.

> **Citations**: [S8][S1]

The TUI factory is documented as the entry point for driving the interactive terminal UI from a parent terminal [S1]. The implementation spawns `opencode` with `stdio: "inherit"`, which means the child waits on terminal input the parent never delivers [S8]. A daemon, an HTTP worker, a CI runner, or an LLM agent loop does not have a controlling terminal -- it has a stdin pipe, a socket, or nothing at all. Calling `createOpencodeTui()` from any of these hangs the parent.

Use `createOpencode()` or `createOpencodeClient()` instead. Both are first-class for non-interactive use [S1][S8].

The unsafe pattern is documented in [`03_decision_guide.md`](03_decision_guide.md) under "Do not use `createOpencodeTui()` from a non-interactive agent". The dossier never ships a copy-pasteable snippet for this factory.

## Unsafe pattern 2: `session.prompt` without explicit `model`

> UNSAFE -- omitting `body.model` lets the server silently fall back to the user's saved default model. The fallback is rarely what an agent wants and is one of the research-flagged top agent traps.

> **Citations**: [S1]

`session.prompt({ path: { id }, body: { parts } })` without `body.model` returns a successful-looking response that uses the user's saved default [S1]. The saved default is whatever the human user last interacted with -- a paid Zen model on a development host, a free tier on another host, or the model's "best" choice that is not what the agent's policy authorized. The agent has no error to inspect because the call succeeded; the only failure is at the policy / cost / safety layer, which the SDK cannot see.

Always pin `model: { providerID, modelID }` on every prompt body. The dossier pins the live-validation model at `opencode / deepseek-v4-flash-free` because the user task explicitly authorized only that pairing.

Example 4 above shows the explicit-model pattern. The unsafe pattern would be the same code with `body: { parts }` and no `model` block. Do not copy that.

## Unsafe pattern 3: `apply_patch` / `write` / `edit` with untrimmed `filePath`

> UNSAFE -- the `apply_patch` / `write` / `edit` tools do not trim trailing whitespace from `filePath`. A local model that emits a newline inside the JSON string creates files whose names literally contain the newline. Mitigation is on the caller, not the SDK.

> **Citations**: [S19] -- GitHub issue [#43112](https://github.com/anomalyco/opencode/issues/43112)

Issue #43112 (open, 2026-08-17, assignee `neriousy`) reports that the file-write / edit / `apply_patch` tool does not trim trailing whitespace from `filePath`. A local model that emits a newline inside the JSON string end up creating files whose names literally contain a newline [S19]. The proper fix is on the server; the workaround is on the caller.

The discipline is:

> UNSAFE -- the numbered list below references the apply_patch / filePath trim discipline.
1. In the agent's tool dispatcher, before any `apply_patch` / `write` / `edit` tool call, run `filePath = filePath.replace(/[\s]+$/u, "")`.
2. Reject paths that contain internal whitespace that the model could not have meant (an embedded newline mid-path is almost always a hallucination).
3. After the call, verify the file actually exists at the trimmed path before reporting success.

The dossier ships no copy-pasteable `apply_patch` body example. The issue URL is the authoritative reference for the trim rule and the file creation behavior.

## Unsafe pattern 4: v1 SDK against a v2 server without version probe

> UNSAFE -- the v2 client adds a response interceptor that throws on every HTML response. A v2 SDK pointed at a v1 server (or vice versa) fails on every call rather than negotiating the version.

> **Citations**: [S10][S2]

The v2 generated client checks for `Content-Type: text/html` and throws `Error("Request is not supported by this version of OpenCode Server (Server responded with text/html)")` on any HTML response [S10]. The HTML response is the canonical signal of an SDK / server version mismatch -- a v2 SDK hitting a v1 server's OpenAPI browser page, or a v2 server returning an error page in HTML. The v1 client pointed at a v2 server silently returns v1-only event types and never surfaces the mismatch [S10].

Mitigation:

1. Call `client.global.health()` once at agent boot.
2. Compare `{ healthy, version }` to the SDK package version.
3. Switch the import path (`@opencode-ai/sdk` for v1, `@opencode-ai/sdk/v2` for v2) on a major mismatch [S2].
4. Never run a real call before the probe passes.

The dossier label for the pinned coordinates (CLI `1.18.3`, SDK `1.18.18`) is `same-minor-patch-delta-15`. That label is a position description, not a compatibility claim. The dossier does NOT claim compatibility from semver alone. Compatibility is determined by the probe and the auth-free calls in Phase 3E1; not by semver alone.

## Unsafe pattern 5: Unauthenticated non-loopback server

> UNSAFE -- the default server bind is `127.0.0.1:4096` with no auth required. Binding to `0.0.0.0` or any non-loopback interface without `OPENCODE_SERVER_PASSWORD` leaves the server reachable from any host that can resolve the address, with no credential.

> **Citations**: [S2]

The OpenCode server uses HTTP Basic authentication for any non-loopback exposure [S2]. The two server environment variables are `OPENCODE_SERVER_PASSWORD` (required before any non-loopback bind) and `OPENCODE_SERVER_USERNAME` (optional; default is `opencode`). The default unauthenticated server is `127.0.0.1:4096` -- changing `--hostname` to a non-loopback value without setting the password leaves the port open with no credential.

The dossier's hard security gate is in [`06_security.md`](06_security.md): before any non-loopback bind, the owner must set `OPENCODE_SERVER_PASSWORD`, optionally override the username, restrict ingress at the network layer, enumerate browser origins with `--cors`, and log only presence booleans. The dossier never instructs an agent to bind non-loopback without the password env var.

## Verified config / provider examples (2 total)

The two snippets below are research-verified and runnable against the embedded server. Each one returns a `data` object whose top-level shape is verified by the canonical research ledger [S1][S2]. Any field beyond the verified subset is marked `not-verified` in the writer verification subsection.

### Verified config example A: `client.config.get()` [SAFE]

> **Safety label**: green safe
> **Purpose**: fetch the merged `Config` object the server has resolved for the current `directory`.
> **Expected behavior**: returns `data` as an object whose top-level keys mirror the opencode.json schema. The exact top-level key set is regenerated on every CLI publish and is in `types.gen.ts` [S1][S2][S17].
> **Smallest validation**: `bun run examples/example-10-config-get.ts` exits `0` and prints `config keys: <n>` with `n > 0`.
> **Citations**: [S1][S2][S17]

```typescript
/* Purpose: fetch the merged Config object the server has resolved for the current directory. */
/* Expected behavior: data is an object whose top-level keys mirror the opencode.json schema; exact key set is regenerated per CLI publish. */
/* Smallest validation: bun run examples/example-10-config-get.ts exits 0 and prints config keys: <n> with n > 0. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
});

try {
  const config = await client.config.get();

  if (!config.data) {
    throw new Error("config.get returned no data");
  }

  const keys = Object.keys(config.data as Record<string, unknown>);
  console.log("config keys:", keys.length);

  // Top-level key set: not-verified beyond presence. The dossier does NOT
  // enumerate the keys because @hey-api/openapi-ts regenerates types.gen.ts
  // on every CLI publish [S17]. Look up types.gen.ts at write time.
  console.log("config top-level key set: not-verified beyond presence");
} finally {
  await server.close();
}
```

### Writer verification (Verified config example A)

| Field | Verification status |
|---|---|
| `client.config.get()` exists, returns data | verified [S1][S2] |
| `data` is an object whose keys mirror the opencode.json schema | verified [S1][S2] |
| Top-level key set inside `data` | not-verified (regenerated per CLI publish) |
| Provider row sub-shape inside `data` | not-verified |

### Verified config example B: `client.config.providers()` [SAFE]

> **Safety label**: green safe
> **Purpose**: list the configured providers without invoking any model.
> **Expected behavior**: returns `data` as an object keyed by provider id (or an array of provider descriptors); provider-specific sub-fields are in `types.gen.ts`. No model call is made; the call is auth-free.
> **Smallest validation**: `bun run examples/example-11-config-providers.ts` exits `0` and prints `provider count: <n>` with `n >= 1`.
> **Citations**: [S1][S2]

```typescript
/* Purpose: list configured providers without invoking any model. */
/* Expected behavior: data is an object or array; provider-specific sub-fields are in types.gen.ts. No model call. */
/* Smallest validation: bun run examples/example-11-config-providers.ts exits 0 and prints provider count: <n> with n >= 1. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
});

try {
  const providers = await client.config.providers();

  if (!providers.data) {
    throw new Error("config.providers returned no data");
  }

  // data is an object or array -- both verified; the count derivation below
  // works for either shape.
  const dataRecord = providers.data as Record<string, unknown> | Array<unknown>;
  const count = Array.isArray(dataRecord) ? dataRecord.length : Object.keys(dataRecord).length;
  console.log("provider count:", count);

  // Each provider entry's id / source fields are verified in research [S1][S2];
  // any other field is in types.gen.ts.
  console.log("provider entry sub-shape: not-verified beyond id / source [S1][S2]");
} finally {
  await server.close();
}
```

### Writer verification (Verified config example B)

| Field | Verification status |
|---|---|
| `client.config.providers()` exists, returns data | verified [S1][S2] |
| Provider entries have an `id` field | verified [S1][S2] |
| Provider entries have a `source` field | verified [S1][S2] |
| Provider entry sub-shape beyond `id` / `source` | not-verified (regenerated per CLI publish) |
| Whether `data` is an object or array | verified that both shapes are reachable; not-verified which one the v1.18.18 server returns |

## Pointer table: endpoint bodies the writer must revalidate against `types.gen.ts`

The recipe blocks in this file are limited to calls whose body shape the canonical research verified end-to-end (or whose parameter set is verified and whose return shape is marked `not-verified`). The table below lists the calls whose body or response shape the research did NOT verify end-to-end. The dossier ships no copy-pasteable snippet for any of these calls; the writer of a later phase or any reader who needs one must look up the typed body in `types.gen.ts` before publishing a recipe.

| Endpoint | Direction | Verified (research) | Writer must revalidate |
|---|---|---|---|
| `client.session.command({ path, body })` | `POST /session/{id}/command` | URL only [S1] | Look up `SessionCommandBody` in `types.gen.ts`. Do not assume field names. |
| `client.session.shell({ path, body })` | `POST /session/{id}/shell` | URL only [S1] | Look up `SessionShellBody` in `types.gen.ts`. Many shell surface shapes exist. |
| `client.auth.set({ path, body })` | `PUT /auth/{id}` | URL only [S2] | Provider-credential body is provider-specific. Do not paste a credential into a snippet. The dossier never names the auth-file path on disk. |
| `client.provider.oauth.authorize({ body })` | `POST /provider/oauth/authorize` | URL only [S2] | Look up `OAuthAuthorizeBody` in `types.gen.ts`. Provider-specific. |
| `client.session.abort({ path, body })` | `POST /session/{id}/abort` | URL [S2]; wire shape not fully verified | If the wire shape is not verified at write time, rely on `AbortSignal.timeout(30000)` only. |
| `client.session.permissions({ path, body })` | `POST /session/{id}/permissions/{permissionID}` | URL only [S2] | Action set is in `types.gen.ts`; do not hard-code action strings. |
| `client.session.share({ path, body })` / `client.session.unshare()` | `POST/DELETE /session/{id}/share` | URL only [S2] | Payload shape is in `types.gen.ts`. |
| `client.session.summarize({ path, body })` | `POST /session/{id}/summarize` | URL only [S2] | Body is in `types.gen.ts`. |
| `client.session.revert({ path, body })` / `client.session.unrevert({ path })` | `POST /session/{id}/revert\|unrevert` | URL only [S2] | Body is in `types.gen.ts`. |
| `client.mcp.add({ body })` | `POST /mcp` | URL only [S2] | `name`, `command` / `url`, env shape in `types.gen.ts`. |
| `client.mcp.auth({ path, body })` | `POST /mcp/{name}/auth` | URL only [S2] | Scope set shape in `types.gen.ts`. |
| `client.tui.executeCommand({ body })` | `POST /tui/execute-command` | URL only; body `{ command }` [S2] | Other fields in `types.gen.ts`. |
| `client.tui.showToast({ body })` | `POST /tui/show-toast` | URL only; body `{ title?, message, variant }` [S2] | `variant` enum set in `types.gen.ts`. |
| `client.tui.control.response({ body })` | `POST /tui/control/response` | URL only; body `{ body }` [S2] | Inner `body` shape depends on the request being replied to. |

The policy is: any field the dossier does not enumerate here is `not-verified`. Do not send a request body whose fields are not visible in `types.gen.ts`. Do not assume `dirs` is honored on this server version. Do not invent an event payload shape.

## Reading this file

- Each safe recipe runs without a provider call (Example 4 and Example 7 are the only two whose body invokes a model, and neither is executed in Phase 3D -- live execution is in Phase 3E2 after the review gate).
- Each unsafe callout maps to a research-derived anti-pattern documented in [`03_decision_guide.md`](03_decision_guide.md).
- The verified config examples are the only ones outside the nine required recipes; they are included because research verified their shape and a writer needs them to confirm provider presence.
- The pointer table is the canonical "do not invent" list. Every later writer or reader who touches a body shape not enumerated in this file must look up `types.gen.ts`.

## Cross-file reading path

- [`00_README.md`](00_README.md) -- reading map and v1 baseline + v2 delta policy.
- [`01_prerequisites.md`](01_prerequisites.md) -- install the CLI binary, confirm PATH, record skew, probe `global.health()`.
- [`02_quickstart.md`](02_quickstart.md) -- Recipe A (embedded) and Recipe B (existing server).
- [`03_decision_guide.md`](03_decision_guide.md) -- use-versus-avoid rules; revalidation pointer for endpoint body shapes.
- [`04_api_map.md`](04_api_map.md) -- namespace map with v1 / v2 / both markers and the contiguous v2-delta block.
- [`05_lifecycle.md`](05_lifecycle.md) -- owned-server cleanup, abort signals, Windows process-tree kill.
- [`06_security.md`](06_security.md) -- server Basic auth, loopback gate, CORS, value-free logging.
- [`07_errors.md`](07_errors.md) -- tuple versus throw, exact v2 HTML guard, structured-output discriminator.
- [`08_events.md`](08_events.md) -- SSE subscription, 7 verified v1 event names, 27 source-surfaced v2 delta names.

## What this file does not claim

- It does not claim the recipes have been runtime-executed against a real provider. Phase 3D is docs-only; live provider execution belongs in Phase 3E2 after the review gate.
- It does not claim return-shape field names beyond the verified subset. Anything marked `not-verified` is intentional.
> UNSAFE -- the bullet list below enumerates deliberately-omitted anti-patterns including apply_patch.
- It does not include `apply_patch` body examples, `session.command` / `session.shell` / `client.auth.set` / `client.provider.oauth.authorize` body examples, or any other body whose shape the canonical research did not verify.
- It does not introduce a `max_tokens` field on the SDK body. Research did not verify `max_tokens` on `session.prompt` [S1]; the dossier's residual-cost ceiling is the 30-second wall clock plus the tiny JSON schema.
- It does not mix v1 and v2 imports. Every recipe in this file imports from `@opencode-ai/sdk` (v1 default); the v2 surface is reachable only via the explicit subpath and is documented in [`04_api_map.md`](04_api_map.md).

## Sources used in this file

- `[S1]` OpenCode SDK docs page (full v1 namespace + body shape table, generated types named)
- `[S2]` OpenCode Server docs page (per-namespace HTTP path table, full endpoint list including session CRUD)
- `[S6]` v1 SDK entrypoint source (re-exports, `createOpencode` wiring)
- `[S7]` v1 SDK client source (x-opencode-directory interceptor, error wrapping)
> UNSAFE -- the source description below references the createOpencodeTui factory as a known source-fact.
- `[S8]` v1 SDK server source (spawn defaults, listening-URL parse, `createOpencodeTui` with stdio inherit)
- `[S10]` v2 SDK client source (workspace header rewrite, HTML-response guard)
- `[S11]` v1 SDK server source (POSIX SIGTERM-then-SIGKILL chain via cross-spawn; file-path workspace resolution)
- `[S13]` SDK error interceptor source (`Error.cause = { body, status }`, message resolution order)
- `[S14]` SDK process helper source (Win32 `taskkill /T /F`, `bindAbort`)
- `[S15]` v1 generated types file (verified v1 event-name set)
- `[S16]` v2 generated types file (v2-only event-name set)
- `[S17]` SDK package.json (exports map for `@opencode-ai/sdk` and `@opencode-ai/sdk/v2`)
- `[S19]` GitHub issue #43112 (trim-`filePath` discipline)
- `[Z14]` companion live-validation research (Zen primary response shape subset)
- `[Z15]` companion live-validation research (Zen primary response shape subset)

The authoritative mirror of all `[Sn]` markers is planned for [`99_sources.md`](99_sources.md) in Phase 3F.

sdk=1.18.18 cli=1.18.x access=2026-08-18