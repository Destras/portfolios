# Handoff — juaniw.com improvements

## Context

juaniw.com is Juan Ignacio Werkalec's personal portfolio. It's a static Astro site (v7.x) with i18n (ES/EN), CSS tokens, two themes (Salvia/Brasa) and day/night modes. It's served through Cloudflare. The code is on GitHub (account `Destras`, linked from the Colophon).

An audit on 2026-11-27 covered all 20 public pages, the HTTP headers, robots/sitemap/manifest, the 404 page and the mobile layout. Results: the technical side is strong (~151 KB total weight, 60–90 ms TTFB, CLS 0, semantic and accessible HTML). The weak spot is **content**: it's thin, has visible placeholders and shows no visual evidence of the work. There are also a few SEO and header gaps.

Full audit, in Spanish: `evaluacion-juaniw.md`.

**Goal:** fix the items below without hurting the current performance or accessibility. Every content change goes in **both locales** (EN and ES).

---

## Tasks

### P1 — Content (do first)

**1. Remove the visible "TBD" placeholders.**
- `/en/projects/plataforma-clinica/` + `/es/proyectos/plataforma-clinica/`: the `Stakeholders: TBD` row.
- `/en/experience/split-io/` + ES: the "Advanced segmentation for enterprise: TBD." line.
- `/en/experience/mangoodev/` + ES: the `Stack: TBD` row.
- If a real value isn't available, delete the row or line; don't leave a placeholder.
- *Done when* `grep -ri "TBD"` over the content/source returns nothing that renders, and the build passes.
- *Suggestion:* add a build check or test that fails if "TBD" shows up in the rendered HTML.

**2. Back up the JPMorgan claim on Split.io.**
- The summary on the home page and on Projects says "flag archiving for JPMorgan", but the Split.io detail page never mentions it.
- Add a paragraph that covers problem, what was built and the result, the same way the landing-screen paragraph does. Also explain the advanced segmentation work. If neither can be documented, drop it from the summary.
- *Needs input from Juan:* the actual facts. Don't invent them.

