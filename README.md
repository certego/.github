<img src="Certego.png" alt="Certego" width="200" />

# .github

This repository contains CI workflows for Certego projects.

## ⚙️ Components
### 🔵 [Starter workflow](workflow-template/starter)
Detects changes and calls the Reusable workflows with configured props
## ⇩
### 🟢 [Reusable workflows](.github/workflows/)
Call actions according to input props
## ⇩
### 🔴 [Composite actions](.github/actions/)
Execute commands (linters, tests,...)

### Features
Actually CI actions commands implement this features:
- Linters / Formatters
- Tests
- Coverage printing
- License checks
- Release and tagging
- Doc generation
Other features if CI:
- Dependabot
- Pre-commit hook configurations

---

## 📖 How to use
Use `git subtree` to add this repository to your project:
```
git subtree add --prefix .github https://github.com/certego/.github.git main --squash
```
Customize linters in [configurations folder](configurations/)
Customize options of [Starter workflow](workflow-template/starter).
To launch workflow use request automation (like [this](.github/workflows/pull_request_automation.yml)) and/or via `pre-commit` (see below).
Configure your project following this way:

### Python
CI calls scripts like this (for local use custmize paths):
```
pylint --rcfile=.github/configurations/python_linters/.pylintrc
bandit -c .github/configurations/python_linters/.bandit.yaml
flake8 --config .github/configurations/python_linters/.flake8
black --config .github/configurations/python_linters/.black
isort --settings-path .github/configurations/python_linters/.isort.cfg --profile black --filter-files --skip venv
```
For local installation see [here](configurations/python_linters/README.md)

#### Pre-commit
Add `pre-commit` to your python requirements.
Configure [this](.pre-commit-config.yaml) configuration file in your `.github` dir.
From root of your project install:
```
pre-commit install -c .github/.pre-commit-config.yaml
```
Pre-commit will add hook `.git/hooks/pre-commit`

### Node.js
Add to `package.json` these scripts, customize paths:
```
    "test": "TZ=UTC jest ./tests --silent",
    "test-coverage": "npm test -- --coverage=true",
    "lint": "eslint 'src/**/*.{js,jsx}' 'tests/**/*.{js,jsx}'",
    "lint-fix": "npm run lint -- --fix",
    "lint-sass": "stylelint 'src/scss/**/*.{css,scss}'",
    "lint-sass-fix": "npm run lint-sass -- --fix",
    "formatter": "prettier 'src/**/*.{js,jsx}' 'tests/**/*.{js,jsx}' 'src/scss/**/*.{css,scss}' --check",
    "formatter-fix": "npm run formatter -- --write"
```
For local installation see [here](configurations/node_linters/README.md).
For configurations copy them from `.github/configurations/node_linters`.

#### Pre-commit
To enable pre-commit add this to `package.json`, customizing paths:
```
    "scripts": {
        "prepare": "husky install .github/.husky"
    },
    "lint_staged": {
        "*.{js,jsx}": ["eslint"] //, "prettier --check"],
        "*.{css,scss}": ["stylelint"] // , "prettier --check"]
    },
```
Starting point of `husky install` path is the same directory as .git
Then execute this command:
```
npm i -D husky lint-staged && npm run prepare
```

## 🔧 Development
To contribute to this repository, please see [here](README.dev.md)
