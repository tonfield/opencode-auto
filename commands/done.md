---
description: Close the active task through current-checkout verification and durable closeout.
---
Close the active task through current-checkout verification and durable closeout.

Behavior:
1. Resolve the active task from session state.
   - If no active task is set, ask once instead of guessing.
2. Confirm the current primary-agent session is already aligned to the task's active working session.
   - `/done` must not silently switch agents, tasks, branches, or directories.
3. Re-read `## Summary`, `## Overall Plan`, `## Handoff`, `## Workspace`, `## Closeout`, and `## Build` from the active task file.
4. Require the task to be ready for closeout before repair-capable work begins.
   - `Current phase = Build`
   - `Current phase status = passed`
   - `Recommended next phase = none`
   - `## Workspace.Workspace mode = current-checkout` or legacy workspace metadata is deterministically normalizable to current-checkout mode
   - current Git branch is the task's recorded `Working branch` when the repo is a Git checkout; default expected branch is `main`
5. Run the current-checkout closeout flow using the task file as durable authority:
   - `preflight-current-checkout`
   - `verify-current-checkout`
   - `record-closeout`
   - `completed`
6. In `preflight-current-checkout`:
   - verify the working directory path is the current project checkout, not a linked task worktree
   - verify the current branch matches `## Workspace.Working branch` when present
   - verify no unresolved merge/rebase/cherry-pick state exists
   - fetch the configured base ref when safe and record `Last fetched base SHA`
   - stop with `blocked` or `needs-human` when the checkout is not closeout-ready
7. In `verify-current-checkout`:
   - run the integrity suite required by Stage/Build or the project's documented verification commands
   - record `Verified checkout SHA` when HEAD is available
   - record the verification attempt ID and outcome in `## Closeout` and the Build workbook when workbook-backed state exists
8. In `record-closeout`:
   - write retrospective and knowledge-sync outcomes to the task file
   - set `Completion mode = current-checkout`
   - set `Integration result = current-checkout-verified` when verification passes
   - do not create branches, linked worktrees, verification worktrees, merge commits, or cleanup tasks for those surfaces
9. Stop only with one of:
   - `passed`
   - `blocked`
   - `needs-human`
10. Return the shared command response envelope:
   - `## Executive Summary`
   - `Status` table
   - detail table(s) for closeout phase, verification, or blockers when useful
   - `Recommended next action`

Notes:
- `/done` is closeout-only; it does not reopen Design or Stage planning automatically.
- `/done` does not commit, push, create branches, create linked worktrees, or merge branches unless the user explicitly asks for normal Git operations outside `/done`.
- Running on `main` means Build changes happen in the current checkout. The user remains responsible for deciding when to commit and push.
- Successful current-checkout verification plus durable closeout is the workflow completion boundary.
