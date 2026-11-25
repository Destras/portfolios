# Work Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This plan runs inside the repo skill `.claude/skills/implement-page` (pages `project-detail` + `experience-detail`): its STOP 1 (spec review) and STOP 2 (after each section) are hard stops in the tasks below.

**Goal:** Implement the content-format handoff (hybrid JSON rows + Markdown bodies, with a build-time i18n pair check) and build the project detail (`/es/proyectos/{slug}/` · `/en/projects/{slug}/`) and experience detail (`/es/experiencia/{slug}/` · `/en/experience/{slug}/`) pages, with the `/proyectos` rows becoming links.

**Architecture:** List rows stay in the two `file()` JSON collections and gain optional fact-sheet fields. Long-form bodies live in two new `glob()` Markdown collections (`projectDetails`, `experienceDetails`), one file per locale at `src/content/{projects,experiences}/{es,en}/{slug}.md`, where `{slug}` is the JSON row `id`. A single helper (`getWorkDetails`) joins rows and bodies and **throws** on an incomplete pair, an orphan file or an unknown locale folder. Every consumer goes through it, so the build fails the same way the `localized` schema does. One dynamic route (`src/pages/[locale]/[section]/[slug].astro`) renders both kinds. The route map gains per-locale path objects, so canonical, hreflang and the language switch work for pages that are not top-level sections.

**Tech Stack:** Astro 7 (static), TypeScript, Zod via `astro/zod`, `glob()`/`file()` loaders, scoped `<style>` with design tokens. No test runner: "tests" are `npm run check`, `npm run build`, deliberate-failure builds, and greps on `dist/`.

**Spec:** `docs/handoffs/2026-11-24-content-format-decision.md` and the grilling decisions D-W1…D-W14 below. Task 1 writes them into `docs/adr/0001-content-format-for-work-collections.md` and `design/pages/work-detail.md`, which executors then read.

**Astro docs relied on:**
- https://docs.astro.build/en/guides/content-collections/#the-file-loader
- https://docs.astro.build/en/reference/content-loader-reference/#glob-loader
- https://docs.astro.build/en/guides/content-collections/#defining-collection-references
- https://docs.astro.build/en/reference/modules/astro-content/#reference
- https://docs.astro.build/en/reference/modules/astro-content/#render
- https://docs.astro.build/en/guides/content-collections/#generating-routes-from-content
- https://docs.astro.build/en/recipes/i18n/#use-collections-for-translated-content
- https://docs.astro.build/en/guides/content-collections/#querying-build-time-collections

## Global Constraints

