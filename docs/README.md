# OpenCode Auto docs

These docs hold durable knowledge for this OpenCode Auto configuration repo. They are for both humans and AI agents working on the agent system itself.

## Recommended reading order

1. [`README.md`](../README.md) — user-facing setup and overview.
2. [`AGENTS.md`](../AGENTS.md) — policy reference for the feature development system.
3. [`agents/auto.md`](../agents/auto.md) — operational protocol for the Auto primary agent.
4. [`docs/decisions.md`](./decisions.md) — accepted project-level decisions.
5. [`docs/gotchas.md`](./gotchas.md) — recurring pitfalls and invariants.

## Authority rules

- Root `AGENTS.md` and `agents/auto.md` define the current operating protocol.
- `docs/decisions.md` records durable choices that should survive individual features.
- `docs/gotchas.md` records repeatable failure modes and safe practices.
- `features/` in this repo is local Auto work state and remains gitignored; project repos initialized from `project/` may track their own `features/*.md` files.
