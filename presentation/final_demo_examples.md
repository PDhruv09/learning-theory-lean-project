# Final Demo Examples

## Demo 1: Equality Proof

```lean
theorem demo_eq (x : Nat) : x = x := by
  rfl
```

Purpose: show a tiny proof that Lean verifies immediately.

Project file: `LearningTheoryProject/DemoExamples.lean`, theorem `demo_equality`.

## Demo 2: Simple Inequality

```lean
theorem demo_add_right {a b c : Nat} (h : a <= b) : a + c <= b + c := by
  exact Nat.add_le_add_right h c
```

Purpose: show that Lean often needs explicit monotonicity where a paper proof says "obvious."

Project file: `LearningTheoryProject/DemoExamples.lean`, theorem `demo_add_right`.

## Demo 3: Repaired AI-Generated Proof

Failed attempt:

```lean
exact hUC hHat
```

Problem: `hUC hHat` is a pair of inequalities, not the specific inequality needed.

Repair:

```lean
exact (hUC hHat).left
```

Purpose: show how Lean verifier feedback reveals the missing proof detail.

Project file: `LearningTheoryProject/DemoExamples.lean`, theorem `demo_uniform_left`.

## Demo 4: Successful Theorem-Repair Cycle

The agnostic theorem originally relied on `linarith`. The repaired proof replaced automation with explicit steps:

```lean
have hStepERM :
    P.empiricalRisk hHat + eps <= P.empiricalRisk hStar + eps :=
  Nat.add_le_add_right hERMStar eps
```

Purpose: show that proof repair can improve explainability.

Project file: `LearningTheoryProject/Agnostic.lean`, theorem `agnostic_erm_deterministic`.

## Demo 5: Full MA-LoT-Inspired Repair Story

Start with the broken proof idea:

```lean
exact hUC hHat
```

Explain the verifier feedback:

```text
hUC hHat is a conjunction, but the goal needs only the left side.
```

Then show the final verified structure:

```lean
have hHatUC : P.trueRisk hHat <= P.empiricalRisk hHat + eps :=
  uniform_true_le_empirical_plus P eps hUC hHat
```

Finally, show the whole-project verification:

```powershell
lake build
```

Expected output:

```text
Build completed successfully (16 jobs).
```

Purpose: demonstrate the full loop:

```text
AI proof attempt -> Lean feedback -> repair -> verified theorem -> explanation
```

Case study file: `malot_workflow/agnostic_repair_case_study.md`.
