<img src="Certego.png" alt="Certego" width="200" />

# .github 

## 🔧 Development
Here some infos for contributing to Certego CI.
Otherwise simply open an issue.

### 📖 How to test
Make your branch and do pull requests to `develop`.
All changes will be tested with *test* project
** Note:** if you modify Reusable workflows, you need to change `@main` to `@develop` in [Starter Workflow](starter.yml) to properly test them.

### 🕑 Files to update periodically:
Periodically update:
- Test projects dependencies: [python dependencies](test/python_test/packages.txt), [node.js packages](test/node_test/package.json)
- [Pre-commit config](.pre-commit-config.yaml) revs.
- All README and docs.

### 🏷️ Release
Eventually files to tag