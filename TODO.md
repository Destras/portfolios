# TODO

- [ ] Theme and mode controls: theme selector (salvia/brasa) and system/day/night toggle. They write to localStorage (keys theme and mode) and to data-theme/data-mode on <html>.
- [x] Remaining color tokens (--color-surface, --color-border, --color-text, --color-text-muted, --color-accent, --color-accent-hover, --color-focus, --color-selection, --color-on-selection) for salvia and brasa.
- [x] Create src/styles/foundations.css (typography, weights, spacing, radii, layout). Motion tokens are still pending, together with the transition item below.
- [ ] Transition when changing theme or mode (needs duration and easing tokens).
- [ ] If <ClientRouter /> is added, re-apply theme and mode on astro:after-swap (see https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions).
- [ ] Components: write each component's styles in its own scoped `<style>` (or a sibling .css), copied from design/diseno-juaniw.md §8.
- [ ] Components page: a page that lists every component (SkipLink, SiteHeader, SiteNav, LangSwitch, SiteFooter, Hero, PageTitle/SectionTitle, ExperienceList, MiniCase, CtaLink, FactSheet, DataTable, NowList) with its states, once they exist.
- [x] Make /styleguide bilingual (ES/EN) once i18n routing exists.
- [ ] Link /{locale}/styleguide from the footer or the colophon.
- [ ] `/` language detection: redirect 307 by `Accept-Language` (es* → /es, else /en) per design doc §2. Needs an adapter and on-demand rendering of `/` (`Astro.preferredLocale`). Today `/` is a static meta-refresh to /es/.
- [ ] LangSwitch component (switches the locale prefix of the current path).
- [ ] Bilingual 404 page.
- [ ] Sitemap and robots (6 MVP URLs).
