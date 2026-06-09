# Final Report

## Project Title

**Formalizing Finite-Class Learning Guarantees in Lean 4 with MA-LoT-Inspired Multi-LLM Proof Repair**

## Executive Summary

This project formalizes finite hypothesis class learning guarantees in Lean 4 and studies an MA-LoT-inspired workflow for repairing AI-generated Lean proofs.

The mathematical focus is empirical risk minimization for finite hypothesis classes. In the realizable setting, the hypothesis class contains a perfect classifier. In the agnostic setting, no perfect classifier is assumed, so ERM is compared with the best classifier in the class.

The formalization is intentionally scoped. The deterministic agnostic ERM theorem is fully proved in Lean. Probability-heavy concentration results, such as finite-class union-bound guarantees and Hoeffding-style uniform convergence, are isolated as explicit assumptions in `LearningTheoryProject/AssumedResults.lean`.

The workflow contribution studies how Codex and Claude generate Lean proof attempts from the same theorem prompt, how Lean verifier errors expose proof gaps, and how comparison plus repair produces verified and human-readable proof artifacts.

The central theme is:

> Verification is not the same as understanding.

Lean verifies proof correctness. The notes, diagrams, annotated walkthroughs, comparison reports, and presentation materials explain why the proof works and what assumptions make learning possible.

## Motivation

No Free Lunch-style results show that learning is impossible without assumptions. If every possible labeling function is allowed, then no learning rule can be universally better than another.

This project studies what happens after adding a concrete assumption: the hypothesis class is finite. Finiteness makes the classical union-bound proof possible. Instead of competing over all possible functions, the learner only competes inside a restricted class.

This is the conceptual reason finite hypothesis classes are learnable:

- the class has only finitely many candidates,
- each bad candidate is unlikely to look good for many samples,
- a union bound controls the probability that any bad candidate fools the learner.

## Mathematical Setup

The project studies binary classification with:

- an input space,
- binary labels,
- a finite hypothesis class,
- true risk,
- empirical risk,
- consistency,
- realizability,
- uniform convergence,
- empirical risk minimization.

True risk is the probability that a hypothesis makes a mistake on a fresh example from the unknown distribution. Empirical risk is the fraction of mistakes on the training sample. ERM chooses a hypothesis with minimal empirical risk.

## Realizable Setting

The realizable setting assumes there exists a perfect hypothesis in the class. Informally, this means some hypothesis has true risk zero.

The standard proof works by defining bad hypotheses as hypotheses whose true risk is greater than the target tolerance. If ERM returns a bad hypothesis in the realizable setting, then some bad hypothesis must have fit the whole training sample perfectly. A fixed bad hypothesis is unlikely to do this, and a union bound over the finite class controls the probability that any bad hypothesis does this.

The resulting sample complexity has the familiar rate:

```text
m = O((log |H| + log(1 / delta)) / epsilon)
```

In Lean, the probability-heavy concentration step is not proved from scratch. It is represented by the assumed theorem:

```lean
finiteClass_realizable_concentration
```

The wrapper theorem is:

```lean
realizable_learning_guarantee
```

located in:

```text
LearningTheoryProject/Realizable.lean
```

## Agnostic Setting

The agnostic setting removes the perfect-classifier assumption. There may be no hypothesis with true risk zero. Instead, ERM is compared to the best hypothesis in the class.

The key deterministic theorem says:

```text
trueRisk hHat <= trueRisk hStar + 2 epsilon
```

In words: the true risk of the ERM hypothesis is at most the true risk of the comparator hypothesis plus two epsilon.

The two epsilon terms come from applying uniform convergence twice:

1. once to compare the true risk of `hHat` with its empirical risk,
2. once to compare the empirical risk of `hStar` with its true risk.

This theorem is fully proved in Lean as:

```lean
agnostic_erm_deterministic
```

located in:

```text
LearningTheoryProject/Agnostic.lean
```

The high-probability agnostic statement uses an assumed uniform-convergence result:

```lean
finiteClass_agnostic_uniform_convergence
```

and combines it with the verified deterministic theorem in:

```lean
agnostic_high_probability_guarantee
```

The standard mathematical sample complexity rate is:

```text
m = O((log |H| + log(1 / delta)) / epsilon^2)
```

The agnostic rate is worse than the realizable rate because Hoeffding-style concentration contains an epsilon-squared term.

## What Is Fully Proved Versus Assumed

| Component | Status |
| --- | --- |
| Basic learning definitions | Formalized in Lean |
| Consistency, realizability, ERM, uniform convergence | Formalized in Lean |
| Deterministic agnostic ERM theorem | Fully proved in Lean |
| Agnostic high-probability wrapper | Proved using an assumed concentration theorem |
| Realizable learning guarantee wrapper | Proved using an assumed concentration theorem |
| Hoeffding inequality | Assumed/scoped out |
| Finite-class probability union bound | Assumed/scoped out |
| Exact logarithmic sample complexity in Lean | Explained mathematically, not fully formalized |
| Full MA-LoT system | Not implemented; workflow is MA-LoT-inspired |

## Lean Formalization Boundary

The Lean project uses abstract `Nat`-valued risks instead of real-valued probabilities. This choice keeps the formalization lightweight and independent of Mathlib probability infrastructure.

This means the project does not claim to fully formalize measure theory, Hoeffding's inequality, or exact real-valued PAC sample complexity bounds. Instead, it formalizes the deterministic proof structure and makes all probability assumptions explicit.

