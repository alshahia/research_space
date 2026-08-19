# Error handling contract

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file is for any reader handling OpenCode SDK errors. It separates four surfaces that must not be collapsed into one catch block: default result tuples, thrown HTTP errors, transport failures, and model-level structured-output failures.

Read [`03_decision_guide.md`](03_decision_guide.md) for the choice between tuple and throw modes, [`04_api_map.md`](04_api_map.md) for namespace methods, and [`06_security.md`](06_security.md) before logging any error data. The canonical source mirror is planned for [`99_sources.md`](99_sources.md); until then, citations resolve to [`../share/notes/01_research_T-2026-08-18-001.md`](../share/notes/01_research_T-2026-08-18-001.md).

## Four error surfaces

| Surface | Detection | Control flow | Source |
|---|---|---|---|
| HTTP/API failure with `throwOnError: false` | `result.error` is present | Normal return with `responseStyle: "fields"` | [S7][S13] |
| HTTP/API failure with `throwOnError: true` | Catch an `Error` | Throws; `.cause` carries `{ body, status }` | [S7][S13] |
| v2 server returns HTML | Exact guard message shown below | Throws before normal body handling | [S10] |
| Structured-output generation fails | `result.data?.info.error?.name` equals `StructuredOutputError` | Successful SDK transport may still contain model-level failure | [S1] |

Do not treat `StructuredOutputError` as an HTTP status error. Do not treat an HTML guard as a retryable model failure. The layers have different fixes.

## Mode A: `throwOnError: false`

The v1 client defaults to `responseStyle: "fields"` and does not opt into throwing for HTTP error responses [S7][S13]. Each method returns a fields-style result:

```ts
{
  data,
  error,
  response,
  request,
}
```

The exact generic types depend on the generated endpoint. The stable control-flow rule is:

```ts
import { createOpencodeClient } from "@opencode-ai/sdk";

const client = createOpencodeClient({
  baseUrl: "http://127.0.0.1:4096",
  responseStyle: "fields",
  throwOnError: false,
});

const result = await client.global.health();

if (result.error) {
  console.error("OpenCode request failed", {
    status: result.response?.status,
    message: "request returned an error body",
  });
} else {
  console.log(result.data);
}
```

Use this mode when:

- The caller already branches on `data` and `error`.
- Error responses are expected business outcomes.
- A batch should continue after one item fails.
- The caller wants the underlying `Response` without a catch block.

Do not assume every transport failure becomes `result.error`. A failure that prevents a response from existing can still reject the underlying fetch path. Keep an outer catch for network and cancellation failures.

## Mode B: `throwOnError: true`

With `throwOnError: true`, the error interceptor produces a real `Error` [S13]. Its message uses the most informative verified source available in this order:

1. A nested `.data.message` string.
2. A top-level `.message` string.
3. A top-level `.name` string.
4. A derived request description using method, URL, status, and status text.

The thrown error attaches the parsed body and status under `.cause` [S13]:

```ts
{
  body,
  status,
}
```

The body is endpoint-specific. `Body shape unverified -- revalidate against types.gen.ts` before reading fields other than a source-verified message.

Use throw mode when:

- The caller has one central `try` / `catch` boundary.
- Failure should stop the current operation immediately.
- The caller needs one normalized `Error.message`.
- The caller can inspect `.cause.status` and sanitize `.cause.body`.

## Copy-ready `.message` and `.cause` parser

This snippet uses only the verified error contract. It does not assume an endpoint-specific body shape.

```ts
import { createOpencodeClient } from "@opencode-ai/sdk";

type OpenCodeErrorCause = {
  body?: unknown;
  status?: number;
};

type OpenCodeError = Error & {
  cause?: OpenCodeErrorCause;
};

function parseOpenCodeError(value: unknown) {
  if (!(value instanceof Error)) {
    return {
      message: String(value),
      status: undefined,
      body: undefined,
    };
  }

  const error = value as OpenCodeError;
  return {
    message: error.message,
    status: error.cause?.status,
    body: error.cause?.body,
  };
}

const client = createOpencodeClient({
  baseUrl: "http://127.0.0.1:4096",
  responseStyle: "fields",
  throwOnError: true,
});

try {
  const result = await client.global.health();
  console.log(result.data);
} catch (value) {
  const parsed = parseOpenCodeError(value);
  console.error("OpenCode request failed", {
    message: parsed.message,
    status: parsed.status,
    hasBody: parsed.body !== undefined,
  });
}
```

