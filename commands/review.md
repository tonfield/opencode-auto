---
description: Run an ephemeral structured review for current session work, the current formal mode, or an explicit target.
---
Run an ephemeral structured review for current session work, the current formal mode, or an explicit target.

Reviews do not create files. The hidden `reviewer` subagent returns findings in context, and the active primary agent writes only durable issue state that belongs in a task workbook.

In Auto, reviews are taskless by default: review the current session work and keep findings in chat/TodoWrite unless the user explicitly targets a task.

Accepted request forms:
- `/review`
- `/review --topic "<topic text>"`
- `/review @tasks/<slug>.md#phase:<explore|design|stage|build>`
- `/review @tasks/<slug>.md#heading:<heading-path>`
- `/review @tasks/<slug>.md#build-slice:<sliceId>`
- `/review --files <path1> [<path2> ...]`

Any non-empty raw command argument text that does not match one valid form is `clarification-required`. Bare free-form text is not a topic review; use `--topic`.

Behavior:
1. Validate explicit target grammar before resolving anything.
   - Target classes are mutually exclusive: implicit default, topic, phase-root, heading-subsection, build-slice, or file-set.
   - An explicit task file without a subsection is `clarification-required`.
   - Empty `--topic`, mixed target classes, malformed flags, invalid task references, unknown slice IDs, and bare free-form text are `clarification-required`.
2. Resolve the review target in this order:
   - explicit file paths or explicit topic from valid command arguments
   - Auto/current-session work when the current primary agent is Auto and no explicit task target is supplied: TodoWrite state, touched files/current git diff when available, verification evidence, and current plan/answer when no diff exists
   - active task file plus current primary mode default scope
   - otherwise return status-only `no-op`
3. Determine whether the resolved target belongs to the active task.
    - Explicit topic reviews and unrelated file-path reviews stay standalone even when an active task exists.
    - Auto/current-session reviews stay standalone unless the command explicitly targets a task file.
    - Standalone reviews do not require an active task and never mutate task/workbook state.
4. Invoke `reviewer` with the resolved target, scope, mode context, supporting context, related task when applicable, and workbook issue-sync eligibility.
5. After `reviewer` returns:
    - return the review findings in the command response
    - if the target is Auto/current-session work, convert accepted actionable findings into TodoWrite items when useful and do not mutate task/workbook state
    - if the target belongs to the active task and material findings need durable tracking, update the current mode workbook's `## Round Journal`, `## Round History`, `## Issue Ledger`, `## Fix Notes`, `## Verification`, and `## Closeout` sections as applicable
    - update the task file only for concise phase readiness, handoff, or overall-plan changes; do not paste full review output into the task file
6. Return a compact status block with:
   - `Status`
   - `Resolved target`
   - `Scope`
   - `Related task`
   - `Durable write`
   - `Highest-priority concerns`
   - `Recommended next action`

Target and outcome rules:
- Bare `/review` defaults by active primary mode.
- Auto defaults to current session work unless the user supplies an explicit target.
- Build defaults to `## Build` unless the user supplies file paths.
- A successfully resolved explicit file path remains an explicit file-path review.
- `/review` outcomes are command-local:
  - `completed`
  - `clarification-required`
  - `tool-error`
  - `writeback-error`
  - `no-op`
- `no-op` is only for cases where no safe runnable target resolves.
- `writeback-error` is only for cases where reviewer findings are usable but required workbook/task writeback for an active-task review fails.

Durability rules:
- The active primary agent is the only durable writer.
- `reviewer` is read-only and returns findings in context only.
- Never create `tasks/reviews/` files.
- Never create review artifact IDs, artifact paths, or artifact recovery metadata.
- Active-task reviews persist only the durable residue: issue rows, fix notes, verification state, phase readiness, and handoff changes.
- Standalone and Auto/current-session reviews are chat/context only; accepted actionable findings may become TodoWrite items.
- Use stable reviewer match keys to update existing workbook issues when deterministic.
- If a finding changes phase readiness, sync the workbook's verification and closeout projections and keep `## Handoff` honest.
- Retry `reviewer` invocation at most once per failure class (`tool-error`, `timeout`, malformed output). If it still fails, explicit `/review` returns `tool-error`; internal auto review stops as `needs-human`.
- Retry a failed durable workbook/task write step at most once without reinvoking `reviewer`.

Default scope by active primary:
- Auto -> current session work: explicit target when supplied, otherwise TodoWrite state, touched files/current diff, verification evidence, and current plan/answer when no diff exists
- Explore -> `## Explore`
- Design -> `## Design`
- Stage -> `## Stage`
- Build -> `## Build`
