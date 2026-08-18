/* Purpose: regression + contract test suite for the three OpenCode SDK agent examples in this folder, using bun's built-in test runner (zero new dependencies). */
/* Expected behavior: structural lint passes for all three example files; example-b-client.ts and example-c-events.ts are spawned as subprocesses and exit 0 with the contract stdout lines; example-a-owner.ts is asserted at source level (bounded explicit-pin prompt discipline) and, only when RUN_PROVIDER_TESTS=1, executed once as a gated real provider run. */
/* Smallest validation: `bun test` in this folder exits 0 in under ~60 s with no provider call; `RUN_PROVIDER_TESTS=1 bun test` additionally exercises the one bounded provider verdict. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { describe, expect, test } from "bun:test";
import net from "node:net";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// All suites in this file are SEQUENTIAL by design (bun runs tests in one file
// in order): the subprocess suites share the fixed example ports (47831/47832/
// 47833, pinned by contract) and sequential execution keeps the evidence
// readable and impossible to race on the same loopback port.
const agentsDir = fileURLToPath(new URL(".", import.meta.url));
const BUN = "bun"; // bun test runner spawns `bun run <file>` exactly like the README

const EXAMPLE_A = "example-a-owner.ts";
const EXAMPLE_B = "example-b-client.ts";
const EXAMPLE_C = "example-c-events.ts";

// ---------------------------------------------------------------------------
// Helpers: port probes, subprocess runner, stdout order assertions
// ---------------------------------------------------------------------------

// A free loopback port refuses the connection. Any connect / timeout / other
// error is treated as busy (conservative: the pre-run check FAILs instead of
// auto-rebinding, because the examples are port-pinned by contract).
function portFree(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port });
    socket.setTimeout(1500);
    const finish = (isFree: boolean) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(isFree);
    };
    socket.once("connect", () => finish(false)); // listener present -> busy
    socket.once("timeout", () => finish(false)); // ambiguous -> conservative busy
    socket.once("error", (err: Error) => {
      finish((err as NodeJS.ErrnoException).code === "ECONNREFUSED");
    });
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function expectPortFree(port: number, label: string, attempts = 8, delayMs = 500): Promise<void> {
  for (let i = 0; i < attempts; i++) {
    if (await portFree(port)) return;
    await sleep(delayMs);
  }
  throw new Error(`${label}: expected port ${port} free on loopback, still busy after ${attempts * delayMs} ms`);
}

type RunResult = { exitCode: number; stdout: string; stderr: string };

// Spawn an example as a subprocess (`bun run <file>`), collect piped stdout and
// stderr to completion, and bound the whole run with a kill+FAIL gate. The
// examples are top-level-await scripts with real side effects; they must never
// be imported into the test runner.
async function runExample(file: string, port: number, gateMs: number, label: string): Promise<RunResult> {
  await expectPortFree(port, `${label} (pre)`);
  const proc = Bun.spawn([BUN, "run", file], {
    cwd: agentsDir,
    stdout: "pipe",
    stderr: "pipe",
  });
  let timer: ReturnType<typeof setTimeout> | undefined;
  const gate = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      proc.kill();
      reject(new Error(`${label}: ${file} did not terminate within ${gateMs} ms; killed`));
    }, gateMs);
  });
  try {
    const [stdout, stderr, exitCode] = await Promise.race([
      Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited,
      ]),
      gate,
    ]);
    return { exitCode, stdout, stderr };
  } finally {
    if (timer) clearTimeout(timer);
    await expectPortFree(port, `${label} (post)`);
  }
}

// Assert that every needle occurs in `stdout` in the given order (lines
// between needles are allowed - examples print extra detail lines).
function assertLinesInOrder(stdout: string, needles: Array<string | RegExp>): void {
  const lines = stdout.split(/\r?\n/);
  let cursor = 0;
  for (const needle of needles) {
    const isRe = needle instanceof RegExp;
    let found = false;
    for (; cursor < lines.length; cursor++) {
      if (isRe ? (needle as RegExp).test(lines[cursor]) : lines[cursor].includes(needle as string)) {
        found = true;
        cursor++;
        break;
      }
    }
    if (!found) {
      throw new Error(`stdout line not found in expected order: ${String(needle)}\n--- stdout:\n${stdout}`);
    }
  }
}

function lineValue(stdout: string, prefix: string): string | undefined {
  const m = stdout.match(new RegExp(`^${prefix.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}(.*)$`, "m"));
  return m ? m[1].trim() : undefined;
}

// ---------------------------------------------------------------------------
// Structural lint suite (auth-free, deterministic, fast)
// ---------------------------------------------------------------------------

const FORBIDDEN_BYTE_SEQS: Array<[number[], string]> = [
  [[0xe2, 0x80, 0x94], "em-dash U+2014"],
  [[0xe2, 0x80, 0x93], "en-dash U+2013"],
  [[0xe2, 0x80, 0x98], "left single quote U+2018"],
  [[0xe2, 0x80, 0x99], "right single quote U+2019"],
  [[0xe2, 0x80, 0x9c], "left double quote U+201C"],
  [[0xe2, 0x80, 0x9d], "right double quote U+201D"],
];

// Scan the RAW file bytes, not a decoded string, so Windows-1252-decoding
// traps cannot hide or fake a violation (memory note: windows-encoding
// -validation-trap).
function forbiddenByteHits(buffer: Buffer): string[] {
  const hits: string[] = [];
  for (const [seq, name] of FORBIDDEN_BYTE_SEQS) {
    outer: for (let i = 0; i <= buffer.length - seq.length; i++) {
      for (let k = 0; k < seq.length; k++) {
        if (buffer[i + k] !== seq[k]) continue outer;
      }
      hits.push(name);
      break;
    }
  }
  return hits;
}

function readExample(name: string): { text: string; buffer: Buffer } {
  const buffer = readFileSync(fileURLToPath(new URL(name, import.meta.url)));
  return { text: buffer.toString("utf8"), buffer };
}

function assertStructure(file: string): void {
  const { text, buffer } = readExample(file);

  // 4-line header convention (first lines of the file).
  const head = text.split(/\r?\n/).slice(0, 6).join("\n");
  expect(head.includes("/* Purpose:"), `${file}: Purpose header`).toBe(true);
  expect(head.includes("/* Expected behavior:"), `${file}: Expected behavior header`).toBe(true);
  expect(head.includes("/* Smallest validation:"), `${file}: Smallest validation header`).toBe(true);
  expect(head.includes("/* Freshness footer: sdk=1.18.18"), `${file}: Freshness footer`).toBe(true);

  // Zero em-dash / en-dash / smart-quote bytes.
  const hits = forbiddenByteHits(buffer);
  expect(hits.join(", "), `${file}: forbidden unicode bytes`).toBe("");

  // Dossier forbidden patterns.
  expect(text.includes("port: 0"), `${file}: no literal "port: 0"`).toBe(false);
  expect(text.includes("createOpencodeTui"), `${file}: no createOpencodeTui`).toBe(false);
  expect(text.includes("process.kill"), `${file}: no process.kill`).toBe(false);
  expect(text.includes("auth.json"), `${file}: no auth-file path mention`).toBe(false);
  expect(text.includes(".local/share/opencode"), `${file}: no auth storage path`).toBe(false);

  // Cleanup discipline.
  expect(text.includes("server.close()"), `${file}: server.close() present`).toBe(true);
}

describe("structural lint (auth-free)", () => {
  test("example-a-owner.ts structure", () => {
    assertStructure(EXAMPLE_A);
    const { text } = readExample(EXAMPLE_A);

    // DEFAULT-mode A: source-level proof of the bounded explicit-pin
    // structured-prompt discipline. NO provider call here.
    expect(text.includes('providerID: "opencode"'), "A: explicit provider pin").toBe(true);
    expect(text.includes('modelID: "deepseek-v4-flash-free"'), "A: explicit model pin").toBe(true);
    expect(text.includes("30000"), "A: 30 s bound constant").toBe(true);
    expect(text.includes("Promise.race") || text.includes("AbortSignal"), "A: bounded prompt mechanism").toBe(true);
  });

  test("example-b-client.ts structure", () => {
    assertStructure(EXAMPLE_B);
  });

  test("example-c-events.ts structure", () => {
    assertStructure(EXAMPLE_C);
  });
});

// ---------------------------------------------------------------------------
// B subprocess smoke test (auth-free, deterministic, ~10 s)
// ---------------------------------------------------------------------------

describe("example-b-client smoke (auth-free)", () => {
  test(
    "session CRUD + forced 404 with throwOnError parse",
    { timeout: 100_000 },
    async () => {
      const { exitCode, stdout } = await runExample(EXAMPLE_B, 47832, 90_000, "B");
      expect(exitCode, "B: exit code").toBe(0);

      // Contract lines in output order (the plan's verification matrix line
      // set; `absent in list before:` only asserts existence - its value is
      // `true` on a fresh server and documented as a deviation).
      assertLinesInOrder(stdout, [
        /^server version: 1\.1\d\.\d+$/,
        "created id: ses_",
        "fetched id:",
        "present in list during: true",
        "delete ok: true",
        "message:",
        "status: 404",
        "v2 html guard: false",
        "close completed: true",
      ]);
      expect(/^absent in list before: (true|false)$/m.test(stdout), "B: absent-before line exists").toBe(true);

      // CRUD id equality: fetched must equal created.
      const created = lineValue(stdout, "created id:");
      const fetched = lineValue(stdout, "fetched id:");
      expect(created !== undefined && created.startsWith("ses_"), "B: created id parseable").toBe(true);
      expect(created, "B: fetched id equals created id").toBe(fetched);

      // Forced-404 error contract: message non-empty, status 404.
      const message = lineValue(stdout, "message:");
      expect(message !== undefined && message.length > 0, "B: 404 message non-empty").toBe(true);
    },
  );
});

// ---------------------------------------------------------------------------
// C subprocess smoke test (auth-free, ~35 s by design: the suite intentionally
// waits out the 30 s AbortController bound - that bounded exit IS the smallest
// validation the dossier defines for the SSE recipe: n >= 0 and a bounded end).
// ---------------------------------------------------------------------------

describe("example-c-events smoke (auth-free, bounded)", () => {
  test(
    "SSE subscription aborts within the 30 s bound and exits cleanly",
    { timeout: 60_000 },
    async () => {
      const { exitCode, stdout } = await runExample(EXAMPLE_C, 47833, 40_000, "C");
      expect(exitCode, "C: exit code").toBe(0);

      assertLinesInOrder(stdout, [
        "abort requested: true",
        /^frames observed: \d+$/,
        "close completed: true",
      ]);

      const m = stdout.match(/^frames observed: (\d+)$/m);
      exist(m, "C: frames observed line");
      expect(Number(m![1]) >= 0, "C: frames >= 0").toBe(true);
    },
  );
});

// ---------------------------------------------------------------------------
// A provider-GATED full run (skipped unless RUN_PROVIDER_TESTS=1)
// ---------------------------------------------------------------------------

const providerGateEnabled = Bun.env.RUN_PROVIDER_TESTS === "1";
if (!providerGateEnabled) {
  console.log("skipped: set RUN_PROVIDER_TESTS=1 to run the single bounded provider call (A gate)");
}

describe("example-a-owner provider-gated run", () => {
  test.skipIf(!providerGateEnabled)(
    "bounded explicit-pin structured prompt: one attempt, 30 s bound, real provider verdict",
    { timeout: 110_000 },
    async () => {
      const { exitCode, stdout, stderr } = await runExample(EXAMPLE_A, 47831, 90_000, "A-gate");

      // Boundedness + cleanup first: the run must terminate inside the gate and
      // leave the port free (runExample already enforces the port checks).
      if (exitCode !== 0) {
        // Surface the failing run's output so the evidence file and the next
        // reviewer see the exact verdict without a provider re-run.
        console.log("--- A-gate stdout ---");
        console.log(stdout);
        if (stderr.trim().length > 0) {
          console.log("--- A-gate stderr ---");
          console.log(stderr);
        }
      }
      expect(exitCode, "A-gate: exit code").toBe(0); // a bounded-timeout exit 1 is a FAIL under the gate

      assertLinesInOrder(stdout, [
        "server url:",
        "healthy: true",
        /^version: 1\.1\d\.\d+$/,
        "created id: ses_",
        "model pin: opencode / deepseek-v4-flash-free", // shipped file pins the primary model
      ]);

      // Provider verdict: either a real answer (not a `<no-` placeholder) or the
      // structured-output failure flag. Both are acceptable PASS outcomes.
      const answerM = stdout.match(/^answer: (.+)$/m);
      const realAnswer = answerM !== null && !answerM[1].trim().startsWith("<no-");
      const structuredFailure = /^structured-output failure: true$/m.test(stdout);
      expect(realAnswer || structuredFailure, "A-gate: answer or structured-output failure line").toBe(true);

      expect(/^close completed: true$/m.test(stdout), "A-gate: clean close").toBe(true);
    },
  );
});

// Small helper to silence unused-variable warnings for assertions that need a
// value but not a live reference.
function exist<T>(value: T | null | undefined, label: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`${label}: expected value to exist`);
  }
}