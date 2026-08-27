'use strict';

var pSlice = Array.prototype.slice;

module.exports = function deepEqual(actual, expected) {
  if (actual === 0 && expected === 0) {
    return (1 / actual) === (1 / expected);
  }
  if (actual === expected) return true;
  if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();
  }
  if (typeof actual === 'number' && actual !== actual) {
    return typeof expected === 'number' && expected !== expected;
  }
  if (typeof actual !== 'object' && typeof expected !== 'object') {
    return actual == expected;
  }
  return objEquiv(actual, expected);
};

function objEquiv(a, b) {
  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }
  if (a.prototype !== b.prototype) return false;
  if (Object.prototype.toString.call(a) === '[object Arguments]') {
    if (Object.prototype.toString.call(b) !== '[object Arguments]') return false;
    return module.exports(pSlice.call(a), pSlice.call(b));
  }

  var ka;
  var kb;
  try {
    ka = Object.keys(a);
    kb = Object.keys(b);
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
  for (i = ka.length - 1; i >= 0; i -= 1) {
    if (!module.exports(a[ka[i]], b[kb[i]])) return false;
  }
  return true;
}
