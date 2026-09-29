# @stackline/deep-is

> Stack-safe deep equality with the proven deep-is 0.1.4 semantics.

[![npm version](https://img.shields.io/npm/v/@stackline/deep-is.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/deep-is)
[![license](https://img.shields.io/npm/l/@stackline/deep-is.svg?style=flat-square)](https://github.com/alexandroit/stackline-deep-is)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-deep-is-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-deep-is)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/deep-is/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/deep-is/)** | **[npm](https://www.npmjs.com/package/@stackline/deep-is)** | **[Issues](https://github.com/alexandroit/stackline-deep-is/issues)** | **[Repository](https://github.com/alexandroit/stackline-deep-is)**

**Current package version:** `1.0.3`

---

## Why this package?

> Stack-safe deep equality with the established `deep-is@0.1.4` behavior.




This package is an independent, maintained continuation of
[`deep-is`](https://github.com/thlorenz/deep-is). It keeps the callable API and
its intentionally loose compatibility semantics while handling cyclic and very
deep object graphs without recursive call-stack exhaustion.

<a id="provenance"></a>

### Provenance

The upstream source and authorship history are documented in
[UPSTREAM_AUDIT.md](https://github.com/alexandroit/stackline-deep-is/blob/main/UPSTREAM_AUDIT.md) and [NOTICE](https://github.com/alexandroit/stackline-deep-is/blob/main/NOTICE). The Stackline fork
is not affiliated with or endorsed by the original authors.

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/deep-is@1.0.3` |
| Node.js runtime | `>=12` |
| CommonJS / primary entry | `./index.js` |
| ES module entry | `./index.mjs` |
| Type declarations | `./index.d.ts` |

- CommonJS and native ESM
- First-party TypeScript declarations, including TypeScript 3.9 consumers
- Browser bundle entry points
- Node.js 12 and newer at runtime
- Zero runtime dependencies

See [COMPATIBILITY_CONTRACT.md](https://github.com/alexandroit/stackline-deep-is/blob/main/COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](https://github.com/alexandroit/stackline-deep-is/blob/main/MIGRATION.md) for the exact boundary and alias migration.

## Installation

<a id="install"></a>

### Install

```bash
npm install @stackline/deep-is
```

Preserve an existing `require('deep-is')` without changing application code:

```bash
npm install deep-is@npm:@stackline/deep-is
```

## Usage

### CommonJS

```js
const deepIs = require('@stackline/deep-is');

deepIs({ answer: 42 }, { answer: '42' }); // true
deepIs(+0, -0); // false
deepIs(NaN, NaN); // true
```

### ESM

```js
import deepIs from '@stackline/deep-is';

const left = { id: 1 };
const right = { id: '1' };
left.self = left;
right.self = right;

deepIs(left, right); // true
```

## Features and Integrations

<a id="reliability"></a>

### Reliability

The original recursive algorithm can throw `RangeError` for equivalent cycles
or sufficiently deep inputs. This implementation uses iterative graph traversal
and pair tracking. Regression coverage includes a 100,000-level object graph,
cyclic graphs, and more than 5,000 differential comparisons against a frozen
copy of `deep-is@0.1.4`.

There is no published CVE or GHSA claim associated with this change.

## Security

Report vulnerabilities privately as described in [SECURITY.md](https://github.com/alexandroit/stackline-deep-is/blob/main/SECURITY.md).
Do not disclose an unpatched vulnerability in a public issue.

## API Surface

<a id="api"></a>

### API

#### `deepIs(actual, expected)`

Returns a boolean. Inputs are not mutated.

The package deliberately preserves the legacy contract:

- `NaN` equals `NaN`;
- positive and negative zero differ;
- non-object primitive pairs use loose equality;
- dates compare their timestamps;
- enumerable own string keys are compared independent of order;
- arguments objects retain their historical array comparison;
- symbol and non-enumerable keys are outside the contract;
- Map, Set, RegExp, and object-prototype internals are not interpreted.

Use `node:util.isDeepStrictEqual` or another strict comparator when new code
needs strict modern semantics.

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-deep-is.git
cd stackline-deep-is
npm ci
npm run verify
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:smoke
```

## Release Checklist

Run `npm run verify` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-deep-is/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## License

MIT. Original copyright and permission notices are preserved in
[LICENSE](https://github.com/alexandroit/stackline-deep-is/blob/main/LICENSE).

## Credits and original authors

- Original project: [deep-is](https://github.com/thlorenz/deep-is).
- Stackline Maintainers.
- Thorsten Lorenz.
- James Halliday.
- Thomas Robinson.
- Copyright (c) 2012, 2013 Thorsten Lorenz <thlorenz@gmx.de>.
- Copyright (c) 2012 James Halliday <mail@substack.net>.
- Copyright (c) 2009 Thomas Robinson <280north.com>.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
