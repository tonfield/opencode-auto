# Custom provider onboarding

Use this contract when the user wants to add, replace, or normalize a provider or model for OpenCode.

## Goal

Make provider onboarding predictable enough that a primary agent can perform the setup with only a small amount of user input while keeping secrets out of the repo.

## Prefer built-in providers first

- If OpenCode already supports the provider directly via `opencode providers login`, prefer that built-in path.
- Built-in providers should keep using OpenCode's auth store directly without extra shell glue.

## Use the normalized custom-provider path otherwise

For custom OpenAI-compatible providers, use this exact pattern:

1. Add or update the provider entry in `~/.config/opencode/custom-providers.json`.
   - Treat this file as the structured onboarding registry for custom providers.
   - Record provider id, display name, auth-store key, env var name, base URL, and model metadata there.
2. Add or update the provider block in `~/.config/opencode/opencode.json`.
   - Use `@ai-sdk/openai-compatible` unless a stronger reason exists.
   - Set `baseURL` explicitly.
   - Use an environment placeholder for the API key, such as `{env:MY_PROVIDER_API_KEY}`.
   - Add the concrete model entries that the workflow needs, including display name and token limits when known.
3. Do not hand-edit env export lines in `~/.config/opencode/opencode-auth-env.sh` for normal onboarding.
   - The managed helper reads env mappings from `custom-providers.json` automatically.
4. Store the real secret only in local OpenCode auth storage.
   - Never commit secrets, resolved debug output, or `auth.json` contents.
   - Prefer a provider-id key in `~/.local/share/opencode/auth.json` that matches the custom provider mapping.
5. Verify.
    - Run `opencode agent list` to verify config loading.
    - Run a direct model smoke test with `opencode run -m provider/model ...` when the API key is available and the user accepts any model cost.
    - If updating this setup from a source repo instead of the installed global config, also run that repo's install/drift-check scripts.

## Required setup inputs

Ask for or infer only the minimum needed fields:

- provider id
- display name
- auth-store key when it differs from provider id
- base URL
- API key env var name
- model id or ids
- model display names
- token limits if known
- whether the provider is built-in or custom OpenAI-compatible
- whether the model should be available for manual use or assigned to a specific agent

If any of those are ambiguous, ask once before writing durable config.

## Existing-project rollout

After a global provider change is installed:

1. Existing projects usually do not need per-project provider edits.
2. If you want refreshed repo-local guidance, rerun `/init` in those repos.
3. If an older repo still behaves like the pre-workbook flow, rerun `/task` on the active task so task-file handoff and workbook links are refreshed.

Provider setup is global; `/auto`/`/autoflow` are not part of provider onboarding.

## New-machine rollout

When bringing this workflow to a new computer:

1. Clone the repo.
2. Install the managed workflow with `bash scripts/install-global-workflow.sh`.
3. Source the managed helper from the shell rc:

```bash
source "$HOME/.config/opencode/opencode-auth-env.sh"
```

4. Ensure provider secrets exist only in local OpenCode auth storage.
5. Run the drift check.
6. Run direct model smoke tests for any required custom providers.

## Safety rules

- Never commit provider secrets.
- Never commit expanded `opencode debug config` output.
- Do not replace a working built-in auth path with a custom env bridge unless the user explicitly wants that change.
- Keep provider ids, env names, and model references aligned exactly.
- Prefer one normalized onboarding path over one-off shell snippets.

## Recommended response shape when performing provider onboarding

- `## Executive Summary`
- `Status` table
- `Provider setup` table
- `Verification` table
- `Recommended next action`
