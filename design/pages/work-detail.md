# Page spec: Work detail, project and experience (2026-11-25)

> **Status: spec, pending owner approval (STOP 1).** Covers two skill pages, `project-detail` and `experience-detail`, rendered by one template. The owner settled the open questions in a grilling session on 2026-11-25 (see "Owner decisions"). Implementation plan: `docs/superpowers/plans/2026-11-25-work-detail-pages.md`. Content format: `docs/adr/0001-content-format-for-work-collections.md`.

## Owner decisions (2026-11-25)
They win over diseno and copy-mvp until those docs are updated (step 9).

| # | Decision | Overrides |
|---|---|---|
| D-W1 | **Hybrid by content shape.** Rows (dates, role, summary, fact-sheet data) live in the JSON `file()` collections; bodies live in Markdown `glob()` collections | — (ADR 0001) |
| D-W2 | **Missing translation = build failure.** A body in one locale must exist in the other. A body without a JSON row, or outside a locale folder, also fails the build | — |
| D-W3 | **Experience detail route `/es/experiencia/{slug}/` · `/en/experience/{slug}/`.** No `/experiencia/` index: that URL is a 404 | copy-mvp §2 (experiences under `/proyectos/{slug}`) |
| D-W4 | **The slug is the JSON row `id`**, identical in both locales. Only the section segment is translated | — |
| D-W5 | **Fact-sheet data in the JSON:** `stack` (`string[]`, not translated), `status` and `stakeholders` (`localized`), all optional. Duration is derived from `start`/`end` | — |
| D-W6 | **The body is free Markdown** with `##` headings written in the file. Projects: Contexto · Restricciones · Valor (EN Context · Constraints · Value). Experiences: Contexto / Context only | copy-mvp §4.10 (Restricciones and Valor for every detail) |
| D-W7 | **No visual.** No `visual` field, no `Media` component | copy-mvp §4.10 ("visual opcional") |
| D-W8 | **All four rows get a body:** `plataforma-clinica`, `harness`, `split-io`, `mangoodev`. Draft ES/EN copy written by Claude from `fase3/datos.md`; any missing fact is the literal `TBD` | diseno §2 ("ninguna página de la fase 2 se publica sin su copy") |
| D-W9 | **A row may have no body.** It stays static (no link, no arrow) | — |
| D-W10 | **Rows with a body become links:** the whole row is an `<a>` with a `→` arrow, a reinforced hover and visible focus, plus the phase-2 radius and negative margin | `design/pages/projects.md` D-P6 (static rows) |
| D-W11 | **Home is untouched**; its rows don't link | — |
| D-W12 | **`TBD` renders literally.** Every `TBD` is listed in `TODO.md`. No `noindex`, no draft flag | — |
| D-W13 | **Fact sheet.** Project: Rol · Duración · Stack · Estado · Stakeholders. Experience: Rol · Duración · Stack. Absent fields are skipped. New `FactSheet` (diseno §8.11), 3 columns on desktop | diseno §8.11 ("rol, duración o contexto, stack y estado") |
| D-W14 | **Meta, navigation and links.** `<title>` = `{name or org} · Juan Ignacio Werkalec`; description = the row summary. Back link "← Proyectos" / "← Projects" above the h1 (to `/proyectos/` or `/proyectos/#experience-title`). The language switch goes to the same detail. The nav marks Proyectos with `aria-current="true"`. No closing links to projects or case studies yet | copy-mvp §4.10 ("Las experiencias cierran con links a sus proyectos y casos") |

## Step 0
- Hard: i18n + `npm run check` ✅ (0 errors on 2026-11-25, before changes) · shared components ✅ (`SkipLink`, `SiteHeader`, `SiteNav`, `LangSwitch`, `SiteFooter`) · `[locale]` routing ✅ (`src/pages/[locale]/[section].astro`)
- Soft: wireframe: **no wireframe** for the detail pages (the bundle has no detail view) · §14.4 copy: fact labels exist for Rol · Duración · Stack · Estado; "Stakeholders" is new (D-W13, owner-approved) · linked files: none
- Failures: none.

