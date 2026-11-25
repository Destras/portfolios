# Page spec: Now (2026-11-25)

The owner's draft `design/now.md` replaces copy-mvp §4.7 (structure and content). Decisions were taken in a grilling session on 2026-11-25; the owner approved the spec and asked for a direct build (no STOP 2 per section).

## Decisions

| # | Decision | Overrides |
|---|---|---|
| D-N1 | `design/now.md` replaces copy-mvp §4.7. The three old items (clinical platform, "esta web, en público", Configs case study) are dropped. The polished copy is written back into copy-mvp §4.7. | copy-mvp §4.7 |
| D-N2 | "Trabajo" and "Abierto a" stay, with a soft tone: availability, not a request. | copy-mvp §4.7 note "Sin 'buscando trabajo' ni 'abierto a oportunidades'" |
| D-N3 | One `h2` (SectionTitle, label variant) per block, in the draft's order. The flat NowList list is not used; only its `.now-updated` line survives. **DEVIATION** from §8.13. | diseno §8.13, §9.2 "PageTitle → NowList" |
| D-N4 | h1 is **"Now"** in both locales. The ES nav, footer and meta title also say "Now". | diseno §9.2 "Ahora / Now", copy-mvp §4.1 / §4.6 "Ahora" |
| D-N5 | Update line inside `.page-title`: date + city ("Rosario"), `<time datetime="2026-11-25">`. The nownownow link moves to a closing line. | diseno §8.13 HTML (link in the update line) |
| D-N6 | Claude writes the EN copy as a draft; the owner approves it. | skill "never translate yourself" (owner exception, as in the colophon) |
| D-N7 | Films: Latin American titles in ES, original titles in EN, links to es/en Wikipedia, no year. External: new tab, `rel="noopener"`, hidden notice. | — |
| D-N8 | Meta description is its own sentence (the "first list item" rule no longer fits). | diseno §9.2 |
| D-N9 | No visible rule before the closing line; space separates it. The closing line uses the `.now-updated` style. | the `---` in `design/now.md` |

## Step 0
- Hard: i18n + `npm run check` ✅ (0 errors) · shared components ✅ · `[locale]` routing ✅ (`src/pages/[locale]/[section].astro`, `now` in `src/i18n/routes.ts`)
- Soft: wireframe ✅ (`#ahora`) · §14.4 copy ✅ (new-tab notice in `site.footer.newTab`; "Mes de Actualizado en…" is footer-only) · linked files: none internal
- Failures: none

## Identity
- Routes: `/es/now/` · `/en/now/`
- h1: ES "Now" · EN "Now"
- Meta title: ES "Now · Juan Ignacio Werkalec" · EN "Now · Juan Ignacio Werkalec"
- Meta description: see Content
- OG: none yet (TODO "OG image", site-wide) · noindex: **no** (removed: the page has real content)
- Sources: `design/now.md` (owner draft) + this grilling · diseno §8.7, §8.13, §9.2, §10 · copy-mvp §4.7 (rewritten) · wireframe view `#ahora`
- Astro docs consulted:
  - https://docs.astro.build/en/guides/routing/#dynamic-routes
  - https://docs.astro.build/en/reference/routing-reference/#getstaticpaths
  - https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component (scoped styles: unique class names)
  - https://docs.astro.build/en/basics/astro-components/

## Skeleton
- SkipLink
- header (SiteHeader) · nav "Principal"/"Main" (`aria-current="page"` on "Now")
- main#contenido.page
  - header.page-title
    - h1 "Now"
    - p.now-updated: label + `<time datetime>` + " · " + city
  - section[aria-labelledby=now-work] h2 Trabajo / Work → p
  - section[aria-labelledby=now-building] h2 Construyendo / Building → ul (1 li, `<strong>` name)
  - section[aria-labelledby=now-learning] h2 Aprendiendo / Learning → ul (1 li, `<strong>` name)
  - section[aria-labelledby=now-offline] h2 Fuera del trabajo / Outside work → ul (3 li)
  - section[aria-labelledby=now-films] h2 Últimas películas / Latest films → ul (3 li, external links)
  - section[aria-labelledby=now-open] h2 Abierto a / Open to → p
  - p.now-updated (closing line, link on "página /now" / "/now page")
- footer (SiteFooter)

## Wireframe audit
`node .claude/skills/implement-page/scripts/audit-wireframe.mjs ahora`: one h1 "Ahora", no heading problems. Landmarks match the shared layout.

