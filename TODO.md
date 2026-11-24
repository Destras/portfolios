# TODO

- [ ] Mode toggle in the header (the moon icon in design/wireframes.html). Conflicts with design doc P4 (mode follows the system, no button): decide two vs three states (light/dark vs +system), icon and transition.
- [ ] Theme and mode controls: theme selector (salvia/brasa) and system/day/night toggle. They write to localStorage (keys theme and mode) and to data-theme/data-mode on <html>.
- [x] Remaining color tokens (--color-surface, --color-border, --color-text, --color-text-muted, --color-accent, --color-accent-hover, --color-focus, --color-selection, --color-on-selection) for salvia and brasa.
- [x] Create src/styles/foundations.css (typography, weights, spacing, radii, layout). Motion tokens are still pending, together with the transition item below.
- [ ] Transition when changing theme or mode (needs duration and easing tokens).
- [ ] If <ClientRouter /> is added, re-apply theme and mode on astro:after-swap (see https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions).
- [x] SkipLink, SiteHeader, SiteNav, LangSwitch and SiteFooter (src/components/), rendered by the Layout.
- [ ] Components: write each component's styles in its own scoped `<style>` (or a sibling .css), copied from design/diseno-juaniw.md §8.
- [ ] Components page: a page that lists every component (SkipLink, SiteHeader, SiteNav, LangSwitch, SiteFooter, Hero, PageTitle/SectionTitle, ExperienceList, MiniCase, CtaLink, FactSheet, DataTable, NowList) with its states, once they exist.
- [x] Make /styleguide bilingual (ES/EN) once i18n routing exists.
- [x] Link /{locale}/styleguide from the footer or the colophon.
- [ ] `/` language detection: redirect 307 by `Accept-Language` (es* → /es, else /en) per design doc §2. Needs an adapter and on-demand rendering of `/` (`Astro.preferredLocale`). Today `/` is a static meta-refresh to /es/.
- [x] LangSwitch component (goes to the same page in the other locale through the route map in src/i18n/routes.ts).
- [x] Translated routes: src/i18n/routes.ts + src/pages/[locale]/[section].astro (see docs/guides/i18nRoutes.md).
- [ ] Replace the placeholder pages (process, now, uses, colophon) with real ones and drop their noindex.
- [ ] Add "Casos de estudio" / "Case studies" to the header nav and the route map once its pages exist.
- [ ] Sync home "Trabajo destacado" with the `experiences`/`projects` content collections (`src/content.config.ts`). Home still reads `home.work.items` + `src/data/home.ts`, so the Harness and Split.io text is duplicated until then.
- [ ] Bilingual 404 page.
- [ ] Sitemap and robots (6 MVP URLs).
- [ ] OG image (`og:image`, the link-preview card on LinkedIn/Slack/WhatsApp): `public/og-es.png` and `og-en.png` per copy-mvp §4.9 (name + role + "Me gusta crear cosas." / "I like building things.", text only), plus an `ogImage` prop in `Layout.astro` for every page. Dropped from the home spec on 2026-11-24.

## MVP pages (see .claude/skills/implement-page)

| Page | Spec | Built ES | Built EN | Verified | Doc updated |
|---|---|---|---|---|---|
| Now | ☐ | ☐ | ☐ | ☐ | ☐ |
| Uses | ☐ | ☐ | ☐ | ☐ | ☐ |
| Home | ✅ | ✅ | ✅ | ☐ | ☐ |
| 404 | ☐ | ☐ | ☐ | ☐ | ☐ |
| Projects | ✅ | ✅ | ✅ | ☐ | ✅ |

When all five are ticked, continue with diseno-juaniw Annex A.5 step 6 (metadata, OG, icons, sitemap, robots), then the A.6 final check.
