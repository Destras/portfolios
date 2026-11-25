// Run: node --test src/scripts/notFoundPath.test.mjs. Plain JS so astro check needs no @types/node; Node strips the imported module's TS types.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { displayPath } from './notFoundPath.ts';

test('shows a plain missing path as is', () => {
	assert.equal(displayPath('/es/cualquiercosa/'), '/es/cualquiercosa/');
});

test('decodes percent-encoded characters', () => {
	assert.equal(displayPath('/es/a%C3%B1o/'), '/es/año/');
});

test('returns a malformed escape raw instead of throwing', () => {
	assert.equal(displayPath('/%E0%A4%A/'), '/%E0%A4%A/');
});

test('hides the line on the 404 page itself', () => {
	assert.equal(displayPath('/404.html'), null);
	assert.equal(displayPath('/404/'), null);
});

test('shows the root path', () => {
	assert.equal(displayPath('/'), '/');
});
