import { getRelativeLocaleUrl } from 'astro:i18n';
import { locales, type Locale } from './locales';

// The route map itself lives in routeMap.ts (no astro:* imports, so the config and Node tests can use it).
// This file is the single source of translated URLs: generated pages, nav, footer, language switch, canonical and hreflang.
export { routes, detailBases, unindexedSections, unindexedPaths, type SectionKey } from './routeMap.ts';
import { routes, detailBases, type SectionKey } from './routeMap.ts';

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
