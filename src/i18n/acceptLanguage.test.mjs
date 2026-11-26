// Run: node --test src/i18n/acceptLanguage.test.mjs. Plain JS so astro check needs no @types/node; Node strips the imported module's TS types.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { preferredLocale } from './acceptLanguage.ts';

test('plain Spanish', () => {
	assert.equal(preferredLocale('es'), 'es');
});

test('regional Spanish', () => {
	assert.equal(preferredLocale('es-AR,es;q=0.9,en;q=0.8'), 'es');
});

test('numeric region', () => {
	assert.equal(preferredLocale('es-419'), 'es');
});

test('case-insensitive', () => {
	assert.equal(preferredLocale('ES-ar'), 'es');
});

test('English first even with Spanish later', () => {
	assert.equal(preferredLocale('en-US,en;q=0.9,es;q=0.8'), 'en');
});

test('other language first', () => {
	assert.equal(preferredLocale('fr, es'), 'en');
});

test('sorts by q, not by position', () => {
	assert.equal(preferredLocale('en;q=0.5, es;q=0.9'), 'es');
});

test('ties keep header order', () => {
	assert.equal(preferredLocale('en, es'), 'en');
	assert.equal(preferredLocale('es, en'), 'es');
});

test('q=0 excludes the language', () => {
	assert.equal(preferredLocale('es;q=0, en'), 'en');
});

test('invalid q drops the entry', () => {
	assert.equal(preferredLocale('es;q=abc, en;q=0.5'), 'en');
});

test('whitespace around parts', () => {
	assert.equal(preferredLocale('  es ; q=0.8 , en ;q=0.7 '), 'es');
});

test('wildcard is not Spanish', () => {
	assert.equal(preferredLocale('*'), 'en');
});

test('prefix that is not Spanish', () => {
	assert.equal(preferredLocale('est'), 'en');
});

test('missing header', () => {
	assert.equal(preferredLocale(null), 'en');
});

test('empty header', () => {
	assert.equal(preferredLocale(''), 'en');
});

test('garbage', () => {
	assert.equal(preferredLocale(';;,,q=1'), 'en');
});
