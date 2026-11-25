---
name: implement-page
description: Use when the owner runs /implement-page to spec and build one juaniw.com page (now, uses, home, 404, or a phase-2 page) from design/wireframes.html, design/diseno-juaniw.md and design/copy-mvp.md.
argument-hint: <now|uses|home|404|projects|project-detail|case-studies|case|colophon>
disable-model-invocation: true
---

# Implement a juaniw.com page

One run = one page. It has two phases with hard stops:

- **Phase A:** write the page spec (`design/pages/{page}.md`). **STOP 1:** the owner reviews it.
- **Phase B:** build section by section. **STOP 2:** after each section. Then verify and close.

Never write page code before the owner approves the spec. Never decide something no source settles. Record it as PENDING in the spec and ask.

## Who wins when the sources disagree

| Topic | Wins | The others |
|---|---|---|
| **Text** (every visible word, `aria-label`, caption, meta) | `design/copy-mvp.md` | Wireframe text is filler or stale. Never copy it. |
| **Structure** (sections, order, component, h1) | `design/diseno-juaniw.md` §9 | The wireframe may have extra sections or be missing some. |
| **Values** (color, size, space, radius) | Tokens: `src/styles/foundations.css`, `src/styles/themes/*.css` (spec: diseno §5) | Wireframe px/rem/hex values map to the nearest token. They are never pasted. |
| **Look** (proportions, rhythm, alignment) | `design/wireframes.html` | It is the visual reference for whatever the docs don't describe. |
| **Behavior** (hover, focus, anchor, new tab) | diseno §10 and §11 | The exported HTML rarely gets it right. |

Two tie-break rules for what the table doesn't settle:

- **The docs contradict each other** (for example, diseno §2 lists one nav and copy-mvp §4.1 another; diseno cites a copy-mvp section that now says something else). Mark it **PENDING**, quote both sides in the spec, and ask the owner. Don't pick a side.
- **A string pinned verbatim in diseno §9.x but missing from copy-mvp** (for example, an h1 or a meta title). It counts as copy: use it, with source "diseno §9.x", and list it under Open items as "move to copy-mvp". A string that no doc pins is **MISSING COPY**.

The repo rule `.claude/rules/design-tokens.md` applies to every style you write. All files you write (spec, code, comments, commits) are in English. Spanish copy is quoted verbatim.

## Page argument

Find the page's sources in [reference/page-notes.md](reference/page-notes.md) (the "Page map" table: view id, routes, diseno and copy-mvp sections). Read that page's notes before Phase A. If `$ARGUMENTS` is empty or not in the table, ask which page and stop.

## Step 0: prerequisites gate

Record the result in the spec's "Step 0" section. Building the prerequisites is out of scope for this skill.

