import { getRelativeLocaleUrl } from 'astro:i18n';
import { locales, type Locale } from './locales';

/**
 * The single source of translated routes: generated pages, nav, footer, language switch,
 * canonical and hreflang all come from here. Keys are internal ids, never URLs.
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

export type WorkKind = keyof typeof detailBases;
export type RouteKey = 'home' | SectionKey;

export const sectionKeys = Object.keys(routes) as SectionKey[];

function slugFor(key: RouteKey, locale: Locale): string {
	return key === 'home' ? '' : routes[key][locale];
}

/** Relative path: localizedPath('projects', 'en') → '/en/projects/' */
export function localizedPath(key: RouteKey, locale: Locale): string {
	return getRelativeLocaleUrl(locale, slugFor(key, locale));
}

/** One page's relative path in every locale, with a trailing slash. Drives canonical, hreflang and the language switch. */
export type LocalePaths = Record<Locale, string>;

/** sectionPaths('projects') → { es: '/es/proyectos/', en: '/en/projects/' } */
export function sectionPaths(key: RouteKey): LocalePaths {
	return Object.fromEntries(locales.map((locale) => [locale, localizedPath(key, locale)])) as LocalePaths;
}

/** detailPaths('experiences', 'harness') → { es: '/es/experiencia/harness/', en: '/en/experience/harness/' } */
export function detailPaths(kind: WorkKind, slug: string): LocalePaths {
	return Object.fromEntries(
		locales.map((locale) => [locale, getRelativeLocaleUrl(locale, `${detailBases[kind][locale]}/${slug}`)]),
	) as LocalePaths;
}

/** hreflang alternates of a page. x-default points to `/`, which picks the language (design doc §2). */
export function alternates(paths: LocalePaths, site: URL): { hreflang: Locale | 'x-default'; href: string }[] {
	return [
		...locales.map((locale) => ({ hreflang: locale, href: new URL(paths[locale], site).href })),
		{ hreflang: 'x-default' as const, href: new URL('/', site).href },
	];
}
