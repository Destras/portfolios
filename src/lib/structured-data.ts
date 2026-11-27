import type { Locale } from '../i18n/locales.ts';

/**
 * schema.org JSON-LD builders. Pure functions (no astro:* imports) so they can be unit-tested with node --test.
 * Layout.astro renders the result with serializeJsonLd() inside <script type="application/ld+json">.
 */

export interface ProfileInput {
	url: string;
	name: string;
	jobTitle: string;
	image: string;
	sameAs: string[];
	knowsAbout: string[];
	locale: Locale;
}

/** Home page: a ProfilePage whose main entity is the site owner. */
export function profilePageJsonLd({ url, name, jobTitle, image, sameAs, knowsAbout, locale }: ProfileInput): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url,
		inLanguage: locale,
		mainEntity: {
			'@type': 'Person',
			name,
			jobTitle,
			url,
			image,
			sameAs,
			knowsAbout,
			address: { '@type': 'PostalAddress', addressLocality: 'Rosario', addressCountry: 'AR' },
		},
	};
}

/** Detail pages: Home → Projects → this page. `url`s must be absolute. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map(({ name, url }, i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
	};
}

/** JSON for an inline <script>: `<` is escaped so no string can close the tag early. */
export function serializeJsonLd(data: object): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
