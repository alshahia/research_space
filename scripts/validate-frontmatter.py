#!/usr/bin/env python3
"""Validate YAML frontmatter in SKILL.md files.

Stdlib-only. Checks:
  - file starts with `---` on line 1 (with optional UTF-8 BOM tolerated)
  - frontmatter block ends with `---`
  - required fields: `name`, `description`
  - `name` matches regex `^[a-z0-9]+(-[a-z0-9]+)*$`
  - `name` matches parent directory name (only for files under a `skills/` segment)
  - `description` length is 1..1024 chars (single-line only; YAML block scalars `>` / `|` are rejected with a clear error)

Tolerance policy (v0.22.0+ P5 close-out):
  - A leading UTF-8 BOM (U+FEFF) on line 1 is stripped before validation. This lets the
    validator operate on files authored by editors that default to UTF-8-with-BOM without
    requiring the source file to be re-saved. The BOM never reaches the parsed dict.
  - Multi-line YAML values (`>` folded, `|` literal) are NOT supported. Keep `name`
    and `description` single-line. Files with block-scalar markers raise a clear ValueError
    at parse time, surfacing as a per-file failure in the main sweep rather than crashing
    the whole run.

Usage:
    python3 scripts/validate-frontmatter.py path/to/SKILL.md [more ...]
"""
import os
import re
import sys

NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")


def parse_frontmatter(path):
    """Return (frontmatter_dict, body) or raise ValueError.

    Tolerates a leading UTF-8 BOM (U+FEFF) on line 1 by stripping it before the
    `---` check. Any value that is a YAML block-scalar marker (`>`, `|`, `>-`,
    `|-`, `>+`, `|+`, with optional trailing whitespace) raises a clear
    ValueError naming the offending field - block scalars are not supported in
    this validator (kept `name` / `description` single-line).
    """
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    # Strip a single leading UTF-8 BOM if present (editors that save as UTF-8-BOM).
    if text.startswith("\ufeff"):
        text = text[1:]
    lines = text.splitlines(keepends=True)

    if not lines or lines[0].rstrip("\r\n") != "---":
        raise ValueError(f"{path}: must start with `---` on line 1")

    # Find closing `---`
    end = None
    for i in range(1, len(lines)):
        if lines[i].rstrip("\r\n") == "---":
            end = i
            break
    if end is None:
        raise ValueError(f"{path}: frontmatter not closed with `---`")

    fm = {}
    for raw in lines[1:end]:
        line = raw.rstrip("\r\n")
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$", line)
        if not m:
            continue
        key = m.group(1).lower()
        val = m.group(2).strip()
        # Strip surrounding quotes if present
        if len(val) >= 2 and val[0] == val[-1] and val[0] in ('"', "'"):
            val = val[1:-1]
        # Block-scalar markers are not supported - raise with a clear, actionable
        # message naming the field. The marker line is always `key: >` / `key: |`
        # (the body lines would otherwise be silently lost).
        if val in (">", "|", ">-", "|-", ">+", "|+"):
            raise ValueError(
                f"{path}: `{key}` uses YAML block scalar `{val}`; not supported. "
                f"Keep `name` and `description` single-line (1..1024 chars)."
            )
        fm[key] = val

    return fm, "".join(lines[end + 1 :])


def is_skill_path(path):
    """Strict validation only applies to OpenCode-discoverable skills.

    OpenCode's loader searches paths containing a `skills/` segment.
    Files outside that path (e.g. internal references loaded via `read`
    tool by agents) are agent-managed, not skill-loader-managed, so
    the strict name regex + dir-match rule does not apply.
    """
    abspath = os.path.abspath(path)
    return f"{os.sep}skills{os.sep}" in abspath


def validate_one(path):
    """Return (errors, mode) tuple. `mode` is 'strict' or 'lenient'.

    Always 2-tuple - the unpacking at the call site (`errs, mode = validate_one(path)`)
    requires it. Earlier this returned a 1-tuple list on parse error, which crashed
    the main sweep with `not enough values to unpack` whenever a single malformed
    SKILL.md appeared in argv.
    """
    errors = []
    try:
        fm, _ = parse_frontmatter(path)
    except ValueError as e:
        # Default mode to "lenient" because is_skill_path was never reached.
        return ([str(e)], "lenient")

    name = fm.get("name", "").strip()
    desc = fm.get("description", "").strip()
    strict = is_skill_path(path)

    if not name:
        if strict:
            errors.append(f"{path}: missing required field `name`")
    else:
        if strict:
            if not NAME_RE.match(name):
                errors.append(
                    f"{path}: `name` '{name}' does not match regex ^[a-z0-9]+(-[a-z0-9]+)*$"
                )
            else:
                parent_dir = os.path.basename(os.path.dirname(os.path.abspath(path)))
                if parent_dir != name:
                    errors.append(
                        f"{path}: `name` '{name}' does not match parent directory '{parent_dir}'"
                    )

    if not desc:
        errors.append(f"{path}: missing required field `description`")
    elif len(desc) < 1 or len(desc) > 1024:
        errors.append(
            f"{path}: `description` length {len(desc)} not in 1..1024"
        )

    mode = "strict" if strict else "lenient"
    return ([], mode) if not errors else (errors, mode)


def main(argv):
    if len(argv) < 2:
        print(__doc__.strip())
        return 2

    all_errors = []
    files_checked = 0
    for path in argv[1:]:
        if not os.path.isfile(path):
            all_errors.append(f"NOT_FOUND: {path}")
            continue
        files_checked += 1
        errs, mode = validate_one(path)
        if errs:
            all_errors.extend(errs)
        else:
            print(f"OK: {path} ({mode})")

    print(f"\nChecked {files_checked} files.")
    if all_errors:
        print(f"\nFAILED with {len(all_errors)} error(s):")
        for e in all_errors:
            print(f"  {e}")
        return 1
    print("All SKILL.md frontmatter valid.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
