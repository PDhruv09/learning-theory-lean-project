# Codex vs Claude Comparison

| Category | Codex | Claude | Final Choice |
| --- | --- | --- | --- |
| Theorem statement | Matched target shape after repair | Pending Claude run | Preserve project theorem statement |
| Assumptions | Used uniform convergence and ERM | Pending Claude run | Keep assumptions explicit |
| Proof style | `calc` proof with named intermediate inequalities | Pending Claude run | Use readable `calc` proof |
| Errors | Treated `hUC hHat` as one inequality; used ERM without `+ eps`; arithmetic gap | Pending Claude run | Extract directions and add monotonicity step |
| Useful ideas | Correct high-level proof chain | Pending Claude run | Keep proof chain in final explanation |
| Final contribution | Repaired proof and simplified direct-call version | Pending Claude run | Reconcile after Claude output is saved |

## Current Status

Codex-side artifacts are complete. Claude Code is installed locally, but Claude outputs are marked pending until the user runs the blind prompt through Claude Code and saves the result.

Instructions:

```text
ai_workflow/CLAUDE_HANDOFF.md
```
