# [slug] [Mode] workbook

Template note: when this workbook is active, treat the sections below as a real per-phase ledger for rounds, issues, fixes, verification, and closeout. If the workbook is bootstrapped from task-file authority and earlier detail is unavailable, say so explicitly instead of inventing history.

## Executive Summary
- Status: [not-started / in-progress / passed / blocked / needs-human / invalidated]
- Current work unit: [phase artifact or bounded work unit]
- Summary: [short durable phase summary]

## Status

| Field | Value |
|---|---|
| Phase | [Explore / Design / Stage] |
| Phase status | not-started |
| Current work unit | none |
| Round count | 0 |
| Updated at | none |
| Last durable update ID | none |
| Blocker summary | none |

### Prerequisite basis metadata

| Prerequisite | Basis ID field | Basis ID | Change class field | Change class | Changed surfaces field | Changed surfaces |
|---|---|---|---|---|---|---|
| Task contract | `taskContractBasisId` | none | `taskContractChangeClass` | none | `taskContractChangedSurfaces` | none |
| Explore | `exploreBasisId` | n/a unless required | `exploreChangeClass` | n/a unless required | `exploreChangedSurfaces` | n/a unless required |
| Design | `designBasisId` | n/a unless required | `designChangeClass` | n/a unless required | `designChangedSurfaces` | n/a unless required |

## Work Unit Summary

| Field | Value |
|---|---|
| Work unit | [artifact or bounded unit] |
| Scope | [current reviewable scope] |
| Verification target | [planned verification] |

## Round Journal

| Round ID | Action | Outcome | Writeback group | Notes |
|---|---|---|---|---|
| [round-id] | [produce / review / fix / verify / close] | [outcome] | [writebackGroupId] | [summary] |

## Round History

| Round ID | Scope | Result | Follow-up |
|---|---|---|---|
| [round-id] | [scope] | [result] | [next step] |

## Issue Ledger

| Issue ID | Status | Severity | Source round | Match key | Reopen trigger | Duplicate of | Summary |
|---|---|---|---|---|---|---|---|
| [issue-id] | [open / accepted / in-fix / fixed-pending-verification / verified / deferred / rejected / duplicate / blocked] | [severity] | [round-id/finding-id] | [matchKey] | [reopenTrigger or none] | [issue-id or none] | [finding summary] |

## Fix Notes

| Issue ID | Fix summary | Changed surfaces | Verification status |
|---|---|---|---|
| [issue-id] | [what changed] | [paths or sections] | [pending / verified] |

## Verification

| Check | Result | Evidence |
|---|---|---|
| [check] | [pass / fail / pending] | [command, path, or note] |

## Closeout

| Field | Value |
|---|---|
| Phase outcome | [passed / blocked / needs-human] |
| Recommended next phase | [phase or none] |
| Notes | [closeout notes] |
