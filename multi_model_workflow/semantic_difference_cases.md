# Semantic Difference Cases

This file records differences that are not just formatting.

## Case 1: Comparator vs Optimal Hypothesis

One proof may state the theorem against any comparator `hStar`, while another may require `hStar` to be optimal.

Resolution:

- Keep the stronger deterministic theorem against any comparator.
- Add a separate theorem with the optimality assumption for interpretation.

Project files:

- `agnostic_erm_deterministic`
- `agnostic_erm_against_optimal`

## Case 2: Direct Proof vs Theorem Reuse

A simplified proof may call:

```lean
agnostic_erm_deterministic P eps hHat hStar hUC hERM
```

instead of repeating the proof.

Resolution:

- Keep the direct proof in the main theorem file for explainability.
- Use direct theorem calls for simplified generated attempts.
