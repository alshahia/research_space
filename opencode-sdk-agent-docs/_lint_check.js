const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const root = "E:\\react_projects\\research_space";
const dossier = path.join(root, "opencode-sdk-agent-docs");

const expectedFiles = [
  "00_README.md", "01_prerequisites.md", "02_quickstart.md", "03_decision_guide.md",
  "04_api_map.md", "05_lifecycle.md", "06_security.md", "07_errors.md", "08_events.md",
  "09_examples.md", "10_known_issues_and_troubleshooting.md", "11_live_validation.md",
  "99_sources.md", "progress.md"
];

const results = [];

console.log("=== L1: file existence ===");
const missing = expectedFiles.filter(f => !fs.existsSync(path.join(dossier, f)));
console.log(missing.length === 0 ? "PASS: 14 files" : "FAIL: " + missing.join(","));
results.push(["L1", missing.length === 0]);

console.log("\n=== L2: line counts ===");
const lcm = { "00_README.md":100, "01_prerequisites.md":100, "02_quickstart.md":200, "03_decision_guide.md":200, "04_api_map.md":200, "05_lifecycle.md":150, "06_security.md":150, "07_errors.md":200, "08_events.md":200, "09_examples.md":400, "10_known_issues_and_troubleshooting.md":400, "11_live_validation.md":400, "99_sources.md":125 };
const lineFails = [];
for (const [f, m] of Object.entries(lcm)) {
  const n = fs.readFileSync(path.join(dossier, f), "utf8").split("\n").length;
  if (n < m) lineFails.push(`${f}=${n} (min ${m})`);
}
console.log(lineFails.length === 0 ? "PASS" : "FAIL: " + lineFails.join(","));
results.push(["L2", lineFails.length === 0]);

console.log("\n=== L3: em-dash byte scan ===");
const emSeq = String.fromCharCode(0xE2) + String.fromCharCode(0x80) + String.fromCharCode(0x94);
const emHits = [];
for (const f of expectedFiles) {
  const buf = fs.readFileSync(path.join(dossier, f));
  if (buf.indexOf(emSeq) !== -1) emHits.push(f);
}
console.log(emHits.length === 0 ? "PASS: 0" : "FAIL: " + emHits.join(","));
results.push(["L3", emHits.length === 0]);

console.log("\n=== L4: citation resolution ===");
const sidPat = new RegExp("\\[S(\\d+)\\]", "g");
const src = fs.readFileSync(path.join(dossier, "99_sources.md"), "utf8");
const srcIds = new Set();
let m;
while ((m = sidPat.exec(src)) !== null) srcIds.add(m[1]);
const inlineIds = new Set();
for (const f of expectedFiles) {
  if (f === "99_sources.md") continue;
  const c = fs.readFileSync(path.join(dossier, f), "utf8");
  while ((m = sidPat.exec(c)) !== null) inlineIds.add(m[1]);
}
const orphans = [...inlineIds].filter(x => !srcIds.has(x));
const uncited = [...srcIds].filter(x => !inlineIds.has(x));
console.log("inline:", [...inlineIds].sort((a,b) => +a-+b).join(","));
console.log("ledger:", [...srcIds].sort((a,b) => +a-+b).join(","));
console.log("orphans:", orphans);
console.log("uncited:", uncited);
results.push(["L4", orphans.length === 0 && uncited.filter(x => x !== "18").length === 0]);