- Branch first: `git checkout -b feat/work-detail-pages`. **No commits during tasks.** Task 7 proposes one commit, made only after the owner's OK.
- Before any change, snapshot the current build: `npm run build && rm -rf "$TMPDIR/juaniw-dist-baseline" && cp -r dist "$TMPDIR/juaniw-dist-baseline"`. Later tasks diff against it.
- All files, comments and commit messages in English. Spanish copy is quoted verbatim.
- Every CSS value is `var(--…)` (`.claude/rules/design-tokens.md`; the rule also covers `src/**/*.md`). Breakpoint: `48rem /* --bp-md */`. Use `calc(-1 * var(--space-3))` for a negative margin.
- No prose hard-coded in `.astro` files. Exceptions: the aria-hidden row arrow `→` (a glyph, not prose) and the brand suffix ` · Juan Ignacio Werkalec` in `<title>`, which `[section].astro` already builds the same way.
- Owner decisions (2026-11-25 grilling). They win over copy-mvp/diseno until Task 7 updates the docs:
  - D-W1: Hybrid by content shape. Rows (dates, role, summary, fact-sheet data) live in JSON `file()`. Bodies live in Markdown `glob()`.
  - D-W2: Missing translation = build failure. If a body exists in one locale, it must exist in the other. A body whose slug has no JSON row, or a folder that is not a locale, also fails the build.
  - D-W3: Experience detail route `/es/experiencia/{slug}/` · `/en/experience/{slug}/` (overrides copy-mvp §2, which puts experiences under `/proyectos/{slug}`). No `/es/experiencia/` index: that URL is a 404.
  - D-W4: The slug is the JSON row `id`, identical in both locales. Only the section segment is translated.
  - D-W5: Fact-sheet fields `stack` (`string[]`, not translated), `status` and `stakeholders` (`localized`) go in the JSON, all **optional**. Duration is derived from `start`/`end`.
  - D-W6: The body is free Markdown. Sections are `##` headings written in the file: projects `## Contexto` / `## Restricciones` / `## Valor` (EN `## Context` / `## Constraints` / `## Value`); experiences `## Contexto` / `## Context` only. The template validates no structure.
  - D-W7: No visual. No `visual` field, no `Media` component (diseno §8.14 phase 2).
  - D-W8: All four rows (`plataforma-clinica`, `harness`, `split-io`, `mangoodev`) get a draft ES/EN body written from `fase3/datos.md`. Any missing fact is the literal `TBD`.
  - D-W9: A row may have no body. It then stays static (no link, no arrow) and the build passes.
  - D-W10: A row with a body becomes a link: the whole row is an `<a>` with a `→` arrow, a reinforced hover and visible focus, plus the phase-2 radius and negative margin (lifts D-P6 of `design/pages/projects.md`).
  - D-W11: Home (`src/data/home.ts`, `home.work.items`) is untouched; its rows don't link.
  - D-W12: `TBD` renders literally. Every `TBD` is listed in `TODO.md`. No `noindex`, no draft flag.
  - D-W13: Fact sheet: project = Rol · Duración · Stack · Estado · Stakeholders; experience = Rol · Duración · Stack. Absent fields are skipped, with no gap. New `FactSheet` component per diseno §8.11, 3 columns on desktop.
  - D-W14: Detail `<title>` = `{name or org} · Juan Ignacio Werkalec`; meta description = the row `summary`. A back link above the h1 ("← Proyectos" / "← Projects") goes to `/proyectos/` (project) or `/proyectos/#experience-title` (experience). The language switch goes to the same detail in the other locale. Canonical and hreflang point to the detail. The nav marks "Proyectos" with `aria-current="true"` (not `"page"`). No closing links to projects or case studies (copy-mvp §4.10 says otherwise; deferred until case studies exist).
- New dictionary copy (owner-approved in the grilling):

| Key | ES | EN |
|---|---|---|
| `workDetail.back` | ← Proyectos | ← Projects |
| `workDetail.facts.role` | Rol | Role |
| `workDetail.facts.duration` | Duración | Duration |
| `workDetail.facts.stack` | Stack | Stack |
| `workDetail.facts.status` | Estado | Status |
| `workDetail.facts.stakeholders` | Stakeholders | Stakeholders |

## Review Focus

1. **Broken pair:** deleting `src/content/experiences/en/harness.md`, adding `src/content/projects/es/nope.md` (no row), or adding `src/content/projects/fr/plataforma-clinica.md` each fails `npm run build` with a message naming the collection and the file. Covered in Task 2, step 4.
2. **Language switch and head on a detail page:** `/es/experiencia/harness/` switches to `/en/experience/harness/` (not `/en/experiencia/…`), and canonical + both hreflang + x-default are the detail URLs. Covered in Task 5, step 5.
3. **Index-less section:** `dist/es/experiencia/index.html` and `dist/en/experience/index.html` must not exist, and `[section].astro` must not generate a placeholder for them. Covered in Task 4, step 3.
4. **A row without a body stays static:** with both `mangoodev.md` files moved out, the build passes and the MangooDev row on `/proyectos` has no `<a>` and no arrow. Covered in Task 6, step 4.
5. **Narrow widths and sparse fact sheets:** at 320 px in EN, the longest title, the 7-item stack and the long rows don't scroll horizontally. An experience sheet (3 items) shows no empty cell or gap. Covered in Task 5, step 6.

---

### Task 1: ADR and spec (Phase A, STOP 1)

