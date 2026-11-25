# Process Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/es/proceso/` and `/en/process/` placeholder with the production-ready "Sobre mí" page from `design/proceso.html`: eyebrow, h1, lead, two button links (email, CV), a fact list, and a "De dónde vengo" section, in ES and EN.

**Architecture:** A new `ProcessPage.astro` registered in `sectionPages` (so `[section].astro` renders it and drops `noindex`). All prose lives in a new `process` key of the i18n dictionary; facts that are not prose (email, CV path) live in `src/data/contact.ts`. Two shared components are added or extended: a new `ButtonLink.astro` (primary/secondary pill) and a `variant="strong"` on `SectionTitle.astro`. The fact list is page-scoped markup and styles.

**Tech Stack:** Astro 7 (static), TypeScript, scoped `<style>` with design tokens. No test runner: "tests" are `npm run check`, `npm run build`, and greps/audits on `dist/`.

**Spec:** the decisions below come from the 2026-11-25 grilling session. Task 1 writes them into `design/pages/process.md`, which then becomes the spec executors read. Visual reference: `design/proceso.html` (a bundle; the Salvia desktop frame is the reference, and mobile is the same HTML below 48rem).

**Astro docs relied on:**
- https://docs.astro.build/en/reference/routing-reference/#getstaticpaths (the page is reached through the existing `[section].astro` `getStaticPaths` + props; no routing change)
- https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component (scoped styles do not reach child components; each component styles itself)
- https://docs.astro.build/en/basics/astro-components/#slots (ButtonLink label passed as the default slot)

## Global Constraints

- Branch first: `git checkout -b feat/process-page`. **No commits during tasks.** One commit is proposed at the end (Task 5) and made only after the owner's OK.
- All files, comments and commit messages in English. Spanish copy is quoted verbatim.
- Every CSS value is `var(--…)` (`.claude/rules/design-tokens.md`). Breakpoint: `@media (width >= 48rem) /* --bp-md */`.
- No visible or hidden string hard-coded in `.astro` files; prose comes from the dictionary. The decorative `↗` glyph inside `ButtonLink` is the only exception (it is `aria-hidden`).
- Owner decisions (they win over copy-mvp/diseno until those docs are updated):
  - D-PR1: The design's "Sobre mí" page is built at the existing `process` route (`/es/proceso/`, `/en/process/`). Slugs and nav label ("Proceso" / "Process") stay as they are. copy-mvp §4.10 is updated to describe this page.
  - D-PR2: Copy not yet written stays as the literal string `TBD`: the years in the h1, the English level, and the three "De dónde vengo" paragraphs. The build does not wait for it.
  - D-PR3: EN copy is translated by Claude from the ES copy (owner request, 2026-11-25). Marked "pending owner review" in copy-mvp.
  - D-PR4: The page ships as production-ready: **no `noindex`**, even with `TBD` strings.
  - D-PR5: The header mode toggle in the design is **out of scope** (shared header, open TODO item).
  - D-PR6: "Escribime" → `mailto:juan.werkalec+contactame@gmail.com`. "Ver CV" → `/cv-en.pdf`, same tab, same file in both locales (like the footer); `↗` is decorative.
  - D-PR7: New shared `ButtonLink.astro`; `SectionTitle` gets a `strong` variant; the fact list is a page-scoped `<dl>`. The h1 copies the Hero h1 tokens (the `Hero` component is not reused: it wraps itself in a `<section>`).
  - D-PR8: One new token, `--radius-full: 999px` (pill). Every other design value maps to an existing token (table in Task 4).
- Exact copy (ES / EN):

