# Annotated Proof Walkthrough

The deterministic agnostic theorem is the clearest fully verified Lean proof in the project.

| Lean Code | Human Explanation |
| --- | --- |
| `theorem agnostic_erm_deterministic ...` | State the deterministic agnostic ERM guarantee. |
| `P : LearningProblem Hypothesis` | Work with an abstract learning problem containing true risk, empirical risk, and class information. |
| `eps : Risk` | Fix the tolerance parameter. |
| `hHat hStar : Hypothesis` | Compare the ERM hypothesis `hHat` to a comparator `hStar`. |
| `hUC : UniformConvergence P eps` | Assume every true risk and empirical risk are within `eps` in both directions. |
| `hERM : EmpiricalRiskMinimizer P hHat` | Assume `hHat` has empirical risk no larger than any comparator. |
| `AgnosticConclusion P eps hHat hStar` | The final claim: `trueRisk hHat <= trueRisk hStar + eps + eps`. |
| `have hHatUC : ...` | Apply uniform convergence to move from true risk of `hHat` to empirical risk of `hHat`. |
| `uniform_true_le_empirical_plus P eps hUC hHat` | Extract the first direction of uniform convergence for `hHat`. |
| `have hERMStar : ... := hERM hStar` | Use ERM to compare `hHat` with the comparator `hStar`. |
| `have hStepERM : ...` | Turn the ERM inequality into an inequality after adding `eps` to both sides. |
| `Nat.add_le_add_right hERMStar eps` | Lean's explicit version of "add the same quantity to both sides." |
| `have hStarUC : ...` | Apply uniform convergence in the other direction to `hStar`. |
| `uniform_empirical_le_true_plus P eps hUC hStar` | Extract the second direction of uniform convergence for `hStar`. |
| `calc ...` | Chain the true-risk, empirical-risk, ERM, and comparator inequalities. |
| `rw [Nat.add_assoc]` | Reassociate the final expression so it matches the theorem statement. |

## Human Proof

```text
trueRisk hHat
<= empiricalRisk hHat + eps        by uniform convergence
<= empiricalRisk hStar + eps       by ERM
<= trueRisk hStar + eps + eps      by uniform convergence
=  trueRisk hStar + (eps + eps)    by arithmetic
```

Lean verifies the chain. The table explains why each line exists.

## Presentation Script

The proof has three mathematical moves:

1. Use uniform convergence to upper-bound the true risk of `hHat` by its empirical risk plus `eps`.
2. Use ERM to replace the empirical risk of `hHat` with the empirical risk of `hStar`.
3. Use uniform convergence again to replace the empirical risk of `hStar` with its true risk plus `eps`.

Lean's contribution is that it refuses to blur these moves together. The two uses of uniform convergence are different directions, and the arithmetic step is explicit.

## Repair Story for This Proof

The first AI-style attempt tried to use:

```lean
exact hUC hHat
```

Lean rejected this because `hUC hHat` contains both directions of uniform convergence. The repaired proof names the needed direction:

```lean
have hHatUC : P.trueRisk hHat <= P.empiricalRisk hHat + eps :=
  uniform_true_le_empirical_plus P eps hUC hHat
```

The attempt also tried to use ERM directly after adding `eps` to both sides. Lean forced the monotonicity step:

```lean
Nat.add_le_add_right hERMStar eps
```

This is the main example of how verifier feedback improved both correctness and explainability.
