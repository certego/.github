# Composite action semgrep

This action runs [Semgrep CE](https://semgrep.dev/docs/) on a directory and imports the findings into DefectDojo, in the Product of the application and in the Engagement of the environment, so SAST results sit next to the SCA ones from Dependency-Track.

It is composed of one step:

1. **Run Semgrep and import the findings into DefectDojo** - Runs the pinned `semgrep/semgrep` image (tag and digest) with the directory mounted read-only and `--metrics=off`, writes a JSON report, logs the number of findings, then re-imports it with `POST <url>/api/v2/reimport-scan/` (`Semgrep JSON Report`, Product type `Applications`, Product = title case of the application, Engagement = environment, Test `Semgrep`, `auto_create_context` and `close_old_findings` on). The token is written to a temporary header file, never to a command line.

**The action never fails the job**: any error (Semgrep, rules download, upload) prints a `::warning::` and the step exits with 0. Findings alone do not fail it either.

## Documentation

### Inputs

* `path` - Optional - Directory to scan. By default, it is set to `.`.
* `application` - Optional - Application name; it is turned into the same lowercase slug as the `app:` tag of the [**dependency_track**](../dependency_track/action.yml) action (anything but letters and digits becomes `-`), then `-` becomes a space and each word is capitalised, like the Dependency-Track sync, so `certego-tools` (or `certego_tools`) is the Product `Certego Tools`. By default, it is set to the repository name.
* `environment` - Mandatory - DefectDojo Engagement name: `prod` or `stag`.
* `rules` - Optional - Space separated Semgrep rulesets, each passed as `--config`. By default, it is set to `p/default p/secrets p/owasp-top-ten`.
* `exclude` - Optional - Space separated paths or patterns the scan skips, each passed as `--exclude` (a name matches at any depth). By default, it is set to `.github`, the `certego/.github` subtree every consumer vendors: its findings belong to that repository, not to the application. An empty value scans everything.
* `api_key` - Mandatory - DefectDojo API v2 token allowed to import scans into the `Applications` product type.
* `url` - Optional - DefectDojo base URL. By default, it is set to `https://dtrack.certego.net:8443`.

### Example

```yaml
- uses: ./.github/actions/semgrep
  with:
    environment: stag
    api_key: ${{ secrets.DEFECTDOJO_API_KEY }}
```
