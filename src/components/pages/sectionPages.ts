import type { SectionKey } from '../../i18n/routes';
// Import order only sets the byte order of the shared CSS chunk (all page styles are scoped, so the cascade doesn't depend on it).
import ProjectsPage from './ProjectsPage.astro';
import StyleguidePage from './StyleguidePage.astro';
import ColophonPage from './ColophonPage.astro';

/**
 * Section key → page component, rendered by src/pages/[locale]/[section].astro.
 * To publish a section: add it here and give it `meta` in the dictionary (`[section].astro` reads `t[key].meta`,
 * so a key without it fails `astro check`). Every page takes `{ locale }`.
 * Sections not listed here render the noindex placeholder (`PlaceholderKey` in src/i18n/types.ts).
 */
export const sectionPages = {
	styleguide: StyleguidePage,
	projects: ProjectsPage,
	colophon: ColophonPage,
} as const satisfies Partial<Record<SectionKey, unknown>>;

export type PageKey = keyof typeof sectionPages;

export function isPageKey(key: SectionKey): key is PageKey {
	return Object.hasOwn(sectionPages, key);
}
