<img src="../../Certego.png" alt="Certego" width="200" />

# ⬡ Node.js linters

## 🔧 Dependencies
To use locally, add dependencies to your project:
```bash
xargs npm i -D < ./.github/configurations/node_linters/requirements-linters.txt
```
and add these scripts to `package.json`:
```
"config": {
    "eslint": ".github/configurations/node_linters/eslint.config.mjs",
    "stylelint": ".github/configurations/node_linters/.stylelintrc.json",
    "prettier": ".github/configurations/node_linters/.prettierrc.json"
},
"scripts": {
    "lint": "eslint -c $npm_package_config_eslint",
    "lint-fix": "npm run lint -- --fix",
    "lint-scss": "stylelint --config $npm_package_config_stylelint '**/*.{css,scss}'",
    "lint-scss-fix": "npm run lint-scss -- --fix",
    "formatter": "prettier --config $npm_package_config_prettier --check",
    "formatter-fix": "npm run formatter -- --write"
},
```


## 📖 How to use
Customize configurations files (if needed).


## 💻 How to configure your IDE
Since linters configurations aren't directly in the project tree, if you use liting plugins in your editor, you have to instruct them about correct path.
Here are some examples:

- ### [VSCode](https://code.visualstudio.com/)
In `.vscode/settings.json`
```json
{
    "stylelint.validate": ["css", "less", "postcss", "scss"],
    "stylelint.snippet": ["css", "less", "postcss", "scss"],
    "eslint.format.enable": true,
    "eslint.workingDirectories": ["./", "./functions"],
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": true,
    "editor.semanticHighlighting.enabled": true,
    "eslint.options": {
        "overrideConfigFile": ".github/configurations/node_linters/eslint/eslint.config.mjs"
    },
    "stylelint.configFile": ".github/configurations/node_linters/.stylelintrc.json",
    "prettier.configPath": ".github/configurations/node_linters/prettier/.prettierrc.js",
}
```
