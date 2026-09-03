#!/usr/bin/env sh
# Renders poster.html to an A4 PDF with headless Chrome. No npm dependencies.
# Usage: ./build.sh            (uses google-chrome / chromium on PATH)
#        CHROME=/path/to/chrome ./build.sh
set -eu
cd "$(dirname "$0")"

CHROME="${CHROME:-$(command -v google-chrome-stable || command -v google-chrome || command -v chromium || command -v chromium-browser)}"
OUT="flutterly-gp-poster-a4.pdf"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

"$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars \
  --allow-file-access-from-files --user-data-dir="$PROFILE" --no-first-run \
  --no-pdf-header-footer --virtual-time-budget=4000 \
  --print-to-pdf="$OUT" "file://$PWD/poster.html"

echo "Wrote $OUT"
