import deepIs = require('../../index');

const result: boolean = deepIs({ value: 1 }, { value: '1' });

void result;
