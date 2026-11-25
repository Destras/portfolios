// Facts shown on /{locale}/styleguide: token names and values. Identical in every language;
// the prose that describes each token lives in the dictionaries (src/i18n).
// Values mirror src/styles/themes/*.css and src/styles/foundations.css.

export const colorTokens = [
	'--color-bg',
	'--color-surface',
	'--color-border',
	'--color-text',
	'--color-text-muted',
	'--color-accent',
	'--color-accent-hover',
	'--color-focus',
	'--color-selection',
	'--color-on-selection',
] as const;

export type ColorToken = (typeof colorTokens)[number];

export const contrast = [
	{ theme: 'Salvia', rows: [
		['text / bg', '4.5:1', '17.2:1', '16.7:1'],
		['text-muted / bg', '4.5:1', '5.8:1', '7.6:1'],
		['text / surface', '4.5:1', '18.6:1', '15.4:1'],
		['accent / bg', '4.5:1', '7.3:1', '11.7:1'],
		['accent-hover / bg', '4.5:1', '10.6:1', '14.2:1'],
		['focus / bg', '3:1', '7.3:1', '11.7:1'],
	] },
	{ theme: 'Brasa', rows: [
		['text / bg', '4.5:1', '16.3:1', '15.1:1'],
		['text-muted / bg', '4.5:1', '5.9:1', '7.6:1'],
		['text / surface', '4.5:1', '15.1:1', '14.3:1'],
		['accent / bg', '4.5:1', '5.1:1', '5.9:1'],
		['accent-hover / bg', '4.5:1', '7.4:1', '7.6:1'],
		['focus / bg', '3:1', '5.1:1', '5.9:1'],
	] },
];

export const families = [
	{ name: 'Atkinson Hyperlegible Next', token: '--font-body', weights: [
		{ token: '--weight-regular', label: '400' },
		{ token: '--weight-semibold', label: '600' },
		{ token: '--weight-bold', label: '700' },
	] },
	{ name: 'Commit Mono', token: '--font-accent', weights: [
		{ token: '--weight-regular', label: '400' },
		{ token: '--weight-bold', label: '700' },
	] },
];

export const textSizes = [
	{ name: '--text-2xs', value: '0.75rem' },
	{ name: '--text-xs', value: '0.8125rem' },
	{ name: '--text-sm', value: '0.875rem' },
	{ name: '--text-nav', value: 'clamp(0.875rem, 0.8530rem + 0.0939vw, 0.9375rem)' },
	{ name: '--text-base', value: '0.9375rem' },
	{ name: '--text-md', value: 'clamp(1rem, 0.9780rem + 0.0939vw, 1.0625rem)' },
	{ name: '--text-lg', value: 'clamp(1.5rem, 1.4120rem + 0.3756vw, 1.75rem)' },
	{ name: '--text-xl', value: 'clamp(1.5rem, 1.3239rem + 0.7512vw, 2rem)' },
	{ name: '--text-display', value: 'clamp(4rem, 3.2958rem + 3.0047vw, 6rem)' },
] as const;

export type TextSizeToken = (typeof textSizes)[number]['name'];

export const typeTokens = [
	['--leading-none', '1'],
	['--leading-tight', '1.3'],
	['--leading-hero', '1.35'],
	['--leading-normal', '1.5'],
	['--leading-relaxed', '1.6'],
	['--tracking-tight', '-0.01em'],
	['--tracking-caps', '0.05em'],
	['--tracking-display', '-0.04em'],
];

export const spaces = [
	['--space-1', '0.25rem'],
	['--space-2', '0.5rem'],
	['--space-3', '0.75rem'],
	['--space-4', '1rem'],
	['--space-5', '1.25rem'],
	['--space-6', '1.5rem'],
	['--space-7', '1.75rem'],
	['--space-8', '2rem'],
	['--space-10', '2.5rem'],
	['--space-page-top', 'clamp(2.5rem, 1.2676rem + 5.2582vw, 6rem)'],
	['--space-section', 'clamp(3rem, 2.6479rem + 1.5023vw, 4rem)'],
	['--space-footer-top', 'clamp(5rem, 4.1197rem + 3.7559vw, 7.5rem)'],
	['--space-footer-bottom', 'clamp(2.5rem, 2.1479rem + 1.5023vw, 3.5rem)'],
	['--gutter', 'clamp(1.25rem, 0.6338rem + 2.6291vw, 3rem)'],
];

export const radii = [
	['--radius-sm', '4px'],
	['--radius-md', '6px'],
	['--radius-full', '999px'],
];

export const layoutTokens = [
	{ name: '--measure', value: '69ch' },
	{ name: '--header-height', value: '4.5rem' },
	{ name: '--tap-min', value: '2.75rem' },
	{ name: '--row-date-col', value: '9.75rem' },
	{ name: '--fact-label-col', value: '6.75rem' },
	{ name: '--table-cat-col', value: '6.875rem' },
	{ name: '--table-item-col', value: '15rem' },
	{ name: '--border-width', value: '1px' },
	{ name: '--focus-width', value: '2px' },
	{ name: '--focus-offset', value: '2px' },
	{ name: '--underline-offset', value: '0.25em' },
	{ name: '--dot-size', value: '4px' },
] as const;

export type LayoutToken = (typeof layoutTokens)[number]['name'];
