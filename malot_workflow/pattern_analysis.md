# Pattern Analysis

This document records recurring proof-generation and proof-repair patterns.

## Missing Assumptions

AI-generated proofs often rely on paper-proof phrases like "let `h_star` be optimal" without including `hStar` or its optimality hypothesis in the theorem statement.

**Repair pattern:** add the missing object and hypothesis explicitly. In this project, the agnostic theorem uses:

```lean
(hHat hStar : Hypothesis)
(hERM : EmpiricalRiskMinimizer P hHat)
(_hOptimal : TrueRiskOptimal P hStar)
```

## Missing Coercion from Paper Step to Formal Step

Paper proofs often say "by ERM" when the formal goal is not exactly the ERM hypothesis. In the agnostic proof, ERM gives:

```lean
P.empiricalRisk hHat <= P.empiricalRisk hStar
```

but the proof needs:

```lean
P.empiricalRisk hHat + eps <= P.empiricalRisk hStar + eps
```

**Repair pattern:** introduce a monotonicity step rather than trying to use the ERM hypothesis directly.

## Wrong Theorem Statement

Informal proofs can hide whether the theorem is about an arbitrary comparator or an optimal comparator. Lean forced this distinction:

- `agnostic_erm_deterministic` works for any comparator.
- `agnostic_erm_against_optimal` includes the optimality hypothesis for interpretation.

## Lean Version Sensitivity

Lean 4.29 enforced details that are easy to miss:

- `import` commands must appear at the beginning of the file.
- The assumed probability marker was accepted as an `axiom`, not as the attempted `constant` declaration.

This became a concrete example of verifier feedback improving the project.

## Arithmetic Gap

AI-generated Lean often jumps from a chain of inequalities to the final result using automation. In this project, the repair was to use explicit natural-number monotonicity and associativity.

**Repair pattern:** replace broad automation with named intermediate inequalities:

```lean
have hStepERM :
    P.empiricalRisk hHat + eps <= P.empiricalRisk hStar + eps :=
  Nat.add_le_add_right hERMStar eps
```

## Wrong Rewrite

The expression:

```lean
(trueRisk hStar + eps) + eps
```

must be related to:

```lean
trueRisk hStar + (eps + eps)
```

Lean requires the associativity rewrite explicitly.

**Repair pattern:** put the exact expression Lean has and the exact expression the theorem needs next to each other, then use the smallest rewrite:

```lean
rw [Nat.add_assoc]
```

## Overambitious Probability Formalization

Attempts to formalize Hoeffding's inequality or union bounds directly would exceed the project scope. Those results are intentionally isolated as assumptions in `AssumedResults.lean`.

**Repair pattern:** move concentration facts into `AssumedResults.lean`, then prove deterministic consequences around them.
