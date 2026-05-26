# Paper Proof vs Lean Proof

| Paper Proof Says | Lean Forced Me To Specify |
| --- | --- |
| "Let ERM choose a best hypothesis." | An explicit `hHat` and `hERM : EmpiricalRiskMinimizer P hHat`. |
| "Compare to the optimal hypothesis." | An explicit `hStar` and optionally `hOptimal : TrueRiskOptimal P hStar`. |
| "By uniform convergence." | Two separate inequalities: true-to-empirical and empirical-to-true. |
| "Rearranging gives the result." | Explicit arithmetic steps using monotonicity and associativity. |
| "With enough samples." | A named sample-size hypothesis: `RealizableSampleCondition` or `AgnosticSampleCondition`. |
| "With high probability." | An abstract `HighProbabilityEvent` interface and assumed concentration theorem. |
| "Finite hypothesis class." | A `LearningProblem` with `classMember`, `classSize`, `InClass`, and `NonemptyClass`. |
| "ERM is within `2 epsilon`." | Named formal conclusion `AgnosticConclusion P eps hHat hStar`. |
| "All consistent hypotheses generalize." | Named formal conclusion `RealizableConclusion P eps`. |
| "Use the AI-generated proof." | Run Lean, collect verifier feedback, repair the proof, and only then present it as verified. |
| "Verification means the proof is clear." | Additional walkthroughs and diagrams are needed for human understanding. |

## Main Lesson

Paper proofs are compact because humans infer missing context. Lean proofs are longer because every object, direction, and dependency must be explicit.

The MA-LoT-inspired layer adds a second lesson: AI-generated proofs are useful as attempts, but Lean verification and human repair determine what survives.
