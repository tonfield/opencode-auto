# Project docs standard

Use `docs/` as the shared project knowledge base for both humans and AI.

## Purpose

- Keep reusable project knowledge in stable docs instead of rediscovering it task by task.
- Make it easy for later sessions to orient quickly without depending on chat memory.
- Separate project-wide truth from task-local reasoning.

## Authority split

- `AGENTS.md` = project operating rules and routing hints.
- `docs/` = reusable project knowledge and durable explanations.
- `tasks/[slug].md` = task-local work record and handoff.
- `tasks/workbooks/*.md` = within-phase issue, fix, verification, and closeout ledger.
- Reviews are ephemeral; durable review follow-up belongs in the relevant workbook.

## Universal docs skeleton

Create or preserve these standard docs in every project:

- `docs/README.md`
  - docs map and reading order
  - who the docs are for
  - authority rules
  - fast lookup for common questions
- `docs/decisions.md`
  - accepted project-level decisions
  - supersessions or reversals
  - brief rationale and consequences
- `docs/gotchas.md`
  - recurring pitfalls
  - invariants that are easy to violate
  - “check these files together” warnings

Optional project-specific docs belong under `docs/` too, for example:

- `docs/architecture-overview.md`
- `docs/state-and-authority.md`
- `docs/runtime-walkthroughs.md`
- `docs/public-api.md`
- `docs/integration-notes.md`
- `docs/runbooks/`

## Update rules

- Docs should describe accepted current truth, not speculative design intent.
- Promote information into `docs/` only when it is reusable across tasks, likely to prevent future mistakes, or important enough that later sessions should not have to rediscover it.
- Keep one-off debugging notes, temporary ideas, and task-specific churn out of `docs/`.
- Prefer small focused doc updates over one giant narrative dump.

## Mode responsibilities

- Explore:
  - read `docs/README.md` early when it exists
  - use linked docs to orient before broad repo search
  - record stale, missing, or contradictory docs as explicit evidence
- Design:
  - identify documentation impact when decisions change architecture, interfaces, invariants, or operator expectations
  - prefer updating shared docs over leaving critical project knowledge trapped in task-local reasoning
- Stage:
  - include doc-update slices when accepted work changes reusable project knowledge
  - name the docs surfaces that must change, not just the code surfaces
- Build:
  - sync docs when implementation changes accepted current truth
  - if docs sync cannot be done safely in the same pass, record explicit follow-up instead of silently omitting it

## Style guidance

- Write for both humans and AI.
- Prefer explicit invariants, ownership, and entry points over vague summaries.
- Keep doc names stable so they are easy to grep and reference.
- Use examples, checklists, and tables when they improve scanability.

## Minimum expectation after `/init`

- Every initialized repo should have the universal docs skeleton.
- Existing specialized docs should remain intact.
- `docs/README.md` should point to the important project-specific docs rather than duplicating them.