## Identity
- Routes: project `/es/proyectos/{slug}/` · `/en/projects/{slug}/` (`plataforma-clinica`; EN slug `clinical-platform` since 2026-11-27, row field `slug`, 301 from the old EN URL in `public/_redirects`); experience `/es/experiencia/{slug}/` · `/en/experience/{slug}/` (`harness`, `split-io`, `mangoodev`)
- h1: the project `name[locale]` or the experience `org` (from the JSON row)
- Meta title: `{h1} · Juan Ignacio Werkalec` (both locales)
- Meta description: the row `summary[locale]`
- OG: none (site-wide TODO) · noindex: no (D-W12)
- Sources: copy-mvp §2, §4.10 · diseno §8.7, §8.8, §8.11, §8.14 · wireframe: none
- Astro docs consulted:
  - https://docs.astro.build/en/reference/content-loader-reference/#glob-loader
  - https://docs.astro.build/en/reference/modules/astro-content/#reference
  - https://docs.astro.build/en/reference/modules/astro-content/#render
  - https://docs.astro.build/en/guides/content-collections/#generating-routes-from-content
  - https://docs.astro.build/en/recipes/i18n/#use-collections-for-translated-content

## Skeleton
- SkipLink
- header (SiteHeader) · nav "Principal"/"Main" (`aria-current="true"` on Proyectos/Projects)
- main#contenido.page
  - p.work-detail__back > a "← Proyectos" / "← Projects"
  - header.page-title > h1 (PageTitle, no lead)
  - dl.fact-sheet (FactSheet, 3 columns on desktop)
  - div.work-detail__body (`<Content />`: `h2`, `p`, `ul`)
- footer (SiteFooter)

## Wireframe audit
No wireframe view exists for the details. Visual rules come from diseno §8.7 (PageTitle), §8.11 (FactSheet) and SectionTitle (body `h2`). Raw values: none planned; all spacing uses `--space-*` tokens.

### Raw values → tokens
| Value | Property · selector | Token | Note |
|---|---|---|---|
| 6px (v1 row radius) | `border-radius` · `.exp-row__link` | `--radius-md` | phase-2 clickable row (D-W10) |
| -0.75rem (v1 negative margin) | `margin-inline` · `.exp-row__link` | `calc(-1 * var(--space-3))` | phase-2 clickable row |

## Content
| Element | Key (`Dictionary`) | ES | EN | Source |
|---|---|---|---|---|
| Back link | `workDetail.back` | ← Proyectos | ← Projects | owner, 2026-11-25 (move to copy-mvp) |
| Fact label | `workDetail.facts.role` | Rol | Role | diseno §14.4 |
| Fact label | `workDetail.facts.duration` | Duración | Duration | diseno §14.4 |
| Fact label | `workDetail.facts.stack` | Stack | Stack | diseno §14.4 |
| Fact label | `workDetail.facts.status` | Estado | Status | diseno §14.4 |
| Fact label | `workDetail.facts.stakeholders` | Stakeholders | Stakeholders | owner, 2026-11-25 (move to copy-mvp) |
| h1, meta | — | from `src/data/*.json` | from `src/data/*.json` | rows |
| Fact values | — | `stack`, `status`, `stakeholders` in `src/data/*.json` | same | **draft, pending owner review** |
| Body | — | `src/content/*/es/{slug}.md` | `src/content/*/en/{slug}.md` | **draft, pending owner review** (D-W8) |

## Components
| Section | Component (§8) | Props / variant | Exists? | Notes |
|---|---|---|---|---|
| Title | PageTitle (§8.7) | `title` | ✅ | no lead |
| Fact sheet | FactSheet (§8.11) | `items`, `cols` 3 | ☐ new | CSS from §8.11 |
| Rows on /proyectos | ExperienceList (§8.8) | `href?` → link variant | ☐ link variant | §8.14 "ExperienceList clickeable" |

