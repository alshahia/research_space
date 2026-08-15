#!/usr/bin/env bash
#
# scripts/switch-target.sh — Tier 2 mobile skeleton
#
# Flips the `mobile.target` between Expo and Capacitor. The dispatch requires
# the toggle to drive the install (the postinstall script picks the right
# dep set per the toggle). This script is the human-readable counterpart.
#
# Usage:
#   bash scripts/switch-target.sh expo
#   bash scripts/switch-target.sh capacitor
#   # or, from package.json:
#   npm run switch-target -- expo
#   npm run switch-target -- capacitor
#
# What it does:
#   1. Validate the target argument.
#   2. Edit tier.config.json to set mobile.target = <target>.
#   3. Re-run `npm install` (which re-runs the postinstall hook).
#   4. Run the Tier 2 mobile smoke test (tsc --noEmit + npm test).
#
# ponytail: one file, no plugin sprawl. The script uses `node` to edit JSON
# safely (no `sed` regex magic on multiline JSON).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
TIER_CONFIG="${REPO_ROOT}/tier.config.json"

# Step 1 — validate the target argument.
TARGET="${1:-}"
if [[ -z "${TARGET}" ]]; then
  echo "usage: switch-target.sh <expo|capacitor>" >&2
  exit 1
fi

if [[ "${TARGET}" != "expo" && "${TARGET}" != "capacitor" ]]; then
  echo "switch-target.sh: invalid target '${TARGET}'. Valid: expo, capacitor." >&2
  exit 1
fi

# Step 2 — edit tier.config.json using node (safer than sed for JSON).
node -e "
const fs = require('node:fs');
const path = '${TIER_CONFIG}';
const cfg = JSON.parse(fs.readFileSync(path, 'utf8'));
cfg.mobile = cfg.mobile || {};
cfg.mobile.target = '${TARGET}';
fs.writeFileSync(path, JSON.stringify(cfg, null, 2) + '\n');
console.log('[switch-target] wrote ' + path + ' (mobile.target=' + '${TARGET}' + ')');
"

# Step 3 — re-run npm install. The install picks up the active target's
# optional deps (the npm CLI skips optional deps when they can't install;
# for the active target, the CDN-served packages install normally).
cd "${REPO_ROOT}"
if command -v npm >/dev/null 2>&1; then
  echo "[switch-target] running: npm install (refresh optional deps for target=${TARGET})"
  if npm install --no-audit --no-fund 2>&1 | tail -20; then
    echo "[switch-target] npm install OK"
  else
    echo "[switch-target] WARN: npm install exited non-zero (optional deps may have failed). Continuing." >&2
  fi
fi

# Step 4 — run the Tier 2 mobile smoke test.
echo "[switch-target] running: tsc --noEmit"
if npx tsc --noEmit 2>&1; then
  echo "[switch-target] tsc --noEmit OK"
else
  echo "[switch-target] FAIL: tsc --noEmit exited non-zero" >&2
  exit 1
fi

echo "[switch-target] running: npm test"
if npm test 2>&1 | tail -30; then
  echo "[switch-target] npm test OK"
else
  echo "[switch-target] FAIL: npm test exited non-zero" >&2
  exit 1
fi

echo "[switch-target] DONE: target is now '${TARGET}'."
