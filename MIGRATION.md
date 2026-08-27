# Migration

## Direct Stackline Name

```bash
npm install @stackline/deep-is
```

```js
const deepIs = require('@stackline/deep-is');
```

## Preserve Existing Imports

Use an npm alias when existing code already imports `deep-is`:

```bash
npm install deep-is@npm:@stackline/deep-is
```

No source change is required:

```js
const deepIs = require('deep-is');
```

The default 1.x contract preserves the legacy loose equality behavior. Do not
migrate to this package when the application actually wants strict modern
equality semantics; use Node's strict API or a purpose-built alternative.
