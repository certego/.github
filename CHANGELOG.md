# 1.6.x
## 1.6.0
### Features

* Added *create_apt_cache.yaml* workflow to cache APT requirements each time a commit is pushed on selected branch and **when the requirements file has changed**.

### Changes

* Updated Python linters:
  * bandit 1.7.9 -> 1.8.3
  * black 24.8.0 -> 25.1.0
  * flake8 7.1.1 -> 7.1.2
  * isort 5.13.2 -> 6.0.1
  * pylint-django 2.5.5 -> 2.6.1
  * pylint 3.2.6 -> 3.3.5
* Removed `awalsh128/cache-apt-pkgs-action@latest` action and rewrote APT caching using GitHub's `actions/cache/restore@v4` and `actions/cache/save@v4`.
* Added both frontend and backend exclusions on _detect_changes.yaml (paths that won't be considered by git diff)
