# Codex vs Claude Table

| Category | Codex | Claude | Final Choice |
| --- | --- | --- | --- |
| Blind prompt | Used `theorem_prompts/agnostic_erm_theorem.md` | Reproduction instructions in `ai_workflow/CLAUDE.md` | Same prompt for both |
| Initial output | `generated_proofs/codex/agnostic_attempt_1.lean` | Pending actual Claude output | Save raw outputs separately |
| Verification | Initial attempt fails; repaired attempt compiles | Pending actual Claude output | Lean decides correctness |
| Repair | Explicit `.left`/`.right`, monotonicity, associativity | Pending actual Claude output | Keep explicit proof steps |
| Simplification | Direct theorem call compiles | Pending actual Claude output | Keep only verified simplifications |

## Rule

Do not claim Claude results until the Claude-generated files are saved and checked.
