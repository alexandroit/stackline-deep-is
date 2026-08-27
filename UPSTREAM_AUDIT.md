# Upstream Audit

Audit date: 2026-08-26

## Identity And Maintenance

| Field | Evidence |
| --- | --- |
| npm package | `deep-is@0.1.4` |
| Repository | https://github.com/thlorenz/deep-is |
| License | MIT |
| npm latest publish | 2021-09-04 |
| Last core behavior change | 2013-04-17, signed-zero handling |
| Repository | Unarchived; default branch `master` |
| Current open work | No open issues or pull requests |

The 2021 release changed the deprecated package license metadata format. It did
not change the equality implementation or tests. In issue #8, the upstream
maintainer explicitly said the project had not needed changes. This project is
therefore described as stable but functionally dormant, not falsely labeled as
officially abandoned or end-of-life.

## Current Distribution And Usage

Official npm complete-week observations for 2026-08-19 through 2026-08-25:

| Package | Downloads | Relevance |
| --- | ---: | --- |
| `deep-is` | 142,421,490 | audited package |
| `optionator` | 151,315,822 | direct dependent |
| `eslint` | 160,098,819 | active downstream through optionator |

`optionator@0.9.4` depends on `deep-is@^0.1.3`. Its current implementation calls
`deepIs(it, val)` when matching parsed command-line values against enum values.
`eslint@10.9.1` depends on `optionator@^0.9.3`.

## Issue And Pull Request Review

- Issue #1 requested distinguishing positive and negative zero; fixed and
  released in `0.1.1`.
- Issue #2 and PR #3 added the license chain; merged and released.
- PR #4 and PR #5 proposed excluding tests/examples from npm. They were closed
  without merge after discussion about offline test availability and evidence
  of meaningful size reduction. Stackline will use an explicit `files` list but
  retain tests and evidence in the public repository and release attachments.
- PR #7 fixed license metadata; merged and released in `0.1.4`.
- Issue #8 asked whether the project was EOL. The maintainer replied in 2021
  that it had simply not required changes.
- Issue #9 tracked the license metadata correction and was resolved by PR #7.

There are no unreleased bug-fix pull requests to adopt.

## Reproduced Behavior

The upstream suite passes 14 assertions on the current development machine.
The following important historical semantics were characterized:

- `NaN` equals `NaN`;
- positive zero does not equal negative zero;
- primitive number/string pairs use loose equality;
- invalid dates do not compare equal;
- enumerable own string keys are compared recursively;
- symbol and non-enumerable keys are ignored;
- the historical `.prototype` property is compared, not object prototypes;
- arrays can compare equal to objects with the same enumerable keys;
- regular expressions, maps, and sets with no enumerable keys can compare equal
  even when their internal values differ;
- boxed primitives can compare equal to unboxed values in historical cases.

Those surprising cases are compatibility constraints, not invitations to
silently adopt modern strict semantics.

## Verified Gap

Equivalent cyclic objects throw `RangeError: Maximum call stack size exceeded`.
Equivalent acyclic objects nested 20,000 levels deep also throw `RangeError`.
An iterative graph traversal can remove both failures while preserving the
acyclic oracle.

## Security Review

- GitHub's reviewed-advisory query returned no advisory affecting `deep-is`.
- `npm audit` returned zero known runtime or development vulnerabilities in the
  installed baseline tree on the observation date.
- npm registry signatures verified for the installed baseline dependencies.
- No CVE or GHSA claim is made.

## Alternatives

| Alternative | Why it is not a drop-in replacement |
| --- | --- |
| `node:util.isDeepStrictEqual` | strict primitive and prototype semantics differ |
| `deep-equal` | broader modern behavior and options differ |
| `fast-deep-equal` | strict semantics and special object handling differ |
| `dequal` | strict modern object semantics differ |

These alternatives are valid for new code. They do not preserve the behavior
that current `deep-is` consumers receive through npm alias replacement.

## Decision

GO: retain the old public function and acyclic result matrix, replace recursive
descent with cycle-safe iterative traversal, add first-party declarations and
modern release evidence, and keep zero runtime dependencies.
