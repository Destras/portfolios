# Page spec: Home / "Sobre mí" (2026-11-25)

> **Status: built and verified automatically, waiting for the owner's manual checks.** The "Sobre mí" design was first built as the Process page (plan: `docs/superpowers/plans/2026-11-25-process-page.md`). The same day the owner moved it to the home and deleted the Process page (plan: `docs/superpowers/plans/2026-11-25-home-from-process.md`). This spec replaces the earlier home spec (Hero → Trabajo destacado, 2026-11-24; see git history).

## Owner decisions: clickable featured work (2026-11-25)

Plan: `docs/superpowers/plans/2026-11-25-clickable-featured-work.md`.

| # | Decision |
|---|---|
| D-CW1 | "Trabajo destacado" rows link to their detail pages, exactly like the Projects page. Both pages render `WorkList.astro`, which reads the collections; they only pass different entries |
| D-CW2 | Rows: project `plataforma-clinica` (shown as "Freelance"), experiences `harness`, `split-io` (`featuredRefs()` in `src/data/home.ts`) |
| D-CW4 | The clinical row keeps its home copy: `org` "Freelance" and the long summary come from `home.work.clinical` in the dictionary. Everything else comes from `src/data/*.json` |

## Owner decisions: move to home (2026-11-25)

| # | Decision |
|---|---|
| D-HP1 | The home shows the "Sobre mí" design. The old Hero ("Hola! Soy Juani…") is removed |
| D-HP2 | The Process page is deleted. `/es/proceso/` and `/en/process/` are 404s, no redirects (the site is not live yet) |
| D-HP3 | Header nav: `Ahora · Proyectos` ("Proceso" removed). `/now` is still a noindex placeholder. The footer keeps "Ahora" too |
| D-HP4 | Meta title and description stay the home ones (`home.meta`) |
| D-HP5 | The copy lives under `home.*` in the dictionary (the `process` group, `home.hero` and `site.nav.process` are gone) |
| D-HP6 | Markup and styles live in `src/pages/[locale]/index.astro`. `ProcessPage.astro` and `Hero.astro` are deleted |
| D-HP7 | "De dónde vengo" is removed from the page (and its `TBD` strings from the dictionary) until its copy is written. It comes back below Featured work |

## Owner decisions: the "Sobre mí" page (2026-11-25, built as Process)

| # | Decision | Overrides / fills |
|---|---|---|
| D-PR1 | The design's "Sobre mí" page is built at the existing `process` route. Slugs and nav label ("Proceso" / "Process") stay | copy-mvp §4.10 said /proceso = "cómo trabajo" (updated) |
| D-PR2 | Copy not yet written is the literal `TBD`: the three "De dónde vengo" paragraphs | Lorem ipsum and `[N]` / `[nivel]` in the design |
| D-PR3 | EN copy translated by Claude from the ES copy, pending owner review | MISSING COPY (no EN anywhere) |
| D-PR4 | Ships production-ready: no `noindex`, even with `TBD` strings | diseno §2 "fase 2" |
| D-PR5 | Header mode toggle out of scope (open TODO item) | Design header |
| D-PR6 | "Escribime" → `mailto:juan.werkalec+contactame@gmail.com`. "Ver CV" → `/cv-en.pdf`, same tab, both locales; `↗` decorative | — |
| D-PR7 | New shared `ButtonLink.astro`; `SectionTitle` gets a `strong` variant; fact list is page-scoped `<dl>`; h1 copies the Hero h1 tokens | Not in diseno §8 |
| D-PR8 | One new token `--radius-full: 999px`; every other value maps to an existing token | Design's `999px`, `--leading-block`, `--space-11/12` |

## Identity
- Routes: `/es/` · `/en/`
- h1: see copy table (`home.title`)
- Meta title: ES/EN "Juan Ignacio Werkalec · Senior Full-Stack Engineer" (`home.meta.title`, copy-mvp §4.9)
- Meta description: ES "Fullstack senior, foco en UI. Me dan lo ambiguo; lo entrego en producción." · EN "Senior full-stack engineer, UI-focused. Give me the ambiguous stuff; I'll ship it." (`home.meta.description`)
- OG: none (site-wide TODO) · noindex: no
- Sources: `design/proceso.html` (frames "Sobre mí · Salvia · Desktop 1440" and "Mobile 375"), copy-mvp §4.10
- Astro docs consulted:
  - https://docs.astro.build/en/reference/routing-reference/#getstaticpaths
  - https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component
  - https://docs.astro.build/en/basics/astro-components/#slots
  - https://docs.astro.build/en/guides/routing/#dynamic-routes (move to home)
  - https://docs.astro.build/en/guides/styling/#scoped-styles (move to home)

