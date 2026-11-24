import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';
import { locales, type Locale } from './locales';

/**
 * The single source of translated routes: generated pages, nav, footer, language switch,
 * canonical and hreflang all come from here. Keys are internal ids, never URLs.
 * `satisfies` fails the type check if a section is missing a locale.
 */
export const routes = {
	process: { es: 'proceso', en: 'process' },
	projects: { es: 'proyectos', en: 'projects' },
	now: { es: 'now', en: 'now' },
	uses: { es: 'uses', en: 'uses' },
	colophon: { es: 'colofon', en: 'colophon' },
	styleguide: { es: 'styleguide', en: 'styleguide' },
} as const satisfies Record<string, Record<Locale, string>>;

export type SectionKey = keyof typeof routes;
export type RouteKey = 'home' | SectionKey;

export const sectionKeys = Object.keys(routes) as SectionKey[];

function slugFor(key: RouteKey, locale: Locale): string {
	return key === 'home' ? '' : routes[key][locale];
}

/** Relative path: localizedPath('projects', 'en') → '/en/projects/' */
export function localizedPath(key: RouteKey, locale: Locale): string {
	return getRelativeLocaleUrl(locale, slugFor(key, locale));
}

/** Absolute URL (uses `site`): localizedUrl('projects', 'es') → 'https://juaniw.com/es/proyectos/' */
export function localizedUrl(key: RouteKey, locale: Locale): string {
	return getAbsoluteLocaleUrl(locale, slugFor(key, locale));
}

/** hreflang alternates of a page. x-default points to `/`, which picks the language (design doc §2). */
export function alternates(key: RouteKey, site: URL): { hreflang: Locale | 'x-default'; href: string }[] {
	return [
		...locales.map((locale) => ({ hreflang: locale, href: localizedUrl(key, locale) })),
		{ hreflang: 'x-default' as const, href: new URL('/', site).href },
	];
}
