# Bigpowers assessment: 40 assigned skills

## Recommendation

**Reuse Bigpowers' methods selectively. Do not install its control plane unchanged.**

Its strongest contributions are impact analysis, explicit scope and acceptance criteria, domain-language interviews, reproducible diagnosis, and evidence-based verification. Atomic already supplies skill discovery, delegation, tracked workflows, review compositions, status reporting, and artifact handoffs.

For the **40 assigned skills**, I recommend:

| Primary mechanism | Count |
|---|---:|
| Skill | 23 |
| Prompt template | 6 |
| Subagent | 2 |
| Workflow | 8 |
| Extension | 1 |
| **Total** | **40** |

These are classifications of responsibilities, **not a recommendation to create 40 resources or eight separate workflows**. Several upstream skills should become optional stages of the same native workflow; others should be replaced by existing Atomic capabilities.

All 40 canonical `SKILL.md` files were read in full, together with relevant references and scripts. Findings about defective scripts below are **static source findings, not executed reproductions**. No Bigpowers setup, sync, installation, hooks, implementation, publication, or integration tests were run.

## Scope and evidence

- Upstream version: `2.88.2`.
- Pinned commit: `cbff374ee2d4095b53a81696262a39f164fa0774`.
- Canonical source: `/home/pburr/src/oss/.versions/bigpowers/2.88.2-cbff374`.
- The source contains **81 canonical skills**. The assigned subset contains **40 unique names**, all present in that inventory.
- `.pi/skills` and `.pi/prompts` each contain 81 entries. They are distribution representations, not additional canonical skills.
- The manifest's “73 agent skills” description is stale. The README badge says 81. Neither should determine inventory. See [manifest](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/package.json#L1-L4) and [README](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/README.md#L1-L5).
- This report covers the assigned 40, not the other 41. Cross-referenced skills were inspected only where necessary to resolve ownership.

### Atomic mechanism rules used

Atomic documentation paths below are relative to:

`/home/pburr/.bun/install/global/node_modules/@bastani/atomic/docs/`

| Reference | Relevant native behavior |
|---|---|
| **A1** `skills.md:33-81,105-129`; `skills/reference.md:10-20,49-60` | Skills provide progressively loaded methods and references. Native `/skill:name` supports source-qualified selection. Unknown frontmatter fields are ignored. |
| **A2** `prompt-templates.md:5-19,71-79` | Templates are explicit user shortcuts with argument expansion. They do not create separate agents, enforce policy, or durably manage execution. |
| **A3** `subagents.md:8-10,39-55,101-140` | Subagents are bounded specialists. Builtins include locators, analyzers, debugger, worker, and simplifier. There is no bundled generic reviewer and no automatic acceptance gate inferred from prose. |
| **A4** `workflows.md:33-61`; `workflows/authoring.md:159-171,212-233,449-505,566-680` | Workflows own tracked orchestration, gates, explicit outputs, and bounded iteration. Dynamic graphs must remain acyclic. Compose builtin definitions rather than copying them. Explicit inline requests override workflow-first execution. |
| **A5** `workflows/builtins.md:85-97,121-128` | Relevant compositions include `fan-out-and-synthesize`, `generate-and-filter`, `adversarial-verification`, `goal`, and `loop-until-done`. Their acceptance semantics are not interchangeable. |
| **A6** `extensions.md:5-17`; `extensions/events.md:510-526,666-675,712-789` | Extensions own actual event interception, custom tools, and UI. Commands precede template expansion. Workflow observation is available through `ctx.observeWorkflowActivity`. |
| **A7** `packages.md:39,64-75`; `packages/authoring.md:10,53-67`; `security.md:7-36` | Legacy `pi` metadata is supported, but package trust is not sandboxing. Dependencies and executable extensions still require review. |
| **A8** `workflows/verification.md:9-34,81-107,124-126` | Verify the changed behavior using real tools. Keep implementation acceptance separate from upload/publication. Skipped or simulated checks are not real-platform evidence. |
| **A9** `skills/authoring.md:47-53`; `subagents/authoring.md:10-15` | Prefer concise, outcome-first instructions and references. Reserve absolute language for actual invariants. |

## Detailed classifications

Each row distinguishes current upstream instructions from the proposed Atomic arrangement. Source references **S01-S40** are pinned permalinks listed after the tables.

### 1. Impact, planning, and design

