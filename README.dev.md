<img src="Certego.png" alt="Certego" width="200" />

# .github 

## 🔧 Development
To contribute to Certego CI, please clone this repo and do  pull requests to `develop`.
Otherwise simply open an issue.

## 📖 Setup for test
To run tests, CI files in base directory must be *hard linked* in the `.github/.github` folder.
Since GitHub is not able to store the fact that these files are hardlink, a `post-merge` hook has been made to execute [this](.github/hooks/post-merge) code:
```
cd .git/hooks
ln -s ../../.github/hooks/post-merge .git/hooks/
```
Now all changes will be linked and tested with [*test* project](.github/test/) on every PR.


### 🕑 Files to update periodically:
Periodically update:
- Test projects dependencies: [Python dependencies](.github/test/python_test/packages.txt), [Node.js packages](.github/test/node_test/package.json)
- Node linters dependencies: [ESLint packages](configurations/node_linters/eslint/package.json), [Stylelint packages](configurations/node_linters/stylelint/package.json)
- [Pre-commit config](.pre-commit-config.yaml) actions revs.
- All [external actions](workflows/) revs.
- All README and docs.

### 🏷️ Release
After a new release is created, please inform final users that they should update CI subtree in their projects.
