---
description: Run an ephemeral review. With active feature, persist findings to ## Issues.
---
Run a focused review using the reviewer subagent.

Accepted forms:
- `/review`
- `/review --files <path1> [<path2> ...]`
- `/review --topic "<topic>"`

Behavior:
1. Resolve the target:
   - Explicit `--files`: review those paths.
   - Explicit `--topic`: review that topic against current feature context.
   - No flags, active feature exists: review current git diff + touched files.
   - No flags, no feature: ask for a target.
2. Invoke `reviewer` with:
   - mode context: "feature"
   - target: resolved files, diff, or topic
   - supporting context: active feature's `## Design` and `## Research` when relevant
   - risk profile: LOW/MEDIUM/HIGH, default MEDIUM
3. Return findings in chat.
4. If an active feature exists and findings are actionable:
   - Append each material finding to feature `## Issues`:
     ```
     - [ ] [summary] — severity: low/medium/high — status: open
     ```
   - If findings affect feature readiness, update `## Progress`.
5. Standalone reviews (no active feature) stay in chat only.

Outcomes:
- `completed` — review ran and findings returned.
- `clarification-required` — target ambiguous or unparseable.
- `no-op` — no safe resolvable target.

Reviews never create review artifact files or mutate anything outside the feature `## Issues` section.
