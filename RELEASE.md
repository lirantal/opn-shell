# Release

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and release notes.

## Release Flow

1. Ensure all intended changes are merged and CI is green.
2. Run `npm run version` to apply Changesets version and changelog updates.
3. Review the generated package and changelog changes.
4. Run the release command, if configured for the repository.

The `release` script runs `changeset publish` through the release workflow.

## Changesets

Add a changeset for user-facing package behavior changes:

```sh
npm run changeset
```

Documentation-only, test-only, and internal refactor PRs usually do not need a changeset unless they describe or accompany a release-worthy behavior change.

## npm trusted publishing

Publishing uses GitHub Actions OIDC, with Node.js 24 and `id-token: write`.
No `NPM_TOKEN` secret is needed.

In this package's npm settings, register a GitHub trusted publisher with:

+- Owner: `lirantal`
+- Repository: `opn-shell`
+- Workflow filename: `release.yml`
+- Environment: leave empty
+- Allowed action: enable `npm publish`

See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).

Keep the root versions in `package.json` and `package-lock.json` aligned with
the last published release before applying a new changeset. The workflow rejects
the `0.0.0-development` placeholder used by semantic-release.
