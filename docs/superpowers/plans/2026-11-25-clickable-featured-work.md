# Plan: clickable featured work rows on the home (2026-11-25)

Branch: `feat/clickable-featured-work` (from `main` at 6468ffd).

## Problem

On the Projects page every row with a detail page is a link (whole row, arrow, hover). On the home, the "Trabajo destacado" rows are static. `ExperienceList.astro` already supports both states (`href` or not). The home just never passes an `href`, because it builds its rows from its own copy of the data (`workEntries` in `src/data/home.ts` + `home.work.items` in the dictionary) instead of the collections.

## Owner decisions (grilling session, 2026-11-25)

| # | Decision |
|---|---|
| D-CW1 | New `src/components/WorkList.astro`. It takes references `{ kind, id }` to entries of the `projects` / `experiences` collections, builds each row (with `href` when the entry has a detail page) and renders `ExperienceList`, which stays the presentational component. The Projects page and the home both use it and only pass different references |
| D-CW2 | Home mapping: the "Freelance" row is project `plataforma-clinica`; then experiences `harness` and `split-io`. All three have detail pages, so all three become links |
| D-CW3 | `WorkList` keeps the order of the references it gets. Projects sorts newest first (as today); the home passes its own order |
| D-CW4 | References may override `org` and `summary`. The home uses it only on the clinical row, to keep its copy ("Freelance" + the long summary, copy-mvp §4.4). The home looks the same as today, now with links |
| D-CW5 | The duplicated data goes: `workEntries` / `featuredWork()` leave `home.ts`; `home.work.items` in the dictionary becomes `home.work.clinical` (`org`, `summary`) only. Role, dates and the Harness / Split.io copy come from the JSON collections (they are identical today) |
| D-CW6 | A reference to an id missing from its collection fails the build with a clear error (same spirit as `pairDetails`, ADR 0001) |

## Astro docs consulted

- https://docs.astro.build/en/guides/content-collections/#querying-build-time-collections: `getCollection()` can be called from any component, not just pages; its order is non-deterministic, so the caller sorts (D-CW3).
- https://docs.astro.build/en/reference/modules/astro-content/#getcollection: signature and filter.
- https://docs.astro.build/en/basics/astro-components/#component-props and https://docs.astro.build/en/guides/typescript/#component-props: typed `Props` interface for `WorkList`; exported types (`WorkRef`) can be imported from the `.astro` file.

## Steps

1. **`src/components/WorkList.astro`** (new): exports `WorkRef`. Props `{ refs, locale }`. Loads both collections once, plus the slugs with a detail page (`getWorkDetails`). Maps each ref to an `ExperienceItem` (project → `name[locale]` fills `org`, experience → `org`), applies overrides, sets `href` from `detailPaths`. Throws on an unknown id. Renders `<ExperienceList items={rows} />`.
2. **`src/components/pages/ProjectsPage.astro`**: drop `toRow` / `withDetail`. Build sorted refs per collection and render `<WorkList>` twice.
3. **`src/data/home.ts`**: replace `workEntries` / `featuredWork()` with `featuredRefs(t): WorkRef[]`.
4. **Dictionary** (`src/i18n/types.ts`, `es.ts`, `en.ts`): `WorkItem` → `WorkOverride { org; summary }`; `home.work.items` → `home.work.clinical`.
5. **Home** (`src/pages/[locale]/index.astro`): render `<WorkList refs={featuredRefs(t)} locale={locale} />`.
6. **`ExperienceList.astro`**: fix the `href` comment ("home relies on that" is no longer true).
7. **Docs**: `design/pages/home.md` (decisions, structure line, verification results).

## Verification

- `npm run check`: 0 errors.
- `npm run build`: same page count (21).
- `dist/es/proyectos/index.html` and `dist/en/projects/index.html`: same `<main>` as the baseline build taken before the change.
- `dist/es/index.html` / `dist/en/index.html`: 3 `exp-row__link` anchors pointing to `/es/proyectos/plataforma-clinica/`, `/es/experiencia/harness/`, `/es/experiencia/split-io/` (EN: `/en/projects/…`, `/en/experience/…`); texts unchanged ("Freelance" + long summary on the first row).
- Each of those targets exists in `dist`.

## Verification results (2026-11-25)

- `npm run check`: 0 errors, 0 warnings, 0 hints · `npm run build`: 21 pages, complete.
- Home links: ES `/es/proyectos/plataforma-clinica/`, `/es/experiencia/harness/`, `/es/experiencia/split-io/`; EN `/en/projects/plataforma-clinica/`, `/en/experience/harness/`, `/en/experience/split-io/`. All six exist in `dist`. Orgs: Freelance, Harness, Split.io.
- `<main>` of all 20 locale pages compared with the baseline: identical except `/es/` and `/en/`, whose only differences are the link wrappers and arrows. Generated CSS identical (only the chunk file name changed, `Layout.*.css` → `work-details.*.css`, same hash).
