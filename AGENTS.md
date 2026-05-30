# Global Solo Dev Workflow

Use a 4-mode formal workflow plus a taskless Auto session agent.

Formal workflow:

- Explore
- Design
- Stage
- Build

Taskless session work:

- Auto

## Core rules

- Current mode comes from the active primary agent, not from todo items.
- Auto is a taskless primary agent for accountable ad hoc/session work. It uses TodoWrite, current conversation, touched files, working-tree diff, and verification evidence as live state.
- For formal non-review work, first confirm the active task file, usually `@tasks/[slug].md`.
- Auto does not start, switch, or run formal task phases. Use `/task`, `/autoflow`, or the Explore/Design/Stage/Build primary agents for formal task processing.
- If the active task is unclear during formal task work, ask once before writing durable task state.
- Mere references to another task file do not automatically switch the active task.
- Before switching modes or tasks, write back durable state worth keeping.

## Source of truth

- `tasks/[slug].md` is the durable job record.
- Top-level `tasks/*.md` files are the tracked task-history surface.
- `tasks/workbooks/*.md` holds per-mode issue, fix, verification, and closeout ledgers.
- `TodoWrite` is the live execution checklist for the current formal phase or current Auto session.
- Auto has no task/workbook source of truth by default; its state is TodoWrite plus current session context, changed/touched files, working-tree diff, and verification evidence.
- The task file, workbook, and TodoWrite are intentionally not kept in line-by-line sync.
- Reviews are ephemeral: the hidden `reviewer` returns findings in context, and only durable follow-up goes into workbooks or task handoff.
- `tasks/workbooks/` and `tasks/runtime/` are local high-churn execution surfaces, not the tracked task-summary path.

## Task file conventions

- Task files hold the overall job: summary, context, requirements, constraints, overall plan, handoff, workspace, closeout, and mode outputs.
- `## Overall Plan` stays high level: phases, checkpoints, dependencies, and major outcomes.
- `## Handoff` records the recommended next phase, blockers, and next durable update.
- Use `## Workspace` for current-checkout metadata such as workspace mode, working branch, base ref, and resume hint.
- Use `## Closeout` for `/done` checkpoint and integration state when closeout is in scope.
- Use `## Review Status` only for concise review readiness notes; the issue ledger lives in the workbook.
- Do not store the session checklist, full review text, raw shell dumps, or ephemeral scratch state in task files.

## Workbook conventions

- When a phase is workbook-backed, keep the workbook as a structured ledger for rounds, issues, fixes, verification, and closeout.
- Review findings that need follow-up become issue rows keyed by stable match keys.
- Standalone reviews stay in context and do not mutate task or workbook state.
- Bootstrap missing workbooks from task-file authority only when deterministic; stop with `needs-human` when durable sources disagree ambiguously.

## Project docs standard

- Treat `docs/` as the shared project knowledge base for both humans and AI.
- The universal docs skeleton is:
  - `docs/README.md` — docs map, reading order, authority rules, and fast lookup
  - `docs/decisions.md` — accepted project-level decisions and supersessions
  - `docs/gotchas.md` — recurring pitfalls, invariants, and change-impact warnings
- Keep reusable project knowledge in `docs/`; keep task-local reasoning and temporary uncertainty in task files and workbooks.
- Docs should describe accepted current truth, not speculative intent.

## Global tool/MCP policy

- The global MCP/tool surface is intentionally high-autonomy and broadly available.
- Prefer the cheapest precise tool first: local read/search for known files, ast-grep for structural code invariants, Context7 for library docs, Exa/Brave for external or current web evidence, and memory search for prior-session patterns.
- Do not use web/MCP just because it exists; use it when it improves evidence quality, reduces guesswork, or verifies an external claim.
- Brave Search MCP: do not set the optional `api-version` parameter/header. Let Brave use its default/latest API version; the global `brave-search-default-version` plugin strips accidental `api-version` arguments from Brave tool calls.

## Permission routing policy

- Primary agents may use read/search/edit/bash/web/MCP tools inside the active request scope; ask before destructive, credentialed, or ambiguous operations.
- Local repo workers (`repo-search`, `regression-reviewer`, `slice-planner`, `verification-planner`, `reviewer`) stay read-only and local-first: read/glob/grep/list plus ast-grep only; no bash, writes, web, or external MCP unless the parent explicitly changes scope.
- External evidence workers (`docs-research`, `evidence-verifier`) are read-only but may use web, Context7, Exa, Brave, and MCP sources when those sources answer the assigned question better than local files.
- Write helpers (`patch-implementer`) edit only parent-declared allowed paths, never run shell/web/MCP, and leave final verification and acceptance to the parent.
- Verification analysts (`test-triage`) analyze provided logs, diffs, files, and command output only; they do not execute commands or mutate files.
- Delegated output is advisory until the parent checks scope, evidence, actions taken, and verification before relying on it.

