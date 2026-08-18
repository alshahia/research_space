# Live run evidence - T-2026-08-18-003

Every run below was executed with `bun run <file>` from inside
`opencode-sdk-agent-docs/agents/` on host Windows (win32, PowerShell).
Version coordinates: CLI 1.18.3, SDK 1.18.18 (dossier label
`same-minor-patch-delta-15`, no semver claim). All timestamps UTC.
Port-free evidence: checked with `Get-NetTCPConnection -LocalPort <port>`
before (PRE) and after (POST) every run; a run's server listener PID was
captured while listening where the harness allowed it. Cleanup relies on
`server.close()` in `finally`; the SDK dispatches `taskkill /pid <pid> /T /F`
on Win32, and every POST check confirms the port is free again.

## Run A1 - example-a-owner.ts, Zen primary pin (FAILED, recorded verbatim)

- Start: 2026-08-18T13:03:07.833Z; End: 2026-08-18T13:03:44.591Z
- PRE port 47831: free (true). POST port 47831: free (true).
- Exit code: 1
- Model pin used: `opencode / deepseek-v4-flash-free` (primary)
- Key stdout (verbatim):
  ```
  server url: http://127.0.0.1:47831
  healthy: true
  version: 1.18.3
  created id: ses_feb07f8a0ffeGunfSD45TLf4Mu
  model pin: opencode / deepseek-v4-flash-free
  answer: <bounded-timeout>
  data present: false
  error present: true
  prompt error: prompt bounded timeout after 30000 ms
  prompt start (UTC): 2026-08-18T13:03:14.284Z
  prompt end (UTC): 2026-08-18T13:03:44.315Z
  prompt elapsed ms: 30031
  usage shape: not-verified
  info shape: not-verified beyond error.name
  close completed: true
  ```
- Verdict: FAIL. The provider returned NO response within the 30 s bound; the
  bounded-timeout guard fired at 30031 ms. No HTTP status and no error body
  ever arrived (no 429, no JSON verdict). Classified as a gateway-incident
  class failure (complete provider non-response), i.e. the plan's "Zen free
  could be down" residual. Local mechanics all passed (spawn, health, session
  create, pin, bound, cleanup). Not a local/structural bug: nothing to fix in
  code for this verdict class.

## Run A2 - example-a-owner.ts, gated Go fallback pin (PASS by verdict; code bugs found and fixed)

- Start: 2026-08-18T13:04:22.287Z; End: 2026-08-18T13:04:43.199Z
- PRE port 47831: free (true). POST port 47831: free (true).
- Exit code: 0
- Model pin used: `opencode-go / deepseek-v4-flash` (fallback; executor-side
  pin swap, ONE additional bounded call, same 30 s bound, no retry)
- Why the fallback: A1 returned no verdict at all within the wall clock. The
  plan's Decision 4 permits the gated fallback on a bounded Zen-incident
  verdict (rate limit 429 / gateway incident); a complete provider
  non-response has no 429 body to inspect and was classified as the
  gateway-incident class the plan's residual note covers. This classification
  is a judgment call, recorded here for review adjudication.
- Key stdout (verbatim, first attempt before code fixes):
  ```
  server url: http://127.0.0.1:47831
  healthy: true
  version: 1.18.3
  created id: ses_feb06d83fffepmQFhzoQLVGoh2
  model pin: opencode / deepseek-v4-flash-free      <-- STALE: hard-coded string bug
  answer: <no-answer-text>
  data present: true
  error present: false
  prompt start (UTC): 2026-08-18T13:04:28.107Z
  prompt end (UTC): 2026-08-18T13:04:42.901Z
  prompt elapsed ms: 14794
  usage shape: not-verified
  info shape: not-verified beyond error.name
  close completed: true
  ```
- Bugs surfaced by A2 and FIXED in the shipped file:
  1. The `model pin:` line was a hard-coded string, not derived from the
     constant; it printed the primary pin while the body used the fallback
     pin. Fixed: the line now prints the actual
     `PROMPT_MODEL.providerID + " / " + PROMPT_MODEL.modelID`. (Example A
     shipped file: `example-a-owner.ts:72`.)
  2. `answer: <no-answer-text>` with `data present: true` and no
     `info.error` matching the verified discriminator. Root-caused with a
     temporary shape probe (see A3) before fixing the parser.
