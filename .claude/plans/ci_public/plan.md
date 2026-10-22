# Port IntelOwlPrivate CI upgrades back to certego/.github

Source: `certego/IntelOwlPrivate` `.github/` (PR #1366 "cut GitHub Actions minutes ~40%", #1050, perf PRs) diffed against `origin/develop` (e354a17).

## Decisions
- Asked: one PR, or split into A (bug fixes) / B (speed) / C (docs)? **Answer: one PR with everything.**
- Every new behaviour is **opt-in via an input whose default keeps today's behaviour**: this repo is a semi-public API consumed via `git subtree`.
- Not ported (IntelOwl-specific or regressions): `postgres_version` default `10.14`, `terraform` branch in release, hardcoded `manage.py test tests` label, the dropped "Combine coverage data" step (template's #240 is kept), older action versions (`cache@v4`, `setup-python@v5`, `setup-node@v4`, `codeql@v3`, `aws-credentials@v4`), the dotfile linter config paths.
- `_detect_changes.yml` / `create_*_cache.yaml` are **kept**: other repos call them. Path-filtered callers are documented as an alternative.
- Jest fix uses `tee` + `pipefail` (IntelOwl's version hides test output in the log).

## Steps
1. `_node.yml`: Jest step keeps its exit code when coverage is uploaded (bug: failing tests went green).
2. `_python.yml`: license check moved to its own job with a job-level `if` (Docker action image built even when the step is skipped).
3. `actions/services`: postgres healthcheck 1s × 60 retries instead of 10s × 5.
4. `_python.yml`: `run_tests` input (default true); false only warms caches.
5. `_python.yml`: `setup-uv` + `uv pip install`; free disk space only on a venv cache miss.
6. `_python.yml`: `test_parallelism` input → `manage.py test --parallel`; coverage combine kept.
7. `_python.yml`: opt-in `use_db_snapshot` input — cached `pg_dump` keyed on migration files, `--keepdb`, cold migrate when the snapshot holds migrations missing on disk. Uses workflow inputs, not caller env.
8. `_python.yml`: `cache_key` input (default: current per-ref behaviour); setting e.g. `ci` shares venv/APT caches warmed by a default-branch push with `run_tests: false`.
9. `_release_and_tag.yml`: optional per-image `docker_mapping[].context`, falling back to `working_directory`.
10. `workflows/README.md` + CHANGELOG: document inputs and caller patterns (path filters, `ready_for_review` + draft gate, concurrency cancel, push trigger to warm caches, release-title check).
