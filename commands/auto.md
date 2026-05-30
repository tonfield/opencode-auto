---
description: Continue the current Auto session or active formal phase.
---
Continue the current work from the active primary agent. This command also owns the former `/mode` status/sync role; there is no separate mode command.

Routing:
1. If the current primary agent is Auto, run taskless Auto session automation only.
2. If the current primary agent is Explore, Design, Stage, or Build with an active task, run formal phase-scoped automation for that phase.
3. If Auto receives a task path or formal-phase request, stop readably and direct the user to `/task`, `/autoflow`, or the appropriate formal primary agent instead of making Auto manage task processing.
4. If no safe target resolves, ask once instead of guessing.
5. Never silently switch tasks. Use `/task` to create or change the active task.

## Auto session automation

Use this branch whenever `/auto` is invoked from the Auto primary agent.

Behavior:
1. Treat TodoWrite, the current conversation, touched files, current working-tree diff, and verification evidence as the live session state.
2. Do not create, switch, read, or update `tasks/*.md` files or `tasks/workbooks/*.md`.
3. Refresh TodoWrite when the current session objective is non-trivial, stale, or missing.
4. Inspect current work before editing:
   - current TodoWrite state
   - recently touched files and current git status/diff when available
   - relevant docs or tests needed for the next bounded action
5. Advance the next clear bounded action:
   - implement/fix one coherent slice
   - keep changes small and reviewable
   - stop rather than guessing when the next action is ambiguous or unbounded
6. Run targeted verification when practical.
7. Review current work when useful for risk, or when the user explicitly asked for review as part of automation:
   - target explicit files if supplied
   - otherwise target changed/touched files, current diff, TodoWrite context, and verification evidence
   - standalone Auto review findings stay in chat/context
   - accepted actionable findings become TodoWrite items, not workbook issues
8. Fix accepted material findings only when the fix is clear and still bounded.
9. Stop when the current session objective is complete, blocked, needs a human decision, or explicitly needs formal task workflow.
10. Return the shared command response envelope:
    - `## Executive Summary`
    - `Status` table
    - detail table(s) for changed files, verification, review findings, or blockers when useful
    - `Recommended next action`

Auto session outcomes:
- `passed` — current session objective is complete and verification/review expectations are satisfied or explicitly not needed
- `blocked` — external prerequisite, access, or tool/runtime issue prevents safe progress
- `needs-human` — the next decision is ambiguous, product-level, too broad for taskless state, or should be moved explicitly into formal task workflow

## Formal phase automation

Use this branch when `/auto` is invoked from Explore, Design, Stage, or Build with active formal task state. `/auto` starts or resumes the current formal phase from durable state; `/autoflow` owns phase-to-phase sequencing.

Behavior:
1. Resolve the active task from session state, or accept an explicit task path only when no active task is set.
   - If no active task is set and no explicit task path is provided, ask once instead of guessing.
   - If an inline task path is supplied while an active task already exists, stop readably, keep the current active task unchanged, and direct task switching back through `/task`.
2. Require an active formal mode from the current primary-agent session.
   - If Auto is active, use the Auto session branch instead and do not process formal task state.
   - If the active mode is missing for formal work, ask once instead of guessing.
3. Reuse the shared phase runner contract: `runPhase(activeMode, task, context)`.
4. Validate the current checkout against the active task's durable workspace metadata before substantive repair-capable work begins.
    - The workflow uses the current checkout only; do not create task branches, linked worktrees, or writer leases.
    - When `## Workspace.Working branch` is present, the current Git branch must match it unless the repo is not a Git checkout or the mismatch is explicitly accepted by the user.
    - If legacy branch/worktree metadata conflicts with current-checkout mode, normalize it only when deterministic; otherwise stop with `needs-human`.
5. If `tasks/workbooks/` or the current phase workbook is missing or stale and deterministic repair from task-file authority is possible, create/bootstrap or refresh it before substantive work begins.
   - When the active phase is workbook-backed, keep that workbook updated as the current round/issue/verification ledger on each durable checkpoint instead of writing only a compact summary.
