# Page spec: {Page} ({YYYY-MM-DD})

## Step 0
- Hard: i18n + `npm run check` ☐ · shared components ☐ · `[locale]` routing ☐
- Soft: wireframe ☐ · §14.4 copy for this page ☐ · linked files ☐
- Failures: …

## Identity
- Routes: /es/… · /en/…
- h1: ES "…" · EN "…"
- Meta title: ES "…" · EN "…"
- Meta description: ES "…" · EN "…"
- OG: og-es.png / og-en.png · noindex: no
- Sources: diseno-juaniw §9.x · copy-mvp §4.x · wireframe view: `#{view-id}` (or "no wireframe")
- Astro docs consulted: {source_url, …}

## Skeleton
<!-- The one the page must end up with, not the wireframe's -->
- SkipLink
- header (SiteHeader) · nav "Main"/"Principal" (aria-current on …)
- main#contenido.page
  - h1 …
  - section h2 …
- footer (SiteFooter)

## Wireframe audit
<!-- Output summary of: node .claude/skills/implement-page/scripts/audit-wireframe.mjs {view-id} -->
| What | Wireframe | Doc | Decision |
|---|---|---|---|
| | | | Follow the doc / Take from wireframe (token: …) / PENDING |

### Raw values → tokens
| Value | Property · selector | Token | Note |
|---|---|---|---|
| | | | DEVIATION if no close token |

## Content
| Element | Key (`Dictionary`) | ES | EN | Source |
|---|---|---|---|---|
| | | | | copy-mvp §… / diseno §9.x (move to copy-mvp) / MISSING COPY |

## Components
| Section | Component (§8) | Props / variant | Exists? | Notes |
|---|---|---|---|---|
| | | | ✅ / ☐ / MISSING IN §8 | |

## States and edge cases
- Longer EN text: …
- 320 px: …
- 200% zoom: …
- Current nav link: …
- External links: …
- Anchor / reduced motion: …
- Dark mode: …
- Missing data: …

## Metadata
- title / description ES and EN: …
- Alternates: emitted by Layout (es, en, x-default)
- OG image: …
- noindex: …

## Open items
<!-- Everything marked MISSING COPY, MISSING IN §8, DEVIATION or PENDING -->
- [ ] … → diseno-juaniw §14 / copy-mvp

## Verification (step 8)
<!-- Paste the automated results -->
- check + build: …
- Headings ES / EN: …
- Hardcoded text: …
- Raw values: …
- Forbidden words: …
- Exact text ES / EN: …

## Done (owner)
- [ ] Side by side, desktop and mobile · [ ] Exact text ES/EN · [ ] Headings
- [ ] Keyboard · [ ] axe ES/EN · [ ] Modes · [ ] Widths and zoom · [ ] Language switch · [ ] Lighthouse ≥ 95
