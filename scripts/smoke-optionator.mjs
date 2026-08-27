import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const temporary = await mkdtemp(path.join(os.tmpdir(), 'stackline-optionator-'));

try {
  await writeFile(path.join(temporary, 'package.json'), JSON.stringify({
    private: true,
    dependencies: { optionator: '0.9.4' }
  }));
  const installed = spawnSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
    cwd: temporary,
    encoding: 'utf8'
  });
  assert.equal(installed.status, 0, installed.stderr);

  const optionatorModules = path.join(temporary, 'node_modules', 'optionator', 'node_modules');
  await mkdir(optionatorModules, { recursive: true });
  await rm(path.join(temporary, 'node_modules', 'deep-is'), { force: true, recursive: true });
  await symlink(root, path.join(optionatorModules, 'deep-is'), 'dir');

  const checked = spawnSync(process.execPath, ['-e', [
    "const path = require('node:path');",
    "const deepIsPath = require.resolve('deep-is', { paths: [path.dirname(require.resolve('optionator'))] });",
    "if (!require(deepIsPath)({ value: 1 }, { value: '1' })) process.exit(1);",
    "const optionator = require('optionator')({ options: [{ option: 'mode', type: 'String', enum: ['safe'] }] });",
    "const parsed = optionator.parse(['node', 'script', '--mode', 'safe']);",
    "if (parsed.mode !== 'safe') process.exit(1);"
  ].join('')], {
    cwd: temporary,
    encoding: 'utf8'
  });
  assert.equal(checked.status, 0, checked.stderr);
} finally {
  await rm(temporary, { force: true, recursive: true });
}

console.log('Optionator adoption-path smoke test passed.');
