<img src="Certego.png" alt="Certego" width="200" />

# .github

This repository contains CI workflows for Certego projects.

## 🔧 Components
### 🔵 [Starter workflow](workflow-template/starter)
Detects changes and calls the Reusable workflows with configured props
## ⇩
### 🟢 [Reusable workflows](.github/workflows/)
Call actions according to input props
## ⇩
### 🔴 [Composite actions](.github/actions/)
Execute commands

---

## 📖 How to use
Customize starter workflow setting options.

### Python
W.I.P.

### Node
Add to `package.json` these scripts (customizing paths):
```
    "test": "TZ=UTC jest ./tests --silent",
    "test-coverage": "npm test -- --coverage=true",
    "lint": "eslint 'src/**/*.{js,jsx}' 'tests/**/*.{js,jsx}'",
    "lint-fix": "npm run lint -- --fix",
    "lint-sass": "stylelint 'src/scss/**/*.{css,scss}'",
    "lint-sass-fix": "npm run lint-sass -- --fix",
    "formatter": "prettier 'src/**/*.{js,jsx}' 'tests/**/*.{js,jsx}' --check",
    "formatter-fix": "npm run formatter -- --write"
```
#### Pre-commit
To enable pre-commit add this to `package.json`:
```
    "scripts": {
        "prepare": "cd . && husky install .husky"
    },
    "lint_staged": {
        "*.{js,jsx}": ["eslint", "prettier --check"],
        "**/*.{css,scss}": ["stylelint", "prettier --check"]
    },
```
Customize husky path with this repo download dir. Starting point must the same directory as .git
Then execute this command:
```
npm i -D husky lint-staged && npm run prepare
```
