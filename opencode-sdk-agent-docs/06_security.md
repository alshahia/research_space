# Security for exposed OpenCode servers

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file is for an agent that exposes an OpenCode server on any non-loopback interface. It defines the minimum authentication, bind, browser-origin, and logging posture. It does not describe provider credential storage and does not require reading any local secret file.

Read [`05_lifecycle.md`](05_lifecycle.md) for process ownership and [`07_errors.md`](07_errors.md) for safe error parsing. The canonical source mirror is planned for [`99_sources.md`](99_sources.md); until then, `[S2]` resolves to the official OpenCode server docs entry in [`../share/notes/01_research_T-2026-08-18-001.md`](../share/notes/01_research_T-2026-08-18-001.md).

## Hard security gate

The default server bind is loopback `127.0.0.1` on port `4096` [S2]. Keep that default unless another host or a browser must reach the service.

Before any non-loopback bind, all of these must be true:

1. `OPENCODE_SERVER_PASSWORD` is injected by the deployment's secret mechanism.
2. `OPENCODE_SERVER_USERNAME` is either omitted, which leaves the default user `opencode`, or is injected explicitly.
3. Network policy restricts which clients can reach the port.
4. Browser origins are enumerated with `--cors` when browser access is required.
5. Logs expose only presence booleans, never variable values.

If any item is false, bind to loopback and stop there.

## Authentication contract

OpenCode server authentication is HTTP Basic authentication controlled by server environment variables [S2]. It is a server-side gate rather than an option on `createOpencodeClient()`.

| Setting | Meaning | Safe rule | Citation |
|---|---|---|---|
| `OPENCODE_SERVER_PASSWORD` | Enables the password half of HTTP Basic authentication | Required before every non-loopback bind | [S2] |
| `OPENCODE_SERVER_USERNAME` | Overrides the HTTP Basic username | Optional; default is `opencode` | [S2] |

The username default `opencode` is public product behavior, not a private account identifier [S2]. Any deployment-specific username or password shown below is a placeholder.

## Placeholder-only launch examples

These examples are documentation only. Replace placeholders through a secret manager or deployment control plane. Never paste a real value into source control.

### POSIX shell shape

```sh
export OPENCODE_SERVER_USERNAME="<service-user>"
export OPENCODE_SERVER_PASSWORD="<secret-manager-injected-value>"
opencode serve --hostname 0.0.0.0 --port 4096
```

### PowerShell shape

```powershell
$env:OPENCODE_SERVER_USERNAME = "<service-user>"
$env:OPENCODE_SERVER_PASSWORD = "<secret-manager-injected-value>"
opencode serve --hostname 0.0.0.0 --port 4096
```

The angle-bracket strings are placeholders, not credentials. Production deployment should inject values without committing them to a script.

## Loopback versus non-loopback

### Loopback bind

Use `127.0.0.1` when the SDK client and server run on the same host.

Advantages:

- The listening socket is not reachable from another host by normal routing.
- No browser CORS rule is required for a same-process Node client.
- The lifecycle owner can use an explicit high port without publishing it externally.
- A local worker can pass `directory` without exposing the service to a wider network.

Loopback reduces exposure but does not make unsafe logging acceptable. Keep the two server authentication variables out of logs in every topology.

### Non-loopback bind

A bind such as `0.0.0.0` or a LAN address exposes the port to any network path allowed by the host firewall. That changes the trust boundary.

Required controls:

- Inject `OPENCODE_SERVER_PASSWORD` before startup [S2].
- Keep the default `opencode` username or inject `OPENCODE_SERVER_USERNAME` [S2].
- Restrict ingress to the expected client network.
- Terminate TLS at a trusted reverse proxy when traffic leaves the local host.
- Enumerate browser origins instead of using a wildcard.
- Record the bind address and approved origins, but not the authentication values.
- Shut down the server when the owning workload exits.

Authentication and network restriction are complementary. One does not replace the other.

## Browser clients and `--cors`

The server accepts a repeatable `--cors` flag for browser origins [S2]. Add one flag per exact trusted origin.

```sh
opencode serve \
  --hostname 0.0.0.0 \
  --port 4096 \
  --cors https://agent-console.example.invalid \
  --cors https://review-console.example.invalid
```

The `.invalid` hostnames are placeholders reserved for examples. Replace them with exact deployed origins.

CORS rules:

- CORS controls which browser origins may read responses.
- CORS does not authenticate a caller.
- CORS does not protect non-browser clients.
- An allowed origin should include the expected scheme and host.
- Add the development origin only to development deployments.
- Avoid `*` on any service that can reach project files or sessions.
- Keep authentication enabled even when every origin is enumerated.

A Node or Bun client is not governed by browser CORS enforcement. It still must authenticate when the server requires HTTP Basic authentication.

## Safe environment-variable hygiene

This section covers only `OPENCODE_SERVER_PASSWORD` and `OPENCODE_SERVER_USERNAME`, as required by the security scope.

### Never log values

Do not print either value in startup output, exception context, telemetry attributes, traces, or diagnostic bundles.

Safe presence-only check:

```ts
const serverAuthState = {
  passwordConfigured: Boolean(process.env.OPENCODE_SERVER_PASSWORD),
  usernameConfigured: Boolean(process.env.OPENCODE_SERVER_USERNAME),
};

console.info("OpenCode server auth state", serverAuthState);
```