**Files:**
- Create: `docs/adr/0001-content-format-for-work-collections.md`
- Create: `design/pages/work-detail.md` (from `.claude/skills/implement-page/templates/page-spec.md`, one spec for both kinds)
- Modify: `.claude/skills/implement-page/reference/page-notes.md` (Page map: `project-detail` row → only `plataforma-clinica`, copy "src/content (draft)"; add an `experience-detail` row: `harness`, `split-io`, `mangoodev`, `/es/experiencia/{slug}/`, `/en/experience/{slug}/`. Add D-W1…D-W14 to "Shared decisions", dated 2026-11-25)

**Interfaces:**
- Produces: the approved ADR and spec that every later task cites.

- [ ] **Step 1: Write the ADR.** Sections: Status (Accepted, 2026-11-25), Context (the handoff's key fact: both JSONs are already `file()` collections with the `localized` guarantee), Options table (rows: `file()` + JSON only / `glob()` + Markdown only / hybrid; columns: i18n guarantee, long text, file count, routing, migration cost), Decision (D-W1, D-W2, D-W4, D-W9), Consequences (two formats per entry; the pair check lives in code, not in Zod; a body has no frontmatter). Add one paragraph on **why not `reference()`**: the filename already is the join key, and `reference()` would duplicate it while only validating at `getEntry()` time (docs: `#reference`). The pair check validates the same thing at build time. Cite the Astro docs list above.
- [ ] **Step 2: Run Step 0 of the skill** and record it in the spec (`npm run check` 0 errors, shared components, `[locale]` routing, wireframe: no detail view exists, write "no wireframe").
- [ ] **Step 3: Fill in the spec.** Decisions table D-W1…D-W14. Skeleton: SkipLink → SiteHeader (Proyectos `aria-current="true"`) → `main#contenido.page` → `p.work-detail__back > a` → `header.page-title > h1` → `dl.fact-sheet` → `div.work-detail__body` (`<Content />`: `h2`, `p`, `ul`) → SiteFooter. Content: the dictionary table from Global Constraints plus "bodies and fact values: Task 3 drafts, pending owner review". Components: FactSheet (§8.11, ☐ new), PageTitle ✅, ExperienceList (☐ link variant, §8.14). States: the Review Focus items. Metadata: D-W14. Open items: the copy-mvp §2 and §4.10 overrides (D-W3, D-W14 closing links), "lift D-P6" in `design/pages/projects.md`, diseno §8.8/§8.14/§9 additions, and the TBD list.
- [ ] **Step 4: STOP 1.** Show the owner the ADR path, the spec path and the Open items, and wait for approval. Then add `Project detail` and `Experience detail` rows to the `TODO.md` MVP table with "Spec" ticked.

---

### Task 2: Detail collections and the pair guarantee

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/i18n/routes.ts` (only the `detailBases` / `WorkKind` export below; the path helpers are Task 4)
- Create: `src/lib/work-details.ts`

**Interfaces:**
- Produces (`src/i18n/routes.ts`):
  - `export const detailBases = { projects: routes.projects, experiences: { es: 'experiencia', en: 'experience' } } as const satisfies Record<string, Record<Locale, string>>`
  - `export type WorkKind = keyof typeof detailBases` (`'projects' | 'experiences'`, the JSON collection names)
- Produces (`src/content.config.ts`): collections `projectDetails` (`glob({ base: './src/content/projects', pattern: '*/*.md' })`) and `experienceDetails` (same, `./src/content/experiences`). Schema: `z.object({}).strict()`, so a body with frontmatter fails. Entry ids look like `es/harness`. `workRow` gains `stack: z.array(z.string().min(1)).min(1).optional()`. `projects` gains `status: localized.optional()` and `stakeholders: localized.optional()`.
- Produces (`src/lib/work-details.ts`):
  - `export const detailCollections = { projects: 'projectDetails', experiences: 'experienceDetails' } as const satisfies Record<WorkKind, string>`
  - `export function pairDetails(kind: WorkKind, rowIds: readonly string[], detailIds: readonly string[]): Map<string, Record<Locale, string>>`: maps slug → entry id per locale. It collects **every** problem, then throws one `Error` that lists them all. Problem lines (exact format): `${kind}: "${slug}" has ${have} but is missing ${missing} (src/content/${kind}/${missing}/${slug}.md)`, `${kind}: "${id}" has no row in src/data/${kind}.json`, `${kind}: "${id}" is not under a locale folder (${locales.join(', ')})`. Message prefix: `Work detail check failed:\n`.
  - `export interface WorkDetail<K extends WorkKind> { kind: K; slug: string; row: CollectionEntry<K>; entries: Record<Locale, CollectionEntry<(typeof detailCollections)[K]>> }`
  - `export async function getWorkDetails<K extends WorkKind>(kind: K): Promise<WorkDetail<K>[]>`: loads both collections, calls `pairDetails`, returns one item per slug with a body, in no particular order.

- [ ] **Step 1: Implement** the three files per the Interfaces. Add a doc comment on `pairDetails` that ties it to D-W2 and says it is the Markdown equivalent of `localized`.
- [ ] **Step 2: Add temporary fixtures** so the check runs: `src/content/projects/es/plataforma-clinica.md` and `src/content/projects/en/plataforma-clinica.md`, each containing only `TBD`. Add a temporary `await getWorkDetails('projects'); await getWorkDetails('experiences');` at the top of `ProjectsPage.astro`'s frontmatter (Task 6 replaces it with real use).
- [ ] **Step 3: Verify it passes.** Run: `npm run check && npm run build`. Expected: 0 errors, and `diff -r "$TMPDIR/juaniw-dist-baseline" dist` prints nothing.
- [ ] **Step 4: Verify each failure mode** (Review Focus 1). For each case, make the change, run `npm run build`, confirm it exits non-zero with the quoted line, then undo it:
  - delete `en/plataforma-clinica.md` → `projects: "plataforma-clinica" has es but is missing en (src/content/projects/en/plataforma-clinica.md)`
  - add `src/content/projects/es/nope.md` → `projects: "es/nope" has no row in src/data/projects.json`
  - add `src/content/projects/fr/plataforma-clinica.md` → `projects: "fr/plataforma-clinica" is not under a locale folder (es, en)`
  - add `---\ntitle: x\n---` to `es/plataforma-clinica.md` → a Zod error for `projectDetails` (unrecognized key)
  - the first and third changes together → a single error listing **both** lines.

---

### Task 3: Draft content (fact values and bodies)

**Files:**
- Modify: `src/data/projects.json`, `src/data/experiences.json`
- Create (replacing the Task 2 fixtures): `src/content/projects/{es,en}/plataforma-clinica.md`, `src/content/experiences/{es,en}/{harness,split-io,mangoodev}.md`
- Modify: `TODO.md` (new "Detail copy TBDs" checklist)

**Interfaces:**
- Consumes: the schema fields from Task 2.

- [ ] **Step 1: Add the fact values** to the JSON:

| id | stack | status (es / en) | stakeholders |
|---|---|---|---|
| plataforma-clinica | `["Next.js", "React", "TypeScript", "Supabase", "Expo / React Native", "Jest", "Playwright"]` | En producción desde oct 2026 / In production since Oct 2026 | `TBD` / `TBD` |
| harness | `["React", "TypeScript", "GraphQL", "Node.js"]` | — | — |
| split-io | `["React", "React Query", "GraphQL"]` | — | — |
| mangoodev | `["TBD"]` | — | — |

Sources: `fase3/datos.md` (clinical platform), copy-mvp §4.3 mini-casos 1 and 3.

- [ ] **Step 2: Write the 8 bodies.** ES first, then EN with the same structure. Headings per D-W6, no frontmatter. Rules, all from copy-mvp §1:
  - Voice: first-person facts, no modesty or superlatives, short and technical; max 25 words per sentence.
  - Spell out acronyms the first time on each page: Backend for Frontend (BFF), Software Development Kit (SDK), Row Level Security (RLS), Large Language Models (LLMs). GraphQL and React Query are not expanded.
  - Use only facts `datos.md` marks as SÍ or that the CV backs. Anything marked `DUDA` or `FALTA` is left out, or becomes `TBD` when the section needs it.
  - Publication restrictions: no clinical client name ("un centro de terapias" / "a therapy center"), no patient data, no repo link; **no JPMorgan** in any body (it only appears in the Split.io row summary); no Harness screenshots; LaunchDarkly only as the competitor whose gap was closed.
  - Restricciones (project) means the project's constraints (team of two, a 3-month beta, store review), not the publication restrictions.
  - Sources: plataforma-clinica → `datos.md` "Plataforma de seguimiento clínico" + copy-mvp mini-caso 2. harness → `datos.md` Experiencia row + Configs, AI Configs and Change proposals sections + copy-mvp §4.3 "Línea de apertura". split-io → `datos.md` row + copy-mvp mini-caso 3. mangoodev → `datos.md` row only.
- [ ] **Step 3: Verify the copy.** Run:
  - `grep -rinE "psulato|psicobioenerg|jpmorgan|chase|FALTA|DUDA|0 bugs|apasionad|crack|ninja|rockstar|disruptiv|innovador|soluciones|pixel.perfect|artesanal|passionate|innovative|solutions|experto|expert|el mejor|the best" src/content src/data/projects.json src/data/experiences.json`. Expected: only the existing `JPMorgan` in the `split-io` `summary` of `experiences.json`.
  - `grep -rn "TBD" src/content src/data`. Copy every hit into the `TODO.md` checklist as `- [ ] <file>: <field or section>`.
  - `npm run check && npm run build`. Expected: 0 errors.
- [ ] **Step 4: STOP (copy).** Show the owner the 8 files and the TBD list. Apply their corrections before Task 5.

---

### Task 4: Per-locale paths for any page

**Files:**
- Modify: `src/i18n/routes.ts`, `src/layouts/Layout.astro`, `src/components/SiteHeader.astro`, `src/components/SiteNav.astro`, `src/components/LangSwitch.astro`, `docs/guides/i18nRoutes.md`

**Interfaces:**
- Consumes: `detailBases`, `WorkKind` (Task 2).
- Produces (`src/i18n/routes.ts`):
  - `export type LocalePaths = Record<Locale, string>`: relative paths with a trailing slash.
  - `export function sectionPaths(key: RouteKey): LocalePaths`, e.g. `sectionPaths('projects')` → `{ es: '/es/proyectos/', en: '/en/projects/' }`.
  - `export function detailPaths(kind: WorkKind, slug: string): LocalePaths`, e.g. `detailPaths('experiences', 'harness')` → `{ es: '/es/experiencia/harness/', en: '/en/experience/harness/' }`. Build it with `getRelativeLocaleUrl(locale, \`${detailBases[kind][locale]}/${slug}\`)`.
  - `alternates(paths: LocalePaths, site: URL)`: the signature changes from `RouteKey` to `LocalePaths`; the output shape and x-default are unchanged. Drop `localizedUrl` if nothing else uses it.
- Produces (`Layout.astro` props): `{ title; description; routeKey: RouteKey; paths?: LocalePaths; noindex? }`. `paths` defaults to `sectionPaths(routeKey)`. Canonical = `new URL(paths[lang], Astro.site)`. When `paths` is passed, the page is a subpage: SiteNav marks `routeKey` with `aria-current="true"` instead of `"page"`.
- Produces: `SiteHeader` props `{ locale; routeKey; paths: LocalePaths; navCurrent: 'page' | 'true' }`, `SiteNav` gains `navCurrent`, `LangSwitch` props `{ locale; paths: LocalePaths; class? }` with `href={paths[l]}`.

- [ ] **Step 1: Implement** the Interfaces. `detailBases` must not be added to `routes`/`sectionKeys`, so `[section].astro` never generates `/es/experiencia/`.
- [ ] **Step 2: Add a "Detail routes" section** to `docs/guides/i18nRoutes.md`: `detailBases`, `detailPaths`, why there is no index page (D-W3), and the `paths` prop of `Layout`.
- [ ] **Step 3: Verify that nothing changed.** Run: `npm run check && npm run build && diff -r "$TMPDIR/juaniw-dist-baseline" dist`. Expected: 0 errors and **no diff** (the refactor is invisible). Also run `ls dist/es/experiencia dist/en/experience`. Expected: "No such file or directory" for both (Review Focus 3).

---

### Task 5: FactSheet, detail page and route (Phase B, STOP 2)

**Files:**
- Create: `src/components/FactSheet.astro`, `src/components/pages/WorkDetailPage.astro`, `src/pages/[locale]/[section]/[slug].astro`
- Modify: `src/i18n/types.ts`, `src/i18n/es.ts`, `src/i18n/en.ts` (the `workDetail` keys from Global Constraints)

**Interfaces:**
- Consumes: `getWorkDetails`, `WorkDetail`, `detailCollections` (Task 2); `detailBases`, `detailPaths`, `localizedPath` (Task 4).
- Produces:
  - `FactSheet.astro`: `export interface FactItem { label: string; value: string }`; props `{ items: readonly FactItem[]; cols?: 2 | 3 }` (default 3; `2` adds `fact-sheet--cols-2`). HTML and CSS copied from diseno §8.11, as a scoped `<style>`. Each item is `<div class="fact-sheet__item"><dt/><dd/></div>`.
  - `WorkDetailPage.astro`: props `{ locale: Locale; detail: WorkDetail<WorkKind> }`. It builds the title (`row.data.name[locale]` for projects, `row.data.org` for experiences), the facts per D-W13 (stack joined with `", "`, duration `${start} – ${end}`, absent fields skipped), the back href per D-W14, and renders `render(detail.entries[locale])`'s `<Content />` inside `div.work-detail__body`.
  - `[slug].astro`: `getStaticPaths` yields, for each kind × detail × locale, `params: { locale, section: detailBases[kind][locale], slug }` and `props: { locale, detail }`. It renders `<Layout title={\`${title} · Juan Ignacio Werkalec\`} description={row summary} routeKey="projects" paths={detailPaths(kind, slug)}>`.

- [ ] **Step 1: Add the dictionary keys** (`Dictionary.workDetail` in `types.ts`, values in `es.ts`/`en.ts`). Run `npm run check` → 0 errors.
- [ ] **Step 2: Build the route and page with no styles yet.** Run `npm run build`. Expected: `dist/es/proyectos/plataforma-clinica/`, `dist/en/projects/plataforma-clinica/`, `dist/{es/experiencia,en/experience}/{harness,split-io,mangoodev}/`, each an `index.html` (8 pages). `node .claude/skills/implement-page/scripts/audit-wireframe.mjs --html dist/es/experiencia/harness/index.html` shows one h1 and h2s with no skipped levels.
- [ ] **Step 3: Add FactSheet and the page styles.** Back link: `--font-accent`, `--text-sm`, `margin-bottom: var(--space-4)`, color/underline from the global `a`. Body: `:global(h2)` uses the SectionTitle tokens (`--text-base`, `--weight-regular`, `--color-text-muted`), `margin-top: var(--space-10)`, `margin-bottom: var(--space-2)`. `:global(p + p)` and `:global(ul)` use `margin-top: var(--space-4)`. `:global(ul)` uses `padding-inline-start: var(--space-5)`, `list-style: disc` and a `--space-2` item gap. Fact sheet → body: `margin-top: var(--space-10)`.
- [ ] **Step 4: STOP 2.** Tell the owner the URLs to open (`astro dev --background`) and wait for an OK.
- [ ] **Step 5: Verify the head and the language switch** (Review Focus 2). `grep -oE '<link rel="(canonical|alternate)"[^>]*>|class="lang-switch__link" href="[^"]*"|aria-current="[^"]*"' dist/es/experiencia/harness/index.html`. Expected: canonical `https://juaniw.com/es/experiencia/harness/`; alternates es → `…/es/experiencia/harness/`, en → `…/en/experience/harness/`, x-default → `https://juaniw.com/`; the lang link `/en/experience/harness/`; `aria-current="true"` once. Repeat for `dist/en/projects/plataforma-clinica/index.html`.
- [ ] **Step 6: Narrow widths** (Review Focus 5). At 320 px and 200% zoom, check EN `plataforma-clinica` and EN `split-io`: no horizontal scroll. The experience sheet shows 3 items with no empty cell. `npm run check` → 0 errors.

---

### Task 6: Clickable rows on /proyectos (STOP 2)

**Files:**
- Modify: `src/components/ExperienceList.astro`, `src/components/pages/ProjectsPage.astro`

**Interfaces:**
- Consumes: `getWorkDetails` (Task 2), `detailPaths` (Task 4).
- Produces: `ExperienceItem.href?: string`. Without it, the row's markup and CSS output are exactly as today (home depends on that).

- [ ] **Step 1: Implement the linked row** (D-W10). With `href`, the `<li class="exp-row">` keeps its bottom border and contains `<a class="exp-row__link" href>` (date span + content div + `<span class="exp-row__arrow" aria-hidden="true">→</span>`). The link is a grid: mobile `minmax(0, 1fr) auto` (date on row 1, content on row 2, arrow in column 2 spanning both, aligned to the start); desktop `var(--row-date-col) minmax(0, 1fr) auto`. `color: inherit; text-decoration: none; border-radius: var(--radius-md); margin-inline: calc(-1 * var(--space-3)); padding-inline: var(--space-3)`. Arrow: `--font-accent`, `--color-text-muted`. Hover: `background: var(--color-surface)`, and `.exp-row__org` + arrow take `--color-accent-hover`, with the org underlined (this is the reinforcement §8.14 asks for, since surface/bg alone is 1.08:1). Focus: the global `:focus-visible` outline on the `<a>`; check it isn't clipped. No transition (there are no motion tokens yet).
- [ ] **Step 2: Wire `ProjectsPage`.** Replace the Task 2 temporary calls: build a `Set` of slugs from `getWorkDetails('projects')` / `('experiences')` and pass `href: detailPaths(kind, id)[locale]` only for rows in the set.
- [ ] **Step 3: Verify.** `npm run check && npm run build`. Then `diff "$TMPDIR/juaniw-dist-baseline/es/index.html" dist/es/index.html` and the same for `en`: no output (D-W11). `grep -c 'class="exp-row__link"' dist/es/proyectos/index.html` → `4`.
- [ ] **Step 4: Verify a row without a body** (Review Focus 4). Move both `mangoodev.md` files to `$TMPDIR`, run `npm run build` (it passes), then `grep -c 'exp-row__link' dist/es/proyectos/index.html` → `3`, and `dist/es/experiencia/mangoodev/` doesn't exist. Move the files back.
- [ ] **Step 5: STOP 2.** Owner checks hover, keyboard focus and mobile on `/es/proyectos/` and `/en/projects/`.

---

### Task 7: Verify and close

**Files:**
- Modify: `design/pages/work-detail.md` (Verification), `design/pages/projects.md` (D-P6 lifted, pointing to D-W10), `design/copy-mvp.md` (§2 sitemap: `/es/proyectos/{slug}` = plataforma-clinica; new `/es/experiencia/{slug}` = harness · split-io · mangoodev; §4.10 rows for both detail pages, marked "borrador 2026-11-25, pendiente de revisión del dueño", source `src/content/**`), `design/diseno-juaniw.md` (proposals only: §8.8 link variant, §8.11 used in details, §9 detail pages), `TODO.md`, `docs/handoffs/2026-11-24-content-format-decision.md` (Status → implemented, link to the ADR and this plan)

- [ ] **Step 1: Run skill Step 8** on every touched page and component file: check + build, the heading audit for one detail per kind and locale, the hardcoded-text grep (expected hits: the `→` arrow only), the raw-value searches from `.claude/rules/design-tokens.md`, and the forbidden-words grep. Paste the results into the spec.
- [ ] **Step 2: Propose the doc changes** listed under Files to the owner. Apply them after approval. The copy-mvp and diseno edits need an explicit OK.
- [ ] **Step 3: Update `TODO.md`:** the MVP table rows, the TBD checklist (Task 3), and a new item "Detail pages: closing links to case studies once `/casos` exists (copy-mvp §4.10)".
- [ ] **Step 4: Propose the commit** `feat(detail): project and experience detail pages in ES and EN` and wait for the owner's OK before running `git add` + `git commit`.
