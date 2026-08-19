#!/usr/bin/env python3
"""One-shot Phase 3C documentation validator (Python stdlib only)."""

from pathlib import Path
import re
import sys

REPO = Path(__file__).resolve().parents[2]
DOCS = REPO / "opencode-sdk-agent-docs"
FRESHNESS = "sdk=1.18.18 cli=1.18.x access=2026-08-18"
FRESHNESS_COMMENT = f"<!-- freshness: {FRESHNESS} -->"
TARGETS = {
    "05_lifecycle.md": 120,
    "06_security.md": 100,
    "07_errors.md": 150,
    "08_events.md": 200,
}
REQUIRED_CITATIONS = {
    "05_lifecycle.md": {1, 7, 8, 11, 14},
    "06_security.md": {2},
    "07_errors.md": {1, 7, 10, 13},
    "08_events.md": {1, 2, 15, 16},
}
PLANNED_FORWARD_FILES = {
    "10_known_issues_and_troubleshooting.md",
    "11_live_validation.md",
    "99_sources.md",
}
CITATION_RE = re.compile(r"\[S(\d+)\]")
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
ENV_RE = re.compile(r"\bOPENCODE_[A-Z0-9_]+\b")


def joined(*parts: str) -> str:
    return "".join(parts)


# Split forbidden values so this validator does not repeat them as raw literals.
FORBIDDEN_AUTH_TEXT = [
    joined("~/.local/share/", "opencode/", "auth"),
    joined("auth", ".json"),
    joined("/etc/", "opencode"),
    joined("%", "LOCALAPPDATA", "%\\", "opencode"),
    joined("%", "LOCALAPPDATA", "%/", "opencode"),
    joined("share/", "opencode/", "auth"),
]
FORBIDDEN_SKEW_TEXT = [
    joined("shape-", "compatible"),
    joined("compatible-", "0.15-minor"),
]
SECRET_PATTERNS = [
    re.compile(r"sk-[A-Za-z0-9]{20,}"),
    re.compile(r"Bearer\s+sk-[A-Za-z0-9]", re.IGNORECASE),
    re.compile(r"Authorization:\s*Bearer\s+[A-Za-z0-9]{8,}", re.IGNORECASE),
    re.compile(r"OPENCODE_SERVER_PASSWORD\s*=\s*[\"']?[A-Za-z0-9]{8,}"),
]

V1_EVENTS = [
    "EventServerInstanceDisposed",
    "EventInstallationUpdated",
    "EventInstallationUpdateAvailable",
    "EventLspClientDiagnostics",
    "EventLspUpdated",
    "EventMessageUpdated",
    "EventMessageRemoved",
]
V2_EVENTS = [
    "EventMessagePartDelta",
    "EventMessagePartUpdated",
    "EventMessagePartRemoved",
    "EventSessionNextText",
    "EventSessionNextReasoning",
    "EventSessionNextTool",
    "EventSessionNextShell",
    "EventSessionNextCompaction",
    "EventSessionNextRevert",
    "EventSessionNextStepFinish",
    "EventPermissionV2Asked",
    "EventPermissionV2Replied",
    "EventQuestionV2Asked",
    "EventQuestionV2Replied",
    "EventQuestionV2Rejected",
    "EventWorkspaceReady",
    "EventWorkspaceFailed",
    "EventWorkspaceStatus",
    "EventWorktreeReady",
    "EventWorktreeFailed",
    "EventMcpToolsChanged",
    "EventSessionCompacted",
    "EventTuiPromptAppend2",
    "EventTuiPromptSubmit2",
    "EventTuiPromptClear2",
    "EventTuiCommandExecute2",
    "EventTuiToastShow2",
]
SSE_OPTIONS = [
    "onSseError",
    "onSseEvent",
    "sseDefaultRetryDelay",
    "sseMaxRetryAttempts",
    "sseMaxRetryDelay",
]
HTML_GUARD = (
    "Request is not supported by this version of OpenCode Server "
    "(Server responded with text/html)"
)
BODY_MARKER = "Body shape unverified -- revalidate against types.gen.ts"

