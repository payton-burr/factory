# Bigpowers assessment: assigned 41-skill partition

## Recommendation

Do not install Bigpowers unchanged. Retain its useful methods, reuse Atomic's existing execution controls, and separate delivery authority from implementation.

For these **41 assigned canonical entries**, I recommend:

| Primary mechanism | Count |
|---|---:|
| Skill | 28 |
| Prompt template | 3 |
| Subagent | 2 |
| Workflow component | 7 |
| Extension | 1 |
| **Total** | **41** |

“Workflow component” does **not** mean seven independent workflows. Most belong inside one implementation/verification workflow or one separately authorized delivery workflow.

`define-success` is a tombstone. Its prompt-template classification means an optional, temporary compatibility redirect, not a new feature.

### Scope and evidence

- Source commit verified as `cbff374ee2d4095b53a81696262a39f164fa0774`, version `2.88.2`.
- Actual source contains **81** canonical `skills/*/SKILL.md` files. Generated `.pi/skills` and `.pi/prompts` each contain 81 entries. These are mirrors, not additional canonical skills.
- The package description's “73” is stale inventory metadata. See the [manifest](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/package.json#L1-L40).
- This partition covers exactly the 41 requested names. It does not classify the other 40.
- I read the assigned canonical skills and relevant supporting references/scripts. Findings below are **static source findings**, not claims of reproduced integration failures.
- No upstream setup, sync, bootstrap, verification, installation, publication, or deployment scripts were executed. No source or settings were changed.

The research artifact `research/bigpowers-assessment/partition-b-classifications.json` contains all 41 records with current behavior, primary and secondary mechanisms, rationale, reuse, adaptations, validation requirements, and pinned-source range information. The complete human report follows.

## Atomic mechanism boundaries

The recommendations use these native contracts:

| Mechanism | Appropriate ownership |
|---|---|
| **Skill** | Reusable method or domain knowledge, loaded when relevant. It does not grant tools, permissions, or delegation authority. |
| **Prompt template** | A lightweight user-invoked shortcut. It should not become another scheduler or silently change models. |
| **Subagent** | A bounded, non-interactive specialist with isolated context. The parent owns questions, scope changes, and consequential decisions. |
| **Workflow** | Durable execution order, dependencies, artifacts, checkpoints, human gates, bounded remediation, and resumability. |
| **Extension** | Cross-cutting event handling or tool interception that cannot be expressed more clearly within a particular workflow. |

Atomic references, relative to `/home/pburr/.bun/install/global/node_modules/@bastani/atomic/docs/`:

- `skills.md:74-81,105-149` and `skills/reference.md:49-60`: progressive disclosure, native commands, collision handling, ignored unknown frontmatter.
- `prompt-templates.md:5-19,69-78`: shortcut semantics and argument expansion.
- `subagents.md:8-10,49-55,105-134`: bounded delegation, non-interactivity, available roles, no generic bundled reviewer.
- `workflows/authoring.md:161-171,218-221,501-507`: ownership boundaries, acyclic topology, structured gates, durable side effects, composition.
- `workflows/builtins.md:83-99,153-206`: reusable patterns, Goal/Ralph, and separate opt-in final actions.
- `extensions/events.md:510-526,630-675,712-780`: tool interception, separate user-shell handling, input ordering, and native workflow observation.
- `security.md:7-36`: project trust is not a sandbox; Atomic does not provide a built-in shell-command allow/deny policy.
- `workflows/verification.md:9-34,81-105,124-126`: project checks, candidate-bound evidence, truthful skips, and separate publication authorization.

All upstream `model:` and `effort:` recommendations are excluded from the proposed policy.

## Detailed classifications

Each row distinguishes the source's current instructions from the proposed Atomic organization. Validation describes future acceptance tests, not tests run during this assessment.

### 1–10

