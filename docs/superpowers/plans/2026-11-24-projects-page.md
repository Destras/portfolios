# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This plan runs inside the repo skill `.claude/skills/implement-page` (page `projects`): its STOP 1 (spec review) and STOP 2 (after each section) are hard stops in the tasks below.

**Goal:** Replace the `/es/proyectos/` and `/en/projects/` placeholder with the real Projects page: h1, a "Proyectos" section (the clinical platform) and an "Experiencia" section (Harness, Split.io, MangooDev), in ES and EN.

**Architecture:** Two build-time Astro content collections (`projects`, `experiences`), each loaded with the `file()` loader from one JSON file whose entries carry both languages. A `ProjectsPage` component reads them, localizes each entry into the existing `ExperienceList` row shape, and renders it under a new `PageTitle` (diseno §8.7). Headings and meta stay in the i18n dictionary. **Home is not touched**: it keeps `home.work.items` + `src/data/home.ts` (syncing home with the collections is a later TODO).

**Tech Stack:** Astro 7 (static), TypeScript, Zod via `astro/zod`, scoped `<style>` with design tokens. No test runner: "tests" are `npm run check`, `npm run build`, and greps/audits on `dist/`.

**Spec:** the decisions below come from the 2026-11-24 grilling session. Task 1 writes them into `design/pages/projects.md`, which then becomes the spec executors read.

**Astro docs relied on:**
- https://docs.astro.build/en/guides/content-collections/#the-file-loader
- https://docs.astro.build/en/guides/content-collections/#defining-the-collection-schema
- https://docs.astro.build/en/guides/content-collections/#defining-build-time-content-collections
- https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries

## Global Constraints

- Branch first: `git checkout -b feat/projects-page` (the repo is on `main`). **No commits during tasks.** One commit is proposed at the end (Task 6) and made only after the owner's OK.
- All files, comments and commit messages in English. Spanish copy is quoted verbatim.
- Every CSS value is `var(--…)` (`.claude/rules/design-tokens.md`). Breakpoints are `48rem /* --bp-md */`.
- No visible or hidden string is hard-coded in `.astro` files: prose comes from the dictionary or the collections.
- Owner decisions that override copy-mvp/diseno (they win until the docs are updated in Task 6):
  - D-P1: `/proyectos` joins the MVP (overrides diseno P2 and §2 "fase 2"). It loses its `noindex`.
  - D-P2: The Harness and Split.io rows use **the current home dictionary text verbatim**, including "JPMorgan" and the role "Frontend Engineer" for Split.io (overrides copy-mvp §1 and §4.4).
  - D-P3: Harness and Split.io are one job shown as two entries. **No note** under the list (overrides diseno §14.4 note).
  - D-P4: MangooDev appears only on this page, with the long copy-mvp §4.4 "Línea".
  - D-P5: Freelance is **not** in this page's Experiencia. Its work is the one row of the separate Proyectos section.
  - D-P6: Order: h1 → h2 Proyectos → h2 Experiencia (reverse of the wireframe). Both sections use the same static `ExperienceList` rows: no arrow, no link.
  - D-P7: No lead under the h1.
  - D-P8: Two collections, `experiences` and `projects`. No `showOnHome`-style flags for now. Home stays as it is.
- Exact copy (ES / EN):

| Key | ES | EN |
|---|---|---|
| meta.title | Proyectos · Juan Ignacio Werkalec | Projects · Juan Ignacio Werkalec |
| meta.description | Experiencia y proyectos de Juan Ignacio Werkalec, Senior Full-Stack Engineer. | Experience and projects of Juan Ignacio Werkalec, Senior Full-Stack Engineer. |
| title (h1) | Proyectos | Projects |
| projectsHeading (h2) | Proyectos | Projects |
| experienceHeading (h2) | Experiencia | Experience |

## Review Focus

1. **Longest row at 320 px in EN** (the Split.io summary with "JPMorgan"): the row wraps and there's no horizontal scroll. Covered in Task 5, step 5.
2. **Language switch** on `/es/proyectos/` goes to `/en/projects/` and back, not to `/en/proyectos/`. Covered in Task 4, step 4.
3. **The nav marks "Proyectos" as current** (`aria-current="page"`) on this page only. Covered in Task 4, step 4.
4. **Ongoing project:** "actualidad" / "Present" is plain text, not a `<time>` (`endIso: null`). Covered in Task 4, step 4.
5. **Home must not change:** `dist/es/index.html` and `dist/en/index.html` are byte-identical before and after. Covered in Task 2, step 1 and Task 5, step 4.

---

### Task 1: Spec and shared decisions (Phase A, STOP 1)

