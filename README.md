# Factory

Private Atomic packages for local projects. The root package exposes the skill directories declared in `package.json`; pnpm workspace manifests are not automatically combined by Atomic.

## Install from this checkout

From the Factory repository root, install the aggregate package:

```sh
atomic install -l .
```

Or install only the agents package's skills and prompt templates:

```sh
atomic install -l ./packages/agents
```

`@factory/agents` is the package name, not a filesystem directory. From another project, use an absolute path to this checkout or its `packages/agents` directory. Avoid registering both the aggregate package and a child package in the same project because they expose overlapping resources.

## Install from private Git

After the package changes have been committed and pushed, run this in a consuming project:

```sh
atomic install -l git:git@github.com:payton-burr/factory
```

Your SSH key must have access to the private repository. Atomic has no built-in `git:factory` nickname. Git installation uses the repository's root Atomic manifest, not a workspace-package picker. `private: true` prevents accidental npm publication; it does not prevent a Git or local-path installation.

Restart Atomic after changing installed resources. Use `atomic list` to check registrations and `atomic config -l` to enable or disable individual resources.

## Select a resource group

In the consuming project's `.atomic/settings.json`, replace the Factory string entry with an object. This example loads only the agents package's skills:

```json
{
  "packages": [
    {
      "source": "git:git@github.com:payton-burr/factory",
      "skills": ["packages/agents/skills/**"],
      "prompts": [],
      "extensions": [],
      "themes": [],
      "workflows": []
    }
  ]
}
```

Preserve any other settings and package entries. The agents group contains reusable skills; its name does not mean it registers subagents. To select Bigpowers skills instead, use `packages/bigpowers/skills/**`, provided that directory has been populated with usable resources. Include both patterns to select both groups. The entire Git repository is cloned; filters control loading, not download size. Filters can only narrow the resources exposed by the root manifest.

Prompts, extensions, themes, and workflows are explicitly disabled in the aggregate manifest. Register resources there when adding those capabilities; populating a nested workspace manifest alone is insufficient.

## Agent resources

`packages/agents/` contains subagent definitions in `agents/`, prompt templates in `prompts/`, and skills with supporting files in `skills/`. The imported resources come from [wshobson/agents](https://github.com/wshobson/agents); its [MIT license](packages/agents/LICENSE) is included.

Installing `packages/agents` directly registers its skills and prompt templates. Atomic's package manifest does not support subagent definitions. To make those available in a consuming project, copy them into that project's `.atomic/agents/` directory:

```sh
mkdir -p .atomic/agents/factory
cp -Rn /path/to/factory/packages/agents/agents/. .atomic/agents/factory/
```

The copy command leaves existing definitions unchanged; review updates before replacing installed files. Restart Atomic and check `/agents`. For global availability, use `~/.atomic/agent/agents/factory/` as the destination instead. Copying definitions does not validate their tool or model compatibility with the installed Atomic version.

## Verify changes

```sh
npm pack --dry-run --ignore-scripts
```

Inspect the package file list before distributing changes. The root `pnpm test` command currently discovers no tests, so a successful exit does not establish test coverage. The root npm file allowlist keeps local research, Atomic session files, and development configuration out of the tarball. Git consumers still receive committed repository files.

Before distributing an update, test a clean copy with Atomic and check the intended skills, prompt templates, and manually installed subagents. Check each resource group for machine-local paths or symlinks; portability of one group does not establish portability of the others. Never run setup scripts as part of package installation.
