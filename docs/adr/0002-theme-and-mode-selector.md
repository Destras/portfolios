# ADR 0002: Theme and mode selector in the header

- **Status:** Accepted (2026-11-26)
- **Deciders:** the owner, in a grilling session on 2026-11-26
- **Sources:** `design/themeSelector/Temas-v3-desktop.dc.html` (visual reference), `docs/superpowers/plans/2026-11-26-theme-selector.md`
- **Supersedes:** design doc P4 (`design/diseno-juaniw.md`: "mode follows the system, no button")

## Context

The site has two color themes (Salvia, the default, and Brasa) and a day/night mode. Every color token is a `light-dark()` pair, so `color-scheme` picks the mode. P4 decided that the mode follows the system and the header has no button. In practice the dark mode, and Brasa entirely, never showed up for most visitors. The owner wants both to be visible and pickable.

## Options

| | A. No control (P4) | B. Mode toggle only (moon icon) | C. One popover: theme + mode (chosen) |
|---|---|---|---|
| Brasa reachable | No | No | Yes |
| Night reachable | Only via the OS | Yes | Yes |
| Header cost | None | One icon | One button ("Salvia · Día ▾"; swatch only on mobile) |
| Matches the design reference | — | No | Yes (v3 of the selector explorations) |

Inside C, the mode got two options (Day / Night) rather than three (System / Day / Night).

## Decision

- A disclosure button at the right end of the header, next to `ES · EN`, opens a panel with two native radio groups: **Theme** (Salvia, Brasa) and **Mode** (Day, Night).
- With nothing stored, the mode follows the system (as P4 said) and the control shows the effective mode. The first pick forces it with `data-mode` and stores it in `localStorage` (`theme`, `mode`). The pre-paint inline script in `Layout.astro` is unchanged.
- A theme picked with a pointer closes the panel. A mode pick, or a keyboard change of theme, keeps it open. Esc and a click outside close it.
- Changes cross-fade with the View Transitions API (`--duration-theme: 250ms`, `--ease-standard`). The change is instant without the API or with `prefers-reduced-motion: reduce`.

## Consequences

- Dark mode and Brasa are visible to everyone who looks for them.
- **Accepted trade-off:** once a mode is picked there is no way back to "follow the system" from the UI, short of clearing site data. That's fine for a portfolio, and a third option can be added later without changing the storage format (no stored `mode` = system).
- The theme ids live in two places: `src/scripts/appearance.ts` and the inline script in `Layout.astro`, which can't import. A new theme needs both, plus its CSS file and a `--swatch-<id>` token.
- The button label is rendered as "Salvia · Day" on the server and corrected by the script on load. A visitor with a stored choice may see the label change for a moment. The colors don't flash, because the pre-paint script handles them.
