// Run: npm test. Plain JS so astro check needs no @types/node; Node strips the imported module's TS types.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unindexedPaths } from './routeMap.ts';

test('unindexedPaths lists the styleguide in every locale', () => {
	assert.deepEqual(unindexedPaths().sort(), ['/en/styleguide/', '/es/styleguide/']);
});
