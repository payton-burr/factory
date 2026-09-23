# Upstream

Vendored from [danielvm-git/bigpowers](https://github.com/danielvm-git/bigpowers) 2.88.9, commit `812d57a917675f8b9929d1519f5038dc1d01917f`, MIT license. This package ports the upstream [pi support](https://github.com/danielvm-git/bigpowers/tree/main#-pi-support) to Atomic.

## Contents

| Path | Source |
|:--|:--|
| `skills/` | upstream `skills/`, all 81 skills with their sibling files |
| `prompts/` | one template per skill, replacing upstream `.pi/prompts/` |
| `extensions/bigpowers.ts` | upstream `extensions/omp-hooks.ts` |
| `scripts/` | the upstream scripts the skills run, plus their helpers |
| `docs/`, `profiles/`, `SKILL-INDEX.md` | files the skills link to |
| `LICENSE`, `NOTICES.md`, `requirements.txt` | unchanged |

Upstream's `pi install` path needs `bigpowers init`, which symlinks `<project>/scripts` to the package. This package needs no provisioning. Skills call packaged files by paths relative to the skill directory, for example `bash ../../scripts/bp-timing.sh start survey-context`. Atomic resolves these paths against the skill's location. Scripts treat the working directory as the project.

## Local changes

- Skill Markdown: references to packaged `scripts/`, `docs/`, `profiles/`, `skills/` and `SKILL-INDEX.md` are rewritten as skill-relative paths. References to files the upstream package does not ship stay project-relative. These include `scripts/sync-skills.sh`, `scripts/install.sh`, `scripts/audit-catalog.sh`, `scripts/run-verification-gates.sh` and `scripts/setup.sh`, which only exist in a bigpowers checkout or in the user's project.
- `skills/extract-design/package.json` marks the skill's helpers as ES modules. Upstream relied on Node's module syntax detection, which prints a warning on every run.
- Prompt templates: upstream prompts copied each skill body, so their relative links and script paths did not resolve. Each prompt now tells the agent to load its skill and passes `$ARGUMENTS` through.
- Extension: imports types from `@bastani/atomic`, and adds the skill location to `bigpowers_skill` `get` and `run` output so relative paths resolve. The `sendMessage` fallback no longer passes `attribution`, which Atomic does not accept.
- Scripts: package resources come from the script location (`BIGPOWERS_ROOT`). Project state comes from the working directory (`REPO_ROOT="$PWD"`). This matches what upstream scripts saw through the `scripts/` symlink. `SKILLS_ROOT` is the project's `skills/` when present, otherwise the packaged skills. `build-skill-index.sh` always indexes the packaged skills. Self-tests write fixtures to temporary directories, not into the package or the project. `run-skill-verify.sh` resolves `../` paths in `→ verify:` lines against each skill directory. Its negative fixture moved from upstream `specs/` to `scripts/fixtures/`.
- Fixed upstream bugs: `bp-yaml-snapshot.sh` and `build-skill-index.sh` read `REPO_ROOT` before setting it.

## Requirements

Scripts need `bash`, `git`, `perl` and `python3`. Most also need PyYAML. A project `.venv/bin/python3` takes precedence over `python3` on `PATH`. The `extract-design` helpers need Node. `align-grid/scripts/verify_grid.js` needs Chrome and `puppeteer-core`, supplied through the `CHROME` and `PUP` environment variables.

## Updating

Copy the same paths from a newer upstream release, then reapply the changes above. Run `node --test tests/*.test.mjs` from the repository root. It checks for symlinks, unresolved skill-relative paths, and project-relative references to packaged files. It also runs script self-tests from a scratch project.
