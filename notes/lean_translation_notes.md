# Lean Translation Notes

## Abstraction Choices

The Lean project uses `Nat`-valued abstract risks. This keeps the project independent of Mathlib and still supports the deterministic order reasoning needed for the ERM theorem.

The project includes a concrete binary-classification vocabulary:

- `BinaryLabel` represents labels `0` and `1`.
- `Classifier Input` represents a function from inputs to binary labels.
- `LearningProblem Hypothesis` stays generic so the theorem statements are not tied to one representation of hypotheses.

The formalization does not model:

- the input space directly,
- the label space directly,
- probability measures,
- random samples,
- Hoeffding's inequality.

Instead, those ideas are represented by abstract risk functions and assumed high-probability results.

## Why Risks Are Abstract

Learning theory usually defines true risk as an expectation over a data distribution and empirical risk as an average over a sample. Fully formalizing those definitions would require substantial probability infrastructure.

For this project, the important formal proof is the relationship:

```text
uniform convergence + ERM => agnostic guarantee
```

That relationship only needs ordered risk values.

## Assumed Results

All probability assumptions live in:

```text
LearningTheoryProject/AssumedResults.lean
```

This makes the boundary between verified deterministic reasoning and assumed concentration reasoning explicit.

## Named Assumptions

The code gives names to assumptions that paper proofs usually compress:

- `NonemptyClass P`: the finite class has positive recorded size.
- `RealizableSampleCondition P eps delta m`: the realizable sample-size requirement.
- `AgnosticSampleCondition P eps delta m`: the agnostic sample-size requirement.
- `InClass P h`: hypothesis `h` belongs to the finite class.

These names make theorem statements easier to explain in the presentation.
