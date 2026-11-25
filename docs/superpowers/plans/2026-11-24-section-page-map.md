# Section Page Map Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `key === … ? … :` chain in `src/pages/[locale]/[section].astro` with a map from section key to page component, rendered through a dynamic component (`map[key]`), so adding a page means adding one map entry.

**Architecture:** A new module `src/components/pages/sectionPages.ts` exports `sectionPages`, a map of section key → page component (`styleguide`, `projects`, `colophon`). Every page in the map takes the same props (`{ locale }`) and has `meta` in the dictionary under its own key. `[section].astro` looks the key up:
- If it's in the map, it renders `<Page locale={locale} />` inside `Layout` with `t[key].meta`.
- Otherwise it falls back to `PlaceholderPage` with `t.pages[key]` and `noindex`.

`PlaceholderKey` is derived from the map, so it stops being a hand-maintained exclusion list.

**Tech Stack:** Astro 7 (static), TypeScript. No test runner: the test is a byte-for-byte comparison of the whole `dist/` before and after (a pure refactor must not change any output), plus `npm run check`.

**Spec:** the owner's request (2026-11-24): "crear un map con las páginas y una key, y renderizar condicionalmente con el map[key]". No design doc changes, and no visible change.

**Astro docs relied on:**
- https://docs.astro.build/en/reference/astro-syntax/ (Dynamic Tags: "a component import reassignment" renders as a component; the variable name must be capitalized; `client:*` directives aren't supported. None of these pages hydrate, so that limit doesn't apply.)
- https://docs.astro.build/en/basics/astro-components/#component-props
- https://docs.astro.build/en/reference/errors/invalid-component-args/ (render it as `<Page />`, never as `Page()`)

## Global Constraints

- **Pure refactor:** all 15 HTML files in `dist/` are byte-identical before and after. CSS/JS chunk names may only change if the HTML that references them doesn't. Any other difference is a failure.
- All code and comments in English. No new copy, no CSS.
- One commit at the end, after the owner's OK: `refactor(routes): render section pages from a key → component map`.
- Work on the current branch `feat/projects-page`. It has to be clean before Task 1.

## Review Focus

1. **A placeholder page must keep `noindex`** (process, now, uses), and a mapped page must not get it. Covered by the `dist/` comparison in Task 2, step 3, and the explicit grep in Task 2, step 4.
2. **Adding a mapped page without dictionary `meta`** must fail `npm run check`, not render `undefined` in `<title>`. Covered in Task 1, step 4.
3. **Adding a page to the map makes it disappear from `PlaceholderKey` automatically.** If `t.pages` still has its entry, `npm run check` flags the excess property. Covered in Task 1, step 5.
4. **Styleguide** has its own `meta` without the "· Juan Ignacio Werkalec" suffix logic, and must keep its exact `<title>`. Covered by the `dist/` comparison.
5. **The dynamic tag must render server-side HTML exactly like the static import did**, with no extra wrapper or comment. Covered by the `dist/` comparison.

---

### Task 1: The map and the derived placeholder type

**Files:**
- Create: `src/components/pages/sectionPages.ts`
- Modify: `src/i18n/types.ts:20` (`PlaceholderKey`)

