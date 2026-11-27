# ADR 0001: Content format for the `projects` and `experiences` collections

- **Status:** Accepted (2026-11-25)
- **Deciders:** the owner, in grilling sessions on 2026-11-24 and 2026-11-25
- **Sources:** `docs/handoffs/2026-11-24-content-format-decision.md`, `design/pages/work-detail.md` (D-W1…D-W14), `docs/superpowers/plans/2026-11-25-work-detail-pages.md`

## Context

`src/data/projects.json` and `src/data/experiences.json` are already Astro content collections: `file()` loader + Zod schema in `src/content.config.ts`. Every prose field uses the `localized` schema (`{ es, en }`, both non-empty), so **a missing translation fails the build**. That guarantee is a hard requirement of the site (ES and EN must always be complete).

The list rows (dates, role, one-line summary) fit JSON well. The new detail pages (`/es/proyectos/{slug}/`, `/es/experiencia/{slug}/` and their EN pairs) need long-form text: several paragraphs under `##` headings, which is painful to write and review as escaped strings inside JSON.

The question was whether to keep one JSON per collection or move to Astro's Markdown content system (`glob()` loader, one file per entry).

## Options

| | A. `file()` + JSON only | B. `glob()` + Markdown only | C. Hybrid (chosen) |
|---|---|---|---|
| i18n guarantee | Built in (`localized` schema) | Lost: one file per locale, Zod sees one file at a time | Rows keep `localized`; bodies get a build-time pair check in code |
| Long text | Escaped strings in JSON, no headings or lists | Natural Markdown | Natural Markdown |
| File count | 2 | 1 per entry per locale (8 today) | 2 + 1 per body per locale |
| Routing | Manual, from the JSON ids | From the glob ids (`es/harness`) | From the JSON ids; the body is looked up by the same slug |
| Migration cost | None | Rewrite both collections and the list page | Additive: rows untouched, new collections only for bodies |

## Decision

**C. Hybrid by content shape.**

- List rows and short fact-sheet data (`stack`, `status`, `stakeholders`) stay in the JSON `file()` collections.
- Long-form bodies live in two `glob()` collections, `projectDetails` and `experienceDetails`, at `src/content/{projects,experiences}/{es,en}/{slug}.md`. `{slug}` is the JSON row `id`, the same in both locales. Bodies have no frontmatter (the schema is a strict empty object).
- `src/lib/work-details.ts` (`pairDetails` / `getWorkDetails`) joins rows and bodies and **throws** when a body exists in only one locale, when a body's slug has no JSON row, or when a file sits outside a locale folder. Every consumer (the detail route and `/proyectos`) goes through it, so the build fails exactly as it does for a missing `localized` field.
- A row may have no body. It then stays a static row with no detail page.

### Why not `reference()`

Astro's `reference()` would let each Markdown file point to its JSON row (`project: plataforma-clinica` in frontmatter). We don't use it, for two reasons:

1. The filename already is the join key, so a `reference` field would duplicate it, and the two could disagree.
2. Referenced entries are validated when they are fetched with `getEntry()`/`getEntries()`, not when the collection loads (docs: `reference()`). The pair check validates the same relationship, plus locale completeness, at build time and in one place.

## Consequences

- Each entry with a body has three sources: its JSON row and two Markdown files. The pair check makes an inconsistency fail loudly instead of rendering a half-translated page.
- The locale-completeness guarantee for bodies lives in TypeScript, not in Zod. Removing `getWorkDetails` from a consumer would silently drop it, so new consumers must go through that helper.
- The body's section structure (Contexto / Restricciones / Valor) is a writing convention, not validated.
- Case studies (`/casos/{slug}`) are out of scope. When they arrive, they can follow the same pattern as a third collection.

## Astro docs consulted

- https://docs.astro.build/en/guides/content-collections/#the-file-loader
- https://docs.astro.build/en/reference/content-loader-reference/#glob-loader
- https://docs.astro.build/en/guides/content-collections/#defining-collection-references
- https://docs.astro.build/en/reference/modules/astro-content/#reference
- https://docs.astro.build/en/reference/modules/astro-content/#render
- https://docs.astro.build/en/guides/content-collections/#generating-routes-from-content
- https://docs.astro.build/en/recipes/i18n/#use-collections-for-translated-content

## Update 2026-11-27: translated URL slugs

The row id stays the internal key and the Markdown file name, but the URL slug may now differ per locale: an optional
`slug: { es, en }` field on the JSON row (`src/content.config.ts`), resolved by `detailSlugs()` in `src/i18n/routes.ts`.
First use: `plataforma-clinica` is `/en/projects/clinical-platform/` in English. Pairing (`pairDetails`) is unchanged.