| Dictionary key | ES | EN |
|---|---|---|
| `process.meta.title` | Proceso · Juan Ignacio Werkalec | Process · Juan Ignacio Werkalec |
| `process.meta.description` | Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente. | I like building things. I take on ambiguous features with minimal hand-holding and care about the details that separate good from great. |
| `process.eyebrow` | Juan Ignacio Werkalec — Rosario, y remoto | Juan Ignacio Werkalec — Rosario, and remote |
| `process.title` (h1) | Ingeniero frontend y full-stack con TBD+ años construyendo productos digitales y aplicaciones web. | Frontend and full-stack engineer with TBD+ years building digital products and web applications. |
| `process.lead` | Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente. | I like building things. I take on ambiguous features with minimal hand-holding and care about the details that separate good from great. |
| `process.actions.email` | Escribime | Email me |
| `process.actions.cv` | Ver CV | View CV |
| `process.facts[0]` | Foco · Aplicaciones web, design systems, productos de punta a punta | Focus · Web applications, design systems, end-to-end products |
| `process.facts[1]` | Herramientas · TypeScript, React, Next.js, Node.js, GraphQL, Supabase | Tools · TypeScript, React, Next.js, Node.js, GraphQL, Supabase |
| `process.facts[2]` | Idiomas · Español (nativo), Inglés (TBD) | Languages · Spanish (native), English (TBD) |
| `process.origin.heading` | De dónde vengo | Where I come from |
| `process.origin.paragraphs` | `TBD`, `TBD`, `TBD` | `TBD`, `TBD`, `TBD` |

## Review Focus

1. **Long EN strings at 320 px:** the button row wraps instead of overflowing; fact values wrap inside their column (`min-width: 0`). No horizontal scroll.
2. **The `+` in the mailto:** the built href is exactly `mailto:juan.werkalec+contactame@gmail.com` (not `%2B`, not split).
3. **Dark mode buttons:** primary is `--color-text` on `--color-bg` (inverted in dark) and its hover is `--color-accent` background; both stay readable in light and dark.
4. **Keyboard:** both buttons show the global `:focus-visible` outline, and the tab order is h1 → Escribime → Ver CV → footer.
5. **Language switch and nav:** on `/es/proceso/` the switch points to `/en/process/`, and "Proceso" in the nav has `aria-current="page"` (existing behavior, now on a real page).

Each line has a check in Task 5.

---

### Task 1: Spec and copy docs

**Files:**
- Create: `design/pages/process.md`
- Modify: `design/copy-mvp.md` (§4.10 table, `/proceso` row, around line 295)

**Interfaces:**
- Produces: the spec every later task reads (decisions D-PR1…D-PR8 and the copy table).

- [ ] **Step 1: Write `design/pages/process.md`** following the shape of `design/pages/uses.md`: status line ("owner accepted all recommendations on 2026-11-25 and asked to build end to end without stops"), the D-PR1…D-PR8 table, Identity (routes, h1, meta, noindex: no, sources: `design/proceso.html` frame "Sobre mí · Salvia", copy-mvp §4.10, the three Astro docs URLs above), the copy table, and an Open items list: `TBD` years, `TBD` English level, `TBD` origin paragraphs, EN pending owner review, mode toggle (TODO), diseno §2/§9 still call Proceso "fase 2" / "Falta".
- [ ] **Step 2: Update copy-mvp §4.10** `/proceso` row: structure becomes "Sobre mí: eyebrow · h1 · bajada · Escribime / Ver CV · Foco / Herramientas / Idiomas · De dónde vengo (3 párrafos)"; source becomes "Copy en `design/pages/process.md` (2026-11-25). EN traducido por Claude, pendiente de revisión. TBD: años, nivel de inglés, párrafos". Leave the rest of the table untouched.
- [ ] **Step 3: Verify** `grep -n 'proceso' design/copy-mvp.md` shows the new row text.

### Task 2: Token and contact facts

**Files:**
- Modify: `src/styles/foundations.css` (Shape block, after `--radius-md`)
- Modify: `src/data/styleguide.ts` (`radii` array)
- Create: `src/data/contact.ts`
- Modify: `src/components/SiteFooter.astro` (CV href)

**Interfaces:**
- Produces: `--radius-full` (CSS); `export const contactEmail: string` and `export const cvHref: string` from `src/data/contact.ts`.

- [ ] **Step 1:** Add `--radius-full: 999px;` with the comment `/* Pill: buttons. */` to `foundations.css`, and `['--radius-full', '999px']` to `radii` in `styleguide.ts` (the styleguide page then shows it).
- [ ] **Step 2:** Create `src/data/contact.ts` with `contactEmail = 'juan.werkalec+contactame@gmail.com'` and `cvHref = '/cv-en.pdf'`, one doc comment saying both locales use the EN CV until an ES one exists.
- [ ] **Step 3:** Replace the `'/cv-en.pdf'` literal in `SiteFooter.astro` with `cvHref`.
- [ ] **Step 4: Verify** `npm run check` → 0 errors, and `grep -rn "cv-en.pdf" src` returns only `src/data/contact.ts`.

