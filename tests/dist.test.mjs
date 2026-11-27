// Post-build checks over dist/. Run: npx astro build && npm run test:dist.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

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
	assert.ok(!urls.includes('https://juaniw.com/en/projects/plataforma-clinica/'), 'old EN slug listed');
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

test('clinical detail pages cross-link the translated slugs', () => {
	const en = readDist('en/projects/clinical-platform/index.html');
	assert.match(en, /<link rel="canonical" href="https:\/\/juaniw\.com\/en\/projects\/clinical-platform\/"/);
	assert.match(en, /hreflang="es" href="https:\/\/juaniw\.com\/es\/proyectos\/plataforma-clinica\/"/);
	assert.match(readDist('es/proyectos/plataforma-clinica/index.html'), /hreflang="en" href="https:\/\/juaniw\.com\/en\/projects\/clinical-platform\/"/);
	assert.throws(() => readDist('en/projects/plataforma-clinica/index.html'));
	assert.match(readDist('en/index.html'), /href="\/en\/projects\/clinical-platform\/"/);
});

test('old EN clinical URL redirects permanently', () => {
	assert.match(readDist('_redirects'), /^\/en\/projects\/plataforma-clinica\/ \/en\/projects\/clinical-platform\/ 301$/m);
});

test('home uses one positioning label and shows availability', () => {
	const en = readDist('en/index.html');
	assert.match(en, /<title>Juan Ignacio Werkalec · Senior Full-Stack Engineer, UI-first<\/title>/);
	assert.match(en, /<h1[^>]*>Senior full-stack engineer, UI-first\. I take ambiguous features from idea to production\.<\/h1>/);
	assert.match(en, /Open to senior frontend \/ full-stack roles — remote\./);
	const es = readDist('es/index.html');
	assert.match(es, /<title>Juan Ignacio Werkalec · Senior Full-Stack Engineer, UI-first<\/title>/);
	assert.match(es, /<h1[^>]*>Ingeniero full-stack senior, foco en UI\. Llevo features ambiguas de la idea a producción\.<\/h1>/);
	assert.match(es, /Abierto a roles senior frontend \/ full-stack — remoto\./);
});

test('CV is served under its new name, old URL redirects', () => {
	readDist('juan-ignacio-werkalec-fullstack-engineer-en.pdf');
	assert.throws(() => readDist('cv-en.pdf'));
	assert.match(readDist('_redirects'), /^\/cv-en\.pdf \/juan-ignacio-werkalec-fullstack-engineer-en\.pdf 301$/m);
	for (const f of distHtmlFiles()) assert.ok(!readDist(f).includes('/cv-en.pdf'), f);
});

const sha256 = (s) => `'sha256-${createHash('sha256').update(s).digest('base64')}'`;

test('inline scripts and styles are allowed by the page CSP', () => {
	// dist/index.html is the meta-refresh fallback of `/` (no scripts, no styles), emitted by Astro.redirect without a CSP.
	for (const f of distHtmlFiles().filter((f) => f !== 'index.html')) {
		const html = readDist(f);
		const csp = html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/)?.[1];
		assert.ok(csp, `${f}: no CSP meta`);
		for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))
			if (!/\bsrc=/.test(attrs) && !/application\/ld\+json/.test(attrs)) assert.ok(csp.includes(sha256(body)), `${f}: script not hashed`);
		for (const [, body] of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) assert.ok(csp.includes(sha256(body)), `${f}: style not hashed`);
		assert.match(csp, /https:\/\/static\.cloudflareinsights\.com/);
		assert.match(csp, /object-src 'none'/);
	}
});

test('_headers sets the security headers on every path', () => {
	const h = readDist('_headers');
	for (const line of [
		'Strict-Transport-Security: max-age=31536000',
		'X-Content-Type-Options: nosniff',
		'Referrer-Policy: strict-origin-when-cross-origin',
		'X-Frame-Options: DENY',
		'Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()',
	])
		assert.ok(h.includes(line), line);
	assert.match(h, /^\/\*$/m);
});
