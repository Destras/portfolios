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