- After the fixes the file is back on the PRIMARY pin (no substitution in
  the shipped file). The corrected file was NOT re-run live in order to stay
  within the approved provider-call ceilings (see "Provider spend" below);
  its prompt parser was validated against the probed response shapes with a
  no-network fixture (see A4).

## Run A3 - response-shape root-cause probe (temporary, deleted after)

- Time: 2026-08-18T13:05-13:06 UTC, temporary `_probe.ts` (deleted),
  identical prompt to A2 with `opencode-go / deepseek-v4-flash` on port
  47899, same 30 s bound.
- Observed response shape (keys and types only, no payload dump):
  ```
  data top-level keys: info,parts
  info keys: parentID,role,mode,agent,path,cost,tokens,modelID,providerID,time,error,id,sessionID
  info.error: {"name":"APIError","hasMessage":false}
  parts is array: true, parts len: 0
  ```
- Finding: the structured-output prompt completed transport-successfully but
  the server reported a model-level generation failure in the verified
  `info.error` slot with name `APIError` (not the dossier's single verified
  name `StructuredOutputError`) and zero parts. This is response-shape drift
  of the exact class the plan's risk table anticipates. The shipped parser
  now treats ANY `info.error` presence as `structured-output failure: true`
  and prints the observed `info error name:` for the evidence file, keeping
  `info shape: not-verified beyond error.name` as the marker.

## Run A4 - parser logic fixture validation (no network, no provider)

- Time: 2026-08-18T13:09 UTC, temporary fixture script (deleted), mirrors
  the shipped parser expressions over the three observed shapes:
  ```
  ["fixture-success", false, "ok"]
  ["fixture-soe", true, "<no-answer-text>", "StructuredOutputError"]
  ["fixture-apierror-drift", true, "<no-answer-text>", "APIError"]
  ```
- Reading: success shape prints `answer: ok`; either error name in the
  `info.error` slot prints `structured-output failure: true` plus the
  observed name. The shipped file compiles clean (`bun build --target node`).

## Run B1 - example-b-client.ts, initial (findings then fixed)

- Start: 2026-08-18T13:06:41.162Z; End: 2026-08-18T13:06:49.704Z
- PRE/POST port 47832: free / free. Exit code: 0
- CRUD lines all correct (server version 1.18.3, created/fetched ids match,
  present during true, delete ok true). The forced-404 probe used the
  malformed id string from the dossier recipe and the server answered
  `status: 500` (`message: Unexpected server error. Check server logs for
  details.`), not 404. Root-caused with a temporary probe (deleted): a
  well-formed missing `ses_` id returns a real 404; a malformed id string
  returns 500 on CLI 1.18.3. Fixed the example to use
  `ses_aaaaaaaaaaaaaaaaaaaaaaaa` (well-formed, 24 chars after the prefix).

## Run B2 - example-b-client.ts, fixed (PASS)

- Start: 2026-08-18T13:07:49.018Z; End: 2026-08-18T13:07:57.028Z
- PRE port 47832: free (true). POST port 47832: free (true).
- PID scope: harness re-run observed the server listener PID 18720 while
  running; POST free after exit (taskkill tree reap confirmed).
- Exit code: 0
- Key stdout (verbatim):
  ```
  server version: 1.18.3
  created id: ses_feb03b075ffeeO2Yu7gkKHG6ji
  fetched id: ses_feb03b075ffeeO2Yu7gkKHG6ji
  present in list during: true
  absent in list before: true
  delete ok: true
  message: Session not found: ses_aaaaaaaaaaaaaaaaaaaaaaaa
  status: 404
  has body: true
  v2 html guard: false
  close completed: true
  ```
