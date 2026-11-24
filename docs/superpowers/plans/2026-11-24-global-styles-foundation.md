# Global styles foundation — Implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every token, the global semantic styles, the page skeleton and both typefaces are in place, and a permanent `/styleguide` page shows them, so the HTML (components and pages) can be written next.

**Architecture:** Three layers. (1) **Tokens:** colors per theme in `src/styles/themes/*.css`, `color-scheme` in `modes.css`, everything else in `foundations.css`. (2) **Global styles:** `base.css` styles plain HTML elements; `layout.css` holds the page skeleton classes that pages (not components) use. (3) **Component styles** are **out of scope**: each component gets its scoped `<style>` (or a sibling `.css`) when it is built, copied from §8 of the design doc. The fonts load through the Astro Fonts API, from local woff2 files, and are independent of theme and mode.

**Tech Stack:** Astro 7.4 (Fonts API, `<Font />` from `astro:assets`), plain CSS (`light-dark()`, `color-scheme`, oklch, `clamp()`), fontTools (one-time woff2 conversion).

**Spec:** `design/diseno-juaniw.md` (§3 visual decisions, §4 typography, §5 tokens, §6 base styles, §7 layout, §11 contrast). Decisions that override or extend it come from the grilling session on 2026-11-24 and are copied into Global Constraints. Repo rules that apply: `.claude/rules/design-tokens.md` (tokens only, never raw values) and `CLAUDE.md` (all docs and comments in English). The previous plan, `docs/superpowers/plans/2026-11-24-theme-modo-dia-noche.md`, built the theme and mode mechanism that this plan extends.

**Astro docs consulted (astro-docs MCP):**
- Local font provider, `variants`, variable weight range, and the warning against keeping fonts in `public/`: https://docs.astro.build/en/reference/font-provider-reference/#local
- Configuring and applying custom fonts with `<Font cssVariable>`: https://docs.astro.build/en/guides/fonts/#configuring-custom-fonts and https://docs.astro.build/en/guides/fonts/#applying-custom-fonts
- Variable fonts (`weight: "200 800"`): https://docs.astro.build/en/guides/fonts/#using-variable-fonts
- Preloading with `<Font preload />`: https://docs.astro.build/en/guides/fonts/#preloading-fonts
- Fallbacks and optimized fallbacks: https://docs.astro.build/en/guides/fonts/#customizing-font-fallbacks and https://docs.astro.build/en/reference/configuration-reference/#fonts
- Global CSS via `import` in the layout frontmatter; scoped `<style>` does not reach slotted or child-component markup: https://docs.astro.build/en/guides/styling/#external-styles and https://docs.astro.build/en/guides/styling/#scoped-styles

## Global Constraints

