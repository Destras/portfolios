# Page spec: Projects (2026-11-24)

> **Status: built and verified (automated); owner manual checklist pending.** The owner settled every open question in a grilling session on 2026-11-24 (see "Owner decisions"). This page was phase 2 in diseno §2 and has no §9 section. D-P1 brings it into the MVP. Implementation plan: `docs/superpowers/plans/2026-11-24-projects-page.md`.

## Owner decisions (2026-11-24)
They win over diseno and copy-mvp until those docs are updated (step 9).

| # | Decision | Overrides |
|---|---|---|
| D-P1 | **`/proyectos` joins the MVP.** It loses its `noindex`. Reason: home already links to it ("Todos los proyectos") | diseno P2, §2 ("No (fase 2)"), §2 rule "ninguna página de la fase 2 se publica sin su copy"; skill page-notes ("Phase 2") |
| D-P2 | **Harness and Split.io rows use the current home dictionary text verbatim** (`home.work.items[1]` and `[2]`), including "JPMorgan" and the Split.io role "Frontend Engineer" | copy-mvp §1 ("JPMorgan Chase no aparece en la web"), §4.4 (V2 lines, role "Senior Frontend Engineer"); skill step 8 "must not appear" |
| D-P3 | **Harness and Split.io are one job shown as two entries. No note** under the list | diseno §8.8 and §14.4 (the "un solo empleo, en dos etapas" note) |
| D-P4 | **MangooDev appears only on this page**, with copy-mvp §4.4's long "Línea" | — (copy-mvp §4.4 already says "solo en /proyectos") |
| D-P5 | **Freelance is not in this page's Experiencia.** Its work is the single row of a separate "Proyectos" section | copy-mvp §4.10 ("Experiencia (4 filas)"); wireframe `proyectos` (Freelance in Experiencia) |
| D-P6 | **Order:** h1 → h2 Proyectos → h2 Experiencia (the wireframe has Experiencia first). **Both sections use static `ExperienceList` rows:** no arrow, no link, until the detail pages exist | wireframe `proyectos` (order, `→` arrows); copy-mvp §4.4 "Cada entrada lleva a `/proyectos/{slug}`" |
| D-P7 | **No lead under the h1.** Meta description as approved below | — (no source had one) |
| D-P8 | **Two Astro content collections, `projects` and `experiences`** (`file()` loader, both languages in each entry). **Home is not touched** and keeps `home.work.items` + `src/data/home.ts`. The Harness and Split.io text is duplicated until home is synced (TODO). No `showOn*` flags for now | — |

## Step 0
- Hard: i18n + `npm run check` ✅ (24 files, 0 errors, 0 warnings, 0 hints) · shared components ✅ (`SkipLink`, `SiteHeader`, `SiteNav`, `LangSwitch`, `SiteFooter`) · `[locale]` routing ✅ (`src/pages/[locale]/[section].astro` with `getStaticPaths` over the route map; `projects` → `proyectos` / `projects`)
- Soft: wireframe ✅ (`design/wireframes.html`, view `proyectos`) · §14.4 copy for this page: "Proyectos" / "Projects" and "Experiencia" / "Experience" (section titles) ✅. The note string is not used (D-P3) · linked files: `main` links to nothing ✅
- Failures: none.

## Identity
- Routes: `/es/proyectos/` · `/en/projects/` (route map `projects` in `src/i18n/routes.ts`)
- h1: ES "Proyectos" · EN "Projects" (diseno §2)
- Meta title: ES "Proyectos · Juan Ignacio Werkalec" · EN "Projects · Juan Ignacio Werkalec" (same pattern as diseno §9.2/§9.3)
- Meta description: ES "Experiencia y proyectos de Juan Ignacio Werkalec, Senior Full-Stack Engineer." · EN "Experience and projects of Juan Ignacio Werkalec, Senior Full-Stack Engineer." (owner-approved, D-P7; move to copy-mvp)
- OG: none on this page (site-wide TODO item) · noindex: **no** (D-P1)
- Sources: diseno §2, §7, §8.7, §8.8, §14.4 (no §9 section yet) · copy-mvp §4.4, §4.10 · wireframe view: `#proyectos`
- Astro docs consulted:
  - https://docs.astro.build/en/guides/content-collections/#the-file-loader
  - https://docs.astro.build/en/guides/content-collections/#defining-the-collection-schema
  - https://docs.astro.build/en/guides/content-collections/#defining-build-time-content-collections
  - https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries
  - Routing, `getStaticPaths` and alternates: already covered in `reference/astro-mapping.md`.