The main Lean files are:

| File | Role |
| --- | --- |
| `BasicDefinitions.lean` | Learning-theory vocabulary |
| `AssumedResults.lean` | Explicit probability/concentration assumptions |
| `Realizable.lean` | Realizable theorem wrapper |
| `Agnostic.lean` | Fully proved deterministic agnostic theorem |
| `DemoExamples.lean` | Small proof examples for presentation |
| `MainTheorem.lean` | Project entry point importing the formalization |

## MA-LoT-Inspired Workflow

MA-LoT motivates a workflow in which natural-language reasoning, Lean verification, and proof repair interact. This project does not implement the full MA-LoT system. Instead, it adapts the core idea:

```text
English theorem prompt
-> AI-generated Lean attempt
-> Lean verifier feedback
-> repair iteration
-> verified theorem
-> human-readable explanation
```

The important point is that the LLM is not treated as a verifier. Codex and Claude generate attempts, but Lean decides whether those attempts are correct.

When an attempt fails, Lean produces an error message. That verifier feedback is logged and used to guide repair. This turns AI failure into useful proof-debugging evidence.

## Multi-LLM Comparison Workflow

The project also implements a small multi-model comparison layer inspired by the professor's workflow suggestion.

Codex and Claude are given the same theorem prompt. Their generated Lean files are saved separately under:

```text
generated_proofs/codex/
generated_proofs/claude/
```

The script:

```text
multi_model_workflow/run_comparison.py
```

checks each generated proof attempt with Lean and compares structural features such as:

- whether the file compiles,
- the Lean error output,
- line count,
- file hash,
- use of `calc`,
- use of `Nat.add_le_add_right`,
- use of `Nat.add_assoc`,
- use of `.left` and `.right`,
- use of risky automation such as `omega`,
- whether the file directly calls an already proved theorem.

The script generates:

```text
multi_model_workflow/comparison_report.md
multi_model_workflow/repair_recommendations_for_models.md
```

This prevents shortcut behavior because the models start from the same theorem prompt, Lean checks whether the proofs actually compile, and the comparison exposes missing assumptions, hallucinated lemmas, or proofs that only sound correct in English.

## Proof Repair Example

One failed proof attempt treated uniform convergence as if it directly provided the exact inequality needed. In Lean, uniform convergence was represented as a conjunction of two directed inequalities. The repair was to explicitly extract the correct direction using `.left` or `.right`.

Another failed attempt relied on automation that could not solve goals involving abstract `Nat`-valued risk functions. The repair used explicit arithmetic lemmas:

```lean
Nat.add_le_add_right
Nat.add_assoc
```

The final explanatory proof uses a readable `calc` chain that mirrors the paper proof.

## Verification And Reproducibility

The project was verified with:

```text
Lean 4.29.1
Lake 5.0.0
```

To verify the project:

```powershell
lake build
```

Expected output:

```text
Build completed successfully (16 jobs).
```

To reproduce the multi-model comparison report:

```powershell
python multi_model_workflow/run_comparison.py
```

Expected output:

```text
Wrote multi_model_workflow\comparison_report.md
Wrote multi_model_workflow\repair_recommendations_for_models.md
```

## Presentation And Explainability Artifacts

The project includes several human-readable artifacts:

| Artifact | Purpose |
| --- | --- |
| `notes/math_overview.md` | Plain-English mathematical overview |
| `notes/proof_realizable.md` | Realizable proof explanation |
| `notes/proof_agnostic.md` | Agnostic proof explanation |
| `presentation/annotated_proof_walkthrough.md` | Lean code next to human explanation |
| `presentation/paper_vs_lean_table.md` | What informal proofs hide and Lean forces explicit |
| `presentation/proof_dependency_graph.md` | Dependency structure of definitions, assumptions, and theorems |
| `presentation/final_slides.pptx` | Final presentation deck |
| `presentation/speaker_notes.md` | Spoken presentation script |

These artifacts support the central message: Lean verification establishes correctness, but explanation and visualization make the proof understandable.

## Limitations

- Risks are abstract `Nat` values rather than real-valued probabilities.
- Probability concentration results are assumed.
- Exact logarithmic sample complexity bounds are explained mathematically but not fully proved in Lean.
- The project is MA-LoT-inspired but does not implement the full MA-LoT framework.
- The comparison script performs verification and structural comparison, not deep semantic equivalence checking between arbitrary proofs.

## Future Work

Future extensions could:

- replace assumed concentration facts with Mathlib probability theorems,
- use real-valued risks,
- formalize Hoeffding's inequality,
- formalize the exact logarithmic sample complexity bounds,
- automate more of the MA-LoT-style repair loop,
- integrate an MA-LoT-related model such as a LoT-Solver model as a proof-generation or correction agent.

## Conclusion

This project shows how finite-class learning guarantees can be formalized in Lean when the proof boundary is chosen carefully. The deterministic agnostic ERM theorem is fully verified. The realizable and agnostic high-probability guarantees are represented using explicit assumed concentration results.

The MA-LoT-inspired workflow adds a second contribution: it documents how AI-generated proofs can fail, how Lean exposes those failures, how comparison across models can guide repair, and how verified proofs can be translated back into human-readable explanation.

The final result is both a Lean formalization and a small study of AI-assisted theorem proving, proof repair, and proof explainability.