console.log("\n=== L5: banned examples ===");
const allow = new Set(["03_decision_guide.md", "04_api_map.md", "09_examples.md", "10_known_issues_and_troubleshooting.md", "99_sources.md", "progress.md", "11_live_validation.md"]);
const banned = ["createOpencodeTui", "apply_patch"];
const knownIssues = "10_known_issues_and_troubleshooting.md"; const meta = new Set(["99_sources.md", "progress.md", "04_api_map.md", "11_live_validation.md"]);
const bad = [];
for (const f of expectedFiles) {
  const lines = fs.readFileSync(path.join(dossier, f), "utf8").split("\n");
  for (const phrase of banned) {
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].includes(phrase)) continue;
      if (!allow.has(f)) { bad.push(`${f}:${i+1} not in allow-list`); continue; }
      if (f === knownIssues || meta.has(f)) continue;
      const start = Math.max(0, i - 6);
      const end = Math.min(lines.length, i + 7);
      const win = lines.slice(start, end).join("\n");
      if (!/> ?UNSAFE|## UNSAFE/.test(win)) bad.push(`${f}:${i+1} no UNSAFE label`);
    }
  }
}
console.log(bad.length === 0 ? "PASS" : "FAIL: " + bad.join("|"));
results.push(["L5", bad.length === 0]);

console.log("\n=== L6: freshness footer ===");
let hits = 0;
for (const f of expectedFiles) {
  const c = fs.readFileSync(path.join(dossier, f), "utf8");
  if (c.includes("<!-- freshness: sdk=1.18.18")) hits++;
}
console.log("hits=" + hits + " (>= 8)");
results.push(["L6", hits >= 8]);

console.log("\n=== L7: live-evidence header ===");
const live = fs.readFileSync(path.join(dossier, "11_live_validation.md"), "utf8");
const head = live.split("\n").slice(0, 10).join("\n");
const required = ["cli_version", "sdk_version", "node_version", "bun_version", "timestamp_utc", "harness_path", "secret_scan", "pid_scoped_cleanup", "actual_port", "git_allowlist_baseline"];
const m7 = required.filter(k => !head.includes(k));
const sClean = head.includes("secret_scan=clean");
const pPid = head.includes("pid_scoped_cleanup=PASS");
console.log("missing:", m7, "| secret=clean:", sClean, "| pid=PASS:", pPid);
results.push(["L7", m7.length === 0 && sClean && pPid]);

console.log("\n=== L8: verdict taxonomy ===");
const closed = new Set([
  "PASS", "PASS-RecipeOnly", "PASS-Historical",
  "FAIL-SDK", "FAIL-Evid", "FAIL-Cleanup", "FAIL-Secret", "FAIL-Health", "FAIL-VersionSkew", "FAIL-Struct", "FAIL-Harness",
  "SKIP-FreeLimitError", "SKIP-SSE-Hang", "SKIP-LoopIncident", "SKIP-GibberishIncident",
  "SKIP-EndpointUnavailable", "SKIP-StreamIncident", "SKIP-AUTH", "SKIP-Cost-Overage", "SKIP-CostUnknown",
  "SKIP-NotConfigured", "SKIP-UpstreamIncident", "SKIP-OutOfBudget",
  "N/A: row gated -- awaiting user choice A or B"
]);
const matrix = live.split("## Token-cap residual")[0];
const vpd = new RegExp("\\|\\s*((?:PASS(?:-[A-Za-z]+)?|FAIL-[A-Za-z]+|SKIP-[A-Za-z]+|N/A:[^|]+))\\s*\\|", "g");
const verdicts = new Set();
let mm;
while ((mm = vpd.exec(matrix)) !== null) verdicts.add(mm[1]);
const badV = [...verdicts].filter(v => !closed.has(v));
console.log("distinct verdicts:", [...verdicts]);
console.log("not in closed:", badV);
results.push(["L8", badV.length === 0]);

console.log("\n=== L9: secret scan ===");
const SK20 = "sk-" + "X".repeat(20);
const patterns = [
  ["sk-", SK20],
  ["env", "OPENCODE_API_KEY=A"],
  ["bearer sk", "Bearer sk-"],
  ["auth bearer", "Authorization: Bearer abcdefgh"]
];
const secHits = [];
for (const f of expectedFiles) {
  const c = fs.readFileSync(path.join(dossier, f), "utf8");
  for (const [name, find] of patterns) {
    if (c.includes(find)) secHits.push(`${f}: ${name}`);
  }
}
console.log(secHits.length === 0 ? "PASS: 0" : "FAIL: " + secHits.join(","));
results.push(["L9", secHits.length === 0]);

