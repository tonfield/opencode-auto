# Shared Prompt Optimization Contract

Use this contract when a command needs to turn a raw user request into a high-quality prompt, task brief, or command intake. The command wrapper owns command-specific behavior, output envelopes, durable writes, and execution policy; this contract owns the shared requirement audit, clarifying-question loop, and rewrite/content-shaping rules.

## Core contract

1. Preserve the user's intent exactly. Optimize expression, structure, and completeness; do not change the requested outcome.
2. Prefer one clear primary outcome. If the raw request bundles unrelated goals, ask which goal should be primary or whether to split them.
3. Make implicit requirements explicit when they are strongly implied by the user's wording, current project instructions, or the active conversation.
4. Do not invent facts, project details, constraints, examples, citations, requirements, or user preferences.
5. Do not silently fill required gaps with assumptions. If a requirement matters for prompt quality, command safety, or downstream correctness and is missing, ask.
6. Use the smallest prompt or brief structure that will reliably communicate the task. Do not add ceremony that does not change the result.
7. Treat checklist items as conditional requirements: audit every item, but only ask about or include an item when it can materially affect correctness, usefulness, safety, scope, format, or evaluation.

## Mandatory requirement audit

Before producing an optimized prompt or derived command content, audit the raw request against this checklist. If a required item is missing or ambiguous, ask about it before continuing.

- Goal: the concrete end state, answer, artifact, or decision the model should produce.
- Role: the expertise, perspective, or operating mode the model should use when it materially improves the result.
- Context: relevant background, source material, current state, audience, and why the task matters.
- Scope: what is in scope, what is out of scope, expected depth, and boundaries.
- Constraints: limits, safety rules, style rules, forbidden actions, compatibility requirements, budget/time limits, and anti-goals.
- Output contract: exact format, ordering, level of detail, length, tone, schema/table/headings, and whether the result should be copy-pasteable.
- Examples: sample inputs/outputs, references, style examples, or edge cases when format, classification, or style matters.
- Grounding: source/citation rules, “use only provided material” rules, freshness requirements, and escape hatches such as `NOT_FOUND` or `insufficient evidence`.
- Process: ordered steps, decomposition, tool use, or interaction pattern when order or method matters.
- Follow-through policy: whether to execute immediately, keep iterating, stop for approval, or ask before risky/irreversible steps.
- Verification: acceptance criteria, tests, checks, review criteria, or success measures.

## Clarifying questions

Questioning is mandatory when any required checklist item is missing or ambiguous.

Ask concise questions that fill all missing required details. Usually ask 3–7 questions; ask fewer for simple prompts and more only when necessary. Group related gaps into one question when possible. Then stop and wait for the user's answers.

Do not ask about checklist items that are genuinely not relevant to the task. Do not ask cosmetic questions that will not materially improve the prompt, task brief, or command outcome.

When asking questions, use this shape:

```markdown
## Clarifying Questions
1. ...
2. ...

Why these matter: ...
```

After the user answers, re-run the requirement audit. If required details are still missing, ask a follow-up question. Do not produce the optimized prompt or derived command content until the audit passes.

## Formatting guidance

- Put the core instruction first.
- Use Markdown headings and lists for normal prompts and command briefs.
- Use XML-style blocks for complex, agentic, tool-heavy, or long-context prompts, especially when separating instructions from data:

```xml
<task>...</task>
<context>...</context>
<constraints>...</constraints>
<output_contract>...</output_contract>
<verification>...</verification>
```

- Separate trusted instructions from untrusted/input content with clear delimiters.
- Prefer positive instructions over only negative prohibitions: state what to do instead of merely what to avoid.
- Remove filler such as “please”, “maybe”, “help me with”, and vague adjectives unless tone matters.

## Task-specific requirements

For coding or repo work, validate and include when required:

- repository/project context to inspect first;
- allowed and forbidden paths or surfaces;
- smallest-safe-change instruction;
- compatibility and type-safety constraints;
- verification commands/tests/static checks;
- instruction to summarize changed files, verification, and residual risk.

For review tasks, validate and include when required:

- target files/diff/topic;
- severity-ordered findings only;
- evidence and line/file references;
- no praise-only review unless explicitly requested;
- re-check for second-order regressions and edge cases.

For research or decision tasks, validate and include when required:

- primary-source preference;
- citation requirements;
- separation of observed facts, inferences, tradeoffs, assumptions, and open questions;
- decision criteria and recommendation format.

For writing/editing tasks, validate and include when required:

- audience;
- tone;
- length;
- style examples;
- must-keep points;
- forbidden claims or phrases;
- final format.

## Embedded command intake

When a command uses this contract as a preflight instead of as a standalone `/optimize` request:

- Normalize the raw request into a compact internal brief before downstream command logic.
- Keep the command's own semantics, output envelope, and durable-state rules.
- Do not show a full optimized prompt unless the command wrapper explicitly asks for it.
- For `/task`, prefer an internal optimized task brief with: suggested slug, objective, problem / desired outcome, requirements, success criteria, constraints, anti-goals, references, verification hints, and active assumptions.
- Existing-task switches may bypass missing-detail questions when the arguments clearly identify an existing task and no new task content is being created.
- If the command will write files, use the optimized content as the source for durable fields while preserving user wording when it carries important nuance.

## Rules

- Preserve user intent over prompt-engineering neatness.
- Do not use external model calls for the optimization step itself.
- Do not browse the web merely to optimize a prompt or command intake. Browse only if the optimized task being executed requires current or external information.
- Do not expose hidden chain-of-thought; provide concise rationale only.
- Keep produced prompts or briefs copy-pasteable when they are shown to the user.