## States and edge cases
- Longer EN text: EN titles and fact values wrap; no horizontal scroll at 320 px.
- 320 px: the fact sheet is one item per row with the label column (`--fact-label-col`); the 7-item stack wraps inside `dd`.
- 200% zoom: same as 320 px.
- Current nav link: Proyectos with `aria-current="true"` (a subpage, not the page itself).
- External links: none.
- Anchor / reduced motion: the experience back link targets `#experience-title` on /proyectos.
- Dark mode: tokens only.
- Missing data: absent fact fields are skipped (an experience sheet has 3 items, no empty cells). A row without a body has no page and a static row.
- Broken pair: build failure (D-W2).

## Metadata
- title / description: see Identity.
- Alternates: emitted by Layout from the detail's per-locale paths (es, en, x-default → `/`).
- OG image: none.
- noindex: no.

## Open items
- [x] copy-mvp §2 sitemap: experiences move to `/experiencia/{slug}` (D-W3).
- [x] copy-mvp §4.10: detail rows (structure per D-W6/D-W7/D-W13, closing links deferred per D-W14, copy source `src/content/**`, draft).
- [x] copy-mvp: `workDetail.back` and the "Stakeholders" label (in the §4.10 rows).
- [x] `design/pages/projects.md`: D-P6 lifted by D-W10.
- [ ] diseno §8.8 (link variant), §8.11 (used in details, 3 columns), §9 (detail pages): proposals.
- [ ] Every `TBD` in the draft copy (list in `TODO.md`).

## Verification (step 8)
Run 2026-11-25 on branch `feat/work-detail-pages`.
- check + build: `astro check` 0 errors / 0 warnings / 0 hints; build 23 pages, 8 of them details (`/es/proyectos/plataforma-clinica/`, `/en/projects/plataforma-clinica/`, `/{es/experiencia,en/experience}/{harness,split-io,mangoodev}/`). `/es/experiencia/` and `/en/experience/` are 404.
- Headings ES / EN: `plataforma-clinica` h1 + h2 Contexto/Restricciones/Valor (EN Context/Constraints/Value); `split-io` (ES) and `harness` (EN) h1 + h2 Contexto/Context. One h1, no skipped levels, on all four audited pages.
- Hardcoded text: two hits, both acceptable: a TypeScript generic in `ProjectsPage.astro` (false positive) and the brand name in `SiteHeader.astro` (existing, a fact). The `→` row arrow is the only literal glyph added (decorative, `aria-hidden`).
- Raw values: none. The only matches are `@media (width >= 48rem) /* --bp-md */` breakpoints, which the rule allows.
- Forbidden words: no hits in `src/i18n/*.ts` or `src/content/**`.
- Must not appear: no client name and no "contratame". "JPMorgan" appears only in the Split.io detail's meta description, because the description is the row summary (D-W14) and that summary keeps "JPMorgan" (owner exception, `design/pages/projects.md`).
- Exact text ES / EN: the body copy is a draft approved by the owner on 2026-11-25. It is not in copy-mvp yet (open item §4.10), so there is no word-for-word comparison.
- Failure builds (D-W2): a body in one locale only, a body with no row, a non-locale folder and frontmatter in a body each fail the build with a message naming the file. A row with no body builds and stays static (3 links instead of 4).
- Head and language switch: the canonical, the es/en/x-default alternates and the lang link point to the same detail in each locale. The nav marks Proyectos with `aria-current="true"`.
- Home: `<body>` byte-identical to the baseline in ES and EN. Only the `<head>` differs, because Astro now inlines ExperienceList's larger CSS instead of using the shared chunk.

## Done (owner)
- [ ] Desktop and mobile · [ ] Exact text ES/EN · [ ] Headings
- [ ] Keyboard · [ ] axe ES/EN · [ ] Modes · [ ] Widths and zoom · [ ] Language switch · [ ] Lighthouse ≥ 95