**Interfaces:**
- Produces:
  - `export const sectionPages` — `{ styleguide: StyleguidePage, projects: ProjectsPage, colophon: ColophonPage }`, declared with `as const satisfies Partial<Record<SectionKey, unknown>>` (a typo'd key fails).
  - `export type PageKey = keyof typeof sectionPages`
  - `export function isPageKey(key: SectionKey): key is PageKey` — `Object.hasOwn(sectionPages, key)`
  - In `types.ts`: `export type PlaceholderKey = Exclude<SectionKey, PageKey>` (`import type { PageKey } from '../components/pages/sectionPages'`)
  - A compile-time guard in `sectionPages.ts`, so every mapped key has dictionary meta: `type _MetaGuard = { [K in PageKey]: Dictionary[K]['meta'] }`, or an equivalent `satisfies` against `Pick<Dictionary, PageKey>`. A key without `meta` must fail the check.

- [ ] **Step 1: Snapshot the current output.** `npm run build && rm -rf "$TMPDIR/dist-before" && cp -R dist "$TMPDIR/dist-before"`. Expected: 15 `index.html` files under `$TMPDIR/dist-before` (`find "$TMPDIR/dist-before" -name index.html | wc -l` → `15`).
- [ ] **Step 2: Write `sectionPages.ts`** with the exports above. Comment: one line saying that adding a page here (plus its dictionary `meta`) is all `[section].astro` needs.
- [ ] **Step 3: Switch `PlaceholderKey`** to `Exclude<SectionKey, PageKey>`. Run `npm run check`. Expected: 0 errors, since the derived type equals the old hand-written one (`process | now | uses`).
- [ ] **Step 4: Prove the meta guard.** Temporarily add `uses: StyleguidePage` to the map (`uses` has no `t.uses.meta`). Run `npm run check`. Expected: FAIL, with an error that points at `uses` / `meta`. Remove the entry.
- [ ] **Step 5: Prove that the placeholder set follows the map.** With the same temporary `uses` entry, `es.ts`/`en.ts` `pages.uses` must also be flagged as an excess property. Note it in the ledger, then remove the entry. Run `npm run check`. Expected: 0 errors.

---

### Task 2: Render from the map

**Files:**
- Modify: `src/pages/[locale]/[section].astro` (frontmatter and template; `getStaticPaths` doesn't change)

**Interfaces:**
- Consumes: `sectionPages`, `isPageKey` and `PageKey` from Task 1; `Layout` (`{ title, description?, routeKey, noindex? }`); `PlaceholderPage` (`{ title }`).

- [ ] **Step 1: Rewrite the frontmatter.**
  - Drop the three page imports and import `{ sectionPages, isPageKey }`.
  - After `t`, compute one value with no further branching: `const page = isPageKey(key) ? { Page: sectionPages[key], meta: t[key].meta, noindex: false } : { Page: null, meta: { title: \`${t.pages[key].title} · Juan Ignacio Werkalec\`, description: t.pages[key].description }, noindex: true }`.
  - Destructure `Page` with a capital P. The docs require a capitalized name for a dynamic tag.
- [ ] **Step 2: Rewrite the template** as a single `Layout`: `<Layout title={meta.title} description={meta.description} routeKey={key} noindex={noindex}>{Page ? <Page locale={locale} /> : <PlaceholderPage title={t.pages[key].title} />}</Layout>`.
  - Keep `PlaceholderPage` as the fallback rather than a map entry: it takes `{ title }`, not `{ locale }`, and putting it in the map would force every page to share a props type it doesn't need.
  - If TypeScript can't narrow `key` to `PlaceholderKey` inside the fallback, compute `placeholderTitle` in the frontmatter's `else` branch and pass that instead.
- [ ] **Step 3: Run the refactor test.** `npm run check && npm run build && diff -r "$TMPDIR/dist-before" dist`. Expected: check gives 0 errors, and `diff -r` prints nothing.
  - If `diff -r` only reports `_astro/` chunk files, confirm that no `index.html` differs (`diff -rq … | grep index.html` → nothing) and ledger it.
  - Any `index.html` difference is a failure: debug it, don't accept it.
- [ ] **Step 4: Run the explicit Review Focus checks.**
  - `grep -l noindex dist/*/*/index.html | sort`. Expected: exactly the 6 placeholder routes (`es/proceso`, `en/process`, `es/now`, `en/now`, `es/uses`, `en/uses`).
  - `grep -o '<title>[^<]*' dist/es/styleguide/index.html dist/en/projects/index.html dist/es/colofon/index.html`. Expected: `Styleguide · Juan Ignacio Werkalec`, `Projects · Juan Ignacio Werkalec`, `Colofón · Juan Ignacio Werkalec`.
- [ ] **Step 5: Update the docs that describe the pattern.**
  - In `docs/guides/i18nRoutes.md`, if it explains how to add a section page, replace the "add a branch" instruction with "add an entry to `sectionPages` and a `meta` to the dictionary".
  - In `.claude/skills/implement-page/reference/astro-mapping.md`, do the same if it mentions the ternary.
  - Run `grep -n "key === \|PlaceholderKey" docs .claude -r` to find them.
- [ ] **Step 6: Propose the commit** and wait for the owner's OK:

```bash
git add src/components/pages/sectionPages.ts src/i18n/types.ts "src/pages/[locale]/[section].astro" docs/superpowers/plans/2026-11-24-section-page-map.md docs/guides/i18nRoutes.md .claude/skills/implement-page/reference/astro-mapping.md
git commit -m "refactor(routes): render section pages from a key → component map"
```
