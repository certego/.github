# Fix the release assets upload in `_release_and_tag.yml`

## Goal
Attach the sdist and wheel to the release created when a version PR is merged (`append_to_release: true`).

## Why
The workflow runs on `pull_request: closed`, where `github.ref_name` is `<n>/merge`: "Update release with assets" gets no tag ("GitHub Releases requires a tag") and its globs match nothing. Seen on certego/django-fernet 0.1.1; pypanoptikon already patches its subtree copy the same way.

## Decisions
- Use `github.event.pull_request.title` for `tag_name` and the globs: "Check Tag" already guarantees it is the `X.Y.Z` version and "Create Tag and Release" uses it as the tag.

## Out of scope
- Other changes to the release workflow (e.g. the Node 20 deprecation of `softprops/action-gh-release@v2`).
