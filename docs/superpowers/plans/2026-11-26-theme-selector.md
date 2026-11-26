# Theme and mode selector — Implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A control on the right of the header opens a popover where the visitor picks a theme (Salvia, Brasa) and a mode (Day, Night). The page changes instantly, with a short cross-fade, and the choice persists across pages and visits.

**Architecture:** A pure module (`src/scripts/appearance.ts`) holds the theme list, parsing and decision logic and is unit-tested with `node --test`. An `AppearanceMenu.astro` component renders a disclosure button plus a panel with two native radio groups. Its processed `<script>` defines a custom element that writes `data-theme` / `data-mode` on `<html>` and to `localStorage`. The theme change is wrapped in `document.startViewTransition` for the fade. The existing inline `<head>` script still applies the stored values before first paint and is not changed.

**Tech Stack:** Astro 7, scoped CSS with project tokens, `light-dark()` / `color-scheme`, View Transitions API (same-document), custom elements, `node:test`.

**Spec:** There is no separate spec doc. The decisions come from the grilling session on 2026-11-26 and are copied into Global Constraints. The visual reference is `design/themeSelector/Temas-v3-desktop.dc.html`: copy values from its `<helmet><style>` block (`.ctl`, `.ctl-btn`, `.sw`, `.pop`, `.pop__group`, `.pop__label`, `.pop__item`, `.pop__name`, `.seg`, `.seg__btn`) and map each literal onto a token. Repo rules: `CLAUDE.md`, `.claude/rules/design-tokens.md`.

**Astro docs consulted (astro-docs MCP):**
- Processed `<script>` (TypeScript, bundled, deduplicated, imports from `src/`): https://docs.astro.build/en/guides/client-side-scripts/#script-processing
- Custom elements for component behavior: https://docs.astro.build/en/guides/client-side-scripts/#common-script-patterns
- Passing `class` + `...rest` (scope attribute) to a child component: https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component
- Scoped styles and `:global()`: https://docs.astro.build/en/guides/styling/#_top
- No `<ClientRouter />` is used, so there is no `astro:after-swap` work (the TODO item stays): https://docs.astro.build/en/guides/view-transitions/#client-side-navigation-process

## Global Constraints

- Themes in the list: `salvia` ("Salvia") and `brasa` ("Brasa"), in that order. No `[Tema 3]` placeholder. Theme names are not translated. Default: `salvia`.
- Mode options: two, Day (`light`) and Night (`dark`). With nothing stored, the mode follows the system (`prefers-color-scheme`) and the control shows the effective mode. Picking one sets `data-mode` and stores it. There is no "system" option in the UI.
- Persistence: `localStorage` keys `theme` and `mode`, values as above. Wrap every read/write in `try/catch`, so a blocked storage still changes the page but doesn't persist. The inline `<head>` script in `Layout.astro` is not modified.
- Button label: `<Theme> · <Mode>` (e.g. "Salvia · Día", "Brasa · Night"), a swatch of the active theme's accent before it, and `▾` after it (muted, `aria-hidden`). Accessible name: "<appearance label>: <Theme> · <Mode>".
- Below `48rem` (`--bp-md`) the label text is visually hidden: the button shows only the swatch and `▾`. The popover is the same, right-aligned under the button.
- Copy (dictionaries `site.appearance`): ES `label: 'Apariencia'`, `theme: 'Tema'`, `mode: 'Modo'`, `day: 'Día'`, `night: 'Noche'`. EN `'Appearance'`, `'Theme'`, `'Mode'`, `'Day'`, `'Night'`.
- Popover behavior: picking a theme **with a pointer** closes it and returns focus to the button. Picking a mode leaves it open. Esc closes it and returns focus. A click outside closes it. Keyboard theme changes (arrow keys inside the radio group) do not close it.
- Accessibility: disclosure pattern (`<button aria-expanded aria-controls>`), each group is a `<fieldset>` with a `<legend>` (styled like `.pop__label`) holding native `<input type="radio">`. Not `role="menu"`.
- Transition: a root cross-fade with `document.startViewTransition`, duration `--duration-theme: 250ms`, easing `--ease-standard: cubic-bezier(0.2, 0, 0, 1)`. Instant when the API is missing or `prefers-reduced-motion: reduce`.
- Tokens only (`.claude/rules/design-tokens.md`): literals live only in `src/styles/themes/*.css`, `modes.css` and `foundations.css`.
- All docs, comments and commit messages are in English.

