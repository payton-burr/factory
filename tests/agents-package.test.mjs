import assert from "node:assert/strict";
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../packages/agents");
const pluginsRoot = join(packageRoot, "plugins");
const claudeToolNames = ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent", "WebFetch", "WebSearch"];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function frontmatter(text) {
  return text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
}

test("package contains no symlinks", () => {
  const symlinks = walk(packageRoot).filter((path) => lstatSync(path).isSymbolicLink());
  assert.deepEqual(symlinks, []);
});

test("package ships every upstream skill, command and agent", () => {
  const skills = walk(pluginsRoot).filter((path) => path.endsWith("/SKILL.md"));
  assert.equal(skills.length, 183);
  assert.ok(skills.every((path) => relative(pluginsRoot, path).split("/")[1] === "skills"));
  assert.equal(readdirSync(join(packageRoot, "prompts")).length, 105);
  assert.equal(readdirSync(join(packageRoot, "agents")).length, 202);
});

test("plugin files that commands and skills rely on are packaged", () => {
  for (const path of [
    "conductor/templates/code_styleguides",
    "plugin-eval/pyproject.toml",
    "plugin-eval/README.md",
    "plugin-eval/src/plugin_eval",
    "protect-mcp/hooks/evaluate.sh",
    "review-agent-governance/policies/review-agent-governance.cedar",
    "ship-mate/stories/_template.md",
  ]) {
    assert.ok(existsSync(join(pluginsRoot, path)), `missing plugins/${path}`);
  }
});

test("files that use the Claude Code plugin root explain where it is", () => {
  const unexplained = walk(packageRoot)
    .filter((path) => path.endsWith(".md") && !path.endsWith("UPSTREAM.md"))
    .filter((path) => /CLAUDE_PLUGIN_ROOT|\.claude\/plugins\/|\.\/plugins\/|from the plugin/.test(readFileSync(path, "utf8")))
    .filter((path) => !readFileSync(path, "utf8").includes("> In the `@factory/agents` package, this plugin's directory"))
    .map((path) => relative(packageRoot, path));
  assert.deepEqual(unexplained, []);
});

test("agent frontmatter uses Atomic tool names and the caller's model", () => {
  const problems = [];
  for (const file of readdirSync(join(packageRoot, "agents"))) {
    const meta = frontmatter(readFileSync(join(packageRoot, "agents", file), "utf8"));
    if (/^(model|color):/m.test(meta)) problems.push(`${file}: model or color`);
    const tools = meta.match(/^tools:\s*(.*)$/m)?.[1] ?? "";
    for (const name of tools.split(",").map((tool) => tool.trim())) {
      if (claudeToolNames.includes(name)) problems.push(`${file}: ${name}`);
    }
  }
  assert.deepEqual(problems, []);
});