**Files:**
- Create: `design/pages/projects.md` (from `.claude/skills/implement-page/templates/page-spec.md`)
- Modify: `.claude/skills/implement-page/reference/page-notes.md` (the "Shared decisions" list, and the `projects` row of "Page map": MVP → Yes, copy → "collections + dictionary")

**Interfaces:**
- Produces: the approved spec every later task cites.

- [ ] **Step 1: Run Step 0 of the skill** and record it: `npm run check` (expect 0 errors), the shared components, the `[locale]` routing, the wireframe (view `proyectos`).
- [ ] **Step 2: Fill in the spec** with: the owner decisions D-P1…D-P8 as a table (like `design/pages/home.md`), the Global Constraints copy table as the Content section, plus the 4 rows (values in Task 2). Skeleton: SkipLink → SiteHeader (Proyectos current) → `main#contenido.page` → `header.page-title > h1` → `section[aria-labelledby=projects-title]` (h2 + ExperienceList) → `section[aria-labelledby=experience-title]` (h2 + ExperienceList) → SiteFooter. Wireframe audit: the `proyectos` audit output, with the raw values mapped to tokens (all of them are already in `ExperienceList`, `SectionTitle` and `layout.css`). Mark the arrows and the `mode-toggle` as "not built". Components: PageTitle (§8.7, ☐ new), SectionTitle ✅, ExperienceList ✅. Open items: every override in D-P1…D-P8 as a proposed change to copy-mvp (§1, §2, §4.4, §4.10) or diseno (§2, new §9.5, §14.4), and "sync home with the collections" (TODO). Also note that the verify grep for "JPMorgan" is expected to hit, by the owner's decision (D-P2).
- [ ] **Step 3: Add D-P1…D-P8 to "Shared decisions"** in `page-notes.md`, dated 2026-11-24.
- [ ] **Step 4: STOP 1.** Show the owner the spec path and the Open items list, and wait for approval. Then tick "Spec" for the page in `TODO.md`, adding a `Projects` row to the MVP table.

---

### Task 2: Content collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/data/projects.json`
- Create: `src/data/experiences.json`

**Interfaces:**
- Produces: collections `'projects'` and `'experiences'`. Entry `data` shape, both collections:
  - `id: string`
  - `role, start, end, summary: { es: string; en: string }`
  - `startIso: string` (`YYYY-MM`)
  - `endIso: string | null`
- `projects` also has `name: { es: string; en: string }`. `experiences` also has `org: string` (language-neutral).

- [ ] **Step 1: Snapshot home** (Review Focus 5): `npm run build && mkdir -p "$TMPDIR/home-before" && cp dist/es/index.html "$TMPDIR/home-before/es.html" && cp dist/en/index.html "$TMPDIR/home-before/en.html"`
- [ ] **Step 2: Write `src/content.config.ts`.** Use `defineCollection` + `file('src/data/<name>.json')`, with `z` from `astro/zod`.
  - Shared building blocks: `const localized = z.object({ es: z.string().min(1), en: z.string().min(1) })` and `const month = z.string().regex(/^\d{4}-\d{2}$/)`.
  - `endIso: month.nullable()`.
  - Export `collections = { projects, experiences }`.
- [ ] **Step 3: Write the JSON** (arrays of objects with `id`). The text is verbatim; don't retype it from memory. The Harness and Split.io strings are copied from `src/i18n/es.ts` / `en.ts` `home.work.items[1]` and `[2]`.

`projects.json`, one entry `plataforma-clinica`:
| Field | ES | EN |
|---|---|---|
| name | Plataforma de seguimiento clínico | Clinical follow-up platform |
| role | Full-Stack Engineer y Technical Lead | Full-Stack Engineer and Technical Lead |
| start / end | abr 2026 / actualidad | Apr 2026 / Present |
| summary | Web para terapeutas y app para pacientes, en producción. | Web console for therapists and a patient app, in production. |
| startIso / endIso | `2026-04` / `null` | |

`experiences.json`, three entries:
| id | org | role (ES = EN) | start / end ES | start / end EN | startIso / endIso | summary |
|---|---|---|---|---|---|---|
| `harness` | Harness | Senior Frontend Engineer | jun 2024 / oct 2026 | Jun 2024 / Oct 2026 | `2024-06` / `2026-10` | home `work.items[1].summary` (ES / EN) |
| `split-io` | Split.io | Frontend Engineer | ene 2022 / jun 2024 | Jan 2022 / Jun 2024 | `2022-01` / `2024-06` | home `work.items[2].summary` (ES / EN) |
| `mangoodev` | MangooDev SRL | Full-Stack Developer | dic 2020 / ene 2022 | Dec 2020 / Jan 2022 | `2020-12` / `2022-01` | ES "Sistema de compliance de proveedores para una farmacéutica multinacional. Creé el design system del equipo." · EN "Supplier compliance system for a multinational pharma company. Built the team's design system." |