| Skill and primary | Current inputs, behavior, outputs, and side effects | Secondary components and ownership | Rationale and native reuse | Adaptation and validation before integration |
|---|---|---|---|---|
| **assess-impact** — **subagent** [S01] | Takes a proposed symbol/module/file change. Searches dependents, Git history, stories, and tests. Writes `specs/IMPACT_LATEST.md`; lightweight mode adds a numeric risk score and a `>7` interview gate. | Retain the analysis rubric as skill/reference material. A bounded analyst returns findings; the parent owns persistence, risk acceptance, and transition to planning. | A focused, mostly read-only investigation fits an analyzer better than an autonomous workflow. Reuse `codebase-analyzer`, locator, and pattern-finder capabilities rather than adding a competing exploration agent. A3. | Replace TypeScript-only text searches with repository-aware dependency evidence. Distinguish syntactic matches from real callers. Do not present the numeric score or “<10s” target as calibrated. Test re-exports, dynamic callers, missing tests, net-new code, and uncertain dependencies. Parent acceptance must not depend on merely finding `Risk:` in a file. |
| **audit-plan** — **skill** [S02] | Accepts a plan, PRD, or existing specifications. Checks scope, vertical stories, conventions, commands, and readiness; asks questions and writes `PLAN-AUDIT_LATEST.md` with READY/NOT READY. Its hard gate precedes build skills. | Optional read-only evidence gathering. A planning workflow may consume a structured readiness result, but the conversation owns missing decisions. | The reusable asset is a readiness method, not scheduling machinery. Reuse `create-spec` for planning conventions and existing repository reconnaissance. A1, A4. | Replace Bigpowers-file presence requirements with project-appropriate evidence. Missing `CONVENTIONS.md` is not intrinsically a defect in a well-documented Atomic project. Use the structured question tool. Test imported plans, non-app repositories, missing commands, genuine N/A checks, and withheld approval. |
| **change-request** — **skill** [S03] | Requires a release plan. Adds or reprioritizes stories/epics, records requirement delta tags, calculates WSJF, changes YAML artifacts, and invokes status synchronization. Conversational mode confirms placement before writing. | Release-planning parent owns writes and accepted priority changes. A deterministic calculation/schema check can support the skill. | Mid-release change negotiation needs user judgment. It is not a worker role or a standalone lifecycle. Reuse `create-spec` and the project's existing planning artifacts. A1. | Resolve inconsistent flat-epic versus capsule paths. Use the reference formula `(BV + TC + RR) / Job Size`, not ambiguous prose precedence. Preserve stable IDs and in-progress work; validate positive job size and dependencies. Confirm structured modes have the same write-approval discipline as conversational mode. Do not treat the status seeder as a reconciler. R3. |
| **compose-workflow** — **skill** [S04] | Interviews about a repeated sequence; writes `specs/workflows/<name>.yaml`, records decisions, and optionally adds orchestrator references. Defines four terminal states and an eight-recipe library. It authors recipes rather than providing a native executable scheduler. | An optional template can launch the authoring conversation. Atomic's workflow SDK owns eventual execution. | **Authoring a workflow is not itself a workflow.** Reuse Atomic's workflow documentation and builtin compositions. Bigpowers YAML recipes are useful design inputs, not executable Atomic definitions. A4-A5. | Translate selected recipes into explicit native inputs, outputs, gates, and dependencies only after authorization. Reject the “at least eight recipes exist” verification as unrelated to the requested recipe. Validate DAG shape, unique retry identities, terminal mappings, no automatic shipping, and no `/ship` registration collision. |
| **define-language** — **skill** [S06] | Extracts terms from the conversation, identifies aliases and ambiguities, proposes canonical terms and relationships, and creates or updates `UBIQUITOUS_LANGUAGE_LATEST.md`. | The parent owns terminology decisions and persistence. `model-domain` consumes the glossary rather than maintaining a second incompatible one. | This is reusable domain-analysis knowledge. No isolated worker or orchestration is inherent. Reuse `create-spec` where it already captures domain terminology. A1. | Choose one glossary location instead of adding this Markdown file alongside `product/GLOSSARY_LATEST.yaml` and terminology in `tech-stack.md`. Mark inferred cardinalities and unresolved terms. Test conflicting meanings, partial agreement, existing glossary updates, and preservation of unrelated content. |
| **design-interface** — **skill** [S08] | Takes module requirements, callers, and constraints. Requires three or more parallel design agents with different constraints; presents signatures/examples, compares tradeoffs, and asks the user to select or synthesize. Explicitly excludes implementation. | The skill owns “design it twice” methodology and dialogue. Optional bounded candidate workers own individual designs. Use `generate-and-filter` only when a tracked candidate-generation run is justified. | Its core is **software module/API design**, not principally frontend styling. Reuse `how` for ownership/layering and existing analyzers. Do not route it to `impeccable` solely because its name contains “interface.” A1, A3, A5. | Replace obsolete `Task` calls. Treat mandatory three-agent fan-out as a methodology choice, not an Atomic requirement; inline comparison remains valid when requested. Test genuinely distinct designs, identical requirements, practical caller examples, unresolved user choice, and zero implementation side effects. |
| **elaborate-spec** — **skill** [S11] | Refines a vague idea through questions about actors, success, constraints, and scope. After confirmation, writes `planning-context.yaml`; asks before replacing an existing context. Recommends downstream planning skills. | Parent conversation owns decisions. A planning workflow may pause for this skill and consume its confirmed output. | Human-led clarification should stay steerable. Reuse `create-spec` rather than introducing a separate specification framework by default. A1, A4. | Preserve the explicit confirmation boundary, while avoiding questions about facts discoverable from source. Align its context schema with `run-planning`: the writer omits `written_at`, which the consumer uses for freshness. Test stale/current context, declined replacement, multiple interpretations, and no code generation. |
| **grill-with-docs** — **skill** [S16] | Reads a plan, identifies assumptions about libraries/APIs, fetches official documentation, and challenges contradictions using URLs and quotations. May update the plan, but separately forbids specification generation before confirmation. | An online researcher may gather evidence; the parent owns tradeoff questions, approval, and edits. | The valuable part is version-grounded challenge and the facts-versus-decisions distinction. Reuse Atomic's web/code tools and `codebase-online-researcher`; no second MCP discovery system is needed. A1, A3. | Resolve exact versions from lockfiles and use pinned source checkouts, not whatever current docs say. Separate evidence gathering from proposed edits to resolve its confirmation ambiguity. Test version mismatches, inaccessible documentation, unsupported API claims, and abstention when evidence is missing. |
| **model-domain** — **skill** [S21] | Interviews against the domain model, records invariants/state machines and terminology, cross-checks source, writes context updates and ADRs, and audits shared-state concurrency risks. | `define-language` owns glossary structure; this skill owns domain decisions and invariants. Parent owns accepted edits and ADR creation. | Conversation-led domain modeling is a method, not a autonomous worker. Reuse `create-spec`, `how`, and `why` according to whether the question concerns proposed behavior, runtime ownership, or rationale. A1. | Resolve contradictory ownership of `tech-stack.md`, `CONTEXT.md`, and glossary content. The ADR reference says `docs/adr`, while the skill says `specs/adr`. Do not infer multiple bounded contexts merely from the existence of a tech-stack document. Test terminology conflict, invariant counterexamples, ADR numbering, and concurrent edits. |
| **plan-release** — **skill** [S23] | Requires clear scope; creates a release index, epic manifests, story specifications, task files, execution status, WSJF ordering, and BCP metadata. May snapshot an approved plan. Says semantic-release owns the actual version. | Shared planning workflow owns sequencing. This skill should own **release index composition**; `plan-work` should own detailed implementation tasks. | Useful release-planning method, but not necessarily an independent long-running process. Reuse project planning and `create-spec`; retain capsules only where useful. A1, A4. | Its “index builder, not task writer” description conflicts with its output/process requirements to write task files. Resolve that explicitly. Avoid adopting semantic-release, BCP, fixed 20-section specs, or security WSJF boosts silently. Test stable IDs, dependency-safe ordering, absent sizing, approved snapshots, and no release/publish action. |
| **plan-work** — **skill** [S24] | Reads scope, release, capsule, architecture, and glossary artifacts; investigates impact and dependencies; writes detailed story specs and task YAML with verification/risk/security metadata. Runs consistency checking and reviews with the user. Writes `handoff.next_skill`. | Planning workflow owns transitions; skill owns plan quality. Reuse `create-spec`; analyzers can support targeted exploration. Deterministic validators check accepted schemas. | Planning expertise belongs in reusable instructions. `plan-work` is a stage inside planning, not a reason to create another scheduler. A1, A4. | Reconcile `todo` versus `failing` task states and 20-section requirements. Remove mandatory model-bearing exploration and upstream timing hooks. Validate actual active-capsule paths; its generic verify selects the first sorted capsule. A “verify” string's syntax is not execution evidence. Test before/after requirement deltas, locked sections, missing `spec:` links, and runnable project-specific checks. R4. |
| **run-planning** — **workflow** [S28] | Drives a resumable discovery checklist through survey, scope, research, optional elaboration, release planning, and slicing. Writes `planning-status.yaml`, `active_flow`, and `handoff.next_skill`; deletes the planning context on completion. | Compose the conversation-led planning skills. One native workflow owns runtime state; durable product documents remain separate outputs. | This really is an orchestration responsibility: pending steps, optional branches, resume, and handoffs. A4. | Resolve the bootstrap contradiction: it advertises brand-new initiatives but requires an already-registered epic/story. Replace wall-clock-only context freshness with artifact identity and confirmed scope. Retain context rather than deleting it by default. Test fresh start, partial resume, declined optional steps, stale approvals, and no repeated scope/slicing work. |

### 2. Delegation, diagnosis, and review

