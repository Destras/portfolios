# Handoff — owner input and ops for juaniw.com

Follow-up to `docs/handoffs/improvements.md` (audit of 2026-11-27). The code items are covered by
`docs/superpowers/plans/2026-11-27-site-improvements.md`. This file lists what **can't be solved with code in this repo**:
facts only Juan has, assets only Juan can produce, and settings that live in the Cloudflare dashboard or external tools.

How to use it: Juan answers inline under each question (a `>` line), the same way as the design questionnaires.
Then a session turns the answers into copy (ES + EN) and code. **Never invent facts, metrics, client names or
stakeholders**: if a question stays unanswered, the item stays out of the site.

---

## A. Facts still missing on the site (the `TBD`s stay published until these are answered)

Decision (2026-11-27): the `TBD`s and the JPMorgan claim stay as they are until Juan sends the facts. When all of
section A is answered, remove every `TBD` and add the build guard in A.5.

### A.1 Split.io: flag archiving for JPMorgan

Where it shows today: the Split.io summary in `src/data/experiences.json` (`split-io.summary`, ES + EN), shown on the
home page and on Projects. The detail page (`src/content/experiences/{es,en}/split-io.md`) never mentions it.

What's needed: one bullet on the detail page with the same shape as the "Landing screen" bullet
(problem → what you built → result), in ES and EN.

Questions:
1. What problem did JPMorgan have that flag archiving solved? (e.g. too many stale flags, audit or compliance needs, UI performance with thousands of flags)
  >
2. What exactly did you build? (UI only, UI + BFF, bulk actions, filters, restore, permissions…)
  >
3. Was it built for JPMorgan only, or shipped to every customer?
  >
4. What was the result? Any number: flags archived, time saved, a renewal or deal it unblocked, adoption.
  >
5. Can JPMorgan be named publicly? (NDA, or does the client name have to go)
  >
6. Rough dates, and who you worked with (PM, design, backend)?
  >

If questions 1–4 can't be answered, the fallback is to drop "flag archiving for JPMorgan" from the summary.

### A.2 Split.io: advanced segmentation for enterprise

Where it shows today: the summary (same field as A.1) and a bullet on the detail page that currently reads
`**Advanced segmentation for enterprise:** TBD.` / `**Segmentación avanzada para enterprise:** TBD.`

Questions:
1. What is "advanced segmentation" here? (targeting rules, segments with large ID lists, rule-based segments, attribute matching…)
  >
2. What was the enterprise problem? (limits on segment size, slow editing, missing rule types…)
  >
3. What did you build, and which part was yours? (UI, data layer, BFF, validation)
  >
4. What was the result? (customers that adopted it, limits raised, support tickets down, a deal it helped close)
  >
5. Any hard technical decision worth one sentence? (e.g. pagination or virtualization of big lists, how you validated rules)
  >

If nothing can be documented, delete the bullet in both locales and drop "advanced segmentation for enterprise" from the summary.

### A.3 Clinical platform: stakeholders

Where it shows today: the `Stakeholders: TBD` row of the fact sheet (`src/data/projects.json`, `plataforma-clinica.stakeholders`, ES + EN).

What to send me (one short line per locale, ≤ ~60 characters, like the other fact-sheet values):
1. Who you worked with, by role (no personal names unless they agreed): e.g. "Center director, 12 therapists, 1 junior dev".
  >
2. Who made the product decisions on the client side?
  >
3. Can the client or center be named? (If not, it stays as "a therapy center".)
  >

If there's nothing to say, the row is deleted (the field is optional in the schema).

### A.4 MangooDev: stack

Where it shows today: the `Stack: TBD` row (`src/data/experiences.json`, `mangoodev.stack`). Technologies aren't
translated, so one list is enough.

What to send me:
1. The technologies you used day to day there, most important first (frontend, backend, database, testing, design system tooling). e.g. `React, TypeScript, Node.js, PostgreSQL, Storybook`.
  >
2. What did you build the design system with? (Storybook, a component library, Figma tokens…)
  >

If there's nothing to say, the row is deleted.

### A.5 After A.1–A.4: the "TBD" build guard

Once no `TBD` is left, add an Astro integration (`astro:build:done` hook) in `astro.config.mjs` that fails the build if
any file in `dist/**/*.html` contains `TBD`. It wasn't added on 2026-11-27 because it would fail today's build.

---

## B. Visual evidence (the site has 0 images today)

Constraints already decided: images only on detail pages (the home page stays light), Astro `<Image>`/`<Picture>`
(AVIF/WebP), explicit width/height, `loading="lazy"` below the fold, `alt` text in ES and EN, CLS stays 0.

Questions and assets:
1. **Clinical platform**: 2–3 anonymized screenshots (therapist console + patient app). Is everything anonymized (no real patient names or data)? Send PNGs at the largest size you have.
  >
2. **Google Play URL** of the patient app (the page says it's published but doesn't link it). Can it be linked publicly?
  >
