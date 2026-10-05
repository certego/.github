# Python 3.14 support alongside 3.12

## Context
`workflows/create_python_cache.yaml` builds the pip/venv cache with Python 3.12 only, and `configurations/python_linters/.ruff.toml` sets `target-version = "py312"`. We want 3.14 supported as well.

What we found while exploring:
- The venv cache key (`actions/python_requirements/{save,restore}_virtualenv`) is `<ref>-venv-<requirements hash>` and doesn't include the Python version. With a two-version matrix, both jobs write the same key: one save fails, and `_python.yml` can restore a venv built for the other interpreter, whose `bin/python` points at the wrong binary. This is the bug the change needs to fix.
- The pip cache uses random-UUID keys plus a prefix restore. The wheel cache can be shared across versions, so no change is needed there.
- Ruff's `target-version` is a minimum version, not a list. `py312` already covers 3.14 code.

## Decisions (asked the user)
- Ruff: **keep `py312`** and add a one-line comment (it's the minimum; 3.14-only projects override it with `--target-version`). We rejected `py314` because Ruff would then suggest syntax that breaks on 3.12.
- Self-test: **add 3.14** to `python_versions` in `pull_request_automation.yml` so CI exercises it.

## Changes
1. `actions/python_requirements/save_virtualenv/action.yml` and `restore_virtualenv/action.yml`: add a step that reads the active interpreter's version (`python -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")'`). Key becomes `<ref>-venv-py<X.Y>-<hash>`. No new input, so consumers keep the same API. Existing caches are invalidated once.
2. `workflows/create_python_cache.yaml`: `strategy.matrix.python_version: ["3.12", "3.14"]` and `python-version: ${{ matrix.python_version }}`.
3. `configurations/python_linters/.ruff.toml`: one-line comment on `target-version`.
4. `workflows/pull_request_automation.yml`: `python_versions: ["3.12", "3.14"]`.
5. If the fixture doesn't build on 3.14 (`uWSGI==2.0.23` likely won't): bump the pins in `.github/test/python_test/requirements.txt` to the lowest versions that support 3.14.
6. Docs: `workflows/README.md` (Create Python cache section: matrix), plus the README of the two virtualenv actions (key includes the Python version).
7. Hardlinks: `.github/.github/` doesn't exist in this checkout. Run `.github/hooks/post-merge` and stage both copies.
8. Commit the plan to `.claude/plans/ci-python-3.14/plan.md` (on a new branch, e.g. `ci/python-3.14`, created from `develop`).

## Verification
- Before pushing: `actionlint` / YAML parse on the changed files, if available.
- Open a draft PR against `develop`: the `python` job must pass on both versions. Check in the logs that the venv keys contain `py3.12` / `py3.14` and that saving doesn't collide.
- The `create_python_cache` trigger only runs on push to develop/main when the fixture requirements change. If we bump the pins (step 5), it runs after the merge; check that run.

## Implementation notes
- uWSGI: 2.0.23 / 2.0.28 / 2.0.29 don't build on 3.14 (2.0.29: `PyThreadState has no member c_recursion_remaining`); 2.0.30 is the first that builds → pin `uWSGI==2.0.30`. Django 4.2.7 and celery 5.3.5 install and import fine on 3.14.4: unchanged.
- Hardlinks: the self-test copy lives in `.github/{workflows,actions,configurations}` (tracked), not `.github/.github/`. `post-merge` would also sync existing drift in `_release_and_tag.yml`, `release.yml` and `requirements-linters.txt`: reverted, out of scope.
