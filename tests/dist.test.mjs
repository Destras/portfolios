// Post-build checks over dist/. Run: npx astro build && npm run test:dist.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

/** A file of the build, by its path relative to dist/. Throws if it doesn't exist. */
export function readDist(path) {
	return readFileSync(join(dist, path), 'utf8');
}

/** Every HTML file of the build, relative to dist/. */
export function distHtmlFiles() {
	return readdirSync(dist, { recursive: true })
		.filter((f) => f.endsWith('.html'))
		.map((f) => relative(dist, join(dist, f)));
}

test('robots.txt allows everything and points to the sitemap', () => {
	const robots = readDist('robots.txt');
	assert.match(robots, /^User-agent: \*$/m);
	assert.match(robots, /^Allow: \/$/m);
	assert.match(robots, /^Sitemap: https:\/\/juaniw\.com\/sitemap-index\.xml$/m);
});

test('sitemap lists only canonical indexable URLs', () => {
	const urls = [...readDist('sitemap-0.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
	assert.ok(!urls.includes('https://juaniw.com/'), 'root redirect listed');
	assert.ok(!urls.some((u) => u.includes('/styleguide/') || u.includes('404')), 'styleguide or 404 listed');
	assert.ok(urls.includes('https://juaniw.com/en/') && urls.includes('https://juaniw.com/es/'));
});

test('styleguide pages are noindex', () => {
	for (const p of ['es/styleguide/index.html', 'en/styleguide/index.html'])
		assert.match(readDist(p), /<meta name="robots" content="noindex"/, p);
});

test('every page links the sitemap', () => {
	// dist/index.html is the noindex meta-refresh fallback of the `/` redirect (src/pages/index.astro), not a page.
	for (const f of distHtmlFiles().filter((f) => f !== 'index.html')) assert.match(readDist(f), /<link rel="sitemap" href="\/sitemap-index\.xml"/, f);
});
