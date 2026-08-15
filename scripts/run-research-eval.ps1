# scripts/run-research-eval.ps1 - research golden-test eval runner (PowerShell parity)
#
# Walks the golden tests in agents_manager/eval/golden-tests/, prepares a
# per-test prompt + empty run report, and prints the grading rubric for the
# user to fill.
#
# Usage:
#   pwsh scripts/run-research-eval.ps1                       # walk all 3 tests
#   pwsh scripts/run-research-eval.ps1 01-arxiv-topic        # walk one test
#   pwsh scripts/run-research-eval.ps1 01-arxiv-topic --ingest
#   pwsh scripts/run-research-eval.ps1 --help
#
# PowerShell parity for scripts/run-research-eval.sh.
# Date: 2026-08-13
# Tier: 4 (eval harness for the multi-agent research loop)

[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$TestId = "",

    [switch]$Ingest,

    [switch]$Help
)

$ErrorActionPreference = 'Stop'

$RepoRoot = (Resolve-Path "$PSScriptRoot/..").Path
$GoldenDir = Join-Path $RepoRoot 'agents_manager/eval/golden-tests'
$EvalOut = Join-Path $RepoRoot 'share/eval'
$NotesDir = Join-Path $RepoRoot 'share/notes'

function Print-Help {
    @'
Usage: pwsh scripts/run-research-eval.ps1 [TEST_ID] [--ingest] [--help]

Walks the golden tests in agents_manager/eval/golden-tests/.
  No args         : walk all tests; for each, prepare prompt + rubric.
  TEST_ID         : run one test.
  --ingest        : ingest the latest synthesis into the test folder and
                    aggregate per-date scores.
  --help          : this message.

Output directories:
  share/eval/<YYYY-MM-DD>/<TEST_ID>/PROMPT.md   - topic + sub-questions
  share/eval/<YYYY-MM-DD>/<TEST_ID>/RUBRIC.md   - grading rubric
  share/eval/<YYYY-MM-DD>/<TEST_ID>/RUN.md      - the synthesis (post-ingest)
  share/notes/04_eval_run_<YYYY-MM-DD>.md       - aggregate per-date result
'@
    exit 0
}

function List-Tests {
    if (-not (Test-Path $GoldenDir)) {
        Write-Error "FATAL: $GoldenDir not found"
        exit 1
    }
    Get-ChildItem -Path $GoldenDir -File -Filter '*.md' |
        Sort-Object Name |
        ForEach-Object { $_.BaseName }
}