**Hard checks.** If any of them fails, list every failure and **stop before Phase B**. You may still write the spec (Phase A), with the failures at the top.
- [ ] `src/i18n/es.ts`, `src/i18n/en.ts` and `src/i18n/types.ts` exist, and `npm run check` gives 0 errors. (The i18n plan already proved that a missing EN key fails the check. Don't edit files to re-prove it.)
- [ ] Shared components exist: `src/components/{SkipLink,SiteHeader,SiteNav,LangSwitch,SiteFooter}.astro`.
- [ ] Locale routing exists: `src/pages/[locale]/` with `getStaticPaths` for `es` and `en`.

**Soft checks.** Record the result and continue.
- [ ] `design/wireframes.html` exists. If it doesn't, ask for its path. If there is none, write "no wireframe" in the audit.
- [ ] The diseno §14.4 strings this page uses are in `copy-mvp.md`, in ES and EN. Each missing one becomes **MISSING COPY** in the spec.
- [ ] The files this page links to exist. Each missing one becomes PENDING. For the CV, follow "Shared decisions" in [reference/page-notes.md](reference/page-notes.md).

Create `design/pages/` if it is missing.

## Phase A: the spec (steps 1–6)

Copy [templates/page-spec.md](templates/page-spec.md) to `design/pages/{page}.md` and fill it in.

1. **Read the sources:**
   - diseno §2, §4 (typography), §5, §7 (layout), §8, §9.x, §10, §11 and §14.
   - The copy-mvp section for the page, and the page's notes.
   - The token files and the existing components.
   - Query the Astro docs MCP (`mcp__astro-docs__search_astro_docs`) for the Astro features the page will use: routing, components, the 404, and anything outside [reference/astro-mapping.md](reference/astro-mapping.md). The repo's CLAUDE.md requires this before any plan. Cite the `source_url`s in the spec.
2. **Audit the wireframe:**
   - Run `node .claude/skills/implement-page/scripts/audit-wireframe.mjs <view-id>`. It decodes the bundle and prints headings (with problems), landmarks, an outline showing nesting and order, the classes used, and every raw value in the CSS rules for those classes (a `clamp()` or `calc()` counts as one value).
   - Compare the headings, landmarks and outline with §9.x and §8. The outline shows where an element sits; for example, whether a date is inside or after `.page-title`.
   - Map every raw value to a token by reading the token files. If no token is close, mark it **DEVIATION**.
   - List the sections that are **extra** (not in §9.x: they are not built) and **missing** (in §9.x but not in the wireframe: build them anyway, with the §8 component).
   - From the wireframe you only take the visual details the docs don't describe. Record which detail and which token it uses.
3. **Content inventory:** list every visible and hidden text, top to bottom: `aria-label`, hidden "opens in a new tab" text, caption, title and description. Give each one its `Dictionary` key, ES, EN and source. If a text isn't in copy-mvp, mark **MISSING COPY**. Never invent copy, and never translate it yourself.
4. **Component inventory:** use only the §8 components. For each one: props or variant, whether it already exists in `src/components/`, and whether its props cover this page. If one is needed and isn't in §8, mark **MISSING IN §8**. If it's a §8.14 phase-2 component, it is not built.
5. **States and edge cases:** longer EN text, 320 px, 200% zoom, the current nav link (`aria-current="page"` plus the dot), external links, anchors with reduced motion, dark mode, and missing data (an optional field leaves no gap).
6. **Metadata:** title and description in ES and EN, alternates (the Layout emits them), the OG image, and `noindex` (only on the 404).

End the spec with the list of everything marked MISSING COPY, MISSING IN §8, DEVIATION or PENDING.

**If the page has no copy in copy-mvp (every phase-2 page today), stop after the spec.** No page is built without its copy (diseno §2).

**STOP 1.** Show the owner the summary list and the spec path. Wait for approval or corrections. Then tick "Spec" for the page in the `TODO.md` table.

## Phase B: build (step 7)

Do this only if the hard checks of Step 0 pass and the owner approved the spec. If a feature comes up that the Phase A docs query didn't cover, query the Astro docs MCP again and add the `source_url` to the spec. The guide behind this skill was written for Next.js; [reference/astro-mapping.md](reference/astro-mapping.md) has the translation.

Order:
1. **Content:** add the missing keys to `src/i18n/types.ts`, `es.ts` and `en.ts`. `npm run check` passes.
2. **Semantic HTML without styles:** landmarks, headings and lists. It must read well top to bottom with no CSS.
3. **Components:** replace each block with its §8 component. A new component copies the HTML and CSS from diseno §8, never from the wireframe.
4. **Desktop layout**, compared with the wireframe.
5. **Mobile** at 375 and 320 px.
6. **States:** hover, focus, current and dark mode (§10).
7. **Metadata** from the spec.

Build **one section at a time**. **STOP 2** after each section: say what you built and how the owner can compare it with the wireframe (see "Comparing with the wireframe"). Wait for an OK before the next section.

If you are about to write a CSS value that isn't `var(--…)`, stop. Either a token is missing (propose it, per the token rule) or you are copying the wireframe.

## Step 8: verify

Run these and paste the results into the spec:

- `npm run check && npm run build`, with 0 errors.
- Headings of the built page, for each locale: `node .claude/skills/implement-page/scripts/audit-wireframe.mjs --html dist/{es,en}/<route>/index.html`. Exactly one h1 and no skipped levels.
- Hardcoded text: `grep -nE '>[^<{}[:space:]][^<{}]*<' <page and component files you touched>`. Read every hit. All text must come from the dictionary.
- Raw values: the searches listed under "Before finishing any style change" in `.claude/rules/design-tokens.md`, on the files you touched.
- Forbidden words (from `fase3/pasos.md`): `grep -inE "apasionad|crack|ninja|rockstar|disruptiv|innovador|soluciones|pixel.perfect|artesanal|passionate|innovative|solutions|ownear|deployar|redeployar|experto|expert|el mejor|the best" src/i18n/*.ts`. Expected: no output.
- Exact text: the visible text of `dist/es/...` and `dist/en/...` matches copy-mvp word for word.
- Must not appear: the clinical client's name, patient data, JPMorgan Chase, Harness screenshots, or "contratame".

Leave the owner the manual checklist in the spec: side-by-side with the wireframe (desktop, and below 48rem for mobile), keyboard, axe in ES and EN, modes (system and forced `data-mode`), widths of 320/375/768/1440 and 200% zoom, the language switch, and Lighthouse mobile ≥ 95. Start the dev server with `astro dev --background`.

## Step 9: close

- **Propose** the changes to `design/diseno-juaniw.md` (§8, §9, §14.1) for every deviation, so the doc describes what was built. On the first page, also propose marking Annex A as stale (Next.js → Astro). Apply them only after the owner approves.
- If copy was added, it is already in `copy-mvp.md` (the owner wrote or approved it).
- Update the page's row in the `TODO.md` table.
- **Propose** one commit for the page (for example, `feat(now): Now page in ES and EN`) and wait for the OK before committing.

## Comparing with the wireframe

The bundle opens as one page; navigate to the view with its nav links. To open a single view directly:

`node .claude/skills/implement-page/scripts/audit-wireframe.mjs --extract <view-id> <scratchpad>/<view-id>.html`

There is no separate mobile wireframe. Mobile is the same view with the window narrower than 48rem. The 404 has no view: it is built from diseno §9.4 only.

## Red flags: stop

- Copying a string from the wireframe, or "translating it quickly" to EN.
- A section the wireframe has but §9.x doesn't, or a component that isn't in §8.
- A px, rem or hex value in a component, "just for now".
- Building the next section before the owner OKs the current one.
- Committing, or editing diseno or copy-mvp, without approval.
