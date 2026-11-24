// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://juaniw.com',
	// Every URL ends in `/` (/es/proyectos/), so links built by the i18n helpers stay consistent.
	trailingSlash: 'always',
	// Locale list must match `locales` in src/i18n/locales.ts.
	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: {
			// Every locale is prefixed, matching src/pages/[locale]/. The `/` redirect lives in src/pages/index.astro.
			prefixDefaultLocale: true,
		},
	},
	// Global typefaces, independent of theme and mode. Files live in src/assets/fonts (woff2).
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson Hyperlegible Next',
			cssVariable: '--font-sans',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						weight: '200 800',
						style: 'normal',
						src: ['./src/assets/fonts/atkinson-hyperlegible-next/AtkinsonHyperlegibleNext-Variable.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Commit Mono',
			cssVariable: '--font-mono',
			fallbacks: ['monospace'],
			options: {
				variants: [
					{ weight: 400, style: 'normal', src: ['./src/assets/fonts/commit-mono/CommitMono-400.woff2'] },
					{ weight: 700, style: 'normal', src: ['./src/assets/fonts/commit-mono/CommitMono-700.woff2'] },
				],
			},
		},
	],
});
