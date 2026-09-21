#!/bin/bash
set -euo pipefail

# SessionStart hook for Codex / agent remotes on a fresh clone.
# Idempotent and non-interactive. Skips on ordinary local shells.

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ] && [ "${CODEX_REMOTE:-}" != "true" ] && [ "${CURSOR_AGENT:-}" != "true" ]; then
  exit 0
fi

ROOT="${CLAUDE_PROJECT_DIR:-${CODEX_PROJECT_DIR:-$PWD}}"
cd "$ROOT"

npm install
npx playwright install chromium || echo "playwright chromium install skipped"
