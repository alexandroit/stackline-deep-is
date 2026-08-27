'use strict';

var assert = require('node:assert/strict');
var baseline = require('./fixtures/deep-is-0.1.4');
var deepIs = require('../index.js');

function args() {
  return arguments;
}

function outcome(compare, actual, expected) {
  try {
    return { threw: false, value: compare(actual, expected) };
  } catch (error) {
    return { threw: true, name: error.name, message: error.message };
  }
}

var values = [
  undefined,
  null,
  false,
  true,
  0,
  -0,
  1,
  -1,
  1.5,
  NaN,
  Infinity,
  '',
  '0',
  '1',
  'text',
  new Date(0),
  new Date(0),
  new Date(86400000),
  new Date(NaN),
  /a/gi,
  /b/m,
  [],
  [1],
  ['1'],
  [1, 2],
  { 0: 1 },
  {},
  { a: 1 },
  { a: '1' },
  { a: [1, 2] },
  { b: 2, a: 1 },
  { a: 1, b: 2 },
  { prototype: 1 },
  { prototype: 2 },
  args(),
  args(1),
  args(1, 2),
  new Number(1),
  new String('x'),
  new Boolean(false),
  Object.create(null),
  new Map([['a', 1]]),
  new Map([['b', 2]]),
  new Set([1]),
  new Set([2]),
  function alpha() {},
  function beta() {}
];

for (var i = 0; i < 28; i += 1) {
  values.push({
    index: i,
    parity: i % 2,
    nested: [i % 5, { text: String(i % 7) }]
  });
}

var comparisons = 0;
for (var left = 0; left < values.length; left += 1) {
  for (var right = 0; right < values.length; right += 1) {
    var expected = outcome(baseline, values[left], values[right]);
    var actual = outcome(deepIs, values[left], values[right]);
    assert.deepEqual(actual, expected, 'baseline mismatch at pair ' + left + ':' + right);
    comparisons += 1;
  }
}

var getterOrder = [];
var getterLeft = {};
var getterRight = {};
Object.defineProperty(getterLeft, 'a', {
  enumerable: true,
  get: function () {
    getterOrder.push('left-a');
    return 1;
  }
});
Object.defineProperty(getterLeft, 'z', {
  enumerable: true,
  get: function () {
    getterOrder.push('left-z');
    return 2;
  }
});
Object.defineProperty(getterRight, 'a', {
  enumerable: true,
  get: function () {
    getterOrder.push('right-a');
    return 1;
  }
});
Object.defineProperty(getterRight, 'z', {
  enumerable: true,
  get: function () {
    getterOrder.push('right-z');
    return 2;
  }
});
assert.equal(deepIs(getterLeft, getterRight), true);
assert.deepEqual(getterOrder, ['left-z', 'right-z', 'left-a', 'right-a']);

var throwingKeys = new Proxy({}, {
  ownKeys: function () {
    throw new Error('ownKeys failure');
  }
});
assert.equal(deepIs(throwingKeys, {}), false);

var leftCycle = { value: 1 };
var rightCycle = { value: '1' };
leftCycle.self = leftCycle;
rightCycle.self = rightCycle;
assert.equal(deepIs(leftCycle, rightCycle), true);
rightCycle.value = 2;
assert.equal(deepIs(leftCycle, rightCycle), false);

var shared = { value: 1 };
assert.equal(
  deepIs({ first: shared, second: shared }, { first: { value: 1 }, second: { value: 1 } }),
  true
);

console.log('Compatibility checks passed: ' + comparisons + ' baseline pairs plus maintained extensions.');
