# Page spec: Process / "Sobre mí" (2026-11-25)

> **Status: built and verified automatically, waiting for the owner's manual checks.** On 2026-11-25 the owner accepted every recommendation of the grilling session (Q1–Q11) and asked to build the page end to end without stopping. Plan: `docs/superpowers/plans/2026-11-25-process-page.md`.

## Owner decisions (2026-11-25)

| # | Decision | Overrides / fills |
|---|---|---|
| D-PR1 | The design's "Sobre mí" page is built at the existing `process` route. Slugs and nav label ("Proceso" / "Process") stay | copy-mvp §4.10 said /proceso = "cómo trabajo" (updated) |
| D-PR2 | Copy not yet written is the literal `TBD`: years in the h1, English level, the three "De dónde vengo" paragraphs | Lorem ipsum and `[N]` / `[nivel]` in the design |
| D-PR3 | EN copy translated by Claude from the ES copy, pending owner review | MISSING COPY (no EN anywhere) |
| D-PR4 | Ships production-ready: no `noindex`, even with `TBD` strings | diseno §2 "fase 2" |
| D-PR5 | Header mode toggle out of scope (open TODO item) | Design header |
| D-PR6 | "Escribime" → `mailto:juan.werkalec+contactame@gmail.com`. "Ver CV" → `/cv-en.pdf`, same tab, both locales; `↗` decorative | — |
| D-PR7 | New shared `ButtonLink.astro`; `SectionTitle` gets a `strong` variant; fact list is page-scoped `<dl>`; h1 copies the Hero h1 tokens | Not in diseno §8 |
| D-PR8 | One new token `--radius-full: 999px`; every other value maps to an existing token | Design's `999px`, `--leading-block`, `--space-11/12` |

## Identity
- Routes: `/es/proceso/` · `/en/process/`
- h1: see copy table (`process.title`)
- Meta title: "Proceso · Juan Ignacio Werkalec" · "Process · Juan Ignacio Werkalec"
- Meta description: the lead (both locales)
- OG: none (site-wide TODO) · noindex: no
- Sources: `design/proceso.html` (frames "Sobre mí · Salvia · Desktop 1440" and "Mobile 375"), copy-mvp §4.10
- Astro docs consulted:
  - https://docs.astro.build/en/reference/routing-reference/#getstaticpaths
  - https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component
  - https://docs.astro.build/en/basics/astro-components/#slots

## Structure (top to bottom)
`main.page` → eyebrow `p` → `h1` → lead `p` → button row (Escribime primary, Ver CV ↗ secondary) → `dl` fact list (Foco, Herramientas, Idiomas) → `section[aria-labelledby]` with h2 "De dónde vengo" (SectionTitle strong) + 3 paragraphs.

## Copy

| Dictionary key | ES | EN |
|---|---|---|
| `process.meta.title` | Proceso · Juan Ignacio Werkalec | Process · Juan Ignacio Werkalec |
| `process.meta.description` | Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente. | I like building things. I take on ambiguous features with minimal hand-holding and care about the details that separate good from great. |
| `process.eyebrow` | Juan Ignacio Werkalec — Rosario, y remoto | Juan Ignacio Werkalec — Rosario, and remote |
| `process.title` (h1) | Ingeniero frontend y full-stack con TBD+ años construyendo productos digitales y aplicaciones web. | Frontend and full-stack engineer with TBD+ years building digital products and web applications. |
| `process.lead` | Me gusta crear cosas. Tomo features ambiguas con mínimo hand holding y cuido los detalles que separan lo bueno de lo excelente. | I like building things. I take on ambiguous features with minimal hand-holding and care about the details that separate good from great. |
| `process.actions.email` | Escribime | Email me |
| `process.actions.cv` | Ver CV | View CV |
| `process.facts[0]` | Foco · Aplicaciones web, design systems, productos de punta a punta | Focus · Web applications, design systems, end-to-end products |
| `process.facts[1]` | Herramientas · TypeScript, React, Next.js, Node.js, GraphQL, Supabase | Tools · TypeScript, React, Next.js, Node.js, GraphQL, Supabase |
| `process.facts[2]` | Idiomas · Español (nativo), Inglés (TBD) | Languages · Spanish (native), English (TBD) |
| `process.origin.heading` | De dónde vengo | Where I come from |
| `process.origin.paragraphs` | `TBD`, `TBD`, `TBD` | `TBD`, `TBD`, `TBD` |

## Open items
- `TBD`: years in the h1, English level, the three origin paragraphs.
- EN translation pending owner review.
- Header mode toggle (TODO.md).
- diseno §2 / P2 still list Proceso as "fase 2" with copy "Falta" (change proposed, not applied).

## Verification results (2026-11-25)
- `npm run check`: 0 errors, 0 warnings · `npm run build`: complete (15 pages).
- Headings (ES and EN): one h1, then one h2. No heading problems.
- Hardcoded text: only the decorative `↗` in `ButtonLink.astro` (aria-hidden).
- Raw values: none in the touched components; the only literal is `--radius-full: 999px` in `foundations.css`.
- Forbidden words in `src/i18n/*.ts`: none. "JPMorgan" / "contratame" in the built page: 0.
- `noindex`: absent on `/es/proceso/` and `/en/process/`.
- mailto in `dist`: `href="mailto:juan.werkalec+contactame@gmail.com"` (ES and EN).
- hreflang EN from `/es/proceso/`: `https://juaniw.com/en/process/`; language switch → `/en/process/`; one `aria-current="page"` (nav "Proceso").
- Screenshots: ES 1440 vs design frame, EN 320 (no horizontal scroll, buttons and facts wrap), ES dark (buttons readable).
- Deviation: vertical spacing follows the design's CSS (`--space-6` between eyebrow, h1 and lead; `--space-section` before the fact list). The exported frame renders them with no gap because `.site h1/.site p { margin: 0 }` out-specifies the page classes.

## Manual checks left to the owner
Side by side with `design/proceso.html` (desktop, and below 48rem), keyboard (Tab: Escribime → Ver CV), axe in ES and EN, modes (system and forced `data-mode`), widths 320/375/768/1440 and 200% zoom, the language switch, Lighthouse mobile ≥ 95.
