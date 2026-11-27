## Context

Harness acquired Split in 2024. I built features end to end from minimal product requirements, across the UI and a GraphQL microservice (BFF). Promoted to Senior in March 2025.

## Highlighted projects

### Configs and AI Configs: live configuration for AI agents
I was the sole UI and BFF dev on the features that helped close the gap with LaunchDarkly, a direct competitor.
- **I designed** the UX with no mocks or detailed specs, and the BFF data architecture before the backend contract existed.
- **AI Configs:** a per-variant form with the LLM provider, model and parameters, integrated with the company's models and prompts module.
- **Open beta** with 0 reported bugs in 4 weeks and 100% unit test coverage, plus e2e coverage of user flows.

### Change proposals and Promote environment
I turned copying configuration between environments, which used to be manual, into a 2-click action that gets recorded.
- **I designed** a flow where the BFF generates the JSON patch and the UI only shows the diff.
- **A single generic domain** for any entity, with optimistic locking.
- **In production with no reported bugs.** It is now the only way to modify Configs.

### Feature flag archiving for JPMorgan Chase
JPMorgan Chase, one of our most important customers, needed to archive feature flags without losing the history it requires for audits, and it had a deadline. I led the UI and delivered before that date, so the customer could move forward.
- **History intact:** I extended the audit logs so they also return old and archived definitions, not just the latest one.
- **Safe archiving:** destructive-action warnings when a flag is used elsewhere, and RBAC permissions.
- **Released to all customers.**
