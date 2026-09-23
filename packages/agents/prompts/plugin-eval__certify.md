---
description: Full quality certification with badge
argument-hint: <path>
---

> In the `@factory/agents` package, this plugin's directory (`${CLAUDE_PLUGIN_ROOT}`) is `plugins/plugin-eval/`, two levels above the `evaluation-methodology` skill's directory. Use its absolute path wherever this file refers to the plugin directory.

Run the complete PluginEval certification pipeline (all three layers + Elo ranking) and assign a quality badge.

This takes 15-20 minutes and uses your Max plan for all LLM calls.

## Running

```bash
cd plugins/plugin-eval
uv run plugin-eval certify {argument} --output markdown
```
