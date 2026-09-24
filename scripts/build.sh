#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
python3 scripts/generate_app_data.py
printf '\nArchive ready. Open http://localhost:8000 to view the catalog.\n'