6. Refresh TodoWrite for the active phase before substantive work begins.
7. When the active mode is Build:
    - run the shared pre-Build readiness gate before slice work begins
    - repair `Active build slice` from durable state when deterministic
    - invalidate back to the earliest rebuildable phase or stop with `needs-human` when required basis or topology state cannot be repaired safely
    - treat the current active slice as the repeated internal work unit while continuing until the whole Build phase passes
8. Continue bounded internal work units within the active phase until that phase closes `passed` or a hard blocker requires stopping.
   - Assign a LOW/MEDIUM/HIGH risk profile for the phase or active Build slice before review; default to MEDIUM when uncertain.
   - LOW: one reviewer pass, fix material issues, and re-review changed target; restart cap 1.
   - MEDIUM: reviewer pass, fix, re-review, and restart after material fixes; restart cap 2; challenge lens for shared interfaces or important behavior.
   - HIGH: strict clean cycle with explicit risk/regression/challenge lenses; restart cap 3; challenge gate always.
   - Persist unresolved findings that need follow-up into the workbook issue ledger instead of creating review files.
   - Continue immediately only when the next repair is clear, bounded, and still in the current phase; otherwise checkpoint and return `blocked` or `needs-human`.
9. Stop early only for hard blockers such as:
   - missing required context, access, credentials, or external prerequisites that cannot be repaired deterministically
   - tool or runtime failures that cannot be repaired deterministically
   - ambiguous or contradictory durable state without a safe deterministic resolution
   - an explicit human decision the agent cannot infer safely
10. If execution stops before the next checkpoint, resume later from the last durable checkpoint and allow uncheckpointed work to be redone.
11. If Build finishes a slice and no active slice remains, run whole-Build closeout before returning `passed`.
12. Stop the command with only one of the shared terminal outcomes:
    - `passed`
    - `blocked`
    - `needs-human`
13. If an internal work unit passes but the current phase exit criteria remain open, keep `## Handoff` aligned to the same phase or repair target and continue with the next internal work unit instead of returning.
14. If the current phase passes, update `## Handoff` to the next recommended phase, but do not advance into that next phase automatically.
15. Return the shared command response envelope:
    - `## Executive Summary`
    - `Status` table
    - detail table(s) for phase progress, blockers, or verification when useful
    - `Recommended next action`

Notes:
- `/auto` in Auto is session-scoped and taskless by default.
- `/auto` in Explore, Design, Stage, or Build is phase-scoped only; it completes the current phase and then stops.
- Use `/autoflow` when you want automatic continuation into later formal phases after the current phase passes.
- Use `/auto` for status/sync/continue behavior in the active primary agent; there is no standalone `/mode` command.
- `/auto` never silently switches tasks. Use `/task` to change the active task.
- Formal `/auto` never creates or switches branches/worktrees. When durable workspace metadata points to a legacy linked-worktree workflow and deterministic current-checkout normalization is not safe, stop with `needs-human`.
- Formal `/auto` reads durable authority from the task file first; if support-state repair is simple and deterministic, complete that recovery before substantive work continues, otherwise stop with `needs-human`.
- When a workbook-backed phase run is active, keep the workbook template sections populated as durable ledger state; do not reduce workbook writeback to a summary note only.
- Session-state mirrors refresh only after a successful durable checkpoint.
- The orchestrator compacts once after each successful writeback group that changes durable authority; after compaction, reread the task file and workbook before continuing.
- Do not compact on read-only failures or uncheckpointed work.
- Normal formal review findings become workbook issues when they need durable follow-up; they are not review artifacts.
- Auto review findings do not become workbook issues unless the work is explicitly moved into formal task state.
- Do not move `## Summary` or `## Handoff` into downstream-ready language before the current formal phase exit criteria pass and the latest required review says the phase is ready to advance.
- Whole-Build pass requires the shared closeout gate; completing one Build slice does not by itself mean Build is done.
- The shared response envelope standardizes shape only; command-specific status wording remains command-local where applicable.
