# Upstream

Vendored from [wshobson/agents](https://github.com/wshobson/agents) at commit `4236bb9` (2026-09-13), MIT license. Each upstream plugin under `plugins/<plugin>/` is a Claude Code and Codex plugin; this package exposes the parts Atomic can load.

## Contents

| Path | Source | Loaded by Atomic |
|:--|:--|:--|
| `plugins/<plugin>/skills/` | upstream `plugins/<plugin>/skills/`, unchanged | yes, 183 skills |
| `prompts/<plugin>__<command>.md` | upstream `plugins/<plugin>/commands/<command>.md` | yes, 105 prompt templates |
| `agents/<plugin>__<agent>.md` | upstream `plugins/<plugin>/agents/<agent>.md` | no, copy them manually |
| `plugins/conductor/templates/` | upstream, unchanged | used by `/conductor__setup` |
| `plugins/plugin-eval/{README.md,pyproject.toml,uv.lock,src,scripts}` | upstream, unchanged | the engine behind the `plugin-eval` prompts and agent |
| `plugins/protect-mcp/hooks/`, `plugins/review-agent-governance/{hooks,policies}/` | upstream, unchanged | used by their setup skills |
| `plugins/ship-mate/stories/` | upstream, unchanged | used by `/ship-mate__setup` |

The skill layout matches upstream, so relative links between skills and plugin files resolve as they do upstream. Upstream plugin tests, `.claude-plugin/` and `.codex-plugin/` manifests, and READMEs other than plugin-eval's are not included.

Prompt files carry a `<plugin>__` prefix because 12 command names occur in more than one plugin. Atomic keeps one prompt per name.

## Local changes

- Plugin directory: upstream refers to the plugin directory through `${CLAUDE_PLUGIN_ROOT}` or Claude Code install paths, which Atomic does not provide. The files below start with one added quote block that locates the plugin directory relative to a skill in the same plugin. The upstream text follows unchanged.
  - Prompts: `conductor__setup`, `plugin-eval__eval`, `plugin-eval__compare`, `plugin-eval__certify`, `ship-mate__setup`.
  - Agents: `plugin-eval__eval-orchestrator`, `review-agent-governance__review-policy-author`.
  - Skills: `protect-mcp/protect-mcp-setup`, `review-agent-governance/review-agent-setup`.
- Agent frontmatter: `model` and `color` are removed so agents run on the caller's model. Claude Code tool names in `tools` map to Atomic tools: `Read`→`read`, `Write`→`write`, `Edit`→`edit`, `Bash`→`bash`, `Glob`→`find`, `Grep`→`search`, `Agent`→`subagent`, `WebFetch`→`fetch_content`, `WebSearch`→`web_search`. Other names stay as upstream wrote them. Agent bodies are unchanged.

## Limits

- Atomic packages cannot register subagents; Atomic discovers agents only in its built-in, user and project agent directories. See the repository README for the copy command.
- Claude Code-only features stay as upstream wrote them. The `agent-teams` agents use `TeamCreate`, `TaskUpdate`, `SendMessage` and `~/.claude/teams`. The `meigen-ai-design` agents use `mcp__meigen__*` tools. The `protect-mcp` and `review-agent-governance` hooks target Claude Code's hook protocol. None of these work in Atomic without equivalent tools or hooks.
- 47 relative links inside skills point at files upstream also lacks.
- `uv run plugin-eval` creates a `.venv` inside `plugins/plugin-eval/`.

## Updating

Copy the same paths from a newer upstream commit, then reapply the changes above. Run `node --test tests/*.test.mjs` from the repository root.
