## Context

I worked on the feature flag frontend at Split.io, a platform with 500+ customers, before Harness acquired it in 2024.

- **Landing screen:** every user of the module went through it, and it took 3 to 6 s to load. I redesigned its data layer: I reworked the Backend for Frontend (BFF) queries, added React Query caching and parallelized the requests. It dropped to ~1 s.
- **Shared components:** ~20 components, documented in Storybook and adopted by 3 teams.
- **Advanced segmentation for enterprise:** TBD.
