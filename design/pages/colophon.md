# Page spec: Colophon (2026-11-24)

> **Status: built, waiting for the owner's review.** Colophon is a phase-2 page with no §9 section and no copy. On 2026-11-24 the owner asked to write the copy from a repo investigation, build the page end to end, and review everything at the end. That replaces STOP 1 and STOP 2 for this page. The copy is a **draft**: it goes into copy-mvp §4.10 marked "pending owner review".

## Owner decisions (2026-11-24)

| # | Decision | Overrides |
|---|---|---|
| D-C1 | Claude drafts the copy (ES/EN) from the repo; the owner reviews it after the build, not before | Skill STOP 1 / STOP 2; diseno §2 "no phase-2 page without copy" (the copy now exists) |
| D-C2 | Structure: PageTitle with a lead → DataTable (Capa · Tecnología · Por qué) → a closing line with links to the styleguide and to the source on GitHub | Wireframe `colofon` (h1 + table only) |
| D-C3 | 8 rows: Framework, Tipos, Idiomas, Estilos, Tipografía, Diseño, Implementación, Deploy | Wireframe (5 placeholder rows) |
| D-C4 | No version numbers ("Astro", not "Astro 7") so the page doesn't go stale | — |
| D-C5 | ~~Why Netlify~~ Superseded 2026-11-27: the site deploys on **Cloudflare Workers** static assets (`wrangler.jsonc`). Row copy: "Static files served from the edge; a tiny Worker only picks the language on /." | audit 2026-11-27 |
| D-C6 | AI rows follow the Uses line ("the AI speeds things up; the judgment is still mine"). Skills are not named (they're in Uses) | — |
| D-C7 | Meta title "Colofón · Juan Ignacio Werkalec" / "Colophon · Juan Ignacio Werkalec"; description = the lead; no `noindex` | — |

## Step 0
- Hard: i18n + `npm run check` ✅ (0 errors) · shared components ✅ · `[locale]` routing ✅ (`[section].astro` + `routes.colophon`)
- Soft: wireframe ✅ (view `colofon`) · §14.4 copy: no §14.4 strings on this page ✅ · linked files ✅ (`/{locale}/styleguide/` exists; GitHub repo `Destras/portfolios` is public)
- Failures: none.

## Identity
- Routes: `/es/colofon/` · `/en/colophon/`
- h1: ES "Colofón" · EN "Colophon"
- Meta title: ES "Colofón · Juan Ignacio Werkalec" · EN "Colophon · Juan Ignacio Werkalec"
- Meta description: ES "Cómo está hecho este sitio, capa por capa, y por qué elegí cada pieza." · EN "How this site is built, layer by layer, and why I picked each piece."
- OG: none (site-wide TODO item) · noindex: no
- Sources: copy-mvp §4.10 (draft added on 2026-11-24) · diseno §2, §8.7, §8.12, §10 · wireframe view `#colofon`
- Astro docs consulted:
  - https://docs.astro.build/en/reference/routing-reference/#getstaticpaths
  - https://docs.astro.build/en/guides/styling/#scoped-styles
  - https://docs.astro.build/en/basics/astro-components/#_top
  - https://docs.astro.build/en/guides/deploy/netlify/#_top (source for the Netlify row)

## Skeleton
- SkipLink
- header (SiteHeader) · nav "Principal"/"Main" (no `aria-current`: colophon isn't in the nav)
- main#contenido.page
  - header.page-title → h1 · p.page-title__lead
  - table.data-table → caption.visually-hidden · thead (3 × `th scope="col"`) · tbody (8 rows)
  - p.colophon-more → link to `/{locale}/styleguide/` · link to GitHub (new tab + hidden notice)
- footer (SiteFooter)

## Wireframe audit
`audit-wireframe.mjs colofon`: h1 "Colofón", no heading problems. Landmarks: header, nav "Principal", main, header.page-title, footer. Table with 5 placeholder rows (`[capa] [tecnología] [por qué, 1 línea]`).

| What | Wireframe | Doc | Decision |
|---|---|---|---|
| Lead | none | §8.7 allows one; D-C2 | Add it |
| Rows | 5 placeholders | copy-mvp §4.10: Capa · Tecnología · Por qué | 8 rows (D-C3) |
| Closing links | none | Owner request | Add it (D-C2) |
| Footer row 2 | Ahora · Uses · Colofón | Current footer also has Styleguide | Keep the built footer |
| Mode toggle in the header | present | P4: no button | Not built (existing TODO) |

### Raw values → tokens
| Value | Property · selector | Token | Note |
|---|---|---|---|
| 1.375rem | font-size · `.page-title h1` | `--text-lg` | diseno §8.7 wins |
| -0.01em | letter-spacing · h1 | `--tracking-tight` | |
| 2.75rem | margin-top · `.mt-11` (table) | `--space-10` (`.page-title` margin-bottom) | §8.7 |
| 0.875rem | font-size · `.data-table` | `--text-base` | §8.12 |
| 0.75rem | padding · th/td | `--space-3` | |
| 1.25rem | padding-left · th+th | `--space-5` | |
| 0.6875rem / clamp(…) | font-size · th, `__cat` | `--text-2xs` / `--text-xs` | §8.12 |
| 0.05em | letter-spacing · th | `--tracking-caps` | |
| 6.875rem / 15rem | width · th 1/2 | `--table-cat-col` / `--table-item-col` | |
| 0.25rem / 0.75rem | gap / padding-block · mobile tr | `--space-1` / `--space-3` | |
| 1px | border | `--border-width` | |
| 1px (width/height) | mobile `thead` | none | Same visually-hidden technique as `base.css`; not a design value |
| — | `.colophon-more` margin-top | `--space-8` | Not in the wireframe; chosen by Claude. Review it |

## Content
| Element | Key | ES | EN | Source |
|---|---|---|---|---|
| Meta title | `colophon.meta.title` | Colofón · Juan Ignacio Werkalec | Colophon · Juan Ignacio Werkalec | copy-mvp §4.10 (draft) |
| Meta description | `colophon.meta.description` | = lead | = lead | idem |
| h1 | `colophon.title` | Colofón | Colophon | copy-mvp §2 / §4.6 |
| Lead | `colophon.lead` | Cómo está hecho este sitio, capa por capa, y por qué elegí cada pieza. | How this site is built, layer by layer, and why I picked each piece. | draft |
| Caption (hidden) | `colophon.table.caption` | Cómo está hecho este sitio | How this site is built | draft |
| Headers | `colophon.table.{layer,tech,why}` | Capa · Tecnología · Por qué | Layer · Technology · Why | copy-mvp §4.10 (ES); EN draft |
| 8 rows | `colophon.rows` | see copy-mvp §4.10 | see copy-mvp §4.10 | draft |
| Closing (styleguide) | `colophon.styleguide` | ¿Cómo se ve cada pieza? Está en la [guía de estilos]. | Want to see each piece? It's in the [styleguide]. | draft |
| Closing (source) | `colophon.source` | El código está en [GitHub]. | The code is on [GitHub]. | draft |
| New-tab notice | `site.footer.newTab` (reused) | (se abre en otra pestaña) | (opens in a new tab) | copy-mvp §4.6 |

## Components
| Section | Component (§8) | Props / variant | Exists? | Notes |
|---|---|---|---|---|
| Title | PageTitle (§8.7) | `title`, `lead?` | ✅ new: `src/components/PageTitle.astro` | Reusable by Now, Uses, 404 |
| Table | DataTable (§8.12) | `caption`, `headers` (3), `rows` (`cat`/`item`/`note`) | ✅ new: `src/components/DataTable.astro` | Reusable by Uses. CSS copied from §8.12, weights → weight tokens |
| Page | — | `locale` | ✅ new: `src/components/pages/ColophonPage.astro` | Rendered by `[section].astro`, like the styleguide |

## States and edge cases
- Longer EN text: the longest notes are row 4 (Styles) and row 5 (Typography). `text-wrap: pretty` on the notes.
- 320 px: below 48rem each row stacks (layer, tech, why); the header is hidden visually but still read.
- 200% zoom: same as mobile (the stacked layout kicks in).
- Current nav link: none (colophon is in the footer only).
- External links: GitHub opens in a new tab with `rel="noopener"` and the hidden notice. The styleguide link stays in the same tab.
- Anchor / reduced motion: no anchors.
- Dark mode: only color tokens; nothing mode-specific.
- Missing data: no optional fields.

## Metadata
- title / description ES and EN: see Identity.
- Alternates: emitted by the Layout (es, en, x-default).
- OG image: site-wide TODO.
- noindex: removed (the page now has real content).

## Open items
- [ ] **Owner review of the draft copy** (copy-mvp §4.10, "pending owner review").
- [ ] **DEVIATION:** `.colophon-more` (the closing line) isn't in the wireframe or §8. It's a plain paragraph with global links, `margin-top: var(--space-8)`. Propose adding it to diseno §9 when the colophon section is written.
- [ ] **diseno §9:** add a "Colofón" section (h1, meta, PageTitle with lead → DataTable of 8 rows → closing line) once the owner approves. §8.12 "Dónde se usa" → "Uses y Colofón".
- [x] ~~Netlify config isn't in the repo~~ Obsolete 2026-11-27: hosting is Cloudflare Workers, configured in `wrangler.jsonc`.

## Verification (step 8)
- check + build: `astro check` 0 errors, 0 warnings, 0 hints; build 15 pages, complete.
- Headings ES / EN: `h1 Colofón` / `h1 Colophon`, "No heading problems".
- Hardcoded text: the grep finds nothing in `PageTitle.astro`, `DataTable.astro` or `ColophonPage.astro`.
- Raw values: no hex/rgb/hsl/oklch, no `style=`, no `[data-theme`/`[data-mode`, no px/rem/em in spacing or type. The only literals are `1px` width/height in the mobile `thead` (visually-hidden technique) and the `48rem` breakpoint (`--bp-md`).
- Forbidden words: no output.
- Exact text ES / EN: the built `main` matches the dictionary. The closing line reads "…guía de estilos. El código está en GitHub." / "…styleguide. The code is on GitHub."
- Must not appear: no client name, patient data, JPMorgan, Harness screenshots or "contratame". `noindex` count in `dist/es/colofon/index.html`: 0.

## Done (owner)
- [ ] Side by side, desktop and mobile · [ ] Exact text ES/EN · [ ] Headings
- [ ] Keyboard · [ ] axe ES/EN · [ ] Modes · [ ] Widths and zoom · [ ] Language switch · [ ] Lighthouse ≥ 95
