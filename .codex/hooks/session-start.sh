#!/bin/bash
set -euo pipefail

# SessionStart hook for Claude Code on the web.
#
# The remote container is a fresh clone each session, so install the
# dependencies that build, tests (vitest), lint (eslint), and the browser
# workflow (npm run test:browser) need. Idempotent and non-interactive.

# Only run in the remote web container; local devs manage their own deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# JS deps. `install` (not `ci`) reuses the cached container state across sessions.
npm install

# Chromium for the Playwright browser workflow. Non-fatal: a download hiccup
# should never block the session from starting.
npx playwright install chromium || echo "playwright chromium install skipped"
