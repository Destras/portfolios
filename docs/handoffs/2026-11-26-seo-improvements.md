# Handoff — SEO improvements for juaniw.com

Repo: `/Users/thebuilder/projects/marcaPersonal/portfolios` (Astro 7, static output, deployed on Cloudflare Workers static assets; branch `main` was clean at the start).
The previous session **only investigated** (no code changed). The next session should turn the findings below into a plan and implement them.

Conversation language: Spanish (Rioplatense). **All docs, plans, code comments and commits must be in English** (repo `CLAUDE.md`). Before planning anything that touches Astro, query `mcp__astro-docs__search_astro_docs` and cite `source_url`s in the plan (repo rule).

## Relevant files (read these, don't re-derive)

- `src/layouts/Layout.astro` — the single `<head>`: title, description, robots noindex, canonical, hreflang (via `alternates()`), OG/Twitter tags. `og:type` is hard-coded `website`; one shared `/og.png`.
- `src/pages/404.astro` — own `<head>` copy (must stay in sync with Layout).
- `src/pages/index.astro` — `/` → `/es/` 301 fallback (static meta refresh, noindex).
- `src/worker.ts` + `wrangler.jsonc` — on Cloudflare, `/` is answered by the Worker: 307 by `Accept-Language`, `no-store`, `Vary`.
- `src/pages/[locale]/index.astro` (home), `[locale]/[section].astro` (sections; placeholders get `noindex`), `[locale]/[section]/[slug].astro` (work detail pages; title = `${name|org} · Juan Ignacio Werkalec`, description = `data.summary[locale]`).
- `src/i18n/routes.ts` — route map (`routes`, `detailBases`, `sectionPaths`, `detailPaths`, `alternates`). Slugs are translated (`proyectos`/`projects`, `experiencia`/`experience`, `colofon`/`colophon`).
- `src/i18n/es.ts`, `src/i18n/en.ts` — page meta titles/descriptions.
- `src/content/projects/{es,en}/*.md`, `src/content/experiences/{es,en}/*.md`, `src/data/projects.json`, `src/data/experiences.json` — detail content and summaries.
- `astro.config.mjs` — `site: 'https://juaniw.com'`, `trailingSlash: 'always'`, i18n prefixed locales, `sitemap()` with no options.
- `public/_headers` — only caching for `/_astro/*`.
- Existing plans/ADRs for context: `docs/superpowers/plans/2026-11-25-accept-language-redirect.md`, `docs/superpowers/plans/2026-11-24-i18n-routing.md`, `docs/guides/i18nRoutes.md`.

## Already good (don't redo)

Static HTML, per-page canonical, reciprocal hreflang es/en + `x-default` → `/`, OG + `summary_large_image`, unique descriptions, one `h1` per page, correct `lang`, real 404 status, `www` → apex 301, noindex on placeholders/404/redirect page.

## Findings (verified on build output and live site, 2026-11-26)

### High
1. **HTTP does not redirect to HTTPS**: `http://juaniw.com/es/` returns 200. Fix in Cloudflare dashboard (SSL/TLS → Edge Certificates → Always Use HTTPS; consider HSTS). Not a code change — tell the user.
2. **robots.txt**: live one is Cloudflare's *managed robots.txt* (content-signals comments only, no directives, no `Sitemap:`). No robots.txt in `dist/`. Plan: add `src/pages/robots.txt.ts` using `site` (pattern in https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage), plus `<link rel="sitemap" href="/sitemap-index.xml">` in Layout (and 404). Verify after deploy whether Cloudflare prepends its managed block to ours.
3. **Sitemap contents**: includes `https://juaniw.com/` (a 307 redirect) and `/es/styleguide/`, `/en/styleguide/` (internal, thin, currently indexable). Add `filter()` (https://docs.astro.build/en/guides/integrations-guide/sitemap/#configuration) and `noindex` the styleguide pages. Ideally derive the exclusion from the same source as noindex so they can't drift.
4. **No JSON-LD**. Add:
   - Home: `ProfilePage` + `Person` (`name`, `jobTitle`, `url`, `address` Rosario AR, `sameAs`: GitHub + LinkedIn URLs already linked in the site footer/home — get them from the components, don't hardcode new ones).
   - Detail pages: `BreadcrumbList`; `Article`/`CreativeWork` for case studies.
   - Likely as a `jsonLd` prop/slot on Layout, rendered with `set:html={JSON.stringify(...)}`.

### Medium
5. **Detail page titles/descriptions are weak**: e.g. "Harness · Juan Ignacio Werkalec"; clinical platform descriptions are 56/60 chars; Projects page description is generic. Target ~120–155 chars and add context to titles. This is **copy** — propose text, let the user approve (they own the voice; ES copy in voseo-free neutral/Rioplatense as existing).
6. **EN URL uses Spanish slug**: `/en/projects/plataforma-clinica/`. Consider per-locale slugs (e.g. `clinical-platform`) before Google indexes it. Needs a change in how `getWorkDetails` / `detailPaths` pair locales — check `src/lib/work-details.ts` and ADR `docs/adr/0001-content-format-for-work-collections.md`.
7. **`og:type`** always `website`: use `profile` on home, `article` on case studies. Per-page OG images optional.
8. **Sitemap hreflang (optional)**: the sitemap `i18n` option pairs by identical path and won't work with translated slugs (https://docs.astro.build/en/guides/integrations-guide/sitemap/#i18n). If wanted, build `links` in `serialize()` reusing `routes.ts` helpers. HTML hreflang already covers it.

### Low
9. `/es` → `/es/` is a 307 (Cloudflare html_handling). Internal links are all trailing-slash, low impact.
10. `/` sends Googlebot (no Accept-Language) to `/en/` — acceptable `x-default` pattern; leave as is.

### Off-code (tell the user, don't implement)
- Verify domain in Google Search Console + Bing Webmaster (DNS via Cloudflare), submit `sitemap-index.xml`.
- Link juaniw.com from GitHub profile, LinkedIn, the CV PDF, article/talk bios.
- More case studies = more indexable content.

## Next step

The user was offered a plan covering items 2, 3, 4, 5, 7 (code) and told item 1 is a Cloudflare toggle. Confirm scope with the user (especially 6 and the copy in 5), then write the plan in `docs/superpowers/plans/2026-11-26-seo.md`, implement on a feature branch, and verify with `npx astro build` + inspecting `dist/` (titles, JSON-LD validity, sitemap URLs, robots.txt). Use `astro dev --background` if running the dev server.

## Suggested skills

- `superpowers:brainstorming` — confirm scope/approach (which items, copy changes, slug change) before planning.
- `superpowers:writing-plans` — write the implementation plan (with Astro docs citations).
- `superpowers:using-git-worktrees` — isolate the work on a branch.
- `superpowers:executing-plans` or `superpowers:subagent-driven-development` — implement.
- `superpowers:verification-before-completion` — check `dist/` output and live headers before claiming done.
- `mattpocock-skills:pr` — PR body when shipping.