### Task 3: Dictionary + semantic page, registered

Dictionary type, both locales and the page registration change together: once `process` is in `sectionPages`, `PlaceholderKey` drops it and `pages.process` in `es.ts`/`en.ts` becomes a type error.

**Files:**
- Modify: `src/i18n/types.ts`, `src/i18n/es.ts`, `src/i18n/en.ts`
- Create: `src/components/pages/ProcessPage.astro`
- Modify: `src/components/pages/sectionPages.ts`

**Interfaces:**
- Consumes: `contactEmail`, `cvHref` (Task 2).
- Produces:
  ```ts
  /** One fact-list row: label and value. */
  export interface Fact { label: string; value: string }
  // in Dictionary:
  process: {
    meta: PageMeta;
    eyebrow: string;
    /** The page's h1. */
    title: string;
    lead: string;
    actions: { email: string; cv: string };
    /** Same order in both locales. */
    facts: readonly [Fact, Fact, Fact];
    origin: { heading: string; paragraphs: readonly [string, string, string] };
  };
  ```
  `ProcessPage` takes `{ locale: Locale }` like every other page.

- [ ] **Step 1:** Add `Fact` and `process` to `types.ts`; add the `process` block to `es.ts` and `en.ts` with the exact copy table; remove `process` from `pages` in both.
- [ ] **Step 2:** Create `ProcessPage.astro` with semantic HTML only (no styles yet), top to bottom: `<main id="contenido" class="page">` → `p` eyebrow → `h1` → `p` lead → `div` with two plain `<a>` (`mailto:${contactEmail}`, `cvHref`) → `<dl>` with one `div > dt + dd` per fact → `<section aria-labelledby="origin">` with `<SectionTitle id="origin" text={…} />` and one `<p>` per paragraph. Header comment: `/** Process (/es/proceso/, /en/process/): the "Sobre mí" page (design/pages/process.md). */`
- [ ] **Step 3:** Register `process: ProcessPage` in `sectionPages.ts`.
- [ ] **Step 4: Verify** `npm run check && npm run build` → 0 errors; `grep -c 'noindex' dist/es/proceso/index.html dist/en/process/index.html` → `0` for both; the page reads correctly top to bottom with styles off.

### Task 4: Components and styles

**Files:**
- Create: `src/components/ButtonLink.astro`
- Modify: `src/components/SectionTitle.astro`
- Modify: `src/components/pages/ProcessPage.astro`

**Interfaces:**
- Produces: `ButtonLink` props `{ href: string; variant: 'primary' | 'secondary'; arrow?: boolean }`, label in the default slot, `arrow` appends `<span aria-hidden="true">↗</span>`. `SectionTitle` gains `variant?: 'label' | 'strong'` (default `'label'`, current behavior unchanged).

Token map (design value → token), the only source for values in this task:

| Element | Design | Token |
|---|---|---|
| Eyebrow | mono, `--text-sm`, `--leading-normal`, muted | `--font-accent`, `--text-sm`, `--leading-normal`, `--color-text-muted` |
| h1 | Hero h1 | `--text-xl`, `--weight-regular`, `--leading-hero`, `--tracking-tight`, `text-wrap: pretty`, `margin-top: var(--space-6)` |
| Lead | `.prose` | `--text-md`, `--leading-relaxed`, `margin-top: var(--space-6)` |
| Button row | gap 0.75rem, mt 2rem, wraps | `--space-3`, `--space-8` |
| ButtonLink | min-height tap, pad-x 1.25rem, pill, mono `--text-sm`, line-height 1, gap 0.5rem | `--tap-min`, `--space-5`, `--radius-full`, `--font-accent`, `--text-sm`, `--leading-tight`, `--space-2`; `text-decoration: none` |
| primary | bg text / fg bg; hover bg accent | `--color-text` / `--color-bg`; `--color-accent` |
| secondary | bg surface, inset 1px border; hover fg accent | `--color-surface`, `box-shadow: inset 0 0 0 var(--border-width) var(--color-border)`, `--color-accent` |
| Fact list | mt section, border-top, mono `--text-xs`, row pad-block 1rem + border-bottom, gap 1rem | `--space-section`, `--border-width` + `--color-border`, `--font-accent`, `--text-xs`, `--leading-normal`, `--space-4` |
| dt | muted, width label col; ≥48rem date col | `--color-text-muted`, `--fact-label-col`, `--row-date-col` |
| dd | text, `flex: 1; min-width: 0` | `--color-text` |
| Origin section | mt section, column gap 1rem | `--space-section`, `--space-4` |
| SectionTitle strong | `--text-md`, semibold, text, no bottom margin | `--text-md`, `--weight-semibold`, `--color-text` |
| Origin paragraphs | `.prose` | `--text-md`, `--leading-relaxed`, `text-wrap: pretty` |

