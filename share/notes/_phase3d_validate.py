#!/usr/bin/env python3
"""One-shot Phase 3D documentation validator (Python stdlib only)."""

from pathlib import Path
import re
import sys

REPO = Path(__file__).resolve().parents[2]
DOCS = REPO / "opencode-sdk-agent-docs"
NOTES = REPO / "share" / "notes"
TARGET = "09_examples.md"
FRESHNESS = "sdk=1.18.18 cli=1.18.x access=2026-08-18"
FRESHNESS_COMMENT = f"<!-- freshness: {FRESHNESS} -->"
MIN_USEFUL_LINES = 400

CITATION_RE = re.compile(r"\[S(\d+)\]")
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
EXAMPLE_HEADING_RE = re.compile(r"^(?:## Example \d+:|### Verified config example [AB]:)", re.MULTILINE)
UNSAFE_HEADING_RE = re.compile(r"^## Unsafe pattern \d+:", re.MULTILINE)
UNSAFE_BLOCKQUOTE_RE = re.compile(r"> UNSAFE --")
TYPESCRIPT_BLOCK_RE = re.compile(r"```typescript\n(.*?)\n```", re.DOTALL)
COMMENT_HEADER_RE = re.compile(
    r"/\* Purpose:.*?\n"
    r"/\* Expected behavior:.*?\n"
    r"/\* Smallest validation:.*?\n"
    r"/\* Freshness footer: sdk=1\.18\.18 cli=1\.18\.x access=2026-08-18 \*/",
    re.DOTALL,
)
NOT_VERIFIED_RE = re.compile(r"not-verified")


def joined(*parts: str) -> str:
    return "".join(parts)


def read_bytes(path: Path) -> bytes:
    return path.read_bytes()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def useful_lines(text: str) -> int:
    return sum(1 for line in text.splitlines() if line.strip())


def line_number(text: str, needle: str) -> int | None:
    for number, line in enumerate(text.splitlines(), start=1):
        if needle in line:
            return number
    return None


# Forbidden values (split so the validator does not repeat them as a raw literal).
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
    re.compile(r"OPENCODE_API_KEY\s*=\s*[\"']?[A-Za-z0-9]{8,}"),
]

PLANNED_FORWARD_FILES = {
    "10_known_issues_and_troubleshooting.md",
    "11_live_validation.md",
    "99_sources.md",
}

DASHBOARD_FILE = "progress.md"


def markdown_link_failures(path: Path, text: str) -> list[str]:
    failures = []
    for raw_target in LINK_RE.findall(text):
        target = raw_target.strip().split()[0]
        if target.startswith(("http://", "https://", "mailto:", "#")):
            continue
        target = target.split("#", 1)[0]
        if not target:
            continue
        # Normalize ../share/... to absolute from the file's parent directory.
        resolved = (path.parent / target).resolve()
        if resolved.exists():
            continue
        if resolved.parent == DOCS.resolve() and resolved.name in PLANNED_FORWARD_FILES:
            continue
        failures.append(target)
    return sorted(set(failures))


def find_section_blocks(text: str, heading_regex: re.Pattern) -> dict[str, str]:
    """Map each heading text to the body content that follows it (up to the next same-or-higher-level heading)."""
    blocks: dict[str, str] = {}
    lines = text.splitlines()
    headings: list[tuple[int, str]] = []
    for index, line in enumerate(lines):
        if heading_regex.match(line):
            headings.append((index, line))
    for i, (start, heading_line) in enumerate(headings):
        end = headings[i + 1][0] if i + 1 < len(headings) else len(lines)
        blocks[heading_line] = "\n".join(lines[start:end])
    return blocks


