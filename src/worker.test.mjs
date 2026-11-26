// Run: node --test src/worker.test.mjs. Plain JS so astro check needs no @types/node; Node strips the imported module's TS types.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { redirectToPreferredLocale } from './worker.ts';

const request = (url, init) => new Request(url, init);

test('redirects Spanish browsers to /es/ with 307', () => {
	const res = redirectToPreferredLocale(request('https://juaniw.com/', { headers: { 'Accept-Language': 'es-AR' } }));
	assert.equal(res.status, 307);
	assert.equal(res.headers.get('location'), 'https://juaniw.com/es/');
});

test('redirects everyone else to /en/', () => {
	const res = redirectToPreferredLocale(request('https://juaniw.com/'));
	assert.equal(res.status, 307);
	assert.equal(res.headers.get('location'), 'https://juaniw.com/en/');
});

test('keeps the query string', () => {
	const res = redirectToPreferredLocale(request('https://juaniw.com/?utm_source=linkedin'));
	assert.equal(res.headers.get('location'), 'https://juaniw.com/en/?utm_source=linkedin');
});

test('is never cached by language', () => {
	const res = redirectToPreferredLocale(request('https://juaniw.com/'));
	assert.equal(res.headers.get('vary'), 'Accept-Language');
	assert.equal(res.headers.get('cache-control'), 'no-store');
});

test('answers HEAD the same way', () => {
	const res = redirectToPreferredLocale(request('https://juaniw.com/', { method: 'HEAD', headers: { 'Accept-Language': 'es' } }));
	assert.equal(res.status, 307);
	assert.equal(res.headers.get('location'), 'https://juaniw.com/es/');
});

test('default export is a module worker', () => {
	assert.equal(typeof worker.fetch, 'function');
});
