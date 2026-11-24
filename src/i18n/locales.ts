import { getAbsoluteLocaleUrl } from 'astro:i18n';

// Must match `i18n.locales` in astro.config.mjs.
export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export function isLocale(value: string | undefined): value is Locale {
	return locales.includes(value as Locale);
}

/** getStaticPaths() result shared by every page under src/pages/[locale]/. */
export function localeStaticPaths(): { params: { locale: Locale }; props: { locale: Locale } }[] {
	return locales.map((locale) => ({ params: { locale }, props: { locale } }));
}

/**
 * hreflang alternates for the current page. Assumes the path after the locale
 * prefix is the same in every language (true for the MVP; phase 2 needs a routes map).
 */
export function getAlternateLinks(
	pathname: string,
	site: URL,
): { hreflang: Locale | 'x-default'; href: string }[] {
	const [first, ...rest] = pathname.split('/').filter(Boolean);
	const path = (isLocale(first) ? rest : [first, ...rest]).filter(Boolean).join('/');
	return [
		...locales.map((locale) => ({ hreflang: locale, href: getAbsoluteLocaleUrl(locale, path) })),
		{ hreflang: 'x-default' as const, href: new URL('/', site).href },
	];
}
