# @stackline/deep-is

Stack-safe deep equality with the established `deep-is@0.1.4` behavior.

This package is an independent, maintained continuation of
[`deep-is`](https://github.com/thlorenz/deep-is). It keeps the callable API and
its intentionally loose compatibility semantics while handling cyclic and very
deep object graphs without recursive call-stack exhaustion.

## Install

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

## API

### `deepIs(actual, expected)`

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

## Reliability

The original recursive algorithm can throw `RangeError` for equivalent cycles
or sufficiently deep inputs. This implementation uses iterative graph traversal
and pair tracking. Regression coverage includes a 100,000-level object graph,
cyclic graphs, and more than 5,000 differential comparisons against a frozen
copy of `deep-is@0.1.4`.

There is no published CVE or GHSA claim associated with this change.

## Compatibility

- CommonJS and native ESM
- First-party TypeScript declarations, including TypeScript 3.9 consumers
- Browser bundle entry points
- Node.js 12 and newer at runtime
- Zero runtime dependencies

See [COMPATIBILITY_CONTRACT.md](COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](MIGRATION.md) for the exact boundary and alias migration.

## Security

Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).
Do not disclose an unpatched vulnerability in a public issue.

## Provenance

The upstream source and authorship history are documented in
[UPSTREAM_AUDIT.md](UPSTREAM_AUDIT.md) and [NOTICE](NOTICE). The Stackline fork
is not affiliated with or endorsed by the original authors.

## License

MIT. Original copyright and permission notices are preserved in
[LICENSE](LICENSE).
