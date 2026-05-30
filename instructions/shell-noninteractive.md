# Shell non-interactive policy

OpenCode shell commands run without an interactive TTY. Any command that waits for input, opens a pager/editor, starts a REPL, or prompts for credentials can hang the session.

## Core rules

- Prefer dedicated tools for file reads, searches, edits, and writes; use shell for execution, package managers, tests, git, and system commands.
- Assume headless execution: no editors, pagers, REPLs, interactive shells, or prompt-driven flows.
- Use explicit non-interactive flags and arguments when they preserve safety, such as commit messages, fixed paths, `--no-input`, `--non-interactive`, `--ci`, or `--yes` for safe creation flows.
- Do not use `--force`, `-f`, `yes |`, broad deletes, credential prompts, or privilege escalation merely to avoid interaction.
- Ask the user before destructive, credentialed, ambiguous, or externally visible actions.

## Command hygiene

- Quote paths that contain spaces or shell-significant characters.
- Prefer bounded commands with clear targets; avoid commands that wait indefinitely.
- Disable pagers where relevant, for example `git --no-pager ...`.
- Provide explicit messages for git operations; never rely on an editor opening.
- Use `python -c`, `node -e`, or scripts instead of REPLs.
- For commands that might hang, use the tool timeout and report the result rather than retrying blindly.

## Continuation behavior

- After shell output, continue to the next safe verification or repair step when the task is not complete.
- Stop and ask only when the next action needs a human/product decision, credentials, destructive approval, or a larger workflow.

Long command examples and historical rationale are archived at `./instructions/reference/shell-strategy-reference.md`.
