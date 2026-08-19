#!/usr/bin/env python3
"""Phase 3B validation script.

Validates the three new dossier files plus progress.md against the dispatch contract:
  - file existence
  - useful-line minimums (excluding blank-only lines)
  - required freshness footer
  - em-dash byte scan (UTF-8 safe, per windows-encoding-validation-trap memory)
  - citation range: only [S1]..[S22]
  - 17-namespace coverage in 04_api_map.md
  - v2-delta section present in 04_api_map.md
  - decision-rule counts in 03_decision_guide.md (>=5 use, >=4 do-not-use)
  - progress.md 14 rows, 6 done / 8 pending
  - auth-file path / credential leak scan (dossier must NEVER name a path)
"""
import os
import re
import sys

ROOT = r"E:\react_projects\research_space\opencode-sdk-agent-docs"

TARGETS = [
    ("02_quickstart.md", 150),
    ("03_decision_guide.md", 150),
    ("04_api_map.md", 250),
]


def useful_lines(path):
    with open(path, "rb") as f:
        data = f.read().decode("utf-8")
    return sum(1 for line in data.splitlines() if line.strip())


def has_em_dash_bytes(path):
    with open(path, "rb") as f:
        return b"\xe2\x80\x94" in f.read()


def has_freshness(path):
    with open(path, "r", encoding="utf-8") as f:
        s = f.read()
    return "sdk=1.18.18" in s and "access=2026-08-18" in s


ALLOWED_CITES = set(f"[S{i}]" for i in range(1, 23))
CITE_RE = re.compile(r"\[S(\d+)\]")


def extract_citations(path):
    with open(path, "r", encoding="utf-8") as f:
        s = f.read()
    return CITE_RE.findall(s)


# 17 namespaces per dispatch.
NAMESPACES = [
    "Global",
    "Instance",
    "Project",
    "Path",
    "Vcs",
    "Config",
    "Tools (Experimental)",
    "Ptys",
    "Auth",
    "Providers",
    "Files",
    "Sessions",
    "Commands",
    "MCP",
    "LSP",
    "Formatter",
    "TUI",
]

# Patterns the dossier must NOT name (research-derived).
LEAK_PATTERNS = [
    re.compile(r"~/.local/share/opencode/auth"),
    re.compile(r"auth\.json"),
    re.compile(r"Bearer sk-[A-Za-z0-9]"),
    re.compile(r"OPENCODE_API_KEY\s*=\s*[A-Za-z0-9]"),
]


def auth_leaks(path):
    with open(path, "r", encoding="utf-8") as f:
        s = f.read()
    hits = []
    for pat in LEAK_PATTERNS:
        if pat.search(s):
            hits.append(pat.pattern)
    return hits


def main():
    rc = 0
    results = {}
    for fn, min_lines in TARGETS:
        p = os.path.join(ROOT, fn)
        if not os.path.isfile(p):
            print(f"MISSING: {fn}")
            rc = 1
            continue
        ul = useful_lines(p)
        em = has_em_dash_bytes(p)
        fresh = has_freshness(p)
        cites = extract_citations(p)
        bad_cites = [c for c in cites if int(c) < 1 or int(c) > 22]
        leaks = auth_leaks(p)
        results[fn] = {
            "useful_lines": ul,
            "em_dash": em,
            "freshness": fresh,
            "citations": sorted(set(cites)),
            "bad_citations": bad_cites,
            "leaks": leaks,
            "min": min_lines,
            "pass_lines": ul >= min_lines,
        }
        if ul < min_lines:
            rc = 1
        if em:
            rc = 1
        if not fresh:
            rc = 1
        if bad_cites:
            rc = 1
        if leaks:
            rc = 1

    # Decision-guide rule counts.
    dpath = os.path.join(ROOT, "03_decision_guide.md")
    with open(dpath, "r", encoding="utf-8") as f:
        d = f.read()
    use_rules = re.findall(r"^###\s+Use\s", d, flags=re.MULTILINE)
    not_rules = re.findall(
        r"^###\s+Do not ", d, flags=re.MULTILINE
    )
    if len(use_rules) < 5:
        rc = 1
    if len(not_rules) < 4:
        rc = 1

    # 17-namespace coverage in 04.
    apath = os.path.join(ROOT, "04_api_map.md")
    with open(apath, "r", encoding="utf-8") as f:
        a = f.read()
    missing = []
    for ns in NAMESPACES:
        if not re.search(re.escape(ns), a, flags=re.IGNORECASE):
            missing.append(ns)
            rc = 1
    has_v2_delta = bool(
        re.search(r"^##\s+v2 delta\b", a, flags=re.MULTILINE | re.IGNORECASE)
    )
    if not has_v2_delta:
        rc = 1

    # progress.md checks.
    prog = os.path.join(ROOT, "progress.md")
    with open(prog, "r", encoding="utf-8") as f:
        pg = f.read()
    row_re = re.compile(r"^\|\s*(\d+)\s*\|", flags=re.MULTILINE)
    rows = row_re.findall(pg)
    row_numbers = sorted(set(int(r) for r in rows))
    if len(rows) != 14 or row_numbers != list(range(1, 15)):
        rc = 1
    done_count = pg.count("| done |")
    pending_count = pg.count("| pending |") + pg.count("| todo |")
    if done_count != 6 or pending_count != 8:
        rc = 1

    # Print report.
    print("=" * 72)
    print("PHASE 3B VALIDATION REPORT")
    print("=" * 72)
    for fn, v in results.items():
        flag = "PASS" if (v["pass_lines"] and not v["em_dash"] and v["freshness"] and not v["bad_citations"] and not v["leaks"]) else "FAIL"
        print(f"\n[{flag}] {fn}")
        print(f"  useful_lines   : {v['useful_lines']} (min {v['min']})")
        print(f"  em_dash_bytes  : {v['em_dash']}")
        print(f"  freshness      : {v['freshness']}")
        print(f"  citations      : {v['citations']}")
        print(f"  out_of_range   : {v['bad_citations']}")
        print(f"  auth_leaks     : {v['leaks']}")

    print(f"\n03_decision_guide.md use-rule headings: {len(use_rules)} (min 5)")
    print(f"03_decision_guide.md do-not-use rule headings: {len(not_rules)} (min 4)")
    if missing:
        print(f"\n04_api_map.md MISSING namespaces: {missing}")
    else:
        print(f"\n04_api_map.md 17-namespace coverage: PASS")
    print(f"04_api_map.md v2-delta section present: {has_v2_delta}")
    print(f"\nprogress.md rows: {len(rows)}, numbers: {row_numbers}")
    print(f"progress.md done rows: {done_count} (expected 6)")
    print(f"progress.md pending/todo rows: {pending_count} (expected 8)")

    print()
    print("VALIDATION:", "PASS" if rc == 0 else "FAIL")
    return rc


if __name__ == "__main__":
    sys.exit(main())
