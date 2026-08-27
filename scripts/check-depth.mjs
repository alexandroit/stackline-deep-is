import assert from 'node:assert/strict';
import { Worker } from 'node:worker_threads';

const result = await new Promise((resolve, reject) => {
  const worker = new Worker(new URL('../test/depth-worker.js', import.meta.url));
  const timeout = setTimeout(() => {
    void worker.terminate();
    reject(new Error('Depth and cycle regression exceeded 15 seconds.'));
  }, 15000);

  worker.once('message', resolve);
  worker.once('error', reject);
  worker.once('exit', (code) => {
    if (code !== 0) reject(new Error('Depth worker exited with code ' + code + '.'));
  });
  worker.once('message', () => clearTimeout(timeout));
  worker.once('error', () => clearTimeout(timeout));
});

assert.equal(result, 'ok');
console.log('100,000-level depth and cyclic graph checks passed.');
