# Page spec: Home (2026-11-24)

> **Status: ready for STOP 1.** The owner settled the doc conflicts in a grilling session on 2026-11-24 (see "Owner decisions"). The page follows **copy-mvp §2's structure** (Hero → Trabajo destacado), not diseno §9.1's. diseno §9.1 must be rewritten to match (see Open items).

## Owner decisions (2026-11-24)
They win over diseno and copy-mvp until those docs are updated (step 9).

| # | Decision | Overrides |
|---|---|---|
| D-H1 | **Structure: copy-mvp §2.** Hero → "Trabajo destacado" (Freelance, Harness, Split.io). No Proyectos/MiniCase/FactSheet section, no separate Experiencia section, no SectionLead | diseno §9.1 rows 2–3, §8.7 SectionLead, §8.9, §8.11 on home |
| D-H2 | **No hero CTA** ("Sin CTA", copy-mvp §4.2) | diseno §8.6/§9.1 "Ver proyectos →" |
| D-H3 | **Harness and Split.io are two separate rows, with no note.** The Harness line already says "Harness compró Split.io en 2024" | diseno §8.8/§14.4 note "fue un solo empleo, en dos etapas"; skill page-notes "one job in two stages" |
| D-H4 | **No closing paragraph.** LinkedIn lives only in the footer | copy-mvp §2 row 4 and §4.5; diseno §9.1 row 4 |
| D-H5 | **Work rows are static in the MVP:** no cover link and no "Proyecto:/Caso: … →" line. Links come back in the same change that publishes the first detail page | copy-mvp §4.4 "Cada entrada lleva a `/proyectos/{slug}`"; wireframe cards |
| D-H6 | **V1 lines** from copy-mvp §4.4 (V2 short descriptions aren't final) | wireframe V2 variant |
| D-H7 | **Heading:** ES "Trabajo destacado" · EN "Featured work" | wireframe "Trabajo" |
| D-H8 | **Freelance role EN:** "Full-Stack Engineer and Technical Lead" | copy-mvp §4.4 header (ES only) |
| D-H9 | **No OG image work on this page.** Moved to `TODO.md` as a site-wide item | copy-mvp §4.9 OG row (deferred, not dropped) |
| D-H10 | `site.footer.newTab` stays where it is (moot: home has no external link now) | — |
| D-H11 | Language-neutral facts (org names, ISO months) go in `src/data/home.ts`; all prose in the dictionary | — |

## Step 0
- Hard: i18n + `npm run check` ✅ (0 errors, 0 warnings, 0 hints) · shared components ✅ (`SkipLink`, `SiteHeader`, `SiteNav`, `LangSwitch`, `SiteFooter`) · `[locale]` routing ✅ (`src/pages/[locale]/index.astro` with `localeStaticPaths`)
- Soft: wireframe ✅ (`design/wireframes.html`, view `inicio`) · §14.4 copy for this page: the only §14.4 strings home still uses are the skip link and nav/lang labels, already in the dictionary ✅. The two new strings (D-H7, D-H8) are owner-approved but not yet in copy-mvp (see Open items) · linked files ✅ (home `main` links to nothing; the footer's `/cv-en.pdf` is in `public/`)
- Failures: none.

## Identity
- Routes: `/es/` · `/en/`
- h1: ES "Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente." · EN "I like building things. I own ambiguous features end to end with minimal hand-holding, and I sweat the details that separate good from great." (copy-mvp §4.2)
- Meta title: ES/EN "Juan Ignacio Werkalec · Senior Full-Stack Engineer" (copy-mvp §4.9; already in `home.meta.title`)
- Meta description: ES "Fullstack senior, foco en UI. Me dan lo ambiguo; lo entrego en producción." · EN "Senior full-stack engineer, UI-focused. Give me the ambiguous stuff; I'll ship it." (copy-mvp §4.9; already in `home.meta.description`)
- OG: none on this page (D-H9) · noindex: no
- Sources: copy-mvp §2, §4.2, §4.4, §4.9 · diseno §8.6, §8.7, §8.8 (components only; §9.1 is overridden by D-H1) · wireframe view: `#inicio`
- Astro docs consulted:
  - https://docs.astro.build/en/basics/astro-components/#component-props
  - https://docs.astro.build/en/guides/typescript/#component-props
  - https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component
  - https://docs.astro.build/en/reference/configuration-reference/#scopedstylestrategy
  - Routing, `getStaticPaths` and alternates: already covered in `reference/astro-mapping.md`.

## Skeleton
- SkipLink
- header (SiteHeader) · nav "Principal"/"Main" (no `aria-current`: home is not in the nav; the brand link goes home)
- main#contenido.page
  - section.hero.page__section
    - h1.hero__title (hero sentence)
  - section.page__section [aria-labelledby="work-title"]
    - h2.section-title#work-title "Trabajo destacado" / "Featured work"
    - ul.exp-list
      - li.exp-row ×3 (Freelance, Harness, Split.io)
        - span.exp-row__date → `<time datetime="2026-04">abr 2026</time> – actualidad`
        - div → p.exp-row__head (span.exp-row__org · span.exp-row__role) · p.exp-row__summary
- footer (SiteFooter, already built)

Headings: h1 → h2. One h1, no skipped levels. The id `work-title` is the same in both locales (it's never a URL fragment someone shares).

## Wireframe audit
`node .claude/skills/implement-page/scripts/audit-wireframe.mjs inicio`: headings `h2 Trabajo` only ("expected exactly one h1, found 0"). Landmarks: header, nav "Principal", main, 3 × article.mini-case, footer.

| What | Wireframe | Doc / decision | Decision |
|---|---|---|---|
| h1 | None. The hero is a `p.hero` | diseno §8.6: the hero sentence is the `h1` (D3) | Follow the doc |
| Hero CTA | None | D-H2: none | Matches |
| Section heading | `h2 "Trabajo"` | D-H7: "Trabajo destacado" / "Featured work" | Follow the decision |
| Work entries | 3 `article.mini-case` (= WorkBlock, §8.14 phase 2): whole-card cover link + meta line "org · role · period" + V1 line + "Proyecto:/Caso: … →" link | D-H5: static. ExperienceList §8.8: 2 columns, date left; mobile date on top | Follow §8.8. The cover link, inline link and hover card are **not built** |
| Entries shown | Freelance, Harness, Split.io (no MangooDev) | copy-mvp §4.4: the same three, in that order | Matches |
| Closing | `p.prose.mt-section` with link on "LinkedIn" | D-H4: removed | Not built |
| Mode toggle | `button.mode-toggle` in the header | diseno P4: no button | Not this page (shared header; already in `TODO.md`) |
| Rhythm taken from the wireframe | Hero at the top of `.page`; the work section separated by `--space-section`; the section title is a small muted label right above its list (`--space-2`) | diseno §7 and §8.7 say the same | Matches; nothing extra to take |

**Extra (not built):** WorkBlock (cover link, hover background, inline CTA links), the closing paragraph.
**Missing (built anyway):** the h1.

### Raw values → tokens
Only the rules for this page's content. Header and footer belong to the shared components, already built with tokens.

| Value | Property · selector | Token | Note |
|---|---|---|---|
| `clamp(1.375rem, 1.2870rem + 0.3756vw, 1.625rem)` | font-size · `.hero` | `--text-xl` | The doc's h1 size is larger (24→32 px vs 22→26 px). Follow the doc (D7) |
| `1.4` | line-height · `.hero` | `--leading-hero` (1.35) | Follow the doc |
| `-0.01em` | letter-spacing · `.hero` | `--tracking-tight` | Exact |
| `0.875rem` | font-size · `.section-title` | `--text-base` per §8.7 (wireframe = `--text-sm`) | Follow the doc |
| `0.5rem` | margin-bottom · `.section-title` | `--space-2` | Exact |
| `clamp(3rem, …, 4rem)` | margin-top · `.mt-section` | `--space-section` | Exact; via `.page__section + .page__section` in `layout.css` |
| `clamp(0.75rem, …, 0.78125rem)` | font-size · `.mini-case__meta` | `--text-xs` (§8.8 `.exp-row__date`) | Close; follow §8.8 |
| `0.9375rem` / `1.55` | font-size / line-height · `.mini-case__body` | `--text-base` / `--leading-normal` (§8.8 `.exp-row`) | Follow §8.8 |
| `0.5rem` | gap · `.mini-case-list` | `--space-3` row padding + border (§8.8) | Follow §8.8 |
| `1rem`, `6px`, `0.875rem`, `3px` | `.mini-case` padding/radius, `.cta-link--inline` | — | WorkBlock / inline link; not built |
| `min(69ch, 100% - 2 * 1.25rem)`, `clamp(2.5rem, …, 6rem)` | width, padding-top · `.page` | `--measure`, `--space-5`, `--space-page-top` | Already in `layout.css` |

No DEVIATION: every value the page uses maps to a token, and every rule comes from §8.6–§8.8.

## Content
Dictionary shape: `home.hero.title`, `home.work.heading`, `home.work.items[]` (`role`, `start`, `end`, `summary`). Language-neutral facts in `src/data/home.ts`: `{ id, org, startIso, endIso | null }[]` in display order (D-H11). The page zips the two arrays by index; both have exactly 3 entries (typed as a tuple so a length mismatch fails `npm run check`).

### Hero
| Element | Key | ES | EN | Source |
|---|---|---|---|---|
| h1 | `home.hero.title` | Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente. | I like building things. I own ambiguous features end to end with minimal hand-holding, and I sweat the details that separate good from great. | copy-mvp §4.2 |

### Trabajo destacado
| Element | Key | ES | EN | Source |
|---|---|---|---|---|
| h2 | `home.work.heading` | Trabajo destacado | Featured work | Owner, 2026-11-24 (D-H7). **Move to copy-mvp** |

| Row | Org (data) | Role ES | Role EN | Start ES · EN | End ES · EN | ISO | Source |
|---|---|---|---|---|---|---|---|
| 1 | Freelance | Full-Stack Engineer y Technical Lead | Full-Stack Engineer and Technical Lead | abr 2026 · Apr 2026 | actualidad · Present | `2026-04` → — | copy-mvp §4.4, §5; EN role: owner (D-H8), **move to copy-mvp** |
| 2 | Harness | Senior Frontend Engineer | Senior Frontend Engineer | jun 2024 · Jun 2024 | oct 2026 · Oct 2026 | `2024-06` → `2026-10` | copy-mvp §4.4 |
| 3 | Split.io | Senior Frontend Engineer | Senior Frontend Engineer | ene 2022 · Jan 2022 | jun 2024 · Jun 2024 | `2022-01` → `2024-06` | copy-mvp §4.4 |

| Row | Summary ES (`home.work.items[n].summary`) | Summary EN | Source |
|---|---|---|---|
| 1 | Plataforma de seguimiento clínico: web para terapeutas y app para pacientes, en producción. | Clinical follow-up platform: web console for therapists and a patient app, in production. | copy-mvp §4.4 Línea (V1) |
| 2 | Harness compró Split.io en 2024. Único ingeniero de UI y BFF: Configs, AI Configs, Promote, migración al monorepo. | Harness acquired Split.io in 2024. Sole UI and BFF engineer: Configs, AI Configs, Promote, monorepo migration. | copy-mvp §4.4 Línea (V1) |
| 3 | Carga de la pantalla de entrada: de 3–6 s a ~1 s. ~20 componentes compartidos. | Landing screen load: from 3–6 s to ~1 s. ~20 shared components. | copy-mvp §4.4 Línea (V1) |

Date markup: `<time datetime="{startIso}">{start}</time> – <time datetime="{endIso}">{end}</time>`; when `endIso` is null, the end ("actualidad"/"Present") is plain text, since it isn't a date. The " · " between org and role and the " – " between dates are punctuation in the component, as in §8.8's HTML.

Note on "BFF" in row 2: copy-mvp §1 says acronyms are spelled out the first time on each page. Under the old structure the SectionLead did it ("Backend for Frontend (BFF)"); with D-H1 the first "BFF" on home is now in this V1 line, unexpanded. **PENDING** (owner): keep as is, or amend the line in copy-mvp.

### Hidden text
- SkipLink, nav and language `aria-label`s: already in `site.*`.
- No new hidden text: no arrows, no external links, and the section is named by its h2 via `aria-labelledby`.

## Components
| Section | Component (§8) | Props / variant | Exists? | Notes |
|---|---|---|---|---|
| Hero | Hero §8.6 | `title` only | ☐ | No `cta` prop at all for now (D-H2): YAGNI. `.hero__cta` CSS is not copied |
| Section title | SectionTitle §8.7 | `id`, `text`; label variant (not `--strong`) | ☐ | Only `.section-title` CSS. PageTitle, `--strong` and SectionLead get built with the pages that use them |
| Work rows | ExperienceList §8.8 | `items: { org, role, start, end, startIso, endIso? }[]` | ☐ | No `note` prop (D-H3). Static, not clickable (D8) |

Not used on home anymore: CtaLink §8.10, MiniCase §8.9, FactSheet §8.11, SectionLead. The existing SkipLink, SiteHeader, SiteNav, LangSwitch and SiteFooter cover this page with no changes.

## States and edge cases
- **Longer EN text:** the EN hero is ~20% longer; it wraps with `text-wrap: pretty`, nothing is fixed-height. The EN role row 1 is longer than ES; `.exp-row` second column is `minmax(0, 1fr)` and wraps.
- **Date column width:** `--row-date-col` is 9.75rem (156 px). "abr 2026 – actualidad" in `--text-xs` mono is ~21 characters ≈ 164 px, so on desktop it likely **wraps to two lines** in ES. Check it in the build; if it wraps, that is a token question (propose a wider `--row-date-col`), not a local fix.
- **320 px:** below 48rem the date sits on top and "**Org** · role" wraps under it. Test row 1 in EN ("Full-Stack Engineer and Technical Lead").
- **200% zoom:** everything in rem and `ch`; at 200% on a 1440 window it drops to the mobile layout, which is expected.
- **Current nav link:** none on home. The brand link goes home.
- **External links:** none in `main`.
- **Anchor / reduced motion:** no anchors on home anymore.
- **Dark mode:** colors only through tokens; check the `--color-border` row separators stay visible in dark.
- **Missing data:** row 1 has no end date; it renders text, not an empty `<time>`.

## Metadata
- title / description ES and EN: already in `home.meta`, matching copy-mvp §4.9 word for word.
- Alternates: emitted by Layout (es, en, x-default). Canonical too.
- OG image: out of scope (D-H9; `TODO.md`).
- noindex: no (Layout's default).

## Open items
**Copy to add to copy-mvp (owner-approved 2026-11-24; needs OK to edit the file):**
- [ ] §4.4: section heading "Trabajo destacado" / "Featured work" (D-H7).
- [ ] §4.4: Freelance role EN "Full-Stack Engineer and Technical Lead" (D-H8).

**PENDING:**
- [ ] "BFF" is unexpanded on its first use on home (row 2 V1 line) against copy-mvp §1's acronym rule. Keep, or amend the line.

**Doc changes to propose at step 9 (not applied):**
- [ ] diseno §9.1: rewrite to Hero → Trabajo destacado (ExperienceList, 3 rows) per D-H1–D-H6.
- [ ] diseno §8.6: drop the CTA from the Hero. §8.7: "Dónde se usa" → SectionTitle on "Trabajo destacado"; SectionLead not on home. §8.8: used on home's "Trabajo destacado", 3 rows, no note; MangooDev only in /proyectos. §8.9/§8.11: home no longer uses them (case pages will).
- [ ] diseno §14.4: the note row is dropped (D-H3); "Proyectos/Experiencia" titles and the fact/mini-case labels move to the phase-2 pages.
- [ ] diseno P3 / §14.1: record that the owner reversed P3 in favour of copy-mvp §2.
- [ ] copy-mvp §2 and §4.5: the closing is removed (D-H4). §4.4: entries are static until their detail pages exist (D-H5).
- [ ] Skill `reference/page-notes.md` "home" notes: they describe the diseno structure; update them.
- [ ] First page built: propose marking diseno Annex A as stale (Next.js → Astro).

**Token proposal (needs OK, per the token rule):**
- [ ] `--row-date-col: 9.75rem` → `10.25rem` (164 px) in `foundations.css`, so "abr 2026 – actualidad" stays on one line on desktop. Site-wide: §8.8 rows are the only user today. Alternative: accept the two-line wrap.

**Build notes:**
- The two approved strings are in the dictionary; copy-mvp is not edited yet (needs OK).
- "BFF" left as copy-mvp has it, pending the owner's call.
- SectionTitle is muted (`--color-text-muted`) per diseno §8.7, while `.claude/rules/design-tokens.md` says "Headings use `--color-text`". Followed §8.7 (the wireframe agrees). **PENDING:** confirm, or switch to `--section-title--strong`-style text color.

**Owner changes after the build (2026-11-24):**
- Row 1 summary ES → "Del primer meeting a producción en ~6 meses: plataforma clínica web + app mobile que reemplaza las planillas de un centro de 150 pacientes."
- Row 2 summary ES → "Construí la UI para configurar agentes de IA y LLMs en tiempo real: ayudó a cerrar la brecha con LaunchDarkly en un producto con 500+ clientes." (500+ backed by the CV, `fase3/datos.md`.)
- Row 3 role ES/EN → "Frontend Engineer" (was "Senior Frontend Engineer"). Note: the CV and `fase3/datos.md` say Senior since Jan 2022; the owner chose the change.
- Row 3 summary ES → "Frontend de feature flags para 500+ clientes: segmentación avanzada para enterprise, archivado de flags para JPMorgan y carga de 3–6 s a ~1 s." The owner explicitly chose to name JPMorgan, reversing the 2026-11-20 restriction.
- [ ] Update the docs that still forbid it: copy-mvp §1 ("JPMorgan Chase: no aparece en la web"), `fase3/datos.md` (Feature Flag Archival row), and the skill's step 8 "Must not appear" list.
- [ ] **MISSING COPY:** EN summary for row 3 too.
- [ ] **MISSING COPY:** EN summaries for rows 1 and 2 (EN still shows the old V1 lines). Drafts offered: "From first meeting to production in ~6 months: a clinical web platform + mobile app that replaces a 150-patient center's spreadsheets." / "I built the UI to configure AI agents and LLMs in real time: it helped close the gap with LaunchDarkly in a product with 500+ customers."
- [ ] Open, not asked again: the new Harness line no longer mentions the acquisition (D-H3 relied on it; diseno §14.4 note available); "LLMs" unexpanded (copy-mvp §1); both new lines exceed copy-mvp §4.4's 15-word limit (~23 and ~25 words).
- [ ] copy-mvp §4.4 to update with all of the above.

**MISSING COPY:** none beyond the items above. **MISSING IN §8:** none. **DEVIATION:** none.

## Verification (step 8)
Run on 2026-11-24. Files touched: `src/components/{Hero,SectionTitle,ExperienceList}.astro`, `src/pages/[locale]/index.astro`, `src/data/home.ts`, `src/i18n/{types,es,en}.ts`.
- check + build: `npm run check` 24 files, 0 errors, 0 warnings, 0 hints · `npm run build` 15 pages, complete.
- Headings ES / EN: `h1` hero sentence → `h2` "Trabajo destacado" / "Featured work". "No heading problems" in both.
- Hardcoded text: no hits in the touched page and component files.
- Raw values: only `@media (width >= 48rem) /* --bp-md */` (allowed by the token rule). No hex, rgb/hsl/oklch, `style=`, mode selectors, or px/rem/em in spacing/type/radius.
- Forbidden words: no output.
- Exact text ES / EN: `main` text in `dist/es/` and `dist/en/` matches copy-mvp §4.2/§4.4 (and the two owner-approved strings) word for word. `<time datetime>` on every concrete month; "actualidad"/"Present" is plain text.
- Must not appear: no clinical client name, patient data, JPMorgan Chase, Harness screenshots or "contratame".
- Headless Chromium (dev server, light + dark): no horizontal overflow at 1440/375/320 in ES and EN. Dark-mode separators visible. **Date column:** ES row 1 "abr 2026 – actualidad" needs 164 px and `--row-date-col` is 156 px (9.75rem), so it wraps to two lines on desktop. All other dates fit (EN max 149 px). Proposed token change below; not applied.

## Done (owner)
- [ ] Side by side, desktop and mobile · [ ] Exact text ES/EN · [ ] Headings
- [ ] Keyboard · [ ] axe ES/EN · [ ] Modes · [ ] Widths and zoom · [ ] Language switch · [ ] Lighthouse ≥ 95