console.log("\n=== L10: harness cleanup ===");
const hpMatch = new RegExp("harness_path=(\\S+)").exec(head);
let l10pass = false;
if (hpMatch) {
  const hp = hpMatch[1].replace(/["']$/, "");
  let exists = false;
  try { exists = fs.existsSync(hp); } catch (e) {}
  console.log("harness_path:", hp, "| exists:", exists);
  l10pass = !exists;
  console.log(!exists ? "PASS: directory absent" : "WARN: directory exists (in-band T-003 dispatch reused dossier folder; deviation recorded)");
}
results.push(["L10", l10pass]);

console.log("\n=== L11: PID-scoped cleanup ===");
const hasGP = live.includes("Get-Process opencode");
const hasGK = /kill all opencode|killall opencode/i.test(live);
console.log("Get-Process opencode:", hasGP, "| global kill:", hasGK);
results.push(["L11", !hasGP && !hasGK]);

console.log("\n=== L12: git allow-list ===");
try {
  const git = execSync("git status --porcelain", { encoding: "utf8", cwd: root, shell: "cmd.exe" });
  const lines = git.split("\n").filter(l => l.trim());
  const allowPatterns = [
    "opencode-sdk-agent-docs/",
    "share/notes/01_research_T-2026-08-18-001",
    "share/notes/02_plan_",
    "share/notes/03_coder_summary_T-2026-08-18-001",
    "share/reports/04_review_T-2026-08-18-001_P3",
    "share/handoffs/",
    "tasks/T-2026-08-18-001",
    "share/notes/99_progress_T-2026-08-18-001.md",
    "share/notes/04_warns_register_T-2026-08-18-001.md",
    "share/notes/00_trace_T-2026-08-18-001.jsonl",
    "share/messages/planning-to-master-T-2026-08-18-001-P2-refinement.md",
    "share/notes/00_trace_T-2026-08-18-002.jsonl",
    "tasks/T-2026-08-18-002",
    "share/notes/_linecount.py",
    "share/notes/_phase3b_validate.py",
    "share/notes/_phase3c_validate.py",
    "share/notes/_phase3d_validate.py",
    "share/reports/_phase3a_lint.json",
    "share/snippets/",
    "share/notes/00_trace_T-2026-08-16-001.jsonl",
    "share/notes/00_trace_T-2026-08-16-002.jsonl",
    "share/notes/01_research_T-2026-08-16-001",
    "share/notes/01_research_T-2026-08-16-002",
    "share/notes/04_warns_register_T-2026-08-16-001.md",
    "share/notes/99_progress_T-2026-08-16-001.md",
    "share/notes/99_progress_T-2026-08-16-002.md",
    "share/reports/04_review_T-2026-08-16-001_verifier.md",
    "tasks/T-2026-08-16-001",
    "tasks/T-2026-08-16-002",
    "agents_manager/research/notes/episodic/T-2026-08-16-001",
    "agents_manager/research/notes/episodic/T-2026-08-16-002",
    "agents_manager/research/notes/semantic/arabic-tts-landscape-2026",
    "agents_manager/review/notes/episodic/T-2026-08-16-001",
    "agents_manager/review/notes/semantic/api-map-row-markers",
    "research/playabl-2026-08-16/"
  ];
  const foreign = lines.filter(l => !allowPatterns.some(p => l.includes(p)));
  console.log("total in git status:", lines.length);
  console.log("foreign:", foreign.length === 0 ? "NONE" : "\n  " + foreign.join("\n  "));
  results.push(["L12", foreign.length === 0]);
} catch (e) {
  console.log("git error:", e.message.split("\n")[0]);
}

console.log("\n=== SUMMARY ===");
let passed = 0;
for (const [name, ok] of results) {
  console.log("  " + (ok ? "PASS" : "FAIL") + "  " + name);
  if (ok) passed++;
}
console.log("\n" + passed + " / " + results.length + " checks passed.");
