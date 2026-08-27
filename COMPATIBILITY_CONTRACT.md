# Compatibility Contract

Baseline: `deep-is@0.1.4`

## Public API

```js
const deepIs = require('deep-is');
const same = deepIs(actual, expected);
```

The package exports one synchronous callable function. It returns a boolean and
does not mutate either input.

## Preserved Equality Semantics

- Identical values compare equal except positive and negative zero differ.
- `NaN` compares equal to `NaN`.
- Two dates compare their millisecond timestamps.
- Two non-object values fall back to loose `==` comparison.
- Other pairs compare enumerable own string keys recursively.
- Key order does not affect equality.
- Arguments objects are converted to arrays before comparison.
- The historical `.prototype` property check remains intact.
- Symbol keys, non-enumerable keys, and modern Map/Set internals remain outside
  the baseline contract.

This intentionally preserves cases that differ from modern strict equality,
including `deepIs(1, '1') === true` and legacy array/object equivalence.

## Maintained Extension

- Cyclic object graphs are processed without call-stack failure.
- Deep acyclic graphs are processed iteratively without recursive stack
  exhaustion.
- Revisited object pairs terminate deterministically. Reference alias topology
  is not treated as a new equality dimension, matching the old behavior for
  repeated acyclic references.

## Errors

Exceptions raised by user-controlled getters, proxies, or coercion hooks remain
observable where the baseline exposed them. The implementation does not hide
arbitrary user-code errors. Native recursion `RangeError` is removed for normal
object-graph traversal.

## Modules And Types

- CommonJS remains callable.
- Native ESM provides a default export of the same function.
- First-party TypeScript declarations use syntax compatible with TypeScript
  3.9 and newer.
- Browser builds preserve the same synchronous function.

## Runtime Target

Node.js 12 and newer, plus current browser bundles. Development tooling may
require a newer Node.js release and is not part of the runtime contract.