**3. Add visual evidence (the site has 0 images today).**
- Clinical platform: 2–3 anonymized screenshots (therapist console + patient app) and a **link to the Google Play listing** (the text says the app is published but doesn't link to it).
- Harness AI Configs: a screenshot or GIF of the variants UI, if the NDA allows it.
- Split.io: a before/after of the 3–6 s → ~1 s load time (a waterfall screenshot is enough).
- Use Astro `<Image>`/`<Picture>` (AVIF/WebP), explicit width/height, `loading="lazy"` below the fold, and meaningful `alt` text in each locale.
- *Done when* CLS is still 0 and the home page stays light (images only on detail pages).
- *Needs input from Juan:* the image assets and the Play Store URL.

**4. Make the positioning consistent and put availability on the home page.**
- Today: the `<title>` says "Senior Full-Stack Engineer", the H1 says "Full-stack web engineer with 6 years…", the meta description says "UI-focused", and 3 of the 4 roles are Frontend. "Senior" never appears in the visible body.
- Pick one label and use it in the title, H1, meta description, OG tags and the CV.
- The H1 is the most generic line on the site. Consider bringing in the stronger meta-description idea, for example: *"Senior full-stack engineer, UI-first. I take ambiguous features from idea to production."*
- Add an availability line near the CTA (currently only on `/now/`), for example: *"Open to senior frontend / full-stack roles — remote."*

**5. Spanish CV.**
- `/es/` links to `/cv-en.pdf`; `/cv-es.pdf` returns 404.
- Either publish `cv-es.pdf` and link it from the ES locale, or label the button "CV (EN)".

### P2 — SEO

**6. Add JSON-LD `Person` on the home page (both locales).**
- Fields: `name`, `jobTitle`, `url`, `sameAs` (LinkedIn, GitHub), `address` (Rosario, AR), `knowsAbout`, `image` (og.png or a photo).
- Validate with Google's Rich Results Test / validator.schema.org.

**7. Fix robots.txt.**
- It currently contains only Cloudflare's content-signals comment preamble, with no `User-agent`, `Content-Signal` or `Sitemap` lines. That may come from Cloudflare's managed robots.txt; check the Cloudflare dashboard as well as `public/robots.txt`.
- Target:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://juaniw.com/sitemap-index.xml
  ```
  plus a `Content-Signal:` line if AI-use preferences are wanted.

**8. Remove `https://juaniw.com/` from the sitemap.**
- It's a 307 redirect (Accept-Language → `/en/` or `/es/`). The sitemap should list only canonical 200 URLs. Use the `filter` option of `@astrojs/sitemap`.

**9. Small SEO/content polish.**
- Experience page titles are just the company name ("Harness · Juan Ignacio Werkalec"). Add the role, for example "Harness — Senior Frontend Engineer · Juan Ignacio Werkalec".
- `/en/projects/`: the H1 "Projects" is followed by an H2 also called "Projects". Rename the H2 (for example "Freelance projects").
- Optional: `<link rel="sitemap" href="/sitemap-index.xml">` in `<head>`.

### P3 — Technical

**10. Security headers (none are set today).**
- Add `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` and a `Content-Security-Policy`.
- The CSP has to allow the two inline scripts (theme bootstrap + appearance menu) via hashes, the self-hosted fonts and the Cloudflare Web Analytics beacon (`static.cloudflareinsights.com`, `/cdn-cgi/rum`).
- Where to set them depends on hosting (see task 11): `_headers` on Netlify or Cloudflare Pages, or Cloudflare Transform Rules.
- *Done when* securityheaders.com gives at least an A and the theme switch, fonts and analytics all still work.

**11. Make the Colophon match the actual hosting.**
- The Colophon says the site deploys on Netlify, but every response comes from `server: cloudflare` with no Netlify headers. Find out which one it is (or whether Cloudflare proxies Netlify) and update the Colophon in both locales.
- The Colophon also says the site ships no JS the page doesn't need, but the Cloudflare analytics beacon is injected. Mention it or rephrase.

**12. Font weight (~140 KB of the ~151 KB total).**
- Three woff2 files of ~47 KB each are preloaded: Atkinson Hyperlegible Next (variable) plus Commit Mono 400 and 700.
- Subset them to Latin + Latin-ext (for example with `pyftsubset` or `glyphhanger`).
- Stop preloading Commit Mono 700 if it's rarely above the fold.
- *Done when* total font transfer is under ~70 KB and CLS is still 0, since the metric-override fallbacks have to stay.

**13. Verify contrast.**
- Not measured in the audit. Run Lighthouse and axe on all four themes (Salvia/Brasa × Day/Night) and focus on the `--color-text-muted` text (dates, mono labels).

### P4 — Content depth (nice to have)

**14. Expand the Harness and Split.io pages.**
- They cover 4.5 years but have fewer words than the 7-month freelance project. Follow the clinical case structure (Context → Constraints → Value) and add the business problem, one hard technical decision (for example why the JSON patch is generated in the BFF) and who the work was with (PM, design, backend).
- In Harness, drop the expansions for LLM and SDK; keep BFF.
- *Needs input from Juan.*

**15. Optional additions.**
- 1–2 testimonials (LinkedIn recommendations).
- Feature the site's own repo and any notable GitHub projects.
- Short posts that would also help SEO: the privilege-escalation audit, and the 3–6 s → 1 s optimization.

---

## Constraints

- Keep ES and EN in sync. The TypeScript i18n check should keep failing the build when a key is missing.
- Don't add client-side JS frameworks. Keep the zero-JS-by-default approach.
- Keep CLS at 0 and the accessibility features: skip link, aria on the appearance menu, hidden "(opens in a new tab)" text.
- Never make up facts, metrics, client names or stakeholders. If information is missing, ask Juan or leave the item out.

## Not verified in the audit

- Lighthouse scores: the PageSpeed Insights API was over quota. Speed was measured with curl and the Navigation Timing API.
- Contrast ratios for muted text.
- The actual hosting setup (Netlify vs Cloudflare).
