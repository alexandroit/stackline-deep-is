import deepIs, { deepIs as namedDeepIs } from '../../index.mjs';

const defaultResult: boolean = deepIs({ value: 1 }, { value: '1' });
const namedResult: boolean = namedDeepIs([1], { 0: 1 });

void defaultResult;
void namedResult;
