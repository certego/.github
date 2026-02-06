[![CI](https://github.com/certego/.github/actions/workflows/pull_request_automation.yml/badge.svg)](https://github.com/certego/.github/actions/workflows/pull_request_automation.yml)

<img src="Certego.png" alt="Certego" width="200" />

# .github

This repository contains CI workflows for Certego projects.
It also contains the recommended configurations for linters and formatters.

## ⚙️ CI components
### 🔴 [Pull request automation](workflows/pull_request_automation.yml)
Automatically executed on every PR. Manages tests and lints stuff. To customize for your project.
### 🔴 [Release](workflows/release.yml)
Automatically executed on every closed PR to the master branch that matches the regex `^[0-9]+\.[0-9]+\.[0-9]+$` . Manages release stuff. To customize for your project.
## ⇩
### 🟡 [Reusable workflows](workflows/)
They receive input props and call actions.
## ⇩
### 🟢 [Composite actions](actions/)
They execute commands (linters, tests,...)

### CI features
Actually CI actions commands implement this features:
- Linters & Formatters
  - Black
  - Isort
  - Flake8
  - Pylint
  - Bandit
  - Eslint
  - Prettier
  - Stylelint
- Tests 
  - Coverage printing
  - License checks
  - Doc syntax check
  - CodeQL security check
  - Django migrations check
  - Dockerfile syntax check
- Release and tagging
- Publish on test Pypi
- Publish on Pypi
- Publish on Npm
- Announce release on Twitter

### Other CI features:
This repository also contains configurations for:
- [Dependabot](dependabot.yml)
- Pre-commit hook configurations

## 🧰 Action configurations (linters, formatters, docs, coverage...)
See [here](configurations/)

---

## 📖 How to use
**Add** this repository to your project using `git subtree` command:
```bash
git subtree add --squash --prefix .github https://github.com/certego/.github.git main  && rm -rf .github/{.github,README.md}
```
Customize options of [Pull request automation](workflows/pull_request_automation.yml)  
Customize linters in [configurations folder](configurations/)  
Customize [dependabot](dependabot.yml).  
Customize [CHANGELOG](CHANGELOG.md)  
  
**Update** the subtree every time a new release of this repository is rolled. Pay attention,be careful to not lose your changes.
```bash
git subtree pull --squash --prefix .github https://github.com/certego/.github  main && rm -rf .github/{.github,README.md}
```


*Note:* DO NOT squash the commits in which you added/pulled subtree, otherwise `git-subtree-dir` info in `git log` will be lost
  
**Configure** your project to use CI following below instructions.

### Python
CI automatically installs and calls code analyzers this way:
```
pylint --rcfile=.github/configurations/python_linters/.pylintrc
bandit -c .github/configurations/python_linters/.bandit.yaml
flake8 --config .github/configurations/python_linters/.flake8
black --config .github/configurations/python_linters/.black
isort --settings-path .github/configurations/python_linters/.isort.cfg --profile black --filter-files --skip venv
```
For local installation and customization, see [here](configurations/python_linters/README.md)

#### (Opt.) Pre-commit
Add `pre-commit` to your python requirements.
Configure [this](.pre-commit-config.yaml) configuration file in your `.github` dir.
From root of your project install:
```
pre-commit install -c .github/.pre-commit-config.yaml
```
Pre-commit will add hook `.git/hooks/pre-commit` for you.

### Node.JS
CI automatically installs and calls code analyzers this way:
```
npm run lint
npm run lint-scss
npm run formatter
```
For local installation and customization, see [here](configurations/node_linters/README.md)

#### (Opt.) Pre-commit
Add `husky` to your `package.json`:
```
npm i -D husky && npx husky init
```
Configure your `.husky/pre-commit` file like [this](.husky-pre-commit).
When an `npm install` is executed, husky installs a pre-commit hook in git.


## 🔧 Development
To contribute to this repository, please see [here](README.dev.md)