| Skill and primary | Current inputs, behavior, outputs, and side effects | Secondary components and ownership | Rationale and native reuse | Adaptation and validation before integration |
|---|---|---|---|---|
| **delegate-task** — **workflow** [S07] | Builds a bounded task brief, dispatches one fresh agent, retries up to three cycles, reviews its report and then its diff, and accepts/revises/rejects. Acceptance includes merging and writing an active decision to state. | Worker owns the scoped task. Parent/review stages own acceptance. Reusable brief-writing guidance can remain a skill reference. Integration is a separate authorized boundary. | The complete responsibility contains retries and two acceptance stages, not just a subagent role. Reuse Atomic `worker` and a shared verified-execution composition. A3-A5. | Do not copy `Agent` tool assumptions or append Markdown headings into YAML. Review the actual submitted candidate, including uncommitted changes, rather than assuming `main...HEAD`. Test failed verification, report/diff disagreement, third-cycle exhaustion, scoped edits, and acceptance without unauthorized merge. |
| **diagnose-root** — **skill** [S09] | Defines reproduce, isolate, hypothesize, verify. Requires evidence before proposing a fix. Says it does not write a bug file, but also says to update the active bug file at every phase. | Preserve the RCA method as guidance for Atomic's `debugger`. Parent or investigation stage owns the bug artifact; verification owns the final acceptance. | This is a reusable diagnostic technique, not another four-stage runtime that must be nested inside every bug fix. Atomic already has a debugger that reproduces, fixes, and validates actual failures. A1, A3. | Resolve bug-file ownership and allow multiple contributing causes rather than forcing unsupported certainty about “one” cause. A diagnosis-only request must explicitly constrain the normally edit-capable debugger. Test unreproducible failures, falsified hypotheses, partial diagnosis, and prevention of speculative patches. |
| **dispatch-agents** — **skill** [S10] | Tests task independence, creates typed task briefs, dispatches parallel agents, collects evidence/diffs, integrates accepted results, and tracks three-cycle and consecutive-failure limits. | Native `subagent` owns launching and observation; parent owns decomposition and synthesis. Durable multi-wave retries belong to the shared execution workflow, not another dispatcher. | The independence checklist is useful. The tool already provides parallel delegation, so porting an Orca-style messaging/control layer would duplicate native capabilities. A1, A3-A4. | Replace `Agent` calls and custom checkpoint traffic with supported native results/Intercom where needed. Separate role briefing depth from model effort. Test overlapping files, shared database/config state, dependent tasks, silence without completion, and no duplicate launches after yielded observation. |
| **fix-bug** — **workflow** [S14] | Owns `active_flow: fix_bug`, a five-step `bug_cycle`, investigation, RCA, TDD, validation, release, and resume. Handles reported bugs and discovered failing gates. | Reuse `debugger` for the reproduction/fix loop, `tdd` for method, and a shared verification/review composition. Parent owns bug identity; publication remains separate. | Explicit lifecycle state and resumability make this a workflow. A3-A5. | Eliminate duplicate RCA: `investigate-bug` already invokes `diagnose-root`, but the orchestrator invokes it again. Do not automatically release after validation. Keep bug and epic state separate without a shared mutable global cursor. Test recurrence, baseline failure, interrupted repair, two concurrent bugs, and validation failure without shipping. |
| **inspect-quality** — **skill** [S18] | Conversational QA intake. Clarifies expected/actual behavior, starts an exploration agent, groups issues, and appends issue metadata plus detail sections to `specs/bugs/registry.yaml`. Does not itself fix them. | Parent owns intake and registry writes. Optional locator/analyzer supplies context. Explicitly hand off an accepted bug to diagnosis. | User-driven QA should remain a conversation, not an autonomous review workflow. Reuse native analyzers rather than a foreign `Explore` agent type. A1, A3. | The “YAML” registry is specified as a Markdown table plus Markdown sections; downstream consumers expect real YAML. Choose one schema. Keep hypotheses distinct from verified root causes. Test duplicate reports, intermittent repros, issue splitting, incomplete details, and logging without commencing repairs. |
| **map-codebase** — **subagent** [S20] | Scans manifests and source, maps entrypoints/data flow, examines errors/APIs/testing/observability, and writes `specs/tech-architecture/tech-stack.md`. Distinguishes building that document from consuming existing context. | Reuse analyzer and pattern-finder roles. Worker returns a cited architecture report; parent decides where to persist or update it. Retain a short research rubric. | This is a bounded research deliverable that benefits from isolated context. Prefer the existing `research-codebase` skill and specialists over a second architecture mapper. A3. | Resolve dependency versions using lockfiles, distinguish observations from recommended changes, and use commit identity for freshness. Do not overwrite domain-language content placed in the same file by `model-domain`. Test monorepos, mixed architectures, missing tests, undocumented entrypoints, and contradictory existing docs. |
| **quick-fix** — **prompt-template** [S25] | Explicit fast path for data-only changes: at most one file/five lines, no logic/API/refactoring, one assertion. Applies the edit, verifies, commits and amends, then invokes release. | Template provides an explicit shortcut. Reusable eligibility guidance belongs in the bug-fix method. Current session owns the edit; larger problems route to normal diagnosis without hidden workflow launch when inline was requested. | This is a user-selected reduction in ceremony, not a new worker or control plane. A2, A4. | Remove automatic commit/amend/release. “Data only” does not imply low risk for auth, money, URLs, or production config. Require a before/after reproduction and real failing exit semantics; the sample `... || echo "FIX FAILED"` exits successfully. Test boundary counts, logic disguised as configuration, failed assertion, unrelated dirty files, and escalation without unapproved rollback. |
| **request-review** — **workflow** [S26] | Dispatches two independent reviewers, requires both to pass with zero must-fix findings and score ≥94%, sends failures to repair, and repeats. Declares a five-round cap but later says three rounds. Optional dimension-specific reviewers supplement the pair. | Reviewers are bounded fresh-context workers; deterministic workflow logic owns the decision. Repair worker cannot approve its own repair. Human owns integration authority. | Independence, fan-out, aggregation, and bounded repair are workflow responsibilities. Reuse `adversarial-verification` patterns, but not its different default scoring rules without an explicit decision. A3-A5. | Resolve three-versus-five rounds and undefined `total_items`/zero denominators. Recommend criterion-based evidence and vetoes instead of uncalibrated percentages. Keeping mandatory dual review is a separate cost/methodology choice. Test one-pass/one-fail, missing report, contradictory evidence, reviewer blindness, stale diffs, exact cap exhaustion, and no merge on incomplete review. |
| **simulate-agents** — **workflow** [S32] | Runs isolated Mock User and Auditor roles against a verification script and diff, writes `SIMULATION-<feature>.md`, and routes failures to review response/planning. Explicitly warns simulations do not replace real testing or human review. | Make this an **optional branch of the shared verification workflow**, not a standalone new workflow. Mock User owns scenario feedback; Auditor owns its checklist; parent consolidates. | The canonical responsibility coordinates two roles, so calling it one subagent would hide ownership. Reuse native fan-out and review specialists. A3-A5. | Label hypothetical walkthroughs separately from real browser/terminal actions. Share immutable scenario inputs, not the build conversation. Test role isolation, uncovered scenarios, fake-versus-observed failures, and failure routing. Do not claim simulated acceptance grants production approval. A8. |
| **validate-fix** — **skill** [S38] | Re-runs the failing test, full suite, typecheck, lint, hardening, a defect-class sweep, and manual behavioral proof. Updates bug/registry resolution. Prescribes separate RED/GREEN commits and repeats until every check passes. | Skill owns verification criteria. The shared bug-fix workflow owns bounded retry and repair; deterministic tools produce evidence. Parent owns correct bug identity and completion. | The checklist is reusable knowledge across inline and workflow execution. Another standalone “validate-fix workflow” would duplicate the bug-fix owner. A1, A4, A8. | Remove automatic commit discipline unless explicitly adopted. Target an explicit bug ID, not “the most recent” bug file. Bound repetition and reassess after failure; do not repeatedly run unchanged checks expecting different results. Scope hardening/sibling fixes deliberately. Test behavior still broken despite green unit tests, stale evidence, sweep incompleteness, and concurrent bugs. R5. |

### 3. Skill maintenance and utilities

| Skill and primary | Current inputs, behavior, outputs, and side effects | Secondary components and ownership | Rationale and native reuse | Adaptation and validation before integration |
|---|---|---|---|---|
| **craft-skill** — **skill** [S05] | Interviews, writes a skill and resources, requires naming/description/body conventions, adds upstream model frontmatter, runs validators and sync, and reviews with the user. | Reuse `skill-creator`, `prompt-engineer`, and installed `writing-for-agents`. Any comparative evaluation belongs to the shared maintenance workflow. | Native skill authoring already exists. Keep only useful Bigpowers-specific references, such as artifact contracts, rather than a competing authoring skill. A1, A9. | Do not port model pins, blanket imperative vocabulary, placeholder emission, mandatory 100-line limits, or sync commands. Atomic ignores unknown frontmatter fields but their text can still influence the executing model. Validate trigger accuracy, relative resources, allowed metadata, documentation provenance, and no edits to generated mirrors. |
| **evolve-skill** — **workflow** [S12] | Runs mechanical gates, establishes/loads a benchmark baseline, plans and edits a skill, syncs mirrors, reruns benchmarks, reverts regressions, and records an ADR/state update. | Maintenance workflow owns baseline/candidate comparison and bounded iteration. `skill-creator` owns authoring method; deterministic graders own measurable checks. | Baseline, candidate, experiment, decision, and rollback are a genuine controlled change process. Reuse native bounded workflow execution and skill evaluation methods. A4-A5. | **Blocked on benchmark validity.** The upstream runner does not implement the claimed experiment. Remove automatic source rollback and generated sync. Identify candidate revision, fixture/environment, model, effort, and sampling policy. Test regressions, inconclusive results, unavailable evaluators, baseline mismatch, held-out contamination, and iteration exhaustion. R1. |
| **generate-allure-report** — **prompt-template** [S15] | Runs a shell/Python generator over project metadata; writes `allure-results/junit-results.xml`, `categories.json`, and `executor.json`. Incomplete stories become failed JUnit testcases. No downstream skill. | Deterministic generator owns conversion. An optional CI/reporting workflow stage invokes it; template only offers an explicit shortcut. | No independent model or persistent agent is required for serialization. Do not invent an Atomic extension solely because a skill invokes code. A2. | Keep **delivery status reports** separate from actual test results. The script consumes structured `execution-status.stories`, not every flat/status representation described elsewhere. Validate malformed/empty input, XML escaping, stable IDs, actual Allure ingestion, bug totals, and labels that cannot imply tests were executed. R6. |
| **reset-baseline** — **prompt-template** [S27] | Inspects Git state, asks stash/discard/keep, proposes `git stash push -u`, then reruns environment setup and baseline tests. Explicitly forbids unapproved destructive reset. | Current session owns the operation. Benchmark workflows should use disposable owned checkouts rather than resetting the user's working tree. | An explicit, infrequent operational shortcut is sufficient. No new reset agent, extension, or lifecycle is justified. A2. | Preserve tracked, untracked, ignored, submodule, and concurrent-agent work. “Safe stash” still changes the workspace and omits ignored files. Separate restoration from dependency installation. Test declined approval, partial stash failure, dirty worktrees, restoration, and no force-push. |
| **run-benchmark** — **workflow** [S28a] | Claims N-run with/without-skill experiments, train/validation separation, rubric/code graders, weighted “pass@k,” JSON/YAML reports, baselines, and release thresholds. Actual script repeatedly runs shell graders and fabricates the no-skill condition. | Workflow owns isolated experiment runs and budgets; deterministic graders own objective scoring. Optional independent rubric evaluator has a fixed contract. Reuse `skill-creator` evaluation machinery where it meets the experiment. | Actual comparative agent evaluation requires run identity, isolation, repeatable conditions, artifacts, and bounded execution. A4. | Do not port the existing runner as evidence infrastructure. Implementing the stated experiment would be a separate future task. Correct metric terminology, run real controls, grade stored results once, define inconclusive/error outcomes, and enforce exit status. Test negative controls, state contamination, missing rubrics, nonzero graders printing PASS, and baseline protection. R1. |
| **search-skills** — **prompt-template** [S29] | Builds/refreshes a lexical Markdown index, searches with `rg`, ranks top candidates, recommends one, and invokes it. Says the index includes phase/triggers, although the generator writes name/model/truncated description rows. | Native skill catalog owns discovery and identity. Parent owns intent matching. Optional explicit shortcut asks for a recommendation without auto-installing anything. | Atomic already exposes names/descriptions and source-qualified skills. Replace the separate generated index rather than porting it. A1-A2. | No generated-file writes, external embeddings, or model-policy inference from index fields. Separate “recommend” from “run.” Test duplicate names, disabled/project-untrusted skills, reload freshness, no match, and user intent not authorizing the recommended action. R7. |
| **stocktake-skills** — **workflow** [S34] | Audits changed/all skills through validators and batch review; checks mirrored inventory, descriptions, gates, usage/timing, and optionally executes skill verification commands. Writes a dated stocktake and routes fixes onward. | One maintenance workflow owns inventory, partitions, and synthesis. Read-only audit workers report; `evolve-skill` is a later approved change path. | Whole-catalog batch audit is structured, resumable work. Reuse `fan-out-and-synthesize` or bounded sequential stages according to independence. A4-A5. | Do not treat missing timing as zero usage or auto-archive from it. Existing audit checks name presence, not mirror-content equality. Replace stale “N/68” denominators with actual inventory. Audit verification commands before execution because they may write or install. Test stale/missing resources, content drift, missing telemetry, duplicate identities, and no unapproved fixes/deletions. R8. |
| **terse-mode** — **prompt-template** [S35] | Explicitly activates persistent compressed output until stopped. Drops grammar/filler/hedging but preserves technical terms and restores clarity for sensitive situations. Description also claims roughly 75% token savings. | Current session owns the requested style. No model pin or cross-session setting change. | This is an explicit communication preference, not task expertise or a worker. Existing `unslop` and concise-output preferences already cover much of its value. A2. | Recommend concise normal language rather than “caveman” grammar. Do not remove uncertainty needed for truthful reporting. No measured support was found here for 75% savings. Test off/normal-mode reset, security warnings, quoted errors, technical fidelity, and no spillover into unrelated sessions. |
| **using-bigpowers** — **prompt-template** [S36] | Explains lifecycle and entry skills, includes installation/setup commands, recommends solo landing, and routes to survey-context. Conflicts between “one-time introduction” and mandatory use at every session. | Explicit onboarding prompt; native skill/workflow catalogs supply current choices. Parent owns whether any method is adopted. | Onboarding should be opt-in help, not a session-start extension or permanent methodology injection. A1-A2. | Remove executable setup instructions from the normal help path and make installation a separately authorized action. Explain retained methods and departures honestly. Use live inventory rather than hardcoded counts. Test help-only invocation, existing configuration preservation, no automatic bootstrap, and inline-mode respect. |

