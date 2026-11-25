# Page notes

## Page map

| Argument | Wireframe view | ES route | EN route | diseno | copy-mvp | MVP |
|---|---|---|---|---|---|---|
| `now` | `ahora` | `/es/now/` | `/en/now/` | §9.2 | §4.7, §4.9 | Yes |
| `uses` | `uses` | `/es/uses/` | `/en/uses/` | §9.3 | §4.8 | Yes |
| `home` | `inicio` | `/es/` | `/en/` | §9.1 | §4.2–4.5, §4.9 | Yes |
| `404` | none | any missing route (`src/pages/404.astro`) | (bilingual) | §9.4 | §4.9 | Yes |
| `projects` | `proyectos` | `/es/proyectos/` | `/en/projects/` | §2 only (§9.5 proposed) | §4.4; rows in `src/data/*.json` (see Shared decisions) | Yes (2026-11-24) |
| `project-detail` | `plataforma-clinica`, `harness` | `/es/proyectos/{slug}/` | `/en/projects/{slug}/` | §2 only | §4.10: no copy | Phase 2 |
| `case-studies` | `casos` | `/es/casos/` | `/en/case-studies/` | §2 only | §4.10: no copy | Phase 2 |
| `case` | `configs-ai-configs` | `/es/casos/{slug}/` | `/en/case-studies/{slug}/` | §2 only | §4.10: no copy | Phase 2 |
| `process` | `proceso` | `/es/proceso/` | `/en/process/` | §2 only | §4.10: no copy | Phase 2 |
| `colophon` | `colofon` | `/es/colofon/` | `/en/colophon/` | §2 only | §4.10: no copy | Phase 2 |

Suggested order: **now** (the simplest; it tests the layout), then **uses**, **home** and **404**.

Phase-2 pages have no §9 section and no copy. The spec marks MISSING COPY and PENDING (§9 section), and the run stops after Phase A. Their routes differ by locale (`proyectos` ↔ `projects`), so they also need the `routes` map from diseno Annex A.3. Mark it PENDING.

## Shared decisions

Decisions the owner made after diseno and copy-mvp were written. They win over those docs until the docs are updated.

- **Copy source:** `design/copy-mvp.md`. Ignore other copies of it, such as `../fase3/copy-mvp.md`.
- **CV (2026-11-24):** for now there is only one CV, in English: `design/cv-en.pdf`. There is no `cv-es.pdf`. The CV link in both locales (footer "CV" / "Résumé") points to `/cv-en.pdf`. The first page that links it copies `design/cv-en.pdf` to `public/cv-en.pdf`. diseno and copy-mvp already reflect this.

- **Projects page (2026-11-24, spec `design/pages/projects.md`, D-P1…D-P8):**
  - `/proyectos` is in the MVP, without `noindex`.
  - Its rows come from two content collections, `projects` and `experiences` (`src/data/*.json`, both languages in each entry). Home doesn't use them yet; syncing it is a TODO.
  - Harness and Split.io are one job shown as two entries, with **no note**.
  - Split.io's role is "Frontend Engineer", and its summary keeps "JPMorgan". That's an owner exception to copy-mvp §1 and to step 8's "must not appear" list, until copy-mvp is updated.
  - MangooDev appears only on /proyectos.
  - Freelance is home-only in Experience. On /proyectos its work is the one row of the "Proyectos" section, which goes before "Experiencia". The rows are static.

## now: diseno §9.2
- **The tricky part:** the update date goes **inside** `.page-title` (with `margin-top: var(--space-2)`), not floating on its own.
- The meta description is the **first list item**. Read it from the dictionary; don't copy it by hand.
- The nownownow link is external: new tab, `rel="noopener"`, and the hidden notice.

## uses: diseno §9.3
- **The tricky part:** it's a real `<table>` (DataTable, §8.12), with a `caption` and `th scope="col"`. It is not a grid of `div`s.
- **Mobile:** check in §8.12 how it stacks. Test at 320 px the row with the longest note, in EN.
- The lead (the AI line) goes in PageTitle, not as a loose paragraph.
- Meta description = the lead.

## home: diseno §9.1
The longest page. Prepare it section by section, with one content inventory per section.
- **The h1 is the hero sentence.** The wireframe may have it as a `p` or an `h2`.
- **"Ver proyectos →"** points to `#proyectos`. The target needs `scroll-margin-top: var(--space-8)`, and smooth scroll turns off with reduced motion.
- **The mini-cases are not in the wireframe as-is (P3).** That section comes from the doc (§8.9 and §8.11), not the HTML. From the wireframe you only take the visual rhythm.
- **FactSheet:** `--cols-2` on desktop and one row per field on mobile. The hard test is mini-case 1, with "Configs: beta abierta · AI Configs: en producción" as its status.
- **"Lo que cambiaría"** is optional: the mini-case without it leaves no gap.
- **Experience:** static 2-column rows, plus the Split.io → Harness note. It must read as **one job in two stages**, not two jobs.
- **Closing:** the link is only on the word "LinkedIn". It's external.
- The wireframe's `inicio` view has **no h1** and one h2 "Trabajo" over three `article.mini-case` cards (the copy-mvp §2 "featured work" layout). diseno §9.1 and P3 override it: hero h1, Proyectos with MiniCase + FactSheet, Experiencia rows, and the closing paragraph.

## 404: diseno §9.4
- **The tricky part:** it gets no locale, so it is **bilingual**: both sentences stacked and two CtaLinks. §9.4 doesn't say which element each sentence uses. Suggestion: the ES sentence is the h1, and the EN sentence is a paragraph with `lang="en"`. Decide it with the owner and record it in §9.4.
- `noindex`. The current `Layout.astro` has no prop for it, so propose one in the spec.
- **Test it for real:** `/es/cualquiercosa/` and `/fr/` must both give the 404. In a static build: `dist/404.html` exists and `dist/fr/` doesn't.
- With no locale, decide in the spec whether the header and footer show, and in which language.