| Skill and source | Current behavior, inputs, outputs, side effects | Primary, secondary ownership, rationale and reuse | Required adaptation | Validation before integration |
|---|---|---|---|---|
| **align-grid** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/align-grid/SKILL.md#L20-L108) | Takes an editorial-page brief and grid parameters. Generates CSS/HTML and optical-alignment JS; renders through Puppeteer. Also directs public image hosting and publication. | **Skill.** Retain specialized grid-design knowledge alongside `impeccable`. Existing UI verification owns measurement; `playwright-cli` supplies Atomic's browser route. A complete design task may reuse `open-claude-design`, but this method needs no scheduler. | Make Swiss styling an explicit design choice. Remove Hyperagent-only tools and automatic publishing. Reconcile scaffold selectors with verifier `.opt-align`; inspect every grid rather than using the first grid's coordinates globally. Do not adopt unconditional `--no-sandbox`. | Missing overlays and optical targets must fail rather than pass vacuously. Test second-spread misalignment, font fallback, narrow/wide viewports, keyboard access, and whether baseline assertions actually detect defects. See blocker A below. |
| **audit-code** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/audit-code/SKILL.md#L15-L137) | Self-reviews changed code, prioritizes churn hotspots, applies a checklist, may fix failures, writes an audit report and handoff. `--gate` describes terminal verdicts; `--parallel` invokes a worktree helper. | **Skill.** The source explicitly says this is the author's self-review, not an independent reviewer. Keep that ownership in the implementation session. Reuse `qlty` and project checks for mechanical findings; independent review remains separate. | Do not import Bigpowers-only output-directory, GitHub, file-size, or naming rules as universal policy. Separate model judgment from executable checks. Remove automatic state writes and out-of-scope repairs. Preserve the actual uncommitted candidate. | Seed a correctness/security defect and verify failure. Check staged, unstaged and untracked coverage, quick-mode omissions, report freshness, and worktree preservation. The helper only creates a detached worktree; it does not run the audit. |
| **build-epic** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/build-epic/SKILL.md#L13-L104) | Reads epic/state/status artifacts; sequences threat modeling, survey, planning, branching, TDD, verification, audit, commit and release. Updates counters, timestamps, BCP and generated trace/wiki artifacts. | **Workflow.** Make this the story-oriented mode of a shared implementation workflow. Retained skills supply methods; Atomic owns checkpoints and remediation. Reuse `goal` or `ralph` only where their contracts fit. Delivery is a separate boundary. | Resolve story-versus-epic scope, `step` versus `current_step`, and initialization that starts at step 1 despite threat modeling at step 0. Replace YAML scheduling with one native owner. Remove implicit sync/publication. Materialize retries as distinct DAG nodes. | Resume at every boundary without duplicated commits or delivery. Audit/F.I.R.S.T failure must block advancement. Threat modeling must not disappear on initialization. Concurrent workers must not overwrite shared status. |
| **commit-message** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/commit-message/SKILL.md#L19-L59) | Reads Git or Jujutsu changes and conversation intent. Proposes commit grouping, Conventional Commit messages and heuristic release impact; writes a release handoff. | **Prompt template.** A draft-message shortcut can reuse installed `commit-work`; a second commit-method skill or agent would duplicate it. Keep repository-specific release interpretation as optional reference material. | Drafting must not authorize staging, committing, pushing or releasing. Read actual release configuration rather than promising a bump. Preserve user-only attribution and observed signing conventions. Remove `next_skill` mutation. | Mixed changes produce separately scoped proposals. Draft-only use leaves index/history untouched. Verify custom analyzer rules, breaking-change footers, Git/Jujutsu differences and absent release tooling. |
| **context7-mcp** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/context7-mcp/SKILL.md#L11-L57) | Resolves a library and queries documentation under a three-call cap. Reports `CONTEXT7_UNAVAILABLE`; reads/writes a local documentation cache. | **Skill.** Retain bounded documentation-retrieval and uncertainty guidance. Reuse Atomic's MCP gateway rather than adding a Context7 extension or client. | Repository manifests/lockfiles and the required exact-version OSS checkout remain authoritative. “Current docs” cannot replace that evidence. The cache stores ETags but does not itself issue conditional HTTP requests. Avoid duplicating native caching. | Test unavailable server, wrong version, no match, quota, timeout, stale cache and malformed response. Missing evidence must remain explicit, not become an unlabeled training-data answer. |
| **deepen-architecture** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/deepen-architecture/SKILL.md#L12-L116) | Explores architecture/churn, scores module depth, presents candidates, interviews the user, and may update domain language, ADRs and shell import boundaries. | **Skill.** Keep the interactive design method in the parent. Reuse `how`, `codebase-analyzer` and pattern-finding roles for bounded investigation. Optional alternative designs can use `generate-and-filter`; no mandatory three-agent fan-out. | Adapt vocabulary and document paths to the project. Resolve `docs/adr` versus `specs/adr` disagreement. Do not impose Bigpowers shell import rules on unrelated stacks. Do not delete existing tests until replacement behavioral coverage is demonstrated. | Reject abstractions without a concrete forcing function. Preserve ADR intent and behavior. Alternatives must differ meaningfully. No architecture or documentation mutation before scope is settled. |
| **define-success** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/define-success/SKILL.md#L1-L13) | A transition stub that redirects to `plan-work`. No independent method or substantive output. | **Prompt template**, only as an optional deprecated redirect. Default recommendation is **no new resource** unless existing users need the alias. Its behavior belongs to `plan-work`. | Keep the exact name in the canonical inventory without inventing a success-definition capability. Hide any compatibility alias from automatic skill selection and give it an expiry. | Alias resolves once, reaches the intended owner, and does not produce duplicate command registration. Removing it must not remove the real planning capability. |
| **deploy** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/deploy/SKILL.md#L11-L111) | Detects a build command and deployment target from manifests/environment. Builds, checks nonempty output, deploys, polls/retries and probes a live URL. | **Workflow.** A deployment mode of the shared delivery workflow should own external mutation and observation. Reuse existing platform CLI/MCP, Atomic durable tools, and smoke-test guidance. | Credentials and a `main` branch are not production authorization. Require an explicit environment and immutable artifact identity. Replace placeholder status/retry commands. Reconcile unknown submission outcomes before retrying. Add deadlines to health requests. | Declined approval causes no deployment. Exercise missing/stale artifact, timeout, platform rejection, duplicate-submit prevention and accepted-but-unhealthy deployment. HTTP reachability must not be mislabeled as complete application health. |
| **develop-tdd** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/develop-tdd/SKILL.md#L16-L137) | Requires a plan and feature branch. Runs vertical RED/GREEN cycles, mandates separate failing-test and implementation commits, creates stash checkpoints, updates task/state ledgers and requests UAT. | **Skill.** Reuse Atomic's bundled `tdd` as the method owner, with approved workers executing it inside the implementation workflow. Do not add a TDD-specific scheduler. | Explicitly reject automatic RED commits and stash/drop operations unless separately adopted. Preserve failing-test evidence without requiring red CI history. Remove implicit state/sync/commit actions. The linked CI dry-run section is absent from its reference. | RED must fail for the intended behavior, not missing dependencies or a syntax error. GREEN reruns the same scenario. No unexpected commits/stashes. Skipped RED checks cannot count as proof. See blocker B. |
| **diagnose-stall** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/diagnose-stall/SKILL.md#L11-L55) | Reads YAML state/locks, inspects terminals, classifies waits/exhaustion/I/O, recommends one recovery action and writes a stall report. | **Skill.** Retain diagnostic reasoning, but reuse native task/workflow observation and control notices. A second idle watchdog or scheduler would duplicate Atomic. | Distinguish waiting approval, live provider work, paused execution and unavailable telemetry. Use owned task IDs rather than arbitrary PID killing. Silence or unchanged `next_skill` is not proof of failure. | A quiet provider call is not restarted; pending approval is preserved; a stop request is not reported as completed termination. Reconnection cannot cause duplicate dispatch. |

### 11–20

