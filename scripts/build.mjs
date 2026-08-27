import { mkdir } from 'node:fs/promises';
import { build } from 'esbuild';

const outdir = new URL('../dist/', import.meta.url);
await mkdir(outdir, { recursive: true });

const shared = {
  bundle: true,
  legalComments: 'eof',
  minify: true,
  platform: 'browser',
  sourcemap: true,
  target: ['es2018']
};

await Promise.all([
  build({
    ...shared,
    entryPoints: [new URL('../index.js', import.meta.url).pathname],
    format: 'cjs',
    outfile: new URL('browser.cjs', outdir).pathname
  }),
  build({
    ...shared,
    entryPoints: [new URL('../index.mjs', import.meta.url).pathname],
    format: 'esm',
    outfile: new URL('browser.mjs', outdir).pathname
  }),
  build({
    ...shared,
    entryPoints: [new URL('../index.mjs', import.meta.url).pathname],
    format: 'iife',
    globalName: 'DeepIs',
    outfile: new URL('browser.global.js', outdir).pathname
  })
]);

console.log('Built CommonJS, ESM, and global browser artifacts.');
