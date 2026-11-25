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
- [x] Replace the placeholder page (now) with a real one and drop its noindex (2026-11-25, design/pages/now.md).
- [ ] Now: owner review of the EN draft copy (copy-mvp §4.7). When updating the page, change `now.updated.date` in both dictionaries and `NOW_UPDATED_ISO` in `NowPage.astro`.
- [ ] Home: write the "De dónde vengo" / "Where I come from" section (heading + 3 paragraphs) and add it back below Featured work (removed 2026-11-25 until its copy exists; SectionTitle `strong` variant is kept for it). Review the EN translation (design/pages/home.md).
- [ ] Add "Casos de estudio" / "Case studies" to the header nav and the route map once its pages exist.
- [ ] Sync home "Trabajo destacado" with the `experiences`/`projects` content collections (`src/content.config.ts`). Home still reads `home.work.items` + `src/data/home.ts`, so the Harness and Split.io text is duplicated until then.
- [ ] Bilingual 404 page.
- [ ] Sitemap and robots (6 MVP URLs).
- [ ] OG image (`og:image`, the link-preview card on LinkedIn/Slack/WhatsApp): `public/og-es.png` and `og-en.png` per copy-mvp §4.9 (name + role + "Me gusta crear cosas." / "I like building things.", text only), plus an `ogImage` prop in `Layout.astro` for every page. Dropped from the home spec on 2026-11-24.


## Detail copy TBDs (draft 2026-11-25, design/pages/work-detail.md)

- [ ] src/data/projects.json: `plataforma-clinica` → `stakeholders` (es, en)
- [ ] src/data/experiences.json: `mangoodev` → `stack`
- [ ] src/content/experiences/{es,en}/split-io.md: "Segmentación avanzada para enterprise" / "Advanced segmentation for enterprise" line
- [ ] Detail pages: closing links to case studies once `/casos` exists (copy-mvp §4.10).
- [ ] Detail pages: owner review of the draft body copy and fact values (copy-mvp §4.10 marks them as draft).

## MVP pages (see .claude/skills/implement-page)

| Page | Spec | Built ES | Built EN | Verified | Doc updated |
|---|---|---|---|---|---|
| Now | ✅ | ✅ | ✅ | ☐ (owner manual checks) | ✅ |
| Uses | ✅ | ✅ | ✅ | ✅ | ✅ |
| Home ("Sobre mí", moved from Process 2026-11-25) | ✅ | ✅ | ✅ | ☐ | ✅ |
| 404 | ☐ | ☐ | ☐ | ☐ | ☐ |
| Projects | ✅ | ✅ | ✅ | ☐ | ✅ |
| Project detail | ✅ | ✅ | ✅ | ✅ | ☐ (diseno §8.8/§8.11/§9 proposals pending) |
| Experience detail | ✅ | ✅ | ✅ | ✅ | ☐ (diseno §8.8/§8.11/§9 proposals pending) |
| Colophon (phase 2) | ✅ | ✅ | ✅ | ☐ | ☐ |

When all six are ticked, continue with diseno-juaniw Annex A.5 step 6 (metadata, OG, icons, sitemap, robots), then the A.6 final check.