| Skill and source | Current behavior, inputs, outputs, side effects | Primary, secondary ownership, rationale and reuse | Required adaptation | Validation before integration |
|---|---|---|---|---|
| **edit-document** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/edit-document/SKILL.md#L10-L24) | Examines history, divides an existing document into dependency-ordered sections, confirms structure, and rewrites with a 240-character paragraph limit. | **Prompt template.** This is a short user-invoked editing recipe. Reuse `unslop`; apply `writing-for-agents` when the target is agent instructions. | Make paragraph length a preference, not a universal correctness criterion. Preserve facts, quotations, technical obligations and uncertainty. Respect read-only `CHANGELOG.md` and generated files. | Compare meaning, links, identifiers and obligations before/after. Prohibited files remain untouched. Needed structural decisions use the question tool; already-resolved preferences are not asked again. |
| **enforce-first** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/enforce-first/SKILL.md#L13-L47) | Reviews F.I.R.S.T criteria per test file, supports full/quick modes, applies fixes and reruns tests. Its mechanical verification checks that rubric words exist. | **Skill.** Keep the test-quality rubric within `tdd`/audit. Existing test runners own behavioral checks; text searches are not enforcement. | Do not import all of `CONVENTIONS.md`. State quick-mode omissions. Separate read-only review from authorized repair. Test independence and repeatability empirically where possible. | Plant order dependence, nondeterminism and missing assertions. The rubric must identify them. Distinguish absent documentation from a failing or inadequate suite. |
| **execute-plan** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/execute-plan/SKILL.md#L10-L56) | Reads active epic tasks/dependencies, starts fresh contexts, executes and verifies each task, asks per-step approval, and updates decisions/status. | **Workflow.** Use a human-checkpoint mode of the same implementation workflow as `build-epic`. Atomic owns task order and pauses; workers own bounded implementation. | Replace `state.yaml`-only context with explicit contracts/artifacts. Preserve stop-after, reorder and autonomy choices. Parse explicit dependencies rather than extracting scheduling semantics from prose. Bound repair attempts. Delivery stays separate. | Resume preserves task order and approvals. Red verification blocks advancement. Cancelled questions do not approve work. Repeated repair nodes have unique identities and report remaining work accurately. |
| **find-way** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/find-way/SKILL.md#L13-L100) | Creates a map issue and decision tickets, labels/dependencies, assigns work, starts research, posts resolutions, closes issues and creates newly specified tickets. | **Skill.** Its central value is the user-led decision-map method. Optional research workers can use existing research roles. Do not require a permanent project workflow. | Resolve its direct conflict with Bigpowers' ban on automated issues. Choose tracker or local artifacts explicitly. Atomic `todo` is a possible local adaptation, not an equivalent implementation of tracker dependencies. Remove automatic fan-out and obsolete command aliases. | No tracker mutation without authorization. Refresh/claim handles concurrent changes. Charting does not silently resolve decisions. Preserve the one-ticket-per-session rule if adopted. |
| **gate-trace** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/gate-trace/SKILL.md#L14-L97) | Reads/regenerates trace and blind-spot inputs, applies verdict/confidence rules, performs model refutation, invokes a completeness critic and writes gate/handoff state. | **Skill**, as policy/reference knowledge. The **deterministic reducer** belongs inside shared verification/delivery; the adversarial critique is a separate bounded judgment. No global extension or one-skill workflow. | Define complete precedence and the 60–79% interval; reconcile omitted R6; prevent drift handling from improving FAIL to CONCERNS. Missing inputs cannot silently authorize merging. Separate the critic's exit status from the full semantic verdict. | Truth-table every rule and threshold, combinations, malformed/missing input and downgrades. FAIL must never improve through later checks. Required unknown evidence blocks or explicitly escalates. See blocker C. |
| **grill-me** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/grill-me/SKILL.md#L10-L43) | Interviews about design assumptions, distinguishes facts from decisions, optionally checks docs, and prevents implementation/spec-writing before confirmation. | **Skill.** Keep conversation-led decisions in the parent. Reuse `ask_user_question`, `how`/`why` and planning discovery. A non-interactive subagent is the wrong primary owner. | Consolidate docs-mode ownership with `grill-with-docs` instead of keeping duplicate methods. Discover facts independently. Ask only unresolved decisions with options. Preserve existing authorization rather than requesting ritual reapproval. | Facts do not become user questions. Unresolved hard decisions block transition. Cancellation is not approval. No surprise specification or implementation writes. |
| **guard-git** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/guard-git/SKILL.md#L12-L45) | Installs cross-client hook/settings bundles. The shell helper blocks regex patterns; the OMP extension adds partial branch/commit checks to `bash` calls. | **Extension.** This is the clear cross-cutting event-enforcement candidate. Retain an opt-in setup/policy reference. Repository/server protections remain separate. Atomic has no built-in command allow/deny policy to claim as a replacement. | Do not port its command-discovery monolith. Reconcile promised versus implemented secret/author checks and inconsistent landing exemptions. Handle command cwd, `git -C`, wrappers and relevant tool variants. State bypass limits; this is not a sandbox. | Test dangerous and harmless command variants, reordered flags, scripts, aliases, `master` default push, worktrees and remote targets. User shell commands remain outside policy unless explicitly included. See blocker D. |
| **hook-commits** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/hook-commits/SKILL.md#L12-L95) | Installs Husky/lint-staged/Prettier, modifies `prepare` and hook/config files, formats staged files, then stages and commits setup. | **Skill.** A repository setup recipe is not an Atomic extension simply because it creates Git hooks. Reuse existing hook manager, formatter and checks. `commit-work` runs only with commit authorization. | Inspect exact dependency versions and existing configuration first. Recognize modern `bun.lock`, not only `bun.lockb`. Preserve `prepare` and lint-staged settings. Remove blanket formatting and automatic commit. | Test existing configurations, package-manager variants, missing test/typecheck scripts and repeat setup. Unrelated staged or generated files must not change. |
| **investigate-bug** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/investigate-bug/SKILL.md#L10-L127) | Reads bug history, assesses security impact, delegates four-phase RCA, requires verified cause, writes a TDD fix plan and registry entry, and suggests branch creation. | **Subagent.** A bounded investigation can return reproduction evidence and a fix plan in isolated context. Reuse the debugger with an explicit investigation-only scope. Parent owns intake questions, registry mutation and implementation permission. | The default debugger can fix code, so it cannot be reused unchanged for this read-only role. Supply the user's observable scenario. Keep source citations beside durable behavioral descriptions instead of banning file paths. Resolve bug-file writing ownership. | Reproduce the original scenario and falsify competing causes. Unverified cause remains unresolved. No production patch, branch, commit or duplicate registry entry. |
| **maintain-wiki** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/maintain-wiki/SKILL.md#L13-L66) | INGEST runs broad skills/conventions/agent-guide generation. LINT checks stale/orphan/contradictory concepts. QUERY searches OKF bundles. | **Skill.** Keep optional query/lint guidance and an explicitly authorized generation operation. Reuse native search/read, `research-codebase` and existing documentation builds. No automatic background sync extension. | Separate read-only operations from generation. Under the current generated-file policy, ingestion is not authorized. Prefer source references if no actual OKF consumer needs another representation. Modification times are not semantic freshness. | Query/lint causes no writes. Detect source deletion and broken references. Any future generator test must establish explicit output scope, idempotence and no unrelated mirror changes. |

### 21–30

