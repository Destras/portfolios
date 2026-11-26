# SVG arrows — Implementation plan

**Goal:** Replace the `→` and `↗` text glyphs with two SVG icons supplied by the owner.

**Architecture:** One `ArrowIcon.astro` component (`direction: 'right' | 'up-right'`) renders the owner's paths with `stroke="currentColor"` and `aria-hidden="true"`. Size comes from a new `--icon-size: 1em` token, so the icon scales with the surrounding text like the glyph did. Each call site keeps its own color and visibility CSS.

**Decisions (owner, 2026-11-26):** replace the styleguide sample too; `--icon-size: 1em` (approved); one component; stay on `feat/theme-selector` (PR #18); update the design docs.

## Call sites

| Glyph | File | Use |
|---|---|---|
| ↗ | `src/components/ButtonLink.astro` | "Ver CV ↗" on home |
| → | `src/components/ExperienceList.astro` | linked rows (Projects, Featured work) |
| → | `src/components/LinkRows.astro` | 404 link rows |
| → | `src/components/pages/StyleguidePage.astro` | Commit Mono arrow sample |

## Tasks

1. Add `--icon-size: 1em` to `src/styles/foundations.css`. Create `src/components/ArrowIcon.astro`: `width`/`height` set by CSS from `--icon-size`, `flex: none`, `display: inline-block`, and `vertical-align` tuned so it sits on the text line.
2. Swap the glyph for `<ArrowIcon>` at the four call sites. Keep the `aria-hidden` wrappers and classes, so the existing hover/visibility rules still apply.
3. Verify: `astro check`, `astro build`, `grep` for leftover `→`/`↗` in markup, and screenshots of home (button), projects (row hover), 404 (row hover) and styleguide, to check alignment.
4. Docs: `design/diseno-juaniw.md` (lines 96 and 122) and `design/pages/home.md:91`, with short English notes pointing at `ArrowIcon.astro`.