function Extract-From-Markdown {
    # Mirrors the python extraction in the bash variant: topic + sub-questions + rubric.
    param([string]$Path)

    $text = Get-Content -Path $Path -Raw -Encoding UTF8

    $topic = ''
    $topicMatch = [regex]::Match($text, '## Topic\s*\r?\n\s*\r?\n>\s*"(.*?)"', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($topicMatch.Success) { $topic = $topicMatch.Groups[1].Value.Trim() }

    $subQuestions = @()
    $subSection = [regex]::Match($text, '## Sub-question decomposition.*?(?=^## )', [System.Text.RegularExpressions.RegexOptions]::Singleline + [System.Text.RegularExpressions.RegexOptions]::Multiline)
    if ($subSection.Success) {
        $subMatches = [regex]::Matches($subSection.Value, '^\d+\.\s*\*\*([^*]+)\*\*', [System.Text.RegularExpressions.RegexOptions]::Multiline)
        foreach ($m in $subMatches) { $subQuestions += $m.Groups[1].Value.Trim() }
    }

    $rubric = ''
    $rubricMatch = [regex]::Match($text, '## Grading rubric.*?(?=^## )', [System.Text.RegularExpressions.RegexOptions]::Singleline + [System.Text.RegularExpressions.RegexOptions]::Multiline)
    if ($rubricMatch.Success) { $rubric = $rubricMatch.Value }

    return [pscustomobject]@{
        Topic        = $topic
        SubQuestions = $subQuestions
        Rubric       = $rubric
    }
}

function Prepare-Test {
    param([string]$Id)

    $src = Join-Path $GoldenDir "$Id.md"
    if (-not (Test-Path $src)) {
        Write-Error "FATAL: golden test not found: $src"
        exit 1
    }
    $date = Get-Date -Format 'yyyy-MM-dd' -AsUTC
    $outDir = Join-Path $EvalOut "$date/$Id"
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null

    $ext = Extract-From-Markdown -Path $src

    $subList = ($ext.SubQuestions | ForEach-Object { "- $_" }) -join "`n"

    $prompt = @"
# Eval Prompt - $Id

**Date:** $date
**Test:** $Id
**Source:** `agents_manager/eval/golden-tests/$Id.md`

## Topic

> $($ext.Topic)

## Sub-questions (suggested decomposition)

$subList

## Workflow to invoke

Follow `agents_manager/research/WORKFLOW.md` (multi-agent research loop):

1. Master dispatches one sub-agent per sub-question (Tier 4).
2. Each sub-agent writes to `share/notes/01_research_<task-id>_<sub>.md` with `[Sn]` citations.
3. Lead am-research synthesizes to `share/notes/01_research_<task-id>.md`.
4. am-review verifier mode writes `share/notes/04_review_<task-id>_verifier.md`.
5. Master writes `share/notes/01_master_synthesis_<task-id>.md` and ingests into this test.

After the workflow completes, copy the master synthesis to:

`share/eval/$date/$Id/RUN.md`

Then grade per the rubric at `share/eval/<date>/<id>/RUBRIC.md` (or the test's grading-rubric section).
"@

    Set-Content -Path (Join-Path $outDir 'PROMPT.md') -Value $prompt -Encoding UTF8
    Set-Content -Path (Join-Path $outDir 'RUBRIC.md') -Value $ext.Rubric -Encoding UTF8
    Write-Host "==> prepared: $outDir"
}

function Get-LatestSynthesis {
    $latest = Get-ChildItem -Path $NotesDir -Filter '01_research_*.md' -File -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -notmatch '_sub-|_verifier|_master_synthesis' } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1
    if ($null -eq $latest) {
        Write-Error "FATAL: no synthesis found in $NotesDir"
        exit 1
    }
    return $latest
}

function Ingest-Test {
    param([string]$Id)

    $date = Get-Date -Format 'yyyy-MM-dd' -AsUTC
    $outDir = Join-Path $EvalOut "$date/$Id"
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null

    $src = Get-LatestSynthesis
    Write-Host "==> ingesting: $($src.FullName)"
    Copy-Item -Path $src.FullName -Destination (Join-Path $outDir 'RUN.md') -Force
    Write-Host "==> wrote: $outDir/RUN.md"
    Aggregate
}

function Aggregate {
    $date = Get-Date -Format 'yyyy-MM-dd' -AsUTC
    $aggregateFile = Join-Path $NotesDir "04_eval_run_$date.md"
    New-Item -ItemType Directory -Force -Path $NotesDir | Out-Null

    $testIds = @(List-Tests)
    $testLines = ($testIds | ForEach-Object { "- $_" }) -join "`n"

    $body = @"
# Eval Run - $date

**Date:** $date
**Tests evaluated this run:**

$testLines

## Per-test scores

Paste scores here as you grade each test:

$(($testIds | ForEach-Object {
        @"
### $_

| Criterion | Score (1-5) | Notes |
|-----------|-------------|-------|
| 1. Citation density | | |
| 2. Accuracy (top claims verified) | | |
| 3. Depth (sub-question coverage) | | |
| 4. Format match (workflow deliverable) | | |
| 5. Arabic support (when triggered) | | |
| 6. Comparison-table specific (when applicable) | | |
| **TOTAL** | **/25 or /30** | |

"@
    }) -join "`n")
## Pass / fail summary

| Test ID | Total | Pass? | Excellent? |
|---------|-------|-------|------------|

## Self-critique

- Did the rubric match what the run produced?
- Are there missed criteria for this kind of research?
- Improvements for next run?
"@

    Set-Content -Path $aggregateFile -Value $body -Encoding UTF8
    Write-Host "==> wrote: $aggregateFile"
}

# ---- main ------------------------------------------------------------------

if ($Help) { Print-Help }

$tests = if ($TestId) { @($TestId) } else { @(List-Tests) }

if ($Ingest) {
    foreach ($id in $tests) { Ingest-Test -Id $id }
} else {
    Write-Host "==> eval runner started: $(Get-Date -Format 'yyyy-MM-dd' -AsUTC)"
    foreach ($id in $tests) { Prepare-Test -Id $id }
    Aggregate
}

Write-Host "==> done."
