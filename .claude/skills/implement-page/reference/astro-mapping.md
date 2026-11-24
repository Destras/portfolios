# The guide's Next.js terms → this repo (Astro 7)

diseno-juaniw Annex A and the original guide assume Next.js. This repo is Astro 7.4, with the i18n setup from `docs/superpowers/plans/2026-11-24-i18n-routing.md`. Always read the current code first: if it differs from this table, the code wins, and this table gets updated.

| Guide / diseno says | In this repo | Docs |
|---|---|---|
| `content/es.ts`, `content/en.ts`, type `Content` in `content/types.ts` | `src/i18n/es.ts`, `src/i18n/en.ts`, type `Dictionary` in `src/i18n/types.ts`; `getDictionary(locale)` in `src/i18n/dictionaries.ts` | i18n plan |
| `app/[lang]/now/page.tsx` | `src/pages/[locale]/now.astro`, with `export const getStaticPaths = localeStaticPaths;` (imported from `src/i18n/locales.ts`, because `getStaticPaths` runs in an isolated scope) | https://docs.astro.build/en/reference/routing-reference/#getstaticpaths |
| `generateStaticParams` + `dynamicParams = false` | `getStaticPaths` returns only `es` and `en`. The build is static, so `/fr/` is never generated and the host serves `404.html` | https://docs.astro.build/en/guides/internationalization/#routing |
| `generateMetadata` (title, description) | `<Layout title={t.x.meta.title} description={t.x.meta.description}>` | https://docs.astro.build/en/basics/astro-components/#component-props |
| `alternates.languages` + `x-default` | Emitted by `Layout.astro` through `getAlternateLinks()` in `src/i18n/locales.ts`. Nothing to do per page | https://docs.astro.build/en/reference/modules/astro-i18n/#imports-from-astroi18n |
| `<html lang>` | `Layout.astro` derives it from `Astro.currentLocale` | https://docs.astro.build/en/reference/api-reference/#currentlocale |
| OG image, `noindex` | Not supported by `Layout.astro` yet. Propose new Layout props in the spec | — |
| `app/not-found.tsx` | `src/pages/404.astro` → builds `dist/404.html`. It is outside `[locale]`, so it has no locale: it is bilingual | https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page |
| `components/*.tsx` with typed props | `src/components/*.astro` with `interface Props` and a scoped `<style>` (diseno §8 CSS, tokens only) | https://docs.astro.build/en/basics/astro-components/#component-props |
| `usePathname` in LangSwitch | `Astro.url.pathname` at build time. No client JS | https://docs.astro.build/en/reference/api-reference/ (query the MCP for `Astro.url`) |
| `'use client'` | Not needed: MVP pages ship no JS. If a page seems to need JS, mark it PENDING | https://docs.astro.build/en/basics/astro-components/ |
| `/` redirect by `Accept-Language` | Static redirect to `/es/` (deferred: detection needs on-demand rendering) | https://docs.astro.build/en/guides/internationalization/#browser-language-detection |
| Trailing slash | Routes end in `/` (`/es/now/`) | i18n plan |

Before Phase B, query the Astro docs MCP for whatever the page uses that isn't in this table, and add it here.
