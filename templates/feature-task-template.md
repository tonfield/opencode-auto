# [slug]

## Summary
- Objective: [optimized description]
- Problem / desired outcome: [why this task exists]
- Current status: proposed
- Recommended next phase: Explore
- Active assumptions: [if any]

## Context
- Relevant context: [invariants, patterns, prior decisions]
- Prior art: [related tasks, code, docs]

## Requirements
- [requirement] [verify: method]

## Success Criteria
- [observable condition that defines done]

## Constraints
- [technical, product, runtime, compatibility, or process constraint]

## Anti-goals
- [explicitly not in scope]

## References
- [docs, code, links, notes]

## Decision Inputs
- [facts or constraints later Design work must explicitly use]

## Phase Exit Criteria
- Explore: evidence, constraints, unknowns, affected surfaces, and risks are captured; no accepted blocking/high Explore findings remain.
- Design: selected approach, tradeoffs, interfaces, and failure modes are captured; no accepted blocking/high Design findings remain.
- Stage: ordered Build slices, acceptance checks, verification commands, and docs obligations are captured; no accepted blocking/high Stage findings remain.
- Build: required slices are implemented, verified, reviewed, and closeout-ready; no accepted blocking/high Build findings remain.

## Delegation Notes
- Parent primary agent owns durable task/workbook writes.
- Use read-only subagents for exploration, evidence checks, planning, and review.
- Use patch workers only for bounded Build slices with explicit allowed paths.

## Verification Notes
- Pending Stage.

## Overall Plan
- Explore: [what evidence or baseline should be established]
- Design: [what approach or decision should be produced]
- Stage: [what implementation path or verification plan should be produced]
- Build: [what outcome should be implemented and verified]

## Handoff
- Current phase: Explore
- Current phase status: not-started
- Recommended next phase: Explore
- Phase objective: establish evidence, relevant files, and unknowns
- Active build slice: none
- Blocker summary: none
- Last durable update ID: none
- Next durable update: fill in `## Explore`

## Workspace

- Workspace mode: current-checkout
- Working branch: main
- Base ref: origin/main
- Workspace state: active
- Resume hint: reopen this checkout and run `/task [slug]`

## Explore

## Design

## Stage

## Build

## Closeout

- Closeout phase: not-started
- Closeout status: not-started
- Completion mode: current-checkout
- Working branch: main
- Base ref: origin/main
- Last fetched base SHA: none
- Verified checkout SHA: none
- Integrity suite ID: none
- Verification attempt ID: none
- Integration result: not-started
- Retrospective status: pending
- Knowledge sync status: pending
- Last closeout update ID: none

## Closeout History

- None yet.

## Workbooks

### Workbook paths

| Workbook | Path | Status |
|---|---|---|
| Explore workbook | `tasks/workbooks/[slug]-explore.md` | bootstrap-on-demand |
| Design workbook | `tasks/workbooks/[slug]-design.md` | bootstrap-on-demand |
| Stage workbook | `tasks/workbooks/[slug]-stage.md` | bootstrap-on-demand |
| Build workbook | `tasks/workbooks/[slug]-build.md` | bootstrap-on-demand |

- Create or refresh these workbook files when a workbook-backed phase run, recovery flow, or closeout path first needs them.

## Review Status

- Reviews are ephemeral. Durable review follow-up lives in the relevant workbook issue ledger.
