# Page spec: Uses (2026-11-24)

> **Status: built and verified automatically, waiting for the owner's manual checks.** On 2026-11-24 the owner accepted every recommendation below (Q1–Q8) and asked to build the page end to end without stopping. That replaces STOP 1 and STOP 2 for this page.

## Owner decisions (2026-11-24)

| # | Decision | Overrides / fills |
|---|---|---|
| D-U1 | EN categories and items: "IA" → "AI"; "Claude Code and Claude Desktop"; "Superpowers and mattpocock-skills". The rest are the same in both locales | MISSING COPY (copy-mvp §4.8 had the Categoría and Ítem columns in Spanish only) |
| D-U2 | Headers "Categoría · Ítem · Comentario" / "Category · Item · Note"; hidden caption "Herramientas que uso" / "Tools I use" | diseno §14.4 → now in copy-mvp §4.8 |
| D-U3 | The AI line is the PageTitle lead **and** the meta description | copy-mvp §4.8 called it "Intro de la categoría IA"; relabeled "Bajada (y meta description)". Wireframe had it as a loose `p.prose` |
| D-U4 | Meta title "Uses · Juan Ignacio Werkalec" (ES and EN) | diseno §9.3 → now in copy-mvp §4.8 |
| D-U5 | The "IA"/"AI" category repeats on both rows (no empty cell, no `rowspan`) | — (each row stacks as its own block on mobile) |
| D-U6 | No `aria-current` marker: Uses is only in the footer, and §10 defines "current" for the nav only | — |
| D-U7 | One review after the build instead of a stop per step | Skill STOP 1 / STOP 2 |
| D-U8 | Built from `main` (`fc3bd11`), without the projects page. Expect small merge conflicts in `src/i18n/*.ts` and `[section].astro` | — |

## Step 0
- Hard: i18n + `npm run check` ✅ (0 errors) · shared components ✅ · `[locale]` routing ✅ (`[section].astro` + `routes.uses`)
- Soft: wireframe ✅ (view `uses`) · §14.4 copy: headers and caption were missing from copy-mvp → added (D-U2) · linked files: the page links nothing ✅
- Failures: none.

## Identity
- Routes: `/es/uses/` · `/en/uses/`
- h1: ES "Uses" · EN "Uses"
- Meta title: ES/EN "Uses · Juan Ignacio Werkalec"
- Meta description: ES "Uso IA todos los días. La IA acelera; el criterio sigue siendo mío." · EN "I use AI every day. It speeds me up; the judgment is still mine."
- OG: none (site-wide TODO item) · noindex: no
- Sources: diseno §9.3, §8.7, §8.12, §10 · copy-mvp §4.8 · wireframe view `#uses`
- Astro docs consulted:
  - https://docs.astro.build/en/reference/routing-reference/#getstaticpaths
  - https://docs.astro.build/en/guides/routing/#dynamic-routes
  - https://docs.astro.build/en/basics/astro-components/#component-props

## Skeleton
- SkipLink
- header (SiteHeader) · nav "Principal"/"Main" (no `aria-current`, D-U6)
- main#contenido.page
  - header.page-title → h1 "Uses" · p.page-title__lead
  - table.data-table → caption.visually-hidden · thead (3 × `th scope="col"`) · tbody (6 rows)
- footer (SiteFooter)

## Wireframe audit
`audit-wireframe.mjs uses`: h1 "Uses", no heading problems. Landmarks: header, nav "Principal", main, header.page-title, footer. The table rows match copy-mvp §4.8 word for word.

| What | Wireframe | Doc | Decision |
|---|---|---|---|
| Lead | `p.prose.mt-4` after `.page-title` | §9.3 / §8.7: inside PageTitle | Follow the doc (D-U3) |
| Table | 6 rows, `mt-11` | §9.3: DataTable of 6 rows | Same |
| Footer row 2 | Ahora · Uses · Colofón | Built footer also has Styleguide | Keep the built footer |
| Mode toggle in the header | present | P4: no button | Not built (existing TODO) |
| Header nav | Proceso · Proyectos · Casos de estudio | Built nav: Proceso · Proyectos | Keep the built nav (existing TODO for Casos) |

### Raw values → tokens
No new CSS: the page reuses `PageTitle` and `DataTable` (both built for Colophon), so it inherits their mapping.