This snippet logs booleans only. It does not reveal the username or password.

### Never interpolate values into errors

Bad pattern:

```ts
// Unsafe: do not include either environment value in an error string.
throw new Error("OpenCode server authentication configuration failed");
```

The shown error text is intentionally generic. Add a deployment correlation id if needed, not the values.

### Never include values in child argument lists

The documented contract uses environment variables [S2]. Do not translate either value into a custom command-line flag. Process listings and supervisor dashboards often expose argument lists.

### Keep inheritance narrow

Inject the two variables into the OpenCode server workload, not into unrelated build, test, or documentation processes. A narrow environment reduces accidental disclosure.

### Rotate without dossier changes

The dossier stores only variable names and placeholders. Rotation changes deployment state, not documentation or source code.

## Pre-bind decision table

| Intended reachability | Password configured | Username choice | CORS | Decision |
|---|---:|---|---|---|
| Same-process loopback client | optional by server default | default `opencode` is acceptable | not needed | Bind `127.0.0.1` |
| Same-host browser | required if the service is treated as exposed | default or injected | exact local browser origin | Bind loopback and add exact origin |
| LAN client | required | default or injected | only if browser-based | Bind a specific interface, restrict ingress |
| Public reverse proxy | required | injected or default by policy | exact production browser origins | Require TLS, proxy controls, and restricted ingress |
| Unknown caller set | missing or unknown | unknown | unknown | Do not bind non-loopback |

## Deployment checklist

Before startup:

- Confirm the intended bind is loopback or non-loopback.
- Confirm `OPENCODE_SERVER_PASSWORD` presence without reading or logging its value.
- Confirm whether `OPENCODE_SERVER_USERNAME` is intentionally omitted or injected.
- Confirm the listener is behind the expected firewall or proxy policy.
- Confirm each browser origin has one exact `--cors` entry.
- Confirm no wildcard origin is present.

After startup:

- Verify the service is reachable only from intended networks.
- Verify a request without credentials is rejected when authentication is enabled.
- Verify an approved client can authenticate.
- Verify an unapproved browser origin cannot read the response.
- Verify logs contain only the presence booleans shown above.
- Verify shutdown follows [`05_lifecycle.md`](05_lifecycle.md).

The verification steps should run in the deployment environment under an approved test plan. This docs-only phase does not execute them.

## Reverse-proxy boundary

When a reverse proxy fronts the server:

- Keep OpenCode authentication enabled behind the proxy.
- Restrict direct access to the OpenCode listener.
- Let the proxy terminate TLS and enforce its own client policy.
- Forward only the headers the deployment requires.
- Do not trust CORS as a proxy access-control rule.
- Do not expose diagnostics that include process environments.

A proxy can add controls but should not erase the server's own authentication boundary.

## Incident-safe logging

Recommended fields:

- Timestamp.
- Bind class: `loopback` or `non-loopback`.
- Port number.
- CORS origin count.
- `passwordConfigured: true|false`.
- `usernameConfigured: true|false`.
- Request status code.
- Correlation id.

Forbidden fields:

- The value of `OPENCODE_SERVER_PASSWORD`.
- The value of `OPENCODE_SERVER_USERNAME`.
- A complete process environment.
- Basic-auth header contents.
- Unredacted request headers.

When an error occurs, preserve status and a sanitized message. [`07_errors.md`](07_errors.md) shows how to inspect `.cause` without dumping its full body.

## Common security failures

| Symptom | Root cause | Immediate correction |
|---|---|---|
| Non-loopback service accepts an unauthenticated request | Password variable was absent at server start | Stop the listener, inject the password, restart |
| Browser request fails despite valid authentication | Origin is not listed | Add the exact origin with one `--cors` flag [S2] |
| Browser request succeeds from an unexpected origin | Origin rule is too broad | Replace broad rule with exact origins |
| Logs include a server username or password | Values were interpolated into logs | Remove the values, rotate affected values, retain booleans only |
| Reverse proxy is secure but direct port remains reachable | Listener ingress is not restricted | Limit direct listener access to the proxy network |
| A worker connects to the wrong project | Client omitted or mis-set `directory` | Fix client routing using [`05_lifecycle.md`](05_lifecycle.md) |

The expanded operational troubleshooting table is planned for [`10_known_issues_and_troubleshooting.md`](10_known_issues_and_troubleshooting.md).

## What this file does not claim

- It does not claim CORS is authentication.
- It does not claim loopback replaces secret hygiene.
- It does not define any provider credential body.
- It does not introduce another server authentication environment variable.
- It does not inspect local secret storage.
- It does not claim semver proves a secure or compatible deployment.

## Cross-file reading path

1. Start with [`00_README.md`](00_README.md) for the v1 baseline and v2 delta policy.
2. Use [`01_prerequisites.md`](01_prerequisites.md) for SDK and CLI prerequisites.
3. Use [`03_decision_guide.md`](03_decision_guide.md) for SDK versus raw HTTP choices.
4. Apply this file before a non-loopback bind.
5. Use [`05_lifecycle.md`](05_lifecycle.md) for owned cleanup.
6. Use [`07_errors.md`](07_errors.md) for sanitized error handling.
7. Use [`08_events.md`](08_events.md) for long-lived SSE connections.

## Freshness footer

sdk=1.18.18 cli=1.18.x access=2026-08-18
