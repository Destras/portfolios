// Run: node --test src/scripts/appearance.test.mjs. Plain JS so astro check needs no @types/node; Node strips the imported module's TS types.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
	THEMES,
	closesOnThemePick,
	effectiveMode,
	parseMode,
	parseTheme,
	shouldAnimate,
} from './appearance.ts';

test('parseTheme keeps known ids and falls back to salvia', () => {
	assert.equal(parseTheme('brasa'), 'brasa');
	assert.equal(parseTheme('salvia'), 'salvia');
	assert.equal(parseTheme('azul'), 'salvia');
	assert.equal(parseTheme(null), 'salvia');
});

test('parseMode keeps light/dark and returns null otherwise', () => {
	assert.equal(parseMode('dark'), 'dark');
	assert.equal(parseMode('light'), 'light');
	assert.equal(parseMode('system'), null);
	assert.equal(parseMode(undefined), null);
});

test('effectiveMode: stored wins, else system', () => {
	assert.equal(effectiveMode('light', true), 'light');
	assert.equal(effectiveMode(null, true), 'dark');
	assert.equal(effectiveMode(null, false), 'light');
});

test('shouldAnimate only with the API and without reduced motion', () => {
	assert.equal(shouldAnimate({ hasViewTransitions: true, reducedMotion: false }), true);
	assert.equal(shouldAnimate({ hasViewTransitions: true, reducedMotion: true }), false);
	assert.equal(shouldAnimate({ hasViewTransitions: false, reducedMotion: false }), false);
});

test('closesOnThemePick: pointer closes, keyboard does not', () => {
	assert.equal(closesOnThemePick(true), true);
	assert.equal(closesOnThemePick(false), false);
});

test('THEMES lists salvia then brasa', () => {
	assert.deepEqual(
		THEMES.map((t) => t.id),
		['salvia', 'brasa'],
	);
});
