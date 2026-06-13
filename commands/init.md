---
description: Create or improve a project AGENTS.md and standard docs skeleton.
---
Bootstrap or refresh the current project's `AGENTS.md`, standard docs, and `.gitignore`.

Process:
1. Find project root. Check for existing:
   - `AGENTS.md`
   - `docs/README.md`
   - `docs/decisions.md`
   - `docs/gotchas.md`
   - `.gitignore`
2. Scan the repo lightly: package manifests, CI config, README, existing docs.
3. Ask only the smallest targeted questions needed to fill gaps the codebase can't answer.
4. Create or update `AGENTS.md` at project root. Use this shape:

```markdown
# [Project Name]

## Project Overview
- [what this repo is, stack, runtime]

## Project Structure
- `[path]` - [what lives here]

## Commands
- Dev: `[command]`
- Test: `[command]`
- Lint: `[command]`
- Build: `[command]`

## Conventions
- [repo-specific conventions]

## Verification
- [how to verify changes]

## Gotchas
- [pitfalls, invariants, constraints]

## Safe Parallelism
- [safe to edit independently]
- [keep serialized]
```

5. Create or update `docs/` skeleton:
   - `docs/README.md` — doc map, reading order, authority
   - `docs/decisions.md` — append-only decision log
   - `docs/gotchas.md` — recurring pitfalls and invariants
   - Preserve existing project docs; make `docs/README.md` map to them.
6. Optionally: add managed `.gitignore` block for `features/` surfaces:

```gitignore
# BEGIN opencode feature surfaces
features/*
!features/
!features/*.md
# END opencode feature surfaces
```

7. Summarize what was created or updated.

Rules:
- Write project-specific guidance only. Do not restate the global feature system from `AGENTS.md`.
- Preserve user-authored content when updating.
- Keep files concise and practical.
- Document current truth, not speculative design.
