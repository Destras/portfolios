## Context

A therapy center with 12 therapists tracked its 150 patients in spreadsheets. Between sessions, patients had nothing to support them.

I built the platform as a freelancer: a web console for therapists and an app for patients. I was the client's only contact, ran the discovery and wrote the 18 specs.

I brought in and mentored a less experienced developer. I built ~70% of the React Native (Expo) app and published it on Google Play.

## Constraints

- We were two people, and the beta had to ship in ~3 months. So I chose Supabase as a shared backend for web and mobile, instead of building our own.
- Store review couldn't hold up the launch. I decoupled web from mobile and launched the web console first.
- The scope changed often. I worked in small, chained PRs to absorb the changes without rewrites.

## Value

- Beta after ~3 months and production after ~6, in Oct 2026. The app is published on Google Play.
- Before launch, I audited security: I closed 6 critical blockers and a privilege escalation that let any logged-in user truncate 6 tables.
- I fixed the permissions at the schema source, instead of filtering the GRANTs, so the problem wouldn't come back.
- More than 200 automated tests. The 150 patients are being migrated from the spreadsheets now.
