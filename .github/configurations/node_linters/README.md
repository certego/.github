<img src="../../Certego.png" alt="Certego" width="200" />

# ⬡ Node.js linters

## 📖 How to use
Download repo via `git subtree` (see [here](/README.md)).
Customize configurations files (if needed).

- ### [ESLint](https://eslint.org/)
To use locally, install these dependencies:
```bash
npm i -D eslint
npm run lint-config-install
```
To run:
```bash
npm run lint
```

- ### [Stylelint](https://stylelint.io/)
To use locally, install these dependencies:
```bash
npm i -D stylelint
npm run lint-scss-config-install
```
To run:
```bash
npm run lint-scss
```

- ### (Opt.) [Prettier](https://prettier.io/)
To use locally, enable configurations and customize
- Enable/disable `eslint-config-prettier` in ESlint config file
- Enable/disable `stylelint-config-prettier-scss` in Stylelint config file
Install these dependencies:
```bash
npm i -D prettier
```
To run:
```
npm run formatter
```
