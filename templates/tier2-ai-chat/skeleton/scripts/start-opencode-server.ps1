# scripts/start-opencode-server.ps1
#
# Bootstrap script for Path B (modelPath: "opencode"). Spawns `opencode serve`
# with `--port 0` so OpenCode picks a random free port, then parses stdout for
# the chosen port and writes the resolved URL to `runtime/opencode-url.txt`.
# The OpenCode bridge in `src/lib/opencode.ts` reads that file at runtime.
#
# Why a script wrapper: `opencode serve` keeps running forever (it's a daemon).
# We need a way to (a) capture the resolved port from its startup stdout and
# (b) leave the process running in the background so `npm run dev` / `npm test`
# can connect to it.
#
# Usage:
#   pwsh scripts/start-opencode-server.ps1
#   # or, from package.json:
#   npm run opencode:serve
#
# Pre-requisites (verified on this Windows box):
#   - opencode CLI installed at $env:AppData\npm\opencode.ps1 (v1.18.5)
#   - `opencode --version` exits 0
#
# On non-Windows hosts, run the equivalent `.sh` twin (not shipped in this
# skeleton — Windows-only by spec; add via cross-platform branch on demand).
#
# ponytail: one file, no plugin sprawl. The script does three things:
#   1. Probe `opencode --version` (fail fast if the CLI is missing).
#   2. Spawn `opencode serve --port 0 --hostname 127.0.0.1` as a background job.
#   3. Wait for the URL to appear in stdout, then write it to runtime/opencode-url.txt.

$ErrorActionPreference = "Stop"

# Resolve paths relative to this script.
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Resolve-Path (Join-Path $ScriptDir "..")
$RuntimeDir = Join-Path $RepoRoot "runtime"
$UrlFile = Join-Path $RuntimeDir "opencode-url.txt"

# Ensure runtime/ exists (the .gitignore inside keeps contents out of VCS).
if (-not (Test-Path $RuntimeDir)) {
  New-Item -ItemType Directory -Path $RuntimeDir -Force | Out-Null
}

# Step 1 — probe the CLI.
$opencode = (Get-Command opencode -ErrorAction SilentlyContinue)?.Source
if (-not $opencode) {
  Write-Error "opencode CLI not on PATH. Install via `npm install -g opencode-ai` or check the path."
  exit 2
}

$version = & opencode --version 2>&1 | Select-Object -First 1
Write-Host "[opencode] using $opencode (version: $version)"

# Step 2 — spawn the server as a background job so we can capture stdout.
$job = Start-Job -ScriptBlock {
  param($exe)
  & $exe serve --port 0 --hostname 127.0.0.1 2>&1
} -ArgumentList $opencode

# Step 3 — wait for the URL to appear in the job's stdout.
# OpenCode prints `listening on http://127.0.0.1:<port>/` shortly after startup.
$timeoutSec = 15
$deadline = (Get-Date).AddSeconds($timeoutSec)
$url = $null
while ((Get-Date) -lt $deadline) {
  Start-Sleep -Milliseconds 250
  $out = Receive-Job -Job $job -Keep 2>&1 | Out-String
  if ($out -match "listening on (http://[^\s]+)") {
    $url = $Matches[1]
    break
  }
}

if (-not $url) {
  Write-Error "opencode serve did not print its listening URL within ${timeoutSec}s. Aborting."
  Stop-Job -Job $job -PassThru | Remove-Job -Force
  exit 3
}

# Trim trailing slash for consistency with the bridge's URL parser.
$url = $url.TrimEnd("/")
Set-Content -Path $UrlFile -Value $url -NoNewline
Write-Host "[opencode] server listening at $url"
Write-Host "[opencode] wrote $UrlFile"
Write-Host "[opencode] job handle: $($job.Id); leave this terminal open or background the job to keep the server alive."
