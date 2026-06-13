---
description: Advance active feature work with the Fable5 verification protocol.
---
Advance the active feature's work using the Fable5 protocol from AGENTS.md.

Routing:
1. If no active feature is set, ask once instead of guessing.
2. Read the active feature file. Refresh TodoWrite from `## Progress`.
3. If `## Baseline` is empty, establish it now:
   - Run the project verifier (e.g., `uv run pytest`).
   - Record date, verifier command, result (N tests, M failing {names}), and commit SHA.
   - Report baseline to the user.
4. Advance one bounded TodoWrite item:
   - State the blast radius in one phrase: "low-blast, reversible" / "high-blast: touches X."
   - Implement the change.
   - Re-run the whole gate.
   - Report delta in this exact format:
     ```
     baseline: N tests, M failing {test_a, ...} → now: N' tests, M' failing {test_x, ...}
     ```
   - Tag all load-bearing claims `[verified]` or `[assumed]` inline.
5. If the change is material (shared interface, complex logic, new code):
   - Invoke `reviewer` on changed files with context "feature."
   - Fix accepted material findings.
   - Append actionable findings to feature `## Issues`.
   - Re-verify → report delta.
6. Before marking a slice done, check what still speaks the old contract:
   - Callers that expect the old behavior?
   - Cache or persisted state in the old format?
   - Docs or configs referencing the old interface?
   - If any exist and aren't addressed, the slice is not done.
7. After implementation work, output the honesty block in chat:
   - **Verified:** what you actually ran or read.
   - **Assumed:** what you reasoned but did not confirm.
   - **Couldn't verify:** what's unknowable from where you sit.
   - **Most likely wrong:** what you'd bet against if forced.
8. If feature `## Progress` is fully checked:
   - Run final verification.
   - Write the final honesty block into feature `## Closeout`.
   - Report: feature complete.
9. Else: update `## Progress`, report next step.

Outcomes:
- `passed` — current work item complete, verified, honesty block reported.
- `blocked` — external prerequisite or tool/runtime issue prevents safe progress.
- `needs-human` — ambiguous decision, product-level tradeoff, or unbounded scope.