| Skill and source | Current behavior, inputs, outputs, side effects | Primary, secondary ownership, rationale and reuse | Required adaptation | Validation before integration |
|---|---|---|---|---|
| **migrate-spec** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/migrate-spec/SKILL.md#L20-L111) | Detects GSD/spec-kit/BMAD layouts, asks about ambiguity, maps artifacts/IDs into Bigpowers specs and trace files, and regenerates state. Its reference also writes `CLAUDE.md`. | **Skill.** This is an occasional interactive transformation, not justification for a permanent migration workflow. Reuse existing parsing, diffing and schema checks; bounded extraction can be delegated when useful. | Resolve “never overwrite” versus “always regenerate state.” Preserve foreign sources and active execution history. List every target, including instruction files outside `specs/`. Adapt mappings to the actual current artifact layout. | Test multiple/partial fingerprints, mixed IDs, collisions, active work, refusal, merge and skip. Verify unchanged sources, no lost state, and an idempotent second pass. |
| **orchestrate-project** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/orchestrate-project/SKILL.md#L9-L68) | Coordinates a six-phase lifecycle, phase counters, quality gates, skill/model routing, story sequencing, confirmations and release snapshots. | **Workflow.** An optional project coordinator can compose planning, implementation and delivery. Native workflow composition replaces its YAML scheduler. Only use it for genuinely multi-phase projects. | Remove upstream model routing. Resolve per-story releases inside BUILD versus later project VERIFY/RELEASE. Replace unsupported timing/quality claims with explicit criteria. Fast-track cannot imply approval of external effects. | Pause/resume each phase, reject missing evidence, preserve human stops and task-scoped inline overrides. Verify one delivery owner and acyclic bounded remediation. |
| **plan-refactor** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-refactor/SKILL.md#L9-L79) | Interviews, verifies repository assertions, captures invariants/scope/testing decisions, and writes a small-green-step refactor plan to `REFACTOR_LATEST.md`. | **Skill.** Planning is not execution of its proposed commits. Reuse `create-spec`, `how`, codebase analysis and pattern finding. | Keep evidence paths in an appendix rather than banning them. Avoid clobbering an unrelated `LATEST` plan. Do not infer branch/commit authority. Characterize existing behavior when tests are insufficient. | Every step preserves named invariants and has a runnable verification command. The plan distinguishes structural from behavioral changes and records explicit exclusions. |
| **plan-tests** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-tests/SKILL.md#L10-L42) | Maps epic behaviors to P0–P3 scenarios, test levels, fixtures and NFR commands; writes a test plan with scenario IDs and a planning handoff. | **Skill.** Reuse `tdd`, `create-spec` and project testing patterns. A bounded test-design specialist is optional for complex work, not mandatory for every epic. | Correct the reference's scenario-ID mismatch and hardcoded `e32` verification. Do not silently waive required NFRs with `--lite`. Fixture choices require actual stack/version evidence. Remove model pins. | Scenario IDs join to stories and acceptance criteria. P0 behaviors have appropriate coverage. Commands target the right environment. Planning writes no production or test implementation. |
| **publish-package** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/publish-package/SKILL.md#L10-L71) | Detects registry, checks prerequisites/version/build, publishes, and checks registry visibility. References offer dry-run and bypass options. | **Workflow.** Use registry publishing as a mode of the shared delivery workflow. Atomic owns the explicit approval, durable command and outcome reconciliation. | Remove the TestPyPI upload from dry-run, `--no-verify` bypass and changelog-edit instruction. Specify package, version, registry and visibility. Bind approval to the artifact; reconcile an uncertain publish before retrying. | Dry-run performs no remote mutation. Declined approval prevents publishing. Test duplicate version, partial failure, wrong registry and stale artifact. Resume cannot publish twice. See blocker E. |
| **release-branch** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/release-branch/SKILL.md#L19-L142) | Runs gates; chooses solo/PR/keep/discard; may squash, commit, push and merge; archives epics, waits for CI, deletes branches/worktrees and updates release state. | **Workflow.** Make branch integration a delivery mode, with verification inputs from implementation. Reuse `commit-work`, Git/gh and native durable tools. | Remove “prefer solo-local if unsure.” Keep commit, push, PR, merge, tagging, publishing and destructive cleanup authority distinct. Fix CI-unverified success and cancelled-run handling. Do not force-remove dirty worktrees. Audit fallback status propagation. | Exercise refusal at every action, dirty worktrees, protected-branch rejection, failed pushes, missing gh and cancelled/timed-out CI. No false “released,” no replayed mutations. See blocker F. |
| **research-first** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/research-first/SKILL.md#L13-L56) | Searches repository, skills, package registries, opensrc cache and web; records adopt/extend/compose/build decisions in scope/story notes. | **Skill.** Reuse `research-codebase`, native research agents and web/code/MCP tools. The value is evidence-based reuse selection, not another search engine. | Replace opensrc/npx fallback with the required exact-version source checkout process. Use the native skill catalog rather than regenerating a Bigpowers index. Preserve valid YAML when appending prior-art notes. | Every candidate has versioned evidence and a fit decision. Missing evidence stays explicit. No surprise package installation or generated-index writes. “Build” explains why existing solutions are insufficient. |
| **respond-review** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/respond-review/SKILL.md#L9-L72) | Reads all findings, classifies must/should/consider, asks about design suggestions, applies changes, runs checks and reports dispositions. | **Skill.** Feedback handling is a method used by the shared repair stage. Reuse Goal/Ralph's original-contract discipline and worker/debugger roles. | Reproduce disputed failures before fixing. Keep the original acceptance criteria. Record fix, disagreement, defer or clarification for every finding. Review feedback does not grant commit/merge authority. | No silently dropped finding. Final checks refer to the final candidate. Architecture decisions return to the parent. Repeated review rounds cannot redefine the original objective. |
| **run-evals** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/run-evals/SKILL.md#L11-L39) | Defines capability/regression evals, code/model graders, stability tiers and promotion rules; repeats runs and reports `pass@k`; required failures block BUILD. | **Skill.** Retain evaluation design. Existing verification workflows/tools own repetitions; rubric graders are separately configured roles. Reuse `skill-creator` or `prompt-engineer` for their matching tasks. | Correct terminology: successes divided by runs and “all k pass” are not the usual pass@k metric. Reconcile tier wording, retain each run, calibrate model graders, and distinguish grader uncertainty from code exit status. | Seed regressions and grader mistakes. Test promotions, missing runs and flakes. Required failure blocks. A rubric score cannot replace execution of a required command. |
| **scope-work** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/scope-work/SKILL.md#L13-L64) | Reads planning context, interviews as needed, writes bounded scope with exclusions/constraints/success criteria and maps work to future stories. | **Skill.** Reuse `create-spec` scope definition and native questioning. No separate workflow is needed merely to produce a scope artifact. | Preserve previously answered questions. Resolve `product/` versus `requirements/` paths. Allow explicit deferred mappings before IDs exist. Do not force Bigpowers YAML onto every project. | Requirements are observable and mapped/deferred; exclusions have reasons. Scope states what/why rather than prematurely prescribing implementation. Existing scope is refined, not overwritten. |
| **security-review** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/security-review/SKILL.md#L26-L120) | Resolves Git diff, researches security context, traces data flow, filters confidence/exclusions and writes findings or an epic threat model. Can create detached review worktrees. | **Subagent.** Independent, bounded security assessment benefits from isolated context. Parent owns exceptions, fixes and release decisions. Compose native analyzer/research/debugger-inspection capabilities; Atomic has no generic bundled security reviewer to claim as an exact replacement. | Replace blanket exclusions for prompt injection, docs, ReDoS, Rust and other categories. Preserve uncertain high-impact concerns separately. Bind scope to base/head plus uncommitted changes. Threat modeling must also work before code exists. Correct unsafe example guidance. | Retain positive/negative fixtures and add agent prompt injection, path-prefix collisions, unsafe Rust/FFI, resource abuse and uncommitted-only defects. Bind reports to the exact candidate. Exceptions need human sign-off. See blocker G. |

### 31–41

