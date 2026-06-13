---
description: Create or switch the active feature using the feature development system.
---
Create or switch the active feature file.

Behavior:
1. Parse the command arguments for a slug. If none is provided, ask for one.
2. Check whether `features/[slug].md` already exists.
3. If it exists:
   - Read it.
   - Report current state: Summary, Progress, open Issues.
   - Refresh TodoWrite from `## Progress`.
   - Announce active feature.
4. If it does not exist:
   - Ensure `features/` directory exists.
   - Create `features/[slug].md` from the feature template.
   - Seed `## Summary` from any context the user provided.
   - Set initial Progress: Research pending, Design pending.
   - Refresh TodoWrite with first steps: research + design.
   - Announce new feature created.
5. Do not run an optimization preflight. Features start light and grow.
6. Do not create branches, worktrees, or workspace metadata. Features are file-only.

Finish with a compact status block:
- Feature: `features/[slug].md`
- Status: new / existing
- Progress summary
- Next recommended action
