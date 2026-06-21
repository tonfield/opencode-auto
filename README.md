# OpenCode Auto

A complete [OpenCode](https://opencode.ai) configuration with the orchestration-first **Auto** agent, feature file system, subagent workers, and verification protocol. Clone once — works as both your opencode config and your project template.

## Quick start

```sh
# Install opencode (macOS)
brew install opencode

# Clone as your opencode configuration
mkdir -p ~/.config
git clone git@github.com:tonfield/opencode-auto.git ~/.config/opencode
cd ~/.config/opencode && npm install

# Set up API keys (via OpenCode's auth store, shell env, or a custom env file)
# The default model is whatever your OpenCode install uses — all subagents inherit it.
# See https://opencode.ai/docs for auth setup.

# Restart OpenCode
```

You now have the full setup: Auto agent, feature files, review, and init commands.

## What's installed

### Auto Agent (`agents/auto.md`)

The sole primary agent. Proactive — no commands needed. Initiative shows up as questioning, surfacing assumptions, and verifying before acting, not as acting fast. Runs the 8-step unified cycle on every request, with critical-thinking and simplicity lenses running continuously (see diagram below). Complex work is decomposed into a feature file with phases and delegation lanes; simple work runs the same cycle inline. Auto orchestrates: it plans, delegates, collects receipts, verifies outputs, and owns final disclosure.

### Commands

| Command | What it does |
|---|---|
| `/feature <slug>` | Switch active feature file. Auto creates features automatically via Decompose (Step 0). |
| `/review [--files \| --topic]` | Run structured code review. Findings → feature `## Issues`. |
| `/init` | Bootstrap project AGENTS.md + docs skeleton. |

### Subagents

`reviewer` `adversarial-reviewer` `goal-evaluator` `repo-search` `docs-research` `impact-mapper` `test-strategist` `patch-implementer`

`reviewer` fires on **every code-change turn** and again during **feature Phase 4 Verify** before adversarial review; `adversarial-reviewer` fires at the **verification boundary for completed durable work**; `goal-evaluator` fires on **every non-urgent turn** (Step 7). `reviewer` selects from a focused lens set (regression, test-failure, correctness, coverage, risk, testability, security, performance, structure, maintainability, challenge). `goal-evaluator` is pure-model — no tools, judges surfaced evidence, returns FULFILLED / NOT FULFILLED / BLOCKED. `adversarial-reviewer` provides mandatory independent ground-truth scrutiny at feature Verify/no-feature durable-change closeout and remains available earlier on demand. `repo-search`, `docs-research`, `impact-mapper`, and `test-strategist` are read-only planning/research workers; `patch-implementer` performs bounded edits only when invoked through a foreground write-capable subagent path, not background delegation.

### File-based knowledge

Reads `docs/gotchas.md` on session start. Writes confirmed recurring pitfalls, patterns, and lessons there during closeout — not via plugins. Keeps the system prompt stable for LLM caching.

---

## How it works

### Request lifecycle

Every request follows the same default cycle. Depth scales naturally with the work — a typo fix runs the same steps as a multi-service refactor, just lighter at each step. Complex work is decomposed into a feature file upfront (Step 0), with optional `## Delegation Plan` lanes for subagent work; simple work skips straight to the cycle. The explicit exception is urgent production-incident work, which uses Baseline → Produce → Verify → Disclosure and records skipped checks. `reviewer` fires on every code-change turn (Step 5) and during feature Phase 4 Verify before adversarial review; `adversarial-reviewer` fires at the verification boundary for completed durable work; `goal-evaluator` fires every non-urgent turn (Step 7).

### The Auto cycle

The default cycle is always on; complex work is decomposed into a feature file first. Urgent production incidents use the compressed path documented in `agents/auto.md`.

```
  0. DECOMPOSE  (once) complex? create feature w/ phases + lanes. simple? skip.

  ┌─────────────────────────────────────────────────────────────┐
  │  1. CLARIFY       vague? ask (batched). else proceed         │
  │  2. BASELINE      read feature (if any), record counts       │
  │     + SCOPE       find active phase in Progress              │
  │  3. PRODUCE       delegate safe lanes or do smallest unit     │
  │  4. VERIFY        parent checks receipts + gate delta         │
  │  5. REVIEW        invoke reviewer                            │
  │  6. IMPACT         what still speaks the old contract?       │
  │  7. GOAL CHECK    invoke goal-evaluator → item/phase verdict │
  │     active item gap ─► restart at 2. fulfilled? → disclosure │
  │  8. DISCLOSURE    Verified/Assumed/Goal/Couldn't verify/     │
  │                   Most likely wrong. self-audit, then send   │
  └─────────────────────────────────────────────────────────────┘
```

### Feature file anatomy (Protocol v2)

```
features/<slug>.md
├── ## Summary          ─ what and why
├── ## Goal (optional)  ─ durable completion condition + budget + evidence
├── ## Baseline         ─ verifier output + Protocol: v2
├── ## Research         ─ [verified] / [assumed] / [open] findings
├── ## Design           ─ approach, alternatives, old contract, rollback
├── ## Receipts         ─ every decision → source table
├── ## Delegation Plan  ─ optional/backfilled subagent lanes
├── ## Progress         ─ PHASE-GROUPED (Auto scopes to active phase)
│   ├── ### Phase 1: Research      ─ pass + status marker
│   ├── ### Phase 2: Design        ─ pass + status marker
│   ├── ### Phase 3: Build         ─ pass + status marker
│   ├── ### Phase 4: Verify        ─ pass + status marker
│   └── ### Phase 5: Close         ─ pass + status marker
├── ## Subagent Receipts ─ optional/backfilled accepted worker results
├── ## Decisions        ─ date-stamped rationale
├── ## Issues           ─ review findings (severity + status)
├── ## Follow-ups       ─ out-of-scope items
└── ## Closeout         ─ final disclosure
```

**Phase flow with backward revalidation:**

```
  Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5
  (Research)  (Design)   (Build)     (Verify)    (Close)
     ▲                         │
     │ ◄───────────────────────┘
        Verify reveals an earlier assumption was wrong
        → RE-OPEN that phase, fix, re-run its pass condition

  (Backward revalidation can fire from any phase, but
   Verify is the most common trigger — test failures and
   review findings expose cracked foundations.)
```

### Subagent invocation

```
YOUR TASK           ──► SUBAGENT              FIRES         WHAT TO PROVIDE
──────────────────────────────────────────────────────────────────────────────────
explore codebase    ──► repo-search            on demand     specific question + boundaries
library docs/API    ──► docs-research          on demand     exact question + version constraints
impact map/lanes    ──► impact-mapper          on demand     target change + suspected surfaces
test strategy       ──► test-strategist        on demand     feature goal + changed surfaces
bounded code edit   ──► patch-implementer      on demand via foreground write-capable subagent     exact spec + allowed_paths / forbidden_paths
code/integration review ─► reviewer            every code-change turn + feature Phase 4 Verify    current diff/feature diff + feature context
                                           (Step 5)
ground-truth check  ──► adversarial-reviewer   feature Verify + durable-change closeout; on demand earlier
                                                           target files + Design/Research/Receipts
is it fulfilled?    ──► goal-evaluator         every non-urgent turn    active item/phase/feature context + evidence
                                           (Step 7)

reviewer selects from focused lenses (regression, test-failure, correctness,
coverage, risk, testability, security, performance, structure, maintainability,
challenge) based on the target. goal-evaluator is pure-model — no tools, judges surfaced evidence.
adversarial-reviewer is mandatory at the verification boundary for completed durable work and re-reads actual files.
```

### Knowledge persistence

```
  SESSION (ephemeral)                    DISK (durable)
  • conversation + tool results          features/<slug>.md  ── per-feature
  • TodoWrite (from ## Progress)         docs/gotchas.md     ── cross-feature
                                         docs/decisions.md   ── project-level
           │                                      ▲
           └──────── on compaction / end ─────────┘
                     state survives to disk
```

---

## Start a new project

```sh
# Copy project template files
cp -r project/* .

# Customize for your project
# Edit AGENTS.md with your commands, conventions, gotchas
# Edit docs/README.md to map your docs

# Start a feature
# OpenCode: just describe your work. Auto creates features when needed.
# Manual switch: /feature add-my-feature
```

### Project template files (`project/`)

| File | Purpose |
|---|---|
| `AGENTS.md` | Project-specific conventions, commands, gotchas. Fill in. |
| `docs/` | Knowledge base skeleton (`README.md` map, `decisions.md`, `gotchas.md`) |
| `features/` | Feature files directory for downstream projects. This config repo ignores its own root `features/`, but `/init` recommends tracking project `features/*.md` so teams can share feature state. |
| `SAMPLE-FEATURE.md` | Complete example feature file |

---

## Feature files

Features replace tasks. One lightweight file per feature at `features/[slug].md`. Delegation sections are optional/backfilled for non-trivial delegated work, so older feature files remain valid. See the feature file anatomy diagram earlier in this README for the full section list, and [`project/SAMPLE-FEATURE.md`](project/SAMPLE-FEATURE.md) for a real example.

---

## Key agent behaviors

| Behavior | What it means |
|---|---|
| **Unified cycle** | Every request runs the same default cycle. Depth scales naturally with the work, with an explicit compressed path for urgent production incidents. |
| **Orchestration** | Auto plans, delegates safe lanes, collects receipts, and owns final verification/disclosure. |
| **Autonomy** | Proceed without asking for reversible actions. |
| **Critical thinking** | Four moves on every step (see `agents/auto.md §Critical Thinking`): question the premise, surface uncertainty and trace claims, steel-man the opposite, pre-mortem non-trivial actions. Not a new gate — runs inside the existing cycle. |
| **Simplicity** | Three moves on every step (see `agents/auto.md §Simplicity`): stop at the first rung that holds (YAGNI → existing solution → one line → minimum), prefer deletion over addition, match the effort to the work. Lazy about effort, abstraction, and volume, never about correctness. |
| **TLDR-first** | Lead with outcome. Readable > concise. |
| **Ground progress** | Audit claims against tool results. |
| **Receipts** | Every non-trivial decision traces to a source — user quote, file:line, or "my judgment — rationale." Never inscribe constraints nobody gave you. |
| **Write your own tests** | Don't rely on existing suite alone. |
| **Failable checks** | Every Progress item names an observable pass condition. "Looks right" is not a check. |
| **Phased work** | Complex requests decomposed into Research → Design → Build → Verify → Close. Each phase has a pass condition; Build slices carry failable checks. If a change invalidates an earlier assumption, re-open that phase. |
| **Mandatory review** | `reviewer` fires on every code-change turn (Step 5) and during feature Phase 4 Verify before adversarial review. Fix accepted findings until clean. |
| **Adversarial review** | `adversarial-reviewer` is mandatory at the verification boundary for completed durable work — feature Verify and no-feature durable-change closeout — and available earlier on demand. |
| **Goal check** | Every non-urgent turn: `goal-evaluator` fires (Step 7) and produces an active-item, phase, or feature verdict — FULFILLED / NOT FULFILLED / BLOCKED — with evidence. Pure-model, separate context. The verdict goes in every disclosure. |
| **Scope discipline** | Don't add features beyond the task. |
| **Act, don't over-deliberate** | Don't re-derive or re-litigate. |
| **Parallel subagents** | Delegate read-only lanes (`repo-search`, `docs-research`, `impact-mapper`, `test-strategist`) in parallel while you keep working. Background delegation is read-only. Use foreground write-capable invocation for `patch-implementer`, and serialize write lanes unless paths/contracts are provably disjoint and recorded. |
| **File-based knowledge** | Read `docs/gotchas.md` on start. Write confirmed recurring patterns there during closeout — no dynamic prompt injection. |
| **Never end on a promise** | Issue the tool call, not a plan. |

---

## License

MIT — use freely for any project.