### 4. Environment, operations, and observability

| Skill and primary | Current inputs, behavior, outputs, and side effects | Secondary components and ownership | Rationale and native reuse | Adaptation and validation before integration |
|---|---|---|---|---|
| **extract-design** — **skill** [S13] | Accepts HTML/URL; launches Puppeteer, collects computed styles in light/dark modes, classifies tokens/components, generates prose, writes `DESIGN_LATEST.md`, invokes `npx @google/design.md`, and writes a grill-me handoff. | Retain extraction/uncertainty method. Browser sensor and token conversion are deterministic helpers. Parent owns interpretation and accepted document writes. | Reuse `impeccable`, `playwright-cli`, and relevant design workflow capabilities. A skill may bundle a script; that does not require an extension. A1, A8. | **Do not port scripts unchanged.** Browser lifetime, spacing types, tests, lint exit semantics, and state updates have defects. Replacing Puppeteer with Playwright is an explicit departure from its hard gate, requiring equivalent computed-style validation. Pin browser/linter dependencies; no opportunistic `npx` downloads. Test light/dark, pseudo-states, SPA readiness, uncertainty, offline lint, and hostile/untrusted pages. R2. |
| **harden-vps** — **skill** [S17] | Root-level Ubuntu hardening: UFW, fail2ban, upgrades, SSH, systemd, application SQLite alert rows, cron backups, and Contabo snapshots. Installs packages/CLI, changes services/network access, and handles credentials. | Retain an **opt-in runbook**, not a turnkey deployment. Human/current session owns each authorized operational scope. Only repeated fleet remediation justifies a workflow around it. | One-off operations should use the simplest direct path. It is not an Atomic session-policy extension. No bundled generic infrastructure skill replaces the necessary host-specific expertise. A1, A8. | Quarantine executable defaults. Establish non-root/key access and recovery before changing SSH/UFW. Replace live SQLite `cp` backups with a consistent backup method; do not bypass application auth with direct database inserts. Pin and verify downloads. Test in a disposable VM with console recovery, failed checks, restore, custom SSH ports, IPv6, and no credentials in logs. Its final success message is unconditional. R9. |
| **kickoff-branch** — **skill** [S19] | Selects Git/Jujutsu, checks out/pulls default branch, offers a spec-only checkpoint commit, creates branch/worktree/workspace, records a story lock, runs preflight, and writes a TDD handoff. | Native workflow/subagent worktree support owns isolation when already selected. Parent owns baseline and any Git approval. Reuse installed `commit-work` only when committing is authorized. | Useful VCS preparation guidance, but not another mandatory workflow. Avoid double worktree creation around native isolation. A1, A3-A4. | Do not change the primary checkout or auto-commit all `specs/` merely to start work. The story-lock snippet is non-atomic and does nothing when the lock file is absent. Resolve contradictory preflight ordering. Test dirty primary tree, no remote/default branch, linked worktree, lock contention, and Jujutsu's supported/unsupported operations. |
| **organize-workspace** — **skill** [S22] | Inventories candidate junk and loose assets, proposes exact deletes/moves, obtains approval, executes, verifies, and separately proposes `.gitignore` edits. Explicitly excludes secrets and dependency/VCS directories. | Parent conversation owns approval and mutation. Optional read-only inventory helper is unnecessary for small projects. | The classification and safety method is useful and already appropriately interactive. Keep it as a skill, not automatic cleanup hooks. A1. | Honor the local read-only rule for generated files even where upstream calls build outputs disposable. Resolve paths/symlinks, preserve active processes and user drafts, and prefer recoverable operations. Test declined/item-level approval, tracked files, secrets, symlink escapes, partial failure, and `.gitignore` rules that must not hide real source. |
| **seed-conventions** — **skill** [S30] | Interviews, generates AGENTS/CLAUDE/CONVENTIONS files, optional tool configs/symlinks, many specification files, default workflow mode, and fenced managed sections. Applies strict Agentic STE checks. | Reuse installed `writing-for-agents` and existing Atomic context-file conventions. Parent owns adopted policy and exact file changes. | Interactive convention authoring is reusable guidance. It must not become installation/bootstrap automation that imposes a new methodology. A1, A7, A9. | Infer existing commands first. Preserve user prose, existing files, symlink targets, and settings. Do not seed empty files merely to satisfy presence checks or inject “no direct coding,” solo landing, or attribution suppression. Resolve optional AGENTS output versus mandatory canonical AGENTS/symlink instructions. Test existing handwritten sections, absent fences, read-only/generated files, and Windows symlink failure. |
| **setup-environment** — **skill** [S31] | Reads project commands, checks runtimes, installs lockfile dependencies, optionally copies `.env.example`, runs smoke checks, and records environment data. Offers global/PyPI `big-counter` installation. | Existing project toolchain owns setup. A workflow may call this as preparation; no persistent setup agent is required. | Reusable environment-preparation guidance is sufficient. Prefer project-native documented commands and avoid another installation control layer. A1. | Environment setup must be explicitly in scope, not triggered by every fresh session. Package lifecycle scripts are execution. Never overwrite `.env`; redact recorded values. Omit BCP tooling unless adopted and dependency/license review is complete. Test second-run behavior, offline/missing lockfiles, incompatible runtimes, partial install, and environment verification stronger than finding `Test` in CLAUDE.md. |
| **smoke-test** — **skill** [S33] | Reads `smoke-checks.yaml` or a URL; runs curl assertions for status/content/latency and saves logs. Used standalone or after deployment. The skill's hard gate says deploy first. | Deterministic checks own observations. An authorized deployment workflow owns post-deploy gating. Parent owns URL/environment selection. | Reusable HTTP verification method, not a model worker or mandatory standalone workflow. Existing shell/test tooling suffices. A1, A8. | Do not interpret invocation as permission to deploy. Validate the runner before reuse: parsed HTTP method is unused, successful YAML status checks are not counted, and URL override handling needs tests. Restrict production checks to authorized, non-mutating requests by default. Test status-only success, timeout/DNS failure, method handling, content mismatch, threshold boundaries, and empty configurations. R10. |
| **visual-dashboard** — **extension** [S39] | Starts a background browser dashboard with HTTP/WebSocket handling and file watching; reads project specifications and persists session content/state/logs. Describes the PM dashboard as read-only while optional screens record interaction events. | **Prefer native workflow status/graph first.** Only a demonstrated product-status gap warrants an opt-in read-only extension. Native runtime owns run state; extension projects it without scheduling work. | Live status/UI is the only clear extension-primary responsibility in this subset. Reuse `show-me` for static diagrams and native status for execution. A6. | Do not port the browser server merely for a second cockpit. Its parser expects older `file` epic links, not current capsule directories; arbitrary `projectDir` is accepted without project authorization. If retained, enforce path scope, bind/auth/origin policy, owned process cleanup, and reload-safe subscriptions. Test unavailable versus idle, nested runs, pause/resume, and no automatic handoff execution. R11. |
| **wire-observability** — **skill** [S40] | Examines logging/health/setup, adds application JSON logging, documents commands in CLAUDE.md, creates setup scripts, and verifies logging, health, redaction, and idempotence. Adds BCP sizing guidance. | Approved application implementation workflow owns code changes. Skill owns instrumentation method. Existing application logging stack owns runtime behavior. | **Application observability is not an Atomic extension.** Reuse existing dependencies and `qlty`/project checks where relevant, not an agent event hook. A1, A8. | Resolve exact logging-library versions; do not add a parallel logging stack. Reconcile `userId` example with “never log PII.” Check operation-boundary coverage and useful metrics, not just JSON shape. Test redaction, error paths, correlation, startup failures, concurrent setup, and replay. The sample check-then-create database operation is not concurrency-safe merely because it is called idempotent. |