3. **Harness AI Configs**: does the NDA allow a screenshot or GIF of the variants UI? If yes, send it.
  >
4. **Split.io load time**: do you have a before/after (3–6 s → ~1 s), e.g. two DevTools waterfall screenshots? If not, should we skip it?
  >
5. For each image, one sentence on what it shows (it becomes the `alt` text and a caption).
  >

---

## C. Content depth (P4, nice to have)

### C.1 Harness and Split.io pages

Goal: follow the clinical case structure (Context → Constraints → Value). Also, in Harness, drop the expansions of
"LLM" and "SDK" (keep "BFF").

Questions (Harness):
1. What business problem did AI Configs solve for Harness? (Why did it matter to close the gap with LaunchDarkly: deals lost, churn risk, roadmap commitments?)
  >
2. One hard technical decision, explained: why the changed object and the JSON patch are generated in the BFF and not in the UI or the backend. What did that prevent?
  >
3. Constraints: team size, deadline, things you couldn't change (APIs, design system, other teams).
  >
4. Who you worked with: PM, design, backend, QA (roles only).
  >
5. Any result you can share: beta customers, adoption, a deadline met.
  >

Questions (Split.io):
1. Constraints on the landing screen work (couldn't change the backend? had to keep the API?).
  >
2. How did you measure 3–6 s and ~1 s (RUM, DevTools, p75)?
  >
3. Who you worked with.
  >

### C.2 Optional additions

1. **Testimonials**: 1–2 LinkedIn recommendations you'd like to show (paste the text and say whether the author agreed). Note: the Fase 1–2 identity decided "no testimonials", so confirm this is a change of mind.
  >
2. **GitHub**: notable repos to feature besides this site's own (`Destras/portfolios`)?
  >
3. **Short posts** (also help SEO): the privilege-escalation audit of the clinical platform, and the 3–6 s → 1 s optimization. Do you want them? It means adding a posts section and route (a new plan).
  >

---

## D. CV

1. The CV is renamed to `/juan-ignacio-werkalec-fullstack-engineer-en.pdf` (old `/cv-en.pdf` → 301) by the plan. The PDF's **content** can't be edited here: update its headline to the same label as the site, **"Senior Full-Stack Engineer, UI-first"**, and re-export it with the same file name.
2. A Spanish CV was decided against for now (2026-11-27): both locales link the EN PDF and the button keeps saying "CV".
3. Update the CV link wherever you shared the old URL (LinkedIn "Featured", bios), even though the 301 covers it.

---

## E. Cloudflare dashboard and external tools (ops)

Hosting is verified: **Cloudflare Workers with static assets** (`wrangler.jsonc`), not Netlify. The Colophon is fixed by the plan.

1. **Always Use HTTPS**: `http://juaniw.com/es/` returns 200 today (found 2026-11-26). Turn on SSL/TLS → Edge Certificates → Always Use HTTPS. The HSTS header from the plan only works once HTTP redirects to HTTPS.
2. **Managed robots.txt**: the live `/robots.txt` is Cloudflare's managed one (only content-signal comments, no directives). After the plan ships its own `robots.txt`, check `curl https://juaniw.com/robots.txt`. If Cloudflare still serves or prepends its block, turn it off in Security → Bots (or AI Crawl Control) → "Manage your robots.txt", or keep it if you want its `Content-Signal:` AI preferences. Decide: do you want a `Content-Signal:` line (e.g. `search=yes, ai-train=no`)?
  >
3. **Web Analytics beacon**: the beacon isn't in the served HTML (checked with curl on 2026-11-27). Check Analytics & Logs → Web Analytics: is it on, and with automatic injection? If it is on, the Colophon line "ships no JavaScript the page doesn't need" needs a mention of it (send a yes and I'll adjust the copy). The CSP from the plan already allows `static.cloudflareinsights.com` and `cloudflareinsights.com`.
  >
4. **Google Search Console + Bing Webmaster Tools**: verify the domain (DNS TXT through Cloudflare) and submit `https://juaniw.com/sitemap-index.xml`. After the slug change, request indexing of `/en/projects/clinical-platform/`.
5. **After deploy, run and paste the results here:**
   - securityheaders.com on `https://juaniw.com/en/` (target: at least A).
   - Lighthouse (mobile) on `/en/`, `/en/projects/`, `/en/projects/clinical-platform/`.
   - axe DevTools on all four themes (Salvia/Brasa × Day/Night), focusing on `--color-text-muted` text (dates, mono labels). Decided 2026-11-27: no automated contrast test for now.
   - Google Rich Results Test / validator.schema.org on `/en/` and one detail page (JSON-LD).
6. **Links to the site**: link juaniw.com from the GitHub profile, LinkedIn, the CV PDF and talk/article bios.

---

## F. Out of scope on 2026-11-27 (decided, don't redo)

- Font subsetting (audit item 12): Juan decided to keep the fonts as they are.
- Automated contrast test (audit item 13): not implemented; manual axe/Lighthouse check in E.5.