- [ ] **Step 4: Verify that the schema rejects a missing language.** Temporarily delete `"en"` from `mangoodev.summary`. Run `npm run build`. Expected: FAIL, with a content schema error naming `experiences` → `mangoodev` → `summary.en`. Restore the field.
- [ ] **Step 5: Run `npm run check && npm run build`.** Expected: 0 errors, and the build completes.

---

### Task 3: Dictionary keys and PageTitle

**Files:**
- Modify: `src/i18n/types.ts`: add `projects` to `Dictionary`, and exclude `'projects'` from `PlaceholderKey`
- Modify: `src/i18n/es.ts`, `src/i18n/en.ts`: remove `pages.projects` and add `projects`
- Create: `src/components/PageTitle.astro`
- Modify: `src/components/ExperienceList.astro`: export the row type

**Interfaces:**
- Produces:
  - `Dictionary['projects']: { meta: PageMeta; title: string; projectsHeading: string; experienceHeading: string }`
  - `PlaceholderKey = Exclude<SectionKey, 'styleguide' | 'projects'>`
  - `PageTitle` props: `{ title: string }`
  - `export interface ExperienceItem` (rename of the existing `Item` in `ExperienceList.astro`; same fields: `org, role, start, end, startIso, endIso, summary`)

- [ ] **Step 1: Add the type first** (`types.ts`) and run `npm run check`. Expected: FAIL. `es.ts` and `en.ts` are missing `projects`, and `pages.projects` is now an excess property. This proves that both locales are enforced.
- [ ] **Step 2: Add the copy** to `es.ts` and `en.ts`, using the exact strings from the Global Constraints table. Remove `pages.projects`.
- [ ] **Step 3: Write `PageTitle.astro`.** The markup is from diseno §8.7: `<header class="page-title"><h1>{title}</h1></header>`. Scoped styles:
  - `.page-title { margin-bottom: var(--space-10) }`
  - `.page-title h1 { font-size: var(--text-lg); font-weight: var(--weight-semibold); line-height: var(--leading-tight); letter-spacing: var(--tracking-tight) }`

  No lead prop (D-P7; YAGNI until Now or Uses needs one).
- [ ] **Step 4: Rename `Item` to an exported `ExperienceItem`** in `ExperienceList.astro`. Nothing else changes there.
- [ ] **Step 5: Run `npm run check`.** Expected: errors **only** in `src/pages/[locale]/[section].astro`, where `t.pages[key]` no longer accepts `'projects'`. Task 4, step 1 fixes that. Any other error is a real failure.

---

### Task 4: The page: semantic HTML and Proyectos section (STOP 2)

**Files:**
- Create: `src/components/pages/ProjectsPage.astro`
- Modify: `src/pages/[locale]/[section].astro`: add a `key === 'projects'` branch before the placeholder branch

**Interfaces:**
- Consumes: the collections from Task 2, `Dictionary['projects']` and `PageTitle` from Task 3, `ExperienceItem`, `SectionTitle` (`{ id, text }`), and `Layout` (`{ title, description, routeKey }`).
- Produces: `ProjectsPage` props `{ locale: Locale }`. It renders the whole `<main id="contenido" class="page">`, the way `PlaceholderPage` does.

- [ ] **Step 1: Branch in `[section].astro`.** For `key === 'projects'`: render `<Layout title={t.projects.meta.title} description={t.projects.meta.description} routeKey={key}>` (**no `noindex`**) wrapping `<ProjectsPage locale={locale} />`.
- [ ] **Step 2: Write `ProjectsPage.astro`.**
  - Frontmatter: `getCollection('projects')` and `getCollection('experiences')`, each sorted by `startIso`, newest first.
  - Map each entry to an `ExperienceItem` for the `locale`. For projects, `org` = `name[locale]`.
  - Markup: `main#contenido.page` → `PageTitle title={t.projects.title}` → `section.page__section[aria-labelledby="projects-title"]` (`SectionTitle id="projects-title" text={t.projects.projectsHeading}` + `ExperienceList`).
  - Leave the Experiencia section for Task 5.
- [ ] **Step 3: Run `npm run check && npm run build`.** Expected: 0 errors. `dist/es/proyectos/index.html` and `dist/en/projects/index.html` exist.
- [ ] **Step 4: Check the built HTML.**
  - `node .claude/skills/implement-page/scripts/audit-wireframe.mjs --html dist/es/proyectos/index.html`, and the same for `dist/en/projects/index.html`. Expected: h1 Proyectos/Projects → h2 Proyectos/Projects, no heading problems.
  - `grep -c 'noindex' dist/es/proyectos/index.html`. Expected: `0`.
  - `grep -o 'aria-current="page"[^>]*>[^<]*' dist/es/proyectos/index.html`. Expected: one hit, on the Proyectos nav link.
  - `grep -o 'hreflang="en" href="[^"]*"' dist/es/proyectos/index.html`. Expected: `https://juaniw.com/en/projects/`. The LangSwitch link in the body also points to `/en/projects/`.
  - `grep -c '<time datetime="2026-04">' dist/en/projects/index.html` → `1`. Also grep `Present` and confirm it isn't wrapped in `<time>`.
