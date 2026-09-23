#!/usr/bin/env bash
# story: e28s04
# build-skill-index.sh — lexical index for search-skills
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib/skill-common.sh"
resolve_repo_root
SKILLS_ROOT="$BIGPOWERS_ROOT/skills"
OUT="$REPO_ROOT/specs/SKILL-SEARCH-INDEX_LATEST.md"
mkdir -p "$(dirname "$OUT")"
{ echo "# Skill Search Index (auto-generated)"; echo ""; echo "Regenerate: \`bash scripts/build-skill-index.sh\`"; echo ""; echo "| name | model | description |"; echo "|------|-------|-------------|"
  while IFS= read -r skill_dir; do
    skill_md="$skill_dir/SKILL.md"
    parse_frontmatter "$skill_md" || continue
    name="$_PF_NAME"; model="${_PF_MODEL:-sonnet}"
    desc=$(echo "$_PF_DESCRIPTION" | sed 's/|/\\|/g' | LC_ALL=C head -c 200)
    [[ -z "$name" ]] && continue
    echo "| $name | $model | $desc |"
  done < <(for dir in "$SKILLS_ROOT"/*/; do [ -f "${dir}SKILL.md" ] && echo "${dir%/}"; done | sort)
} > "$OUT"
echo "build-skill-index: wrote $OUT"
