/* Purpose: existing-server client agent - own the server in the same process, then do all work through createOpencodeClient with a trimmed repository directory, covering session CRUD plus a forced 404 throwOnError parse. */
/* Expected behavior: server.url feeds createOpencodeClient({ baseUrl, directory }); a created session round-trips through get/list/delete; session.get on a missing id throws an Error whose .cause carries { body, status } with status 404. */
/* Smallest validation: bun run example-b-client.ts exits 0 and prints server version: 1.18.x, created id:, fetched id:, present in list during: true, absent in list before: false, delete ok: true, message:, status: 404, has body:, v2 html guard: false, and close completed: true. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode, createOpencodeClient } from "@opencode-ai/sdk";
import { fileURLToPath } from "node:url";

// Explicit free high loopback port, distinct from the other two examples.
const PORT = 47832;

// Caller-side discipline for issue #43112: strip trailing whitespace and
// newlines from any path before it reaches an SDK call. A path derived from a
// module URL also carries a trailing separator; normalize that too so the
// server receives a clean project root in the directory header/query.
function trimPath(value: string): string {
  return value.replace(/[\\/]+$/u, "").replace(/[\s]+$/u, "");
}

// Repo root two levels above this file (agents/ -> opencode-sdk-agent-docs/ -> repo root).
const REPO_ROOT = trimPath(fileURLToPath(new URL("../..", import.meta.url)));

// Profile: the dossier's verified server endpoint GET /global/health returns
// { healthy: true, version: string } [S2]. The v1 SDK surface at 1.18.18 does
// NOT generate a client.global.health() method (probed on this host), so this
// example probes the same loopback endpoint directly before the CRUD calls.
async function probeHealth(serverUrl: string): Promise<{ healthy: boolean; version: string }> {
  const url = new URL("global/health", serverUrl);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`health probe failed with status ${response.status}`);
  }
  const raw = (await response.json()) as { healthy?: boolean; version?: string };
  return { healthy: raw.healthy === true, version: typeof raw.version === "string" ? raw.version : "<missing>" };
}

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
  return { message: String(value), hasBody: false };
}

let closeCompleted = false;

try {
  const { server } = await createOpencode({
    hostname: "127.0.0.1",
    port: PORT,
    timeout: 30000,
  });

  try {
    // Self-contained single command: the client-only factory runs against the
    // server this same script owns (createOpencode -> server.url -> client).
    // throwOnError: true so the forced 404 below surfaces as a real Error.
    const client = createOpencodeClient({
      baseUrl: server.url,
      directory: REPO_ROOT,
      responseStyle: "fields",
      throwOnError: true,
    });

    const health = await probeHealth(server.url);
    console.log("server version:", health.version);

    const before = await client.session.list();
    const beforeIds = new Set(
      Array.isArray(before.data) ? before.data.map((s) => (s as { id: string }).id) : [],
    );

    const created = await client.session.create({ body: { title: "Example-B-client" } });
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

    // FORCED 404: throwing client against a session id that does not exist.
    // The id is well-formed (ses_ + 24 chars) so the server answers with a real
    // 404; a malformed id string would surface as a 500 on this server version.
    // The SDK wraps the 404 into an Error whose .cause is { body, status }.
    try {
      await client.session.get({ path: { id: "ses_aaaaaaaaaaaaaaaaaaaaaaaa" } });
      console.log("unexpected: call did not throw");
    } catch (value: unknown) {
      const parsed = summarize(value);

      // Exact v2 HTML guard string, verbatim from the dossier [S10].
      const isV2HtmlGuard =
        parsed.message ===
        "Request is not supported by this version of OpenCode Server (Server responded with text/html)";

      console.log("message:", parsed.message);
      console.log("status:", parsed.status);
      console.log("has body:", parsed.hasBody);
      console.log("v2 html guard:", isV2HtmlGuard);
    }
  } finally {
    await server.close();
    closeCompleted = true;
  }
} catch (value) {
  process.exitCode = 1;
  console.log("run failed:", value instanceof Error ? value.message : String(value));
} finally {
  if (closeCompleted) {
    console.log("close completed: true");
  } else {
    process.exitCode = 1;
    console.log("close completed: false");
  }
}