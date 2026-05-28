# Blind Generation Results

## Prompt

Both models use:

```text
theorem_prompts/agnostic_erm_theorem.md
```

## Results

| Model | File | Compiles? | Main Issue | Notes |
| --- | --- | --- | --- | --- |
| Codex | `generated_proofs/codex/agnostic_attempt_1.lean` | No | Used conjunction and ERM hypothesis directly where the goal needed extracted/modified inequalities | Useful high-level `calc` shape |
| Claude | `generated_proofs/claude/agnostic_attempt_1.lean` | No | `omega` could not prove goals involving abstract `Nat`-valued functions — "No usable constraints found." Needs explicit `Nat.add_le_add_right` / `Nat.add_assoc`. | `calc` shape correct; tactic choice wrong |

## Verification Commands

For an individual generated proof:

```powershell
lake env lean generated_proofs/codex/agnostic_attempt_2_repaired.lean
```

For the main project:

```powershell
lake build
```
