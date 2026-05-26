# Agnostic ERM Repair Case Study

This case study is the main Day 6 MA-LoT-inspired experiment. It follows one theorem from paper proof to verified Lean proof.

## Target Theorem

Informal statement:

```text
If uniform convergence holds and h_hat is an empirical risk minimizer, then
trueRisk h_hat <= trueRisk h_star + 2 epsilon.
```

Formal Lean theorem:

```lean
theorem agnostic_erm_deterministic {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis)
    (hUC : UniformConvergence P eps)
    (hERM : EmpiricalRiskMinimizer P hHat) :
    AgnosticConclusion P eps hHat hStar
```

## Initial AI-Generated Attempt

```lean
theorem agnostic_erm_deterministic
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis)
    (hUC : UniformConvergence P eps)
    (hERM : EmpiricalRiskMinimizer P hHat) :
    P.trueRisk hHat <= P.trueRisk hStar + 2 * eps := by
  calc
    P.trueRisk hHat <= P.empiricalRisk hHat + eps := by
      exact hUC hHat
    _ <= P.empiricalRisk hStar + eps := by
      exact hERM hStar
    _ <= P.trueRisk hStar + 2 * eps := by
      linarith
```

## Lean Feedback

The attempt failed for three reasons.

First, `hUC hHat` is not one inequality. It is a pair:

```lean
P.trueRisk hHat <= P.empiricalRisk hHat + eps /\
P.empiricalRisk hHat <= P.trueRisk hHat + eps
```

Second, `hERM hStar` proves:

```lean
P.empiricalRisk hHat <= P.empiricalRisk hStar
```

but the goal after the second `calc` step has `+ eps` on both sides.

Third, `linarith` is not available because this project intentionally avoids Mathlib dependencies.

## Repair Iteration

The repaired proof introduced named intermediate facts:

```lean
have hHatUC : P.trueRisk hHat <= P.empiricalRisk hHat + eps :=
  uniform_true_le_empirical_plus P eps hUC hHat

have hERMStar : P.empiricalRisk hHat <= P.empiricalRisk hStar :=
  hERM hStar

have hStepERM :
    P.empiricalRisk hHat + eps <= P.empiricalRisk hStar + eps :=
  Nat.add_le_add_right hERMStar eps

have hStarUC :
    P.empiricalRisk hStar + eps <= (P.trueRisk hStar + eps) + eps :=
  Nat.add_le_add_right
    (uniform_empirical_le_true_plus P eps hUC hStar) eps
```

## Final Verified Shape

The final proof uses a readable `calc` chain:

```lean
calc
  P.trueRisk hHat <= P.empiricalRisk hHat + eps := hHatUC
  _ <= P.empiricalRisk hStar + eps := hStepERM
  _ <= (P.trueRisk hStar + eps) + eps := hStarUC
  _ = P.trueRisk hStar + (eps + eps) := by
    rw [Nat.add_assoc]
```

## Human Explanation

The final proof is not merely a fixed Lean script. It is more understandable because every mathematical move has a name:

- `hHatUC`: uniform convergence applied to the ERM hypothesis.
- `hERMStar`: ERM comparison with the comparator.
- `hStepERM`: add the same tolerance to both empirical risks.
- `hStarUC`: uniform convergence applied to the comparator.

This is the project's core example of the slogan:

> Verification is not the same as understanding.

Lean verifies the final proof. The repair log explains why the proof works.
