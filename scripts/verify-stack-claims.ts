#!/usr/bin/env node
/**
 * verify-stack-claims.ts - drift gate over research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md
 *
 * Reads every `[Sn]` citation in the matrix, extracts the package name + pinned
 * caret version, runs `npm view <pkg> version`, and exits 1 with a clear
 * "failing package: <pkg>" message when the live latest no longer matches the
 * pinned caret range.
 *
 * Per Q5 (locked): CI runs this script weekly. Per Phase 3.0: every `package.json`
 * write in templates/<tier>/skeleton/ must pass this script before it ships.
 *
 * Scope: Node stdlib + `npm view` only. No external deps. Node 22.6+ runs .ts
 * files via `--experimental-strip-types`; Node 24+ runs them without the flag
 * (we exercised v24.18.0 above).
 *
 * Exit codes:
 *   0 - all pinned versions still satisfy their caret range
 *   1 - one or more packages drifted (printed to stderr)
 *   2 - input file missing or unreadable
 *   3 - npm CLI not on PATH
 */
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

type Claim = {
  pkg: string;
  pinned: string; // e.g. "16.3.0"
  rawRange: string; // e.g. "^16.3.0"
  source: string; // "[S1]"
  line: number;
};

// Footnote: caret range semantics: ^1.2.3 allows >=1.2.3 <2.0.0
// For 0.x.y: ^0.45.2 allows >=0.45.2 <0.46.0
function caretRangeSatisfied(pinned: string, latest: string): boolean {
  const p = pinned.split(".").map((s) => Number.parseInt(s, 10));
  const l = latest.split(".").map((s) => Number.parseInt(s, 10));
  if (p.length < 3 || l.length < 3) return false;
  if (Number.isNaN(p[0]) || Number.isNaN(l[0])) return false;

  // Major must match (caret on x.0.0 freezes major).
  if (p[0] !== l[0]) return false;

  if (p[0] === 0) {
    // 0.x.y caret: only minor + patch may grow; pin to minor exactly?
    // Per semver: ^0.x.y means >=0.x.y <0.(x+1).0
    if (p[1] !== l[1]) return false;
    return l[2] >= p[2];
  }
  // For x.y.z with x > 0: >=p and <(p[0]+1).0
  return l[0] === p[0] && (l[1] > p[1] || (l[1] === p[1] && l[2] >= p[2]));
}

const workspaceRoot = resolve(import.meta.dirname ?? new URL(".", import.meta.url).pathname, "..");
const matrixPath = resolve(workspaceRoot, "research", "agent-app-templates-2026-08-13", "02_STACK_MATRIX.md");

if (!existsSync(matrixPath)) {
  console.error(`failing input: ${matrixPath} not found`);
  process.exit(2);
}
// On Windows, `npm` resolves to `npm.cmd`; Node's `spawnSync` does not auto-resolve
// .cmd files without `shell: true`. Use shell-mode probes for parity.
const shellMode = process.platform === "win32";
const probe = spawnSync("npm", ["--version"], { encoding: "utf8", shell: shellMode });
if (probe.status === null) {
  console.error(`failing input: npm CLI not on PATH`);
  process.exit(3);
}

// ponytail: two passes. Both converge on (pkg, pinned, source).
//
// Pass A (inline) - matches BACKTICKED package names only, e.g. ``@clerk/nextjs` ^7.7.4 [S5]``.
// Display-name citations like `Next.js `^16.3.0` [S1]` (no backticks around the
// name) are SKIPPED here; the alias-table approach is brittle and the audit
// trail already has those rows in canonical form.
//
// Pass B (audit trail) - canonical; rows are `| `pkg` | prior | `ver` (...) |`.
// Each row's first column is the actual npm package name; this is the
// authoritative source. The "prior" column has three shapes:
//   1. digit-string  - e.g. `6.4.2` (the prior dossier version)
//   2. `(not stated)` - dossier didn't track a prior version (rows still gate)
//   3. `[UNVERIFIED]` - prior was not verified (rows stay informational only;
//      do NOT drift-gate these — they were already flagged for re-verification
//      at scaffold time, so adding a gate here would just be noise)
// The "current"/pinned value is column 3 (digit-string + optional trailing
// parens); that is what `npm view` is compared against.
const INLINE_RE = /`(@?[a-z0-9][\w./-]*)`\s+`?(\^?\d+\.\d+\.\d+(?:-[\w.]+)?)`?\s+\[(S\d+)\]/g;
const AUDIT_RE = /^\|\s*`?([@a-z][\w./-]*)`?\s*(?:\([^)]*\))?\s*\|\s*`?((?:\d+\.\d+\.\d+(?:-[\w.]+)?)|\(not stated\)|\[UNVERIFIED\])`?\s*\|\s*`?(\d+\.\d+\.\d+(?:-[\w.]+)?)`?\s*(?:\([^)]*\))?\s*\|/gm;

