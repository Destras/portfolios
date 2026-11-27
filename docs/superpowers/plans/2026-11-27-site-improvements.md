# Site Improvements (audit 2026-11-27) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the code-solvable items of the 2026-11-27 audit and of the 2026-11-26 SEO handoff: SEO (robots, sitemap, JSON-LD, meta, EN slug), positioning copy, CV rename, security headers + CSP, and the Colophon hosting fix.

**Architecture:** Static Astro 7 site on Cloudflare Workers static assets. SEO data is derived from the existing route map and collections (no new sources of truth). Pure logic (route exclusions, JSON-LD builders, page titles) lives in dependency-free `.ts` modules unit-tested with `node --test`; everything else is verified by a post-build test over `dist/`. Headers go in `public/_headers`, redirects in `public/_redirects`, the CSP is Astro's native `security.csp` `<meta>`.

**Tech Stack:** Astro 7.4, `@astrojs/sitemap` 3.7, TypeScript, Node 22 `node:test` (type stripping), Wrangler 4.

**Spec:** `docs/handoffs/improvements.md` (audit) + `docs/handoffs/2026-11-26-seo-improvements.md` (SEO). Decisions taken with the owner on 2026-11-27 are listed below and override the spec where they differ. What stays out of code is in `docs/handoffs/2026-11-27-owner-input-and-ops.md`.

**Astro docs relied on:**
- https://docs.astro.build/en/reference/configuration-reference/#securitycsp (and `#securitycspdirectives`, `#securitycspscriptdirectiveresources`, `#securitycspstyledirectiveresources`)
- https://docs.astro.build/en/guides/integrations-guide/sitemap/#configuration (`filter()`)
- https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage (`<link rel="sitemap">`, `src/pages/robots.txt.ts`)
- https://docs.astro.build/en/guides/endpoints/#static-file-endpoints (endpoint with a file extension has no trailing slash)
- https://docs.astro.build/en/guides/client-side-scripts/#script-processing (`is:inline` / `type=` scripts are unprocessed)

## Decisions (owner, 2026-11-27)

