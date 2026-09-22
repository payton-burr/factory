# Bigpowers → Atomic integration architecture analysis

Stage: `analyze-atomic-integration`. Research only. Nothing was installed, enabled, or changed; no upstream scripts were executed (the only executions were read-only `node -e` parsers over checked-out files and `gh` API reads).

Evidence bases:
- Upstream pinned checkout `/home/pburr/src/oss/.versions/bigpowers/2.88.2-cbff374` at `cbff374ee2d4095b53a81696262a39f164fa0774` (2026-09-05, "chore(bugs): close BUG-2026-09-05-golden-gate-missing-node-deps ... (PR #120)"). Permalink base: `https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/` (abbreviated `up:` below).
- Atomic `@bastani/atomic@0.9.19-alpha.7` at `/home/pburr/.bun/install/global/node_modules/@bastani/atomic` (docs cited as `docs/...:L`, runtime as `dist/...:L`). Atomic's pinned Pi lineage: `@earendil-works/pi-agent-core@0.85.1`, `typebox@1.3.7` (`package.json` dependencies).
- GitHub state read 2026-09-12 via `gh` as `payton-burr`: PR #122 (open), issue #121 (open), PR #118 (merged 2026-09-01), PR #120 (merged 2026-09-06), issue #119 (closed).
- Local user config: `~/.atomic/agent/settings.json` has `"packages": []` (Bigpowers not installed); `~/.pi/agent/skills/` and `~/.agents/skills/` hold only `writing-for-agents` and `commit-work`. Factory repo: one commit on `main`, no `RULES.md`.

---

## 1. What the upstream package actually ships (and what is generated)

