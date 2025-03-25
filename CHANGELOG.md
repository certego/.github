# 2.0.x

## 2.0.0

### Features

* Added "release.yml" action to to push containers to AWS ECR
* Added *create_apt_cache.yaml* workflow to cache APT requirements each time a commit is pushed on selected branch and **when the requirements file has changed**.

### Bugfix

* Updated python linters also in '_python.yml' workflow (missing from previous release)

### Changes

* Deprecation of license check table-headers
* Updated Python linters:
  * bandit 1.7.9 -> 1.8.3
  * black 24.8.0 -> 25.1.0
  * flake8 7.1.1 -> 7.1.2
  * isort 5.13.2 -> 6.0.1
  * pylint-django 2.5.5 -> 2.6.1
  * pylint 3.2.6 -> 3.3.5
* Removed `awalsh128/cache-apt-pkgs-action@latest` action and rewrote APT caching using GitHub's `actions/cache/restore@v4` and `actions/cache/save@v4`.
* Added both frontend and backend exclusions on _detect_changes.yaml (paths that won't be considered by git diff)
* Updated CodeQL action v2 -> v3 (v2 has been [deprecated](https://github.blog/changelog/2024-01-12-code-scanning-deprecation-of-codeql-action-v2/) on december '24)
* Removed `setup-python-dependencies` from `codeql/action.yml` since it has no effect anymore. See [this](https://github.blog/changelog/2024-01-23-codeql-2-16-python-dependency-installation-disabled-new-queries-and-bug-fixes/) for more information.
* Reworked Python requirements caching.
