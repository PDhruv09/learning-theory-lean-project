# Repair Iterations

## Project Build

### Attempt 1

Ran `lake build` through the direct Winget Lean installation.

**Failure:** Lean rejected imports that appeared after module comments.

**Repair:** Moved imports to the beginning of affected Lean files.

### Attempt 2

Ran `lake build` again.

**Failure:** Lean rejected `constant HighProbabilityEvent`.

**Repair:** Changed it to `axiom HighProbabilityEvent`.

### Attempt 3

Ran `lake build` again.

**Success:** Build completed successfully with 14 jobs.

## Agnostic Deterministic Theorem

Full case study: `agnostic_repair_case_study.md`.

### Attempt 1

AI generated a direct `calc` proof.

**Failure:** Missing extraction of the correct side of the uniform-convergence conjunction.

### Attempt 2

The theorem statement included uniform convergence and ERM, but the proof tried to use `linarith`.

**Failure:** The project does not depend on Mathlib, so arithmetic automation is not available.

### Attempt 3

The proof was rewritten with explicit helper facts:

- `hHatUC`
- `hERMStar`
- `hStepERM`
- `hStarUC`

**Success:** The final proof uses a readable `calc` block plus elementary natural-number monotonicity and associativity.
