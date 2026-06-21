# [Project Name] docs

These docs are for both humans and AI agents working on this project.

## Recommended reading order
1. [Overview or architecture doc](./[overview-doc].md)
2. [Decision log](./decisions.md)
3. [Gotchas](./gotchas.md)

## Standard docs

| Doc | Purpose | Update when |
|---|---|---|
| `docs/README.md` | Doc map, reading order, authority, fast lookup | The docs set or ownership guidance changes |
| `docs/decisions.md` | Accepted project-level decisions and supersessions | A new durable decision is accepted or superseded |
| `docs/gotchas.md` | Recurring pitfalls, invariants, change-impact warnings | A repeat mistake, hidden constraint, or file-coupling rule is discovered |

## Authority rules
- `AGENTS.md` holds project operating rules, conventions, and commands.
- `docs/` holds reusable project knowledge.
- `features/` holds feature-local work and state.
- Docs describe accepted current truth, not speculative design.

## Fast lookup

| If you are asking... | Start here |
|---|---|
| What is the project map? | `[overview doc]` |
| What decisions are deliberate? | [`docs/decisions.md`](./decisions.md) |
| What easy-to-miss rules apply? | [`docs/gotchas.md`](./gotchas.md) |
| Where should new knowledge go? | This file first, then the most relevant linked doc |
