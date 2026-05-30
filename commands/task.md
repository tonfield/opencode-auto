---
description: Create or switch to a task file using the solo dev workflow.
---
Create or switch the active task, using the shared prompt optimization contract to shape new task requests before durable task creation.

Follow the OpenCode Solo Dev System exactly.

This command runs inside the user's current primary-agent session. It may use Stage-style task-shaping rules, but it must not switch the active primary mode or silently route the user into Stage.

Before creating a new task or applying content-bearing task updates, reuse the shared `/optimize` setup instead of duplicating it: read and apply `~/.config/opencode/instructions/prompt-optimization.md` in embedded task-intake mode. The shared file is the source of truth for requirement audit, clarifying questions, and prompt/content shaping. Keep `/task`-specific task-selection semantics, durable file rules, TodoWrite behavior, and response envelope distinct.

Required process:
1. Parse the command intent and proposed slug from the command arguments.
   - Existing task switch: if the arguments clearly identify an existing `tasks/[slug].md` or task path and do not include new task content, switch to that task without forcing the optimization question loop.
   - New task or content-bearing refresh: if the arguments describe new work, do not map cleanly to an existing task, or include new/changed task content, run the shared optimization preflight before writing.
   - If no clear slug, task path, or task objective is provided, ask once before writing.
2. For new tasks or content-bearing refreshes, run the shared optimization preflight in embedded task-intake mode:
   - Use the raw `/task` arguments plus relevant current conversation context as the source material.
   - Audit goal, context, scope, constraints, output, follow-through, and verification using the shared prompt optimization contract.
   - Ask concise clarifying questions and wait when required details are missing or ambiguous.
   - Produce an internal optimized task brief with: suggested slug, objective, problem / desired outcome, requirements, success criteria, constraints, anti-goals, references, verification hints, and active assumptions.
   - Use the optimized task brief to propose the slug, seed durable task fields, guide project-local enrichment, and create the initial TodoWrite checklist.
   - Do not show the `/optimize` `## Optimized Prompt` envelope unless the user explicitly asks for it; `/task` finishes with its own shared command response envelope.
3. Gather missing essentials only if they remain truly absent after the optimization preflight:
   - objective / desired outcome
   - why this work matters
   - requirements
   - success criteria
   - constraints
   - anti-goals
   - references
4. Run a lightweight project-local enrichment pass by scanning nearby code, docs, and existing `tasks/*.md` files for overlap, prior art, and constraints.
   - If `docs/README.md` exists, read it first as the project doc map.
   - Prioritize `docs/decisions.md` and `docs/gotchas.md` when they exist.
   - If you find obvious overlap with an existing task under a different slug, ask whether to switch/reuse that task instead of creating a duplicate.
5. Use the current checkout as the task workspace. Do not create task branches, linked worktrees, verification worktrees, writer leases, or `codex://new`-style workspace links.
   - working branch: `main` unless the current repo documents another default branch
   - workspace mode: `current-checkout`
   - base ref: `origin/main` unless the current repo documents another default base ref
   - resume hint: reopen this checkout and run `/task [slug]`
6. Check whether `tasks/[slug].md` already exists.
   - If it exists, do not rewrite durable sections silently.
   - Switch to it, read `## Summary`, `## Overall Plan`, `## Handoff`, `## Workspace`, `## Closeout`, and the section for the recommended next phase named in `## Handoff`.
   - If core durable sections like `## Summary`, `## Overall Plan`, or `## Handoff` are missing or unusable, ask before rebuilding or rewriting them.
   - Preserve authoritative `## Handoff` fields and any existing `## Workbooks` links.
   - If legacy branch/worktree workspace fields exist, normalize them to current-checkout metadata only when deterministic; otherwise ask before rewriting historical state.
   - If `## Workbooks` is missing but the task file is otherwise parseable, add the current workbook-link block idempotently instead of leaving the task half-legacy.
   - If `Workspace state` is `archived`, `cancelled`, or `superseded`, ask whether to reopen the task before continuing.
   - Replace the previous task's live TodoWrite working set with a fresh checklist for the recommended next phase if TodoWrite is available.
   - Reconfirm any todo that was already `in_progress` before continuing work.
   - Explicitly announce `Active task file: @tasks/[slug].md`, workspace mode `current-checkout`, working branch, and the recommended next phase.
7. Ensure task-local workflow folders exist before writing or normalizing task-local artifacts:
   - `tasks/`
   - `tasks/workbooks/`
   - `tasks/runtime/`
8. If it does not exist, create `tasks/[slug].md` using this shape:

```markdown
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
```

   - Replace placeholders.
   - Seed `## Overall Plan` with task-specific high-level phase outcomes, not action-level checklists.
   - Keep `## Decision Inputs`, `## Phase Exit Criteria`, `## Delegation Notes`, and `## Verification Notes` lightweight; omit empty bullets rather than filling them with ceremony.
   - Seed `## Workspace` and `## Closeout` with current-checkout fields only; do not create branch/worktree metadata.
   - Set the initial recommended next phase to Explore.
   - The workbook paths are durable links, not proof that the workbook files already exist; bootstrap them on the first workbook-backed phase run, recovery flow, or closeout path that needs them.
9. If TodoWrite is available, create a fresh Explore checklist using short imperative one-action entries tailored to the request.
   - Use one action per todo.
   - Do not add phase tags or numbering.
   - Make the list step-by-step enough that the model can execute it directly without inventing a new sub-plan first.
   - Prefer 4-8 concrete Explore todos unless the work is truly trivial.
   - Include separate todos for investigation, evidence capture, and durable writeback when appropriate.
   - Keep only Explore items in the live list.
   If TodoWrite is unavailable, provide the temporary Explore checklist in your response and keep only the minimum durable next-step reminder in `## Handoff`.
10. Finish with the shared command response envelope while keeping task-selection semantics distinct:
   - `## Executive Summary`
   - `Status` table
   - detail table(s) when useful for assumptions, overlaps, or recommended phase state
   - `Recommended next action`
   Explicitly announce `Active task file: @tasks/[slug].md`, workspace mode `current-checkout`, working branch, the recommended next phase, and the next recommended step.
