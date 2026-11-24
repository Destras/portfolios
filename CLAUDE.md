@AGENTS.md

## Rule: consult the Astro docs MCP before planning

Before writing any implementation plan (and before writing code) that touches Astro (pages, layouts, components, styles, scripts, routing, config), query the Astro docs MCP (`mcp__astro-docs__search_astro_docs`) for how Astro handles that feature, and base the plan on what it says. Don't rely on memory: this project runs Astro 7 and APIs change between versions.

In the plan, cite the docs pages you relied on (their `source_url`).

## Rule: all documentation in English

Every document written in this repo is in English: plans, specs, `TODO.md`, READMEs, rules, code comments, and commit messages. This applies even when the conversation is in Spanish.
