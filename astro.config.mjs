// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
