# [Project name] docs

These docs are for both:

- humans who want a stable project map
- AI/code agents that need durable context without relying on chat memory

## Recommended reading order

1. [Overview or architecture doc](./[overview-doc].md)
2. [Decision log](./decisions.md)
3. [Gotchas](./gotchas.md)

## Standard docs

| Doc | Purpose | Update when |
|---|---|---|
| `docs/README.md` | docs map, reading order, authority, fast lookup | the docs set or ownership guidance changes |
| `docs/decisions.md` | accepted project-level decisions | a new durable decision is accepted or superseded |
| `docs/gotchas.md` | recurring pitfalls, invariants, change-impact warnings | a repeat mistake, hidden constraint, or file-coupling rule is discovered |

## Authority rules

- `AGENTS.md` holds project operating rules and routing hints.
- `docs/` holds reusable project knowledge.
- `tasks/` holds task-local work and handoff state.
- The docs describe accepted current truth, not speculative design intent.

## Fast lookup

| If you are asking... | Start here |
|---|---|
| What is the project-wide map? | `[overview doc]` |
| What decisions are deliberate? | [`docs/decisions.md`](./decisions.md) |
| What easy-to-miss rules apply? | [`docs/gotchas.md`](./gotchas.md) |
| Where should new durable knowledge go? | this file first, then the most relevant linked doc |
