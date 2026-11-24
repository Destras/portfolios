# Theme + day/night mode system — Implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The page background changes with the theme (`salvia` | `brasa`) and the mode (system | day | night), with no flash on load.

**Architecture:** Each theme is a CSS file that declares `--color-bg` with `light-dark(<day>, <night>)`. `modes.css` only decides which branch of `light-dark()` wins, through `color-scheme`. An `is:inline` script in the layout's `<head>` reads `localStorage` and sets `data-theme` / `data-mode` on `<html>` before first paint; with nothing stored, the default applies (salvia + system).

**Tech Stack:** Astro 7, CSS (`light-dark()`, `color-scheme`, oklch), unbundled inline JS.

**Spec:** There is no separate doc. The decisions come from the grilling session on 2026-11-24 and are copied into Global Constraints. Repo rules that apply: `.claude/rules/design-tokens.md` and `CLAUDE.md`.

**Astro docs consulted (astro-docs MCP):**
- Theme pattern with `localStorage` + `prefers-color-scheme` in an inline script: https://docs.astro.build/en/tutorial/6-islands/2/#add-client-side-interactivity
- `is:inline` = rendered as written, unprocessed: https://docs.astro.build/en/guides/client-side-scripts/#script-processing
- Global CSS via `import` in the layout frontmatter: https://docs.astro.build/en/guides/styling/#external-styles
- CSS under 4 kB is inlined into the HTML (`build.inlineStylesheets: 'auto'`): https://docs.astro.build/en/reference/configuration-reference/#buildinlinestylesheets
- Re-apply the theme on `astro:after-swap` if `<ClientRouter />` is used (doesn't apply yet, goes to TODO): https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions

## Global Constraints

- Default theme: `salvia`. Default mode: system (`prefers-color-scheme`).
- Salvia: day `oklch(0.9589 0.0135 145.47)`, night `oklch(0.1801 0.0202 144.68)`.
- Brasa: day `oklch(0.9905 0.0026 106.45)`, night `oklch(0.1208 0.0066 107.35)`.
- Attributes on `<html>`: `data-theme="salvia" | "brasa"`; `data-mode="light" | "dark"`. No `data-mode` = system.
- `localStorage` keys: `theme` and `mode`, with the same valid values. The script **only reads**, never writes.
- Only token in this iteration: `--color-bg`. No `foundations.css` and no other color tokens.
- Literal values only in `src/styles/themes/*.css` and `src/styles/modes.css` (token rule).
- No UI controls, no transition on change.
- `src/pages/index.astro` stays as the root page and renders `<Layout>`.
- Verification is manual and done by the owner: the plan has no verification steps.

## Review Focus

There's no test framework and verification is manual (the owner's decision), so these are the cases the owner should check:

1. `localStorage.theme = "azul"` (invalid value): ignored, salvia stays. Covered by the script's validation in Task 2.
2. `localStorage` blocked (strict private browsing, cookies blocked): the page doesn't break and the defaults apply. Covered by the `try/catch` in Task 2.
3. Changing the OS mode with the page open and no `data-mode`: the background changes live, no reload. Pure CSS (`color-scheme: light dark`), no JS needed.
4. `data-theme="brasa"` with no `data-mode`: brasa following the system. Theme and mode are independent axes (Task 1).
5. CSS import order: brasa must beat salvia regardless of order. Solved by specificity, `:root[data-theme="brasa"]` (0,2,0) against `:root` (0,1,0) in Task 1.

---

### Task 1: Theme and mode tokens

**Files:**
- Create: `src/styles/themes/salvia.css`
- Create: `src/styles/themes/brasa.css`
- Create: `src/styles/modes.css`

**Interfaces:**
- Produces: the custom property `--color-bg`, resolved on `:root` according to `data-theme` and `data-mode`. Task 2 imports these three files.

- [ ] **Step 1: `src/styles/themes/salvia.css`**

Selector `:root, :root[data-theme="salvia"]` (includes `:root` only so it's the default with no attribute). Declares `--color-bg: light-dark(oklch(0.9589 0.0135 145.47), oklch(0.1801 0.0202 144.68));`

- [ ] **Step 2: `src/styles/themes/brasa.css`**

Selector `:root[data-theme="brasa"]`. Declares `--color-bg: light-dark(oklch(0.9905 0.0026 106.45), oklch(0.1208 0.0066 107.35));`

- [ ] **Step 3: `src/styles/modes.css`**

Three rules and nothing else:
- `:root { color-scheme: light dark; }` (system)
- `:root[data-mode="light"] { color-scheme: light; }`
- `:root[data-mode="dark"] { color-scheme: dark; }`

- [ ] **Step 4: Commit**

```bash
git add src/styles
git commit -m "feat: theme tokens (salvia, brasa) and day/night modes"
```

### Task 2: Layout applies theme and mode; starter cleanup

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`
- Delete: `src/components/Welcome.astro`, `src/assets/astro.svg`, `src/assets/background.svg`

**Interfaces:**
- Consumes: `src/styles/themes/salvia.css`, `src/styles/themes/brasa.css`, `src/styles/modes.css`, and the `--color-bg` token (Task 1).

- [ ] **Step 1: Import the styles in `Layout.astro`**

Add frontmatter with `import '../styles/themes/salvia.css';`, `import '../styles/themes/brasa.css';` and `import '../styles/modes.css';`, in that order.

- [ ] **Step 2: Inline script in the `<head>` of `Layout.astro`**

`<script is:inline>` placed before `<title>` and any other resource. Exact behavior:
- Inside a `try { … } catch {}`, reads `localStorage.getItem('theme')` and `localStorage.getItem('mode')`.
- If `theme` is in `['salvia', 'brasa']`, runs `document.documentElement.dataset.theme = theme`.
- If `mode` is in `['light', 'dark']`, runs `document.documentElement.dataset.mode = mode`.
- Any other value is ignored. It doesn't write to `localStorage`.

- [ ] **Step 3: Background on `body`**

In the existing `<style>` of `Layout.astro`, keep the `html, body` rules as they are and add `body { background-color: var(--color-bg); }`. No literal value is added.

- [ ] **Step 4: `index.astro` and starter removal**

`index.astro` only imports `Layout` and renders `<Layout></Layout>`. Remove the starter comment, the `Welcome` import, and the three files listed under "Delete".

- [ ] **Step 5: Commit**

```bash
git add -A src
git commit -m "feat: layout applies theme and mode before first paint; remove Astro starter"
```

### Task 3: TODO.md and repo rules

**Files:**
- Create: `TODO.md`
- Add (already created during the session): `CLAUDE.md`

- [ ] **Step 1: `TODO.md` at the root**

Title `# TODO` and these five checkbox items, with this text:
- `- [ ] Theme and mode controls: theme selector (salvia/brasa) and system/day/night toggle. They write to localStorage (keys theme and mode) and to data-theme/data-mode on <html>.`
- `- [ ] Remaining color tokens (--color-surface, --color-border, --color-text, --color-text-muted, --color-accent, --color-accent-hover, --color-focus, --color-selection, --color-on-selection) for salvia and brasa.`
- `- [ ] Create src/styles/foundations.css (typography, spacing, radii, layout, motion).`
- `- [ ] Transition when changing theme or mode (needs duration and easing tokens).`
- `- [ ] If <ClientRouter /> is added, re-apply theme and mode on astro:after-swap (see https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions).`

- [ ] **Step 2: Commit**

```bash
git add TODO.md CLAUDE.md docs/superpowers/plans
git commit -m "docs: theming TODO, repo rules (Astro MCP, English docs) and plan"
```