## Skeleton
- SkipLink
- header (SiteHeader) · nav "Principal"/"Main" (`aria-current="page"` on Proyectos/Projects)
- main#contenido.page
  - header.page-title > h1 "Proyectos"
  - section.page__section[aria-labelledby=projects-title]
    - h2#projects-title "Proyectos"
    - ul.exp-list (1 row: Plataforma de seguimiento clínico)
  - section.page__section[aria-labelledby=experience-title]
    - h2#experience-title "Experiencia"
    - ul.exp-list (3 rows: Harness, Split.io, MangooDev SRL)
- footer (SiteFooter)

Note: the h1 and the first h2 both say "Proyectos". The wireframe has the same pairing, and the owner accepted it (D-P6).

## Wireframe audit
`node .claude/skills/implement-page/scripts/audit-wireframe.mjs proyectos`: h1 Proyectos → h2 Experiencia → h2 Proyectos, no heading problems.

| What | Wireframe | Doc | Decision |
|---|---|---|---|
| Section order | Experiencia, then Proyectos | — | Proyectos first (D-P6) |
| Freelance row | In Experiencia | copy-mvp §4.10: 4 rows | Out of Experiencia; it becomes the Proyectos row (D-P5) |
| Row arrow `→` / clickable row | Yes (`exp-row__arrow`) | diseno D8, §8.14 (phase 2) | Not built (D-P6) |
| Row text | V2 short lines | copy-mvp §4.4 | Dictionary/home text and copy-mvp long line (D-P2, D-P4) |
| `mode-toggle` in the header | Yes | diseno P4 (no button) | Not built (TODO item, out of scope) |
| `header.page-title > h1` | Yes | diseno §8.7 PageTitle | Build PageTitle from §8.7 |
| `h1` size | `1.375rem`, `-0.01em` | §8.7: `--text-lg`, `--tracking-tight` | Tokens |

### Raw values → tokens
The values that touch this page's own markup. The header, footer and `.page` are already built and tokenized.

| Value | Property · selector | Token | Note |
|---|---|---|---|
| `1.375rem` | font-size · `.page-title h1` | `--text-lg` | §8.7 |
| `-0.01em` | letter-spacing · `.page-title h1` | `--tracking-tight` | §8.7 |
| — | margin-bottom · `.page-title` | `--space-10` | §8.7 (not in the wireframe CSS) |
| `0.875rem` / `0.5rem` | `.section-title` | Already `SectionTitle` (`--text-base`, `--space-2`) | Existing component |
| `clamp(3rem, …, 4rem)` | margin-top · `.mt-section` | `--space-section` (`.page__section + .page__section`) | Existing layout rule |
| `9.75rem`, `1rem`, `0.75rem`, `6px`, `clamp(0.75rem…)` | `.exp-row` | Already `ExperienceList` (`--row-date-col`, `--space-4`, `--space-3`, `--text-xs`) | Existing component; the radius and the negative margin belong to the clickable phase-2 row (not built) |

No DEVIATION.

