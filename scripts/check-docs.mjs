import { readFile, stat } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const site = new URL('../site-dist/', import.meta.url);
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
const metadata = JSON.parse(await readFile(new URL('package-meta.json', site), 'utf8'));
const html = await readFile(new URL('index.html', site), 'utf8');
const app = await readFile(new URL('app.js', site), 'utf8');
const bundle = await readFile(new URL('package.js', site), 'utf8');
const robots = await readFile(new URL('robots.txt', site), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', site), 'utf8');
const llms = await readFile(new URL('llms.txt', site), 'utf8');
const llmsFull = await readFile(new URL('llms-full.txt', site), 'utf8');
const migration = await readFile(new URL('guides/migration.md', site), 'utf8');
const compatibility = await readFile(new URL('guides/compatibility.md', site), 'utf8');
const image = await stat(new URL('assets/deep-is-graph.webp', site));

assert(metadata.name === packageJson.name, 'documentation package name is stale');
assert(metadata.version === packageJson.version, 'documentation version is stale');
assert(metadata.runtimeDependencies === 0, 'documentation dependency count is stale');
assert(!html.includes('{{PACKAGE_VERSION}}'), 'HTML version placeholder was not replaced');
assert(html.includes('<link rel="canonical" href="https://alexandro.net/docs/vanilla/deep-is/">'), 'canonical URL is missing');
assert(html.includes('SoftwareSourceCode'), 'structured software metadata is missing');
assert(html.includes('index,follow'), 'indexable robots metadata is missing');
assert(html.includes('./package.js'), 'production package bundle is not loaded');
assert(app.includes('globalThis.DeepIs.default'), 'comparator does not use the production bundle');
assert(app.startsWith("'use strict';"), 'documentation app must terminate its strict directive');
assert(bundle.includes('DeepIs'), 'browser global is missing');
assert(robots.includes('User-agent: *\nAllow: /'), 'robots policy is not open');
assert(sitemap.includes('/deep-is/guides/compatibility.md'), 'sitemap is incomplete');
assert(llms.includes('npm install @stackline/deep-is'), 'LLM install reference is missing');
assert(llmsFull.includes('100,000'), 'LLM reliability evidence is missing');
assert(migration.includes('deep-is@npm:@stackline/deep-is'), 'alias guide is missing');
assert(compatibility.includes('Preserved Equality Semantics'), 'compatibility contract is missing');
assert(html.includes('./analytics.js'), 'documentation analytics is missing');
assert(image.size > 20_000 && image.size < 500_000, `documentation image size is invalid: ${image.size}`);

for (const [name, value] of Object.entries({ html, llms, llmsFull, migration, compatibility })) {
  assert(!/(127\.0\.0\.1|localhost|verdaccio)/i.test(value), `${name} exposes a private environment`);
}

console.log(JSON.stringify({ imageBytes: image.size, name: metadata.name, version: metadata.version }));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
