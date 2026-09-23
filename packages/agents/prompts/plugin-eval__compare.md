---
description: Compare two skills head-to-head
argument-hint: <skill-a> <skill-b>
---

> In the `@factory/agents` package, this plugin's directory (`${CLAUDE_PLUGIN_ROOT}`) is `plugins/plugin-eval/`, two levels above the `evaluation-methodology` skill's directory. Use its absolute path wherever this file refers to the plugin directory.

Run a pairwise comparison between two skills and report which is better on each quality dimension.

## Running

```bash
cd plugins/plugin-eval
uv run plugin-eval compare {argument}
```
