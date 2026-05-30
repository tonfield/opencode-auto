---
description: Create or improve a project AGENTS.md, standard docs, and task ignore rules using the solo dev workflow.
---
Create or update the current project's `AGENTS.md`, standard docs skeleton, and task ignore rules.

This command runs inside the user's current primary-agent session and must not silently switch the active primary mode.

Follow this process exactly:

1. Find the project root and check whether these already exist there:
   - `AGENTS.md`
   - `docs/README.md`
   - `docs/decisions.md`
   - `docs/gotchas.md`
   - `.gitignore`
2. Scan the repo lightly but intelligently. Prioritize files that reveal durable project guidance, such as:
   - `README*`
   - `docs/README.md`
   - `docs/decisions.md`
   - `docs/gotchas.md`
   - package manifests (`package.json`, `pyproject.toml`, `Cargo.toml`, etc.)
   - workspace/monorepo config
   - lint/test/build config
   - CI files
   - contributor docs
   - existing local instruction files
3. Ask only the smallest number of targeted questions needed to fill important gaps that the codebase cannot answer confidently.
4. Create or improve the project-root `AGENTS.md`.
5. Create or improve the standard docs skeleton under `docs/`.
   - `docs/README.md` should become the stable entrypoint for both humans and AI.
   - `docs/decisions.md` should hold accepted project-level decisions and supersessions.
   - `docs/gotchas.md` should hold recurring pitfalls, invariants, and change-impact warnings.
   - If `docs/` does not exist yet, create it.
   - If the repo already has project-specific docs, preserve them and make `docs/README.md` map to them instead of rewriting them.
6. Create or improve the project-root `.gitignore` conservatively when the repo should use the workflow task-file split.
   - Goal: track top-level `tasks/*.md` durable task files while keeping `tasks/workbooks/` and `tasks/runtime/` local-only.
   - Prefer a managed block so later reruns stay idempotent.
   - If the repo already has a blanket `tasks/` ignore, migrate it to the managed split when safe.
   - If the repo already has custom task-related ignore rules that conflict with the managed split, ask once before rewriting them.
   - Do not rewrite unrelated ignore rules aggressively.

Output goals:
- Write **project-specific** guidance only.
- Assume the user's global Explore / Design / Stage / Build workflow already exists.
- Do **not** restate the global 4-mode workflow unless this repo intentionally overrides it.
- Do **not** weaken the global rule that each mode uses a step-by-step current-phase TodoWrite checklist with one action per todo.
- Preserve user-authored content where possible and update generated guidance idempotently.
- Keep the file concise, practical, and durable.
- Prefer bullet points over long prose.
- Omit sections that would be empty or generic.
- Keep the docs skeleton consistent across projects while letting the project-specific doc map and examples differ.
- Update `.gitignore` conservatively and only for the task-surface split; do not treat `/init` as a general ignore-file formatter.

When updating an existing `AGENTS.md`:
- preserve useful project-specific content
- improve structure and clarity
- remove obvious duplication of global workflow rules when safe
- do not rewrite the file aggressively if it is already good

When updating existing docs:
- preserve useful project-specific content
- improve `docs/README.md` as the doc map and authority guide
- add missing standard files with minimal useful content rather than forcing large rewrites
- do not rewrite existing domain docs aggressively when a small doc-map improvement is enough

When updating `.gitignore`:
- preserve unrelated user-authored ignore rules
- prefer a managed task-surfaces block or the smallest safe edit
- if the old blanket `tasks/` ignore is present and no conflicting custom task rules exist, replace it with the managed split
- if task rules are already correct, no-op

Use this shape unless the repo clearly needs a different structure:

```markdown
# [Project / Repo Name]

## Project Overview
- [what this repo is]
- [important stack/runtime/workspace context]

## Project Structure
- `[path]` - [what lives here]

## Commands
- Dev: `[command]`
- Test: `[command]`
- Lint: `[command]`
- Build: `[command]`

## Conventions
- [repo-specific coding / architectural conventions]
- [important naming / layering / generated-file rules]

## Verification
- [how to verify changes in this repo]
- [important command order or scoped checks if relevant]

## Gotchas
- [setup quirks, environment assumptions, or easy-to-miss constraints]

## Safe Parallelism
- [areas safe to edit independently]
- [areas that should stay serialized]

## Task Workflow Overrides
- [only include if this repo intentionally differs from the user's global task workflow]

## Workflow Notes
- [optional recurring bottlenecks, review failure patterns, or repo-local workflow hints]
```

Use this docs skeleton unless the repo clearly needs a richer variant:

```markdown
docs/
├── README.md        # docs map, reading order, authority, fast lookup
├── decisions.md     # accepted decisions and supersessions
├── gotchas.md       # recurring pitfalls, invariants, and change-impact notes
└── ...              # project-specific docs such as architecture, API, runtime, or runbooks
```

Docs rules:
- Always create or preserve `docs/README.md` as the docs entrypoint.
- Keep `docs/decisions.md` append-oriented: add new accepted decisions or supersession notes instead of silently rewriting history.
- Keep `docs/gotchas.md` practical: include failure modes, invariants, easy-to-miss rules, and “check these files together” warnings.
- Document current truth, not speculative design that has not been accepted yet.
- If the repo has no docs yet, still create a minimal useful skeleton.

Managed `.gitignore` task-surface block:

```gitignore
# BEGIN opencode task surfaces
tasks/**
!tasks/
!tasks/*.md
!tasks/workbooks/
!tasks/runtime/
tasks/workbooks/**
tasks/runtime/**
# END opencode task surfaces
```

Rules:
- If the repo has no meaningful project-specific rules yet, still create a minimal useful `AGENTS.md` rather than repeating generic advice.
- If commands are unclear, prefer documented commands from the repo over guesses.
- If a project-specific task workflow differs from the global one, document only the delta.
- If you add `## Task Workflow Overrides`, preserve the global expectation that Explore, Design, Stage, and Build all use step-by-step TodoWrite tasks for the current phase unless the repo truly needs a stricter repo-specific variant.
- If the repo already has task docs or contribution docs, incorporate the useful parts instead of duplicating them.
- Treat `AGENTS.md` as partly managed output when you create it: update in place when sections are clearly yours, preserve surrounding user-authored text, and prefer a no-op over destructive rewrite when the current file is already good.
- `/init` updates the project-root `AGENTS.md`, the standard docs skeleton, and the task-surface `.gitignore` block by default; do not rewrite task files, create `tasks/workbooks/`, or migrate existing repo-local workflow artifacts implicitly.

Finish by summarizing:
- whether `AGENTS.md` was created or updated
- whether `docs/README.md`, `docs/decisions.md`, and `docs/gotchas.md` were created or updated
- whether `.gitignore` was created or updated for the task-surface split
- the main sections added/changed
- any questions that still need user confirmation
