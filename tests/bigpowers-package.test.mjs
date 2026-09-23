import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../packages/bigpowers");
const manifest = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
const packagedPaths = /(?<![A-Za-z0-9_./~$@:-])((?:\.\.\/)+(?:scripts|docs|profiles|skills)\/[A-Za-z0-9_./-]*[A-Za-z0-9_]|(?:\.\.\/)+SKILL-INDEX\.md)/g;
const projectRelativePackagePaths = /(?<![A-Za-z0-9_./~$@:-])((?:scripts|docs|profiles)\/[A-Za-z0-9_./-]*[A-Za-z0-9_])/g;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function skillMarkdownFiles() {
  return walk(join(packageRoot, "skills")).filter((path) => path.endsWith(".md"));
}

test("package contains no symlinks", () => {
  const symlinks = walk(packageRoot).filter((path) => lstatSync(path).isSymbolicLink());
  assert.deepEqual(symlinks, []);
});

test("manifest resources exist inside the package", () => {
  const resources = Object.values(manifest.atomic).flat();
  for (const resource of resources) {
    assert.ok(existsSync(join(packageRoot, resource)), `missing ${resource}`);
  }
});

test("every prompt template delegates to a packaged skill", () => {
  const skills = readdirSync(join(packageRoot, "skills")).filter((name) =>
    existsSync(join(packageRoot, "skills", name, "SKILL.md")),
  );
  const prompts = readdirSync(join(packageRoot, "prompts")).map((file) => file.replace(/\.md$/, ""));
  assert.equal(skills.length, 81);
  assert.deepEqual(prompts.sort(), skills.sort());
  for (const name of prompts) {
    const body = readFileSync(join(packageRoot, "prompts", `${name}.md`), "utf8");
    assert.match(body, new RegExp(`Use the \`${name}\` skill`));
  }
});

test("skill-relative package paths resolve inside the package", () => {
  const unresolved = [];
  for (const file of skillMarkdownFiles()) {
    for (const [, token] of readFileSync(file, "utf8").matchAll(packagedPaths)) {
      const target = resolve(dirname(file), token);
      if (!target.startsWith(packageRoot) || !existsSync(target)) {
        unresolved.push(`${relative(packageRoot, file)}: ${token}`);
      }
    }
  }
  assert.deepEqual(unresolved, []);
});

test("skills do not reference packaged files through project-relative paths", () => {
  const projectRelative = [];
  for (const file of skillMarkdownFiles()) {
    for (const [, token] of readFileSync(file, "utf8").matchAll(projectRelativePackagePaths)) {
      if (!existsSync(join(dirname(file), token)) && existsSync(join(packageRoot, token))) {
        projectRelative.push(`${relative(packageRoot, file)}: ${token}`);
      }
    }
  }
  assert.deepEqual(projectRelative, []);
});

test("packaged scripts run from a consumer project without provisioning", () => {
  const project = mkdtempSync(join(tmpdir(), "bigpowers-consumer-"));
  try {
    execFileSync("git", ["init", "-q"], { cwd: project });
    const selfTests = [
      ["scripts/wire-ci.sh", "--self-test"],
      ["scripts/validate-contracts.sh", "--self-test"],
      ["scripts/verify-generalize-sweep.sh", "--self-test"],
      ["scripts/run-gate-trace-verify.sh", "--self-test"],
      ["scripts/verify-cwe-fixture-sync.sh"],
      ["scripts/validate-skill-catalog.sh", "--strict", "--skill", "craft-skill"],
    ];
    for (const [script, ...args] of selfTests) {
      execFileSync("bash", [join(packageRoot, script), ...args], { cwd: project, stdio: "pipe" });
    }
    execFileSync("bash", [join(packageRoot, "scripts/build-skill-index.sh")], { cwd: project, stdio: "pipe" });
    const index = readFileSync(join(project, "specs/SKILL-SEARCH-INDEX_LATEST.md"), "utf8");
    assert.match(index, /\| survey-context \|/);
    assert.equal(existsSync(join(project, "scripts")), false);
  } finally {
    rmSync(project, { recursive: true, force: true });
  }
});
