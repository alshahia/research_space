#!/usr/bin/env bash
#
# scripts/run-research-eval.sh - research golden-test eval runner
#
# Walks the golden tests in agents_manager/eval/golden-tests/, prepares a
# per-test prompt + empty run report, and prints the grading rubric for the
# user to fill. After the user runs the multi-agent research loop manually
# (or via future automation), the script ingests the synthesis and aggregates
# the per-criterion scores into share/notes/04_eval_run_<date>.md.
#
# Usage:
#   bash scripts/run-research-eval.sh                       # walk all 3 tests
#   bash scripts/run-research-eval.sh 01-arxiv-topic        # walk one test
#   bash scripts/run-research-eval.sh 01-arxiv-topic --ingest   # ingest prior run + grade
#   bash scripts/run-research-eval.sh --help
#
# Date: 2026-08-13
# Tier: 4 (eval harness for the multi-agent research loop)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GOLDEN_DIR="$REPO_ROOT/agents_manager/eval/golden-tests"
EVAL_OUT="$REPO_ROOT/share/eval"
NOTES_DIR="$REPO_ROOT/share/notes"

# ---- helpers ---------------------------------------------------------------

print_help() {
  cat <<USAGE
Usage: bash scripts/run-research-eval.sh [TEST_ID] [--ingest] [--help]

Walks the golden tests in agents_manager/eval/golden-tests/.
  No args         : walk all tests in deterministic order; for each, print the
                    topic + grading rubric, prompt the user to grade.
  TEST_ID         : run one test (e.g. 01-arxiv-topic, 02-web-topic, 03-comparison-topic).
  --ingest        : move the latest synthesis for the test from share/notes/
                    to share/eval/<date>/<TEST_ID>/RUN.md, and aggregate the
                    user-provided grades into share/notes/04_eval_run_<date>.md.
  --help | -h     : this message.

Output directories:
  share/eval/<YYYY-MM-DD>/<TEST_ID>/PROMPT.md   - topic + sub-questions
  share/eval/<YYYY-MM-DD>/<TEST_ID>/RUBRIC.md   - grading rubric
  share/eval/<YYYY-MM-DD>/<TEST_ID>/RUN.md      - the synthesis (post-ingest)
  share/notes/04_eval_run_<YYYY-MM-DD>.md       - aggregate per-date result
USAGE
  exit 0
}

# Parse args
INGEST=false
TEST_ID=""
for arg in "$@"; do
  case "$arg" in
    --ingest) INGEST=true ;;
    --help|-h) print_help ;;
    -*) echo "unknown flag: $arg" >&2; exit 2 ;;
    *)
      if [ -z "$TEST_ID" ]; then TEST_ID="$arg"
      else echo "unexpected arg: $arg" >&2; exit 2
      fi
      ;;
  esac
done

DATE="$(date -u +%Y-%m-%d)"

# ---- list mode: walk all tests ---------------------------------------------

list_tests() {
  if [ ! -d "$GOLDEN_DIR" ]; then
    echo "FATAL: $GOLDEN_DIR not found" >&2
    exit 1
  fi
  # Stable order: alphanumeric sort matches the filename prefix (01_,02_,03_)
  ls -1 "$GOLDEN_DIR" | sort
}

# ---- prepare ---------------------------------------------------------------

