## Unreleased
#### Features
* `_python.yml`: new opt-in inputs `run_tests` (default `true`; `false` only warms caches), `free_disk_space` (delete unused runner toolchains on a venv cache miss), `cache_key` (share venv/APT caches across refs), `use_db_snapshot` (cached `pg_dump` + `--keepdb`) and `test_parallelism` (`manage.py test --parallel`).
* `_release_and_tag.yml`: optional per-image `docker_mapping[].context`, falling back to `working_directory`.
* Documented recommended caller patterns in `workflows/README.md`.
#### Bugfix
* `_node.yml`: Jest step keeps its exit code when coverage is uploaded (failing tests used to go green) and its output stays in the job log.
#### Changes
* `_python.yml`: the license check is its own job (`Check requirements licenses`, add it to required checks; it now runs on every run, not only on a venv cache miss), the virtualenv is installed with `uv`.
* `actions/services`: postgres healthcheck is now 1s x 60 retries instead of 10s x 5.

## 2.0.x
### 2.0.1
#### Features
* Update and rearrangement of node linters. Now are easier to use.
### 2.0.0
#### Features
* Build and append project assets to Github releases.
* Added "release.yml" action to to push containers to AWS ECR
* Added *create_apt_cache.yaml* workflow to cache APT requirements each time a commit is pushed on selected branch and **when the requirements file has changed**.
* Added documentation.
* Added "Ruff" to the list of available Python linters.
#### Bugfix
* Updated python linters also in '_python.yml' workflow (missing from previous release)
* Explicitly disabled `xpack.security` in Elasticsearch container, since it is enabled by default in newer versions of Elasticsearch
* Added missing inputs for "create_linter_requirements_file" action.
#### Changes
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
* Linters versions in step `Create requirements-linters.txt` of `_python.yml` action are now computed according to `configurations/python_linters/requirements-linters.txt`. As of now, linter updates are only required in `configurations/python_linters/requirements-linters.txt`.
* Reworked Python requirements caching.
* Updated some Github actions:
  * setup-python v4 -> v5
  * action-gh-release v1 -> v2
* Added "Install system dependencies required by Python packages" step to "Create Python cache" workflow.