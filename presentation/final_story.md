# Final Story

This project begins with a learning-theory question: when does training performance generalize to unseen data?

Finite hypothesis classes give a clean answer. In the realizable setting, a perfect classifier exists, and the proof rules out bad hypotheses that nevertheless fit the sample. In the agnostic setting, no perfect classifier is assumed, so the proof uses uniform convergence to show that ERM competes with the best hypothesis in the class.

The Lean formalization makes this structure explicit. The deterministic agnostic theorem is fully verified. The probability-heavy concentration results are clearly isolated as assumptions.

The second contribution is methodological. Inspired by MA-LoT and by the professor's suggestion, the project treats Lean as a verifier for LLM-generated proof attempts. Codex and Claude are given the same blind theorem prompt. Their outputs are checked by Lean, repaired using verifier feedback, compared, reconciled, and simplified only when the verifier still passes.

The central lesson is:

> Verification is not the same as understanding.

Lean verifies correctness. The diagrams, annotated walkthroughs, repair logs, and presentation materials explain why the proof works.
