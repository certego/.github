<img src="Certego.png" alt="Certego" width="200" />

# .github 

## 🔧 Development
Here some infos for contributing to Certego CI.
Otherwise simply open an issue.

### 📖 How to test
Make your branch and do pull requests to `develop`.
All changes will be tested with *test* project.

**Note:** to properly test Reusable workflows and Actions you need to change `@<tag>` to `@<your_branch>` (see [below](#-release)).

### 🕑 Files to update periodically:
Periodically update:
- Test projects dependencies: [Python dependencies](test/python_test/packages.txt), [Node.js packages](test/node_test/package.json)
- Node linters dependencies: [ESLint packages](configurations/node_linters/eslint/package.json), [Stylelint packages](configurations/node_linters/stylelint/package.json)
- [Pre-commit config](.pre-commit-config.yaml) actions revs.
- All [other actions](actions/) revs.
- All README and docs.

### 🏷️ Release
When a new version is released, please remember to change tag in these files:
- [Starter Workflow](workflow-templates/starter.yml)
- [Node.js Workflow](reusable_workflows/node.yml)
- [Python Workflow](reusable_workflows/python.yml)