## Review Focus

1. **Arrow keys in the theme group:** each arrow fires `change`. Expected: the theme switches live and the popover stays open (it only closes for pointer picks). Pinned by `closesOnThemePick` tests in Task 1.
2. **No stored mode while the OS switches dark ↔ light with the page open:** expected that the page follows (pure CSS) and the label and checked radio follow too. Pinned by `effectiveMode` tests in Task 1, plus a `matchMedia` `change` listener in Task 2.
3. **Garbage in storage (`theme = "azul"`, `mode = "system"`):** expected salvia and system mode, no crash. Pinned by `parseTheme` / `parseMode` tests in Task 1.
4. **Reduced motion:** the global `*` rule in `base.css` does not reach `::view-transition-*` pseudo-elements, so JS has to skip the API. Pinned by `shouldAnimate` tests in Task 1.
5. **Mobile (≤ 375px):** the brand, `ES · EN` and the swatch button fit on one row and the popover doesn't overflow the viewport on the right. Manual check in Task 2, Step 6.

---

### Task 1: Appearance logic module

**Files:**
- Create: `src/scripts/appearance.ts`
- Test: `src/scripts/appearance.test.mjs` (plain JS that imports the `.ts` file, same header comment as `notFoundPath.test.mjs`)

**Interfaces:**
- Produces:
  - `export const THEMES: readonly { id: Theme; name: string }[]` = `[{ id: 'salvia', name: 'Salvia' }, { id: 'brasa', name: 'Brasa' }]`
  - `export type Theme = 'salvia' | 'brasa'`; `export type Mode = 'light' | 'dark'`
  - `export const DEFAULT_THEME: Theme = 'salvia'`
  - `export function parseTheme(value: string | null | undefined): Theme`: unknown → `DEFAULT_THEME`
  - `export function parseMode(value: string | null | undefined): Mode | null`: unknown → `null` (system)
  - `export function effectiveMode(stored: Mode | null, systemDark: boolean): Mode`
  - `export function shouldAnimate(env: { hasViewTransitions: boolean; reducedMotion: boolean }): boolean`
  - `export function closesOnThemePick(pointer: boolean): boolean`: true only for pointer picks

- [ ] **Step 1: Write the failing tests**

```js
test('parseTheme keeps known ids and falls back to salvia', () => {
	assert.equal(parseTheme('brasa'), 'brasa');
	assert.equal(parseTheme('salvia'), 'salvia');
	assert.equal(parseTheme('azul'), 'salvia');
	assert.equal(parseTheme(null), 'salvia');
});
test('parseMode keeps light/dark and returns null otherwise', () => {
	assert.equal(parseMode('dark'), 'dark');
	assert.equal(parseMode('light'), 'light');
	assert.equal(parseMode('system'), null);
	assert.equal(parseMode(undefined), null);
});
test('effectiveMode: stored wins, else system', () => {
	assert.equal(effectiveMode('light', true), 'light');
	assert.equal(effectiveMode(null, true), 'dark');
	assert.equal(effectiveMode(null, false), 'light');
});
test('shouldAnimate only with the API and without reduced motion', () => {
	assert.equal(shouldAnimate({ hasViewTransitions: true, reducedMotion: false }), true);
	assert.equal(shouldAnimate({ hasViewTransitions: true, reducedMotion: true }), false);
	assert.equal(shouldAnimate({ hasViewTransitions: false, reducedMotion: false }), false);
});
test('closesOnThemePick: pointer closes, keyboard does not', () => {
	assert.equal(closesOnThemePick(true), true);
	assert.equal(closesOnThemePick(false), false);
});
test('THEMES lists salvia then brasa', () => {
	assert.deepEqual(THEMES.map((t) => t.id), ['salvia', 'brasa']);
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test src/scripts/appearance.test.mjs`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/scripts/appearance.ts`** with the Interfaces above. Add a top comment that the inline `<head>` script in `Layout.astro` duplicates the id list (`is:inline` can't import), so a new theme has to be added in both places.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/scripts/appearance.test.mjs`
Expected: 6 passing.