- Both handoffs ship in **one plan**, branch `feat/site-improvements` from `main`, one commit per task, one PR against `main`.
- `TBD`s and the JPMorgan claim **stay published** until the owner answers handoff §A. No TBD build guard yet (it would fail today's build).
- Fonts (audit 12) and contrast (audit 13): **out of scope**.
- CV stays English only. Rename `public/cv-en.pdf` → `public/juan-ignacio-werkalec-fullstack-engineer-en.pdf`, 301 from the old URL. Button labels unchanged ("Ver CV" / "View CV", footer "CV" / "Résumé").
- EN slug of the clinical platform becomes `clinical-platform` (ES keeps `plataforma-clinica`); 301 from the old EN URL.
- CSP via Astro `security.csp` (`<meta>`); the other headers via `public/_headers`. `frame-ancestors` can't go in a `<meta>`, so `X-Frame-Options: DENY` covers framing.
- Approved copy is fixed in the tasks below (exact strings). Detail-page meta descriptions are drafts the owner approves when reviewing this plan.

## Global Constraints

- Every content change lands in **both** `src/i18n/es.ts` and `src/i18n/en.ts` (or both locales of a `localized` JSON field). `astro check` must stay at 0 errors.
- No client-side JS frameworks; no new runtime JS. JSON-LD is a non-executed `<script type="application/ld+json">`.
- Keep CLS 0 and the a11y features: skip link, appearance menu aria, visually-hidden "(opens in a new tab)".
- Never invent facts. Only copy listed in this plan, or the owner's later answers, goes on the site.
- All docs, comments and commits in English.
- `src/layouts/Layout.astro` and `src/pages/404.astro` keep their `<head>`s in sync (404 omits canonical/hreflang/JSON-LD).
- Verification for every task: `npx astro check` (0 errors), `npx astro build`, `npm test`, `npm run test:dist`.

## Review Focus

1. **CSP blocks the pre-paint theme script or Astro's inlined styles/scripts** → theme flashes or the appearance menu dies. Expect: every inline `<script>` (not `ld+json`) and `<style>` in `dist/` has its hash in that page's CSP. Pinned by `inline scripts and styles are allowed by the page CSP` (Task 6).
2. **Old URLs break** (`/cv-en.pdf` in LinkedIn, `/en/projects/plataforma-clinica/` already crawled). Expect a 301 to the new URL. Pinned by `_redirects` assertions (Tasks 4, 5) + a `wrangler dev` curl check (Task 6).
3. **Language switch / hreflang on the clinical page after the slug split** → ES page must link `/en/projects/clinical-platform/` and vice versa. Pinned by `clinical detail pages cross-link the translated slugs` (Task 4).
4. **JSON-LD with a `<` in some string** breaking out of the script tag. Expect `<` escaped as `<`. Pinned by `serializeJsonLd escapes <` (Task 2).
5. **Sitemap still lists a non-200 or noindex URL** (`/`, `/styleguide/`, 404, the old slug). Pinned by `sitemap lists only canonical indexable URLs` (Tasks 1, 4).

---

## File Structure

- Create `src/i18n/routeMap.ts`: the `routes`/`detailBases` constants and `unindexedPaths()`. No `astro:*` imports, so `astro.config.mjs` and Node tests can import it.
- Modify `src/i18n/routes.ts`: re-export from `routeMap.ts`; `detailPaths` takes per-locale slugs.
- Create `src/i18n/routeMap.test.mjs`.
- Create `src/pages/robots.txt.ts`.
- Create `src/lib/structured-data.ts` + `src/lib/structured-data.test.mjs`: pure JSON-LD builders.
- Create `src/lib/page-meta.ts` + `src/lib/page-meta.test.mjs`: the detail page title.
- Create `tests/dist.test.mjs`: post-build assertions over `dist/`.
- Create `public/_redirects`.
- Modify `public/_headers`, `astro.config.mjs`, `package.json`, `src/layouts/Layout.astro`, `src/pages/404.astro`, `src/pages/[locale]/index.astro`, `src/pages/[locale]/[section].astro`, `src/pages/[locale]/[section]/[slug].astro`, `src/components/WorkList.astro`, `src/components/SiteFooter.astro`, `src/content.config.ts`, `src/data/contact.ts`, `src/data/projects.json`, `src/data/experiences.json`, `src/i18n/{es,en,types}.ts`.
- Rename `public/cv-en.pdf`.
- Docs: `TODO.md`, `design/pages/home.md` (D-PR6), `design/pages/work-detail.md` (routes line), `design/pages/projects.md` (h2 copy).

---

### Task 1: Indexing: route map, robots.txt, sitemap filter, styleguide noindex

**Files:**
- Create: `src/i18n/routeMap.ts`, `src/i18n/routeMap.test.mjs`, `src/pages/robots.txt.ts`, `tests/dist.test.mjs`
- Modify: `src/i18n/routes.ts:1-28`, `astro.config.mjs`, `src/pages/[locale]/[section].astro:39`, `src/layouts/Layout.astro` (head), `src/pages/404.astro` (head), `package.json`

**Interfaces:**
- Produces: `routes`, `detailBases`, `unindexedSections: readonly SectionKey[]` (= `['styleguide']`), `unindexedPaths(): string[]` from `src/i18n/routeMap.ts`. `routes.ts` keeps exporting `routes`, `detailBases` and its types unchanged.
- Produces: `tests/dist.test.mjs` helpers `readDist(path: string): string` and `distHtmlFiles(): string[]`, both relative to `dist/`, reused by later tasks.

- [ ] **Step 1: Create the branch and test scripts**

```bash
git switch -c feat/site-improvements main
```
Add to `package.json` scripts: `"test": "node --test \"src/**/*.test.mjs\""` and `"test:dist": "node --test tests/dist.test.mjs"`.

- [ ] **Step 2: Write the failing unit test** `src/i18n/routeMap.test.mjs`

```js
test('unindexedPaths lists the styleguide in every locale', () => {
	assert.deepEqual(unindexedPaths().sort(), ['/en/styleguide/', '/es/styleguide/']);
});
```

- [ ] **Step 3: Write the failing dist tests** in `tests/dist.test.mjs`

```js
test('robots.txt allows everything and points to the sitemap', () => {
	const robots = readDist('robots.txt');
	assert.match(robots, /^User-agent: \*$/m);
	assert.match(robots, /^Allow: \/$/m);
	assert.match(robots, /^Sitemap: https:\/\/juaniw\.com\/sitemap-index\.xml$/m);
});
test('sitemap lists only canonical indexable URLs', () => {
	const urls = [...readDist('sitemap-0.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
	assert.ok(!urls.includes('https://juaniw.com/'));
	assert.ok(!urls.some((u) => u.includes('/styleguide/') || u.includes('404')));
	assert.ok(urls.includes('https://juaniw.com/en/') && urls.includes('https://juaniw.com/es/'));
});
test('styleguide pages are noindex', () => {
	for (const p of ['es/styleguide/index.html', 'en/styleguide/index.html'])
		assert.match(readDist(p), /<meta name="robots" content="noindex"/);
});
test('every page links the sitemap', () => {
	for (const f of distHtmlFiles()) assert.match(readDist(f), /<link rel="sitemap" href="\/sitemap-index\.xml"/, f);
});
```

- [ ] **Step 4: Run both and confirm they fail**

Run: `npm test` → FAIL (`routeMap.ts` missing). Run: `npx astro build && npm run test:dist` → FAIL on robots (file missing), sitemap (`/` and styleguide present), noindex, sitemap link.

- [ ] **Step 5: Implement**
- `routeMap.ts`: move the `routes` and `detailBases` literals here unchanged (it imports only `type Locale` and `locales` from `./locales`). Add `unindexedSections` and `unindexedPaths()`, which returns `` `/${locale}/${routes[key][locale]}/` `` for every unindexed key × locale. `routes.ts` re-exports them.
- `[section].astro`: `noindex={!Page || unindexedSections.includes(key)}`.
- `astro.config.mjs`: `import { unindexedPaths } from './src/i18n/routeMap.ts'`; `sitemap({ filter: (page) => { const path = new URL(page).pathname; return path !== '/' && !unindexedPaths().includes(path); } })`.
- `robots.txt.ts`: the endpoint from the sitemap docs (body `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`), with `Content-Type: text/plain; charset=utf-8`.
- `Layout.astro` and `404.astro` `<head>`: `<link rel="sitemap" href="/sitemap-index.xml" />`.

- [ ] **Step 6: Run and confirm they pass**

Run: `npx astro check && npm test && npx astro build && npm run test:dist` → all PASS.

- [ ] **Step 7: Commit**: `feat(seo): robots.txt, sitemap filter and noindex styleguide from one route map`

---

### Task 2: Structured data (JSON-LD) and `og:type`

**Files:**
- Create: `src/lib/structured-data.ts`, `src/lib/structured-data.test.mjs`
- Modify: `src/data/contact.ts`, `src/components/SiteFooter.astro:15-19`, `src/layouts/Layout.astro`, `src/pages/[locale]/index.astro`, `src/pages/[locale]/[section]/[slug].astro`, `tests/dist.test.mjs`

**Interfaces:**
- Produces in `src/data/contact.ts`: `socialProfiles: readonly { label: 'LinkedIn' | 'GitHub'; href: string }[]` (the two URLs currently in `SiteFooter.astro`), which the footer now maps over.
- Produces in `src/lib/structured-data.ts` (types only from `../i18n/locales`):
  - `profilePageJsonLd(input: { url: string; name: string; jobTitle: string; image: string; sameAs: string[]; knowsAbout: string[]; locale: Locale }): object`. Returns `{ '@context': 'https://schema.org', '@type': 'ProfilePage', url, inLanguage: locale, mainEntity: { '@type': 'Person', name, jobTitle, url, image, sameAs, knowsAbout, address: { '@type': 'PostalAddress', addressLocality: 'Rosario', addressCountry: 'AR' } } }`.
  - `breadcrumbJsonLd(items: { name: string; url: string }[]): object`. Returns a `BreadcrumbList` whose `itemListElement` entries are `{ '@type': 'ListItem', position: i + 1, name, item: url }`.
  - `serializeJsonLd(data: object): string`. `JSON.stringify` with every `<` replaced by `<`.
- Produces in `Layout.astro`: props `ogType?: 'website' | 'profile' | 'article'` (default `'website'`) and `jsonLd?: object`. When `jsonLd` is set, it renders `<script type="application/ld+json" set:html={serializeJsonLd(jsonLd)} />` in `<head>`.

- [ ] **Step 1: Write the failing unit tests** `src/lib/structured-data.test.mjs`

```js
test('profilePageJsonLd wraps a Person in Rosario, AR', () => {
	const d = profilePageJsonLd({ url: 'https://juaniw.com/en/', name: 'Juan Ignacio Werkalec', jobTitle: 'Senior Full-Stack Engineer', image: 'https://juaniw.com/og.png', sameAs: ['https://github.com/Destras'], knowsAbout: ['React'], locale: 'en' });
	assert.equal(d['@type'], 'ProfilePage');
	assert.equal(d.mainEntity['@type'], 'Person');
	assert.deepEqual(d.mainEntity.address, { '@type': 'PostalAddress', addressLocality: 'Rosario', addressCountry: 'AR' });
});
test('breadcrumbJsonLd numbers items from 1', () => {
	const d = breadcrumbJsonLd([{ name: 'Home', url: 'a' }, { name: 'Projects', url: 'b' }]);
	assert.deepEqual(d.itemListElement.map((i) => i.position), [1, 2]);
	assert.equal(d.itemListElement[1].item, 'b');
});
test('serializeJsonLd escapes <', () => {
	assert.ok(!serializeJsonLd({ x: '</script>' }).includes('<'));
});
```

- [ ] **Step 2: Write the failing dist tests**

```js
test('home has a ProfilePage JSON-LD and og:type profile', () => {
	for (const l of ['es', 'en']) {
		const html = readDist(`${l}/index.html`);
		const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.+?)<\/script>/s)[1]);
		assert.equal(ld.mainEntity.jobTitle, 'Senior Full-Stack Engineer');
		assert.deepEqual(ld.mainEntity.sameAs, ['https://www.linkedin.com/in/juan-ignacio-werkalec/', 'https://github.com/Destras']);
		assert.match(html, /<meta property="og:type" content="profile"/);
	}
});
test('detail pages have a 3-level BreadcrumbList and og:type article', () => {
	const html = readDist('en/experience/harness/index.html');
	const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.+?)<\/script>/s)[1]);
	assert.equal(ld['@type'], 'BreadcrumbList');
	assert.equal(ld.itemListElement.length, 3);
	assert.match(html, /<meta property="og:type" content="article"/);
});
```

- [ ] **Step 3: Run and confirm they fail**: `npm test` (module missing); `npx astro build && npm run test:dist` (no ld+json).

- [ ] **Step 4: Implement**
- Home: `jsonLd={profilePageJsonLd({ url: canonical home URL, name: 'Juan Ignacio Werkalec', jobTitle: 'Senior Full-Stack Engineer', image: new URL('/og.png', Astro.site).href, sameAs: socialProfiles.map(p => p.href), knowsAbout: ['TypeScript','React','Next.js','Node.js','GraphQL','Supabase'], locale })}` and `ogType="profile"`. `knowsAbout` matches the home "Tools" fact. Keep it as a constant in `src/data/contact.ts` (`knowsAbout`) so it isn't duplicated in two places.
- Detail page: `ogType="article"`. Breadcrumbs: home (`t.notFound.home`, i.e. "Inicio"/"Home"), Projects (`t.projects.title`), and the page's own `name`/`org`, with absolute URLs from `localizedPath` / `paths[locale]`.
- Footer maps `socialProfiles` and keeps `newTab: true`.

- [ ] **Step 5: Run and confirm they pass** (full verification set). Also paste one home JSON-LD into validator.schema.org and confirm 0 errors (or list it for the owner in handoff §E.5 if offline).

- [ ] **Step 6: Commit**: `feat(seo): ProfilePage and BreadcrumbList JSON-LD, og:type per page`

---

### Task 3: Detail page meta, Projects copy

**Files:**
- Create: `src/lib/page-meta.ts`, `src/lib/page-meta.test.mjs`
- Modify: `src/content.config.ts:17-27`, `src/data/projects.json`, `src/data/experiences.json`, `src/pages/[locale]/[section]/[slug].astro`, `src/i18n/{es,en}.ts` (`projects.meta.description`, `projects.projectsHeading`), `design/pages/projects.md:86`, `tests/dist.test.mjs`

**Interfaces:**
- Produces: the `workRow` schema gains `metaDescription: localized.optional()` (falls back to `summary`).
- Produces in `src/lib/page-meta.ts`: `detailTitle(input: { name: string; role?: string }): string`. Returns `` `${name} — ${role} · Juan Ignacio Werkalec` `` when `role` is given, else `` `${name} · Juan Ignacio Werkalec` ``. Experiences pass `role[locale]`. Projects pass none, because their name is already descriptive and adding the role would push the title past ~85 characters.

- [ ] **Step 1: Failing unit test**

```js
test('detailTitle adds the role', () => {
	assert.equal(detailTitle({ name: 'Harness', role: 'Senior Frontend Engineer' }), 'Harness — Senior Frontend Engineer · Juan Ignacio Werkalec');
	assert.equal(detailTitle({ name: 'Clinical follow-up platform' }), 'Clinical follow-up platform · Juan Ignacio Werkalec');
});
```

- [ ] **Step 2: Failing dist tests**

```js
test('detail titles carry the role and descriptions are 120–160 chars', () => {
	assert.match(readDist('en/experience/harness/index.html'), /<title>Harness — Senior Frontend Engineer · Juan Ignacio Werkalec<\/title>/);
	for (const f of distHtmlFiles().filter((f) => /\/(experiencia|experience|proyectos|projects)\/.+\//.test(f))) {
		const d = readDist(f).match(/<meta name="description" content="([^"]+)"/)[1];
		assert.ok(d.length >= 120 && d.length <= 160, `${f}: ${d.length}`);
	}
});
test('projects page h2 is not a copy of the h1', () => {
	assert.match(readDist('en/projects/index.html'), />Freelance projects</);
	assert.match(readDist('es/proyectos/index.html'), />Proyectos freelance</);
});
```
(`&amp;`/entities: decode `&quot;`, `&#39;` and `&amp;` before measuring.)

- [ ] **Step 3: Run and confirm they fail.**

- [ ] **Step 4: Implement with this exact copy** (draft: the owner approves it when reviewing the plan; no new facts, everything restates the detail pages)

| Row | `metaDescription.en` | `metaDescription.es` |
|---|---|---|
| `plataforma-clinica` | Freelance build of a clinical platform: Next.js web console for therapists and a React Native patient app, in production after ~6 months. | Plataforma clínica freelance: consola web en Next.js para terapeutas y app React Native para pacientes, en producción a los ~6 meses. |
| `harness` | Senior Frontend Engineer at Harness: sole UI and BFF engineer on Configs and AI Configs, real-time configuration for AI agents and LLMs. | Senior Frontend Engineer en Harness: único ingeniero de UI y BFF en Configs y AI Configs, configuración en tiempo real para agentes de IA y LLMs. |
| `split-io` | Frontend Engineer at Split.io: cut the feature flag landing screen from 3–6 s to ~1 s and built ~20 shared components adopted by 3 teams. | Frontend Engineer en Split.io: bajé la carga de la pantalla de feature flags de 3–6 s a ~1 s y armé ~20 componentes compartidos usados por 3 equipos. |
| `mangoodev` | Full-Stack Developer at MangooDev: a supplier compliance system for a multinational pharma company, plus the design system for a team of 6. | Full-Stack Developer en MangooDev: sistema de compliance de proveedores para una farmacéutica multinacional y el design system de un equipo de 6. |

- `projects.meta.description`: EN `Projects and experience of Juan Ignacio Werkalec, senior full-stack engineer: a freelance clinical platform and roles at Harness, Split.io and MangooDev.` / ES `Proyectos y experiencia de Juan Ignacio Werkalec, ingeniero full-stack senior: una plataforma clínica freelance y roles en Harness, Split.io y MangooDev.`
- `projects.projectsHeading`: EN `Freelance projects` / ES `Proyectos freelance`. Update `design/pages/projects.md:86` to match.
- `[slug].astro`: `title={detailTitle(...)}`, `description={data.metaDescription?.[locale] ?? data.summary[locale]}`.
- If a string lands outside 120–160 once rendered, trim the wording without adding facts, and flag it in the PR.

- [ ] **Step 5: Run and confirm they pass** (full set).

- [ ] **Step 6: Commit**: `feat(seo): role in experience titles, longer detail descriptions, distinct projects h2`

---

### Task 4: Per-locale detail slugs (`clinical-platform`)

**Files:**
- Modify: `src/content.config.ts`, `src/data/projects.json`, `src/i18n/routes.ts` (`detailPaths`), `src/components/WorkList.astro:52`, `src/pages/[locale]/[section]/[slug].astro:16,31`, `docs/adr/0001-content-format-for-work-collections.md` (append a short "Update 2026-11-27" note), `design/pages/work-detail.md:31`
- Create: `public/_redirects`
- Test: `tests/dist.test.mjs`

**Interfaces:**
- Produces: the `workRow` schema gains `slug: localized.optional()`, a URL slug per locale. The row `id` stays the internal key and the Markdown file name (`src/content/projects/en/plataforma-clinica.md` is **not** renamed).
- Produces in `routes.ts`: `detailSlugs(id: string, slug?: Record<Locale, string>): Record<Locale, string>`, which returns `slug ?? { es: id, en: id }`, and `detailPaths(kind: WorkKind, slugs: Record<Locale, string>): LocalePaths`. This replaces the `slug: string` parameter. Both callers pass `detailSlugs(row.id, row.data.slug)`.
- `[slug].astro` `params.slug` becomes `detailSlugs(...)[locale]`.

- [ ] **Step 1: Failing dist tests**

```js
test('clinical detail pages cross-link the translated slugs', () => {
	const en = readDist('en/projects/clinical-platform/index.html');
	assert.match(en, /<link rel="canonical" href="https:\/\/juaniw\.com\/en\/projects\/clinical-platform\/"/);
	assert.match(en, /hreflang="es" href="https:\/\/juaniw\.com\/es\/proyectos\/plataforma-clinica\/"/);
	assert.match(readDist('es/proyectos/plataforma-clinica/index.html'), /hreflang="en" href="https:\/\/juaniw\.com\/en\/projects\/clinical-platform\/"/);
	assert.throws(() => readDist('en/projects/plataforma-clinica/index.html'));
	assert.match(readDist('en/index.html'), /href="\/en\/projects\/clinical-platform\/"/);
});
test('old EN clinical URL redirects permanently', () => {
	assert.match(readDist('_redirects'), /^\/en\/projects\/plataforma-clinica\/ \/en\/projects\/clinical-platform\/ 301$/m);
});
```
Extend `sitemap lists only canonical indexable URLs` with `assert.ok(!urls.includes('https://juaniw.com/en/projects/plataforma-clinica/'))`.

- [ ] **Step 2: Run and confirm they fail.**

- [ ] **Step 3: Implement.** In `projects.json`, set `"slug": { "es": "plataforma-clinica", "en": "clinical-platform" }`. Create `public/_redirects` with a header comment and the line from the test. The LangSwitch already reads `paths`, so it needs no change; confirm it on the built pages.

- [ ] **Step 4: Run and confirm they pass** (full set).

- [ ] **Step 5: Commit**: `feat(i18n): translated EN slug for the clinical platform, 301 from the old URL`

---

### Task 5: Positioning copy, availability line, CV rename

**Files:**
- Modify: `src/i18n/types.ts` (`home.availability: string`), `src/i18n/{es,en}.ts` (`home.meta`, `home.title`, `home.availability`), `src/pages/[locale]/index.astro`, `src/data/contact.ts:4-5`, `public/_redirects`, `design/pages/home.md:36`, `tests/dist.test.mjs`
- Rename: `public/cv-en.pdf` → `public/juan-ignacio-werkalec-fullstack-engineer-en.pdf` (`git mv`)

**Interfaces:**
- Produces: `cvHref = '/juan-ignacio-werkalec-fullstack-engineer-en.pdf'` (update the doc comment: "Both locales link the EN CV (owner decision 2026-11-27)").

- [ ] **Step 1: Failing dist tests**

```js
test('home uses one positioning label and shows availability', () => {
	const en = readDist('en/index.html');
	assert.match(en, /<title>Juan Ignacio Werkalec · Senior Full-Stack Engineer, UI-first<\/title>/);
	assert.match(en, /<h1[^>]*>Senior full-stack engineer, UI-first\. I take ambiguous features from idea to production\.<\/h1>/);
	assert.match(en, /Open to senior frontend \/ full-stack roles — remote\./);
	const es = readDist('es/index.html');
	assert.match(es, /<h1[^>]*>Ingeniero full-stack senior, foco en UI\. Llevo features ambiguas de la idea a producción\.<\/h1>/);
	assert.match(es, /Abierto a roles senior frontend \/ full-stack — remoto\./);
});
test('CV is served under its new name, old URL redirects', () => {
	readDist('juan-ignacio-werkalec-fullstack-engineer-en.pdf');
	assert.throws(() => readDist('cv-en.pdf'));
	assert.match(readDist('_redirects'), /^\/cv-en\.pdf \/juan-ignacio-werkalec-fullstack-engineer-en\.pdf 301$/m);
	for (const f of distHtmlFiles()) assert.ok(!readDist(f).includes('/cv-en.pdf'), f);
});
```

- [ ] **Step 2: Run and confirm they fail.**

- [ ] **Step 3: Implement with this exact copy**

| Key | EN | ES |
|---|---|---|
| `home.meta.title` | Juan Ignacio Werkalec · Senior Full-Stack Engineer, UI-first | Juan Ignacio Werkalec · Senior Full-Stack Engineer, UI-first |
| `home.meta.description` | Senior full-stack engineer, UI-first, in Rosario and remote. I take ambiguous features from idea to production with TypeScript, React and Next.js. | Ingeniero full-stack senior, foco en UI, en Rosario y remoto. Llevo features ambiguas de la idea a producción con TypeScript, React y Next.js. |
| `home.title` (H1) | Senior full-stack engineer, UI-first. I take ambiguous features from idea to production. | Ingeniero full-stack senior, foco en UI. Llevo features ambiguas de la idea a producción. |
| `home.availability` | Open to senior frontend / full-stack roles — remote. | Abierto a roles senior frontend / full-stack — remoto. |

- `home.lead` doesn't change. "6 años" leaves the H1 by owner decision.
- Render `<p class="about-availability">{t.home.availability}</p>` right after `.about-actions`, styled with existing tokens only: `margin-top: var(--space-4)`, `font-family: var(--font-accent)`, `font-size: var(--text-sm)`, `color: var(--color-text-muted)`. It is static text, so CLS is unaffected.
- `og:title` follows `title` automatically, and the CV PDF headline is handled in handoff §D.

- [ ] **Step 4: Run and confirm they pass** (full set). Check `/es/` and `/en/` at 375 px in `astro dev --background`: no wrap overlap and no horizontal scroll.

- [ ] **Step 5: Commit**: `feat(home): single positioning label, availability line, renamed CV with 301`

---

### Task 6: Security headers and CSP

**Files:**
- Modify: `astro.config.mjs` (`security.csp`), `public/_headers`, `tests/dist.test.mjs`

**Interfaces:** none consumed by other tasks.

- [ ] **Step 1: Failing dist tests**

```js
import { createHash } from 'node:crypto';
const sha256 = (s) => `'sha256-${createHash('sha256').update(s).digest('base64')}'`;
test('inline scripts and styles are allowed by the page CSP', () => {
	for (const f of distHtmlFiles()) {
		const html = readDist(f);
		const csp = html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/)?.[1];
		assert.ok(csp, `${f}: no CSP meta`);
		for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))
			if (!/\bsrc=/.test(attrs) && !/application\/ld\+json/.test(attrs)) assert.ok(csp.includes(sha256(body)), `${f}: script not hashed`);
		for (const [, body] of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) assert.ok(csp.includes(sha256(body)), `${f}: style not hashed`);
		assert.match(csp, /https:\/\/static\.cloudflareinsights\.com/);
		assert.match(csp, /object-src 'none'/);
	}
});
test('_headers sets the security headers on every path', () => {
	const h = readDist('_headers');
	for (const line of ['Strict-Transport-Security: max-age=31536000', 'X-Content-Type-Options: nosniff', 'Referrer-Policy: strict-origin-when-cross-origin', 'X-Frame-Options: DENY', 'Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()'])
		assert.ok(h.includes(line), line);
	assert.match(h, /^\/\*$/m);
});
```

- [ ] **Step 2: Run and confirm they fail.**

- [ ] **Step 3: Implement** in `astro.config.mjs`:

```js
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
		scriptDirective: { resources: ["'self'", 'https://static.cloudflareinsights.com'] },
		// Element hashes go to style-src-elem; style="" attributes (appearance swatches, styleguide) need 'unsafe-inline' on style-src-attr only.
		styleDirective: { resources: [{ resource: "'self'", kind: 'element' }, { resource: "'unsafe-inline'", kind: 'attribute' }] },
	},
},
```
If the test shows the `is:inline` theme script isn't hashed by Astro, add its hash with `scriptDirective.hashes` and compute it in the config from the same string. To do that, move the script body into an exported constant in `src/scripts/themeBootstrap.ts`, then render it with `set:html` in both `Layout.astro` and `404.astro`. Don't hand-paste a hash. If Astro warns about mixing source kinds, the warning has to be resolved, not ignored.

In `public/_headers`, add a `/*` block with the five headers from the test. Keep the existing `/_astro/*` cache block. Note in a comment that `_headers` doesn't apply to the Worker's `/` redirect response.

- [ ] **Step 4: Run and confirm they pass** (full set).

- [ ] **Step 5: Manual check in the real runtime**: `npm run preview:cf`, then:
- `curl -sI http://localhost:8787/en/` shows all five headers;
- `curl -sI http://localhost:8787/cv-en.pdf` and `curl -sI http://localhost:8787/en/projects/plataforma-clinica/` return `301` with the right `location`;
- in a browser, the theme and mode switch, the fonts load and the console shows no CSP violations on `/en/`, `/en/styleguide/` and the 404.

- [ ] **Step 6: Commit**: `feat(security): CSP via astro security.csp and security headers in _headers`

---

### Task 7: Colophon hosting fix and docs

**Files:**
- Modify: `src/i18n/{es,en}.ts` (colophon Deploy row), `TODO.md`, `tests/dist.test.mjs`

- [ ] **Step 1: Failing dist test**

```js
test('colophon names the real host', () => {
	for (const p of ['en/colophon/index.html', 'es/colofon/index.html']) {
		const html = readDist(p);
		assert.ok(!html.includes('Netlify'), p);
		assert.ok(html.includes('Cloudflare Workers'), p);
	}
});
```

- [ ] **Step 2: Run and confirm it fails.**

- [ ] **Step 3: Implement**: Deploy row `tech: 'Cloudflare Workers'`. `why` EN: `Static files served from the edge; a tiny Worker only picks the language on /.` ES: `Archivos estáticos servidos desde el edge; un Worker mínimo solo elige el idioma en /.` The Framework row doesn't change (the beacon check is handoff §E.3). In `TODO.md`, tick "Sitemap and robots", add a line pointing to `docs/handoffs/2026-11-27-owner-input-and-ops.md` for the open TBDs, and add the TBD build guard as an open item.

- [ ] **Step 4: Run the full verification set and confirm it passes.**

- [ ] **Step 5: Commit**: `fix(colophon): deploy is Cloudflare Workers, not Netlify`

---

### Finish

- [ ] Use superpowers:verification-before-completion: full verification set, then `npm run preview:cf` spot-check.
- [ ] Use superpowers:finishing-a-development-branch. The PR (body via `mattpocock-skills:pr`) goes against `main`, links both handoffs and the new one, and lists the post-deploy checks of handoff §E.
