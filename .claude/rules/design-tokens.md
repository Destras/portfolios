---
paths:
  - "src/**/*.css"
  - "src/**/*.astro"
  - "src/**/*.html"
  - "src/**/*.md"
  - "src/**/*.mdx"
  - "src/**/*.tsx"
  - "src/**/*.jsx"
---

# Rule: tokens only, never raw values

Every visual value (color, typography, spacing, radius, shadow, duration) comes from the project's tokens. **Never** write literal values in CSS, in `style` attributes, or in components.

## Where the tokens live

- `src/styles/themes/*.css`: colors, one file per theme (`[data-theme="..."]`).
- `src/styles/modes.css`: `color-scheme` and `data-mode`.
- `src/styles/foundations.css`: typography, spacing, radii, layout, and motion.

**Read these files before writing any styles** so you use the real names. Don't guess or invent token names.

These are the **only** files where literal values may exist.

## Color tokens (semantic)

| Token | Use |
|---|---|
| `--color-bg` | page background, header, footer, sections |
| `--color-surface` | cards, inputs, code blocks, image placeholders |
| `--color-border` | borders, dividers, input and button borders |
| `--color-text` | body text, headings, nav, button text |
| `--color-text-muted` | dates, metadata, tags, captions, placeholders, footer |
| `--color-accent` | links and interactive elements (only things you can click or tap) |
| `--color-accent-hover` | hover state for anything using `--color-accent` |
| `--color-focus` | `:focus-visible` (`outline: 2px solid var(--color-focus); outline-offset: 2px;`) |
| `--color-selection` / `--color-on-selection` | `::selection` only |

Usage rules:
- The accent is **for interactive elements only**. Never on headings, section backgrounds, or decorative borders.
- Headings use `--color-text`. Hierarchy comes from size and weight, not color.
- Don't use `--color-accent` as a background with text on top: no token guarantees that contrast.

## Forbidden

In any file that isn't a token file:

- **Literal colors:** `#fff`, `#1a1a1a`, `rgb()`, `rgba()`, `hsl()`, `oklch()`, `lab()`, and named colors like `white`, `black`, `red`, `gray`.
- **Invented derived colors:** `color-mix()`, opacity, or `filter` used to produce a color that doesn't exist as a token.
- **Literal typography:** `font-family: "..."`, `font-size: 18px`, `font-size: 1.125rem`, `font-weight: 600` when a weight token exists, `line-height: 1.5` when a token exists.
- **Literal spacing:** `margin`, `padding`, `gap`, `inset`, `top/right/bottom/left` with `px`, `rem`, or `em`.
- **Literal radii, shadows, durations, and easings:** `border-radius: 8px`, `box-shadow: 0 2px 4px ...`, `transition: 200ms ease`.
- **Inline styles with values:** `style="color: #333"`, `style="margin: 16px"`, `style={{ padding: "1rem" }}`.
- **SVG color attributes:** `fill="#000"`, `stroke="red"`. Use `fill="currentColor"` and set the color with a token from CSS.
- **Theme- or mode-specific rules inside components:** `[data-theme="..."] .card`, `[data-mode="dark"] .card`, `:global([data-mode="dark"])`, `@media (prefers-color-scheme: dark)`. The tokens already resolve theme and mode with `light-dark()`.

## Values allowed without a token

Only these, because they aren't design decisions:

- `0`, `auto`, `none`, `inherit`, `initial`, `unset`, `currentColor`, `transparent`
- Percentages and layout units: `100%`, `50%`, `1fr`, `minmax(0, 1fr)`, `100vh`, `100dvh`
- Hairline borders: `1px` and `2px` in `border-width` and `outline-width`
- `z-index`, `opacity` (only for states like `:disabled`, never to create a color), `aspect-ratio`, `flex-grow`, `order`
- **Breakpoints in `@media` and `@container`:** CSS doesn't allow `var()` inside a media query. Use only the breakpoints defined in `foundations.css` and add a comment with the token name next to it (`@media (min-width: 48rem) /* --bp-md */`).

## If a token is missing

1. **Don't write the literal value "for now".**
2. Check whether an existing token fits that role.
3. If none does, **stop and propose it to me**: name, value for light and dark (if it's a color), and what it would be used for. Add it to the token file only after I approve it.

## Before finishing any style change

Search the files you touched and confirm none of these remain:
- `#` followed by a hex value, `rgb(`, `hsl(`, `oklch(` (outside the token files);
- `px`, `rem`, or `em` in spacing, typography, or radius properties;
- `style` attributes with literal values;
- `[data-theme` or `[data-mode` selectors outside `themes/` and `modes.css`.

If you find any, replace it with the matching token or tell me a token is missing.