- [ ] **Step 5: Commit**

```bash
git add src/scripts/appearance.ts src/scripts/appearance.test.mjs
git commit -m "feat(appearance): theme and mode parsing logic"
```

### Task 2: AppearanceMenu in the header

**Files:**
- Create: `src/components/AppearanceMenu.astro`
- Modify: `src/components/SiteHeader.astro` (wrap `LangSwitch` and `AppearanceMenu` in `<div class="site-header__tools">`, which takes over `grid-area: lang; justify-self: end;` and gets `display: flex; align-items: center; gap: var(--space-3)`)
- Modify: `src/i18n/types.ts` (`site.appearance: { label; theme; mode; day; night }`), `src/i18n/es.ts`, `src/i18n/en.ts` (copy from Global Constraints)
- Modify: `src/styles/themes/salvia.css`, `src/styles/themes/brasa.css`: each declares, on a bare `:root` rule, `--swatch-salvia` / `--swatch-brasa` equal to that theme's `--color-accent` `light-dark(...)` value, so every swatch renders regardless of the active theme
- Modify: `src/styles/foundations.css`: `--shadow-popover: 0 8px 24px oklch(0 0 0 / 0.08)`, `--popover-min-width: 13rem`, `--swatch-size: 0.875rem`, `--z-popover: 10`

**Interfaces:**
- Consumes: everything from Task 1.
- Produces: `<AppearanceMenu locale={Locale} />` rendering `<appearance-menu>`. Task 3 hooks into its internal `apply(change: { theme?: Theme; mode?: Mode })` method. This task implements `apply` without animation.

- [ ] **Step 1: Markup.** `<appearance-menu>` > `<button type="button" class="appearance__btn" aria-expanded="false" aria-controls="appearance-panel">` containing a swatch span (`aria-hidden`), `<span class="visually-hidden">{label}: </span>`, `<span class="appearance__current">Salvia · {day}</span>` (SSR default, the script corrects it on connect) and `<span aria-hidden="true" class="appearance__caret">▾</span>`. The panel is `<div id="appearance-panel" class="appearance__panel" hidden>` with two `<fieldset>`s: "Tema" (one `<label class="appearance__item">` per `THEMES` entry: a visually hidden `<input type="radio" name="appearance-theme" value={id}>`, the swatch, the name, and a `✓` shown via `:has(:checked)`) and "Modo" (a segmented `.appearance__seg` with two labelled radios `name="appearance-mode"`, values `light`/`dark`). Put the dictionary words in `data-day` / `data-night` attributes on the element so the script can build the label.

- [ ] **Step 2: Styles (scoped).** Replicate the mockup classes listed in the Spec line, swapping literals for tokens: popover offset `var(--space-2)`, `--shadow-popover`, `--popover-min-width`, `--z-popover`, `--swatch-size`, swatch ring `inset 0 0 0 var(--border-width) var(--color-border)`, segmented pill `--radius-full`, segment `min-height: var(--tap-min)`. Focus ring on labels via `:has(:focus-visible)`. Below `48rem` (mobile-first: hidden by default, shown at `width >= 48rem`) `.appearance__current` uses the visually-hidden pattern.

- [ ] **Step 3: Script (processed `<script>`, imports `appearance.ts`).** `customElements.define('appearance-menu', …)`. In `connectedCallback`: read `<html>` `data-theme`/`data-mode` through `parseTheme`/`parseMode`, check the matching radios, render the label with `effectiveMode(stored, matchMedia('(prefers-color-scheme: dark)').matches)`. Listeners:
  - button click toggles `hidden` and `aria-expanded`
  - theme `change` → `apply({ theme })`. Close and focus the button if `closesOnThemePick(pointer)`, where `pointer` is set by a `pointerdown` on the theme fieldset and cleared after the change
  - mode `change` → `apply({ mode })`, stays open
  - `keydown` Escape while open → close, focus the button
  - document `click` outside the element → close
  - `matchMedia` `change` → refresh the label and radio when no mode is stored

  `apply` sets `document.documentElement.dataset.theme/mode`, writes `localStorage` in `try/catch`, and refreshes the label, the swatch and the checked radios.

