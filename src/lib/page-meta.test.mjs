// Run: npm test.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detailTitle } from './page-meta.ts';

test('detailTitle adds the role', () => {
	assert.equal(
		detailTitle({ name: 'Harness', role: 'Senior Frontend Engineer' }),
		'Harness — Senior Frontend Engineer · Juan Ignacio Werkalec',
	);
	assert.equal(detailTitle({ name: 'Clinical follow-up platform' }), 'Clinical follow-up platform · Juan Ignacio Werkalec');
});
