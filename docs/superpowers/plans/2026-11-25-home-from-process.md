# Plan: move the Process page into the home (2026-11-25)

Branch: `feat/home-from-process` (from `main` at 9abfcd2).

## Owner decisions (grilling session, 2026-11-25)

| # | Decision |
|---|---|
| D-HP1 | The home (`/es/`, `/en/`) shows exactly what the Process page showed: eyebrow, h1, lead, Escribime / Ver CV, fact list, Trabajo destacado, De dónde vengo. The old home Hero ("Hola! Soy Juani…") is removed |
| D-HP2 | The Process page is deleted. `/es/proceso/` and `/en/process/` become 404s, no redirects (the site is not live yet) |
| D-HP3 | Header nav: "Proceso" is replaced by "Ahora" / "Now" → `Ahora · Proyectos`. `/now` stays a noindex placeholder. The footer keeps its "Ahora" link too |
| D-HP4 | Home meta title and description stay as they are (`home.meta`) |
| D-HP5 | Dictionary: the `process` group's texts move into `home` (`eyebrow`, `title`, `lead`, `actions`, `facts`, `origin`); `home.hero`, `process` and `site.nav.process` are deleted; `process` leaves `routes.ts` |
| D-HP6 | Markup and styles of `ProcessPage.astro` move into `src/pages/[locale]/index.astro`. `ProcessPage.astro`, `Hero.astro` and the `sectionPages` entry are deleted |
| D-HP7 | Docs: `design/pages/process.md` merges into `design/pages/home.md` (which replaces its old spec) and is deleted. `TODO.md`, the implement-page skill's `page-notes.md`, copy-mvp / diseno route rows and code comments that say "process page" are updated. Old plans in `docs/superpowers/plans/` stay as history |

## Astro docs consulted

- https://docs.astro.build/en/guides/routing/#dynamic-routes — `[section].astro` builds one page per entry `getStaticPaths()` returns; removing `process` from `routes` stops `/es/proceso/` from being generated.
- https://docs.astro.build/en/reference/routing-reference/#getstaticpaths — `params` / `props` contract unchanged for `[section].astro` and `[locale]/index.astro`.
- https://docs.astro.build/en/guides/styling/#scoped-styles — the page's `<style>` moves with its markup into `index.astro` and stays scoped to it.

## Steps

1. **Dictionary types** (`src/i18n/types.ts`): drop `site.nav.process`, add `site.nav.now`; delete the `process` block; `home` becomes `{ meta, eyebrow, title, lead, actions, facts, origin, work }`.
2. **Dictionaries** (`src/i18n/es.ts`, `en.ts`): same move. Nav label `now`: "Ahora" / "Now" (same as the footer).
3. **Routes** (`src/i18n/routes.ts`): remove `process`.
4. **Section page map** (`src/components/pages/sectionPages.ts`): remove `ProcessPage`.
5. **Nav** (`src/components/SiteNav.astro`): items `now`, `projects`.
6. **Home** (`src/pages/[locale]/index.astro`): ProcessPage markup + styles, reading `t.home.*`, inside `Layout` with `routeKey="home"`.
7. **Delete** `src/components/pages/ProcessPage.astro`, `src/components/Hero.astro`.
8. **Comments**: ButtonLink, SectionTitle, `data/contact.ts`, `data/home.ts`, `types.ts` say "home" instead of "process page".
9. **Docs**: D-HP7.
10. **Verify**: `npm run check` (0 errors), `npm run build`; `dist/es/proceso/` and `dist/en/process/` absent; `dist/es/index.html` has the h1 "Ingeniero web fullstack…", the "Escribime" mailto, "De dónde vengo", nav `Ahora · Proyectos`; no "Hola! Soy Juani" anywhere in `dist`; grep `src` for leftover `process` references.
11. **Commit** on the branch. No push, no PR.
