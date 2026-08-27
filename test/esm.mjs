import assert from 'node:assert/strict';
import deepIs, { deepIs as namedDeepIs } from '../index.mjs';

assert.equal(deepIs({ answer: 42 }, { answer: '42' }), true);
assert.equal(namedDeepIs, deepIs);

console.log('Native ESM checks passed.');
