# Bigpowers integration assessment for Atomic

Research date: **2026-09-12**. Recommendations only.

## 1. Executive summary

**Do not install Bigpowers 2.88.2 unchanged or enable `extensions/omp-hooks.ts`. Selectively adapt its methods, reuse Atomic's native execution mechanisms, and keep delivery actions within explicit authorization.**

The canonical inventory contains **81 entries: 80 active skills and one tombstone, `define-success`**. Generated `.pi/skills` and `.pi/prompts` each contain another representation of those same 81 entries, not additional canonical skills.

| Primary recommendation | Count |
|---|---:|
| skill | 52 |
| workflow | 14 |
| prompt-template | 9 |
| subagent | 4 |
| extension | 2 |
| **Total** | **81** |

These classify responsibilities, not proposed resource counts:

- The 14 workflow-primary entries consolidate into **three principal workflows**: planning, verified implementation, and authorized delivery. Project coordination is optional; skill maintenance is deferred.
- The nine template-primary entries justify at most four initial shortcuts. Others are native replacements, deferred utilities, or an optional deprecated alias.
- Existing analyzers and research agents cover two subagent-primary entries. Investigation-only debugging and independent security review may justify distinct definitions.
- Neither extension is recommended for automatic adoption. Git interception requires a policy decision; a dashboard requires a demonstrated gap in native status.

Adoption dispositions remain **50 adapt, 14 replace-with-native, 10 defer, six decision-gated, one alias-only**. “Adapt” does not approve copying executable helpers unchanged.

The strongest reusable material concerns scope, domain language, impact analysis, reproducible diagnosis, test design, and evidence-based verification. The weakest integration candidates are the duplicate discovery mechanisms, mutable YAML scheduler, automatic delivery, invalid benchmark control, and fail-open verification helpers.

### Corrections to the prior assessment

1. **Autocomplete:** `assessment-1.md:207,245` overstated compatibility evidence. Atomic's default isolated interactive host deduplicates remote command names against local templates. The source establishes a **command-ownership collision**, not reproduction of Pi issue #121's duplicate autocomplete entries. In-process hosts and command catalogs have different behavior. Section 4 distinguishes them.
2. **Authorization:** `assessment-1.md:193,227` could imply repeated approval prompts. Each delivery action needs authorization coverage, but one explicit authorization can cover several actions. Ask only when authority is missing or scope changes, while preserving genuinely required approval gates.
3. **Classification:** no primary reclassification is needed. The source-backed `delegate-task` resolution from the first synthesis remains **skill**, with execution and retries owned natively.

Untested runtime compatibility remains uncertainty, **not itself a blocker to this research report**.

## 2. Evidence and inventory

### Evidence boundaries