def check_section_contract(label: str, body: str) -> list[str]:
    """Validate that a recipe or callout body contains the contract items."""
    failures: list[str] = []
    if label.startswith("## Example ") or label.startswith("### Verified config example "):
        # Recipe contract: purpose, expected behavior, smallest validation, citations.
        if "> **Purpose**" not in body:
            failures.append(f"{label}: missing Purpose blockquote")
        if "> **Expected behavior**" not in body:
            failures.append(f"{label}: missing Expected behavior blockquote")
        if "> **Smallest validation**" not in body:
            failures.append(f"{label}: missing Smallest validation blockquote")
        if "> **Citations**" not in body:
            failures.append(f"{label}: missing Citations blockquote")
        # Code block with the 4-line comment header.
        ts_blocks = TYPESCRIPT_BLOCK_RE.findall(body)
        if not ts_blocks:
            failures.append(f"{label}: missing TypeScript code block")
        else:
            for j, block in enumerate(ts_blocks):
                if not COMMENT_HEADER_RE.search(block):
                    failures.append(f"{label}: TS block #{j + 1} missing 4-line comment header")
        # Safety label present.
        if "> **Safety label**" not in body:
            failures.append(f"{label}: missing Safety label blockquote")
    return failures


def main() -> int:
    failures: list[str] = []
    target_path = DOCS / TARGET

    if not target_path.is_file():
        print(f"missing file: {TARGET}")
        return 1

    raw = read_bytes(target_path)
    text = raw.decode("utf-8")

    # Byte scan -- zero em-dash and en-dash.
    em_dash_hits = raw.count(b"\xe2\x80\x94")
    en_dash_hits = raw.count(b"\xe2\x80\x93")

    # Freshness comment + footer.
    top_comment = FRESHNESS_COMMENT in text.splitlines()[:5]
    last_nonblank = next((line.strip() for line in reversed(text.splitlines()) if line.strip()), "")
    footer = last_nonblank == FRESHNESS

    # Useful line count.
    count = useful_lines(text)

    # Citations.
    citations = sorted({int(value) for value in CITATION_RE.findall(text)})
    out_of_range = [value for value in citations if value < 1 or value > 22]

    # Forbidden auth / skew / secret patterns.
    forbidden_auth = [value for value in FORBIDDEN_AUTH_TEXT if value.lower() in text.lower()]
    forbidden_skew = [value for value in FORBIDDEN_SKEW_TEXT if value in text]
    secret_hits = [pattern.pattern for pattern in SECRET_PATTERNS if pattern.search(text)]

    # Cross-link resolution.
    link_failures = markdown_link_failures(target_path, text)

    # Example / unsafe counts.
    example_headings = EXAMPLE_HEADING_RE.findall(text)
    unsafe_headings = UNSAFE_HEADING_RE.findall(text)
    unsafe_blockquote_hits = UNSAFE_BLOCKQUOTE_RE.findall(text)

    # TypeScript blocks and their comment headers.
    ts_blocks = TYPESCRIPT_BLOCK_RE.findall(text)
    ts_with_full_comment = sum(1 for block in ts_blocks if COMMENT_HEADER_RE.search(block))

    # Per-section contract.
    example_blocks = find_section_blocks(text, re.compile(r"^## (Example \d+|Verified config example [AB]):", re.MULTILINE))
    contract_failures: list[str] = []
    for label, body in example_blocks.items():
        contract_failures.extend(check_section_contract(label, body))

    # Per-unsafe-callout contract: UNSAFE blockquote + at least one [Sn] citation.
    unsafe_blocks = find_section_blocks(text, re.compile(r"^## Unsafe pattern \d+:", re.MULTILINE))
    unsafe_callout_failures: list[str] = []
    for label, body in unsafe_blocks.items():
        if "> UNSAFE --" not in body:
            unsafe_callout_failures.append(f"{label}: missing UNSAFE blockquote")
        if not CITATION_RE.search(body):
            unsafe_callout_failures.append(f"{label}: missing [Sn] citation")

    # Pointer table for unverified bodies -- must mention types.gen.ts and at least
    # one of the listed endpoints.
    pointer_table_present = "## Pointer table" in text
    pointer_table_mentions_types_gen = "types.gen.ts" in text.split("## Pointer table", 1)[1] if pointer_table_present else False
    pointer_table_required_endpoints = [
        "client.session.command",
        "client.session.shell",
        "client.auth.set",
        "client.provider.oauth.authorize",
    ]
    pointer_section = text.split("## Pointer table", 1)[1] if pointer_table_present else ""
    missing_endpoints = [
        endpoint for endpoint in pointer_table_required_endpoints if endpoint not in pointer_section
    ]

    # Skew-pair discipline.
    skew_pair_ok = (
        "same-minor-patch-delta-15" not in text
        or "does NOT claim compatibility from semver alone" in text
    )

    # not-verified marker count (signal of writer verification presence).
    not_verified_count = len(NOT_VERIFIED_RE.findall(text))

    # Progress.md freshness + row count + row 11 status.
    progress_path = DOCS / DASHBOARD_FILE
    if progress_path.is_file():
        progress_raw = progress_path.read_bytes()
        progress_text = progress_raw.decode("utf-8")
        progress_rows_match = re.findall(
            r"^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|",
            progress_text,
            re.MULTILINE,
        )
        row_numbers = sorted({int(number) for number, *_ in progress_rows_match})
        row_11 = next((row for row in progress_rows_match if int(row[0]) == 11), None)
        row_11_status = row_11[3].strip() if row_11 else "missing"
        progress_em = progress_raw.count(b"\xe2\x80\x94")
        progress_en = progress_raw.count(b"\xe2\x80\x93")
        progress_freshness = FRESHNESS_COMMENT in progress_text.splitlines()[:5] and FRESHNESS in progress_text
    else:
        row_numbers = []
        row_11_status = "missing-file"
        progress_em = -1
        progress_en = -1
        progress_freshness = False

    # Aggregate failures.
    if em_dash_hits != 0:
        failures.append(f"em_dash byte scan failed ({em_dash_hits} hits)")
    if en_dash_hits != 0:
        failures.append(f"en_dash byte scan failed ({en_dash_hits} hits)")
    if not top_comment:
        failures.append("top freshness comment missing")
    if not footer:
        failures.append("footer freshness line missing")
    if count < MIN_USEFUL_LINES:
        failures.append(f"useful lines {count} < min {MIN_USEFUL_LINES}")
    if out_of_range:
        failures.append(f"out-of-range citations: {out_of_range}")
    if forbidden_auth:
        failures.append(f"forbidden auth-path text: {forbidden_auth}")
    if forbidden_skew:
        failures.append(f"forbidden skew text: {forbidden_skew}")
    if secret_hits:
        failures.append(f"secret pattern hits: {secret_hits}")
    if link_failures:
        failures.append(f"unresolved cross-links: {link_failures}")
    if len(example_headings) != 11:
        failures.append(f"expected 11 example/config headings, found {len(example_headings)}: {example_headings}")
    if len(unsafe_headings) != 5:
        failures.append(f"expected 5 unsafe-pattern headings, found {len(unsafe_headings)}: {unsafe_headings}")
    if len(unsafe_blockquote_hits) < 5:
        failures.append(f"expected >=5 '> UNSAFE --' blockquotes, found {len(unsafe_blockquote_hits)}")
    if len(ts_blocks) != 12:
        failures.append(f"expected 12 TypeScript blocks (9 + 2 verified + 1 convention), found {len(ts_blocks)}")
    if ts_with_full_comment != 12:
        failures.append(f"expected 12 TypeScript blocks with 4-line comment header, found {ts_with_full_comment}")
    if contract_failures:
        failures.append(f"section contract failures: {contract_failures}")
    if unsafe_callout_failures:
        failures.append(f"unsafe callout failures: {unsafe_callout_failures}")
    if not pointer_table_present:
        failures.append("pointer table section missing")
    if pointer_table_present and not pointer_table_mentions_types_gen:
        failures.append("pointer table does not mention types.gen.ts")
    if missing_endpoints:
        failures.append(f"pointer table missing required endpoints: {missing_endpoints}")
    if not skew_pair_ok:
        failures.append("skew-pair discipline violated")
    if not_verified_count < 10:
        failures.append(f"expected many not-verified markers (writer verification table), found {not_verified_count}")
    if row_numbers != list(range(1, 15)):
        failures.append(f"progress row count off: {row_numbers}")
    if row_11_status != "done":
        failures.append(f"progress row 11 status: {row_11_status} (expected done)")
    if progress_em or progress_en:
        failures.append(f"progress em/en-dash byte hits em={progress_em} en={progress_en}")
    if not progress_freshness:
        failures.append("progress freshness missing")

    # Print report.
    print("=" * 72)
    print("PHASE 3D VALIDATION REPORT")
    print("=" * 72)
    print(f"\n[{'PASS' if not failures else 'FAIL'}] {TARGET}")
    print(f"  useful_lines      : {count} (min {MIN_USEFUL_LINES})")
    print(f"  dash_bytes        : em={em_dash_hits} en={en_dash_hits}")
    print(f"  freshness         : top={top_comment} footer={footer}")
    print(f"  citations         : {citations}")
    print(f"  out_of_range      : {out_of_range}")
    print(f"  forbidden_auth    : {forbidden_auth}")
    print(f"  forbidden_skew    : {forbidden_skew}")
    print(f"  secret_hits       : {secret_hits}")
    print(f"  unresolved_links  : {link_failures}")
    print(f"  example_headings  : {len(example_headings)} (target 11 = 9 examples + 2 verified config)")
    print(f"  unsafe_headings   : {len(unsafe_headings)} (target 5)")
    print(f"  unsafe_blockquote : {len(unsafe_blockquote_hits)} (target >=5)")
    print(f"  ts_blocks         : {len(ts_blocks)} (target 12)")
    print(f"  ts_with_comment   : {ts_with_full_comment} (target 12)")
    print(f"  not_verified_markers : {not_verified_count}")
    print(f"  skew_pair_ok      : {skew_pair_ok}")
    print(f"  contract_failures : {len(contract_failures)}")
    print(f"  unsafe_callout_failures : {len(unsafe_callout_failures)}")

    print("\nPOINTER TABLE")
    print(f"  section_present   : {pointer_table_present}")
    print(f"  mentions_types_gen: {pointer_table_mentions_types_gen}")
    print(f"  missing_endpoints : {missing_endpoints}")

    print("\nPROGRESS.MD")
    print(f"  rows              : {row_numbers}")
    print(f"  row 11 status     : {row_11_status}")
    print(f"  dash_bytes        : em={progress_em} en={progress_en}")
    print(f"  freshness         : {progress_freshness}")

    print("\nKEY LOCATIONS")
    print(f"  Example 1 heading : {target_path.name}:{line_number(text, '## Example 1:')}")
    print(f"  Example 9 heading : {target_path.name}:{line_number(text, '## Example 9:')}")
    print(f"  Unsafe pattern 1  : {target_path.name}:{line_number(text, '## Unsafe pattern 1:')}")
    print(f"  Unsafe pattern 5  : {target_path.name}:{line_number(text, '## Unsafe pattern 5:')}")
    print(f"  Verified config A : {target_path.name}:{line_number(text, '### Verified config example A:')}")
    print(f"  Verified config B : {target_path.name}:{line_number(text, '### Verified config example B:')}")
    print(f"  Pointer table     : {target_path.name}:{line_number(text, '## Pointer table')}")

    if contract_failures:
        print("\nSECTION CONTRACT DETAIL")
        for failure in contract_failures:
            print(f"  - {failure}")

    if unsafe_callout_failures:
        print("\nUNSAFE CALLOUT DETAIL")
        for failure in unsafe_callout_failures:
            print(f"  - {failure}")

    if failures:
        print("\nFAILURES")
        for failure in failures:
            print(f"  - {failure}")
    print(f"\nVALIDATION: {'PASS' if not failures else 'FAIL'}")
    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())