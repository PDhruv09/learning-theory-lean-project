# Final Presentation Outline

Companion files:

- `slide_deck_draft.md`: slide-by-slide draft.
- `live_demo_script.md`: exact live demo sequence.
- `slide_asset_index.md`: where to find each presentation asset.

## 1. Why Learning Theory Matters

Learning theory asks when performance on training data can justify confidence about unseen data.

## 2. Finite Hypothesis Class Learning

Finite classes are learnable because the number of candidate hypotheses can be controlled.

## 3. Realizable Setting

Assume a perfect hypothesis exists. Rule out bad hypotheses that still fit the sample.

## 4. Agnostic Setting

No perfect hypothesis is assumed. ERM competes with the best hypothesis in the class.

## 5. Lean Formalization

Lean definitions make hypotheses, risks, ERM, uniform convergence, and assumptions explicit.

## 6. Hidden Assumptions Exposed by Lean

Paper proofs hide objects like `hHat`, `hStar`, direction-specific inequalities, and arithmetic steps.

## 7. MA-LoT-Inspired Workflow

The project uses a proof repair loop inspired by MA-LoT:

```text
paper proof -> AI proof attempt -> Lean feedback -> repair -> verified theorem -> explanation
```

## 8. AI Proof Failures and Repairs

Examples include missing assumptions, misuse of conjunctions, unavailable tactics, and overambitious probability formalization.

Use the agnostic theorem as the main live repair story:

```text
AI attempt misuses hUC -> Lean reports conjunction mismatch -> repair extracts .left/.right
-> ERM step needs + eps -> repair uses monotonicity
-> arithmetic automation unavailable -> repair uses calc and associativity
```

## 9. Why Verification Is Not Understanding

Lean checks proof correctness. Human-readable walkthroughs and diagrams explain the mathematical idea.

## 10. Future Directions

Future work could replace assumed probability results with formal concentration theorems, use Mathlib's probability library, and automate more of the repair loop.
