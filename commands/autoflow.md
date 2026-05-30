---
description: Run Explore, Design, Stage, and Build automatically using durable state.
---
Run the workflow end-to-end using durable task state until the task passes.

Behavior:
1. Resolve the task from an explicit task path when provided, otherwise from the active task.
   - If neither is available, ask once instead of guessing.
2. Determine the starting phase from durable state:
   - resume `Current phase` when it is `in-progress`, `blocked`, `needs-human`, or `invalidated`
   - otherwise start from `Recommended next phase` when the current phase is already passed
   - otherwise start from the earliest incomplete prerequisite phase
3. Reuse the shared phase runner contract: `runPhase(mode, task, context)`.
4. Before substantive work begins in a phase, validate the current checkout against the task's durable workspace metadata.
   - The workflow uses the current checkout only; do not create task branches, linked worktrees, or writer leases.
   - When `## Workspace.Working branch` is present, the current Git branch must match it unless the repo is not a Git checkout or the mismatch is explicitly accepted by the user.
   - If legacy branch/worktree metadata conflicts with current-checkout mode, normalize it only when deterministic; otherwise stop with `needs-human`.
5. Before substantive work begins in a phase, if `tasks/workbooks/` or the current phase workbook is missing or stale and deterministic repair from task-file authority is possible, create/bootstrap or refresh it.
    - When a phase is workbook-backed, keep that workbook updated as the current round/issue/verification ledger on each durable checkpoint instead of writing only a compact summary.
6. Enter phases in order and refresh TodoWrite for each active phase before substantive work begins.
7. For Build:
    - run the shared pre-Build readiness gate before slice work begins or resumes
    - repair `Active build slice` from durable state when deterministic
    - invalidate back to the earliest rebuildable phase or stop with `needs-human` when required basis or topology state cannot be repaired safely
    - treat the current accepted Stage slice as the repeated work unit; do not run Build as a monolithic implementation pass
    - continue slice-by-slice until the active slice is blank, then run whole-Build closeout
8. Within each phase, keep running bounded internal work units until that phase closes `passed` or a hard blocker requires stopping.
   - Assign a LOW/MEDIUM/HIGH risk profile for the phase or active Build slice before review; default to MEDIUM when uncertain.
   - LOW: one reviewer pass, fix material issues, and re-review changed target; restart cap 1.
   - MEDIUM: reviewer pass, fix, re-review, and restart after material fixes; restart cap 2; challenge lens for shared interfaces or important behavior.
   - HIGH: strict clean cycle with explicit risk/regression/challenge lenses; restart cap 3; challenge gate always.
   - Persist unresolved findings that need follow-up into the workbook issue ledger instead of creating review files.
   - Continue immediately only when the next repair is clear, bounded, and still in the current phase.
   - If an internal work unit passes but phase exit criteria remain open, checkpoint durable state and continue the same phase with the next needed internal work unit instead of advertising downstream readiness.
9. Stop only for hard blockers such as:
    - missing required context, access, credentials, or external prerequisites that cannot be repaired deterministically
    - tool or runtime failures that cannot be repaired deterministically
    - ambiguous or contradictory durable state without a safe deterministic resolution
    - an explicit human decision the agent cannot infer safely
10. If execution stops before the next checkpoint, resume later from the last durable checkpoint and allow uncheckpointed work to be redone.
11. After each successful checkpoint, update durable handoff state before continuing; advance to the next phase only after the current phase itself closes `passed`.
12. Continue phase-by-phase until `Recommended next phase = none` and the whole workflow is passed, or until a hard blocker stops execution.
13. Return the shared command response envelope:
    - `## Executive Summary`
    - `Status` table
    - detail table(s) for per-phase progress, blockers, or verification when useful
    - `Recommended next action`

Notes:
- `/autoflow` owns phase sequencing; `/auto` owns active-agent status/sync/continue behavior.
- `/autoflow` is the automatic path when you want the system to keep working through all remaining phases until the task passes or a true hard blocker is reached.
- Rerunning `/autoflow` is the resume path; resume authority comes from durable state, not chat memory.
- `/autoflow` never creates or switches branches/worktrees. When durable workspace metadata points to a legacy linked-worktree workflow and deterministic current-checkout normalization is not safe, stop with `needs-human`.
- `/autoflow` reads durable authority from the task file first; if support-state repair is simple and deterministic, complete that recovery before substantive work continues, otherwise stop with `needs-human`.
- When a workbook-backed phase run is active, keep the workbook template sections populated as durable ledger state; do not reduce workbook writeback to a summary note only.
- Session-state mirrors refresh only after a successful durable checkpoint.
- The orchestrator compacts once after each successful writeback group that changes durable authority; after compaction, reread the task file and workbook before continuing.
- Do not compact on read-only failures or uncheckpointed work.
- Normal review findings become workbook issues when they need durable follow-up; they are not review artifacts.
- Do not move `## Summary` or `## Handoff` into downstream-ready language before the current phase exit criteria pass and the latest required review says the phase is ready to advance.
- Replay may localize only when Stage topology is unchanged or explicit lineage metadata proves the mapping; otherwise invalidate conservatively or stop with `needs-human`.
- The shared response envelope standardizes shape only; command-specific status wording remains command-local where applicable.
