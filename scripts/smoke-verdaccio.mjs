import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const version = process.env.STACKLINE_VERSION || JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')).version
const registry = process.env.STACKLINE_REGISTRY || 'http://127.0.0.1:4873';
const temporary = await mkdtemp(path.join(os.tmpdir(), 'stackline-deep-is-registry-'));

try {
  await writeFile(path.join(temporary, 'package.json'), JSON.stringify({
    private: true,
    dependencies: {
      '@stackline/deep-is': version,
      'deep-is': `npm:@stackline/deep-is@${version}`
    }
  }));

  const installed = spawnSync('npm', [
    'install',
    '--ignore-scripts',
    '--no-audit',
    '--no-fund',
    '--registry',
    registry
  ], { cwd: temporary, encoding: 'utf8' });
  assert.equal(installed.status, 0, installed.stderr);

  const checked = spawnSync(process.execPath, ['-e', [
    "const direct = require('@stackline/deep-is');",
    "const alias = require('deep-is');",
    "if (!direct({ value: 1 }, { value: '1' })) process.exit(1);",
    "if (!alias({ value: 1 }, { value: '1' })) process.exit(1);"
  ].join('')], { cwd: temporary, encoding: 'utf8' });
  assert.equal(checked.status, 0, checked.stderr);
} finally {
  await rm(temporary, { force: true, recursive: true });
}

console.log('Verdaccio direct and legacy-alias install checks passed.');