The log intentionally records `hasBody` instead of dumping `body`. A caller may inspect the body locally, but should log only fields approved for that endpoint.

## Exact v2 HTML-response guard

The v2 client checks for an HTML response and throws this exact error [S10]:

```text
Request is not supported by this version of OpenCode Server (Server responded with text/html)
```

The exact source expression is:

```ts
Error("Request is not supported by this version of OpenCode Server (Server responded with text/html)")
```

Do not paraphrase the message in string matching. Do not retry the same SDK/server pairing. The canonical interpretation is a protocol or version mismatch, commonly a v2 client pointed at a v1 server [S10].

Resolution order:

1. Stop the request loop.
2. Call or re-check `global.health()` with the intended client.
3. Compare the server version with the pinned SDK line.
4. Verify the import path is either `@opencode-ai/sdk` for v1 or `@opencode-ai/sdk/v2` for v2.
5. Align client and server before retrying.

The dossier coordinate label `same-minor-patch-delta-15` does NOT claim compatibility from semver alone. The health probe and successful auth-free calls are the evidence.

## Detect the HTML guard without losing other errors

```ts
const V2_HTML_GUARD =
  "Request is not supported by this version of OpenCode Server (Server responded with text/html)";

function isV2HtmlGuard(value: unknown): value is Error {
  return value instanceof Error && value.message === V2_HTML_GUARD;
}

try {
  // Any v2 SDK call may surface the guard before normal body parsing.
} catch (value) {
  if (isV2HtmlGuard(value)) {
    console.error("SDK/server version mismatch");
  } else {
    throw value;
  }
}
```

The constant mirrors the source string verbatim [S10]. The branch logs a classification rather than the response body.

## Empty-body error string

When the server response exists but its parsed body is empty, undefined, or null, `wrapClientError` creates this message pattern [S13]:

```text
opencode server METHOD URL: (empty response body)
```

`METHOD` and `URL` represent the request being wrapped. The verified literal suffix is:

```text
(empty response body)
```

Interpretation:

- A response existed.
- The wrapper could not extract a more informative body message.
- `.cause.status` may still carry the HTTP status.
- `.cause.body` may be empty, undefined, or null.

Do not invent a JSON error body when this message appears.

## Network-failure error string

When no response was received, the researched wrapper uses this literal [S13]:

```text
network error (no response)
```

Interpretation:

- No usable HTTP response reached the wrapper.
- A status may be absent.
- Retrying may be reasonable only after checking reachability, cancellation, and lifecycle state.
- Do not classify it as an SDK/server version mismatch unless the exact HTML guard also appears.

## Empty body versus no response

| Message fragment | Response existed | Status may exist | First check |
|---|---:|---:|---|
| `(empty response body)` | yes | yes | Server/proxy returned an empty body [S13] |
| `network error (no response)` | no usable response | often no | Server reachability, port, abort state [S13] |
| Exact v2 HTML guard | HTML response reached v2 interceptor | not the primary signal | SDK/server version alignment [S10] |

These strings are source-verified. Do not add alternative spellings to automated classifiers unless a later source version proves them.

## Structured-output failure

A structured `session.prompt` can complete the HTTP request but still report that valid JSON was not produced after retries. The verified discriminator is [S1]:

```ts
result.data?.info.error?.name === "StructuredOutputError"
```

Only the `name` discriminator and its location under `data.info.error` are verified in the canonical research. Any additional fields on that object are not verified.

| Field path | Verified use | Shape status |
|---|---|---|
| `data.info.error.name` | Compare with `"StructuredOutputError"` | Verified [S1] |
| `data.info.error.message` | Not established by canonical research | `Body shape unverified -- revalidate against types.gen.ts` |
| `data.info.error.retries` | Not established by canonical research | `Body shape unverified -- revalidate against types.gen.ts` |
| `data.info.error.cause` | Not established by canonical research | `Body shape unverified -- revalidate against types.gen.ts` |