| What | Wireframe | Doc | Decision |
|---|---|---|---|
| h1 text | "Ahora" | §9.2 "Ahora / Now" | "Now" in both (D-N4) |
| `.now-updated` position | **after** `header.page-title` | §8.13 / page notes: **inside** `.page-title` | Follow the doc (inside) |
| Body | flat `ul.now-list` with 3 items | §8.13 NowList | h2 sections (D-N3, DEVIATION) |
| nownownow link | in the update line | §8.13 | Closing line (D-N5) |

### Raw values → tokens
| Value | Property · selector | Token | Note |
|---|---|---|---|
| 0.5rem | margin-top · `.now-updated` | `--space-2` | |
| clamp(0.75rem…0.78rem) | font-size · `.now-updated` | `--text-xs` | §8.13 |
| 3px | text-underline-offset · `.now-updated a` | — | Global `a` already sets it; not repeated |
| 1.25rem | gap · `.now-list` | `--space-5` | Not used (no NowList); see below |
| 2.75rem | margin-top · `.now-list` | `--space-10` | Used as the gap between blocks |
| 0.9375rem | font-size · `.now-list` | `--text-base` | Body default |
| 1.375rem | font-size · `.page-title h1` | `--text-lg` | PageTitle already |

Spacing chosen for the new structure (no wireframe for it): blocks separated by `--space-10`; items inside a block by `--space-2`; closing line `margin-top: --space-10`. Lists use `--leading-relaxed` (§8.13).

## Content
All keys under `now` in `Dictionary`. ES is the owner's draft, polished in the grilling and approved. **EN is a Claude draft (D-N6), pending owner review.**

