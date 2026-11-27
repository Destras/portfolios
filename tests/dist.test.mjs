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

const jsonLd = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">(.+?)<\/script>/s)[1]);

test('home has a ProfilePage JSON-LD and og:type profile', () => {
	for (const l of ['es', 'en']) {
		const html = readDist(`${l}/index.html`);
		const ld = jsonLd(html);
		assert.equal(ld['@type'], 'ProfilePage');
		assert.equal(ld.mainEntity.jobTitle, 'Senior Full-Stack Engineer');
		assert.deepEqual(ld.mainEntity.sameAs, ['https://www.linkedin.com/in/juan-ignacio-werkalec/', 'https://github.com/Destras']);
		assert.match(html, /<meta property="og:type" content="profile"/);
	}
});

test('detail pages have a 3-level BreadcrumbList and og:type article', () => {
	const html = readDist('en/experience/harness/index.html');
	const ld = jsonLd(html);
	assert.equal(ld['@type'], 'BreadcrumbList');
	assert.equal(ld.itemListElement.length, 3);
	assert.equal(ld.itemListElement[2].item, 'https://juaniw.com/en/experience/harness/');
	assert.match(html, /<meta property="og:type" content="article"/);
});

const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

test('detail titles carry the role and descriptions are 120–160 chars', () => {
	assert.match(readDist('en/experience/harness/index.html'), /<title>Harness — Senior Frontend Engineer · Juan Ignacio Werkalec<\/title>/);
	const details = distHtmlFiles().filter((f) => /\/(experiencia|experience|proyectos|projects)\/.+\//.test(f));
	assert.ok(details.length >= 8, `found ${details.length} detail pages`);
	for (const f of details) {
		const d = decode(readDist(f).match(/<meta name="description" content="([^"]+)"/)[1]);
		assert.ok(d.length >= 120 && d.length <= 160, `${f}: ${d.length}`);
	}
});

test('projects page h2 is not a copy of the h1', () => {
	assert.match(readDist('en/projects/index.html'), />Freelance projects</);
	assert.match(readDist('es/proyectos/index.html'), />Proyectos freelance</);
});