## Context routing policy

- Global `AGENTS.md` is the lean always-on operating contract: workflow, authority, routing, permissions, and context policy.
- Project `AGENTS.md` holds project-specific commands, invariants, architecture, verification, and coordination rules.
- Agent files hold mode/subagent behavior; command files hold long procedural workflows; skills hold rare specialized workflows triggered by explicit fit.
- Memory holds compact reusable facts and preferences; project docs hold accepted project truth; task/workbook files hold formal task state.
- DCP summaries preserve closed conversation history. Do not treat them as a substitute for active file reads, exact error output, or fresh verification when editing or debugging.
- Keep always-on instructions small. Move detailed references to commands, skills, docs, or agent prompts unless they must affect every turn.

## Todo conventions

- TodoWrite holds only the active formal phase checklist or the current Auto session checklist.
- Replace the todo list when switching tasks, formal phases, or Auto session objectives.
- Use short imperative task text with no phase tags or numbering.
- One action per todo.
- Atomic todo rule: one primary verb, one immediate objective, one owner/session, and one observable done condition.
- Before substantive work in any mode, expand the active phase/session into 4-10 step-by-step todos when the work is non-trivial.
- Split research, decisions, implementation slices, verification, and durable writeback into separate todos when each is relevant.
- Do not preload future-phase work into TodoWrite.

## Writing rules

- Formal primary modes may update task documentation and accepted project docs when needed for continuity; Auto stays taskless and does not manage task/workbook state.
- Only primary mode agents should write durable files; subagents and reviewers should return content for the active primary agent to evaluate.
- When primaries use subagents, do a light envelope check on child output before relying on it.
- Keep durable updates concise and useful for resuming later.

## Review rules

- If the user asks to review, route through `reviewer`.
- Default review scope:
  - Auto -> current session work: explicit target when supplied, otherwise TodoWrite state, touched files/current diff, verification evidence, and current plan/answer when no diff exists
  - Explore -> `## Explore`
  - Design -> `## Design`
  - Stage -> `## Stage`
  - Build -> `## Build`
- If the user provides file paths, review those paths directly.
- If the user asks for a topic review, do not automatically switch the active task.
- Auto/session reviews are standalone by default: do not mutate task/workbook state, and convert accepted actionable findings into TodoWrite items when useful.
- Active-task review findings that need durable follow-up update the current mode workbook issue ledger.
- Reviews never create `tasks/reviews/` files.
- Size review depth by LOW/MEDIUM/HIGH risk: adjust restart caps, required re-review, and selected lenses; do not resurrect default reviewer fanout or review files.

## /auto behavior

- In Auto, `/auto` means continue the current taskless session loop: inspect current work, advance the next bounded TodoWrite item, verify, review current diff/touched files when useful, fix accepted findings, and summarize.
- Auto `/auto` does not create, switch, read, or update task files/workbooks. If formal state is needed, use `/task`, `/autoflow`, or a formal primary agent.
- In Explore, Design, Stage, or Build, `/auto` remains phase-scoped formal automation against the active task/workbook state.

## /task behavior

- Use `/task` to create or switch task files.
- Reuse existing task files idempotently instead of silently rewriting them.
- Use the current checkout for task work; do not create task branches, linked worktrees, verification worktrees, or writer leases.
- New tasks should seed durable summary/plan/handoff/workbook structure and, when TodoWrite is available, start with an Explore checklist.
- New or refreshed task files should preserve or create `## Workbooks` links so `/auto`, internal review/fix cycles, and Build closeout can use workbook-backed state.
- Ensure `tasks/`, `tasks/workbooks/`, and `tasks/runtime/` exist before writing new task-local artifacts.

## /init behavior

- `/init` may create or refresh the current project's `AGENTS.md`, standard docs skeleton, and task-surface `.gitignore` block.
- The task-surface split tracks top-level `tasks/*.md` while keeping `tasks/workbooks/` and `tasks/runtime/` local-only.
- `/init` does not rewrite task files, create workbooks, or migrate older repo-local workflow artifacts unless the command explicitly says so.

## General behavior

- Ask once when clarification is truly needed.
- Prefer small, explicit, durable updates over broad implicit changes.
- Keep responses concise unless the user asks for more detail.
- There is no `/mode` command; `/auto` owns active-agent status/sync/continue behavior.
