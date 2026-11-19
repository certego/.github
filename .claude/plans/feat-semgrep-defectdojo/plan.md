# Semgrep SAST into DefectDojo (PR C of Phase 3)

## Goal
Add `actions/semgrep` and the reusable `workflows/_sast.yml`: Semgrep CE on push to the release branches, findings imported into DefectDojo. Also add an `application` input to `actions/dependency_track` that tags the project `app:<application>`.

## Why
SCA findings already reach DefectDojo from Dependency-Track; SAST from the CI must land in the same Product (application) and Engagement (environment). The `app:` tag makes GitHub-Actions SBOM projects (kiki, pypanoptikon) group like the CodeBuild ones (same as terraform_modules 1.6.0).

## Decisions
- Runs on push to the release branches only; `main|master` -> Engagement `prod`, `develop|dev|stag` -> `stag`, other branches skip; nothing is imported from PRs.
- Not blocking: errors and findings only produce `::warning::`, like the SBOM upload.
- Rules configurable per project (input), default `p/default p/secrets p/owasp-top-ten`.
- DefectDojo Product name = title case of the application (`-`/`_` -> space, `str.capitalize()` per word, same rule as the sync Lambda), so it equals the Dependency-Track collection name.
- GitHub-hosted runners reach only the public `:8443` listener (a rule for `POST /api/v2/reimport-scan/` comes in PR D in `dependencytrack`); the secret `DEFECTDOJO_API_KEY` is set by that repo's `configuration` root.
- Image `semgrep/semgrep:1.185.0` pinned by tag and digest (`docker.io` manifest list `sha256:67518c17...`, the `latest` tag as of 2026-11-19; 1.186.0 was one day old). Without `--error` Semgrep exits 0 when findings exist, so a non-zero exit (e.g. 7 for an unknown ruleset) is a real failure.
- Release `2.1.0` (PR `develop` -> `main`) only after the user's go; it also ships the other unreleased `develop` changes.

## Steps
1. `actions/semgrep/action.yml` + `README.md`: docker run, JSON report, finding count in the log, `reimport-scan` with a header file; warn-only, `exit 0`.
2. `workflows/_sast.yml`: branch -> environment step, checkout, action call with `secrets.DEFECTDOJO_API_KEY`; `permissions: contents: read`.
3. `actions/dependency_track`: input `application` -> `--form-string projectTags=app:<lowercase slug>` (default: repository name).
4. `workflows/README.md` (`_sast` section, `application` input) and `CHANGELOG.md` (2.1.0 Features).
5. Hardlink every new/changed file into `.github/` (`.github/hooks/post-merge` semantics) and stage both copies.

## Validation
- YAML parse of the three changed YAML files.
- Run scripts extracted and run with `sh` and stub `docker`/`curl`: title case (`babel`, `certego-tools`, `service_portal`), exact curl argv, header via file, warn-only on docker/curl failure and bad path, default application from `GITHUB_REPOSITORY`.
- Real pinned Semgrep image on a fixture with the default rulesets: JSON has `.results`.
- Branch -> environment `case` block run for each branch.
- `actionlint` not installed here.
