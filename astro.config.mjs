// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import { createHash } from 'node:crypto';
import { unindexedPaths } from './src/i18n/routeMap.ts';
import { themeBootstrap } from './src/scripts/themeBootstrap.ts';

// Hash of the is:inline pre-paint script, which Astro's CSP doesn't hash on its own.
const themeBootstrapHash = /** @type {`sha256-${string}`} */ (`sha256-${createHash('sha256').update(themeBootstrap).digest('base64')}`);

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

  // Content Security Policy as a <meta> per page, with hashes of the scripts and styles Astro emits
  // (https://docs.astro.build/en/reference/configuration-reference/#securitycsp). frame-ancestors can't go in a
  // <meta>; X-Frame-Options in public/_headers covers framing. The Cloudflare Web Analytics beacon is allowed.
  security: {
      csp: {
          directives: [
              "default-src 'self'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self' https://cloudflareinsights.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
          ],
          scriptDirective: {
              resources: ["'self'", 'https://static.cloudflareinsights.com'],
              hashes: [themeBootstrapHash],
          },
          // Element hashes go to style-src-elem; style="" attributes (appearance swatches, styleguide) need 'unsafe-inline' on style-src-attr only.
          styleDirective: {
              resources: [
                  { resource: "'self'", kind: 'element' },
                  { resource: "'unsafe-inline'", kind: 'attribute' },
              ],
          },
      },
  },

  // No code blocks in the content; Shiki's inline styles would also clash with the CSP.
  markdown: { syntaxHighlight: false },

  integrations: [
      sitemap({
          // Only canonical 200 pages: `/` is a 307 to /es/ or /en/ (src/worker.ts), and unindexed sections are noindex.
          filter: (page) => {
              const path = new URL(page).pathname;
              return path !== '/' && !unindexedPaths().includes(path);
          },
      }),
  ],
});