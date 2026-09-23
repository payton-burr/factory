#!/usr/bin/env bash
# story: e80s01
# Pre-flight runner for gate-trace skill verify — ensures critic inputs exist.
# Usage: bash scripts/run-gate-trace-verify.sh [--self-test]
set -euo pipefail

BIGPOWERS_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

self_test() {
  test -f "$BIGPOWERS_ROOT/scripts/lib/completeness-critic.sh"
  grep -q 'R1' "$BIGPOWERS_ROOT/skills/gate-trace/SKILL.md"
  grep -q 'completeness-critic' "$BIGPOWERS_ROOT/skills/gate-trace/SKILL.md"
  echo "run-gate-trace-verify: self-test OK"
}

if [[ "${1:-}" == "--self-test" ]]; then
  self_test
  exit 0
fi

[[ -f specs/traceability-matrix.json ]] || bash "$BIGPOWERS_ROOT/scripts/trace-stories.sh" --json
[[ -f specs/blind-spots.json ]] || bash "$BIGPOWERS_ROOT/scripts/check-blind-spots.sh" 2>/dev/null || true

if [[ ! -f specs/traceability-matrix.json ]]; then
  echo "FAIL: missing specs/traceability-matrix.json"
  exit 1
fi

bash "$BIGPOWERS_ROOT/scripts/lib/completeness-critic.sh"
echo "run-gate-trace-verify: OK"
