# Adoption Targets

## Primary Target

### `gkz/optionator`

- Active release: `optionator@0.9.4`
- Direct dependency: `deep-is@^0.1.3`
- Exact usage: enum value matching through `deepIs(it, val)`
- Migration: one package manifest alias with unchanged source imports
- Validation: run optionator's complete test suite against the packed Stackline
  artifact

## Downstream Evidence

`eslint@10.9.1` depends on `optionator@^0.9.3`, demonstrating a current active
tooling path. ESLint is not the first migration target because it does not own
the direct `deep-is` edge.

Additional GitHub code-search results must be filtered for active repositories
and direct dependency ownership before an adoption campaign. Do not open bulk
issues based only on lockfiles or copied manifests.
