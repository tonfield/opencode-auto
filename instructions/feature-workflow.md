# Feature Development System — Reference

This file holds detailed operational reference for the feature development system. It is loaded as an instruction for deeper context when needed, but the authoritative rules live in `AGENTS.md`.

## Feature File Conventions

### Sections

- `## Summary` — what and why in 2-4 sentences. Update when scope changes.
- `## Baseline` — verifier output recorded on first `/auto` run. Date, command, result, commit.
- `## Research` — findings tagged [verified]/[assumed]/[open]. Short evidence with file:line or command output.
- `## Design` — approach, alternatives with rejection reasons, interfaces touched, old contract to preserve, rollback.
- `## Progress` — flat checklist. Update in place. No phase gating.
- `## Decisions` — append-only. Date, decision, rationale.
- `## Issues` — findings from reviews. Severity + status. Remove when fixed and verified. Keep it clean.
- `## Follow-ups` — out-of-scope items spotted during this feature. One line each.
- `## Closeout` — final honesty block written when Progress is fully checked.

### Switching features

- No ceremony. Read the new feature file, replace TodoWrite, continue.
- Old feature progress stays in its file. Pick up where you left off.

## Verification Cycle

1. **Baseline** — first `/auto` run establishes it. Record in feature file.
2. **Implement** — one bounded TodoWrite item. State blast radius first.
3. **Verify** — re-run the whole gate. Report delta in exact format.
4. **Review** — if change is material, invoke reviewer. Fix accepted findings.
5. **Check old contract** — before marking done, name what still speaks the old interface.
6. **Honesty block** — output in chat after every implementation session.
7. **Closeout** — when Progress is done, write final block to feature file.

## Review Integration

- `/review` invokes the reviewer subagent.
- Findings are returned in chat. With active feature, actionable items go into `## Issues`.
- Issues format: `- [ ] [summary] — severity: low/medium/high — status: open`
- Mark as `[x]` when fixed and verified. Remove stale issues periodically.
- Reviews never create separate artifact files.

## Delegation Patterns

### When to delegate

- `repo-search` — finding callers, mapping patterns, exploring unknown codebases
- `docs-research` — external library docs, API references, version-specific behavior
- `evidence-verifier` — conflicting claims, uncertain assumptions
- `patch-implementer` — bounded code changes with clear scope and allowed paths
- `test-triage` — analyzing complex test failure output
- `regression-reviewer` — second-opinion risk check on changed areas
- `reviewer` — structured code review

### Delegation rules

- Read-only subagents return evidence; parent owns decisions and writes.
- For patch-implementer: declare allowed_paths, forbidden_paths, parent-owned verification.
- Check child output envelope before relying on it: Status, Scope, Summary, Recommended next action.
- Reject out-of-scope results. Tag relayed claims [verified]/[assumed].

## TodoWrite Patterns

- Derive from feature `## Progress`. One action per todo.
- One `in_progress` at a time.
- Split research, implementation, verification, writeback into separate items.
- Prefer 4-10 items for non-trivial work.
- Replace when switching features.

## Project Docs

- `docs/` is the shared knowledge base for humans and AI.
- Standard: `docs/README.md` (map), `docs/decisions.md` (append-only), `docs/gotchas.md` (pitfalls).
- Promote into docs when knowledge is reusable across features.
- Feature-local reasoning stays in the feature file.

## Closeout Flow

When feature Progress is fully checked:
1. Run final verification.
2. Verify no blocking issues remain in `## Issues`.
3. Write honesty block into `## Closeout`.
4. Report: feature complete.
5. No separate closeout ceremony, branch management, or integrity suite.
