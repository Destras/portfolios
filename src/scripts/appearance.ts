/**
 * Theme and mode logic for the header's appearance selector (AppearanceMenu.astro).
 * Pure functions only, so it runs under `node --test`.
 *
 * The inline <head> script in src/layouts/Layout.astro repeats the theme ids (an `is:inline`
 * script can't import), so a new theme has to be added there too, plus its CSS file in src/styles/themes/.
 */

export type Theme = 'salvia' | 'brasa';
export type Mode = 'light' | 'dark';

/** Order = order in the selector. Names are proper nouns: not translated. */
export const THEMES: readonly { id: Theme; name: string }[] = [
	{ id: 'salvia', name: 'Salvia' },
	{ id: 'brasa', name: 'Brasa' },
];

export const DEFAULT_THEME: Theme = 'salvia';

/** A stored or attribute value as a theme; anything unknown falls back to the default. */
export function parseTheme(value: string | null | undefined): Theme {
	return THEMES.find((t) => t.id === value)?.id ?? DEFAULT_THEME;
}

/** A stored or attribute value as a forced mode; `null` means "follow the system". */
export function parseMode(value: string | null | undefined): Mode | null {
	return value === 'light' || value === 'dark' ? value : null;
}

/** The mode the visitor actually sees: the forced one, else the system's. */
export function effectiveMode(stored: Mode | null, systemDark: boolean): Mode {
	return stored ?? (systemDark ? 'dark' : 'light');
}

/**
 * Whether to cross-fade with the View Transitions API. Reduced motion has to be checked here:
 * the global `*` rule in base.css doesn't reach the ::view-transition-* pseudo-elements.
 */
export function shouldAnimate(env: { hasViewTransitions: boolean; reducedMotion: boolean }): boolean {
	return env.hasViewTransitions && !env.reducedMotion;
}

/**
 * Picking a theme closes the popover only with a pointer. Arrow keys fire `change` on every step
 * inside a radio group, so closing on keyboard changes would close it on the first keypress.
 */
export function closesOnThemePick(pointer: boolean): boolean {
	return pointer;
}
