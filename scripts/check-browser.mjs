import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../dist/browser.global.js', import.meta.url), 'utf8');
const context = { console };
vm.runInNewContext(source, context, { filename: 'browser.global.js' });

assert.equal(typeof context.DeepIs.default, 'function');
assert.equal(context.DeepIs.default({ value: 1 }, { value: '1' }), true);
assert.equal(context.DeepIs.deepIs, context.DeepIs.default);

console.log('Browser bundle checks passed.');
