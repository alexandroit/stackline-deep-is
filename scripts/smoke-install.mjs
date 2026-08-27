import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const temporary = await mkdtemp(path.join(os.tmpdir(), 'stackline-deep-is-'));

try {
  const packed = spawnSync('npm', ['pack', '--json', '--ignore-scripts'], {
    cwd: root,
    encoding: 'utf8'
  });
  assert.equal(packed.status, 0, packed.stderr);
  const packResult = JSON.parse(packed.stdout);
  const tarball = path.join(root, packResult[0].filename);

  await writeFile(path.join(temporary, 'package.json'), JSON.stringify({
    private: true,
    dependencies: {
      '@stackline/deep-is': 'file:' + tarball
    }
  }));

  const installed = spawnSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
    cwd: temporary,
    encoding: 'utf8'
  });
  assert.equal(installed.status, 0, installed.stderr);

  const checked = spawnSync(process.execPath, ['-e', [
    "const deepIs = require('@stackline/deep-is');",
    "if (!deepIs({ a: 1 }, { a: '1' })) process.exit(1);"
  ].join('')], {
    cwd: temporary,
    encoding: 'utf8'
  });
  assert.equal(checked.status, 0, checked.stderr);

  const manifest = JSON.parse(await readFile(path.join(
    temporary,
    'node_modules',
    '@stackline',
    'deep-is',
    'package.json'
  ), 'utf8'));
  assert.equal(manifest.name, '@stackline/deep-is');
  await rm(tarball, { force: true });
} finally {
  await rm(temporary, { force: true, recursive: true });
}

console.log('Packed scoped-install smoke test passed.');
