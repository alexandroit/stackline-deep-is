'use strict';

var assert = require('assert');
var deepIs = require('../index.js');

assert.strictEqual(deepIs({ value: 1 }, { value: '1' }), true);
assert.strictEqual(deepIs(+0, -0), false);
assert.strictEqual(deepIs(NaN, NaN), true);

var left = { value: 1 };
var right = { value: '1' };
left.self = left;
right.self = right;
assert.strictEqual(deepIs(left, right), true);

console.log('Runtime compatibility checks passed.');
