# [slug] Build workbook

Template note: when this workbook is active, treat the sections below as a real Build ledger for slices, issues, fixes, verification, resume state, and closeout. If the workbook is bootstrapped from task-file authority and earlier detail is unavailable, say so explicitly instead of inventing history.

## Executive Summary
- Status: [not-started / in-progress / passed / blocked / needs-human / invalidated]
- Active slice: [slice-id or none]
- Summary: [short durable build summary]

## Status

| Field | Value |
|---|---|
| Phase | Build |
| Phase status | not-started |
| Active slice | none |
| taskContractBasisId | none |
| taskContractChangeClass | none |
| taskContractChangedSurfaces | none |
| stageBasisId | none |
| stageChangeClass | none |
| stageChangedSurfaces | none |
| stageTopologyId | none |
| acceptedOrderedSliceIds | none |
| Last durable update ID | none |
| Blocker summary | none |

## Slice Index

| Slice ID | Status | Basis | Checkpoint | Notes |
|---|---|---|---|---|
| [S1] | [not-started] | [basis] | [checkpointId] | [notes] |

## Active Slice

| Field | Value |
|---|---|
| Slice ID | none |
| Scope | [current slice scope] |
| Dependencies | [slice dependency IDs] |
| Acceptance checks | [slice acceptance checks] |
| Verification target | [planned verification] |

## Build-wide Issues

| Issue ID | Status | Severity | Source round | Match key | Reopen trigger | Duplicate of | Summary |
|---|---|---|---|---|---|---|---|
| [issue-id] | [open / accepted / in-fix / fixed-pending-verification / verified / deferred / rejected / duplicate / blocked] | [severity] | [round-id/finding-id] | [matchKey] | [reopenTrigger or none] | [issue-id or none] | [summary] |

## Invalidation and Resume

| Field | Value |
|---|---|
| Direct basis | none |
| Resume checkpoint | none |
| Recovery state | none |
| Earliest replay slice | none |
| Topology basis | none |
| Notes | [resume or invalidation notes] |

## Slice Records

### [slice-id] — [slice title]

#### Definition

| Field | Value |
|---|---|
| Goal | [slice goal] |
| Scope | [slice scope] |
| Dependencies | [slice dependency IDs] |
| Acceptance checks | [slice acceptance checks] |
| Verification target | [verification target] |

#### Round Journal

| Round ID | Action | Outcome | Writeback group | Notes |
|---|---|---|---|---|
| [round-id] | [produce / review / fix / verify / close] | [outcome] | [writebackGroupId] | [summary] |

#### Round History

| Round ID | Scope | Result | Follow-up |
|---|---|---|---|
| [round-id] | [scope] | [result] | [next step] |

#### Issue Ledger

| Issue ID | Status | Severity | Source round | Match key | Reopen trigger | Duplicate of | Summary |
|---|---|---|---|---|---|---|---|
| [issue-id] | [open / accepted / in-fix / fixed-pending-verification / verified / deferred / rejected / duplicate / blocked] | [severity] | [round-id/finding-id] | [matchKey] | [reopenTrigger or none] | [issue-id or none] | [finding summary] |

#### Fix Notes

| Issue ID | Fix summary | Changed surfaces | Verification status |
|---|---|---|---|
| [issue-id] | [what changed] | [paths or sections] | [pending / verified] |

#### Verification Results

| Check | Result | Evidence |
|---|---|---|
| [check] | [pass / fail / pending] | [command, path, or note] |

#### Closeout

| Field | Value |
|---|---|
| Slice outcome | [passed / blocked / needs-human / deferred] |
| Next slice | [slice-id or none] |
| Notes | [closeout notes] |

## Closeout

| Field | Value |
|---|---|
| Build outcome | [passed / blocked / needs-human] |
| Recommended next phase | [none or earlier phase] |
| Notes | [whole-build closeout notes] |
