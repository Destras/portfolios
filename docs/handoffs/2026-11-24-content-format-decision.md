# Handoff: content format for `projects` / `experiences` collections

**Date:** 2026-11-24 · **Repo:** `marcaPersonal/portfolios` (Astro 7) · **Branch at the time:** `feat/projects-page`
**Status:** **Implemented 2026-11-25** with the detail pages. ADR: `docs/adr/0001-content-format-for-work-collections.md`. Plan: `docs/superpowers/plans/2026-11-25-work-detail-pages.md`. Spec: `design/pages/work-detail.md`. The open items below were closed there (D-W1…D-W14); case studies are still pending.

_Original status:_ Decision agreed in a grilling session. Nothing implemented, no ADR written yet. The owner asked to formalize it (ADR) and implement it when the detail pages are built, not before.

## The question
Should the site keep `src/data/projects.json` or move to Astro's Markdown content system?

## Key fact (already true, don't re-derive)
`projects.json` and `experiences.json` are **already** Astro content collections: `file()` loader + Zod schema in `src/content.config.ts`. The `localized` schema (`{ es, en }`, both required) makes a **missing translation fail the build**. So the real choice is `file()` + one JSON vs `glob()` + one Markdown file per entry.
Consumer: `src/components/pages/ProjectsPage.astro` (`getCollection` + `byStartDesc`). Page spec: `design/pages/projects.md` (D-P6: rows are static until detail pages exist; D-P8: two `file()` collections).

## Decisions (owner-approved)
1. **Hybrid by content shape.** List rows (dates, role, one-line summary) stay as structured data in the JSON `file()` collections. Long-form body text (detail pages, case studies) goes in **separate Markdown `glob()` collections** that point to the row's `id` (e.g. `reference('projects')` / `reference('experiences')`).
2. **Timing: migrate only when the first detail page is implemented.** No changes now; today no entry has a body.
3. **The missing-translation guarantee is a hard requirement.** Markdown has one file per locale (`es/x.md`, `en/x.md`), so the build must still fail when a pair is incomplete (e.g. a check in `getStaticPaths` or the collection setup). Must be equivalent to the current `localized` schema.
4. **Experiences also get detail pages.** This changes my original recommendation (I had proposed experiences stay JSON-only because copy-mvp routes Harness/Split.io work into case studies). The owner said experiences **will have their own route** ("experiencias"), so they get a Markdown detail collection too, same pattern as projects.

## Open items for the next session (ask the owner, don't assume)
- Route for experience detail: slugs (`/es/experiencias/{slug}` · `/en/experience(s)/{slug}`?). `src/i18n/routes.ts` has no `experiences` key yet, and `copy-mvp.md` §2 sitemap doesn't list it, so the docs need updating.
- How an experience detail relates to case studies (`/casos/{slug}`, e.g. `configs-ai-configs` under Harness): link, embed, or reference?
- Is "case studies" a third Markdown collection, and does it reference `experiences`/`projects`?
- Folder layout for the Markdown (`src/content/projects/{es,en}/*.md`?) and how the `id` lines up with the JSON row `id`.
- Rows become links (lifts D-P6). Check `ExperienceList` for the phase-2 clickable row (the arrow, radius and negative margin noted in `design/pages/projects.md`).
- Home still duplicates Harness/Split.io text in `src/data/home.ts` (existing TODO from D-P8).

## Next steps
1. Write the ADR in **English** (repo rule, `portfolios/CLAUDE.md`). No `docs/adr/` exists yet, so pick a location with the owner. Include the options table (file+JSON vs glob+Markdown: i18n guarantee, long text, file count, routing, migration cost) and cite the docs below.
2. Before planning, query the Astro docs MCP (`mcp__astro-docs__search_astro_docs`). This is a repo rule, and the plan must cite `source_url`s. Pages already used:
   - https://docs.astro.build/en/guides/content-collections/#the-file-loader
   - https://docs.astro.build/en/reference/content-loader-reference/#glob-loader
   Still to check: `reference()`, `render()`/`<Content />`, generating routes from content, i18n with collections.
3. Plan → implement alongside the first detail page.

## Suggested skills
- `mattpocock-skills:grilling`: close the open items above with the owner (rounds, numbered questions, recommendations). The conversation is in Spanish (Rioplatense voseo); docs are in English.
- `engineering:architecture` or `mattpocock-skills:domain-modeling`: write the ADR.
- `superpowers:brainstorming` → `superpowers:writing-plans`: before the detail-page implementation.
- `superpowers:verification-before-completion`: run `npm run check` / `astro build` and confirm a missing locale fails the build.