Safe branch:

```ts
const structuredFailure =
  result.data?.info.error?.name === "StructuredOutputError";

if (structuredFailure) {
  console.error("Model did not satisfy the requested JSON schema");
}
```

Do not catch `StructuredOutputError` only in the transport catch. Check the returned `data.info.error` after a successful prompt result [S1].

## Error decision matrix

| Observation | Classification | Retry same request? | Correct next action |
|---|---|---:|---|
| `result.error` in tuple mode | HTTP/API error body | policy-dependent | Inspect status and sanitized generated error shape |
| Thrown `Error` with `.cause.status` | HTTP/API error in throw mode | policy-dependent | Branch by status, preserve message [S13] |
| Exact v2 HTML guard | Version/protocol mismatch | no | Align SDK import and server [S10] |
| `(empty response body)` | Empty server/proxy response | not immediately | Check status and proxy/server logs [S13] |
| `network error (no response)` | Transport/reachability failure | only after diagnosis | Check lifecycle, host, port, and abort state [S13] |
| `data.info.error.name === "StructuredOutputError"` | Model-level schema failure | only under explicit prompt policy | Simplify schema or handle failure [S1] |
| Abort signal is set | Caller cancellation | no automatic retry | Exit current operation cleanly |

A retry policy is an application decision. The SDK does not make every category safe to retry.

## Central handler for both client modes

If an application uses both tuple mode and throw mode, normalize at one boundary:

```ts
function summarizeThrown(value: unknown) {
  const parsed = parseOpenCodeError(value);
  return {
    kind: isV2HtmlGuard(value) ? "version-mismatch" : "thrown-error",
    message: parsed.message,
    status: parsed.status,
    hasBody: parsed.body !== undefined,
  };
}

function summarizeTuple(result: {
  error?: unknown;
  response?: Response;
}) {
  return result.error
    ? {
        kind: "result-error",
        message: "request returned an error body",
        status: result.response?.status,
      }
    : undefined;
}
```

The helper intentionally avoids assuming the tuple's generated error-body fields.

## Logging rules

Safe to log:

- `error.message` after confirming it contains no application-sensitive input.
- `.cause.status`.
- HTTP method and sanitized route template.
- Whether a parsed body exists.
- Error classification.
- Correlation id.

Do not log by default:

- The full `.cause.body`.
- Request headers.
- Full request bodies.
- Environment values.
- Prompt content.
- Project file contents.

Security-specific rules remain in [`06_security.md`](06_security.md).

## What to preserve for troubleshooting

When an error crosses an agent boundary, preserve:

1. SDK version.
2. Server version from the last health probe, if available.
3. Import path class: v1 default or v2 subpath.
4. Client mode: tuple or throw.
5. Error message.
6. Sanitized status.
7. Whether a response body existed.
8. Whether the owner had already started shutdown.

The planned [`10_known_issues_and_troubleshooting.md`](10_known_issues_and_troubleshooting.md) maps these facts to known symptoms. The planned [`11_live_validation.md`](11_live_validation.md) records bounded observed outcomes after review gates. Do not infer those future results here.

## Common mistakes

- Enabling `throwOnError: true` but continuing to inspect `result.error` inside the same failing call.
- Assuming tuple mode prevents transport rejection.
- Matching only a shortened version of the HTML guard.
- Retrying the HTML guard without aligning versions.
- Dumping `.cause.body` into logs.
- Catching structured-output failure only as an exception.
- Reading unverified fields from `data.info.error`.
- Treating an empty body as proof of a network failure.
- Treating no response as proof of an HTTP status.

## Cross-file reading path

- Lifecycle and cancellation: [`05_lifecycle.md`](05_lifecycle.md).
- Authentication and logging: [`06_security.md`](06_security.md).
- Namespace return shapes: [`04_api_map.md`](04_api_map.md).
- SSE transport errors: [`08_events.md`](08_events.md).
- Use versus avoid decision: [`03_decision_guide.md`](03_decision_guide.md).

## Freshness footer

sdk=1.18.18 cli=1.18.x access=2026-08-18
