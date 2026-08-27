'use strict';

var deepIs = require('@stackline/deep-is');

var left = { id: 7 };
var right = { id: '7' };
left.self = left;
right.self = right;

console.log(deepIs(left, right));
