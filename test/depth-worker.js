'use strict';

var assert = require('node:assert/strict');
var parentPort = require('node:worker_threads').parentPort;
var deepIs = require('../index.js');

var left = {};
var right = {};
var leftCursor = left;
var rightCursor = right;

for (var i = 0; i < 100000; i += 1) {
  leftCursor.next = { value: i % 3 };
  rightCursor.next = { value: String(i % 3) };
  leftCursor = leftCursor.next;
  rightCursor = rightCursor.next;
}

assert.equal(deepIs(left, right), true);
rightCursor.value = 9;
assert.equal(deepIs(left, right), false);

var cycleA = { label: 'same' };
var cycleB = { label: 'same' };
cycleA.self = cycleA;
cycleB.self = cycleB;
assert.equal(deepIs(cycleA, cycleB), true);

parentPort.postMessage('ok');
