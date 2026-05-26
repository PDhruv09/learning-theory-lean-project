# Realizable Proof

## Informal Theorem

Assume the hypothesis class is finite and realizable. If the sample size is large enough, then with probability at least `1 - delta`, every class member consistent with the sample has true risk at most `epsilon`.

## Proof Idea

1. Call a hypothesis bad if its true risk is greater than `epsilon`.
2. A bad hypothesis is unlikely to fit all sample points.
3. Since the class is finite, use a union bound over all bad hypotheses.
4. With high probability, no bad hypothesis is consistent.
5. Therefore every consistent hypothesis has true risk at most `epsilon`.

## Lean Translation

Lean names the pieces explicitly:

- `Consistent P h`: empirical risk of `h` is zero.
- `BadHypothesis P eps h`: true risk of `h` is greater than `eps`.
- `Realizable P`: some class member has true risk zero.
- `InClass P h`: `h` is a member of the finite hypothesis class.
- `RealizableSampleCondition P eps delta m`: the sample-size condition for the realizable theorem.
- `RealizableConclusion P eps`: every consistent class member has true risk at most `eps`.
- `finiteClass_realizable_concentration`: the assumed probability result.
- `realizable_learning_guarantee`: the theorem wrapper used by the project.

The probability-heavy union-bound argument is stated as an assumption in `AssumedResults.lean`.

## Formal Theorem Shape

The Lean theorem is:

```lean
theorem realizable_learning_guarantee
    (P : LearningProblem Hypothesis) (eps delta m : Nat)
    (hClassNonempty : NonemptyClass P)
    (hSampleLarge : RealizableSampleCondition P eps delta m)
    (hRealizable : Realizable P) :
    HighProbabilityEvent (RealizableConclusion P eps) delta
```

This says: under the class-size, sample-size, and realizability assumptions, the realizable conclusion holds with high probability.

## How the Conclusion Is Used

Once the event `RealizableConclusion P eps` holds, Lean has a small deterministic helper:

```lean
theorem realizable_conclusion_for_consistent_hypothesis ...
```

This theorem applies the conclusion to one hypothesis `h`. In plain English:

> If `h` belongs to the class and is consistent with the sample, then `h` has true risk at most `eps`.

## What Lean Forces

The paper proof says "with enough samples." Lean requires a named hypothesis:

```lean
hSampleLarge : RealizableSampleCondition P eps delta m
```

This is an abstract sample-size condition, not the exact asymptotic logarithmic bound. It plays the role of the required sample complexity assumption.

The paper proof also says "every consistent hypothesis generalizes." Lean separates that into:

1. class membership: `InClass P h`,
2. sample consistency: `Consistent P h`,
3. risk conclusion: `P.trueRisk h <= eps`.
