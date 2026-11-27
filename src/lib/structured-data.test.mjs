// Run: npm test.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { profilePageJsonLd, breadcrumbJsonLd, serializeJsonLd } from './structured-data.ts';

test('profilePageJsonLd wraps a Person in Rosario, AR', () => {
	const d = profilePageJsonLd({
		url: 'https://juaniw.com/en/',
		name: 'Juan Ignacio Werkalec',
		jobTitle: 'Senior Full-Stack Engineer',
		image: 'https://juaniw.com/og.png',
		sameAs: ['https://github.com/Destras'],
		knowsAbout: ['React'],
		locale: 'en',
	});
	assert.equal(d['@context'], 'https://schema.org');
	assert.equal(d['@type'], 'ProfilePage');
	assert.equal(d.inLanguage, 'en');
	assert.equal(d.mainEntity['@type'], 'Person');
	assert.equal(d.mainEntity.jobTitle, 'Senior Full-Stack Engineer');
	assert.deepEqual(d.mainEntity.sameAs, ['https://github.com/Destras']);
	assert.deepEqual(d.mainEntity.address, { '@type': 'PostalAddress', addressLocality: 'Rosario', addressCountry: 'AR' });
});

test('breadcrumbJsonLd numbers items from 1', () => {
	const d = breadcrumbJsonLd([
		{ name: 'Home', url: 'a' },
		{ name: 'Projects', url: 'b' },
	]);
	assert.equal(d['@type'], 'BreadcrumbList');
	assert.deepEqual(
		d.itemListElement.map((i) => i.position),
		[1, 2],
	);
	assert.equal(d.itemListElement[1].item, 'b');
	assert.equal(d.itemListElement[1]['@type'], 'ListItem');
});

test('serializeJsonLd escapes <', () => {
	const out = serializeJsonLd({ x: '</script>' });
	assert.ok(!out.includes('<'));
	assert.deepEqual(JSON.parse(out), { x: '</script>' });
});
