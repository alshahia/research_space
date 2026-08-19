#!/usr/bin/env python3
"""Quick line-count diagnostic."""
import os

ROOT = r"E:\react_projects\research_space\opencode-sdk-agent-docs"
for fn in ["02_quickstart.md", "03_decision_guide.md", "04_api_map.md"]:
    p = os.path.join(ROOT, fn)
    with open(p, "rb") as f:
        data = f.read().decode("utf-8")
    raw = data.count(chr(10)) + 1
    nonblank = sum(1 for line in data.splitlines() if line.strip())
    print(f"{fn}: raw_lines={raw}, non_blank_lines={nonblank}")
