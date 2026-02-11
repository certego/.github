<img src="../Certego.png" alt="Certego" width="200" />

# ✍️ Configurations

## 🧰 Configurations linters and formatters

In linters folders are our standard configurations for linters and formatters, for Python and Node.js

### Python
See [here](python_linters/README.md)

### Node.js
See [here](node_linters/README.md)

---

## 🔄 Test
  
### Python
By default it uses python `unittest`.
To use locally, install these dependencies:
```bash
pip install coverage
```
To add additional dependecies to CI, insert them in `requirements-dev.txt` file (inside *<requirements_path>* folder).

### Node.js
To use locally, install Jest or similar:
```
npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom
```
and after configuration add these scripts to your `package.json`:
```
scripts {
    "test": "TZ=UTC jest ./tests --silent",
}
```
To launch:
```bash
npm run test
```

---

## 📋 Coverage

### Python
To use locally, install these dependencies:
```bash
pip install coverage
```
To add additional dependecies to CI, insert them in `requirements-dev.txt` file (inside *<requirements_path>* folder).

### Node.js
To use locally, follow Tests configuration and add this scripts to your `package.json`:
```
scripts {
    "test-coverage": "npm test -- --coverage=true",
}
```
To launch:
```bash
npm run test-coverage
```

---

## 📓 Docs

### Python
To use locally, install these dependencies:
```bash
pip install rstcheck[sphinx] sphinx sphinx_rtd_theme phinxcontrib-spelling sphinxcontrib-django2
```
To add additional dependecies to CI, insert them in `requirements-docs.txt` file (inside *<requirements_path>* folder).

### Node.js
W.I.P.