## Content
| Element | Key / location | ES | EN | Source |
|---|---|---|---|---|
| Meta title | `projects.meta.title` | Proyectos · Juan Ignacio Werkalec | Projects · Juan Ignacio Werkalec | diseno §9.2/§9.3 pattern (move to copy-mvp) |
| Meta description | `projects.meta.description` | Experiencia y proyectos de Juan Ignacio Werkalec, Senior Full-Stack Engineer. | Experience and projects of Juan Ignacio Werkalec, Senior Full-Stack Engineer. | Owner, D-P7 (move to copy-mvp) |
| h1 | `projects.title` | Proyectos | Projects | diseno §2 |
| h2 projects | `projects.projectsHeading` | Proyectos | Projects | diseno §14.4 |
| h2 experience | `projects.experienceHeading` | Experiencia | Experience | diseno §14.4 |
| Project row | `src/data/projects.json` → `plataforma-clinica` | abr 2026 – actualidad · Plataforma de seguimiento clínico · Full-Stack Engineer y Technical Lead · "Web para terapeutas y app para pacientes, en producción." | Apr 2026 – Present · Clinical follow-up platform · Full-Stack Engineer and Technical Lead · "Web console for therapists and a patient app, in production." | copy-mvp §4.4 (name, role, dates, V1 Freelance line); owner-approved (move to copy-mvp) |
| Experience row | `src/data/experiences.json` → `harness` | jun 2024 – oct 2026 · Harness · Senior Frontend Engineer · `home.work.items[1].summary` (es) | Jun 2024 – Oct 2026 · Harness · Senior Frontend Engineer · `home.work.items[1].summary` (en) | Dictionary, D-P2 (move to copy-mvp) |
| Experience row | `experiences.json` → `split-io` | ene 2022 – jun 2024 · Split.io · Frontend Engineer · `home.work.items[2].summary` (es) | Jan 2022 – Jun 2024 · Split.io · Frontend Engineer · `home.work.items[2].summary` (en) | Dictionary, D-P2 (move to copy-mvp) |
| Experience row | `experiences.json` → `mangoodev` | dic 2020 – ene 2022 · MangooDev SRL · Full-Stack Developer · "Sistema de compliance de proveedores para una farmacéutica multinacional. Creé el design system del equipo." | Dec 2020 – Jan 2022 · MangooDev SRL · Full-Stack Developer · "Supplier compliance system for a multinational pharma company. Built the team's design system." | copy-mvp §4.4 |
| Skip link, nav, language, footer | `site.*` | (existing) | (existing) | copy-mvp §4.1, §4.6, diseno §14.4 |

No MISSING COPY.

## Components
| Section | Component (§8) | Props / variant | Exists? | Notes |
|---|---|---|---|---|
| Title | PageTitle (§8.7) | `{ title }`, no lead | ☐ new | HTML and CSS from §8.7; `font-weight: 600` → `--weight-semibold` |
| Section titles | SectionTitle (§8.7) | `{ id, text }`, label variant, no link | ✅ | |
| Rows | ExperienceList (§8.8) | `{ items: ExperienceItem[] }` | ✅ | Export its `Item` type as `ExperienceItem`. For a project, `org` = the project name |
| Page body | `src/components/pages/ProjectsPage.astro` | `{ locale }` | ☐ new | Page component, like `StyleguidePage` (not a §8 component) |