## Structure (top to bottom)
`main.page` → eyebrow `p` → `h1` → lead `p` → button row (Escribime primary, Ver CV ↗ secondary) → `dl` fact list (Foco, Herramientas, Idiomas) → `section[aria-labelledby]` "Trabajo destacado" (SectionTitle + link to projects + `WorkList` rows, linked to their detail pages, via `featuredRefs()` in `src/data/home.ts`). ("De dónde vengo" removed until its copy exists, D-HP7.)

## Copy

| Dictionary key | ES | EN |
|---|---|---|
| `home.eyebrow` | Juan Ignacio Werkalec — Rosario, y remoto | Juan Ignacio Werkalec — Rosario, and remote |
| `home.title` (h1) | Ingeniero web fullstack con 6 años construyendo productos digitales y aplicaciones web. | Full-stack web engineer with 6 years building digital products and web applications. |
| `home.lead` | Disfruto tomar features ambiguas y llevarlas a producción cuidando los detalles que separan lo bueno de lo excelente. | I enjoy taking ambiguous features and shipping them to production, sweating the details that separate good from great. |
| `home.actions.email` | Escribime | Email me |
| `home.actions.cv` | Ver CV | View CV |
| `home.facts[0]` | Foco · Aplicaciones web, design systems, productos de punta a punta | Focus · Web applications, design systems, end-to-end products |
| `home.facts[1]` | Herramientas · TypeScript, React, Next.js, Node.js, GraphQL, Supabase | Tools · TypeScript, React, Next.js, Node.js, GraphQL, Supabase |
| `home.facts[2]` | Idiomas · Español (nativo), Inglés (avanzado) | Languages · Spanish (native), English (advanced) |
| ~~`home.origin.heading`~~ (removed, D-HP7) | De dónde vengo | Where I come from |
| ~~`home.origin.paragraphs`~~ (removed, D-HP7) | `TBD`, `TBD`, `TBD` | `TBD`, `TBD`, `TBD` |

## Open items
- "De dónde vengo": write the heading's 3 paragraphs and add the section back (D-HP7).
- EN translation pending owner review.
- Header mode toggle (TODO.md).

## Verification results: clickable featured work (2026-11-25)
- `npm run check`: 0 errors, 0 warnings, 0 hints · `npm run build`: 21 pages, complete.
- `/es/` rows link to `/es/proyectos/plataforma-clinica/`, `/es/experiencia/harness/`, `/es/experiencia/split-io/`; `/en/` to `/en/projects/plataforma-clinica/`, `/en/experience/harness/`, `/en/experience/split-io/`. All six targets exist in `dist`.
- Against the build from before the change: the `<main>` of every page is identical except the home, where the only difference is the link markup (`exp-row--linked`, `<a>`, arrow). Copy unchanged. Generated CSS is identical.

## Verification results: move to home (2026-11-25)
- `npm run check`: 36 files, 0 errors, 0 warnings, 0 hints · `npm run build`: 21 pages, complete.
- `dist/es/proceso/` and `dist/en/process/` are not generated. No "Hola! Soy Juani" / "Hi! I'm Juani" and no `/proceso/` or `/process/` link anywhere in `dist`.
- `/es/` and `/en/`: h1 "Ingeniero web fullstack…" / "Full-stack web engineer…" → h2 "Trabajo destacado" / "Featured work" (then "De dónde vengo", removed afterwards by D-HP7); one mailto each.
- Nav: `Ahora · Proyectos` / `Now · Projects`; on `/es/now/` "Ahora" has `aria-current="page"`.

## Verification results: Process page (2026-11-25)
- `npm run check`: 0 errors, 0 warnings · `npm run build`: complete (15 pages).
- Headings (ES and EN): one h1, then one h2. No heading problems.
- Hardcoded text: only the decorative `↗` in `ButtonLink.astro` (aria-hidden).
- Raw values: none in the touched components; the only literal is `--radius-full: 999px` in `foundations.css`.
- Forbidden words in `src/i18n/*.ts`: none. "JPMorgan" / "contratame" in the built page: 0.
- `noindex`: absent.
- mailto in `dist`: `href="mailto:juan.werkalec+contactame@gmail.com"` (ES and EN).
- (Process route, now removed) hreflang and language switch pointed to the twin route; one `aria-current="page"` on the nav item.
- Screenshots (on the Process route): ES 1440 vs design frame, EN 320 (no horizontal scroll, buttons and facts wrap), ES dark (buttons readable).
- Deviation: vertical spacing follows the design's CSS (`--space-6` between eyebrow, h1 and lead; `--space-section` before the fact list). The exported frame renders them with no gap because `.site h1/.site p { margin: 0 }` out-specifies the page classes.

## Manual checks left to the owner
Side by side with `design/proceso.html` (desktop, and below 48rem), keyboard (Tab: Escribime → Ver CV), axe in ES and EN, modes (system and forced `data-mode`), widths 320/375/768/1440 and 200% zoom, the language switch, Lighthouse mobile ≥ 95.
