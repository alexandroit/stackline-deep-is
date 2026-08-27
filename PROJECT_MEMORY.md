---
schema: stackline-project-memory-v1
package: deep-is
upstream: https://github.com/thlorenz/deep-is
stackline_package: "@stackline/deep-is"
state: PUBLISHED
registry_scope: verdaccio-and-public-npm
public_npm: true
public_github: true
docs_production: true
created: 2026-08-26
last_updated: 2026-08-26
---

# Project Memory

## Objective

Maintain the established `deep-is` boolean equality contract while removing
call-stack exhaustion for cyclic and deeply nested object graphs, adding
first-party types, and providing current release verification.

## Upstream Identity

- npm: `deep-is@0.1.4`
- repository: https://github.com/thlorenz/deep-is
- license: MIT
- latest publish: 2021-09-04
- last core algorithm change: 2013-04-17
- repository state: public, unarchived, no open issues or pull requests

## Distribution Snapshot

- `deep-is`: 142,421,490 downloads for 2026-08-19 through 2026-08-25
- `optionator`: 151,315,822 downloads for the same complete week
- `eslint`: 160,098,819 downloads for the same complete week
- source: official npm downloads API

`optionator@0.9.4` directly depends on `deep-is@^0.1.3` and invokes it for enum
value matching. `eslint@10.9.1` currently depends on `optionator@^0.9.3`.

## Verified Reliability Gap

The published implementation recursively calls itself for each nested value.
Equivalent cyclic objects and equivalent objects nested 20,000 levels deep
both throw `RangeError`. This is not tied to a published CVE or GHSA and must
not be marketed as one.

## Compatibility Boundary

Preserve all characterized acyclic behavior, including loose primitive
comparison, `NaN`, signed zero, dates, arguments objects, enumerable string
keys, and the historical `prototype` property check. Do not silently replace
the algorithm with Node's strict equality or another package's semantics.

## Decision Gates

- legal/provenance: PASS - MIT with clear copyright chain
- real problem: PASS - reproducible stack exhaustion
- forward-looking necessity: PASS - active option parsing chain
- differentiation: PASS - alternatives use different equality contracts
- compatibility feasibility: PASS - one callable API and differential oracle
- maintenance burden: PASS - small zero-runtime-dependency surface
- adoption path: PASS - optionator is a direct reachable consumer
- evidence path: PASS - differential, cycle, depth, and downstream tests

## Decision

GO.

## Implementation Status

Implementation and release gates are complete. The Verdaccio rehearsal was
published as `1.0.0`; the exact final artifact is public as
`@stackline/deep-is@1.0.1` on Verdaccio and npm. Source, CI, CodeQL, release
assets, and production documentation are public.

## Release Evidence

- Upstream suite: 14/14 assertions passed.
- Differential oracle: 5,625 acyclic pairs matched `deep-is@0.1.4`.
- Reliability: equal and unequal graphs at 100,000 levels passed without stack
  exhaustion; cyclic equal/unequal regressions passed.
- Coverage: 100% statements, branches, functions, and lines for `index.js`.
- Modules: CommonJS, native ESM, browser CJS/ESM/global bundles passed.
- Types: TypeScript 3.9 and 7.0.2 contract checks passed.
- Packaging: `publint` clean; AreTheTypesWrong all green; packed install passed.
- Downstream: representative `optionator@0.9.4` enum parsing passed against the
  Stackline implementation.
- Registries: direct and npm-alias installs from Verdaccio and official npm
  passed; the public smoke lock resolved only from `registry.npmjs.org`.
- Production audit: zero known runtime vulnerabilities.
- CI: https://github.com/alexandroit/stackline-deep-is/actions/runs/33033258833
- CodeQL: https://github.com/alexandroit/stackline-deep-is/actions/runs/33033258796
- Source commit: `5c5d344933077c6c26179cf1840a854e3d7d3bdd`.
- Release: https://github.com/alexandroit/stackline-deep-is/releases/tag/v1.0.1
- Documentation: https://alexandro.net/docs/vanilla/deep-is/
- Tarball: 9.8 kB packed, 36.3 kB unpacked, 17 files.
- SHA-1: `4fa48fa659fd3538c3de29c5f61241f569bc4fbe`.
- Integrity: `sha512-z4gQ8m+pdFSQ1Og3kJ/Zxu9q+ajlS6XLUDZ+y1ZewYxD5X87urnuB+et8oIDPV7eX5FtDDw7Re0TJ/IcN5sRJg==`.

## Chronological Log

- 2026-08-26: upstream, npm, history, issues, pull requests, forks,
  alternatives, advisories, package contents, and active usage audited.
- 2026-08-26: upstream test suite passed 14 assertions on Node.js 20.
- 2026-08-26: cycle and 20,000-level depth failures reproduced as `RangeError`.
- 2026-08-26: GO approved before implementation.
- 2026-08-26: iterative pair-tracking implementation completed with zero
  runtime dependencies and the historical callable API preserved.
- 2026-08-26: full `npm run verify` gate passed, including package and
  downstream adoption checks.
- 2026-08-26: version `1.0.0` published to Verdaccio and validated by direct
  scoped install and legacy npm alias as the private registry rehearsal.
- 2026-08-26: final `1.0.1` artifact published unchanged to Verdaccio and
  official npm; public direct and alias installs, runtime checks, and audit
  passed.
- 2026-08-26: GitHub source, CI, CodeQL, release asset inventory, production
  documentation, package catalog, robots, and aggregate sitemaps validated.