| Value | Property · selector | Token | Note |
|---|---|---|---|
| 1.375rem / -0.01em | `.page-title h1` | `--text-lg` / `--tracking-tight` | §8.7 |
| 0.9375rem | `.prose` (lead) | `--text-md` (`.page-title__lead`) | §8.7 wins |
| 1rem | `.mt-4` (lead) | `--space-4` | |
| 2.75rem | `.mt-11` (table) | `--space-10` (`.page-title` margin-bottom) | §8.7 |
| 0.875rem, 0.75rem, 1.25rem, 0.6875rem, clamp(…), 0.05em, 6.875rem, 15rem, 0.25rem, 1px | `.data-table *` | `--text-base`, `--space-3`, `--space-5`, `--text-2xs`, `--text-xs`, `--tracking-caps`, `--table-cat-col`, `--table-item-col`, `--space-1`, `--border-width` | Same as Colophon |

## Content
| Element | Key | ES | EN | Source |
|---|---|---|---|---|
| Meta title | `uses.meta.title` | Uses · Juan Ignacio Werkalec | Uses · Juan Ignacio Werkalec | copy-mvp §4.8 (from diseno §9.3) |
| Meta description | `uses.meta.description` | = lead | = lead | copy-mvp §4.8 |
| h1 | `uses.title` | Uses | Uses | copy-mvp §4.8 |
| Lead | `uses.lead` | Uso IA todos los días. La IA acelera; el criterio sigue siendo mío. | I use AI every day. It speeds me up; the judgment is still mine. | copy-mvp §4.8 |
| Caption (hidden) | `uses.table.caption` | Herramientas que uso | Tools I use | copy-mvp §4.8 (from diseno §14.4) |
| Headers | `uses.table.{cat,item,note}` | Categoría · Ítem · Comentario | Category · Item · Note | idem |
| 6 rows | `uses.rows` | see copy-mvp §4.8 | see copy-mvp §4.8 (D-U1) | copy-mvp §4.8 |

## Components
| Section | Component (§8) | Props / variant | Exists? | Notes |
|---|---|---|---|---|
| Title | PageTitle (§8.7) | `title`, `lead` | ✅ | |
| Table | DataTable (§8.12) | `caption`, `headers`, `rows` (`cat`/`item`/`note`) | ✅ | `UsesRow` has the same shape as DataTable's `Row`, so rows pass straight through |
| Page | — | `locale` | ✅ new: `src/components/pages/UsesPage.astro` | Registered in `src/components/pages/sectionPages.ts` (after merging `main`, which added the section page map); `[section].astro` renders it with `t.uses.meta` |

## States and edge cases
- Longer EN text: no row is longer in EN in a way that changes the layout. At 1440 px "Superpowers y mattpocock-skills" wraps at the hyphen inside the 15rem item column (also in the wireframe's column width). Acceptable.
- 320 px: checked in headless Chromium (EN). Each row stacks (category, item, note); no horizontal scroll; the longest note ("My vault: …") wraps in two lines.
- 200% zoom: same as below 48rem (stacked layout).
- Current nav link: none (D-U6).
- External links: none on this page.
- Anchor / reduced motion: no anchors.
- Dark mode: checked with `prefers-color-scheme: dark`; only color tokens are used.
- Missing data: no optional fields.

## Metadata
- title / description ES and EN: see Identity.
- Alternates: emitted by the Layout (es, en, x-default).
- OG image: site-wide TODO.
- noindex: removed (the page now has real content).

## Open items
- [x] **diseno §14.4:** Uses headers and caption marked as moved to copy-mvp §4.8 (applied 2026-11-24).
- [x] **diseno §9.3 / §8.12:** §9.3 points to copy-mvp §4.8 and records D-U5/D-U6; §8.12 "Dónde se usa" → "Uses y Colofón" (applied 2026-11-24).
- [x] **Merge with `main` (projects page, #10):** conflicts in `TODO.md`, `types.ts` and `[section].astro` resolved by taking main's section page map and adding `uses` to it (2026-11-24).

## Verification (step 8)
- check + build: `astro check` 0 errors, 0 warnings, 0 hints; build 15 pages, complete.
- Headings ES / EN: `h1 Uses` / `h1 Uses`, "No heading problems".
- Hardcoded text: the grep finds nothing in `UsesPage.astro` (the only new component).
- Raw values: `UsesPage.astro` has no `<style>` and no literal values.
- Forbidden words: no output.
- Exact text ES / EN: the built `main`, `<title>` and meta description match copy-mvp §4.8.
- Must not appear: no client name, patient data, JPMorgan, Harness screenshots or "contratame". `noindex` count in `dist/{es,en}/uses/index.html`: 0.
- Screenshots (headless Chromium): ES 1440 px light and dark, EN 320 px.

## Done (owner)
- [ ] Side by side, desktop and mobile · [ ] Exact text ES/EN · [ ] Headings
- [ ] Keyboard · [ ] axe ES/EN · [ ] Modes · [ ] Widths and zoom · [ ] Language switch · [ ] Lighthouse ≥ 95
