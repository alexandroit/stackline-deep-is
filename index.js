'use strict';

var pSlice = Array.prototype.slice;
var Object_keys = Object.keys;

module.exports = function deepEqual(actual, expected) {
  var pending = [{ actual: actual, expected: expected }];
  var compared = new WeakMap();

  while (pending.length > 0) {
    var comparison = pending.pop();
    var a;
    var b;

    if (comparison.parent) {
      a = comparison.actual[comparison.key];
      b = comparison.expected[comparison.key];
    } else {
      a = comparison.actual;
      b = comparison.expected;
    }

    // Enforce Object.is semantics for positive and negative zero.
    if (a === 0 && b === 0) {
      if (!areZerosEqual(a, b)) return false;
      continue;
    }

    if (a === b) continue;

    if (a instanceof Date && b instanceof Date) {
      if (a.getTime() !== b.getTime()) return false;
      continue;
    }

    if (isNumberNaN(a)) {
      if (!isNumberNaN(b)) return false;
      continue;
    }

    // Preserve deep-is 0.1.4 loose equality for non-object pairs.
    if (typeof a !== 'object' && typeof b !== 'object') {
      if (a != b) return false;
      continue;
    }

    if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;

    if (isReference(a) && isReference(b)) {
      var expectedValues = compared.get(a);
      if (expectedValues && expectedValues.has(b)) continue;
      if (!expectedValues) {
        expectedValues = new WeakSet();
        compared.set(a, expectedValues);
      }
      expectedValues.add(b);
    }

    // This is the historical public behavior: compare a property literally
    // named "prototype", not the objects' internal prototypes.
    if (a.prototype !== b.prototype) return false;

    if (isArguments(a)) {
      if (!isArguments(b)) return false;
      pending.push({ actual: pSlice.call(a), expected: pSlice.call(b) });
      continue;
    }

    var ka;
    var kb;
    try {
      ka = Object_keys(a);
      kb = Object_keys(b);
    } catch (error) {
      return false;
    }

    if (ka.length !== kb.length) return false;

    ka.sort();
    kb.sort();

    var i;
    for (i = ka.length - 1; i >= 0; i -= 1) {
      if (ka[i] !== kb[i]) return false;
    }

    // The stack is LIFO. Pushing low-to-high preserves the baseline's
    // high-to-low recursive comparison and getter-observation order.
    for (i = 0; i < ka.length; i += 1) {
      pending.push({
        actual: a,
        expected: b,
        key: ka[i],
        parent: true
      });
    }
  }

  return true;
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isArguments(object) {
  return Object.prototype.toString.call(object) === '[object Arguments]';
}

function isNumberNaN(value) {
  return typeof value === 'number' && value !== value;
}

function areZerosEqual(zeroA, zeroB) {
  return (1 / zeroA) === (1 / zeroB);
}

function isReference(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}