## States and edge cases
- Longer EN text: the Split.io EN summary is the longest row. It wraps; the grid uses `minmax(0, 1fr)`.
- 320 px: the date goes above the text below 48rem (ExperienceList's mobile layout). No horizontal scroll.
- 200% zoom: same as 320 px.
- Current nav link: Proyectos/Projects gets `aria-current="page"` and the dot (SiteNav, from `routeKey="projects"`).
- External links: none in `main`.
- Anchor / reduced motion: no anchors.
- Dark mode: tokens only; check in system mode and with a forced `data-mode`.
- Missing data: the ongoing project has `endIso: null`, so "actualidad"/"Present" is plain text, not a `<time>`. Every field is required by the collection schemas, so there's no optional-field gap.

## Metadata
- title / description ES and EN: see Identity.
- Alternates: emitted by Layout (es → `/es/proyectos/`, en → `/en/projects/`, x-default → `/`).
- OG image: none (site-wide TODO).
- noindex: no.

## Open items
Applied on 2026-11-24 with the owner's approval (diseno §2, §8.7, §8.8, new §9.5, §14.4, P6; copy-mvp §1, §4.4, §4.9, §4.10). The TODO item is in `TODO.md`.

- [x] **D-P1:** diseno §2: mark Proyectos "Sí" for the MVP, and add **§9.5 Proyectos** (h1, meta, sections: PageTitle → SectionTitle + ExperienceList (projects) → SectionTitle + ExperienceList (experience)). Update §8.7 "Dónde se usa" (PageTitle: Proyectos) and P2. → diseno-juaniw
- [x] **D-P2:** copy-mvp §1: remove or relax the JPMorgan restriction. §4.4: replace the Harness and Split.io lines with the home text and use the role "Frontend Engineer" for Split.io. → copy-mvp. The skill's step 8 "must not appear" list keeps JPMorgan until then, as an owner exception for this page.
- [x] **D-P3:** diseno §14.4 and §8.8: remove the "un solo empleo, en dos etapas" note. → diseno-juaniw
- [x] **D-P5/D-P6:** copy-mvp §4.10 `/proyectos` row: "Proyectos (1 fila: la plataforma clínica) + Experiencia (Harness, Split.io, MangooDev)", in that order, static rows. → copy-mvp
- [x] **Move to copy-mvp:** the meta title and description, and the project row line (ES/EN). → copy-mvp §4.9/§4.10
- [x] **TODO:** sync home "Trabajo destacado" with the `experiences`/`projects` collections. → `TODO.md`

## Verification (step 8)
Run on 2026-11-24, branch `feat/projects-page`.
- check + build: `npm run check` → 0 errors, 0 warnings, 0 hints (26 files) · `npm run build` → Complete, `dist/es/proyectos/index.html` and `dist/en/projects/index.html` exist.
- Schema guard: removing `mangoodev.summary.en` fails the build with `InvalidContentEntryDataError: experiences → mangoodev … summary.en: Required`.
- Headings ES: h1 Proyectos → h2 Proyectos → h2 Experiencia · EN: h1 Projects → h2 Projects → h2 Experience. Exactly one h1, no skipped levels.
- Hardcoded text: one hit, `CollectionEntry<'projects'>` in a TypeScript type (not text). All visible text comes from the dictionary or the collections.
- Raw values: no hex/rgb/hsl/oklch, no `style=`, no `[data-theme`/`[data-mode`, no px/rem/em in `PageTitle.astro`, `ProjectsPage.astro`, `[section].astro`, `ExperienceList.astro`.
- Forbidden words (`src/i18n/*.ts`, `src/data/*.json`): no output.
- Must not appear: clinical client's name 0, "contratame" 0. **"JPMorgan": 1 per locale, by owner decision D-P2.**
- Exact text ES / EN: the `main` text matches the Content table word for word.
- Also: `noindex` absent; `aria-current="page"` on Proyectos/Projects only; hreflang es → `/es/proyectos/`, en → `/en/projects/`; LangSwitch links `/en/projects/` ⇄ `/es/proyectos/`; the ongoing project renders `<time datetime="2026-04">Apr 2026</time> – Present` (Present is plain text).
- Home: the visible text and markup of `dist/{es,en}/index.html` are unchanged. Only CSS chunking moved (SectionTitle and ExperienceList styles now live in a shared `/_astro/*.css` file, since two pages use them).
- Screenshots (chrome-headless-shell): 320 px EN (no horizontal scroll, date above the text), 1280 px EN (two-column rows), 1280 px ES with dark scheme (tokens resolve).
- Known: in ES, "abr 2026 – actualidad" wraps onto two lines inside the date column on desktop, the same as home's Freelance row.

## Done (owner)
- [ ] Side by side, desktop and mobile · [ ] Exact text ES/EN · [ ] Headings
- [ ] Keyboard · [ ] axe ES/EN · [ ] Modes · [ ] Widths and zoom · [ ] Language switch · [ ] Lighthouse ≥ 95
