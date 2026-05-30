---
description: Optimize a raw request into a high-quality LLM prompt, validate required details, ask clarifying questions until complete, then execute it.
---

Optimize the user's raw request into a stronger prompt for LLM communication, then execute it.

This command is the public wrapper around the shared prompt optimization contract. First read and apply `~/.config/opencode/instructions/prompt-optimization.md`. If that file cannot be read, stop and report the configuration problem instead of recreating the contract from memory.

Use the raw command arguments supplied after `/optimize` as the prompt to optimize. If the command has no usable prompt text, ask the user to provide the prompt or task they want optimized.

## Accepted form

- `/optimize <prompt>` — validate requirements, ask questions if needed, then optimize, show the optimized prompt, and execute it.

There are no special flags or draft modes. The command's default behavior is always question-first when the raw prompt is incomplete.

## Core contract

Use the shared contract's core rules, requirement audit, clarifying-question loop, formatting guidance, and task-specific requirement checks. When the raw prompt already satisfies all required details, say so briefly, show the optimized version, then execute it.

## Output and execution

When the requirement audit passes, respond first with:

````markdown
## Optimized Prompt
```text
[the optimized prompt]
```

## Requirements Covered
- Goal: ...
- Context/scope: ...
- Constraints/output/verification: ...

## Improvements Made
- [brief bullets naming the highest-leverage changes]
````

Then immediately execute the optimized prompt in the same conversation. Do not wait for confirmation after showing it unless the optimized prompt itself requires approval before a risky or irreversible step.

If execution reveals that a critical requirement is still missing or a user answer was misunderstood, stop and ask the smallest clarifying question needed rather than continuing on a bad premise.

## Rules

- Preserve user intent over prompt-engineering neatness.
- Do not use external model calls for the optimization step itself.
- Do not browse the web merely to optimize the prompt. Browse only if the optimized prompt being executed requires current/external information.
- Do not expose hidden chain-of-thought; provide concise rationale only.
- Keep the final prompt copy-pasteable.