- Bigpowers: version **2.88.2**, commit [`cbff374ee2d4095b53a81696262a39f164fa0774`](https://github.com/danielvm-git/bigpowers/tree/cbff374ee2d4095b53a81696262a39f164fa0774), inspected at `/home/pburr/src/oss/.versions/bigpowers/2.88.2-cbff374`.
- Atomic: installed version **0.9.19-alpha.7**, source commit [`3342c8d3648065d1568579dbe44baf534feddf5e`](https://github.com/bastani-inc/atomic/tree/3342c8d3648065d1568579dbe44baf534feddf5e), inspected through its versioned checkout.
- Inputs: `contract.md`, `inventory.json`, `skills-a.md`, `skills-b.md`, `integration.md`, `assessment-1.md`, and `review-1.json`.
- The partition reports provide full-canonical-skill and supporting-reference research. This synthesis reconciles that evidence and directly rechecks the disputed runtime paths and consequential supporting sources.
- GitHub reads on **2026-09-12** confirmed the requesting account as `payton-burr`, issue/PR status, PR authors, and PR #122's empty review/comment collections.
- Factory has one initial commit and no root `RULES.md`. Existing evidence records a signed initial commit and no implementation/test-runtime history from which to infer stronger conventions.

No upstream installation, setup, sync, bootstrap, hook, benchmark, deployment, or publication command was executed. Source findings below are static findings, not reproduced integration failures.

### Why the counts differ

| Source | Interpretation |
|---|---|
| Actual `skills/*/SKILL.md` | **81 canonical entries**, independently reconciled with `inventory.json` |
| `.pi/skills` and `.pi/prompts` | 81 generated mirrors each |
| [`define-success`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/define-success/SKILL.md#L1-L13) | Tombstone redirect to `plan-work`; no independent method |
| [`package.json:4`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/package.json#L1-L4) | “73 agent skills” is stale description text |
| [`README.md:5`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/README.md#L1-L5) | Badge counts 81, including the tombstone |
| [`README.md:191`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/README.md#L191) | “80” matches the active-only count, but is not the complete canonical inventory |
| [`scripts/mcp-server.js:2`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/mcp-server.js#L1-L8) | “68” is another stale description |

The generated adapter expands sibling Markdown into mirror bodies rather than preserving progressive disclosure. See [`srp-engine.py:74-89`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/srp-engine.py#L74-L89) and [`adapters/pi.sh:26-34`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/adapters/pi.sh#L26-L34). The integration research measured `develop-tdd` growing from 140 to 416 lines and `migrate-spec` expanding to approximately 32 KB.

All 81 canonical files contain upstream model recommendations. None informs the model policy here.

## 3. Classification rules and resolved disagreements

Atomic says to use the [lightest mechanism that solves the problem](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/build.md#L12-L22).

| Mechanism | Proposed ownership |
|---|---|
| **skill** | Reusable method and knowledge, progressively loaded. It grants no permissions or delegation authority. |
| **prompt-template** | Explicit user shortcut with arguments. It does not schedule work or change models. |
| **subagent** | Bounded specialist with isolated context. Parent owns user decisions and consequential transitions. |
| **workflow** | Durable dependencies, stage contracts, artifacts, checkpoints, gates, and bounded repair. |
| **extension** | Actual event interception, reusable tools, or live UI where lighter mechanisms do not suffice. |

Native contracts: [skills](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/skills.md#L74-L149), [templates](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/prompt-templates.md#L5-L19), [subagents](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/subagents.md#L49-L55), [workflow/extension boundary](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/workflows/authoring.md#L159-L171), and [extension events](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/extensions/events.md#L510-L527).

### Source-based resolutions

| Disagreement | Resolution |
|---|---|
| `delegate-task`: workflow versus native execution shape | **Skill.** Its useful additions are briefing depth, the self-contained brief, and report-then-diff review. Native `subagent` plus existing review/repair compositions own dispatch and retries. Source: [18-90](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/delegate-task/SKILL.md#L18-L90). |
| `investigate-bug`: knowledge versus executable role | **Subagent**, constrained to investigation. It produces a bounded causal report and fix plan; `diagnose-root` retains the diagnostic method. |
| `execute-plan` and `run-planning`: workflows versus “not separate workflows” | **Workflow-primary responsibilities**, consolidated as modes/components rather than separate schedulers. |
| `request-review` and `simulate-agents`: reviewers versus workflows | **Workflow.** Each coordinates multiple roles and aggregates outcomes. The individual reviewers are secondary subagents. |
| `audit-code`: self-audit versus independent review | **Skill.** Its source explicitly defines author self-review. Independent review remains separate. |
| `design-interface`: UI versus API design | **Skill for software module/API design**. Route to `how` and analysis, not automatically to `impeccable`. |
| `hook-commits`: Git hooks versus Atomic extension | **Skill.** Repository hook setup is different from intercepting Atomic tool events. |
| `visual-dashboard`: extension versus no import | **Extension-primary, deferred adoption.** Native status replaces it unless a specific gap is demonstrated. |
| Model disagreements | Preserve declared builtin policies when reusing named agents/compositions. Use the dated, role-specific policy in section 8 for newly proposed roles, not upstream skill pins. |

## 4. Package and runtime compatibility

### Corrected command-ownership analysis

At the Bigpowers pin, the [manifest](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/package.json#L31-L40) loads skills, prompts, and the extension. The extension independently [registers every skill name](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L252-L260).

Those competing registrations must be distinguished from what each Atomic UI displays:

| Atomic path | Source-established behavior | Conclusion |
|---|---|---|
| Default isolated interactive host | [`main.ts:350-353`](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/main.ts#L350-L353) selects isolation; [`596-604`](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/main.ts#L596-L604) disables host extension loading. Local prompt templates participate in the [remote-command merge](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/modes/interactive/interactive-autocomplete.ts#L312-L339). [Already-taken and repeated remote names are suppressed](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/modes/interactive/interactive-autocomplete.ts#L163-L188). | **Command-ownership collision with autocomplete deduplication.** Pi's duplicate-entry symptom is not established here. |
| In-process interactive construction | The autocomplete builder combines local extension commands and templates through separate lists. The isolated-host remote deduplication does not establish equivalent local cross-list behavior. | Keep a separate future runtime check; do not generalize the default-host result. |
| Extension command catalog | [`getCommands()`](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/core/agent-session-extension-bindings.ts#L217-L242) concatenates extension, template, and skill records. | Catalog records can retain competing sources even when autocomplete displays one name. |
| RPC command catalog | [`get_commands`](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/modes/rpc/rpc-command-handler.ts#L548-L579) likewise enumerates extension commands and templates separately. | Catalog enumeration is not proof of duplicate rendered suggestions. |
| Execution | [Extension dispatch precedes template expansion](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/core/agent-session-prompt.ts#L67-L120). | A deduplicated suggestion does not remove competing ownership or guarantee the template body executes. |

Recommendation: **one owner per unqualified slash command**. Retained skills should use native `/skill:name`; add only useful explicit templates. Do not register every skill again through an extension.

### Remaining compatibility risks

1. **Imports have a supported compatibility path, not a tested integration guarantee.** Atomic aliases the legacy Pi coding-agent import to its own implementation and aliases TypeBox. See [loader aliases](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/core/extensions/loader-virtual-modules.ts#L412-L443). That establishes a plausible load path, not blanket behavioral compatibility.

2. **`bigpowers_skill run` has a source-predicted false receipt.** Bigpowers [awaits `sendUserMessage` and reports `injected: true`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L210-L233). Atomic's binding [returns without awaiting delivery and reports rejection separately](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/core/agent-session-extension-bindings.ts#L276-L287). A streaming prompt without a delivery mode [throws](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/core/agent-session-prompt.ts#L123-L137). Thus the tool's receipt can claim injection while delivery fails. Its result separately echoes the prompt. No runtime reproduction was performed.

3. **Different entry points serve different bodies.** Native `/skill:name` reads the generated inlined mirror; the extension reads canonical files. Relative references and loaded context differ.

4. **The Git guard is incomplete and incompatible with current conventions.** It handles only `bash`, obtains the branch from process cwd, blocks all commits on `main`/`master`, and parses commit messages with simple regexes. The user's `commit-work` heredoc form is misread. `git commit -F`, nested scripts, and some refspecs bypass checks. See [branch/message helpers](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L159-L183) and [handler](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/extensions/omp-hooks.ts#L367-L415).

5. **Resource duplication extends beyond slash commands.** Native skills, generated templates, extension `get/run`, and two MCP servers repeat discovery/activation. Setup symlinks can add further skill identities. Atomic already provides source-qualified skills and `ctx.getSkillCatalog()`.

6. **Local `-e` borrowing is a separate uncertainty.** Atomic can borrow `.atomic`, `.pi`, and `.agents/skills` resources after trust. Whether this exact package produces additional identities needs a future scoped check, not an asserted duplicate count. See [package behavior](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/packages.md#L64-L75).

### Upstream intent, distinct from pinned behavior

On **2026-09-12**:

- [Issue #121](https://github.com/danielvm-git/bigpowers/issues/121), by `sudo-bakar`, remained open with no comments. It reports duplicate autocomplete entries on **Pi 0.85.1** and proposes removing prompts.
- [PR #122](https://github.com/danielvm-git/bigpowers/pull/122), by `jagged-teeth`, opened **2026-09-09**, remained open and unmerged with no review records or comments. It instead preserves established `.pi/prompts` and removes per-skill extension registration. It retains native skills, `bigpowers_skill`, notification, and Git hooks.
- [PR #118](https://github.com/danielvm-git/bigpowers/pull/118), by `danielvm-git`, merged **2026-09-01**, introduced fork-derived runtime/Jujutsu support and the OMP extension.
- [PR #120](https://github.com/danielvm-git/bigpowers/pull/120), same author, merged **2026-09-06**, added CI dependency installation for the OMP smoke test. Its rationale explicitly rejects skipping that test when dependencies are absent.

Adopt #122's **single slash-command owner principle**, not its entire retained extension. Its proposed behavior is not part of the assessed pin. The existing smoke test uses a fake API and does not establish Atomic host compatibility.

## 5. Exhaustive classification table

Every canonical name appears once below.

Disposition abbreviations: **A** adapt; **N** replace-with-native; **D** defer; **G** decision-gated; **Alias** optional tombstone redirect.

“Current” describes upstream instructions, including their side effects. “Validation” describes future acceptance evidence, not tests executed during this assessment. All rows inherit these adaptation requirements:

- Ignore/remove upstream model routing.
- Preserve source, generated files, `CHANGELOG.md`, settings, and existing project conventions.
- Treat skills as methods, not permission grants.
- Replace execution-state writes with native ownership.
- Resolve exact dependency versions before retaining dependent code.
- Preserve authorization already granted; ask only for missing decisions or changed scope.

### Entries 1-20

| # | Canonical skill and source | Primary / disposition | Current behavior, inputs, outputs, side effects | Secondary ownership, rationale and native reuse | Specific adaptations | Validation before integration |
|---:|---|---|---|---|---|---|
| 1 | [align-grid](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/align-grid/SKILL.md#L20-L108) | **skill / A** | Takes editorial brief/grid parameters; generates HTML, CSS and optical-alignment JS; renders through Puppeteer; directs image hosting/publication. | Specialized design reference for `impeccable`; existing UI verification owns measurements. No scheduler needed. | Make Swiss styling optional; remove Hyperagent-only tools/publication; repair selector, multi-grid and baseline checks; avoid unconditional `--no-sandbox`. | Missing targets must fail. Test second spreads, font fallback, narrow widths, accessibility and sensitivity to actual misalignment. |
| 2 | [assess-impact](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/assess-impact/SKILL.md#L10-L92) | **subagent / A** | Searches callers, history, stories and tests for a proposed change; writes `IMPACT_LATEST.md`; adds heuristic risk score/interview gate. | Existing analyzer/locator returns bounded findings; parent owns persistence and risk acceptance. Rubric stays reference material. | Replace TypeScript-only searches; distinguish matches from callers; label score and “<10s” target uncalibrated. | Re-exports, dynamic callers, missing tests and net-new code; finding `Risk:` cannot alone pass acceptance. |
| 3 | [audit-code](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/audit-code/SKILL.md#L15-L137) | **skill / A** | Self-reviews changes using churn/checklists; may fix issues; writes report/handoff; gate and parallel-worktree modes. | Author owns self-review. Reuse `qlty` and project checks; independent reviewer remains separate. | Separate judgment from executable verdicts; remove upstream-only conventions and unrequested repairs; include uncommitted candidate. | Seed real defects; cover staged/unstaged changes, quick-mode omissions, report freshness and worktree preservation. |
| 4 | [audit-plan](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/audit-plan/SKILL.md#L10-L90) | **skill / A** | Audits plan/PRD/specs for scope, vertical stories, conventions and commands; asks questions; writes READY/NOT READY report. | Readiness method augments `create-spec`; planning consumes structured result, parent resolves decisions. | Replace mandatory Bigpowers filenames with project-appropriate evidence; use structured questions. | Imported plans, non-app repos, missing commands, genuine N/A checks and withheld approval. |
| 5 | [build-epic](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/build-epic/SKILL.md#L13-L104) | **workflow / A** | Sequences threat modeling, planning, branching, TDD, verification, audit, commit/release; writes counters, BCP and generated trace/wiki state. | Story mode of shared verified implementation. Methods stay skills; delivery is separate. Reuse fitting `goal`/`ralph` components. | Resolve epic/story scope, step fields and step-zero threat-model bypass; one state writer; no implicit generated sync or delivery. | Resume each boundary without duplicate effects; failed audit blocks; threat model cannot disappear; concurrent status is preserved. |
| 6 | [change-request](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/change-request/SKILL.md#L13-L59) | **skill / A** | Adds/reprioritizes release stories; computes WSJF, records deltas, writes YAML and syncs status; conversational placement confirmation. | Parent owns negotiated changes; deterministic arithmetic/schema checks support the method. Reuse project planning. | Resolve flat/capsule paths; use `(BV + TC + RR) / Job Size`; preserve IDs/in-progress work. Seeder is not reconciler. | Positive sizing, dependency cycles, duplicate IDs, declined placement, and equal confirmation discipline in structured modes. |
| 7 | [commit-message](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/commit-message/SKILL.md#L19-L59) | **prompt-template / N** | Reads Git/Jujutsu changes and intent; proposes atomic messages/version impact; writes release handoff. | Optional drafting shortcut reuses installed `commit-work`; release-config notes remain references. | Drafting does not authorize staging/committing; preserve signing and user attribution; remove handoff mutation. | Mixed changes produce separate proposals; draft leaves index/history untouched; custom release rules and breaking footers handled. |
| 8 | [compose-workflow](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/compose-workflow/SKILL.md#L13-L67) | **skill / N** | Interviews about a repeated sequence; writes YAML recipes, terminal states and decision notes; optionally updates orchestrator references. | Authoring is method, not scheduling. Reuse Atomic workflow docs/SDK and builtin compositions. | Treat recipes as design inputs; reject unrelated “eight recipes exist” verification; no automatic `/ship`. | Explicit contracts, DAG shape, unique retries, terminal mappings and no unauthorized delivery. |
| 9 | [context7-mcp](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/context7-mcp/SKILL.md#L11-L57) | **skill / D** | Resolves libraries, queries docs under a call cap, reports unavailable state and writes local cache. | Retrieval discipline uses existing MCP gateway; no new client/extension. | Require configured server and exact-version local source first; stored ETags do not implement HTTP revalidation. | Wrong versions, no match, quota, timeout and stale cache; missing evidence remains explicit. |
| 10 | [craft-skill](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/craft-skill/SKILL.md#L13-L109) | **skill / N** | Interviews, writes skill/resources, adds model frontmatter, validates, syncs and reviews. | Reuse `skill-creator`, `prompt-engineer`, `writing-for-agents`; maintenance workflow owns experiments. | Keep useful contract references only; remove pins, arbitrary line limits, placeholders and sync. | Trigger accuracy, metadata, relative assets, provenance and unchanged generated mirrors. |
| 11 | [deepen-architecture](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/deepen-architecture/SKILL.md#L12-L116) | **skill / A** | Explores churn/module depth; interviews on candidates; updates vocabulary, ADRs and import boundaries. | Parent owns design judgment; `how`, analyzer and pattern-finder supply evidence. Optional alternative workers. | No mandatory three-agent fan-out or universal shell policy; resolve ADR paths; preserve tests until replacement coverage exists. | Reject speculative abstractions; compare distinct alternatives; preserve behavior and ADR intent. |
| 12 | [define-language](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/define-language/SKILL.md#L10-L81) | **skill / A** | Extracts terms, aliases and relationships; resolves ambiguity; writes glossary. | Parent owns terminology; `model-domain` consumes one glossary. Reuse planning vocabulary work. | Choose one location; mark inferred cardinalities and unresolved meanings. | Conflicting terms, partial agreement, existing glossary updates and unrelated-content preservation. |
| 13 | [define-success](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/define-success/SKILL.md#L1-L13) | **prompt-template / Alias** | Tombstone redirect to `plan-work`; no independent method. | Optional deprecated shortcut only. Default is no new resource. | Hide from automatic selection; give compatibility alias an expiry. | Exact inventory name retained; redirect resolves once without duplicate registration. |
| 14 | [delegate-task](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/delegate-task/SKILL.md#L11-L92) | **skill / N** | Briefs one fresh agent; retries; reviews report then diff; accepts/revises/rejects; acceptance includes merge/state write. | Retain brief/checklist. Native `subagent` owns dispatch; shared execution owns durable repair. | Remove Agent/YAML-only assumptions and Markdown-in-YAML writes; inspect actual uncommitted candidate. Acceptance is not merge authority. | Failed verification, report/diff disagreement, exhausted retries and no unauthorized merge. |
| 15 | [deploy](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/deploy/SKILL.md#L11-L111) | **workflow / G** | Detects target/build, builds, deploys, polls/retries and probes live URL. | Deployment mode of delivery; existing platform CLI/MCP performs actions; smoke method supplies checks. | Bind environment/artifact to authorization; credentials are not permission; replace placeholders; reconcile unknown outcomes before retry. | Declined authority causes no write; stale artifact, timeout, duplicate submission and unhealthy deployment handled. |
| 16 | [design-interface](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/design-interface/SKILL.md#L10-L98) | **skill / A** | Generates multiple module/API designs through parallel agents; compares signatures/callers; asks selection; excludes implementation. | Parent owns alternatives method; optional candidate workers or `generate-and-filter`. Reuse `how`, not automatic frontend routing. | Replace Task API; make mandatory fan-out an explicit methodology choice; respect inline work. | Distinct alternatives against identical requirements; usable caller examples; no implementation before selection/scope. |
| 17 | [develop-tdd](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/develop-tdd/SKILL.md#L16-L137) | **skill / N** | Vertical RED/GREEN; mandates separate failing-test/implementation commits, stash checkpoints, status writes and UAT. | Bundled `tdd` owns method; approved worker/debugger executes it. | Explicitly choose behavioral RED evidence instead of mandatory red commits unless adopted; remove automatic stash/drop/commit/sync. | RED fails for intended behavior, not environment errors; GREEN repeats scenario; no unexpected Git changes. |
| 18 | [diagnose-root](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/diagnose-root/SKILL.md#L10-L25) | **skill / A** | Reproduce, isolate, hypothesize, verify; conflicting instructions about bug-file writes. | RCA reference for debugger; parent/investigation stage owns artifact. | Resolve write ownership; allow multiple causes and uncertainty; constrain diagnosis-only scope. | Unreproducible failures, falsified hypotheses, partial diagnosis and no speculative patches. |
| 19 | [diagnose-stall](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/diagnose-stall/SKILL.md#L11-L55) | **skill / N** | Reads state/locks/terminals, classifies stall, recommends recovery and writes report. | Native task/workflow observation replaces watchdog; retain diagnostic reasoning. | Distinguish quiet provider, human wait, pause and unavailable telemetry; use owned task IDs. | Silence never triggers duplicate launch; approval waits survive; stop request is not reported as termination. |
| 20 | [dispatch-agents](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/dispatch-agents/SKILL.md#L16-L119) | **skill / N** | Tests independence, briefs parallel agents, collects diffs/evidence and integrates results; custom failure counters/protocol. | Retain independence checklist; native subagent/Intercom and parent synthesis own execution. | Drop Orca envelopes and duplicate counters; distinguish briefing depth from model effort. | Shared files/database/config, dependent tasks, quiet workers and yielded observations cannot cause unsafe parallelism or relaunch. |

### Entries 21-40

| # | Canonical skill and source | Primary / disposition | Current behavior, inputs, outputs, side effects | Secondary ownership, rationale and native reuse | Specific adaptations | Validation before integration |
|---:|---|---|---|---|---|---|
| 21 | [edit-document](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/edit-document/SKILL.md#L10-L24) | **prompt-template / N** | Reads history, orders sections, confirms structure and rewrites with paragraph-length constraint. | Short explicit recipe reuses `unslop` and `writing-for-agents`. | Make length preference optional; preserve facts, obligations, quotations and uncertainty. | Meaning, links and identifiers survive; prohibited files unchanged; no repeated preference questions. |
| 22 | [elaborate-spec](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/elaborate-spec/SKILL.md#L11-L103) | **skill / A** | Clarifies actors, success, constraints and scope; confirms before writing/replacing planning context. | Parent dialogue augments `create-spec`; planning workflow consumes confirmed output. | Discover facts first; reconcile missing `written_at` with consumer freshness check. | Stale/current context, declined replacement, ambiguity and no code generation. |
| 23 | [enforce-first](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/enforce-first/SKILL.md#L13-L47) | **skill / A** | Reviews F.I.R.S.T, optionally fixes/reruns tests; mechanical gate checks rubric text. | Test-quality method within TDD/audit; project runner supplies evidence. | Text presence is not enforcement; separate read-only review from repair; disclose quick omissions. | Seed order dependence, nondeterminism and missing assertions; distinguish absent documentation from bad tests. |
| 24 | [evolve-skill](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/evolve-skill/SKILL.md#L14-L37) | **workflow / D** | Baselines, edits, syncs, benchmarks, reverts regressions and records ADR/state. | Maintenance workflow owns controlled change; `skill-creator` supplies method. | Block use of invalid upstream benchmark evidence; no automatic source rollback or mirror sync. | Fixed candidate/model/effort/fixtures, held-out cases, regressions, inconclusive results and iteration bounds. |
| 25 | [execute-plan](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/execute-plan/SKILL.md#L10-L56) | **workflow / A** | Executes dependent epic tasks in fresh contexts; verifies, asks per-step approval and updates state. | Human-checkpoint mode of shared implementation; native stages own pauses and ordering. | Typed artifacts replace YAML-only communication; preserve chosen step gates, stops/reordering; bound repair. | Resume exact remaining work; red checks and cancelled questions block advancement; no implicit release. |
| 26 | [extract-design](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/SKILL.md#L10-L78) | **skill / A** | Extracts URL/HTML computed styles through Puppeteer; classifies tokens; writes design doc; runs dynamic linter and handoff writer. | Method augments `impeccable`; browser/helper tools gather observations; parent interprets. | Correct browser lifetime, spacing types, async tests and lint exit. Pin dependencies; Playwright substitution is an explicit departure. | Light/dark, pseudo-states, SPA readiness, offline lint, hostile pages and uncertainty reporting. |
| 27 | [find-way](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/find-way/SKILL.md#L13-L100) | **skill / G** | Creates map/decision issues, labels dependencies, assigns/researches, comments/closes and creates follow-on tickets. | User-led decision method; existing tracker/research tools. Local todo is an alternative with different semantics. | Resolve upstream automated-issue ban; explicitly choose tracker/local artifacts; remove automatic fan-out. | No unapproved tracker mutation; concurrent claims refresh correctly; charting does not silently resolve decisions. |
| 28 | [fix-bug](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/fix-bug/SKILL.md#L11-L69) | **workflow / A** | Owns bug flow/cycle, investigation, RCA, TDD, validation, release and resume. | Bug mode of shared implementation; reuse debugger/TDD and verification. | Remove duplicate RCA and automatic release; parent owns stable bug identity; no global mutable cursor. | Original user scenario, recurrence, baseline failures, interrupted repair, concurrent bugs and failed validation. |
| 29 | [gate-trace](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/gate-trace/SKILL.md#L14-L97) | **skill / A** | Reads/regenerates trace inputs; applies verdict/confidence rules; critic/refutation; writes gate/handoff. | Policy reference; deterministic reducer in shared verification; separate bounded critic. | Complete precedence, 60-79% interval and R6; drift cannot improve failure; missing data is not merge permission. | Truth-table thresholds/combinations, corrupt inputs and waivers; critic exit is distinct from semantic verdict. |
| 30 | [generate-allure-report](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/generate-allure-report/SKILL.md#L10-L40) | **prompt-template / D** | Converts story/bug metadata into JUnit and Allure files; unfinished stories become failed testcases. | Explicit shortcut to deterministic reporting; optional CI stage, no independent model. | Label delivery status separately from executed tests; reconcile structured status schema. | XML escaping, stable IDs, empty/malformed input, bug totals and actual Allure ingestion. |
| 31 | [grill-me](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/grill-me/SKILL.md#L10-L43) | **skill / A** | Interactive design challenge; separates facts/decisions; docs mode; blocks spec/implementation before confirmation. | Parent-led method using structured questions and `how`/`why`. | Consolidate docs variant; discover facts independently; honor existing approval and genuine gates. | No fact-finding questions unnecessarily sent to user; cancelled or unresolved decisions do not authorize writes. |
| 32 | [grill-with-docs](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/grill-with-docs/SKILL.md#L10-L43) | **skill / A** | Challenges plan/API assumptions with official docs/quotes; may update plan despite separate confirmation prohibition. | Researcher gathers evidence; parent owns tradeoffs/edits. Reuse native web/code tools. | Exact-version sources first; separate evidence gathering from accepted edits. | Wrong versions, inaccessible docs, unsupported claims and abstention when evidence is absent. |
| 33 | [guard-git](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/guard-git/SKILL.md#L12-L45) | **extension / G** | Installs cross-client hooks/settings; regex blocking and partial branch/message policy. | Optional event interception; repository/server protections remain separate. Default recommendation is no extension. | Do not port monolith; scope tools/effective cwd; reconcile promised secret/author checks; no self-authorizing bypass; preserve covered approvals. | Heredocs, `git -C`, flags, scripts, aliases, worktrees, remotes, PowerShell and documented bypass limits. |
| 34 | [harden-vps](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/harden-vps/SKILL.md#L10-L107) | **skill / D** | Root Ubuntu hardening: firewall, SSH, packages/services, DB inserts, cron backups and provider snapshots. | Opt-in host-specific runbook; simplest direct operational path. Repeated fleet work alone might justify orchestration. | Establish console/key recovery; consistent DB backup; no application-auth bypass via inserts; pin downloads; fix unconditional success. | Disposable VM, restore proof, custom SSH ports, IPv6, failed gates and credential-safe logs. |
| 35 | [hook-commits](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/hook-commits/SKILL.md#L12-L95) | **skill / A** | Installs Husky/lint-staged/Prettier, writes prepare/hooks/config, formats staged files and commits setup. | Repository setup method; reuse existing hooks, formatter and authorized `commit-work`. | Exact versions; preserve existing prepare/config; recognize `bun.lock`; no blanket formatting or automatic commit. | Package managers, existing hooks, absent scripts, repeat setup and unrelated staged/generated files. |
| 36 | [inspect-quality](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/inspect-quality/SKILL.md#L9-L107) | **skill / A** | QA conversation clarifies expected/actual behavior, explores, groups issues and writes registry details; no fixes. | Parent owns intake/registry; optional analyzer supplies context. | Replace Markdown presented as registry YAML; distinguish hypotheses from verified causes. | Duplicate/intermittent reports, splitting issues, incomplete evidence and logging without starting repair. |
| 37 | [investigate-bug](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/investigate-bug/SKILL.md#L10-L127) | **subagent / A** | Reads history, assesses security, invokes RCA, verifies cause, writes fix plan/registry and recommends branch. | Investigation-only debugger returns evidence; parent owns intake, registry and implementation permission. | Constrain default debugger's editing behavior; retain source citations and stable bug ID. | Reproduce user scenario; falsify alternatives; unresolved cause stays unresolved; no patch, branch or commit. |
| 38 | [kickoff-branch](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/kickoff-branch/SKILL.md#L15-L149) | **skill / A** | Selects Git/Jujutsu, checks out/pulls default branch, offers specs commit, creates isolation/lock, preflights and writes handoff. | Preparation guidance; native worktree support owns isolation when selected. | Do not mutate primary checkout or auto-commit specs; repair non-atomic lock and ordering; avoid double isolation. | Dirty tree, no remote/default branch, linked worktree, contention and Jujutsu limitations. |
| 39 | [maintain-wiki](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/maintain-wiki/SKILL.md#L13-L66) | **skill / D** | INGEST broadly generates guides/wiki; LINT checks concepts; QUERY searches bundles. | Optional docs method using native read/search and `research-codebase`; no auto-sync hook. | Separate query/lint from generation; current generated-file rule prohibits ingestion; mtime is not semantic freshness. | Queries do not write; detect stale links/deleted sources; future generation needs exact authorized output scope. |
| 40 | [map-codebase](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/map-codebase/SKILL.md#L10-L72) | **subagent / N** | Scans manifests/source; maps entrypoints, flow, errors, APIs/tests/observability; writes architecture document. | Existing research/analyzer/pattern-finder roles return bounded report; parent persists. | Resolve versions/commit freshness; separate observations from changes; avoid overwriting domain language. | Monorepos, mixed architecture, missing tests, undocumented entrypoints and contradictory docs. |

### Entries 41-60

| # | Canonical skill and source | Primary / disposition | Current behavior, inputs, outputs, side effects | Secondary ownership, rationale and native reuse | Specific adaptations | Validation before integration |
|---:|---|---|---|---|---|---|
| 41 | [migrate-spec](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/migrate-spec/SKILL.md#L20-L111) | **skill / D** | Detects foreign layouts; interviews; maps artifacts/IDs; writes specs/trace, regenerates state and may write `CLAUDE.md`. | Occasional interactive transformation; existing diff/schema tools, optional extraction worker. | Resolve never-overwrite/regenerate conflict; preview every path; preserve foreign sources and active history. | Partial/multiple fingerprints, collisions, active work, refusal/merge/skip and idempotent second pass. |
| 42 | [model-domain](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/model-domain/SKILL.md#L10-L99) | **skill / A** | Interviews, models invariants/state machines, cross-checks code, writes context/glossary/ADRs and concurrency analysis. | Parent owns decisions; `define-language` owns glossary structure. Reuse `create-spec`, `how`, `why`. | Resolve tech-stack/CONTEXT/glossary and ADR ownership; file existence does not prove bounded contexts. | Conflicting terminology, invariant counterexamples, ADR numbering and concurrent edits. |
| 43 | [orchestrate-project](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/orchestrate-project/SKILL.md#L9-L68) | **workflow / G** | Six-phase lifecycle, counters, hard gates, model-bearing spawning, story sequencing and release snapshots. | Optional coordinator composes principal workflows for genuinely multi-phase projects. | No second YAML scheduler/model routing; reconcile per-story versus project release; replace unsupported estimates. | Phase resume, missing evidence, human stops, inline override and one delivery owner. |
| 44 | [organize-workspace](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/organize-workspace/SKILL.md#L9-L78) | **skill / A** | Inventories junk/assets; proposes exact moves/deletes; approves, executes/verifies; separately proposes ignore changes. | Parent-led cleanup method, not automatic hook. | Preserve generated/tracked/secret/concurrent work; resolve symlinks; prefer recoverable operations. | Declined/item-level approval, symlink escape, partial failure and ignore rules hiding real source. |
| 45 | [plan-refactor](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-refactor/SKILL.md#L9-L79) | **skill / A** | Interviews, checks assertions, captures invariants/testing and writes small-green-step refactor plan. | Planning method reuses `create-spec`, `how` and analysis. Proposed commits are not execution. | Keep source evidence; avoid unrelated LATEST overwrite; characterize untested behavior. | Every step preserves named invariants and has runnable verification; exclusions remain intact. |
| 46 | [plan-release](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-release/SKILL.md#L9-L145) | **skill / A** | Creates release index, epics/stories/tasks, execution status, WSJF and BCP; may snapshot approved plan. | Release-index method; `plan-work` owns detailed tasks; planning workflow sequences. | Resolve index-builder/task-writer contradiction; capsules, BCP, fixed sections and semantic-release are choices. | Stable IDs, dependency-safe priority, missing sizing, approved snapshots and no publication. |
| 47 | [plan-tests](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-tests/SKILL.md#L10-L42) | **skill / A** | Maps stories to priority scenarios, levels, fixtures/NFR commands; emits test plan and handoff. | Test architecture method with TDD/create-spec/project patterns; specialist optional. | Correct scenario IDs/hardcoded `e32`; lite mode cannot waive required NFRs; use pinned stack. | IDs join to acceptance criteria; P0 coverage; commands/environment valid; no implementation during planning. |
| 48 | [plan-work](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/plan-work/SKILL.md#L17-L100) | **skill / A** | Reads planning artifacts; investigates impact; writes story/tasks with verification/risk/security; consistency check and handoff. | Plan-quality method inside planning; reuse `create-spec`, targeted analyzers and schema checks. | Reconcile task states/sections; remove timing/model controls; validate active capsule, not first sorted capsule. | Deltas, locked sections, missing spec links, command runnability and distinction from behavioral proof. |
| 49 | [publish-package](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/publish-package/SKILL.md#L10-L71) | **workflow / G** | Detects registry, checks/builds/versioning, publishes and verifies visibility; offers dry-run/bypass options. | Registry mode of delivery owns irreversible mutation and receipts. | Remove TestPyPI upload from dry-run, no-verify and changelog edits; bind package/version/registry/visibility/artifact to authority. | Dry-run has no remote write; refusal blocks; duplicate version, stale artifact and uncertain outcome cannot cause repeat publication. |
| 50 | [quick-fix](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/quick-fix/SKILL.md#L12-L102) | **prompt-template / A** | Data-only fast path, one file/five lines and assertion; edits, verifies, commits/amends and releases. | Explicit shortcut; current session owns edit; eligibility guidance remains method. | Remove automatic Git/delivery; data-only can be high risk; require before/after reproduction and real failure exit. | Boundary counts, security-sensitive config, failed assertion and dirty files; escalation preserves inline request. |
| 51 | [release-branch](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/release-branch/SKILL.md#L19-L142) | **workflow / G** | Gates then solo/PR/keep/discard; commits/pushes/merges, archives, waits CI, deletes branches/worktrees and updates release state. | Branch-integration mode of delivery; reuse `commit-work`, Git/gh and verification inputs. | No solo default or force-removal. Check authorization coverage for each action without redundant prompts; repair CI/fallback status handling. | Covered multi-action authorization proceeds without reapproval; missing/changed scope asks; dirty work survives; cancelled CI/missing gh never means released. |
| 52 | [request-review](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/request-review/SKILL.md#L15-L117) | **workflow / A** | Two independent reviewers; both pass with zero must-fix and ≥94%; repair/repeat; contradictory three/five-round caps. | Shared review component owns fan-out/reducer/repair; reviewers are fresh workers. Reuse matching native compositions. | Resolve cap/undefined denominator; prefer criterion evidence and vetoes; dual review is explicit cost/method choice. | One-pass/one-fail, absent report, stale diff, reviewer independence, cap exhaustion and no incomplete-review merge. |
| 53 | [research-first](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/research-first/SKILL.md#L13-L56) | **skill / N** | Searches repo/catalog/registries/cache/web; writes adopt/extend/compose/build decision. | Reuse `research-codebase`, native research agents and web/code/MCP tools. | Exact-version checkouts replace opensrc/npx fallback; no generated index; preserve valid artifact syntax. | Versioned candidates/citations; unavailable evidence explicit; build decision explains insufficient reuse. |
| 54 | [reset-baseline](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/reset-baseline/SKILL.md#L10-L22) | **prompt-template / A** | Inspects Git, asks stash/discard/keep, proposes stash, reruns setup/tests. | Infrequent explicit operation in current session; benchmarks use disposable owned checkouts. | Stash mutates workspace and omits ignored files; preserve submodule/concurrent work; separate install authority. | Refusal, partial stash, restoration, ignored files and no force-push. |
| 55 | [respond-review](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/respond-review/SKILL.md#L9-L72) | **skill / A** | Classifies findings, asks design questions, fixes, tests and reports dispositions. | Repair method in existing review loop; worker/debugger handles scoped changes. | Reproduce disputed defects; preserve original acceptance criteria; account for every finding; no inferred merge permission. | No dropped findings; final-candidate checks; disagreements/defer reasons; no contract drift. |
| 56 | [run-benchmark](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/run-benchmark/SKILL.md#L12-L88) | **workflow / D** | Claims with/without trials, held-out scenarios, graders/reports/baselines; actual script fabricates control and repeats graders. | Maintenance experiment owner; deterministic graders score stored outputs; optional rubric evaluator. | Reject current runner as effectiveness evidence; real controls, immutable trials, correct metric and failure status required. | Negative controls, nonzero grader printing PASS, missing rubrics, contamination, summary/trial identity and baseline protection. |
| 57 | [run-evals](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/run-evals/SKILL.md#L11-L39) | **skill / D** | Defines capability/regression grading, stability/promotion, repeated runs and required-failure gates. | Evaluation-design method; native tools/workflows execute repetitions; reuse `skill-creator`/`prompt-engineer`. | Correct success-rate/all-k/pass@k terminology; calibrate graders; retain individual runs/flakes. | Seed regressions/grader mistakes; missing runs and failed required checks cannot become aggregate success. |
| 58 | [run-planning](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/run-planning/SKILL.md#L11-L101) | **workflow / A** | Resumable discovery checklist through survey/scope/research/release planning/slicing; writes cursor/status and deletes context. | Principal planning workflow composes conversational methods; native runtime owns progression. | Resolve fresh-project/registered-epic contradiction; use artifact identity/scope freshness; retain context. | Fresh start, partial resume, declined optional steps, stale approvals and no repeated planning work. |
| 59 | [scope-work](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/scope-work/SKILL.md#L13-L64) | **skill / A** | Interviews from context/specs; writes scope, exclusions/constraints and future story mappings. | Scope method in `create-spec`; parent owns decisions/artifact. | Preserve answers; resolve product/requirements paths; allow deferred IDs; no mandatory YAML framework. | Observable requirements, mapped/deferred coverage, justified exclusions and no clobbered scope. |
| 60 | [search-skills](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/search-skills/SKILL.md#L13-L74) | **prompt-template / N** | Regenerates lexical index, ranks candidates, recommends and invokes; documented index richer than generator. | Native catalog owns identity/discovery; optional shortcut recommends only. | Remove index writes and model-field routing; recommendation is not permission to execute. | Qualified collisions, disabled/untrusted resources, reload, no match and recommend-only scope. |

### Entries 61-81

| # | Canonical skill and source | Primary / disposition | Current behavior, inputs, outputs, side effects | Secondary ownership, rationale and native reuse | Specific adaptations | Validation before integration |
|---:|---|---|---|---|---|---|
| 61 | [security-review](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/security-review/SKILL.md#L26-L120) | **subagent / A** | Reviews diff/data flow, researches threats, filters confidence/exclusions; writes findings/threat model; detached worktree helper. | Independent bounded assessment; parent owns exceptions/fixes/delivery. Native specialists help, but no exact generic security reviewer exists. | Remove unsafe blanket exclusions; preserve uncertain high-impact concerns; include uncommitted diff and pre-code threats; correct examples. | Injection through docs/tools, path-prefix collisions, ReDoS/resource abuse, unsafe Rust/FFI and uncommitted-only vulnerabilities. |
| 62 | [seed-conventions](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/seed-conventions/SKILL.md#L17-L120) | **skill / A** | Interviews; generates instruction/convention/spec files, configs/symlinks and managed sections; sets workflow doctrine. | Reuse `writing-for-agents`; parent owns adopted policy and exact file edits. | Infer existing commands; preserve prose/settings; no empty presence-check files or silent solo/no-direct-coding doctrine. | Existing fences/prose, symlinks, read-only files, optional output contradictions and Windows failures. |
| 63 | [session-state](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/session-state/SKILL.md#L20-L143) | **skill / N** | Reads/writes state, Git identity, counters/handoff/preferences; clears IDs and archives open decisions. | Native sessions, compaction, workflow ledger and todo replace runtime state; optional handoff hygiene remains. | No second scheduler or automatic AGENTS/CLAUDE edits; one advisory-export writer; archiving does not resolve questions. | Resume/compaction preserves unresolved work and approvals; stale Git identity/concurrent writers handled. |
| 64 | [setup-environment](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/setup-environment/SKILL.md#L9-L40) | **skill / A** | Checks runtimes, installs lockfile deps, may copy env template, smoke-tests/records environment; offers big-counter install. | Project-native setup method, optional preparation stage; no persistent setup agent. | Setup/lifecycle scripts must be in scope; never overwrite env/secrets; omit BCP tooling unless adopted. | Repeat setup, offline/missing locks, incompatible runtime, partial installs and real environment verification. |
| 65 | [simple-english](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/simple-english/SKILL.md#L11-L70) | **skill / A** | Applies pragmatic/strict STE, preserves code, rewrites modals, runs heuristic lint/optional Vale; disclaims compliance. | Substantial optional language reference; reuse `unslop`, `writing-for-agents` and docs lint. | Opt in; preserve obligation/uncertainty; retain notices/dictionary boundary; regex lint is not full compliance. | Code/quotes unchanged; may/must meaning preserved; strict/pragmatic modes and missing Vale explicit. |
| 66 | [simulate-agents](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/simulate-agents/SKILL.md#L9-L27) | **workflow / A** | Runs Mock User/Auditor against script/diff, writes simulation report and routes failures. | Optional shared-verification branch; two bounded roles, parent consolidation. | Immutable inputs/fresh contexts; hypothetical simulation is not real platform testing or release approval. | Role isolation, uncovered scenarios, observed versus imagined failures and correct repair routing. |
| 67 | [slice-tasks](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/slice-tasks/SKILL.md#L12-L66) | **skill / A** | Cuts vertical stories/tasks, assigns BCP/deltas, updates manifests/order and verify commands. | Planning decomposition reuses `create-spec`; workflow/todo own execution. | Reconcile 1-13 shortcut and element-sum BCP; optional calibrated sizing, not time; preserve requirements. | End-to-end value per slice, acyclic dependencies, valid IDs/commands and complete deltas. |
| 68 | [smoke-test](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/smoke-test/SKILL.md#L12-L84) | **skill / A** | Reads URL/YAML; curl status/content/latency checks and logs; hard gate says deploy first. | HTTP verification method; deterministic tools observe; delivery owns post-deploy gate. | Invocation does not authorize deployment; fix ignored method/status accounting; default to authorized non-mutating requests. | Status-only success, DNS/timeouts, method/URL override, content mismatch and empty config. |
| 69 | [spike-prototype](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/spike-prototype/SKILL.md#L9-L96) | **skill / A** | Agrees question/timebox, writes throwaway experiment, records learning, deletes experiment and hands off. | Experiment method; optional worker in owned scratch space. | Security/credentials remain binding; retain useful evidence; no unowned deletion or implicit production integration. | Timebox, partial-answer outcome, unchanged original files, no production side effects and scoped cleanup. |
| 70 | [stocktake-skills](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/stocktake-skills/SKILL.md#L16-L66) | **workflow / D** | Batch catalog audit, validators/mirror/timing checks, optional verify execution; writes stocktake and routes fixes. | One maintenance workflow uses native fan-out/synthesis; workers read, later approved evolution writes. | Missing telemetry is not zero usage; presence is not content equality; audit commands before running; no automatic archive. | Exact inventory, drift, stale resources, duplicate identities and no unapproved repairs/deletions. |
| 71 | [survey-context](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/survey-context/SKILL.md#L12-L138) | **skill / A** | Reads conventions/specs/VCS, validates YAML, infers phase/next skill and writes timing/story/handoff state. | Context-selection method; native status and research tools replace startup control. | RULES/AGENTS first; status-only writes nothing; preserve Jujutsu; remove unconditional handoff/stale alias. | No-spec project, stale state and detached Git HEAD in colocated Jujutsu. |
| 72 | [terse-mode](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/terse-mode/SKILL.md#L5-L39) | **prompt-template / N** | Activates compressed style until stopped; drops grammar/hedging; claims approximately 75% savings. | Current-session preference; reuse concise output and `unslop`. | Preserve normal clarity and uncertainty; no unsupported savings claim or cross-session settings change. | Reset/off behavior, sensitive warnings, error quotations and technical fidelity. |
| 73 | [trace-requirement](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/trace-requirement/SKILL.md#L10-L70) | **skill / A** | Extracts story IDs, searches tags, writes covered/dark/orphan matrix and proposes gap planning. | Interpretation method; deterministic extraction supports native acceptance matrix. | Tags are claimed provenance, not correctness; align IDs/scope; preserve generated ownership. | Missing/orphan tags, false filename matches, archived stories, denominator and stale evidence. |
| 74 | [using-bigpowers](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/using-bigpowers/SKILL.md#L9-L108) | **prompt-template / N** | Onboarding/lifecycle guidance with setup commands, solo landing and survey routing; startup-frequency contradiction. | Optional help; native catalogs expose current methods/workflows. | Remove automatic setup/solo recommendations; explain departures; actual inventory, no session-start injection. | Help-only writes nothing, preserves settings and respects inline requests. |
| 75 | [validate-contracts](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/validate-contracts/SKILL.md#L12-L82) | **skill / A** | Describes schema/key/shape checks and repairs; runner checks top-level keys only and skips unsupported types successfully. | Contract-design method; project schema/API/migration tests own validation. | Resolve subset direction/modes; real parsing and safe paths; explicit consumer root; unsupported required checks block. | Exact/subset directions, nested keys, malformed data, quoted paths, missing files and non-vacuous failure. |
| 76 | [validate-fix](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/validate-fix/SKILL.md#L12-L117) | **skill / A** | Reruns failing scenario/suite/types/lint/hardening, sweeps defect class, manual proof; resolves bug registry; repeats. | Verification criteria method; shared bug workflow bounds repairs; parent owns bug identity. | Explicit ID/final candidate; no unchosen commit discipline; parse sweep evidence; scope sibling fixes deliberately. | User behavior still broken despite unit green, stale evidence, incomplete sweep and concurrent bugs. |
| 77 | [verify-work](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/verify-work/SKILL.md#L21-L149) | **workflow / A** | Preflight/tasks/cold start/build/types/lint/tests/security/trace/NFR/UAT; gap-repair loops and evidence/status writes. | Shared verification component; retain risk/UAT methods; native shell/browser/terminal tools. | Resolve mandatory versus risk-skipped UAT; preserve required checks; no broad pkill/cache deletion; final-candidate receipts. | User scenario, contiguous receipts, honest skips, exit status, stale evidence and bounded resume without duplicate effects. |
| 78 | [visual-dashboard](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/SKILL.md#L5-L51) | **extension / D** | Starts browser server/WebSocket/watchers; reads specs; persists session content/state/logs and interaction events. | Prefer native workflow status/graph and `show-me`. Only missing live projection justifies extension. | No second scheduler; repair capsule schema/path authority; bind/auth/origin policy; owned process/subscription cleanup. | Unknown versus idle, nested runs, pause/resume, scoped paths and no automatic handoff execution. |
| 79 | [wire-ci](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/wire-ci/SKILL.md#L10-L110) | **skill / A** | Detects forge/stack, copies CI template; documented validation modes differ from runner; default target is package root. | Occasional setup method using existing CI, validators and `qlty` where useful. | Explicit consumer root; preserve workflows; reconcile unsupported flags; remote dispatch is not dry-run; no surprise release permissions. | Unsupported forge writes nothing; existing configs preserved; real validation modes; no remote execution in local checks. |
| 80 | [wire-observability](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/wire-observability/SKILL.md#L9-L98) | **skill / A** | Adds application JSON logs/health/setup, writes instruction docs and verifies redaction/idempotence; BCP guidance. | Application instrumentation method inside approved implementation; existing logging stack owns runtime. | Exact dependencies; no parallel logging stack; reconcile userId/no-PII; check-then-create is not concurrency-safe. | Redaction, correlation, error/startup paths, useful boundary coverage, concurrent setup and replay. |
| 81 | [write-document](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/write-document/SKILL.md#L10-L77) | **skill / A** | Chooses ADR/context/guide/README; BMAD rules, verify commands/GEMINI indexes, possible compaction/sync. | Artifact-purpose method reuses `unslop`, `writing-for-agents`, `how`/`why`; README shortcut optional. | Preserve uncertainty; remove arbitrary 94% claims, compaction limits, placeholders and index proliferation; no generated sync. | Purpose/audience, factual citations, examples/links and no invented configuration or prohibited edits. |

## 6. Proposed Atomic-native organization

This is an organizational recommendation, not an authored package.

### Principal workflow boundaries

```text
Optional project coordinator
    |
    +-- Planning
    |     evidence -> clarification -> scope/domain decisions
    |     -> release index -> detailed tasks/tests -> readiness
    |     Output: accepted, versioned project plan
    |
    +-- Verified implementation
    |     story | explicit plan execution | bug repair
    |     -> worker/debugger -> real checks -> self-audit
    |     -> independent review -> bounded repair -> fresh checks
    |     Output: ready for integration, with candidate-bound evidence
    |
    +-- Authorized delivery
          branch integration | registry publication | deployment
          -> action-specific outcome verification
          Output: distinct integration, CI, publication, health and cleanup facts

Deferred maintenance
    inventory/audit -> proposed skill change
    -> valid baseline/candidate experiment -> acceptance decision
```

Ownership and dependencies:

- `run-planning` supplies the principal planning responsibility.
- `build-epic`, `execute-plan`, and `fix-bug` are implementation modes.
- `verify-work`, `request-review`, and optional `simulate-agents` are shared verification components.
- `release-branch`, `publish-package`, and `deploy` are delivery modes.
- `orchestrate-project` composes these only where a multi-phase project needs it.
- `stocktake-skills`, `run-benchmark`, and `evolve-skill` share deferred maintenance infrastructure.
- Product documents carry scope, glossary, requirements and ADRs. Run-scoped artifacts carry worker results and verification receipts.
- Planning artifacts feed implementation; exact-candidate evidence feeds delivery. Repairs create new uniquely identified nodes, never edges back to existing ancestors.

Atomic supports [composition rather than copying definitions](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/workflows/authoring.md#L501-L507) and requires [acyclic materialized topology](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/workflows/authoring.md#L165-L210).

Reuse `goal`/`ralph`, `fan-out-and-synthesize`, and `generate-and-filter` only when their contracts fit. `adversarial-verification` has a [mean-plus-veto contract](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/workflows/builtins.md#L87-L128), not Bigpowers' undefined dual-94% rule. Substitution requires an explicit methodology decision.

### Native replacements

| Upstream responsibility | Recommended owner |
|---|---|
| Skill discovery, lexical index, `bigpowers_skill`, MCP skill readers | Native catalog, `/skill:`, `ctx.getSkillCatalog()`, existing read/tool mechanisms |
| `state.yaml` counters and `handoff.next_skill` execution | Native workflow ledger, checkpoints and artifact handoffs |
| Lightweight tasks | Existing `todo` |
| Dispatch envelopes, retry counters and stall watchdog | Native subagent/workflow execution and owned-task observation |
| TDD | Bundled `tdd`, with explicitly chosen departures |
| Commit guidance | Installed `commit-work` |
| Prior-art/codebase mapping | `research-codebase` and existing research specialists |
| Skill authoring | `skill-creator`, `prompt-engineer`, `writing-for-agents` |
| General prose/UI guidance | `unslop`, `impeccable`, browser verification |
| Generated mirrors | Do not import. Preserve canonical directories and load references on demand. |

An eventual package should declare selected resources explicitly, preserve reference assets and notices, and avoid conventional directories accidentally loading deferred extensions. Atomic [supports legacy `pi` metadata](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/packages/authoring.md#L8-L26), but that is not a reason to adopt all declared upstream resources.

### Concrete extension scope

**Git policy, optional.** If chosen, use typed `tool_call` interception for supported model tools, account for effective command cwd and `git -C`, and document uncovered execution routes. Do not register skill commands/tools, add notifications, or implement another scheduler. Check existing authorization before requesting a decision; preserve any specifically adopted per-operation gate. Missing UI must not imply approval.

Atomic's [permission-gate example](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/examples/extensions/permission-gate.ts#L13-L32) is a pattern, not a complete Git policy. Tool interception is not an OS sandbox.

**Status projection, deferred.** If native status proves insufficient, subscribe on `session_start` through `ctx.observeWorkflowActivity`, dispose on shutdown/reload, use canonical event identities, and treat unavailable/recovering as unknown. Never infer completion from `agent_end` alone or execute `next_skill`. See [observation semantics](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/extensions/events.md#L712-L789).

No extension is justified for ordinary planning, gate orchestration, application logging, documentation serialization, or wiki synchronization.

## 7. State, gates, authority and implementation risks

### One execution-state owner

Bigpowers [mandates `handoff.next_skill`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONVENTIONS.md#L158-L204). Its [actual state](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/specs/state.yaml#L1-L40) has one active flow/epic/story/bug and handoff.

The reports identify 29 skills referencing state and 22 referencing handoff, with incompatible fields and representations:

- `active_epic` versus `active_epic_id`;
- `step` versus `current_step`;
- numeric versus skill-name step values;
- Markdown appended into YAML;
- flat epic files versus capsule directories.

The [status synchronization script](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/sync-status-from-epics.sh#L122-L194) uses `setdefault` to seed missing records. It does not reconcile competing status authorities. [Timing instrumentation](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/bp-timing.sh#L23-L69) performs shared whole-file updates.

**Decision proposed:** Atomic owns execution state; project documents own domain intent. If compatibility export is needed, it has one writer and is advisory. Repository-controlled `next_skill` never grants execution authority.

### Authorization without redundant approval

A verification PASS establishes readiness, not delivery permission. For each commit, push, PR, merge, tag, publish, deploy or cleanup action:

1. Determine whether existing authorization covers the action, target, candidate and scope.
2. Proceed within that coverage without asking again.
3. Ask through the supported question mechanism when authority is absent or scope changes.
4. Preserve explicit project, workflow, registry or user-required approval gates.
5. Treat cancellation or an unanswered question as no approval.

Atomic explicitly [prohibits seeking approval again for already-authorized work](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/src/core/tools/ask-user-question/ask-user-question.ts#L62-L66). Builtin final-action controls still matter: for example, Goal/Ralph require their explicit [`create_pr` opt-in](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/workflows/builtins.md#L162-L206).

The current task authorizes **research only**. It authorizes none of those operational actions.

### BCP and quality gates are choices

BCP is [element-based sizing, not elapsed time](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp.md#L9-L64). BCP Plus requires [ownership and calibration integrity](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp-plus.md#L132-L151) and states [external-validity limitations](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp-plus.md#L207-L223). The 1-13 shortcut elsewhere is not automatically comparable.

The [94% doctrine threshold](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/PRINCIPLES.md#L67-L71) concerns repository scenarios. It does not calibrate subjective review scores or model confidence.

Recommend observable acceptance criteria, real command receipts, independent findings and explicit waivers. Preserve mandatory checks; do not let aggregate scores compensate for missing required evidence.

### Consequential source findings

| Finding | Evidence and consequence |
|---|---|
| **Invalid benchmark control** | [`run-benchmark.py:35-80`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/run-benchmark.py#L35-L80) replaces “without skill” with `test -f /dev/null`, accepts PASS text despite nonzero exit, and leaves rubric evaluation pending. [Reports regrade trials](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/run-benchmark.py#L94-L148); [regression handling merely prints](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/run-benchmark.py#L183-L210). Existing deltas cannot establish skill effectiveness. |
| **“Dry-run” publishes** | [`publish-package/REFERENCE.md:249-259`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/publish-package/REFERENCE.md#L249-L259) uploads to TestPyPI. A test registry is still an external write. |
| **CI false-success paths** | [`wait-for-ci.sh:40-111`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/wait-for-ci.sh#L40-L111) can exit successfully without gh-backed CI evidence and checks literal failure rather than every non-success conclusion. Cancelled/timed-out CI must not become success. |
| **Destructive landing cleanup** | [`land-branch.sh`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/land-branch.sh#L100-L165) integrates/pushes, with [force-removal cleanup](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/land-branch.sh#L195-L206). Its [push fallback](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/land-branch-push.sh#L39-L105) can reset local branches and needs status-propagation tests. |
| **Weak RED proof** | [`verify-tdd-red-commit.sh:62-90`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/verify-tdd-red-commit.sh#L62-L90) permits skipped cases and any failing command, without proving intended behavioral RED. |
| **Security exclusions** | [False-positive exclusions](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/security-review/REFERENCE-false-positives.md#L6-L61) omit prompt injection, documentation, ReDoS/resource issues and Rust memory safety. Those are inappropriate blanket exclusions for an agent. [Path-prefix guidance](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/security-review/REFERENCE-vuln-categories.md#L54-L65) also needs correction. |
| **Vacuous grid checks** | [Grid verifier](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/align-grid/scripts/verify_grid.js#L60-L131) uses one grid's coordinates, allows missing targets and accepts baseline distance up to a bound the calculation already guarantees. |
| **Broken design extraction paths** | [Browser closes before later extraction](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/lib/browser.js#L24-L69); [caller requests pseudo-states afterward](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/extract.js#L152-L178). [Spacing types](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/scripts/classify-spacing.js#L1-L13) and [unawaited test callbacks](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/extract-design/tests/test-extraction.js#L14) weaken results further. |
| **Partial contract implementation** | [`validate-contracts.sh:36-58`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/validate-contracts.sh#L36-L58) implements only a top-level key comparison and exits zero for unsupported types. Its subset direction conflicts with the [reference](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/validate-contracts/REFERENCE.md#L119-L129). |
| **Smoke accounting defect** | [Runner parses method](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/run-smoke.sh#L65-L146) but does not apply it; [status successes are not counted](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/run-smoke.sh#L152-L187), potentially producing [“no checks” failure](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/run-smoke.sh#L214-L234). This is a false-negative path, not a generic fail-open claim. |
| **CI modes differ from docs** | [`wire-ci.sh:146-159`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/wire-ci.sh#L146-L159) lacks documented modes; [“dry-run” fallback](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/wire-ci/REFERENCE.md#L258-L268) dispatches remote CI. |
| **Reports are not tests** | [Allure generation](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/generate-allure-report.sh#L62-L86) maps delivery state/cycle time into testcases. Label it accordingly. |
| **Dashboard trust/schema gaps** | [Legacy release parser](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/scripts/read-specs-status.cjs#L39-L89), [arbitrary project selection](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/scripts/server.cjs#L142-L163), and [event persistence](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/visual-dashboard/scripts/server.cjs#L264-L277) contradict a simple read-only, current-schema description. |
| **Unconditional operations success** | [`harden-vps:93-105`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/harden-vps/SKILL.md#L93-L105) prints “ALL 8 GATES PASSED” regardless of prior FAIL output. |

These findings justify rejecting particular helpers unchanged. They do not require installation or upstream execution to support the recommendation.

### Portability and dependencies

The manifest/lockfile research resolves `@clack/prompts` **0.10.1**, `picocolors` **1.1.1**, and upstream TypeBox **1.3.27**. Atomic pins TypeBox **1.3.7** and Pi agent-core **0.85.1**. TypeBox is a Bigpowers development dependency despite its runtime extension import; Atomic's alias may supply it, while plain Node requires actual dependency resolution.

Other prerequisites include Bash/Unix tooling, `jq`, `yq`, Python/PyYAML, gh, browser tooling, Allure, provider CLIs and registry/deployment credentials. Package Node minimum is 14; the separate MCP package requires Node 20 or later. Exact extraction-specific Puppeteer/design-linter versions were not established, so dependent behavior must not be filled in from “latest.”

Additional packaging risks:

- [`.npmignore`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/.npmignore#L1-L11) excludes specs and documentation referenced by skills.
- [Setup/init helpers](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/scripts/lib/install-helpers.js#L423-L443) symlink the package's scripts into projects and create directories. They are mutations, not harmless discovery.
- The integration report found every `skills-lock.json` skill path missing the slash before `SKILL.md`, breaking legacy MCP skill resolution.
- Sync regenerates mirrors and is prohibited under this task.
- `publish-package` [asks for changelog updates](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/skills/publish-package/REFERENCE.md#L112-L117), contrary to the user's read-only rule.
- Atomic packages/extensions have [full user permissions](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/security.md#L28-L36). Project trust is not sandboxing.

### Licensing and attribution

- Preserve [MIT © 2026 Daniel VM](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/LICENSE#L1-L21) for copied/substantially adapted material.
- Preserve applicable [`NOTICES.md`](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/NOTICES.md) and `simple-english` third-party attribution. The official STE dictionary is not reproduced; do not imply formal certification.
- Preserve relevant [contributor attribution](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/CONTRIBUTORS.md#L12-L46).
- The BCP reference identifies original BCP material as [**CC BY-NC-ND 4.0**](https://github.com/danielvm-git/bigpowers/blob/cbff374ee2d4095b53a81696262a39f164fa0774/docs/references/bcp-plus.md#L218-L231). Root MIT does not establish unrestricted rights to all referenced material. Verify provenance/rights before copying or adapting BCP text, tables or implementations.
- Source-license attribution is separate from commit-author conventions. Preserve the user's existing `commit-work` policy rather than imposing upstream attribution doctrine.

## 8. Model and thinking policy

### Evidence dates and limitations

Selections use Atomic's [model-selection guidance](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/models/model-selection.md) and [evals](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/models/evals.md), plus the contract's configured catalog subset.

- **Datacurve DeepSWE v1.1:** snapshot **2026-09-03**, read **2026-09-05**; 113 tasks, 91 repositories, five languages, `mini-swe-agent`.
- **Artificial Analysis Intelligence Index v4.3:** documentation snapshot retrieved **2026-09-08**, following the September 7 revision.
- Live [Astra](https://artificialanalysis.ai/models/gpt-6-astra), [Fable 5.1](https://artificialanalysis.ai/models/claude-fable-5-1), and [methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking) pages were fetched again on **2026-09-12**. Extracted model text confirmed headings/definitions but did not expose chart scores. **No numerical refresh is claimed.**
- Catalog presence does not prove live account access. This report stays within the supplied subset; no outside model is newly selected.
- Upstream skill model recommendations were ignored.

### Measured configurations

| Exact measurement configuration | Relevant result | Cost/latency | Interpretation |
|---|---|---|---|
| Astra **xhigh**, DeepSWE | 74% ±3 pass@1; 29 steps; 30k output tokens | **$6.52/task** | Expected-launch pricing estimate, not billed cost. |
| Opus 5 **max**, DeepSWE | 74% ±4; 99 steps | **$11.84/task** | Rounded tie, overlapping intervals; materially higher cost. |
| Sol **max**, DeepSWE | 73% ±3; 61 steps | **$6.46/task** | Snapshot pricing includes documented promotion assumptions. |
| Luna **max**, DeepSWE | 67% ±4; 102 steps | **$0.61/task** | Lower-cost, lower-success tradeoff. |
| Fable **5.1**, DeepSWE | **No row in this dated snapshot** | Not available | Do not transfer Fable 5's result. |
| Astra **xhigh / high / medium / low**, AA | Terminal-Bench v4.0 **60 / 54 / 49 / 42%**; AutomationBench-AA **67 / 67 / 65 / 59%** | **$2.31 / $1.72 / $1.54 / $0.82 per Index task**; 500-token end-to-end **140.46 / 53.48 / 14.19 / 11.72 seconds** | Lower production effort trades measured capability for cost/latency. |
| Fable 5.1 **xhigh / high / medium, with default fallback**, AA | Terminal-Bench **55 / 52 / 45%**; Briefcase **58 / 54 / 52%**; GDPval-AA v2 **62 / 57 / 54%** | **$5.98 / $3.91 / $2.98 per Index task**; **115.95 / 32.77 / 17.17 seconds** | Briefcase/GDPval figures are normalized Elo, not pass rates. Benchmark fallback is part of the measured configuration. |
| Opus 5 **high**, AA | Briefcase **53%**, GDPval **56%**, Terminal-Bench **46%** | **$3.61/Index task** | Possible Anthropic-only alternate, not the preferred new fallback. |
| Luna **max**, AA | AA-LCR **84%**, Terminal-Bench **12%**, non-hallucination **7%** | **$0.18/Index task** | Budget long-context candidate requiring independent verification, not a judgment gate. |
| Claude Code + Fable 5.1 **max with fallback**, Coding Agent Index v1.4 | SWE-Atlas-QnA **56%** | **$9.18/task; 24.0 min/task** | Named-harness experiment, not Atomic. |
| Codex + Astra **max**, same index | SWE-Atlas-QnA **51%** | **$4.72/task; 26.8 min/task** | Different harness/settings; not interchangeable base-model evidence. |

Source tables: [DeepSWE](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/models/evals.md#L43-L78), [AA cost/latency](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/models/evals.md#L139-L179), [individual evaluations](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/models/evals.md#L183-L259), and [named coding agents](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/models/evals.md#L390-L413).

Important distinctions:

- Terminal-Bench v4.0 uses 66 tasks and three repeats per task; AutomationBench-AA uses 657 held-out tasks, one attempt and a 50-turn cap. Neither is the older terminal benchmark in Coding Agent Index v1.4.
- AA non-hallucination measures partial/not-attempted responses among non-correct responses. It is not the percentage of all answers that are truthful.
- AA dollars per Index task, DeepSWE dollars per task, API token prices, and Atomic run costs are different quantities.
- The 500-token latency workload is not an engineering workflow's completion time.
- Lower-effort production recommendations do not inherit higher-effort benchmark scores.
- No cited benchmark validates security-review reliability, Bigpowers' 94% threshold, BCP calibration or VPS safety.

### Proposed executable roles

Skills and templates need **no independent model pin**. Policy belongs to the session, stage, or agent executing them. Atomic [ignores unknown skill frontmatter](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/skills/reference.md#L47-L60).

| Role | Proposed primary | Proposed fallback | Reason |
|---|---|---|---|
| Planning, domain/architecture synthesis, plan audit | `anthropic/claude-fable-5-1:high` | `openai-codex/gpt-6-astra:high` | Knowledge-work fit. Fable high's 54/57 normalized Elo exceeds Astra high's 50/51, at higher task cost; validate locally. |
| Model-driven workflow coordination | `openai-codex/gpt-6-astra:medium` | `anthropic/claude-fable-5-1:medium` | Matches existing Goal/Ralph orchestration defaults; medium favors practical tool-loop cost/latency. Pure orchestration code needs no model. |
| New implementation/repair worker | `openai-codex/gpt-6-astra:medium` | `anthropic/claude-fable-5-1:medium` | Atomic recommends low/medium for coding, with independent checks/review. |
| Investigation-only bug specialist | `openai-codex/gpt-6-astra:high` | `anthropic/claude-fable-5-1:high` | Failure analysis warrants high effort; terminal evidence favors Astra modestly at high. |
| Independent code-review composition | Reuse existing declared reviewer policy, such as Ralph's Fable 5.1 **high** and Astra **high** pair | Existing declared chains | Preserve the native composition rather than overriding named agents for variety. Independence comes from context and scope, not merely provider difference. |
| Security review, adversarial trace critique, skeptical acceptance | `openai-codex/gpt-6-astra:xhigh` | `anthropic/claude-fable-5-1:xhigh` | High cost of missed defects; Astra xhigh has stronger displayed terminal/PDF results at lower AA task cost. Seeded local evaluation is still required. |
| Impact/architecture analysis and demanding research synthesis | `openai-codex/gpt-6-astra:high` | `anthropic/claude-fable-5-1:high` | Source-heavy reconciliation and evidence preservation. |
| New bounded extraction/lookup role, only if needed | `openai-codex/gpt-6-astra:low` | `anthropic/claude-fable-5-1:low` | Mechanically checkable output; do not create extra cheap workers without need. Reused locators retain their declared policy. |
| Final user-impact reporting | `anthropic/claude-fable-5-1:medium` | `openai-codex/gpt-6-astra:medium` | Reporting usually needs clear evidence, not maximum effort. |
| Tests, schema validation, inventories, reducers and action receipts | **No model** | None | Deterministic tools establish these facts. |

The supplied catalog supports every proposed ID/effort above. For eventual authoring, inspect the current catalog and pin only returned full IDs with listed efforts. Reused named agents retain their declared model/fallback policy unless a task-specific override is justified. See [native policy](https://github.com/bastani-inc/atomic/blob/3342c8d3648065d1568579dbe44baf534feddf5e/packages/coding-agent/docs/subagents.md#L204-L208).

For new roles, use same-role, other-family fallback at the same supported effort. If `xhigh` is unavailable, use supported `high`, not automatic `max`. Fallback handles retryable provider/request failures, not failed tests, refusals, cancellations or declined approval. Respect data-handling constraints and reconcile completed side effects before recovery. `max` is not a default.

## 9. Prioritized adoption and acceptance recommendations

| Priority | Recommendation | Future acceptance evidence |
|---|---|---|
| **P0: decisions** | Choose native state ownership, artifact schemas, delivery authority, retained methodology and licensing boundaries. Keep upstream package/hooks disabled. | Written decisions; exact inventory; preserved source/settings; no operational changes from research or discovery. |
| **P1: native reuse and methods** | Start with scope/readiness, domain language, RCA, test design, self-audit and verification. Augment existing skills rather than copying competitors. | Trigger tests, relative-reference resolution, no model routing from skill text, no hidden setup/sync, unchanged generated files. |
| **P1: selected shortcuts** | Consider `quick-fix`, `reset-baseline`, optional commit drafting and document editing only. | One owner per command; arguments handled; no automatic delivery; inline choice preserved. |
| **P2: bounded specialists** | Reuse analyzers/research agents; add investigation-only/security roles only where scope cannot be expressed cleanly through existing definitions. | Source-grounded outputs, parent-owned decisions, no unexpected writes, original-scenario reproduction and seeded security fixtures. |
| **P3: compose execution** | Planning plus verified implementation, with reusable review/verification components. | Unique DAG identities, resume without duplicate work, immutable acceptance criteria, fresh candidate-bound checks, bounded repair and truthful incomplete results. |
| **P4: authorized delivery** | Add only needed registry/platform/branch modes with genuine dry-run and reconciliation. | Existing multi-action approval is honored without redundant prompts; missing/changed authority asks; refusal has no external effect; cancelled CI never passes; uncertain publish/deploy is reconciled before retry. |
| **P4: optional Git policy** | Add interception only after choosing none/confirm/block and defining coverage. | Valid heredoc commits work; wrong-cwd and protected-target cases covered; bypass limits explicit; no unauthorized default policy changes. |
| **P5: deferred capabilities** | Maintenance experiments after valid evaluator; dashboard after demonstrated gap; extraction helpers after correction; VPS work as separate operational scope. | Real controls/held-out cases; browser extraction assertions; scoped status access/process cleanup; disposable-VM backup/restore and recovery evidence. |

### Host-specific compatibility checks to retain

A later authorized test should separately inspect:

- Default isolated interactive autocomplete, command execution and body selection.
- In-process interactive construction.
- `getCommands()` and RPC `get_commands`, including source records.
- Idle versus streaming invocation and delivery receipts.
- Local `-e` borrowed-resource identity and reload.
- Child/worktree cwd and lifecycle notifications.

These are future validation requirements. No installation or runtime reproduction is needed to correct the research claims already resolved from source.

### Unresolved decisions

1. Native ledger only, or an advisory compatibility export.
2. Existing project documents versus capsules, BCP, fixed sections and story tags.
3. Behavioral RED evidence versus mandatory separate RED/GREEN commits.
4. Dual review, manual UAT and replacement for undefined percentage scores.
5. Git guard none/confirm/block, and permitted solo-local landing.
6. Future delivery authorization scope and genuinely required approval gates.
7. Glossary, delivery-status and `specs/` namespace ownership.
8. Tracker-based `find-way` versus local task artifacts.
9. Whether a live dashboard adds value beyond native status and static diagrams.
10. Puppeteer retention versus explicitly adapted Playwright extraction.
11. Exact external dependency versions and third-party copying rights.
12. Whether PR #122's eventual outcome affects any selected packaging choice.

None was enacted.

## 10. Artifacts, coverage and stopping point

Written:

`/home/pburr/personal/factory/research/bigpowers-assessment/classifications-2.json`

It is a JSON array with exactly **81 objects**, in `inventory.json` order. Every object has nonempty `name`, `primary`, `rationale`, `source`, and `adaptations`, plus adoption disposition.

Read-only validation confirmed:

- Exact equality with both `inventory.json` and canonical source names.
- No missing, invented or duplicated names.
- Valid primary values.
- Every source permalink resolves to an existing pinned file and valid line range.
- Primary/adoption classifications unchanged from the reviewed first assessment.
- Counts reconcile to **52 / 14 / 9 / 4 / 2**.
- Both generated mirrors contain 81 entries.

JSON SHA-256:

`536592d6686e65aaef7d7f7f63995f6c24f86bb1801c66a525e91ae90728ff46`

The prior report's SHA-256 still matches the supplied review evidence:

`6c24fcf8a937fb3128c6e5240804c5d40dadd4647455b03655df36bea3f74581`

**Stopping point:** recommendations and research artifacts only. No integration was installed or implemented, no hooks/settings/source/generated files were changed, and no workflows or subagents were launched in this correction stage.