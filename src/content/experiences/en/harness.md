## Context

Harness acquired Split.io in 2024. From then on, I was the sole UI and Backend for Frontend (BFF) engineer on Configs, Change proposals, Promote and AI Configs, in a platform with 500+ paying customers.

- **Configs** (Mar–May 2026): live configuration for AI agents. Customers define variants (system prompt, temperature) and change them in real time, with no redeploy. I designed the UX with no mocks or detailed specs. It reached open beta.
- **AI Configs** (~2 months, Jul–Aug 2026): the version for Large Language Models (LLMs). From the Software Development Kit (SDK), customers control the provider, model and parameters of each variant at runtime. It is in production and narrowed the gap with LaunchDarkly.
- **Change proposals and Promote:** I generated the changed object and the JSON patch in the BFF, the source of truth. Promote moves a definition from one environment to another in 2 clicks, with approvers and traceability.
- **UI monorepo migration:** 13 modules, zero regressions and E2E tests on the critical flows.