- [ ] **Step 4: Wire into `SiteHeader.astro`** as described under Files.

- [ ] **Step 5: Static checks**

Run: `npx astro check && npx astro build`
Expected: 0 errors, build succeeds.

- [ ] **Step 6: Manual check** (`astro dev --background`, at `/es/` and `/en/`, at 1440px and 375px). Picking Brasa recolors the page and closes the popover. Picking Night recolors it and keeps the popover open. A reload keeps both. Esc and a click outside close it. Tab reaches both groups and the arrow keys move within a group. At 375px only the swatch and ▾ show, the header doesn't wrap and the popover stays inside the viewport. Then run Review Focus items 1–3 and 5.

- [ ] **Step 7: Commit**

```bash
git add src/components/AppearanceMenu.astro src/components/SiteHeader.astro src/i18n src/styles
git commit -m "feat(header): theme and mode selector popover"
```

### Task 3: Cross-fade transition

**Files:**
- Modify: `src/styles/foundations.css`: a `/* Motion */` group with `--duration-theme: 250ms` and `--ease-standard: cubic-bezier(0.2, 0, 0, 1)`
- Modify: `src/styles/base.css`: `::view-transition-old(root), ::view-transition-new(root) { animation-duration: var(--duration-theme); animation-timing-function: var(--ease-standard); }`
- Modify: `src/components/AppearanceMenu.astro` (script)

**Interfaces:**
- Consumes: `shouldAnimate` (Task 1), `apply` (Task 2).

- [ ] **Step 1:** In `apply`, run the DOM/storage update inside `document.startViewTransition(update)` when `shouldAnimate({ hasViewTransitions: 'startViewTransition' in document, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches })`, and call `update()` directly otherwise.

- [ ] **Step 2: Static checks**

Run: `node --test src/scripts/*.test.mjs && npx astro check && npx astro build`
Expected: all pass.

- [ ] **Step 3: Manual check.** Theme and mode changes fade in about a quarter second in Chrome/Safari. With "Reduce motion" on in the OS, they're instant. Firefox without the API is instant with no errors in the console.

- [ ] **Step 4: Commit**

```bash
git add src/styles/foundations.css src/styles/base.css src/components/AppearanceMenu.astro
git commit -m "feat(appearance): cross-fade on theme and mode change"
```

### Task 4: Record the decision

**Files:**
- Create: `docs/adr/0002-theme-and-mode-selector.md` (same layout as ADR 0001: Status, Deciders, Sources, Context, Options, Decision, Consequences). Context: design doc P4 said "mode follows the system, no button", so dark mode never showed. Decision: header selector, two modes, system until the first pick, no way back to system except clearing storage (accepted trade-off), View Transitions fade.
- Modify: `design/diseno-juaniw.md` P4 row: append "Superseded by `docs/adr/0002-theme-and-mode-selector.md` (2026-11-26)."
- Modify: `TODO.md`: tick "Theme and mode controls" and "Transition when changing theme or mode", plus the "Mode toggle in the header" item with a note that the selector replaces the moon icon. Update the "Create src/styles/foundations.css" note, since motion tokens now exist.
- Modify: `src/i18n/es.ts`, `src/i18n/en.ts` styleguide intro: replace the claim that the mode only follows the system with "follows your system until you pick one in the header" (ES in voseo).

- [ ] **Step 1:** Write and edit the files above.
- [ ] **Step 2:** Run `npx astro check`. Expected: 0 errors.
- [ ] **Step 3: Commit**

```bash
git add docs/adr/0002-theme-and-mode-selector.md design/diseno-juaniw.md TODO.md src/i18n
git commit -m "docs: ADR 0002 theme and mode selector, supersedes P4"
```