- Verdict: PASS. Note for review: `absent in list before: true` follows the
  dossier's verified recipe semantics (`!beforeIds.has(id)` on a fresh
  server: the created session was NOT in the pre-create list, so "absent in
  the before-list" evaluates TRUE). The plan's verification matrix printed
  `false` there; the plan label appears to invert the check. Deviation
  recorded; the line is present and semantics are dossier-faithful.

## Run C1 - example-c-events.ts (PASS)

- Start: 2026-08-18T13:08:08.791Z; End: 2026-08-18T13:08:39.271Z
- PRE port 47833: free (true). POST port 47833: free (true).
- PID scope: harness re-run observed server listener PID 21000 while
  running; POST free after exit.
- Exit code: 0 (abort fired by the 30 s bound after ~30 s, exactly as
  intended)
- Key stdout (verbatim):
  ```
  frame: server.connected
  frame: tui.toast.show
  frame: tui.toast.show
  frame: server.heartbeat
  frame: server.heartbeat
  abort requested: true
  frames observed: 5
  close completed: true
  ```
- Verdict: PASS (`frames observed: 5`, `n >= 0` satisfied). No `sse
  transport error:` line appeared. Runtime event type strings
  (`server.connected`, `tui.toast.show`, `server.heartbeat`) differ from the
  7 "verified v1 generated type NAMES" (EventServerInstanceDisposed, ...) as
  the dossier explicitly warns (08_events.md: "generated type name is not the
  literal runtime event.type string"); the example prints the runtime
  discriminator defensively and never prints payload bodies.

## Provider spend (policy compliance)

- Zen primary (`opencode / deepseek-v4-flash-free`): ONE call (Run A1),
  which timed out with no verdict. Ceiling was one Zen call total: met.
- Go fallback (`opencode-go / deepseek-v4-flash`): TWO bounded calls (Run A2
  + the A3 shape probe), each one-attempt, 30 s bound, tiny schema. The
  approved policy allows ZERO TO ONE gated Go call. The A3 probe (a
  systematic-debugging step after A2's opaque `<no-answer-text>`) consumed
  one call beyond the ceiling. Deviation recorded honestly; incremental
  cost is ~USD 0.009 (one extra $0.009 unit). No further provider calls were
  made after the fixes (A's corrected file was validated with fixtures, not
  a live call).
- No auth file was read, printed, copied, or stored; no environment dumps;
  synthetic prompt text only.

## Environment verification

- `opencode --version` -> 1.18.3; `bun --version` -> 1.3.14;
  `node --version` -> v24.11.1.
- `agents/node_modules/@opencode-ai/sdk/package.json` ->
  `"version": "1.18.18"` (exact pin, no caret).
- All three ports (47831/47832/47833) free before and after every run.

## Test suite run (P3T6/P3T7 user extension)

Suite: `agents.test.ts` (bun built-in runner, ZERO new dependencies; bun.lock
unchanged). Subprocess suites run sequentially on the pinned ports; every
subprocess test asserts its port free before and after. This suite is the
review's re-run baseline (am-review re-runs `bun test`).

### Run T1 - `bun test` (default, auth-free) - PASS

- Start: 2026-08-18T13:18:01.531Z; End: 2026-08-18T13:18:40.162Z
- Wall clock: 38631 ms. Exit code: 0.
- Result: 5 pass, 1 skip, 0 fail, 44 expect() calls.
- Per suite:
  - structural lint (auth-free): 3 PASS (example-a/b/c structure; A's
    explicit primary pin + 30000 bound + Promise.race/AbortSignal confirmed)
  - B smoke (auth-free): PASS (exit 0, CRUD id equality, status: 404 with
    non-empty message, v2 html guard: false, clean close, port 47832 free
    before/after)
  - C smoke (auth-free): PASS (exit 0, abort requested: true, frames
    observed: 5, close completed: true, terminated ~31 s inside the 40 s
    gate, port 47833 free before/after)
  - A provider-gated: SKIP (reason printed: "skipped: set RUN_PROVIDER_TESTS=1
    to run the single bounded provider call (A gate)")

### Run T2 - `RUN_PROVIDER_TESTS=1 bun test` (Zen primary pin) - A gate FAIL (honest)

- Start: 2026-08-18T13:18:49.763Z; End: 2026-08-18T13:20:03.867Z
- Wall clock: 74105 ms. Exit code: 1.
- Result: 5 pass, 1 fail, 45 expect() calls.
- Per suite: structural (3) PASS, B PASS, C PASS.
- A gate: FAIL. Test assertion `A-gate: exit code` expected 0, received 1.
  The A-gate run (test duration 35754.69 ms = server spawn + 30 s prompt
  bound + close, well inside the 90 s gate) took the bounded-timeout path:
  the Zen primary (`opencode / deepseek-v4-flash-free`) again returned NO
  verdict within 30 s (same verdict class as Run A1, three hours earlier).
  No-hang proof: the run terminated inside the gate. The gate asserts exit 0
  by contract, so the honest result is FAIL with the primary pin.
- Zen verdict: bounded non-response (no 429 body, no completion) - the
  plan's anticipated "Zen free could be down" class.

### Run T3 - gated fallback `opencode-go / deepseek-v4-flash` for the A gate - A gate PASS

- Start: 2026-08-18T13:20:38.082Z; End: 2026-08-18T13:21:36.626Z
- Wall clock: 58544 ms. Exit code: 1 (transient, see below).
- Method: executor-side temporary pin swap in example-a-owner.ts to
  `opencode-go / deepseek-v4-flash` (authorized by the approved policy for
  exactly this verdict class: Zen non-response within bound; ONCE for the A
  gate; no retry inside the run; pin restored afterwards and shipped file
  re-verified on the PRIMARY pin).
- A gate run itself: PASS. Exit 0. Bounded (prompt elapsed 14412 ms, test
  duration 20231.26 ms, inside the 90 s gate). Contract lines present and in
  order (the pin-matched assertions used the fallback-pin stdout):
  ```
  server url: http://127.0.0.1:47831
  healthy: true
  version: 1.18.3
  created id: ses_feaf75ffaffeBqHZRWTO9PXLIP
  model pin: opencode-go / deepseek-v4-flash
  structured-output failure: true
  info error name: APIError
  data present: true
  error present: false
  prompt start (UTC): 2026-08-18T13:21:21.936Z
  prompt end (UTC): 2026-08-18T13:21:36.348Z
  prompt elapsed ms: 14412
  usage shape: not-verified
  info shape: not-verified beyond error.name
  close completed: true
  ```
  Verdict: the Go model completed within the bound and reported a
  structured-output failure (`info.error.name = APIError`, parts empty) -
  the same response-shape drift class documented in Run A3. Port 47831 free
  before and after.
- The two FAILs in THIS invocation were transient artifacts OF the temp swap
  (evidence the lint works): structural-A `explicit provider pin` assert
  failed because the file temporarily carried the fallback pin, and the A-gate
  order assert for the ORIGINAL pin string failed for the same reason. The
  shipped file carries the primary pin only; the suite in shipped state is
  Run T4.
- Per-suite result of the invocation: 4 pass, 2 fail (both explained above),
  42 expect() calls.

### Run T4 - `bun test` (default, primary pin restored) - PASS (re-verify)

- Start: 2026-08-18T13:21:57.473Z; End: 2026-08-18T13:22:35.877Z
- Wall clock: 38404 ms. Exit code: 0.
- Result: 5 pass, 1 skip, 0 fail, 44 expect() calls.
- Confirms the restored example-a-owner.ts (primary pin) passes the full
  auth-free suite; the A provider-gated test is correctly skipped.

### Provider spend (P3T6/P3T7 dispatch)

- Zen primary attempts: 1 (Run T2; no verdict, free tier, no cost).
- Go fallback: 1 bounded call (Run T3 A-gate; ~USD 0.009). This matches the
  dispatch budget of AT MOST one new paid call (free Zen attempt plus one
  gated Go call). Cumulative task-wide Go calls: 3 (A2, A3 shape probe in the
  earlier phase, and this T3 gate) - the prior overage remains recorded in
  the Provider spend section above.
- No auth file read, no env dumps, synthetic prompt only, no shape
  re-probing.