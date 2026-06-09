# Codex vs Claude Table

| Category | Codex | Claude | Final Choice |
| --- | --- | --- | --- |
| Blind prompt | Used `theorem_prompts/agnostic_erm_theorem.md` | Reproduction instructions in `ai_workflow/CLAUDE.md` | Same prompt for both |
| Initial output | `generated_proofs/codex/agnostic_attempt_1.lean` | `generated_proofs/claude/agnostic_attempt_1.lean` | Save raw outputs separately |
| Verification | Blind attempt fails; repaired and simplified attempts compile | Blind attempt fails on `omega`; repaired and simplified attempts compile | Lean decides correctness |
| Repair | Explicit `.left`/`.right`, monotonicity, associativity | Extracts conjunction directions, then uses monotonicity and associativity | Keep explicit proof steps |
| Simplification | Direct theorem call compiles | Short readable `calc` proof compiles | Keep only verified simplifications |

## Rule

Claude results are checked by `multi_model_workflow/run_comparison.py`; the latest generated report is `multi_model_workflow/comparison_report.md`.
