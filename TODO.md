# TODO

- [ ] Theme and mode controls: theme selector (salvia/brasa) and system/day/night toggle. They write to localStorage (keys theme and mode) and to data-theme/data-mode on <html>.
- [ ] Remaining color tokens (--color-surface, --color-border, --color-text, --color-text-muted, --color-accent, --color-accent-hover, --color-focus, --color-selection, --color-on-selection) for salvia and brasa.
- [ ] Create src/styles/foundations.css (typography, spacing, radii, layout, motion).
- [ ] Transition when changing theme or mode (needs duration and easing tokens).
- [ ] If <ClientRouter /> is added, re-apply theme and mode on astro:after-swap (see https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions).
