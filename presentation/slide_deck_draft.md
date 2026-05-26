# Slide Deck Draft

## Slide 1: Title

**Formalizing Finite-Class Learning Guarantees in Lean 4 with an MA-LoT-Inspired Proof Repair Workflow**

One-sentence thesis: finite hypothesis class learning proofs can be machine-checked in Lean, but human-readable explanation is still needed for understanding.

## Slide 2: Why Learning Theory Matters

Training accuracy alone does not guarantee future performance. Learning theory studies when empirical performance generalizes.

## Slide 3: Finite Hypothesis Classes

Core setup:

- finite class `H`,
- true risk `L_D(h)`,
- empirical risk `L_S(h)`,
- empirical risk minimization.

## Slide 4: Realizable Setting

Assumption: some `h*` has zero true risk.

Main idea: bad hypotheses are unlikely to be consistent with the sample.

Rate story: realizable learning has a `1 / epsilon` dependence.

## Slide 5: Agnostic Setting

No perfect hypothesis is assumed.

Main idea: uniform convergence makes empirical risk a reliable proxy for true risk.

Rate story: agnostic learning has a `1 / epsilon^2` dependence.

## Slide 6: What Was Formalized in Lean

Show:

- `LearningProblem`,
- `UniformConvergence`,
- `EmpiricalRiskMinimizer`,
- `RealizableConclusion`,
- `AgnosticConclusion`.

## Slide 7: What Was Assumed

Show `AssumedResults.lean`.

Explain that concentration facts are explicit assumptions:

- realizable finite-class concentration,
- agnostic uniform convergence.

## Slide 8: The Key Verified Theorem

Show `agnostic_erm_deterministic`.

Proof chain:

```text
trueRisk hHat
<= empiricalRisk hHat + eps
<= empiricalRisk hStar + eps
<= trueRisk hStar + 2 eps
```

## Slide 9: Hidden Assumptions Exposed by Lean

Use `paper_vs_lean_table.md`.

Examples:

- "by uniform convergence" becomes two directed inequalities,
- "by ERM" needs a comparator,
- "rearranging" becomes a formal arithmetic step.

## Slide 10: MA-LoT-Inspired Workflow

Show the workflow:

```text
paper proof -> AI proof attempt -> Lean feedback -> repair -> verified theorem -> explanation
```

## Slide 11: Repair Case Study

Use `agnostic_repair_case_study.md`.

Failure:

```lean
exact hUC hHat
```

Repair:

```lean
exact (hUC hHat).left
```

## Slide 12: Verification Is Not Understanding

Lean checks correctness. The walkthrough, dependency graph, and proof explanation make the result understandable.

## Slide 13: Live Demo

1. Open `Agnostic.lean`.
2. Show InfoView inside `agnostic_erm_deterministic`.
3. Run `lake build`.
4. Show successful build output.

## Slide 14: Future Directions

- Replace assumed concentration results with Mathlib probability theorems.
- Use real-valued risks.
- Expand the proof repair workflow.
- Build richer proof visualizations.