## Cross-cutting findings that affect integration

### R1. The benchmark runner cannot establish skill effectiveness

The mismatch is substantial:

1. It launches shell graders, not agents with and without the skill.
2. “Without skill” becomes `test -f /dev/null`. On ordinary Unix systems `/dev/null` is a device, not a regular file, so this manufactures a failing control.
3. A command printing `PASS` without `FAIL` is accepted even if its exit status is nonzero.
4. Rubric scenarios return `pending_agent_eval` and are excluded from aggregate scoring.
5. Aggregate scores and scenario details rerun graders separately, so reported summaries need not describe the same trials.
6. Regression handling prints text but does not establish a nonzero release-gate exit.
7. The stated weighted average of per-run success rates is not the usual probability-of-at-least-one-success `pass@k` estimator.

Sources: [grader and fabricated control](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/run-benchmark.py#L35-L80), [repeated grading and report construction](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/run-benchmark.py#L94-L148), [baseline and exit behavior](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/run-benchmark.py#L173-L210).

**Recommendation:** adopt the controlled-experiment goal, not the implementation or its existing scores. This blocks evidence-based use of `evolve-skill` until a real evaluator is available.

### R2. Design extraction needs correction before reuse

Static findings include:

- `BrowserExtractor.extract()` closes the browser in `finally`; the caller later attempts pseudo-state extraction. `detectPseudoStates()` then returns an empty result because `_page` is null.
- The spacing classifier stores numeric keys, then passes them into `toPx()`, which calls `.match()`. Common nonempty spacing inputs reach an incompatible type.
- The test helper calls `fn()` without awaiting it, while many tests are asynchronous. Its pass/fail accounting cannot reliably capture those rejections.
- Lint errors/skips do not control the final exit as the skill's hard-gate wording implies.
- Prose generation is templated heuristics, not a model invocation.
- The handoff writer only appends when no `next_skill:` substring exists; it is neither a schema-aware update nor a safe shared-state writer.

Sources: [browser lifetime](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/lib/browser.js#L24-L69), [caller](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/extract.js#L152-L178), [spacing](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/classify-spacing.js#L1-L13), [tests](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/tests/test-extraction.js#L14-L14), [async example](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/tests/test-extraction.js#L92-L99), [handoff](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/lib/state.js#L4-L14), [validator](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/lib/validator.js#L1-L10), [exit](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/extract.js#L227-L276).

### R3. Status synchronization is explicitly not reconciliation

`sync-status-from-epics.sh` preserves already-existing execution-status keys using `setdefault`; it does not pull story status from epic manifests. It seeds missing keys and refreshes metadata/counters.

Therefore, “run sync” does not resolve competing status writers in `change-request`, `plan-release`, task execution, and dashboard consumers.

Source: [documented ownership](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/sync-status-from-epics.sh#L1-L10), [seeding and counters](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/sync-status-from-epics.sh#L122-L194).

### R4. Planning checks provide partial structural evidence

The consistency checker verifies capsule files, declared story membership, acceptance headings, and some command shape/fail-open patterns. It explicitly says execution happens later.

It also extracts verification commands against its own repository root, which needs attention when validating a consumer project or another capsule location. MED findings exit zero and rely on a later human-acknowledgment mechanism.

Source: [consistency checker](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/plan-consistency-check.sh#L45-L125).

**Recommendation:** distinguish “plan structurally valid,” “verification command runnable,” and “behavior verified.” They are separate results.

### R5. Defect-sweep verification is weak and writes fixtures

The sweep validator checks for three quoted field-name substrings. It does not parse JSON, validate counts, or establish that matches were resolved. Its self-test writes a fixture under `specs/verifications/fixtures`.

The reference permits filing a tracking issue, conflicting with Bigpowers' general prohibition on automated GitHub issues.

Sources: [validator and fixture write](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/verify-generalize-sweep.sh#L12-L36), [resolution alternatives](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/validate-fix/REFERENCE-generalize-fix.md#L5-L10).

### R6. Allure output describes project status, not executed tests

The generator maps story status into JUnit testcases, including failures for unfinished work. Duration derives from story cycle time. This can be useful delivery reporting, but it is not evidence of a test suite run.

Source: [inputs and status extraction](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/generate-allure-report.sh#L18-L40), [cycle time and failure mapping](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/generate-allure-report.sh#L62-L86).

### R7. Search-index implementation is narrower than its documentation

The generator writes a Markdown table containing name, model, and the first 200 bytes of description. It does not generate the documented phase/trigger/keyword sections or provide deterministic relevance ranking.

Source: [index generator](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/build-skill-index.sh#L1-L18).

**Recommendation:** use Atomic's loaded skill catalog, with model policy entirely separate.

### R8. Catalog “sync” and usage checks are insufficient for retirement decisions

`audit-catalog.sh` compares resource presence, not content equality. The archive-candidate parser depends on indentation and does not read actual `calls` values as a robust YAML consumer would.

Timing instrumentation also performs whole-file read/modify/write operations on shared `state.yaml`, creating lost-update risk under parallel work.

Sources: [presence-only audit](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/audit-catalog.sh#L17-L49), [archive candidate parser](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/validate-skill-catalog.sh#L101-L133), [timing writes](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/bp-timing.sh#L23-L69).

### R9. VPS “all gates passed” is not an assertion

Individual failures print `FAIL`, but the final command unconditionally prints `ALL 8 GATES PASSED`. Other defaults include assuming port 22, modifying the application database directly, live database file copies, and downloading the latest provider CLI without a pinned artifact.

Sources: [operational defaults](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/harden-vps/SKILL.md#L14-L84), [fail-open summary](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/harden-vps/SKILL.md#L93-L105).

### R10. Smoke-check implementation differs from its schema

- It parses `method` but does not pass it to curl.
- YAML-mode successful HTTP status assertions do not increment `checks_passed`.
- Consequently, a successful status-only YAML configuration can end with “No checks were executed” and exit 1.
- The parser is hand-written rather than a full YAML parser.
- Response-time checking uses the surrounding `check_time` variable rather than an explicit function parameter. That may work through Bash dynamic scope, but makes the contract fragile.
- File-based URL selection needs explicit override tests.

Sources: [parsed fields and invocation](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/run-smoke.sh#L65-L146), [curl/assertions](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/run-smoke.sh#L152-L187), [final accounting](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/run-smoke.sh#L214-L234).

### R11. Dashboard runtime is neither schema-compatible nor entirely side-effect-free

Its release parser reads `file:` links, while current release planning writes `capsule_dir`. The HTTP route accepts any resolved `projectDir` containing `specs`; it does not bind access to the authorized project. WebSocket messages can append event files.

Default loopback binding reduces exposure but does not substitute for authorization, origin checks, or scoped file access.

Sources: [legacy schema parser](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/scripts/read-specs-status.cjs#L39-L89), [HTTP project selection](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/scripts/server.cjs#L142-L163), [WebSocket upgrade](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/scripts/server.cjs#L203-L217), [event persistence](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/scripts/server.cjs#L264-L277).

## Package and extension compatibility

### Current pinned behavior

The package declares all of these simultaneously:

- `pi.skills: ["./.pi/skills"]`
- `pi.prompts: ["./.pi/prompts"]`
- `pi.extensions: ["extensions/omp-hooks.ts"]`

The extension also registers every skill name through `registerCommand`. This duplicates the prompt-template slash commands.

Sources: [manifest](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/package.json#L31-L40), [extension registrations](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L247-L260).

### Upstream intent, separately from pinned HEAD

- [Issue #121](https://github.com/danielvm-git/bigpowers/issues/121), by `sudo-bakar`, reports duplicate commands on Pi 0.85.1 and suggests removing prompts.
- [Open PR #122](https://github.com/danielvm-git/bigpowers/pull/122), by `jagged-teeth`, deliberately takes the opposite approach: retain established generated prompts and remove extension command registration. It preserves native skills, `bigpowers_skill`, notification, and Git hooks. The inspected PR had no review records or discussion comments.
- [Merged PR #118](https://github.com/danielvm-git/bigpowers/pull/118), by `danielvm-git`, introduced fork-derived Jujutsu/runtime support and the OMP extension.
- [Merged PR #120](https://github.com/danielvm-git/bigpowers/pull/120), also by `danielvm-git`, repaired CI dependency installation for the extension smoke test. It did not fix command duplication.

**Recommendation:** follow #122's compatibility principle of one slash-command owner, but do not assume its remaining extension is necessary for Atomic. Native skills plus a small selected template set are sufficient for most retained capabilities. #122 is not part of the pinned commit.

### API compatibility is not established by the manifest

The extension uses a type-only `ExtensionAPI` import from `@earendil-works/pi-coding-agent`, runtime `typebox`, `registerTool`, messaging APIs, `session_start`, and `tool_call`.

Its fallback injection sends a message with `attribution: "user"` and `deliverAs: "nextTurn"` after `sendUserMessage` fails. That needs exact Atomic API and delivery-semantics validation, particularly for busy sessions. Its custom `bigpowers_skill run` both returns prompt content and attempts to enqueue it.

Source: [imports](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L1-L10), [prompt injection](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L190-L231), [tool run](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L349-L354).

The upstream smoke uses a fake API; it does not exercise Atomic's full loader, prompt discovery, concurrent tool execution, or command completion UI. Source: [test contract](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/omp-smoke.ts#L1-L11), [fake API](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/omp-smoke.ts#L38-L75).

### Git hooks are advisory pattern matching, not a security boundary

The extension checks only `bash`, gets the branch from process cwd, and uses command regexes. This does not reliably cover `git -C`, tool-level cwd changes, nested interpreters/scripts, PowerShell, or workflow-owned Node operations. It also lacks the documented landing exemption used by Bigpowers' other Git hooks.

Sources: [branch lookup and target matching](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L159-L176), [interception](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L367-L415), [solo exemption](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/profiles/solo-git.md#L25-L29).

**Recommendation:** do not enable these hooks automatically. If cross-session enforcement is later requested, define its scope, approved exceptions, actual tool coverage, and limitations first. Keep operation approval in the owning workflow/session. Use OS isolation when a real security boundary is needed.

### Dependencies and generated distribution

- Lockfile resolution observed: `@clack/prompts 0.10.1`, `picocolors 1.1.1`, `typebox 1.3.27`.
- `typebox` is declared as a development dependency despite the extension's runtime import. Atomic's host aliasing may supply it, but plain Node execution needs actual resolution.
- Puppeteer/Puppeteer Core and `@google/design.md` are dynamically resolved or invoked, without an exact extraction-specific lockfile found.
- Python scripts require Python/PyYAML; shell scripts assume Bash and assorted Unix commands.
- `big-counter`, Allure, provider CLI, browser tooling, and deployment credentials are separate dependencies, not guaranteed by installing Bigpowers.
- `.npmignore` excludes `specs/` and most `docs/`, while many skills reference them.
- Sync deletes and regenerates mirrors; it is not a read-only verification operation.

Sources: [dependencies](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/package.json#L57-L72), [package exclusions](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/.npmignore#L1-L11), [sync deletion/regeneration](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/sync-skills.sh#L59-L112), [Python resolution](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/python-env.sh#L12-L42).

Exact external-library runtime behavior remains an integration-validation prerequisite. Unresolved versions must not be filled in from latest releases.

## State, gates, and authority

### One runtime owner

Current Bigpowers doctrine requires critical-path skills to write `handoff.next_skill`, and agents to follow it. Its checked-in state has one global active flow/epic/story/bug and one handoff. Multiple skills and scripts write that file.

Sources: [state](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/specs/state.yaml#L1-L40), [state ownership and handoff mandate](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONVENTIONS.md#L158-L189).

**Proposed ownership:**

| Information | Proposed authority |
|---|---|
| Product scope, glossary, accepted requirements, ADRs | Existing project documents, edited by their owning parent/session |
| Execution state, pending stages, retry count, run identity | Atomic workflow runtime |
| Worker result and verification evidence | Run-scoped artifacts tied to the candidate revision |
| Current release/story delivery status | One explicitly chosen project schema, not several independently writable mirrors |
| Compatibility `handoff.next_skill` | Optional advisory projection only; never an autonomous scheduler |
| Approval | Actual authorized user decision tied to scope/candidate, not a YAML boolean invented by a worker |

Do not create an extension that watches `next_skill` and launches work. That would establish a second scheduler and could turn stale or repository-controlled data into actions.

### BCP and quality gates are methodology choices

Bigpowers connects BCP to planning, risk, release accounting, and velocity. BCP Plus describes 13 dimensions, calibration identity, confidence, and limitations. Those numbers are not model token budgets or measured execution time.

Its reference also says comparisons require matching calibration IDs and identifies external-validity limits. Changing the counter's model changes a score-affecting configuration.

Sources: [BCP obligations](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONVENTIONS.md#L170-L185), [BCP invariants/calibration](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp-plus.md#L132-L151), [limitations](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp-plus.md#L207-L223).

The following should require explicit adoption rather than silently becoming Atomic defaults:

- BCP sizing and BCP/hour accounting.
- Fixed 20-section specifications and approval-state tags.
- Mandatory dual review and 94% reviewer scores.
- Coverage thresholds and always-green scope expansion.
- Separate RED/GREEN commits.
- Story-tag annotations throughout source.
- Mandatory human UAT for every story.

The 94% compliance threshold counts repository Gherkin scenarios. That does not validate using the same percentage for subjective review findings. Source: [principles](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/PRINCIPLES.md#L67-L71).

### Release authority must remain explicit

Upstream `release-branch` combines readiness, release/open-PR/keep/discard choice, merge/push, archiving, and cleanup. Its mode defaults are internally inconsistent: team-pr is called default, while uncertainty prefers solo-local. Several assigned skills call it automatically.

Source: [mode policy](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/release-branch/SKILL.md#L23-L36), [integration and PR merge](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/release-branch/SKILL.md#L75-L119).

Recommendation:

- Completion may establish **ready for integration**, not permission to integrate.
- Reuse `commit-work` when committing is authorized.
- Preserve existing branch protection, signing, attribution, and publication conventions.
- Do not copy Bigpowers' prohibition on AI attribution or its requirement that commits appear human-only.
- Do not modify `CHANGELOG.md` or generated mirrors under the current local rules.
- Do not interpret a skill's “next” recommendation as authorization for commits, deletion, deployment, or publication.

Source: [upstream attribution and Git conventions](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONVENTIONS.md#L38-L51).

## Proposed native organization

This is an organization recommendation, not an authored package.

### Skills and templates

Retain a small methods collection, mostly as references added to existing skills:

- Planning: readiness, impact rubric, domain terminology, requirement deltas, release-index method.
- Engineering: RCA, fix validation, delegation independence, environment preparation.
- Operations: opt-in cleanup, hardening, observability, HTTP smoke checks.
- Design: module-interface alternatives and computed-style extraction.
- Maintenance: Bigpowers-specific authoring/audit criteria where they improve existing `skill-creator`.

Offer selected explicit templates only where the shortcut adds value. Do not create `/name` for every skill merely to mirror upstream.

### Principal workflow boundaries

1. **Planning:** optional discovery and evidence → clarification/decisions → accepted scope and release index → detailed plan → user confirmation.
   - `run-planning` owns execution.
   - `audit-plan`, `elaborate-spec`, domain/design methods, `plan-release`, and `plan-work` supply methods.
   - Optional impact/map specialists return bounded reports.

2. **Verified execution and bug repair:** scoped task/reproduction → implementation → verification → independent review → bounded repair → acceptance.
   - `delegate-task`, `fix-bug`, `request-review`, and optional `simulate-agents` share this infrastructure.
   - Preserve distinct review semantics; native builtin defaults do not automatically satisfy Santa's dual-review rule.
   - Release remains a separately authorized boundary.

3. **Skill maintenance:** inventory/audit → proposed change → controlled baseline/candidate evaluation → decision.
   - `stocktake-skills`, `run-benchmark`, and `evolve-skill` share this boundary.
   - Do not start with the upstream benchmark implementation.

4. **Operational execution:** use existing deployment/project workflows where already appropriate.
   - Do not introduce a hardening or cleanup platform for infrequent one-off work.
   - Skills remain usable inline when the user requests it.

Retries must create distinct iteration nodes. A “return to diagnose” instruction is conceptual control flow, not permission to add an edge to an existing ancestor in Atomic's graph.

### Concrete extension scope

Only the optional dashboard adaptation currently justifies extension-primary classification:

- On `session_start`, subscribe through `ctx.observeWorkflowActivity`.
- Dispose the subscription on shutdown/reload.
- Treat `unavailable`/`recovering` as unknown, not idle.
- Display read-only project status separately from runtime execution status.
- Preserve event identity/replay semantics.
- Never infer completion from `agent_end` alone; Atomic can automatically continue afterward.

No mandatory extension is needed for ordinary planning, verification gates, authoring, skill lookup, application logging, or file serialization.

## Model and thinking policy

### Evidence basis

Use the contract's configured catalog subset. No upstream skill model recommendation influenced these choices.

The numerical evidence is **dated**, not refreshed:

- Artificial Analysis snapshot read **2026-09-08**, Intelligence Index **v4.3**.
- DeepSWE **v1.1**, updated **2026-09-03**, with 113 tasks.
- The contract records a **2026-09-12** live retrieval that confirmed headings/methodology but did not expose chart scores.

Relevant sources are Atomic's `models/model-selection.md`, `models/evals.md`, [AA methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking), [Astra evaluations](https://artificialanalysis.ai/models/gpt-6-astra), [Fable 5.1 evaluations](https://artificialanalysis.ai/models/claude-fable-5-1), and [DeepSWE](https://deepswe.datacurve.ai/).

### Proposed executable-role policy

| Role | Proposed primary | Proposed fallback | Evidence and limitation |
|---|---|---|---|
| Scope synthesis, domain decisions, plan audit, review consolidation | `anthropic/claude-fable-5-1:high` | `openai-codex/gpt-6-astra:high` | Fable high **with default fallback** measured 54% AA-Briefcase and 57% GDPval-AA v2 normalized Elo, versus Astra high 50%/51%. AA cost was $3.91 versus $1.72 per Index task. These are transformed Elo displays, not pass rates. The benchmark's fallback configuration is not reproduced merely by choosing this model. |
| Impact/architecture analysis and difficult source reasoning | `openai-codex/gpt-6-astra:high` | `anthropic/claude-fable-5-1:high` | Astra high measured 54% Terminal-Bench v4.0 and 31% GDP.pdf All-pass. Evidence favors a source/tool-heavy candidate, not a guarantee of architecture-review accuracy. |
| Scoped implementation and routine bug repair | `openai-codex/gpt-6-astra:medium` | `anthropic/claude-fable-5-1:medium` | Matches Atomic's practical coding-effort guidance and bundled debugger default. DeepSWE's Astra **xhigh** result was 74% ±3 at $6.52/task, 29 average steps. That does **not** establish the same score at medium or inside Atomic. |
| Independent review, test design, complex diagnosis | `openai-codex/gpt-6-astra:xhigh` | `anthropic/claude-fable-5-1:xhigh` | Astra xhigh measured 60% Terminal-Bench v4.0 and 32% GDP.pdf All-pass, versus max 59%/31%. AA cost was $2.31 versus $3.26 per Index task. This supports avoiding max by default, not claiming validated security-review reliability. |
| Optional cheap inventory/location pass | Retain the builtin locator policy, currently `openai-codex/gpt-5.6-luna:xhigh` | Existing declared chain; otherwise Astra low | Suitable only for evidence extraction that is independently checked. Luna max measured 84% AA-LCR but only 12% Terminal-Bench v4.0; these are different effort settings from the proposed locator. Do not use it as a judgment gate from price alone. |
| Deterministic inventories, schema checks, serialization, test execution | **No independent model** | None | Tools produce evidence. Any enclosing model stage owns interpretation, not the deterministic result. |

Important distinctions:

- Skills and templates inherit the executing session's model. They need no independent pins.
- Reused named agents should retain their declared model/fallback policy unless an explicit task-specific override is justified.
- Provider/model failures may use configured fallback. Test failures, ordinary tool failures, cancellation, safety refusal, or rejected approval are not reasons to try another model.
- A second reviewer needs independent context, not a different model family merely for variety.
- Catalog presence is not live access.
- Cross-provider fallback must respect data-handling constraints.
- AA costs are dollars per **Intelligence Index task**, not token prices or predicted Atomic-run costs.
- DeepSWE's Astra costs are expected-launch-pricing estimates. Its overlapping confidence intervals do not establish a decisive lead over other top configurations.
- No listed benchmark validates the Bigpowers 94% gate, BCP calibration, or VPS automation safety.

## Licensing and attribution

Bigpowers' root license is MIT, copyright 2026 Daniel VM. Copies or substantial adaptations must retain its notice. Community attribution specifically credits the Jujutsu/runtime and OMP extension contributions.

Sources: [MIT license](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/LICENSE#L1-L21), [contributors](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONTRIBUTORS.md#L12-L46).

Do not assume the root MIT license grants unrestricted rights to every referenced external work. The BCP reference identifies original BCP material as **CC BY-NC-ND 4.0**, and the counter/framework must receive a separate provenance/license review before adaptation or redistribution. Conceptual discussion does not imply permission to copy restricted materials.

## Prioritized adoption sequence

These are proposed future steps only.

| Priority | Recommendation | Acceptance evidence needed |
|---|---|---|
| **P0** | Decide authority, state ownership, preserved methodology, and resource identity before importing anything. | Exact 81-name aggregate inventory; one primary per name; no duplicate slash registration; explicit no-install/no-publication behavior; preserved settings/source/generated files. |
| **P1** | Reuse existing Atomic skills and add only useful method references. Start with impact, readiness, domain language, specification clarity, RCA, and validation. | Trigger tests, source-qualified collisions, relative-reference resolution, version-grounded claims, user-question/approval behavior, and no hidden workflow under inline requests. |
| **P2** | Compose a small planning and verified-execution workflow layer. | Fresh reviewer contexts, actual candidate identity, partial-result handling, DAG validation, bounded retries, stop/resume behavior, no repeated side effects, and separate release authority. |
| **P3** | Add skill-maintenance evaluation only after replacing invalid benchmark assumptions. | Real with/without runs, immutable outputs, held-out cases, negative controls, fixed model/effort/environment, meaningful regression exits, and uncertainty reporting. |
| **P4** | Consider design extraction, smoke/report generators, or dashboard UI only for demonstrated gaps. | Corrected runner contracts, pinned dependencies, real browser/HTTP/Allure tests, read-only status semantics, path/auth boundaries, and process/subscription cleanup. |
| **P5** | Consider production hardening only as a separately authorized operational project. | Disposable-VM validation, rollback/console recovery, consistent backup and restore proof, secret handling, and failure-aware assertions. |

### Decisions still unresolved

1. Whether to adopt capsules, BCP, fixed specification sections, and story tags or retain current project planning formats.
2. Whether to retain dual-blind review and its cost, and what replaces the undefined 94% score.
3. Which project artifact owns glossary and delivery status.
4. Whether any compatibility export to `specs/state.yaml` is needed.
5. Whether a browser dashboard adds value beyond native workflow status and static diagrams.
6. Whether reproducible computed-style extraction warrants adapting the existing scripts or using native browser tooling.
7. Exact external dependency versions and separately licensed material needed by retained helpers.
8. Which commit, integration, and publication actions future users authorize.

None of these decisions has been enacted.

## Machine-readable classification contribution

This is the **40-row contribution** for the final `classifications.json`, not an 81-skill replacement. `report_source` identifies the corresponding detailed row and pinned citation above.

```json
{
  "upstream_commit": "cbff374ee2d4095b53a81696262a39f164fa0774",
  "upstream_version": "2.88.2",
  "canonical_total": 81,
  "scope": "assigned-40",
  "assigned_total": 40,
  "counts": {
    "skill": 23,
    "prompt-template": 6,
    "subagent": 2,
    "workflow": 8,
    "extension": 1
  },
  "classifications": [
    {"name":"assess-impact","primary":"subagent","secondary":["skill"],"report_source":"S01"},
    {"name":"audit-plan","primary":"skill","secondary":["workflow"],"report_source":"S02"},
    {"name":"change-request","primary":"skill","secondary":["workflow"],"report_source":"S03"},
    {"name":"compose-workflow","primary":"skill","secondary":["prompt-template"],"report_source":"S04"},
    {"name":"craft-skill","primary":"skill","secondary":["workflow"],"report_source":"S05"},
    {"name":"define-language","primary":"skill","secondary":[],"report_source":"S06"},
    {"name":"delegate-task","primary":"workflow","secondary":["skill","subagent"],"report_source":"S07"},
    {"name":"design-interface","primary":"skill","secondary":["subagent","workflow"],"report_source":"S08"},
    {"name":"diagnose-root","primary":"skill","secondary":["subagent"],"report_source":"S09"},
    {"name":"dispatch-agents","primary":"skill","secondary":["workflow"],"report_source":"S10"},
    {"name":"elaborate-spec","primary":"skill","secondary":["workflow"],"report_source":"S11"},
    {"name":"evolve-skill","primary":"workflow","secondary":["skill"],"report_source":"S12"},
    {"name":"extract-design","primary":"skill","secondary":[],"report_source":"S13"},
    {"name":"fix-bug","primary":"workflow","secondary":["skill","subagent"],"report_source":"S14"},
    {"name":"generate-allure-report","primary":"prompt-template","secondary":["workflow"],"report_source":"S15"},
    {"name":"grill-with-docs","primary":"skill","secondary":["subagent"],"report_source":"S16"},
    {"name":"harden-vps","primary":"skill","secondary":["workflow"],"report_source":"S17"},
    {"name":"inspect-quality","primary":"skill","secondary":["subagent"],"report_source":"S18"},
    {"name":"kickoff-branch","primary":"skill","secondary":["workflow"],"report_source":"S19"},
    {"name":"map-codebase","primary":"subagent","secondary":["skill"],"report_source":"S20"},
    {"name":"model-domain","primary":"skill","secondary":[],"report_source":"S21"},
    {"name":"organize-workspace","primary":"skill","secondary":[],"report_source":"S22"},
    {"name":"plan-release","primary":"skill","secondary":["workflow"],"report_source":"S23"},
    {"name":"plan-work","primary":"skill","secondary":["workflow","subagent"],"report_source":"S24"},
    {"name":"quick-fix","primary":"prompt-template","secondary":["skill"],"report_source":"S25"},
    {"name":"request-review","primary":"workflow","secondary":["subagent"],"report_source":"S26"},
    {"name":"reset-baseline","primary":"prompt-template","secondary":[],"report_source":"S27"},
    {"name":"run-benchmark","primary":"workflow","secondary":["subagent"],"report_source":"S28a"},
    {"name":"run-planning","primary":"workflow","secondary":["skill"],"report_source":"S28"},
    {"name":"search-skills","primary":"prompt-template","secondary":[],"report_source":"S29"},
    {"name":"seed-conventions","primary":"skill","secondary":[],"report_source":"S30"},
    {"name":"setup-environment","primary":"skill","secondary":["workflow"],"report_source":"S31"},
    {"name":"simulate-agents","primary":"workflow","secondary":["subagent"],"report_source":"S32"},
    {"name":"smoke-test","primary":"skill","secondary":["workflow"],"report_source":"S33"},
    {"name":"stocktake-skills","primary":"workflow","secondary":["subagent"],"report_source":"S34"},
    {"name":"terse-mode","primary":"prompt-template","secondary":[],"report_source":"S35"},
    {"name":"using-bigpowers","primary":"prompt-template","secondary":[],"report_source":"S36"},
    {"name":"validate-fix","primary":"skill","secondary":["workflow"],"report_source":"S38"},
    {"name":"visual-dashboard","primary":"extension","secondary":["prompt-template"],"report_source":"S39"},
    {"name":"wire-observability","primary":"skill","secondary":["workflow"],"report_source":"S40"}
  ]
}
```

Secondary mechanisms are optional decomposition/reuse recommendations, not automatically required new resources.

## Canonical skill permalinks

Each citation covers the substantive behavior used in its classification.

- **S01** [assess-impact, lines 10-92](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/assess-impact/SKILL.md#L10-L92)
- **S02** [audit-plan, lines 10-90](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/audit-plan/SKILL.md#L10-L90)
- **S03** [change-request, lines 13-59](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/change-request/SKILL.md#L13-L59)
- **S04** [compose-workflow, lines 13-67](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/compose-workflow/SKILL.md#L13-L67)
- **S05** [craft-skill, lines 13-109](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/craft-skill/SKILL.md#L13-L109)
- **S06** [define-language, lines 10-81](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/define-language/SKILL.md#L10-L81)
- **S07** [delegate-task, lines 11-92](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/delegate-task/SKILL.md#L11-L92)
- **S08** [design-interface, lines 10-98](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/design-interface/SKILL.md#L10-L98)
- **S09** [diagnose-root, lines 10-25](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/diagnose-root/SKILL.md#L10-L25)
- **S10** [dispatch-agents, lines 16-119](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/dispatch-agents/SKILL.md#L16-L119)
- **S11** [elaborate-spec, lines 11-103](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/elaborate-spec/SKILL.md#L11-L103)
- **S12** [evolve-skill, lines 14-37](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/evolve-skill/SKILL.md#L14-L37)
- **S13** [extract-design, lines 10-78](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/SKILL.md#L10-L78)
- **S14** [fix-bug, lines 11-69](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/fix-bug/SKILL.md#L11-L69)
- **S15** [generate-allure-report, lines 10-40](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/generate-allure-report/SKILL.md#L10-L40)
- **S16** [grill-with-docs, lines 10-43](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/grill-with-docs/SKILL.md#L10-L43)
- **S17** [harden-vps, lines 10-107](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/harden-vps/SKILL.md#L10-L107)
- **S18** [inspect-quality, lines 9-107](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/inspect-quality/SKILL.md#L9-L107)
- **S19** [kickoff-branch, lines 15-149](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/kickoff-branch/SKILL.md#L15-L149)
- **S20** [map-codebase, lines 10-72](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/map-codebase/SKILL.md#L10-L72)
- **S21** [model-domain, lines 10-99](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/model-domain/SKILL.md#L10-L99)
- **S22** [organize-workspace, lines 9-78](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/organize-workspace/SKILL.md#L9-L78)
- **S23** [plan-release, lines 9-145](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-release/SKILL.md#L9-L145)
- **S24** [plan-work, lines 17-100](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-work/SKILL.md#L17-L100)
- **S25** [quick-fix, lines 12-102](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/quick-fix/SKILL.md#L12-L102)
- **S26** [request-review, lines 15-117](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/request-review/SKILL.md#L15-L117)
- **S27** [reset-baseline, lines 10-22](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/reset-baseline/SKILL.md#L10-L22)
- **S28a** [run-benchmark, lines 12-88](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/run-benchmark/SKILL.md#L12-L88)
- **S28** [run-planning, lines 11-101](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/run-planning/SKILL.md#L11-L101)
- **S29** [search-skills, lines 13-74](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/search-skills/SKILL.md#L13-L74)
- **S30** [seed-conventions, lines 17-120](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/seed-conventions/SKILL.md#L17-L120)
- **S31** [setup-environment, lines 9-40](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/setup-environment/SKILL.md#L9-L40)
- **S32** [simulate-agents, lines 9-27](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/simulate-agents/SKILL.md#L9-L27)
- **S33** [smoke-test, lines 12-84](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/smoke-test/SKILL.md#L12-L84)
- **S34** [stocktake-skills, lines 16-66](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/stocktake-skills/SKILL.md#L16-L66)
- **S35** [terse-mode, lines 5-39](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/terse-mode/SKILL.md#L5-L39)
- **S36** [using-bigpowers, lines 9-108](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/using-bigpowers/SKILL.md#L9-L108)
- **S38** [validate-fix, lines 12-117](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/validate-fix/SKILL.md#L12-L117)
- **S39** [visual-dashboard, lines 5-51](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/SKILL.md#L5-L51)
- **S40** [wire-observability, lines 9-98](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/wire-observability/SKILL.md#L9-L98)

**Bottom line:** adopt selected methods through native reuse first. Consolidate orchestration, preserve explicit authority, and reject the existing benchmark runner as evidence of improvement. Leave installation, hooks, runtime adapters, and production operations unimplemented until their specific acceptance tests and unresolved decisions are addressed.