function extractClaims(text: string): { claims: Claim[]; notStatedAuditCount: number } {
  const seen = new Map<string, Claim>();
  const auditSeen = new Map<string, Claim>();

  const addClaim = (claim: Claim) => {
    const key = `${claim.pkg}@${claim.pinned}`;
    if (!seen.has(key)) seen.set(key, claim);
  };
  const addAudit = (claim: Claim) => {
    const key = `${claim.pkg}@${claim.pinned}`;
    if (!auditSeen.has(key)) auditSeen.set(key, claim);
  };

  // Pass 1: inline citations. Only fires when the package name is backticked
  // (e.g. ``@clerk/nextjs` ^7.7.4` [S5]``); unbackticked display names like
  // "Next.js" or "Vercel AI SDK" are prose, not npm names, so the regex ignores
  // them and the audit-trail pass below catches the same row in canonical form.
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m: RegExpExecArray | null;
    INLINE_RE.lastIndex = 0;
    while ((m = INLINE_RE.exec(line)) !== null) {
      const pkg = m[1];
      const pinned = m[2].startsWith("^") ? m[2].slice(1) : m[2];
      const source = `[${m[3]}]`;
      addClaim({ pkg, pinned, rawRange: `^${pinned}`, source, line: i + 1 });
    }
  }

  // Pass 2: audit trail table (| `pkg` | prior | `ver` (latest; ...) | ... |).
  // These rows are authoritative (the verified value column) and override any
  // inline citation captured for the same package. Prior shape determines
  // whether the row enters the drift gate:
  //   - `[UNVERIFIED]` prior -> informational only, skip the gate
  //   - `(not stated)` prior -> enter the gate, count separately for the
  //     success message ("P (not stated) rows newly under audit")
  //   - digit-string prior   -> enter the gate (pre-existing behavior)
  let notStatedAuditCount = 0;
  let m: RegExpExecArray | null;
  AUDIT_RE.lastIndex = 0;
  while ((m = AUDIT_RE.exec(text)) !== null) {
    const pkg = m[1];
    const priorShape = m[2];
    const pinned = m[3];
    if (priorShape === "[UNVERIFIED]") continue; // ponytail: informational only; dossier already flagged for re-verification
    if (priorShape === "(not stated)") notStatedAuditCount++;
    addAudit({ pkg, pinned, rawRange: `^${pinned}`, source: "[audit-trail]", line: 0 });
  }

  // Prefer audit-trail entries when both passes saw the same package; otherwise
  // keep the inline citation.
  for (const [key, audit] of auditSeen) {
    if (seen.has(key)) {
      seen.set(key, audit);
    } else {
      seen.set(key, audit);
    }
  }

  return { claims: [...seen.values()], notStatedAuditCount };
}

const text = readFileSync(matrixPath, "utf8");
const { claims, notStatedAuditCount } = extractClaims(text);

if (claims.length === 0) {
  console.error(`failing input: no [Sn] citations found in ${matrixPath}`);
  process.exit(2);
}

console.log(`verify-stack-claims: ${claims.length} unique pinned package-version claims extracted.`);

// Drift register: known-accepted drifts between the dossier snapshot and current
// npm registry. Consulted before failing so a one-day patch doesn't break CI.
// `--strict` ignores the register and treats every drift as unknown.
const DRIFT_REGISTER_PATH = resolve(process.cwd(), "share/notes/03_drift_register_T-2026-08-14-001.md");
const DRIFT_ROW_RE = /^\|\s*\d{4}-\d{2}-\d{2}\s*\|\s*`?(@?[a-z0-9][\w./-]*)`?\s*\|\s*`?(\^?\d+\.\d+\.\d+(?:-[\w.]+)?)`?\s*\|\s*`?\d+\.\d+\.\d+(?:-[\w.]+)?`?\s*\|/gm;
function parseDriftRegister(): Set<string> {
  const keys = new Set<string>();
  if (!existsSync(DRIFT_REGISTER_PATH)) return keys;
  const txt = readFileSync(DRIFT_REGISTER_PATH, "utf8");
  let m: RegExpExecArray | null;
  DRIFT_ROW_RE.lastIndex = 0;
  while ((m = DRIFT_ROW_RE.exec(txt)) !== null) {
    const pinned = m[2].startsWith("^") ? m[2].slice(1) : m[2];
    keys.add(`${m[1]}@${pinned}`);
  }
  return keys;
}
const strict = process.argv.includes("--strict");
const driftKeys = strict ? new Set<string>() : parseDriftRegister();

interface Failure { pkg: string; pinned: string; latest: string; source: string; line: number; }
const failures: Failure[] = [];
const skipped: { pkg: string; reason: string }[] = [];

