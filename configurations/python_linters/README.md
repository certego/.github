<img src="../../Certego.png" alt="Certego" width="200" />

# 🐍 Python linters


## 🔧 Dependencies
To use locally, install these dependencies:
```bash
pip install -r requirements-linters.txt
```

To add additional dependecies to CI, insert them in your personal `requirements-linters.txt` file (inside *<requirements_path>* folder).


## 📖 How to use
Customize files inside configurations.

**Note:** actually there is no way to extend configurations with other files.


## 💻 How to configure your IDE
Since linters configurations aren't directly in the project tree, if you use liting plugins in your editor, you have to instruct them about correct path.  
Here are some examples:

- ### [VSCode](https://code.visualstudio.com/)
In `.vscode/settings.json`
```json
{
    "editor.formatOnSave": true,
    "python.defaultInterpreterPath": "~/.virtualenvs/website/bin/python",
    "[python]": {
        "editor.defaultFormatter": "ms-python.black-formatter",
        "editor.codeActionsOnSave": {
            "source.organizeImports": true
        }
    },
    "isort.importStrategy": "fromEnvironment",
    "isort.check": true,
    "isort.args": [
        "--sp=${workspaceFolder}/.github/configurations/python_linters/.isort.cfg"
    ],
    "pylint.importStrategy": "fromEnvironment",
    "pylint.args": [
        "--rcfile=${workspaceFolder}/.github/configurations/python_linters/.pylintrc",
        "-v"
    ],
    "flake8.importStrategy": "fromEnvironment",
    "flake8.args": [
        "--config=${workspaceFolder}/.github/configurations/python_linters/.flake8"
    ],
    "black-formatter.importStrategy": "fromEnvironment",
    "black-formatter.args": [
        "--config",
        "${workspaceFolder}/.github/configurations/python_linters/.black"
    ]
}
