# Agnostic Proof

## Informal Theorem

If uniform convergence holds and `h_hat` is an empirical risk minimizer, then for any comparator hypothesis `h_star`:

```text
L_D(h_hat) <= L_D(h_star) + 2 epsilon
```

If `h_star` is the best true-risk hypothesis in the class, then ERM competes with the best class member.

## Proof Chain

```text
L_D(h_hat)
<= L_S(h_hat) + epsilon
<= L_S(h_star) + epsilon
<= L_D(h_star) + 2 epsilon
```

The first and third inequalities come from uniform convergence. The middle inequality comes from ERM.

## Lean Translation

The main theorem is:

```lean
agnostic_erm_deterministic
```

Its formal conclusion is named:

```lean
AgnosticConclusion P eps hHat hStar
```

which expands to:

```lean
P.trueRisk hHat <= P.trueRisk hStar + (eps + eps)
```

The proof uses:

- `hUC`: uniform convergence.
- `hERM`: empirical minimization.
- `AgnosticSampleCondition P eps delta m`: the abstract sample-size condition used in the high-probability wrapper.
- `hHatUC`: true risk of `h_hat` is close to empirical risk.
- `hERMStar`: empirical risk of `h_hat` is at most empirical risk of `h_star`.
- `hStarUC`: empirical risk of `h_star` is close to true risk.

## Why This Is the Best Fully Formalized Theorem

This theorem is central to the agnostic case and does not require formalizing probability spaces. It is the clearest place where Lean verifies the mathematical proof while the presentation explains the proof's meaning.

## Paper Proof vs Lean Proof

The paper proof says "by uniform convergence" twice. Lean requires two separate facts:

```lean
have hHatUC : P.trueRisk hHat <= P.empiricalRisk hHat + eps :=
  uniform_true_le_empirical_plus P eps hUC hHat
```

and:

```lean
uniform_empirical_le_true_plus P eps hUC hStar
```

The paper proof says "by ERM." Lean requires:

```lean
have hERMStar : P.empiricalRisk hHat <= P.empiricalRisk hStar :=
  hERM hStar
```

The paper proof says "rearranging." Lean requires the exact associativity rewrite:

```lean
rw [Nat.add_assoc]
```

## High-Probability Wrapper

The theorem:

```lean
agnostic_high_probability_guarantee
```

uses the assumed theorem:

```lean
finiteClass_agnostic_uniform_convergence
```

and then applies the deterministic ERM theorem. This separates:

- assumed probability/concentration reasoning,
- verified deterministic ERM reasoning.