| Element | Key | ES | EN |
|---|---|---|---|
| Meta title | `now.meta.title` | Now · Juan Ignacio Werkalec | Now · Juan Ignacio Werkalec |
| Meta description | `now.meta.description` | En qué estoy ahora: un billing service en Go, muay thai y charlas sobre problemas que la tecnología puede alivianar. | What I'm up to now: a billing service in Go, muay thai, and conversations about problems technology can lighten. |
| h1 | `now.title` | Now | Now |
| Update line | `now.updated.{label,date,place}` | Actualizado el · 25 de noviembre de 2026 · Rosario | Updated · November 25, 2026 · Rosario |
| h2 | `now.work.heading` | Trabajo | Work |
| p | `now.work.body` | Freelance. Con ganas de sumarme a un equipo para hacer crecer un producto. | Freelance. Keen to join a team and help grow a product. |
| h2 | `now.building.heading` | Construyendo | Building |
| li | `now.building.items[0]` | **Billing service**: un microservicio que envía recordatorios de pago, genera links de pago y lleva el estado de las cuotas de cada cliente. | **Billing service**: a microservice that sends payment reminders, creates payment links and tracks each client's installments. |
| h2 | `now.learning.heading` | Aprendiendo | Learning |
| li | `now.learning.items[0]` | **Go**: lo aprendo construyendo el billing service. | **Go**: I'm learning it by building the billing service. |
| h2 | `now.offline.heading` | Fuera del trabajo | Outside work |
| li ×3 | `now.offline.items` | Entreno muay thai: templa el cuerpo y la cabeza. · Le cocino al amor de mi vida. · Paseo a mi perro. | I train muay thai: it tempers body and mind. · I cook for the love of my life. · I walk my dog. |
| h2 | `now.films.heading` | Últimas películas | Latest films |
| li ×3 (links) | `now.films.items` | Asesinato en el Expreso de Oriente · Muerte en el Nilo · Cacería en Venecia (es.wikipedia) | Murder on the Orient Express · Death on the Nile · A Haunting in Venice (en.wikipedia) |
| Hidden new-tab notice | `site.footer.newTab` (existing) | (se abre en otra pestaña) | (opens in a new tab) |
| h2 | `now.openTo.heading` | Abierto a | Open to |
| p | `now.openTo.body` | Charlar sobre problemas donde la tecnología pueda alivianar el peso. | Talking through problems where technology can lighten the load. |
| Closing | `now.closing` (InlineLink) | Esta es una [página /now](https://nownownow.com/about): lo que tengo en foco en este momento. | This is a [/now page](https://nownownow.com/about): what I'm focused on right now. |
| Nav / footer label | `site.nav.now`, `site.footer.now` | Ahora → **Now** | Now |

Film URLs:
- ES: `https://es.wikipedia.org/wiki/Murder_on_the_Orient_Express_(pel%C3%ADcula_de_2017)`, `https://es.wikipedia.org/wiki/Muerte_en_el_Nilo_(pel%C3%ADcula_de_2022)`, `https://es.wikipedia.org/wiki/A_Haunting_in_Venice`
- EN: `https://en.wikipedia.org/wiki/Murder_on_the_Orient_Express_(2017_film)`, `https://en.wikipedia.org/wiki/Death_on_the_Nile_(2022_film)`, `https://en.wikipedia.org/wiki/A_Haunting_in_Venice`
(LatAm titles verified on es.wikipedia infoboxes, 2026-11-25. All six URLs return 200.)

The `datetime` value (`2026-11-25`) is a fact and lives next to the dictionary text: when the page is updated, change `now.updated.date` in both dictionaries and `NOW_UPDATED_ISO` in `NowPage.astro`.

## Components
| Section | Component (§8) | Props / variant | Exists? | Notes |
|---|---|---|---|---|
| Title + update line | PageTitle (§8.7) | `title`, new optional **slot** for the update line | ✅ (slot added) | Keeps `.now-updated` inside `.page-title` |
| Update / closing line | NowList `.now-updated` (§8.13) | — | Styles in `NowPage.astro` | |
| Block titles | SectionTitle (§8.7) | `label` variant | ✅ | |
| Blocks | — (`section` + `p`/`ul`) | — | Page markup | DEVIATION from §8.13 (D-N3) |

## States and edge cases
- Longer EN text: the closing and the Building item wrap with `text-wrap: pretty`.
- 320 px: nothing horizontal; long Wikipedia titles wrap.
- 200% zoom: single column, no fixed widths.
- Current nav link: "Now" gets `aria-current="page"` + dot (SiteNav, existing).
- External links: films and nownownow: `target="_blank" rel="noopener"` + visually hidden `site.footer.newTab`.
- Anchor / reduced motion: no anchors.
- Dark mode: tokens only; `--color-text-muted` for the update and closing lines.
- Missing data: every block is static; nothing optional.

## Metadata
- title / description ES and EN: see Content.
- Alternates: emitted by Layout (es, en, x-default).
- OG image: none (site-wide TODO).
- noindex: removed.

## Open items
- [x] **DEVIATION** D-N3/D-N5/D-N9 → diseno §8.13 (NowList is now "update line + h2 blocks + closing line"), §9.2 (h1 "Now", meta description sentence, sections), §2 route table and §8.3 nav sample ("Now"), §14.1 D13. Applied 2026-11-25.
- [ ] **PENDING (owner review)** EN copy drafted by Claude (D-N6): Work, Open to, Building, Learning, Outside work, closing, meta description.
- [x] copy-mvp: §4.7 rewritten with this copy; §2, §4.1 and §4.6 "Ahora" → "Now" (approved in the grilling, D-N1/D-N4).
- [x] design/pages/home.md D-HP3 marked as superseded by D-N4.

## Verification (step 8)
- check + build: `npm run check` 0 errors / 0 warnings; `npm run build` 21 pages, no errors.
- Headings ES: h1 Now → h2 Trabajo, Construyendo, Aprendiendo, Fuera del trabajo, Últimas películas, Abierto a. EN: h1 Now → h2 Work, Building, Learning, Outside work, Latest films, Open to. No heading problems.
- Landmarks: one real `<main id="contenido" class="page">` (the audit also lists the `<main>` inside HTML comments, same as /uses).
- noindex: absent in `dist/{es,en}/now/index.html`.
- Hardcoded text: no hits in `NowPage.astro`, `PageTitle.astro`, `[section].astro`.
- Raw values: no hex/rgb/hsl/oklch, no px/rem/em, no `style=`, no `[data-theme`/`[data-mode` in the touched files.
- Forbidden words: no output.
- Must not appear: no "JPMorgan" / "contratame" in `dist/*/now/`.
- Exact text ES / EN: rendered text matches the Content table (and copy-mvp §4.7).

### Code changes outside the page
- `PageTitle.astro`: optional default `<slot />` after the lead (keeps `.now-updated` inside `.page-title`).
- `[section].astro`: with `now` in `sectionPages` no placeholder key is left, so `PlaceholderKey` is `never`. `t.pages` is now read through `Partial<Record<SectionKey, PageMeta>>`; the placeholder fallback stays for future sections (case studies). `pages: {}` in both dictionaries.
- ES nav and footer label: "Ahora" → "Now" (D-N4).

## Done (owner)
- [ ] Side by side, desktop and mobile · [ ] Exact text ES/EN · [ ] Headings
- [ ] Keyboard · [ ] axe ES/EN · [ ] Modes · [ ] Widths and zoom · [ ] Language switch · [ ] Lighthouse ≥ 95