- [ ] **Step 5: STOP 2.** Tell the owner what was built. To compare it with the wireframe: `astro dev --background`, open `/es/proyectos/` side by side with `node .claude/skills/implement-page/scripts/audit-wireframe.mjs --extract proyectos <scratchpad>/proyectos.html`. Remember the section order is intentionally reversed (D-P6). Wait for an OK.

---

### Task 5: Experiencia section, mobile and states (STOP 2)

**Files:**
- Modify: `src/components/pages/ProjectsPage.astro`

**Interfaces:**
- Consumes: the same as Task 4.

- [ ] **Step 1: Add the second section.** After the first one: `section.page__section[aria-labelledby="experience-title"]`, with `SectionTitle id="experience-title" text={t.projects.experienceHeading}` and an `ExperienceList` of the 3 experiences. Expected order: Harness, Split.io, MangooDev.
- [ ] **Step 2: Run `npm run check && npm run build`** (0 errors), then re-run the heading audit for both locales. Expected: h1 → h2 Proyectos → h2 Experiencia (ES); h1 → h2 Projects → h2 Experience (EN). Exactly one h1.
- [ ] **Step 3: Check the row text.** `grep -c 'JPMorgan' dist/es/proyectos/index.html dist/en/projects/index.html` → `1` each (D-P2). `grep -c 'Freelance' dist/es/proyectos/index.html` → `0` (D-P5). `grep -c 'MangooDev SRL' dist/en/projects/index.html` → `1`.
- [ ] **Step 4: Confirm that home didn't change.** `cmp dist/es/index.html "$TMPDIR/home-before/es.html" && cmp dist/en/index.html "$TMPDIR/home-before/en.html"`. Expected: no output (identical). If only asset hashes differ, diff the text and confirm that no copy or markup changed.
- [ ] **Step 5: Mobile and states,** in the dev server.
  - At 320 px and 375 px in EN: the Split.io row wraps, there's no horizontal scroll, and the date sits above the text below 48rem.
  - 200% zoom works.
  - Dark mode, via the system setting and via `data-mode="dark"`.
  - The rows have no hover or arrow (they're static).
- [ ] **Step 6: STOP 2.** Report, and wait for an OK.

---

### Task 6: Verify and close (skill steps 8–9)

**Files:**
- Modify: `design/pages/projects.md` (the Verification section)
- Modify: `TODO.md`
- Proposed only (apply after OK): `design/copy-mvp.md`, `design/diseno-juaniw.md`

- [ ] **Step 1: Run the skill's step-8 checks** and paste the results into the spec:
  - `npm run check && npm run build`.
  - The heading audit in ES and EN.
  - `grep -nE '>[^<{}[:space:]][^<{}]*<' src/components/pages/ProjectsPage.astro src/components/PageTitle.astro "src/pages/[locale]/[section].astro"`. Expected: no prose hits.
  - The token searches from `.claude/rules/design-tokens.md` on `PageTitle.astro` and `ProjectsPage.astro`.
  - The forbidden-words grep. Extend it to `src/data/*.json`. Expected: no output.
  - The "must not appear" list. "JPMorgan" is **expected** on this page by D-P2, so record it as an owner exception. The clinical client's name and "contratame" must not appear.
- [ ] **Step 2: Update `TODO.md`.**
  - Tick the Projects row (Built ES, Built EN, Verified after the owner's manual checklist).
  - In the placeholder item, remove "projects" from the list.
  - Add: "Sync home 'Trabajo destacado' with the `experiences`/`projects` collections (home still reads `home.work.items` + `src/data/home.ts`; the Harness and Split.io text is duplicated until then)."
- [ ] **Step 3: Propose the doc changes** from the spec's Open items, as a list. Don't edit copy-mvp or diseno until the owner approves.
- [ ] **Step 4: Propose the commit** and wait for the OK:

```bash
git add src/content.config.ts src/data/projects.json src/data/experiences.json src/i18n/ src/components/PageTitle.astro src/components/ExperienceList.astro src/components/pages/ProjectsPage.astro "src/pages/[locale]/[section].astro" design/pages/projects.md .claude/skills/implement-page/reference/page-notes.md TODO.md
git commit -m "feat(projects): Projects page in ES and EN"
```