| Surface | Location | Generated? | Notes |
|---|---|---|---|
| Canonical skills | `skills/<name>/SKILL.md` (81 dirs) + sibling `*.md`, `scripts/`, `tests/` | Source | All 81 carry `model:` (25 haiku / 49 sonnet / 7 opus) and `effort:` (76 standard / 5 light) frontmatter pins |
| Pi skill mirror | `.pi/skills/<name>/SKILL.md` (81) | Yes, by `scripts/sync-skills.sh` → `scripts/lib/srp-engine.py` → `scripts/adapters/pi.sh` | Only `SKILL.md` per dir. Body = canonical body **plus every sibling `*.md` inlined** (`srp-engine.py:74-84`), `disable-model-invocation` lines stripped (`:86-89`), relative links rewritten to `../../../skills/<name>/…` (`srp_engine_links.py:9-31`). `effort:` dropped, `model:` kept. Total mirror bytes 498 KB vs 317 KB canonical; `develop-tdd` grows 140→416 lines, `migrate-spec` to 32 KB |
| Pi prompt templates | `.pi/prompts/<name>.md` (81) | Yes (`adapters/pi.sh:26-34`) | Same inlined body as the mirror, so each `/name` expands up to 32 KB into context |
| Pi extension | `extensions/omp-hooks.ts` | Source (ported from fork XcluEzy7 in PR #118) | Registers 81 slash commands, `bigpowers_skill` tool, `session_start` notify, `tool_call` git guard |
| Manifest | `package.json` `pi: { extensions: ["extensions/omp-hooks.ts"], skills: ["./.pi/skills"], prompts: ["./.pi/prompts"] }` (`up:package.json#L35-L45`) | | Also `.pi/package.json` with its own `pi.skills/prompts` (`up:.pi/package.json`) |
| Shell hooks | `hooks/pre-tool-use.sh` (Claude/Cursor/Gemini), `hooks/pre/bash.sh` (OMP process fallback) | Source | Not wired for Pi/Atomic |
| MCP servers | `scripts/mcp-server.js` (zero-dep, reads `skills-lock.json` + `specs/state.yaml`), `bigpowers-mcp/` (MCP SDK ^1.29, node ≥20) | Source | `.mcp.json` points at `bigpowers-mcp/build/index.js` |
| CLI | `bin/bigpowers.js`, `bin/setup.js` (`@clack/prompts`, `picocolors`), `bin/init.js` | Source | `setup` symlinks `skills/*` into `~/.pi/agent/skills` or `<cwd>/.pi/agent/skills` (`scripts/lib/install-helpers.js#L161-L166`, `#L361-L366`); `init` symlinks the **entire** package `scripts/` into the project and creates `specs/bugs`, `specs/verifications` (`#L423-L443`, cites upstream #116) |
| Methodology state | `specs/state.yaml`, `specs/release-plan.yaml`, `specs/execution-status.yaml`, `specs/epics/`, `specs/bugs/`, `specs/verifications/` | Project data | `.npmignore` excludes `specs/` and `docs/*` from the npm tarball |
| ~80 bash/python scripts | `scripts/` | Source | Need `jq`, `yq`, `python3` + `pyyaml` (`requirements.txt`), `gh` |

**Count discrepancy (73 vs 81 vs 80 vs 68):** 81 directories exist under `skills/` and all 81 parse cleanly with Atomic's `yaml`-based frontmatter parser (verified with `dist/utils/frontmatter.js` logic; no name/dir mismatch, no description >1024). One is a tombstone: `skills/define-success/SKILL.md#L5` ("TOMBSTONE - renamed/merged to plan-work"), registered in `specs/tombstones.yaml` at 2.86.4 with a "one-release expiry" that has not been enforced. So **80 active + 1 tombstone = 81**. `README.md#L5` badge says 81 (stamped by `scripts/lib/sync-post.sh:90`), `README.md#L191` says 80, `SKILL-INDEX.md#L111` says "81 active" (it counts the tombstone as ✅ Active), `package.json#L4` "73" is stale hand-written prose that `sync-post.sh:26` merely prefixes ("81 skills — 73 agent skills …" in `.pi/package.json`), and `scripts/mcp-server.js#L2` says 68 (stale). Recommendation for the inventory: canonical set = 81 names, classify `define-success` as *alias/tombstone → plan-work*, not a skill to port.

**Generated-artifact defect at HEAD:** every `path` in `skills-lock.json` is `skills/<name>SKILL.md` (missing `/`), so `scripts/mcp-server.js` `bigpowers_get_skill`/`bigpowers_invoke_skill` cannot resolve any skill (`getSkillContent` → `existsSync` false). Verified for all 81 entries.

---

## 2. Does `omp-hooks.ts` target Atomic's API? (verified, not inferred)

Short answer: it targets the **Pi 0.85.1 `ExtensionAPI`**, which Atomic deliberately aliases, so it *loads and runs* under Atomic, but several behaviors differ from what its author assumed.

| Aspect | Upstream (`up:extensions/omp-hooks.ts`) | Atomic 0.9.19-alpha.7 | Verdict |
|---|---|---|---|
| Import `@earendil-works/pi-coding-agent` (`#L5`) | Pi package | Aliased to Atomic's own index: `dist/core/extensions/loader-virtual-modules.js:376`, `loader-host-modules.js:65`; documented as supported compatibility import at `docs/extensions/authoring.md:35` | Compatible |
| Import `typebox` (`#L6`), declared only as a **devDependency** (`package.json#L58`) | Resolves from `node_modules` in Pi; PR #120 had to add `npm ci` to CI for this | Atomic aliases `typebox` to its bundled copy (`loader-virtual-modules.js:401-406`); `docs/packages/authoring.md` asks for `peerDependencies: "*"` instead | Works by alias; manifest is wrong per Atomic packaging rules |
| Factory-time rule: only registration calls in the factory (`#L239-L245`, fixes #119) | Pi throws stubs during load | Atomic has the identical stub: `dist/core/extensions/loader-runtime.js:20` ("Extension runtime not initialized. Action methods cannot be called during extension loading.") | Compatible; #119-class crash cannot recur |
| `pi.registerCommand(skill.name, …)` × 81 (`#L252-L260`) | Pi registers commands | Atomic dispatches extension commands *before* prompt-template expansion (`dist/core/agent-session-prompt.js:49`, `:373-396`), so at pinned HEAD the extension wins the `/fix-bug` name while autocomplete still lists the prompt template → issue #121 reproduces in Atomic. Extension commands also cannot be queued while streaming (`agent-session-prompt.js:436-438`, `agent-session-message-queue.js:58`), whereas prompt templates can | Duplicate surface; PR #122's direction (drop `registerCommand`, keep `.pi/prompts`) is the right one for Atomic too |
| `bigpowers_skill` tool `run` action → `injectSkillPrompt` (`#L210-L233`, `#L330-L355`) | Assumes `await pi.sendUserMessage()` rejects when streaming, then falls back to `sendMessage(nextTurn)` | Atomic's extension binding is **fire-and-forget**: it swallows the rejection and emits an extension error (`dist/core/agent-session-extension-bindings.js:213-225`). The underlying call throws whenever the agent is streaming without `deliverAs` (`agent-session-prompt.js:94-96`; `docs/extensions/api-reference.md:609-615`) - and a tool call always executes while streaming. Result: `run` returns `{injected: true, via: "sendUserMessage"}` (a false receipt), surfaces a red "Agent is already processing" extension error, and the skill text still reaches the model only because it is echoed in the tool result | Broken/misleading in Atomic; `run` degenerates to `get` plus an error toast |
| `tool_call` guard return `{ block, reason }` (`#L367-L415`) | Pi contract | Same contract: `docs/extensions/events.md:520-527` | Compatible |
| Guard only inspects `event.toolName === "bash"` (`#L368`) | Pi has bash only | Atomic also ships `powershell` (`dist/core/tools/index.js:37,60`) and user `!` commands go through `user_bash` (`docs/extensions/events.md:632`) | Gap on Windows and for user-typed commands (the latter is arguably correct) |
| `currentBranch()` uses `execSync` in `process.cwd()` (`#L159-L168`), never `ctx.cwd` | Same | Atomic runs the same package extension inside fresh subagent children and workflow stages (`docs/subagents.md` "Fresh child sessions use normal Atomic package discovery"; `docs/packages.md:75`), including `worktree: true` children whose cwd differs | Branch check may evaluate the wrong repo in worktree children |
| `session_start` → `ctx.ui.notify("bigpowers: N skills loaded")` (`#L362-L365`) | One notice | Fires in every child/stage session too | Noise; `ctx.hasUI` guard is present via `ctx.ui.notify` no-op in headless modes |
| Skill discovery root `join(pluginRoot(), "skills")` (`#L248`) | Canonical bodies | Atomic's `/skill:<name>` reads `.pi/skills` mirror bodies (from the manifest). So `bigpowers_skill get X` and `/skill:X` return **two different texts** for the same name (canonical with `# story:` lines and relative links vs inlined mirror) | Divergent content per name |
| Name collisions with Atomic builtins | n/a | No overlap between the 81 names and Atomic's registered commands (`agents curator google-account intercom llama mcp mcp-auth search websearch`) or bundled skill names; tool name `bigpowers_skill` is unique | No hard collision |

Conclusion: `omp-hooks.ts` is Pi-targeted and Atomic-tolerant. It is not Atomic-native (no `isToolCallEventType`, no `ctx.cwd`, no `powershell`, no awareness of stages/children), and its most novel piece (the `run` action) misbehaves under Atomic's fire-and-forget `sendUserMessage`.

**Pinned HEAD vs PR #122:** PR #122 (author `jagged-teeth`, opened 2026-09-09, no reviews/comments yet) removes the 81 `registerCommand` calls and keeps `.pi/prompts` as the sole slash provider, retaining native skills, `bigpowers_skill`, the notification, and the git guard. The issue author (#121, `sudo-bakar`) proposed the opposite (drop prompts, keep extension commands). For Atomic, #122's choice is strictly better (templates are the documented lightest mechanism, `docs/build.md:11-13`; templates can be queued while streaming). Neither resolves the remaining triple entry point (`/name` template, `/skill:name`, `bigpowers_skill`).

---

## 3. Concrete behavioral conflicts of the git guard with this user's environment

Verified by running the guard's regexes in isolation (no extension loaded):

1. **Blocks the user's own `commit-work` skill.** `~/.agents/skills/commit-work/SKILL.md` step 6 mandates `git commit -m "$(cat <<'EOF' … EOF)"`. `extractCommitMessage` (`#L179-L184`) captures `$(cat <<'EOF'\nfeat(x): …` and `CONVENTIONAL_RE` (`#L30-L31`) then fails → **BLOCKED** even for a valid Conventional Commit. Verified: `conventional? false`.
2. **Trivially bypassed** by `git commit -F file` (returns `null` → no check), `git push origin HEAD:refs/heads/main` (no `:main` token), `sh -c '…'`, or `bash scripts/land-branch.sh …` (the string contains neither `git commit` nor `git push`). The upstream shell hook has an explicit `GIT_BIGPOWERS_LAND=1` exemption (`up:hooks/pre-tool-use.sh#L8,#L25`), set by `scripts/land-branch.sh#L148` **on itself** - a self-authorizing bypass. The TS port dropped the env check entirely, so the exemption exists only by accident of string matching.
3. **Blocks every commit in this repository.** The factory repo is on `main`; `#L391-L397` blocks any `git commit` on `main|master` unconditionally. Same for any repo where the user works on `main` deliberately.
4. **Policy divergence on attribution.** Upstream `CONVENTIONS.md#L47` and `hooks/pre-tool-use.sh#L107-L110` forbid any AI co-author trailer; the TS extension does not enforce it. The user's `commit-work` skill agrees ("attribute the commit to the user alone"), while Atomic's system prompt carries "Model name (used for commit attribution)". This is a decision, not a bug: the user's existing skill already resolves it in favor of no trailer.
5. False positives: `/git\s+checkout\s+\./` and `/git\s+restore\s+\./` (`#L24-L25`) match `git checkout ./src` and `git restore .atomic/...`; `/git\s+clean\s+-f/` matches the dry-run `git clean -fdn`.

Atomic has no native git guard, but ships the pattern (`examples/extensions/permission-gate.ts`, `docs/extensions/examples.md:32`) using `ctx.ui.confirm` rather than hard blocks, and `isToolCallEventType("bash", …)` typing (`docs/extensions/events.md:537`).

---

## 4. Duplication map: five entry points per skill

At pinned HEAD, one Bigpowers skill would be reachable in Atomic as:

| # | Surface | Mechanism | Who invokes | Body served |
|---|---|---|---|---|
| 1 | `/fix-bug` | extension `registerCommand` | user | canonical (`skills/`) |
| 2 | `/fix-bug` | prompt template `.pi/prompts/fix-bug.md` (filename → command, `docs/prompt-templates.md:26`) | user | inlined mirror |
| 3 | `/skill:fix-bug` | skill `.pi/skills/fix-bug/SKILL.md` | user or model (also in system-prompt catalog) | inlined mirror |
| 4 | `bigpowers_skill {get\|run}` | extension tool | model | canonical |
| 5 | MCP `bigpowers_get_skill` / `read_skill` | either MCP server, if the user configures it | model | canonical (legacy server currently broken by lock paths) |

Plus, if the user also runs `bigpowers setup` for the `pi` target, `~/.pi/agent/skills/<name>` symlinks add a sixth copy that Atomic's legacy discovery loads (`docs/skills.md:29`), producing 81 name collisions resolved via `@user`/`@package` qualified aliases (`docs/skills.md:84-101`, `docs/skills/reference.md:60`). Under `atomic -e <dir>`, Atomic also borrows `<dir>/.pi` project resources (`docs/packages.md:73,139`), and `.pi/package.json` declares its own `pi.skills/prompts`, so a second collision path is plausible; this one is unverified and should be a validation item, not a claim.

Recommendation: **exactly one user surface and one model surface per retained skill**: the Atomic skill (`/skill:name` + system-prompt catalog) is the model surface; a prompt template is justified only for the handful of skills that are genuinely "user shortcut with arguments". The `bigpowers_skill` tool duplicates `ctx.getSkillCatalog()`/`read skill://` and should not be imported. The MCP servers duplicate the same catalog and should not be imported.

---

## 5. State ownership, gates, and approval boundaries

**Upstream control plane.** `specs/state.yaml` is the single source of truth for session state (`up:skills/session-state/SKILL.md#L20-L22`), with a "universal checkpoint pattern" (`#L92-L107`): `epic_cycle.current_step` (build-epic, 9 steps `up:skills/build-epic/SKILL.md#L16-L30`), `bug_cycle.current_step` (fix-bug, 5 steps `up:skills/fix-bug/SKILL.md#L27-L42`), `project_cycle.current_phase` (orchestrate-project, 6 phases), and `handoff.next_skill` as the resume pointer. 29 of 81 skills read/write `state.yaml`; 22 reference `handoff`. Skills mutate it via `bash scripts/bp-yaml-set.sh` or direct edit and commit it as `chore(state): …` (`up:skills/kickoff-branch/SKILL.md#L60`; `release-branch --squash-state` `#L25`). The real `specs/state.yaml` in the repo (`up:specs/state.yaml#L1-L13`) shows the pattern in practice: `handoff.context` is free prose about PR #120.

**Atomic's owners for the same concerns:**

| Concern | Bigpowers owner | Atomic native owner | Import? |
|---|---|---|---|
| Multi-step flow position, resume | `state.yaml` cycle counters + `handoff.next_skill`, edited by the model | Workflow run ledger: tracked stages, checkpoints, pause/resume/connect (`docs/workflows.md:8-18`); `goal`/`loop-until-done` "durable ledger" builtins (`docs/workflows/builtins.md:80-93`); `ctx.tool` durable side effects (`docs/workflows/authoring.md:221`) | No. A model-edited YAML step counter is exactly the state Atomic's executor owns durably |
| Cross-session handoff context | `handoff.context`, `required_reading` | `reads:` on tasks/subagents, artifact files under `.atomic/workflows/runs/…` (`docs/workflows/authoring.md:225-231`), `keepContext` (`:233`) | No |
| Lightweight task tracking | `execution-status.yaml` | `todo` tool (`.atomic/todos`, already used in this repo) | No |
| Quality gates (audit-code gate, F.I.R.S.T, verify-work terminal verdict `up:skills/verify-work/SKILL.md#L60`) | Skill prose + `→ verify:` shell one-liners (50 skills) | Schema-backed stage gates (`docs/workflows/authoring.md:218`), deterministic tool nodes with no model call (`docs/models/model-selection.md:121`), `adversarial-verification` builtin (mean+veto, consolidator cannot approve) | Method text yes; gate mechanics no |
| Approval / merge / release authority | `release-branch` runs `gh pr create` → `gh pr merge --squash --delete-branch` (`up:skills/release-branch/SKILL.md#L33-L34,#L116`) or `land-branch.sh` squash-merge+push to main (`up:scripts/land-branch.sh#L151,#L163`); semantic-release publishes (`#L119`) | Human-input gates (`ctx.ui.confirm/select`), `ask_user_question` policy (`docs/workflows/reliable-design.md:95-97`), `status: "needs_human"` outputs | Do not import automatic merge/push/publish. Merge and release must be a HIL gate in the workflow, never a skill instruction |
| Git safety | `tool_call` hard blocks + self-exempting `GIT_BIGPOWERS_LAND` | Extension `tool_call` with `ctx.ui.confirm` (permission-gate pattern) | Reimplement minimal, confirm-based, no env bypass; see §3 |
| Model routing | `model: haiku/sonnet/opus` on all 81 skills | Ignored by Atomic (`docs/skills/reference.md:56`); policy belongs to the executing session, agent definition, or stage (`docs/subagents.md:206-208`) | Strip; never port |
| Parallel/delegated work (`dispatch-agents` Orca envelopes `up:skills/dispatch-agents/SKILL.md#L58-L69`, `circuit_open` after 3 failures `#L89`; `delegate-task` two-stage review) | Prose protocol the model must emulate | `subagent` tool with typed admission, `parallel`, `worktree: true`, one-level depth (`docs/subagents.md:256`), `contact_supervisor`; workflow `ctx.parallel` with `failFast`, bounded loops | Keep the *brief shape* (goal/in_scope/out_of_bounds/verify) as prompt content; drop the envelope protocol and the counter |
| Skill catalog/search (`search-skills`, `stocktake-skills`, MCP servers) | Local lexical index + two MCP servers | System-prompt skill catalog, `/skill:` autocomplete, `ctx.getSkillCatalog()`, `read skill://` | No |
| Documentation memory | `specs/` YAML + OKF wiki (`specs/skills-wiki`, `specs/codebase-wiki`) | `research/` and `specs/YYYY-MM-DD-topic.md` conventions used by `create-spec`, `research-codebase`, and the `codebase-research-*` agents | Directory-name overlap on `specs/`: Atomic's research agents would index Bigpowers YAML. Decide a namespace (e.g. keep Bigpowers artifacts out of `specs/` root) before any port |

**Unsafe defaults / conflicts with global instructions** (`~/.pi/agent/AGENTS.md`):
- Automatic git actions inside skills (`chore(state)` commits, squash-merge, push to main, semantic-release) conflict with "no automatic git actions" posture and with the factory's single-commit `main`.
- `CHANGELOG.md` is generated by `@semantic-release/changelog` (`up:.releaserc.json`); no skill instructs editing it (grep: 0 hits), so read-only treatment is compatible. Atomic's `write` additionally refuses generated-looking files (`docs/tools.md:88`).
- `bigpowers init` symlinking the whole `scripts/` tree into a project and creating `specs/bugs`, `specs/verifications` is a project mutation that 44 skills assume (`bash scripts/*.sh`) and 50 `→ verify:` gates depend on. Without it, those gates fail outside a Bigpowers checkout (upstream #116 acknowledges this).
- 75 of 81 skills open with "HARD GATE" absolutes; `docs/skills/authoring.md` asks for outcome-first decision rules instead of `ALWAYS/NEVER`, and `docs/workflows/reliable-design.md:475-479` warns that one-line prohibitions are the first thing compaction drops. A port should convert gates into stage contracts/schemas, not preserve them as prose.
- Project trust: package extensions run with full user permissions (`docs/packages.md:39`, `docs/security.md:3-7`). Installing the package project-locally would auto-install on trust (`docs/packages.md:64`).

---

## 6. Which native mechanism should own each concern (proposed organization)

Principle from `docs/build.md:11-19`: stop at the lightest mechanism. Applied:

1. **Skills (retained method/knowledge)** - the bulk. Import *canonical* `skills/<name>/` directories (not the `.pi/skills` mirror) so progressive disclosure survives: `SKILL.md` small, `REFERENCE.md`/siblings loaded on demand (`docs/skills/authoring.md` "Put detailed material in references/"). Strip `model:`/`effort:` and `# story:` lines; rewrite `→ verify:` gates that call `scripts/*.sh`; remove `state.yaml` mutations. Candidates where the knowledge is the value: develop-tdd (compare with bundled `tdd`), audit-code, security-review, diagnose-root, investigate-bug, plan-tests, enforce-first, model-domain, define-language, deepen-architecture, design-interface, extract-design, simple-english, write-document, edit-document, harden-vps, wire-ci, wire-observability, smoke-test, validate-contracts, seed-conventions, grill-me/grill-with-docs, research-first (vs `research-codebase`), scope-work/slice-tasks/plan-work/elaborate-spec (vs `create-spec`), commit-message (vs user `commit-work`: prefer the user's; import only the semantic-release bump note if wanted).
2. **Prompt templates (user shortcuts with `$ARGUMENTS`)** - only skills that are pure "do X to Y now" invocations with an argument: e.g. `quick-fix <desc>`, `change-request`, `assess-impact`, `terse-mode`, `bro`-like helpers. Do not generate one template per skill (that is the #121 failure mode).
3. **Subagents (bounded worker roles with fresh context)** - roles Bigpowers describes as "fresh context" actors: `simulate-agents` Mock User / Auditor, `audit-code --gate` reviewer, `security-review` threat modeler, `request-review`/`respond-review` reviewer. Map onto Atomic's review compositions (`docs/subagents.md` "Review compositions") and bundled `debugger`/`worker`/`codebase-*` agents rather than new agents where they overlap. Agent definitions, not skills, carry model/fallback.
4. **Workflows (orchestration with durable state and gates)** - only the three cycle owners: `build-epic` (story lifecycle), `fix-bug` (investigate → RCA → TDD → validate → HIL release gate), `orchestrate-project` (phase loop). Compose builtins (`ralph`/`goal` for implementation loops, `adversarial-verification` for verify-work/audit-code gate, `fan-out-and-synthesize` for survey/map-codebase) via `ctx.workflow(...)` (`docs/workflows/authoring.md:501-507`). `dispatch-agents`, `delegate-task`, `execute-plan`, `compose-workflow`, `run-planning` are *not* separate workflows: they are execution shapes Atomic already provides (`ctx.parallel`, worker→verifier chain, HIL checkpoint per step, workflow composition). `session-state` becomes the workflow ledger plus `reads:` handoffs.
5. **Extension (event enforcement)** - at most one small extension: a confirm-based git guard using `isToolCallEventType("bash"|"powershell")`, `ctx.cwd`, no env bypass, and no command/tool registration. Everything else in `omp-hooks.ts` is replaced by native capability. Whether even this is needed depends on the user accepting hard-block semantics (§3 item 3); a decision, not a default.
6. **Not imported**: `omp-hooks.ts` as-is; `.pi/skills` and `.pi/prompts` mirrors; both MCP servers; `bin/setup.js`/`init.js` and the `scripts/` symlink model; `hooks/*.sh`; `dashboard/` (`visual-dashboard`); `specs/state.yaml` schema; `skills-lock.json`; `search-skills`/`stocktake-skills`/`craft-skill`/`evolve-skill`/`using-bigpowers` (self-referential catalog maintenance; Atomic has `skill-creator` and the catalog); `context7-mcp` (depends on an external MCP the user has not configured); `generate-allure-report`/`run-benchmark`/`run-evals` (bound to upstream `allure-results/` and benchmark scripts); tombstone `define-success`.

---

## 7. Dependencies and validation prerequisites (before any port)

- Toolchain assumed by scripts: `jq` (guard-git explicitly), `yq` (`sync-skills.sh:74`), `python3` + `pyyaml` (`requirements.txt`), `gh`, Node ≥14 for package, ≥20 for `bigpowers-mcp`. The npm tarball omits `specs/` and `docs/*` (`.npmignore`), so 10 skills referencing `docs/references|templates` and the legacy MCP server's `specs/state.yaml` read are broken in an npm install.
- Atomic-side facts to validate in a throwaway session (not done here): (a) `atomic -e /path/to/bigpowers` load produces 81 `/name` duplicates and the `run`-action error toast as predicted; (b) whether `-e <dir>` also borrows `.pi/` and double-registers skills; (c) heredoc-commit block reproduces end-to-end; (d) `session_start` notice appears in a subagent child.
- Upstream is mid-change: #122 open; the "OMP" extension was added 2026-09-01 (#118), crashed Pi (#119, fixed 2.88.1), broke CI (#120), and duplicated commands (#121). Treat `extensions/` as unstable.

**License/attribution:** MIT (`LICENSE`, © 2026 Daniel VM). `NOTICES.md` credits three MIT sources absorbed into `simple-english` and notes ASD-STE100 trademark limits; `CONTRIBUTORS.md`/README credit favilo and XcluEzy7 for #118 ports. Any port must carry the MIT notice and the `simple-english` third-party notices; Atomic's bundled skills already model this with `license:`/`metadata.method-source` frontmatter (`dist/builtin/workflows/skills/create-spec/SKILL.md`).

**payton-burr upstream contributions:** none. `gh` search for `involves:payton-burr` in `danielvm-git/bigpowers` returns 0; no fork under `payton-burr`; no commits by Payton Burr / pburr in the mirror. There is no prior intent to align with beyond the contract itself.

---

## 8. Role / model / effort recommendation (from Atomic docs and the contract catalog subset only)

Skills and prompt templates carry **no** model; Atomic ignores `model:` in skill frontmatter (`docs/skills/reference.md:56`) and policy belongs to the executing session, agent definition, or workflow stage (`docs/subagents.md:206-208`, `docs/models/model-selection.md:30-32`). The 81 upstream `haiku/sonnet/opus` pins are ignored per contract.

Measured evidence (dates and units as documented; not refreshed live):
- Datacurve DeepSWE v1.1, snapshot 2026-09-03, read 2026-09-05, `pass@1` / `$/task` / steps (`docs/models/evals.md:56-69`): `gpt-6-astra [xhigh]` 74% ±3, $6.52, 29 steps; `claude-opus-5 [max]` 74% ±4, $11.84, 99; `gpt-5.6-sol [max]` 73% ±3, $6.46; `gpt-5.6-luna [max]` 67% ±4, $0.61. `claude-fable-5-1` has **no** DeepSWE row (`model-selection.md:96`).
- AA Intelligence Index v4.3, retrieved 2026-09-08 (`evals.md:141-177`, `191-223`): Terminal-Bench v4.0 - Astra xhigh 60%, high 54%, medium 49%; Fable 5.1 xhigh 55%, high 52% (with default fallback); Opus 5 max 49%; Sol xhigh 25%; Luna max 12%. AA-Briefcase/GDPval-AA v2 (normalized Elo, not pass rates) - Fable 5.1 max 58%/63%, xhigh 58%/62%, high 54%/57%; Opus 5 max 57%/62%; Astra max 53%/54%. AA $/Index task - Astra high $1.72, xhigh $2.31; Fable 5.1 high $3.91, xhigh $5.98; Opus 5 high $3.61, xhigh $4.88; Sol high $0.81; Luna xhigh $0.09.

Proposed **production** efforts follow the role table (`model-selection.md:115-123`), which is explicitly separate from the measurement levels above (`:28-32`). Catalog presence is not access; pin only a `fullId` returned by `workflow({ action: "models" })` at authoring time.

| Proposed executable role (from §6) | Primary | Fallback (same family swap per contract) | Effort basis (proposed, not measured) |
|---|---|---|---|
| Story/bug workflow orchestrator (build-epic, fix-bug, orchestrate-project stage driver) | `openai-codex/gpt-6-astra:medium` | `anthropic/claude-fable-5-1:medium` | Orchestration role `low/medium`; Astra's 29-step DeepSWE profile and AutomationBench 65-68% favor it for tool-heavy loops; matches bundled `goal`/`ralph` defaults (`builtins.md:95-103`) |
| TDD / implementation worker (develop-tdd, quick-fix, execute-plan slices) | `openai-codex/gpt-6-astra:medium` | `anthropic/claude-fable-5-1:medium` | Coding `low/medium`; measured Astra xhigh 74% DeepSWE is the ceiling, not the default |
| Failure analysis / RCA (diagnose-root, investigate-bug, validate-fix) | `openai-codex/gpt-6-astra:high` | `anthropic/claude-fable-5-1:high` | Failure analysis `high/xhigh`; Terminal-Bench v4.0 Astra high 54% vs Fable 5.1 high 52% (near tie); bundled `debugger` already defaults Astra medium with high fallbacks - reuse it instead of a new agent |
| Reviewer / audit gate / security-review (fresh context) | `anthropic/claude-fable-5-1:high` | `openai-codex/gpt-6-astra:high` | Reviewer `high/xhigh`; provider diversity from the worker is the point (`ralph` reviewer A pattern); no benchmark establishes security-review reliability (`model-selection.md:129`) |
| Planner / spec / architecture (plan-work, elaborate-spec, deepen-architecture, model-domain) | `anthropic/claude-fable-5-1:high` | `anthropic/claude-opus-5:high` | Planning `high`; AA-Briefcase/GDPval Elo leads for Fable 5.1 (58/63 at max, 54/57 at high) are knowledge-work proxies, not repo-planning pass rates |
| Research / survey synthesis (survey-context, research-first, map-codebase) | `openai-codex/gpt-6-astra:high` | `anthropic/claude-fable-5-1:high` | Research `high` for reconciliation, `medium` routine; Astra leads GDP.pdf (31-32%) and non-hallucination (52-55%) among the subset |
| Cheap bounded workers (stocktake-style scans, doc rewrites, simple-english passes) | `openai-codex/gpt-5.6-luna:high` | `openai-codex/gpt-5.6-sol:medium` | Budget role; Luna max 67% DeepSWE at $0.61 but 7% non-hallucination - keep to tasks with mechanical verification |
| Final user-impact report | `anthropic/claude-fable-5-1:medium` | `openai-codex/gpt-6-astra:medium` | Reporting `medium` |
| Deterministic gates (tests, typecheck, schema, `→ verify:` commands) | none | none | `ctx.tool`/tool nodes, no model call (`model-selection.md:121`) |

Uncertainty: Fable 5.1 lacks a DeepSWE row; AA Elo displays are rounded ties at 53 index points across four configs (`evals.md:179`); AA costs are per Index task, not Atomic task costs; `max` is excluded as a role default (`model-selection.md:123`). Fallback policy: same role, other family, same supported level; if `xhigh` is unsupported on a candidate use `high`, never promote to `max`.

---

## 9. Prioritized recommendation (research only; no implementation performed)

1. **Do not install the upstream package or enable `omp-hooks.ts`.** Every surface it adds duplicates a native one, and its guard conflicts with the user's `commit-work` skill and the factory's `main`-branch workflow. Track PR #122; even merged, the triple entry point and the `run` false receipt remain.
2. **Port canonical skill directories selectively as Atomic skills** (from `skills/`, not `.pi/skills`), stripping model pins, story comments, `state.yaml` mutations, and script-bound verify gates; dedupe against bundled `tdd`, `create-spec`, `research-codebase`, `skill-creator`, `qlty`, and user `commit-work`.
3. **Express the three cycles (build-epic, fix-bug, orchestrate-project) as at most two or three composed workflows** with a HIL gate before any merge/push/publish, using builtins by composition; make `state.yaml` semantics the workflow ledger and `reads:` artifacts. Keep the `→ verify:` intent as deterministic tool nodes.
4. **Recast fresh-context roles as review compositions / existing bundled agents**; add new agent definitions only for Mock User / Auditor if the bundled set cannot express them.
5. **Optional, decision-gated extension**: a confirm-based git safety hook, only if the user wants hard interception; otherwise rely on `commit-work` + `ask_user_question`.
6. Reserve prompt templates for a short list of argument-taking shortcuts.

Acceptance checks to recommend for a later implementation stage (not executed): `/skill:` catalog shows each ported name exactly once with no `@`-qualified aliases; `atomic` autocomplete shows no `/name` duplicates; a heredoc Conventional Commit on a feature branch is not blocked; a `git push origin main` in a workflow reaches a HIL prompt, not an automatic merge; no ported skill references `scripts/*.sh` or `specs/state.yaml`; every workflow stage that pins a model uses a `fullId` present in `workflow({ action: "models" })` with a listed thinking level; MIT + `simple-english` notices present.

**Unresolved decisions for the user:** hard-block vs confirm git guard; whether Bigpowers artifacts may live under `specs/` alongside Atomic's `specs/YYYY-MM-DD-topic.md` convention; whether to keep solo-local landing at all (it is inherently "push to main"); whether `develop-tdd` supersedes the bundled `tdd` skill or merges into it; whether to wait for #122 before mirroring any upstream extension behavior.