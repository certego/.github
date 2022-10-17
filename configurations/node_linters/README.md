<img src="../../Certego.png" alt="Certego" width="200" />

# ⬡ Node.js linters

## 🔧 Install dependencies

- ### [ESLint](https://eslint.org/)
```bash
npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

- ### [Stylelint](https://stylelint.io/)
```bash
npm i -D stylelint stylelint-config-standard-scss
```

- ### [Prettier](https://prettier.io/)
```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier stylelint-config-prettier-scss
```

## 📖 How to use
Download repo via `git subtree` (see [here](/README.md)).
Customize configurations files (if needed):
- [eslint](eslint/.eslintrc.json)

### Optional: Prettier
To use Prettier formatter:
- enable `stylelint-config-prettier-scss` in Stylelint config file
- enable `plugin:prettier/recommended` in ESlint config file
