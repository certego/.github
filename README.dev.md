<img src="Certego.png" alt="Certego" width="200" />

# .github 

## 🔧 Development
To contribute to Certego CI, please clone this repo and do PRs.
Otherwise simply open an issue.

## Setup
Every file in the `.github/.github` folder is a *hard link* against the respective directory in the base folder.
Since GitHub is not able to store the fact that these files are hardlink, a `post-merge` hook has been made.
To ensure that the hook fires, you have to create symlink in your `.git/hooks` directory to the `post-merge`:
```
cd .git/hooks
ln -s ../../.github/hooks/post_merge .git/hooks/
```


### 📖 How to test
Make your branch and do pull requests to `develop`.
All changes will be tested with *test* project.

### 🕑 Files to update periodically:
Periodically update:
- Test projects dependencies: [Python dependencies](.github/test/python_test/packages.txt), [Node.js packages](.github/test/node_test/package.json)
- Node linters dependencies: [ESLint packages](configurations/node_linters/eslint/package.json), [Stylelint packages](configurations/node_linters/stylelint/package.json)
- [Pre-commit config](.pre-commit-config.yaml) actions revs.
- All [external actions](workflows/) revs.
- All README and docs.

### 🏷️ Release
After a new release is created, please inform final users that they should update CI subtree in their projects.
