# opencode configuration

Personal opencode setup for `tonfield`.

This repository is intended to restore the opencode configuration on another Mac. It includes agents, commands, instructions, plugins, templates, helper tools, and core config files.

## Included

- `opencode.json` — main opencode configuration
- `AGENTS.md` — global workflow instructions
- `agents/` — primary agents and subagents
- `commands/` — custom slash commands
- `instructions/` — shared instruction files
- `plugins/` — local plugin code
- `templates/` — task/workbook/docs templates
- `tools/` — local helper scripts
- `custom-providers.json` and `opencode-auth-env.sh` — provider/env helper setup
- `package.json`, `package-lock.json`, and `bun.lock` — dependency lock/config files

## Not included

The repo intentionally excludes generated or machine-local files such as:

- `node_modules/`
- `.DS_Store`
- `opencode-notifier-state.json`
- `*.bak` backups
- `.env*`, private keys, and other secret material

API keys and auth state are expected to live outside the repo in environment variables, opencode auth storage, macOS Keychain, or local service config.

## Restore on another Mac

Install opencode first. If `~/.config/opencode` already exists on the target machine, back it up before cloning:

```sh
mkdir -p ~/.config
mv ~/.config/opencode ~/.config/opencode.backup.$(date +%Y%m%d-%H%M%S)
```

Then clone this repo into the global config location and install local dependencies:

```sh
git clone git@github.com:tonfield/opencode-config.git ~/.config/opencode
cd ~/.config/opencode
npm install
```

Then restore required credentials/env vars as needed:

- `KILOCODE_API_KEY`
- `DEEPSEEK_API_KEY`
- `OMLX_API_KEY`
- `CONTEXT7_API_KEY`
- `BRAVE_API_KEY`
- `EXA_API_KEY`
- `MORPH_API_KEY` in macOS Keychain, if using Morph tools

The helper script `opencode-auth-env.sh` can export provider keys from opencode's local auth store and Morph from macOS Keychain when sourced from your shell startup file.

Finally, restart opencode so it reloads the restored config.

## Updating the backup

From this directory:

```sh
git status
git add .
git commit -m "Update opencode config"
git push
```
