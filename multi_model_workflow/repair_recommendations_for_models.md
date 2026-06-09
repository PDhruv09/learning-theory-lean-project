# Repair Recommendations For Codex And Claude

Use this file as the model-facing handoff after running `multi_model_workflow/run_comparison.py`.

## Verified Reference Points

- Best explanatory repaired proof: `generated_proofs/claude/agnostic_attempt_2_repaired.lean`.
- Best verified simplification/refactor: `generated_proofs/claude/simplified_attempt.lean`.
- The final project theorem remains the source of truth: `LearningTheoryProject/Agnostic.lean`.

## Instructions For Codex

- Repair the blind attempt by explicitly extracting the needed uniform-convergence direction.
- Use `.left` for `P.trueRisk h <= P.empiricalRisk h + eps`.
- Use `.right` for `P.empiricalRisk h <= P.trueRisk h + eps`.
- When adding the same `eps` to both sides, use `Nat.add_le_add_right`.
- Finish associativity with `Nat.add_assoc`.
- Prefer a readable `calc` chain over a compressed proof.

## Instructions For Claude

- Do not rely on `omega` for this proof; the risks are abstract Nat-valued functions.
- Borrow Codex's explicit arithmetic repair pattern:
  - `Nat.add_le_add_right h eps`
  - `Nat.add_assoc _ _ _`
- Keep Claude's useful `.left` / `.right` extraction of uniform convergence.
- Keep a readable `calc` chain that mirrors the paper proof.

## Reconciled Proof Strategy

The final proof should combine both models' useful ideas:

1. Apply uniform convergence to `hHat`.
2. Use ERM to compare `hHat` with `hStar`.
3. Apply uniform convergence to `hStar`.
4. Use `Nat.add_le_add_right` for adding `eps` to inequalities.
5. Use `Nat.add_assoc` for the final arithmetic shape.
6. Avoid hiding the proof behind automation until the explanatory proof is verified.

## Simplification Rule

Only simplify after Lean verification passes. A direct call to `agnostic_erm_deterministic` is acceptable as a refactor, but the explanatory proof should remain available for presentation.
