import { locales, type Locale } from './locales.ts';

/**
 * The translated route map, with no `astro:*` imports so astro.config.mjs (sitemap filter) and Node tests can read it.
 * src/i18n/routes.ts re-exports these and builds the URL helpers on top. Keys are internal ids, never URLs.
 * `satisfies` fails the type check if a section is missing a locale.
 */
export const routes = {
	projects: { es: 'proyectos', en: 'projects' },
	now: { es: 'now', en: 'now' },
	uses: { es: 'uses', en: 'uses' },
	colophon: { es: 'colofon', en: 'colophon' },
	styleguide: { es: 'styleguide', en: 'styleguide' },
} as const satisfies Record<string, Record<Locale, string>>;

export type SectionKey = keyof typeof routes;

/**
 * Base segment of each kind of work detail page: /es/proyectos/{slug}/, /es/experiencia/{slug}/.
 * Not part of `routes`, so no section page is generated for them (/es/experiencia/ is a 404, D-W3).
 * Keys are the JSON collection names in src/content.config.ts.
 */
export const detailBases = {
	projects: routes.projects,
	experiences: { es: 'experiencia', en: 'experience' },
} as const satisfies Record<string, Record<Locale, string>>;

/** Sections that are built and linked but kept out of search: `noindex` and left out of the sitemap. */
export const unindexedSections: readonly SectionKey[] = ['styleguide'];

/** Paths of the unindexed sections in every locale, as the sitemap sees them: ['/es/styleguide/', '/en/styleguide/']. */
export function unindexedPaths(): string[] {
	return unindexedSections.flatMap((key) => locales.map((locale) => `/${locale}/${routes[key][locale]}/`));
}