- [ ] **Step 1:** Create `ButtonLink.astro` with the props above and the scoped styles from the table. Focus comes from the global `:focus-visible` in `base.css`; don't restyle it.
- [ ] **Step 2:** Add `variant` to `SectionTitle.astro`; `strong` skips the `section-title--spaced` margin and applies the strong styles. Existing call sites stay unchanged.
- [ ] **Step 3:** In `ProcessPage.astro`, swap the two `<a>` for `<ButtonLink variant="primary">` / `<ButtonLink variant="secondary" arrow>`, pass `variant="strong"` to `SectionTitle`, and add the scoped page styles from the table.
- [ ] **Step 4: Verify** `npm run check && npm run build` → 0 errors, and the token-rule searches from `.claude/rules/design-tokens.md` ("Before finishing any style change") on the three files → no raw values except `999px` in `foundations.css`.
- [ ] **Step 5:** Compare with the design side by side (`astro dev --background`, open `/es/proceso/`, and open `design/proceso.html` in a browser: its third frame is desktop 1440 and its fourth is mobile 375) at those two widths.

### Task 5: Verify, docs, close

**Files:**
- Modify: `design/pages/process.md` (results), `TODO.md`

- [ ] **Step 1: Run** `npm run check && npm run build` → 0 errors.
- [ ] **Step 2: Headings:** `node .claude/skills/implement-page/scripts/audit-wireframe.mjs --html dist/es/proceso/index.html` and the same for `dist/en/process/index.html` → one h1, then one h2, no skipped levels.
- [ ] **Step 3: Hardcoded text:** `grep -nE '>[^<{}[:space:]][^<{}]*<' src/components/pages/ProcessPage.astro src/components/ButtonLink.astro src/components/SectionTitle.astro` → only the `↗` span.
- [ ] **Step 4: Forbidden words:** the grep from `.claude/skills/implement-page/SKILL.md` Step 8 on `src/i18n/*.ts` → no output.
- [ ] **Step 5: Review Focus checks:** `grep -o 'href="mailto:[^"]*"' dist/es/proceso/index.html` → `href="mailto:juan.werkalec+contactame@gmail.com"`; `grep -o 'hreflang="en" href="[^"]*"' dist/es/proceso/index.html` → `…/en/process/`; `grep -c 'aria-current="page"' dist/es/proceso/index.html` → `1`. In the browser: 320 px with no horizontal scroll (EN), dark mode (`data-mode="dark"` on `<html>`) buttons readable plus hover, and Tab order h1 → Escribime → Ver CV.
- [ ] **Step 6: Docs:** paste the results into `design/pages/process.md`; in `TODO.md`, add a `Process` row to the MVP table (Spec ✅, Built ES ✅, Built EN ✅, Verified ☐, Doc updated ✅), change "Replace the placeholder pages (process, now)" to name only `now`, and add "- [ ] Process page: replace the `TBD` copy (years, English level, origin paragraphs) and review the EN translation."
- [ ] **Step 7: Propose** the diseno changes (§2 row "Proceso": copy "Falta" → "Sí (con TBD)", MVP "No (fase 2)" → "Sí"; P2 scope) without applying them, and propose the commit `feat(process): Process ("Sobre mí") page in ES and EN`. Wait for the owner's OK before either.