REQUIRED_TEXT = {
    "05_lifecycle.md": [
        "127.0.0.1",
        "4096",
        "port: 0",
        "5000",
        "30000",
        "AbortSignal",
        "bindAbort",
        "OPENCODE_CONFIG_CONTENT",
        "taskkill /pid <pid> /T /F",
        "x-opencode-directory",
        "directory",
        "server.close()",
        BODY_MARKER,
    ],
    "06_security.md": [
        "OPENCODE_SERVER_PASSWORD",
        "OPENCODE_SERVER_USERNAME",
        "default user `opencode`",
        "--cors",
        "127.0.0.1",
        "non-loopback",
    ],
    "07_errors.md": [
        'responseStyle: "fields"',
        "throwOnError: false",
        "throwOnError: true",
        ".cause",
        HTML_GUARD,
        "StructuredOutputError",
        "opencode server METHOD URL: (empty response body)",
        "network error (no response)",
        BODY_MARKER,
    ],
    "08_events.md": [
        "GET /global/event",
        "@hey-api/sse-fetch",
        "client.event.subscribe",
        "subscription.stream",
        BODY_MARKER,
        *SSE_OPTIONS,
        *V1_EVENTS,
        *V2_EVENTS,
    ],
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def useful_lines(text: str) -> int:
    return sum(1 for line in text.splitlines() if line.strip())


def line_number(text: str, needle: str) -> int | None:
    for number, line in enumerate(text.splitlines(), start=1):
        if needle in line:
            return number
    return None


def markdown_link_failures(path: Path, text: str) -> list[str]:
    failures = []
    for raw_target in LINK_RE.findall(text):
        target = raw_target.strip().split()[0]
        if target.startswith(("http://", "https://", "mailto:", "#")):
            continue
        target = target.split("#", 1)[0]
        if not target:
            continue
        resolved = (path.parent / target).resolve()
        if resolved.exists():
            continue
        if resolved.parent == DOCS.resolve() and resolved.name in PLANNED_FORWARD_FILES:
            continue
        failures.append(target)
    return sorted(set(failures))


def progress_rows(text: str) -> dict[int, tuple[str, str, str]]:
    rows = {}
    pattern = re.compile(
        r"^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|",
        re.MULTILINE,
    )
    for number, filename, phase, status in pattern.findall(text):
        rows[int(number)] = (filename, phase.strip(), status.strip())
    return rows


def main() -> int:
    failures: list[str] = []
    reports = {}

    for filename, minimum in TARGETS.items():
        path = DOCS / filename
        if not path.is_file():
            failures.append(f"missing file: {filename}")
            continue

        raw = path.read_bytes()
        text = raw.decode("utf-8")
        citations = sorted({int(value) for value in CITATION_RE.findall(text)})
        out_of_range = [value for value in citations if value < 1 or value > 22]
        missing_citations = sorted(REQUIRED_CITATIONS[filename] - set(citations))
        missing_text = [value for value in REQUIRED_TEXT[filename] if value not in text]
        forbidden_auth = [value for value in FORBIDDEN_AUTH_TEXT if value.lower() in text.lower()]
        forbidden_skew = [value for value in FORBIDDEN_SKEW_TEXT if value in text]
        secret_hits = [pattern.pattern for pattern in SECRET_PATTERNS if pattern.search(text)]
        link_failures = markdown_link_failures(path, text)
        count = useful_lines(text)
        top_comment = FRESHNESS_COMMENT in text.splitlines()[:5]
        last_nonblank = next((line.strip() for line in reversed(text.splitlines()) if line.strip()), "")
        footer = last_nonblank == FRESHNESS
        em_dash_hits = raw.count(b"\xe2\x80\x94")
        en_dash_hits = raw.count(b"\xe2\x80\x93")
        skew_pair_ok = (
            "same-minor-patch-delta-15" not in text
            or "does NOT claim compatibility from semver alone" in text
        )

        reports[filename] = {
            "useful_lines": count,
            "minimum": minimum,
            "citations": citations,
            "out_of_range": out_of_range,
            "missing_citations": missing_citations,
            "missing_text": missing_text,
            "forbidden_auth": forbidden_auth,
            "forbidden_skew": forbidden_skew,
            "secret_hits": secret_hits,
            "link_failures": link_failures,
            "top_comment": top_comment,
            "footer": footer,
            "em_dash_hits": em_dash_hits,
            "en_dash_hits": en_dash_hits,
            "skew_pair_ok": skew_pair_ok,
        }

        checks = [
            count >= minimum,
            not out_of_range,
            not missing_citations,
            not missing_text,
            not forbidden_auth,
            not forbidden_skew,
            not secret_hits,
            not link_failures,
            top_comment,
            footer,
            em_dash_hits == 0,
            en_dash_hits == 0,
            skew_pair_ok,
        ]
        if not all(checks):
            failures.append(f"contract failure: {filename}")

    security_path = DOCS / "06_security.md"
    if security_path.is_file():
        security_env = sorted(set(ENV_RE.findall(read_text(security_path))))
        expected_env = ["OPENCODE_SERVER_PASSWORD", "OPENCODE_SERVER_USERNAME"]
        if security_env != expected_env:
            failures.append(f"06_security.md env names: {security_env}")
    else:
        security_env = []

    progress_path = DOCS / "progress.md"
    if progress_path.is_file():
        progress_raw = progress_path.read_bytes()
        progress_text = progress_raw.decode("utf-8")
        rows = progress_rows(progress_text)
        row_numbers = sorted(rows)
        done_rows = sorted(number for number, value in rows.items() if value[2] == "done")
        pending_rows = sorted(number for number, value in rows.items() if value[2] in {"pending", "todo"})
        progress_em = progress_raw.count(b"\xe2\x80\x94")
        progress_en = progress_raw.count(b"\xe2\x80\x93")
        phase3c_done = all(rows.get(number, (None, None, None))[2] == "done" for number in range(7, 11))
        if row_numbers != list(range(1, 15)):
            failures.append(f"progress rows: {row_numbers}")
        if done_rows != list(range(1, 11)):
            failures.append(f"progress done rows: {done_rows}")
        if pending_rows != [11, 12, 13, 14]:
            failures.append(f"progress pending rows: {pending_rows}")
        if not phase3c_done:
            failures.append("progress Phase 3C rows are not all done")
        if FRESHNESS_COMMENT not in progress_text.splitlines()[:5] or FRESHNESS not in progress_text:
            failures.append("progress freshness missing")
        if progress_em or progress_en:
            failures.append("progress dash byte scan failed")
    else:
        rows = {}
        done_rows = []
        pending_rows = []
        progress_em = -1
        progress_en = -1
        phase3c_done = False
        failures.append("missing file: progress.md")

    print("=" * 72)
    print("PHASE 3C VALIDATION REPORT")
    print("=" * 72)
    for filename in TARGETS:
        report = reports.get(filename)
        if report is None:
            print(f"\n[FAIL] {filename}: missing")
            continue
        passed = not any(failure.endswith(filename) for failure in failures)
        print(f"\n[{'PASS' if passed else 'FAIL'}] {filename}")
        print(f"  useful_lines      : {report['useful_lines']} (min {report['minimum']})")
        print(f"  dash_bytes        : em={report['em_dash_hits']} en={report['en_dash_hits']}")
        print(f"  freshness         : top={report['top_comment']} footer={report['footer']}")
        print(f"  citations         : {report['citations']}")
        print(f"  out_of_range      : {report['out_of_range']}")
        print(f"  missing_required  : {report['missing_citations']}")
        print(f"  missing_text      : {report['missing_text']}")
        print(f"  forbidden_auth    : {report['forbidden_auth']}")
        print(f"  forbidden_skew    : {report['forbidden_skew']}")
        print(f"  secret_hits       : {report['secret_hits']}")
        print(f"  unresolved_links  : {report['link_failures']}")
        print(f"  skew_pair_ok      : {report['skew_pair_ok']}")

    print(f"\n06_security.md env names: {security_env}")
    print(f"progress.md rows: {sorted(rows)}")
    print(f"progress.md done rows: {done_rows}")
    print(f"progress.md pending rows: {pending_rows}")
    print(f"progress.md Phase 3C done: {phase3c_done}")
    print(f"progress.md dash bytes: em={progress_em} en={progress_en}")

    lifecycle = read_text(DOCS / "05_lifecycle.md") if (DOCS / "05_lifecycle.md").is_file() else ""
    errors = read_text(DOCS / "07_errors.md") if (DOCS / "07_errors.md").is_file() else ""
    events = read_text(DOCS / "08_events.md") if (DOCS / "08_events.md").is_file() else ""
    print("\nKEY LOCATIONS")
    print(f"  Windows taskkill snippet: 05_lifecycle.md:{line_number(lifecycle, 'taskkill /pid <pid> /T /F')}")
    print(f"  v2 HTML guard string: 07_errors.md:{line_number(errors, HTML_GUARD)}")
    for name in V1_EVENTS:
        print(f"  {name}: 08_events.md:{line_number(events, f'`{name}`')}")

    if failures:
        print("\nFAILURES")
        for failure in failures:
            print(f"  - {failure}")
    print(f"\nVALIDATION: {'PASS' if not failures else 'FAIL'}")
    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