| Skill and source | Current behavior, inputs, outputs, side effects | Primary, secondary ownership, rationale and reuse | Required adaptation | Validation before integration |
|---|---|---|---|---|
| **session-state** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/session-state/SKILL.md#L20-L143) | Loads/updates YAML state, Git identity, handoff and cycle counters; writes learned-preference fences; resets active IDs and archives open decisions to ADRs. | **Skill**, reduced to handoff hygiene and optional domain-decision export. Native sessions, compaction, workflow checkpoints and todo replace execution bookkeeping. | No second scheduler, automatic instruction-file mutation, or shared worker writes. Reconcile incompatible field names/counter types. Archiving an unresolved question must not clear its unresolved status. | Resume/compaction preserves open questions and approvals. Git mismatch triggers clarification. Concurrent work cannot overwrite state. No unrequested `AGENTS.md`/`CLAUDE.md` edits. |
| **simple-english** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/simple-english/SKILL.md#L11-L70) | Classifies procedural/descriptive text, applies STE limits and vocabulary rules, preserves code, rewrites modals and runs heuristic lint, optionally Vale. Disclaims formal compliance. | **Skill.** Its substantial language references justify a retained optional method. Reuse `unslop` for general writing and existing docs lint for enforcement. | STE must be opt-in. Preserve uncertainty and obligation strength; “may” cannot casually become “must.” Do not claim regex checks cover the standard. Respect the dictionary licensing boundary and distinct technical meanings such as argument versus parameter. | Commands, quotes and identifiers remain exact. Test requirement-strength preservation, strict/pragmatic modes, missing Vale and parser limits. No false STE-compliance claim. |
| **slice-tasks** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/slice-tasks/SKILL.md#L12-L66) | Cuts scoped work into vertical stories/tasks, assigns BCP/deltas, updates epic manifests and release ordering, and writes verification fields. | **Skill.** Reuse `create-spec` decomposition and native task/dependency contracts. Planning owns the decomposition; implementation workflows own scheduling/status. | Resolve the 1–13 BCP shortcut versus the canonical element-sum method. Treat sizing as optional and calibrated. Do not infer delivery time from points. Preserve requirement identity and separate execution status. | Each slice demonstrates end-to-end value. Dependencies remain acyclic. IDs, deltas and verification commands are valid. Requirement coverage does not disappear during slicing. |
| **spike-prototype** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/spike-prototype/SKILL.md#L9-L96) | Agrees a question/timebox, writes throwaway experimental code, records evidence/unknowns, deletes the spike and feeds findings to planning. | **Skill.** Keep experiment discipline. A bounded worker in owned scratch space is optional; no dedicated permanent prototype workflow is necessary. | “Ignore production concerns” must not waive safety, secrets or permissions. Do not delete outside owned scratch scope. Preserve evidence. Findings do not authorize production integration or another planning/execution run. | Enforce timebox and scope. “Partially answered” is a valid result. Original files and production systems remain untouched. Cleanup only affects owned experiment artifacts. |
| **survey-context** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/survey-context/SKILL.md#L12-L138) | Reads conventions/specs/CLAUDE and VCS, validates YAML, maps lifecycle, recommends a skill, and writes timing/story-start/handoff state. | **Skill.** Keep context selection. Reuse native session/workflow status, `research-codebase`, `how` and optional locators. Do not make startup dependent on Bigpowers scripts. | Read applicable `RULES.md`/`AGENTS.md` first. Do not initialize state for a status-only request. Resolve dynamic recommendations versus unconditional `plan-work` handoff and obsolete `ship-epic` references. Preserve Jujutsu semantics. | No-spec projects work. Stale state does not override repository evidence. Colocated Jujutsu detached Git HEAD is not interpreted as branch state. Status-only invocation writes nothing. |
| **trace-requirement** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/trace-requirement/SKILL.md#L10-L70) | Extracts story IDs, searches code/test tags, writes covered/dark/orphan matrices and recommends gap planning. | **Skill.** Retain interpretation and provenance rules. Deterministic extraction is a tool in shared verification. Reuse Atomic acceptance matrices and candidate-bound evidence rather than another global hook. | Tags demonstrate a claimed link, not implementation correctness. Align numeric examples with `eNNsYY` IDs. Preserve generated-file ownership. Avoid mandatory source-comment changes when native evidence links suffice. | Test missing/orphan tags, misleading filename heuristics, archived stories and stale evidence. Coverage denominator and confidence are explicit. A tag alone cannot pass an acceptance criterion. |
| **validate-contracts** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/validate-contracts/SKILL.md#L12-L82) | Describes schema/key-set/shape validation and repairs. The actual runner checks only top-level reference keys missing from target; unsupported types print SKIP and exit zero. | **Skill.** Keep contract-design guidance. Existing project schema/API/migration tests perform validation; shared verification owns required gating. | Resolve reversed subset semantics, missing modes, grep-based YAML parsing and path interpolation. Parameterize the consumer root. Unsupported required contracts cannot return success. Replace universal 30-day staleness with change-sensitive evidence. | Test both subset directions, exact/nested keys, malformed input, quoted paths, missing sources and unsupported modes. No vacuous success. See blocker H. |
| **verify-work** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/verify-work/SKILL.md#L21-L149) | Runs preflight/task checks, cold start, build/types/lint/tests, security/trace/NFR checks and manual UAT; loops on gaps and persists evidence/status. | **Workflow.** This is the shared implementation-verification component. Retain risk/UAT guidance as skills. Reuse Atomic verification contracts, project checks, `qlty`, browser and terminal tooling. | Resolve mandatory UAT versus P2/P3 skipping. Never weaken required project checks. Replace broad `pkill`/cache deletion with owned sessions. Bind evidence to the final candidate. Keep deterministic verdicts separate from model judgments. | Require contiguous-run receipts, actual user behavior, honest skip labels and exit status. Test high-risk blockers, stale evidence and pause/resume. Changing a failing verification pattern requires review, not automatic greenwashing. |
| **wire-ci** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/wire-ci/SKILL.md#L10-L110) | Detects forge/stack and copies a bundled template. Docs promise validation/dry-run; the runner implements detect/plan/apply/self-test and defaults its target to the package root. | **Skill.** Occasional CI setup does not need an Atomic extension or dedicated workflow. Reuse existing CI, validators and project quality tooling. | Preserve existing workflows; use an explicit consumer root. Implement or remove unsupported flags. `gh workflow run` is remote execution, not dry-run. Do not automatically add release authority, secrets or elevated permissions. | Unsupported forge writes nothing. Existing CI is not overwritten without agreement. Exercise real validator modes. Local verification must not dispatch remote CI or publish. See blocker I. |
| **write-document** · [source](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/write-document/SKILL.md#L10-L77) | Selects ADR/context/guide/README artifacts, applies BMAD writing rules, adds verification and nested GEMINI indexes, may compact state and run broad skill sync. | **Skill.** Retain artifact-purpose and documentation method. Reuse `unslop`, `writing-for-agents`, `how`/`why`, and `create-spec` for explicitly planned work. README creation can have a small secondary template. | Preserve factual uncertainty. Remove arbitrary “94%” labeling, mandatory 300-line/20-turn compaction, placeholder output and GEMINI-index proliferation. Do not sync generated files or edit changelogs. Correct template-relative links and inconsistent commit examples. | Verify purpose, claims, examples and links. Unknown configuration stays unknown. Prohibited files remain unchanged. Documentation checks must assess meaning and usability, not only heading counts. |

## Important supporting findings

### A. Grid verification overstates what it establishes

The [verifier](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/align-grid/scripts/verify_grid.js#L60-L131):

- Reads one `.grid`, then evaluates elements across the document against its coordinates.
- Initializes error values to zero, allowing absent optical/overlay targets to escape meaningful checking.
- Selects `.opt-align`, while the [generator's optical code](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/align-grid/scripts/grid_tokens.py#L124-L158) uses display-class selectors.
- Computes baseline distance as `min(m, BL-m)` and accepts distances up to `BL/2`. For an ordinary positive baseline and finite modulus, that distance is already bounded by half a baseline. The criterion therefore does not discriminate baseline alignment as advertised.
- Accepts tolerances of 0.5px for columns/overlay and 1px for ink, not literal universal “0px adherence.”

Retain the design knowledge; do not adopt the verifier's PASS as sufficient evidence unchanged.

### B. TDD history policy conflicts with native reuse and has weak proof

The [RED verifier](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/verify-tdd-red-commit.sh#L62-L90):

- Returns success when fewer than two commits exist or no supported verification command is found.
- Assumes `HEAD~1` is the RED commit.
- Accepts any failing verification command as evidence of RED.
- Does not establish that the commit is test-only or that failure came from the intended behavior.
- Creates a detached worktree without establishing the dependency environment required by its chosen test command.

Atomic's bundled `tdd` retains vertical behavior-first RED/GREEN without mandating failing commits. Choosing that method is an **explicit departure** from Bigpowers' two-commit policy, not a transparent port.

The shared [review-worktree helper](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/parallel-review-worktrees.sh#L11-L34) also force-removes an existing named worktree and recreates it at `HEAD`. It does not carry the working-tree diff and does not execute review. Its successful exit proves neither audit nor security review.

### C. Traceability gates need one complete verdict contract

The [skill's rule table and process](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/gate-trace/SKILL.md#L16-L62) leave several ambiguities:

- R6 appears in the table, but the process says apply R1–R5.
- “First match wins” interacts poorly with multiple independent blockers.
- Coverage between 60% and 80% has no clear unconditional outcome.
- A later drift check says to mark CONCERNS, potentially weakening a previous FAIL if implemented literally.
- R1 addresses any undone story with no code tags, which can block legitimate future backlog work unless scope is explicit.
- Missing data can become WAIVED.

The [verification wrapper](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/run-gate-trace-verify.sh#L26-L35) ensures some inputs and runs the critic. It does not implement the full verdict policy. The [critic](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/completeness-critic.sh#L24-L85) has its own active-story, coverage and evidence rules.

Recommendation: one deterministic verdict reducer, with separate model critique and explicit unknown/waiver handling.

### D. Git safety has three differing descriptions/implementations

The skill promises branch, commit-message, secret and identity protections. The [shell matcher](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/guard-git/scripts/lib/git-guardrails-core.sh#L4-L27) implements only a short dangerous-command pattern list.

The [OMP handler](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L367-L415) adds some branch and message checks but:

- Handles only `bash`.
- Uses [process-level Git branch lookup](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L159-L183), not the requested command's effective repository.
- Does not inspect commands executed inside arbitrary scripts/interpreters.
- Does not implement the promised secret/author checks.
- Does not implement the documented `GIT_BIGPOWERS_LAND=1` exception.
- Has asymmetric default-push handling for `main` and `master`.

These are reasons to redesign a small opt-in policy extension, not copy the monolith or promise comprehensive protection.

Atomic `tool_call` interception is also not an OS boundary. Direct workflow code, user shell commands, external tools and server-side actions need their own clearly scoped controls.

### E. “Dry-run” includes remote publication

The [publish reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/publish-package/REFERENCE.md#L249-L259) labels a TestPyPI upload as PyPI dry-run. That is an external mutation, regardless of the test registry.

Other conflicts:

- [`--no-verify`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/publish-package/REFERENCE.md#L24-L31) contradicts prerequisite hard gates.
- [Changelog-update advice](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/publish-package/REFERENCE.md#L100-L117) conflicts with the user's read-only changelog policy.
- The default npm command requests public visibility.

A future adapter needs separately validated, version-specific registry commands. Nothing named “dry-run” should acquire remote-write authority through terminology alone.

### F. Release success is not reliably distinguished from incomplete evidence

The [CI waiter](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/wait-for-ci.sh#L40-L111):

- Can return exit zero when gh is absent or unauthenticated and only the remote commit matches.
- Counts only `conclusion == "failure"` as failure.
- Can treat completed cancelled/timed-out runs as successful when no literal failure remains.

The [landing script](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/land-branch.sh#L100-L165) can choose a partial verification stack and performs squash/commit/push. Its [cleanup](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/land-branch.sh#L195-L206) includes force-removal fallback.

The [protected-branch fallback](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/land-branch-push.sh#L39-L105) can delete a recovery branch and reset the local default branch. Its placement of `push_status=$?` after the `if` statement also warrants a regression test for loss of the original failed-push status.

Recommendation: record distinct facts for integration, required CI, registry visibility and cleanup. None implies the others.

### G. Security exclusions are unsuitable for an agent harness

The [false-positive reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/security-review/REFERENCE-false-positives.md#L6-L61) excludes, among other things:

- User-controlled content in AI system prompts.
- Documentation files.
- Regex injection and ReDoS.
- Resource exhaustion.
- Memory-safety findings in Rust.
- Several operational/security concerns without requiring another named owner to assess them.

Those exclusions are especially risky when Markdown instructions, tool output and shell commands influence agent behavior. Rust language choice also does not establish that every relevant dependency, unsafe block or FFI path is memory-safe.

The [vulnerability guidance](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/security-review/REFERENCE-vuln-categories.md#L54-L65) contains examples requiring correction, including a raw path-prefix check presented as safe.

Confidence filtering should separate confirmed findings from unresolved concerns, not erase high-impact uncertainty. A score of 8/10 is not calibrated evidence of an 80% probability.

### H. Contract modes and subset direction disagree

The [reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/validate-contracts/REFERENCE.md#L119-L129) describes subset mode as all target keys existing in the reference.

The [runner](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/validate-contracts.sh#L36-L58) instead computes reference keys missing from target. It ignores mode selection, only compares top-level keys, uses simple text extraction for YAML, interpolates paths into Python source, and exits zero for unsupported contract types.

It also [changes into its package root](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/validate-contracts.sh#L8-L9). Installing it as a skill dependency would not automatically make it validate the consumer project.

### I. CI documentation promises modes the runner lacks

The [runner's dispatch](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/wire-ci.sh#L146-L159) supports only detect, plan, apply and self-test, not the documented validate/dry-run operations.

It [defaults to the package root and copies over the destination](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/wire-ci.sh#L20-L85). The [reference fallback](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/wire-ci/REFERENCE.md#L258-L268) dispatches remote GitHub Actions under a dry-run heading.

Unsupported-forge reporting is a useful design choice. The generation/validation contract still needs reconciliation before reuse.

## State, methodology and authority

### One execution-state owner

Bigpowers makes [`handoff.next_skill` a mandatory routing channel](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONVENTIONS.md#L160-L204). Several assigned skills write it, sometimes unconditionally.

The source uses incompatible forms:

- `active_epic` versus `active_epic_id`.
- `active_story` versus `active_story_id`.
- `epic_cycle.step` versus `epic_cycle.current_step`.
- Numeric step counters versus skill-name values.
- `completed_steps` described as both comma-separated text and arrays.
- `requirements/`, `product/`, flat epic files and capsule directories.

Compare [actual state](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/specs/state.yaml#L1-L40), the [session template](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/session-state/SKILL.md#L79-L143), and [build progression](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/build-epic/SKILL.md#L37-L74).

**Proposed ownership**

- Atomic workflow state owns execution, retries, approvals and completion.
- Workers return scoped results; they do not all edit a shared scheduler file.
- Project artifacts retain requirements, ADRs and optional delivery records.
- An explicitly requested export may summarize workflow state, but is not a second authority.
- `next_skill` becomes an advisory recommendation outside workflows, never automatic permission to launch another action.

This is a deliberate methodology change.

### BCP is optional planning information

The [BCP reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp.md#L9-L64) defines element-based scoring and explicitly distinguishes points from time. `slice-tasks` uses a simpler 1–13 story scale.

The [BCP Plus reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp-plus.md#L132-L151) requires exclusive element ownership, sum integrity and calibration identity. Those are useful constraints if sizing is adopted.

Recommendations:

- Do not make BCP mandatory for ordinary Atomic tasks.
- Choose one sizing method explicitly before comparing scores.
- Preserve calibration/version information.
- A baseline NFR scoring zero points still remains a requirement.
- Do not claim points predict task duration without local evidence.
- Distinguish estimated effort from calendar lead time. The [release reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/release-branch/REFERENCE.md#L59-L97) itself supersedes older wall-clock velocity calculations.

### Quality thresholds are not interchangeable

The [gate reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/gates.md#L19-L29) mixes a 94% compliance threshold, reviewer scoring language and a 93% verification reference.

Do not translate these into Atomic review scores or model confidence. Establish:

1. Required observable acceptance criteria.
2. Required executable checks.
3. Independent judgment findings.
4. Explicitly authorized waivers, with scope and reason.

A passed wrapper, existing artifact or high aggregate score cannot compensate for an unverified required behavior.

## Native organization

A small native organization is preferable to a one-to-one port.

### Retained method collection

Keep selected, adapted knowledge under skills. Prefer augmenting existing methods over competing copies:

- `develop-tdd` → native `tdd`.
- Commit drafting → installed `commit-work` through an optional shortcut.
- General prose cleanup → `unslop`.
- Architecture explanation and investigation → `how`, `why`, and existing research roles.
- UI method → `impeccable`, with `align-grid` as specialized reference.
- Scope/refactor/test decomposition → reuse `create-spec` where the contract matches.
- Mechanical quality → project checks and `qlty`, preserving existing configuration.

### Principal workflow boundaries

```text
Optional project coordination
    |
    +-- Planning methods and human decisions
    |
    +-- Implementation
    |      survey -> approved task -> TDD/worker
    |             -> verify/UAT -> self-audit -> independent review
    |             -> bounded repair -> fresh verification
    |
    +-- Separately authorized delivery
           branch integration
           registry publication
           deployment and health verification
```

- `build-epic` and `execute-plan` are implementation modes.
- `verify-work` is a reusable verification component.
- `release-branch`, `publish-package` and `deploy` are delivery modes, not automatic consequences of an implementation PASS.
- `orchestrate-project` is optional composition above them.
- `gate-trace`, `validate-contracts`, `run-evals` and `enforce-first` contribute methods/checks rather than independent schedulers.
- Every repair iteration gets distinct tracked identity. No edge returns to an ancestor.
- Native durable tools reduce replay duplication, but uncertain external outcomes still require reconciliation and, where available, operation IDs or idempotency keys.

### Only one proposed extension responsibility

An opt-in Git-policy extension may use `tool_call` to reject in-scope model actions.

Do **not** add extensions merely to:

- Register every skill as a slash command.
- Keep another skill catalog.
- Automatically rewrite `state.yaml`.
- Auto-launch `next_skill`.
- Poll silent agents.
- Sync generated wiki files.
- Turn all skill “HARD GATE” prose into global enforcement.

Native workflow activity observation already distinguishes execution, user waits, paused work and unavailable telemetry. Reuse it for diagnosis.

## Package compatibility and upstream intent

### Command duplication is confirmed upstream, not fixed at this pin

Observed GitHub evidence:

- [Issue #121](https://github.com/danielvm-git/bigpowers/issues/121), author `sudo-bakar`, reports duplicate skill commands. It had no comments.
- [PR #122](https://github.com/danielvm-git/bigpowers/pull/122), author `jagged-teeth`, was **open**, unmerged, with no reviews/comments at inspection.
- Its proposal retains generated `.pi/prompts` as the established slash-command mechanism and removes per-skill extension registrations.
- [Merged PR #118](https://github.com/danielvm-git/bigpowers/pull/118), author `danielvm-git`, introduced fork-derived Jujutsu/runtime and OMP features.
- [Merged PR #120](https://github.com/danielvm-git/bigpowers/pull/120), same author, fixed CI dependency installation needed by the OMP smoke test. Its body explicitly rejects skipping the test when dependencies are absent.

The issue proposes removing templates; PR #122 chooses the opposite approach to preserve the existing interface. The PR is evidence of a proposed compatibility fix, not merged behavior.

At the pinned commit, the [manifest](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/package.json#L31-L40) still loads prompts and the extension still [registers every skill name](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L247-L260).

Atomic already provides `/skill:name`; optional short templates should have one owner. The `bigpowers_skill` list/get/run tool duplicates native discovery and activation and should be replaced, not ported by default.

### Metadata compatibility is not API compatibility

The [extension imports](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L1-L10) include a type-only dependency on `@earendil-works/pi-coding-agent` and a runtime `typebox` import. The lockfile resolves TypeBox to `1.3.27`; it is declared as a development dependency.

The extension also uses:

- A custom, single-line-oriented frontmatter parser.
- Its own skill discovery.
- [Prompt injection through `sendUserMessage` with a `sendMessage` fallback](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L190-L231).
- [Custom tool execution](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L264-L355).
- Synchronous Git inspection inside event handling.

These need an actual Atomic compatibility test before any claim of runtime compatibility. Legacy `pi` manifest support only establishes resource-discovery compatibility.

A future packaging decision should preserve canonical sources, avoid generated mirror edits, retain relative assets correctly, and not run upstream sync as an installation convenience.

## Licensing and attribution

- Bigpowers uses [MIT, copyright 2026 Daniel VM](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/LICENSE#L1-L21). Preserve its notice for copied or substantially adapted material.
- Preserve [community contributor attribution](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONTRIBUTORS.md#L12-L46), particularly the Jujutsu/runtime and OMP contributions.
- The [STE linter](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/simple-english/scripts/ste_lint.py#L18-L20) identifies two MIT source projects. Preserve applicable notices and verify bundled provenance before redistribution.
- The [STE reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/simple-english/REFERENCE.md#L160-L160) says the official dictionary is copyrighted and not reproduced.
- The [BCP Plus reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp-plus.md#L218-L231) attributes original BCP material to **CC BY-NC-ND 4.0** and references a private local implementation/whitepaper.

The root MIT license does not establish that all externally sourced methodology material can be redistributed or adapted under MIT. Verify those rights before copying substantial third-party text, tables or implementations.

Bigpowers' no-agent-coauthor rule agrees with the installed `commit-work` skill's user-only attribution. Preserve source-license attribution independently of Git commit-author conventions.

## Model and thinking policy

### Evidence status

Recommendations use only Atomic's model guidance/evals and the contract's configured model subset.

- **DeepSWE:** v1.1, September 3, 2026 snapshot, 113 tasks. Values below are that dated snapshot.
- **Artificial Analysis:** September 8, 2026 documentation snapshot under Intelligence Index v4.3.
- The contract records September 12 live retrieval confirming headings/methodology without chart scores. **No numeric refresh is claimed.**
- Catalog membership does not prove account/provider access.
- Skills and templates have **no independent model pins**. Their executing session, stage or subagent owns model policy.

Sources:

- Atomic `docs/models/model-selection.md:22-32,43-54,91-96`.
- Atomic `docs/models/evals.md:21-41,43-66,139-179,183-248,390-446`.
- [DeepSWE](https://deepswe.datacurve.ai/).
- [AA methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking).
- [AA Astra](https://artificialanalysis.ai/models/gpt-6-astra).
- [AA Fable 5.1](https://artificialanalysis.ai/models/claude-fable-5-1).

### Relevant measurements

| Exact measured configuration | Task-relevant result | Cost/latency interpretation |
|---|---|---|
| Astra **xhigh**, DeepSWE | 74% ±3 pass@1; 29 average steps; 30k output tokens | $6.52 per DeepSWE task. Astra pricing in this snapshot is expected-launch pricing, not billed-cost evidence. |
| Opus 5 **max**, DeepSWE | 74% ±4 pass@1; 99 steps | $11.84 per task. Rounded accuracy does not establish superiority to Astra. |
| Luna **max**, DeepSWE | 67% ±4 pass@1; 102 steps | $0.61 per task; cheaper, with lower measured success. |
| Astra **xhigh**, AA | Terminal-Bench v4.0 60%; GDP.pdf All-pass 32% | $2.31 per Intelligence Index task; 140.46s on AA's reported 500-output-token end-to-end workload. Not Atomic task latency. |
| Astra **high**, AA | Terminal-Bench v4.0 54%; AutomationBench-AA 67% | $1.72 per Index task. |
| Astra **medium**, AA | Terminal-Bench v4.0 49%; AutomationBench-AA 65% | $1.54 per Index task; reported 500-token end-to-end latency 14.19s. |
| Fable 5.1 **high with default fallback**, AA | AA-Briefcase 54%; GDPval-AA v2 57% | These are normalized Elo displays, **not pass rates**. $3.91 per Index task; reported 500-token end-to-end latency 32.77s. |
| Fable 5.1 **xhigh with default fallback**, AA | Briefcase 58%; GDPval 62%; Terminal-Bench v4.0 55% | $5.98 per Index task. Its fallback configuration is part of the measurement. |
| Luna **max**, AA | AA-LCR 84%; Terminal-Bench v4.0 12%; non-hallucination metric 7% | $0.18 per Index task. Suitable only as a cost-sensitive extraction candidate with verification, not a release/security authority. |

AA cost per Index task, DeepSWE cost per task and named coding-agent product costs are different units. Fable 5.1 has no result in the cited Datacurve snapshot; do not transfer Fable 5's score.

### Proposed executable-role defaults

| Role | Primary | Fallback | Reason |
|---|---|---|---|
| Planning, architecture synthesis, substantial documentation planning | `anthropic/claude-fable-5-1:high` | `openai-codex/gpt-6-astra:high` | Knowledge-work fit; high effort for consequential decisions. Higher cost than Astra is a tradeoff to validate locally. |
| Approved implementation worker | `openai-codex/gpt-6-astra:medium` | `anthropic/claude-fable-5-1:medium` | Matches Atomic's practical coding-effort guidance. Medium is a production recommendation, not a claim to reproduce xhigh DeepSWE results. |
| Bounded bug investigation | `openai-codex/gpt-6-astra:high` | `anthropic/claude-fable-5-1:high` | Terminal/failure-analysis fit. Escalate to xhigh for difficult unresolved hypotheses rather than applying max universally. |
| Security review, difficult test architecture, skeptical final review | `openai-codex/gpt-6-astra:xhigh` | `anthropic/claude-fable-5-1:xhigh` | High cost of missed defects. No cited benchmark proves security-review reliability; seeded local cases remain necessary. |
| Routine bounded extraction/lookup, if a delegate is justified | `openai-codex/gpt-6-astra:low` | `anthropic/claude-fable-5-1:low` | Matches native lightweight-role guidance; claims still require source checking. |
| Deterministic validation, trace reduction, build/test execution, external-action receipts | **No model** | **No model** | Tool results and explicit reducers, not language-model judgment. |

Fallbacks should handle retryable provider/request failures, not ordinary test failures, safety refusals or cancellations. Cross-provider fallback must satisfy the user's privacy/cost policy. Reconcile completed side effects before any recovery attempt. Do not silently reduce reviewer rigor because a preferred model is unavailable.

## Prioritized integration recommendation

All steps below require a later implementation authorization.

### Priority 0: settle compatibility decisions

Before porting anything:

1. Choose native execution state rather than a parallel YAML scheduler.
2. Approve or reject Bigpowers' mandatory BCP, two-commit RED history and manual-UAT requirements.
3. Define separate commit/push/PR/merge/publish/deploy/cleanup permissions.
4. Decide whether a tracker-based `find-way` method is wanted.
5. Resolve third-party licensing before substantial copying.
6. Keep unsafe exclusions and fail-open checks out of release/security decisions.

### Priority 1: reuse existing native methods

Start with low-side-effect knowledge reuse:

- TDD, self-audit, F.I.R.S.T, scope, slicing, refactor planning and prior-art research.
- Commit-message shortcut through `commit-work`.
- Optional document-editing shortcut.
- Optional `align-grid` and STE references.

Acceptance requires no source/settings mutation merely from discovery, no model changes from skill files, correct relative references, and no duplicate commands.

### Priority 2: establish bounded specialist roles

Introduce only the two justified role boundaries:

- Investigation-only bug specialist.
- Independent security reviewer.

Require explicit input scope, source-grounded output, uncertainty reporting, no unapproved fixes, and tests covering the omissions identified above.

### Priority 3: compose implementation and verification

Use native workflows for the shared implementation modes and verification boundary.

Acceptance requires:

- Resume without duplicate work.
- Original acceptance criteria preserved through repairs.
- Unique DAG identities for retries.
- Candidate-bound checks and fresh review.
- No advancement on required missing/failed evidence.
- Human cancellation preserved.
- No automatic delivery.

### Priority 4: delivery adapters and optional policy extension

Only after the previous contracts are established:

- Add registry/platform-specific delivery operations with genuine dry-run semantics.
- Validate uncertain-outcome reconciliation and cancellation.
- Add Git policy only if explicit, tested interception adds value beyond repository/server protections.

Do not deploy the upstream OMP extension as a shortcut to this work.

## Coverage check

The research artifact check passed:

- **41/41 assigned canonical names**
- **41 unique rows**
- All required classification fields populated
- All cited local paths and line ranges exist
- Counts reconcile to **28 skills, 3 prompt templates, 2 subagents, 7 workflow components, 1 extension**

This check validates the research artifact's structure and coverage. It does **not** establish that any proposed integration is installed, compatible, safe, or tested.