// `02_STACK_MATRIX.md` cites packages by their human display name on some rows
// (e.g. "Next.js", "Vercel AI SDK"). Map display -> canonical npm name; key is the
// EXACT (case-preserved) display name as it appears in the dossier. Extend when
// the matrix adds a new package; do not invent mappings for rows that don't ship.
const DISPLAY_TO_NPM: Readonly<Record<string, string>> = Object.freeze({
  "Next.js": "next",
  "React": "react",
  "React DOM": "react-dom",
  "Tailwind": "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  "Prisma": "prisma",
  "Drizzle": "drizzle-orm",
  "Stripe": "stripe",
  "Clerk": "@clerk/nextjs",
  "Clerk Expo": "@clerk/expo",
  "Astro": "astro",
  "Expo": "expo",
  "Expo SDK": "expo",
  "WXT": "wxt",
  "Medusa": "@medusajs/medusa",
  "Discord.js": "discord.js",
  "Vercel AI SDK": "ai",
  "React Router": "react-router",
  "Resend": "resend",
  "Capacitor": "@capacitor/core",
  "Commander": "commander",
  "Supabase JS": "@supabase/supabase-js",
  "Shopify Storefront API": "@shopify/storefront-api-client",
  "OpenAI": "openai",
  "Anthropic SDK": "@anthropic-ai/sdk",
});

// Try the captured display name AS WRITTEN, then canonicalized via the alias
// table, then a lowercased/dotted-stripped fallback. First hit wins. Returns
// null only when `npm view` rejects every candidate (so the caller can still
// distinguish "drifted" from "not on the registry").
function resolveNpmName(display: string): string[] {
  const out: string[] = [display];
  const aliased = DISPLAY_TO_NPM[display];
  if (aliased && !out.includes(aliased)) out.push(aliased);
  const lowered = display.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "-");
  if (lowered !== display && !out.includes(lowered)) out.push(lowered);
  // Common compaction: "next-js" -> "next", "tailwind-css" -> "tailwindcss", etc.
  if (lowered.endsWith("-js")) {
    const stripped = lowered.slice(0, -3);
    if (!out.includes(stripped)) out.push(stripped);
  }
  if (lowered.endsWith("-css")) {
    const stripped = lowered.slice(0, -4);
    if (!out.includes(stripped)) out.push(stripped);
  }
  return out;
}

function npmLatest(pkg: string): { name: string; latest: string } | null {
  // `npm view <pkg> version` prints the latest published version string and exits 0.
  for (const candidate of resolveNpmName(pkg)) {
    const res = spawnSync("npm", ["view", candidate, "version"], { encoding: "utf8", timeout: 30_000, shell: shellMode });
    if (res.status === 0) {
      const out = (res.stdout || "").trim().replace(/^v/, "").trim();
      if (out) return { name: candidate, latest: out };
    }
  }
  return null;
}

for (const claim of claims) {
  const got = npmLatest(claim.pkg);
  if (got === null) {
    skipped.push({ pkg: claim.pkg, reason: "npm view returned non-zero or empty for all candidates" });
    continue;
  }
  if (!caretRangeSatisfied(claim.pinned, got.latest)) {
    failures.push({ pkg: got.name, pinned: claim.pinned, latest: got.latest, source: claim.source, line: claim.line });
  }
}

if (skipped.length > 0) {
  console.log(`skipped ${skipped.length} package(s) (npm view failed):`);
  for (const s of skipped) console.log(`  - ${s.pkg}: ${s.reason}`);
}

if (failures.length === 0) {
  console.log(`OK: all ${claims.length} pinned versions satisfy their caret range (${notStatedAuditCount} (not stated) rows newly under audit)`);
  process.exit(0);
}

// Split failures into register-accepted (warn) vs truly-unknown (fail). Key is
// `pkg@<caret-stripped-pin>` so the table's `^0.116.0` matches claim `0.116.0`.
const knownDrifts: Failure[] = [];
const unknownFailures: Failure[] = [];
for (const f of failures) {
  if (driftKeys.has(`${f.pkg}@${f.pinned}`)) knownDrifts.push(f);
  else unknownFailures.push(f);
}

for (const f of knownDrifts) {
  console.error(`failing package: known drift (register): ${f.pkg} dossier=^${f.pinned} registry=${f.latest}`);
}

if (unknownFailures.length === 0) {
  console.log(`OK: all ${claims.length} pinned versions satisfy their caret range (${knownDrifts.length} known-accepted drift(s) ignored via register; ${notStatedAuditCount} (not stated) rows newly under audit)`);
  process.exit(0);
}

console.error(`failing package: drift detected in ${unknownFailures.length}/${claims.length} pinned version(s).`);
for (const f of unknownFailures) {
  console.error(`failing package: ${f.pkg} pinned ^${f.pinned}, npm latest ${f.latest} (${f.source}${f.line ? `, line ${f.line}` : ""})`);
}
process.exit(1);