prepare_test() {
  local id="$1"
  local src="$GOLDEN_DIR/$id"
  if [ ! -f "$src" ]; then
    echo "FATAL: golden test not found: $src" >&2
    exit 1
  fi
  local out_dir="$EVAL_OUT/$DATE/$id"
  mkdir -p "$out_dir"

  # Extract topic + sub-questions + rubric into per-test files.
  python3 - "$src" "$out_dir/PROMPT.md" "$out_dir/RUBRIC.md" <<'PY'
import re, sys
src, prompt_out, rubric_out = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(src, encoding="utf-8").read()

# Topic: from the first blockquote after "## Topic"
topic_match = re.search(r'## Topic\n\n> "(.*?)"', text, re.DOTALL)
topic = topic_match.group(1) if topic_match else "(no topic found)"

# Sub-question decomposition: section + bullets
subq_section = re.search(r'## Sub-question decomposition.*?(?=^## )', text, re.MULTILINE | re.DOTALL)
sub_questions = []
if subq_section:
    sub_questions = re.findall(r'^\d+\. \*\*([^*]+)\*\*', subq_section.group(0), re.MULTILINE)

# Rubric: the markdown table under "## Grading rubric"
rubric_match = re.search(r'## Grading rubric.*?(?=^## )', text, re.MULTILINE | re.DOTALL)
rubric = rubric_match.group(0) if rubric_match else "(no rubric found)"

prompt_md = (
    f"# Eval Prompt - {id}\n\n"
    f"**Date:** {__import__('datetime').datetime.utcnow().strftime('%Y-%m-%d')}\n"
    f"**Test:** {id}\n"
    f"**Source:** `agents_manager/eval/golden-tests/{id}.md`\n\n"
    f"## Topic\n\n> {topic}\n\n"
    f"## Sub-questions (suggested decomposition)\n\n"
)
for n, sq in enumerate(sub_questions, 1):
    prompt_md += f"- {sq}\n"
prompt_md += (
    "\n## Workflow to invoke\n\n"
    "Follow `agents_manager/research/WORKFLOW.md` (multi-agent research loop):\n"
    "1. Master dispatches one sub-agent per sub-question (Tier 4).\n"
    "2. Each sub-agent writes to `share/notes/01_research_<task-id>_<sub>.md` with `[Sn]` citations.\n"
    "3. Lead am-research synthesizes to `share/notes/01_research_<task-id>.md`.\n"
    "4. am-review verifier mode writes `share/notes/04_review_<task-id>_verifier.md`.\n"
    "5. Master writes `share/notes/01_master_synthesis_<task-id>.md` and ingests into this test.\n\n"
    "After the workflow completes, copy the master synthesis to:\n\n"
    f"`share/eval/{__import__('datetime').datetime.utcnow().strftime('%Y-%m-%d')}/{id}/RUN.md`\n\n"
    "Then grade per the rubric at `share/eval/<date>/<id>/RUBRIC.md` (or the test's grading-rubric section).\n"
)

with open(prompt_out, "w", encoding="utf-8") as f:
    f.write(prompt_md)
with open(rubric_out, "w", encoding="utf-8") as f:
    f.write(rubric)
PY
  echo "==> prepared: $out_dir"
}

# ---- ingest mode -----------------------------------------------------------

ingest_test() {
  local id="$1"
  local out_dir="$EVAL_OUT/$DATE/$id"
  mkdir -p "$out_dir"
  # Find the latest 01_research_<task-id>.md in share/notes/.
  # We pick the most recently modified file that does NOT include _sub- or _verifier
  # or _master_synthesis in the name.
  local synth
  synth="$(ls -1t "$NOTES_DIR"/01_research_*.md 2>/dev/null \
    | grep -v '_sub-' \
    | grep -v '_verifier' \
    | grep -v '_master_synthesis' \
    | head -n1 || true)"
  if [ -z "$synth" ]; then
    echo "FATAL: no synthesis found in $NOTES_DIR" >&2
    exit 1
  fi
  echo "==> ingesting: $synth"
  cp "$synth" "$out_dir/RUN.md"
  echo "==> wrote: $out_dir/RUN.md"
  aggregate
}

# ---- aggregate -------------------------------------------------------------

aggregate() {
  local aggregate_file="$NOTES_DIR/04_eval_run_$DATE.md"
  mkdir -p "$NOTES_DIR"
  {
    echo "# Eval Run - $DATE"
    echo
    echo "**Date:** $DATE"
    echo "**Tests evaluated this run:**"
    echo
    for id in $(list_tests); do
      echo "- $id"
    done
    echo
    echo "## Per-test scores"
    echo
    echo "Paste scores here as you grade each test:"
    echo
    for id in $(list_tests); do
      echo "### $id"
      echo
      echo "| Criterion | Score (1-5) | Notes |"
      echo "|-----------|-------------|-------|"
      echo "| 1. Citation density | | |"
      echo "| 2. Accuracy (top claims verified) | | |"
      echo "| 3. Depth (sub-question coverage) | | |"
      echo "| 4. Format match (workflow deliverable) | | |"
      echo "| 5. Arabic support (when triggered) | | |"
      echo "| 6. Comparison-table specific (when applicable) | | |"
      echo "| **TOTAL** | **/25 or /30** | |"
      echo
    done
    echo "## Pass / fail summary"
    echo
    echo "| Test ID | Total | Pass? | Excellent? |"
    echo "|---------|-------|-------|------------|"
    echo
    echo "## Self-critique"
    echo
    echo "- Did the rubric match what the run produced?"
    echo "- Are there missed criteria for this kind of research?"
    echo "- Improvements for next run?"
    echo
  } > "$aggregate_file"
  echo "==> wrote: $aggregate_file"
  echo "Fill in scores, save, then commit."
}

# ---- main ------------------------------------------------------------------

if [ -z "$TEST_ID" ]; then
  echo "==> eval runner started: $DATE"
  for id in $(list_tests); do
    prepare_test "$id"
  done
  aggregate
else
  if $INGEST; then
    ingest_test "$TEST_ID"
  else
    prepare_test "$TEST_ID"
    aggregate
  fi
fi

echo "==> done."