- **Token rule:** literal values (colors, sizes, font names, weights) only in `src/styles/themes/*.css`, `src/styles/modes.css` and `src/styles/foundations.css`. Everywhere else, `var(--token)` only. `[data-theme` / `[data-mode` selectors only in the theme files and `modes.css`.
- **Theme/mode scope stays on `:root`** (decision Q7/Q12): keep the existing selectors `:root, :root[data-theme="salvia"]`, `:root[data-theme="brasa"]`, `:root[data-mode=...]`, and the existing `is:inline` script in `Layout.astro` unchanged. Not the any-container selectors from §5.4 of the spec.
- **Both themes complete:** salvia and brasa get every color role of §5.1. Brasa uses `--color-focus: var(--color-accent)` (correction D6).
- **Fonts:** Atkinson Hyperlegible Next **variable, roman only** + Commit Mono **400 and 700 regular** (the owner's custom build, ss03–ss05 baked in). No italics, no Atkinson statics. Files in `src/assets/fonts/`, woff2 only, plus their OFL license files. Nothing font-related stays in `public/`.
- **Font CSS variables:** `--font-sans` (Atkinson) and `--font-mono` (Commit Mono), set by the Fonts API. Fallbacks `["sans-serif"]` and `["monospace"]`. Both preloaded.
- **New tokens (approved, Q8):** `--weight-regular: 400`, `--weight-semibold: 600`, `--weight-bold: 700`. Breakpoint documented as a comment `--bp-md: 48rem`; every media query is written `@media (width >= 48rem) /* --bp-md */` (or `width < 48rem`).
- **Heading defaults (Q11):** `h1` = `--text-lg`, `--weight-semibold`, `--leading-tight`, `--tracking-tight`. `h2, h3` = `--text-md`, `--weight-semibold`, `--leading-tight`. Components (Hero, SectionTitle) override them later.
- **`/styleguide`:** permanent, Spanish, indexable, not in the nav. Shows the active theme and mode only (no side-by-side). Copy addressed to the reader, no voseo needed (it's documentation for visitors).
- **No component styles in this plan** (Q10). No SkipLink, header, footer, hero, etc.
- All code comments, commit messages and `TODO.md` in English.
- Verification: `npm run build` must pass, plus the grep checks each task lists. Visual checks are done by the owner in the browser.

## Review Focus

1. **The font fails or is slow:** text must render immediately in the fallback, with no invisible text and minimal shift. Task 1 checks that the generated `@font-face` has `font-display: swap` and that a fallback face is generated.
2. **Narrow screens (320 px):** long token values (`clamp(2.5rem, 1.2676rem + 5.2582vw, 6rem)`) in the styleguide must wrap, not cause horizontal scroll. Task 4 sets `overflow-wrap: anywhere` on value cells and checks at 320 px.
3. **Brasa via `localStorage.theme = "brasa"`:** every color must change, not just the background. Task 2 checks that both theme files declare the same 10 token names.
4. **The `→` glyph:** the design always puts the arrow in the mono font; Commit Mono must contain U+2192. Task 1 checks the cmap.
5. **User font size 200 %:** sizes are in rem, so everything scales. Task 4's manual check includes browser zoom at 200 %.

---

### Task 1: Fonts (woff2, Fonts API, global)

**Files:**
- Delete: `public/assets/fonts/` (whole folder; currently staged, never committed)
- Create: `src/assets/fonts/atkinson-hyperlegible-next/AtkinsonHyperlegibleNext-Variable.woff2`, `.../OFL.txt`
- Create: `src/assets/fonts/commit-mono/CommitMono-400.woff2`, `.../CommitMono-700.woff2`, `.../license.txt`
- Modify: `astro.config.mjs`
- Modify: `src/layouts/Layout.astro` (head only)

**Interfaces:**
- Produces: CSS custom properties `--font-sans` and `--font-mono` on every page that uses `Layout.astro` (their values already include the fallbacks). Task 2 consumes them.

- [ ] **Step 1: Install fontTools (one-time, outside the project)**

Run: `python3 -m pip install --user fonttools brotli`
Expected: `Successfully installed ...` (or "already satisfied").

- [ ] **Step 2: Check the variable axis and the arrow glyph before converting**

Run against the source files in `public/assets/fonts/`: print Atkinson's `fvar` `wght` axis min/max, and whether `0x2192` is in the cmap of both Commit Mono files (`fontTools.ttLib.TTFont(path)['fvar'].axes` and `.getBestCmap()`).
Expected: `wght 200 800` for Atkinson (if different, use the real range in Step 4); `True` for the arrow in both Commit Mono files. If the arrow is missing, stop and tell the owner.

- [ ] **Step 3: Convert to woff2 and move**

`python3 -m fontTools.ttLib.woff2 compress -o <dest> <src>` for:
- `Atkinson_Hyperlegible_Next/AtkinsonHyperlegibleNext-VariableFont_wght.ttf` → `src/assets/fonts/atkinson-hyperlegible-next/AtkinsonHyperlegibleNext-Variable.woff2`
- `CommitMonoV143/CommitMono-400-Regular.otf` → `src/assets/fonts/commit-mono/CommitMono-400.woff2`
- `CommitMonoV143/CommitMono-700-Regular.otf` → `src/assets/fonts/commit-mono/CommitMono-700.woff2`

Copy `Atkinson_Hyperlegible_Next/OFL.txt` and `CommitMonoV143/license.txt` next to their woff2. Then `git rm -r --cached public/assets/fonts` and delete the folder.
Expected: `ls -la src/assets/fonts/*` shows 3 woff2 files, each smaller than its source.

- [ ] **Step 4: Register the fonts in `astro.config.mjs`**

Import `fontProviders` from `astro/config`. Add a `fonts` array with two families, both `provider: fontProviders.local()`:
- `name: "Atkinson Hyperlegible Next"`, `cssVariable: "--font-sans"`, `fallbacks: ["sans-serif"]`, one variant `{ weight: "200 800", style: "normal", src: ["./src/assets/fonts/atkinson-hyperlegible-next/AtkinsonHyperlegibleNext-Variable.woff2"] }`.
- `name: "Commit Mono"`, `cssVariable: "--font-mono"`, `fallbacks: ["monospace"]`, two variants: weight `400` and `700`, `style: "normal"`, each with its woff2.

- [ ] **Step 5: Load them globally in `Layout.astro`**

`import { Font } from 'astro:assets'` and, in `<head>` right after the viewport meta, `<Font cssVariable="--font-sans" preload />` and `<Font cssVariable="--font-mono" preload />`. Leave the theme script and everything else untouched.

- [ ] **Step 6: Build and check the output**

Run: `npm run build`
Expected: build succeeds, no font warnings.

Run: `grep -o 'font-display:[a-z]*' dist/index.html | sort -u; grep -c 'rel="preload"' dist/index.html; ls dist/_astro/fonts`
Expected: `font-display:swap` (if Astro emits another value, set the family option `display: "swap"` on both fonts and rebuild); at least 3 preloads (one per woff2); the woff2 files exist under `dist/_astro/fonts`. If the generated CSS is not inline, grep the `dist/_astro/*.css` files instead.

- [ ] **Step 7: Commit**

```bash
git add -A public/assets src/assets/fonts astro.config.mjs src/layouts/Layout.astro
git commit -m "feat: load Atkinson Hyperlegible Next and Commit Mono via the Astro Fonts API"
```

---

### Task 2: Tokens (colors for both themes + foundations)

**Files:**
- Modify: `src/styles/themes/salvia.css`
- Modify: `src/styles/themes/brasa.css`
- Create: `src/styles/foundations.css`

**Interfaces:**
- Consumes: `--font-sans`, `--font-mono` (Task 1).
- Produces (all on `:root`; Tasks 3 and 4 use exactly these names):
  - Color (per theme): `--color-bg`, `--color-surface`, `--color-border`, `--color-text-muted`, `--color-text`, `--color-accent`, `--color-accent-hover`, `--color-focus`, `--color-selection`, `--color-on-selection`
  - Fonts: `--font-body` (= `var(--font-sans)`), `--font-accent` (= `var(--font-mono)`)
  - Weights: `--weight-regular`, `--weight-semibold`, `--weight-bold`
  - Type: `--text-2xs`, `--text-xs`, `--text-sm`, `--text-nav`, `--text-base`, `--text-md`, `--text-lg`, `--text-xl`, `--leading-tight`, `--leading-hero`, `--leading-normal`, `--leading-relaxed`, `--tracking-tight`, `--tracking-caps`
  - Space: `--space-1` … `--space-8`, `--space-10`, `--space-page-top`, `--space-section`, `--space-footer-top`, `--space-footer-bottom`, `--gutter`
  - Layout and shape: `--measure`, `--header-height`, `--tap-min`, `--row-date-col`, `--fact-label-col`, `--table-cat-col`, `--table-item-col`, `--radius-sm`, `--radius-md`, `--dot-size`, `--border-width`, `--focus-width`, `--focus-offset`, `--underline-offset`

- [ ] **Step 1: Complete `salvia.css`**

Keep the selector `:root, :root[data-theme="salvia"]` and the header comment. Add the 9 missing tokens with the exact salvia values of spec §5.4 (`light-dark(<day>, <night>)`; focus, selection and on-selection as derived values exactly as in §5.4).

- [ ] **Step 2: Complete `brasa.css`**

Keep the selector `:root[data-theme="brasa"]`. Add the 9 missing tokens with the exact brasa values of §5.4 (`--color-focus: var(--color-accent)`).

- [ ] **Step 3: Check both themes declare the same names**

Run: `diff <(grep -o -- '--color-[a-z-]*:' src/styles/themes/salvia.css | sort) <(grep -o -- '--color-[a-z-]*:' src/styles/themes/brasa.css | sort) && grep -c -- '--color-' src/styles/themes/salvia.css`
Expected: no diff output, count `10`.

- [ ] **Step 4: Create `foundations.css`**

One `:root` block with every non-color token listed in Interfaces, values copied verbatim from spec §5.4 (`:root` block), except: `--font-body: var(--font-sans)` and `--font-accent: var(--font-mono)` (the Fonts API values already carry the fallbacks), plus the three weight tokens. Group with short English comments (fonts, weights, type, space, layout, shape). At the top, a comment documenting the breakpoint: `--bp-md: 48rem` is not a usable custom property inside `@media`, so queries write `48rem` with a `/* --bp-md */` comment.

- [ ] **Step 5: Commit**

```bash
git add src/styles
git commit -m "feat: complete color tokens for salvia and brasa; add foundations tokens"
```

(No build check yet: nothing imports `foundations.css` until Task 3.)

---

### Task 3: Global semantic styles and page skeleton

**Files:**
- Create: `src/styles/base.css`
- Create: `src/styles/layout.css`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: all tokens from Task 2.
- Produces:
  - Global classes: `.visually-hidden`, `.page`, `.page__section`, `.site-footer-wrap`.
  - `Layout.astro` props: `interface Props { title: string; description?: string; lang?: 'es' | 'en' }`, `lang` defaults to `'es'`. Renders `<html lang={lang}>`, `<title>{title}</title>`, and `<meta name="description">` only when `description` is set.

- [ ] **Step 1: `base.css`**

The rules of spec §6 (`styles/base.css` block) with these changes: `strong { font-weight: var(--weight-semibold) }`; add the heading defaults from Global Constraints (`h1`; `h2, h3`), all `color: var(--color-text)`; add `table { border-collapse: collapse; }`. Everything else verbatim from §6.

- [ ] **Step 2: `layout.css`**

From spec §7 (`styles/layout.css` block) only: the `body` flex rules, `.page`, `.page__section + .page__section`, `.site-footer-wrap`. **Leave out** every `.site-header*` rule: it belongs to the SiteHeader component.

- [ ] **Step 3: `Layout.astro`**

Frontmatter imports, in this order: `themes/salvia.css`, `themes/brasa.css`, `modes.css`, `foundations.css`, `base.css`, `layout.css`. Add the `Props` interface above. Delete the whole `<style>` block (its `height: 100%` breaks the body flex column, and `base.css` already paints the background).

- [ ] **Step 4: `index.astro`**

Pass `title="Juan Ignacio Werkalec"` to `<Layout>` (the real home comes later).

- [ ] **Step 5: Build and run the token-rule checks**

Run: `npm run build`
Expected: succeeds.

Run (from `.claude/rules/design-tokens.md`):
```bash
grep -nE '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(|oklch\(|color-mix\(' src/styles/base.css src/styles/layout.css src/layouts/Layout.astro src/pages/*.astro
grep -nE '(margin|padding|gap|font-size|line-height|border-radius|top|left|right|bottom)[a-z-]*:\s*[^;]*[0-9.]+(px|rem|em)\b' src/styles/base.css src/styles/layout.css
grep -n '\[data-theme\|\[data-mode' src/styles/base.css src/styles/layout.css src/pages/*.astro
```
Expected: no output from any of the three.

- [ ] **Step 6: Commit**

```bash
git add src/styles src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: global semantic styles, page skeleton, and layout props"
```

---

### Task 4: `/styleguide` page and TODO

**Files:**
- Create: `src/pages/styleguide.astro`
- Modify: `TODO.md`

**Interfaces:**
- Consumes: `Layout` props (Task 3), every token (Task 2), global classes (Task 3).

- [ ] **Step 1: Page skeleton**

`<Layout title="Styleguide · Juan Ignacio Werkalec" description="Los tokens y estilos base de juaniw.com." lang="es">` → `<main id="contenido" class="page">` with a `<header>` holding an `h1` "Styleguide" and a short paragraph: what it shows, and that it shows the theme and mode currently active (the mode follows the system). Then one `<section class="page__section">` per block below, each with an `h2`. Token lists live as arrays in the frontmatter (name + value string copied from `foundations.css` / the theme files) and are rendered with `.map()`. Data, not markup by hand.

- [ ] **Step 2: Sections, in order**

1. **Color:** one row per color token: a swatch (`style={`background: var(${name})`}`; the inline style may only contain `var()`), the token name in `<code>`, its use (from the §5.1 table, in Spanish). Below, the contrast tables of §11.1 for salvia and brasa as a real `<table>` (data copied from the spec).
2. **Tipografía:** both families with their weights (Atkinson 400/600/700, Commit Mono 400/700), using real copy from `design/copy-mvp.md` (for example the hero line), a mono sample with `Ver proyectos →`, then every `--text-*` token rendered at its size with its name and value.
3. **Espaciado:** one bar per `--space-*` token (width = the token, height `var(--space-2)`, color `var(--color-text-muted)`), with name and value.
4. **Elementos:** plain HTML with no classes: `h1`, `h2`, `h3`, a paragraph with a link and a `<strong>`, a `<ul>`, a `<table>` with `<caption>`, and a line inviting the reader to select text and tab through the links (selection and focus).
5. **Forma:** `--radius-sm`, `--radius-md`, `--border-width`, focus ring (`--focus-width`, `--focus-offset`), `--measure`.

- [ ] **Step 3: Scoped `<style>` for the page's own layout**

Only tokens. Value cells (`<code>`) get `overflow-wrap: anywhere` (Review Focus 2). Use `font-family: var(--font-accent)` and `font-size: var(--text-xs)` for token names and values. If a value you need has no token, stop and propose one to the owner (token rule), don't write a literal.

- [ ] **Step 4: Build and checks**

Run: `npm run build` → succeeds and `dist/styleguide/index.html` exists.
Run the three greps of Task 3 Step 5 against `src/pages/styleguide.astro` → no output. Additionally, `grep -n 'style=' src/pages/styleguide.astro` shows only `var(` values.

- [ ] **Step 5: Manual check (owner)**

Run: `astro dev --background`, open `/styleguide`. Check: light and dark (switch the OS mode with the page open); `localStorage.setItem('theme','brasa')` + reload changes every color; 320 px wide with no horizontal scroll; zoom 200 %; Tab shows the focus ring on every link; the arrow renders in Commit Mono. Stop with `astro dev stop`.

- [ ] **Step 6: Update `TODO.md`**

- Check off "Remaining color tokens …".
- Replace "Create src/styles/foundations.css …" with a checked item: done, typography, spacing, radii and layout (motion tokens still pending, with the transition item).
- Add: "Components page: a page that lists every component (SkipLink, SiteHeader, SiteNav, LangSwitch, SiteFooter, Hero, PageTitle/SectionTitle, ExperienceList, MiniCase, CtaLink, FactSheet, DataTable, NowList) with its states, once they exist."
- Add: "Make /styleguide bilingual (ES/EN) once i18n routing exists."
- Add: "Link /styleguide from the footer or the colophon."
- Add: "Components: write each component's styles in its own scoped `<style>` (or a sibling .css), copied from design/diseno-juaniw.md §8."

- [ ] **Step 7: Commit**

```bash
git add src/pages/styleguide.astro TODO.md
git commit -m "feat: add permanent /styleguide page; update TODO"
```
