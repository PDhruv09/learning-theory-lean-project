# Live Demo Script

## Goal

Show that the project is not only written down, but verified by Lean.

## Demo 1: Whole-Project Build

Run:

```powershell
lake build
```

Expected output:

```text
Build completed successfully (16 jobs).
```

Say:

> This checks every Lean file in the project, including the definitions, assumed theorem interfaces, realizable theorem wrapper, agnostic theorem, and demo examples.

## Demo 2: Interactive Proof State

Open:

```text
LearningTheoryProject/Agnostic.lean
```

Click inside:

```lean
theorem agnostic_erm_deterministic
```

Point to the Lean InfoView.

Say:

> Lean shows the current hypotheses and goal. This is the live proof state that the compiler is checking.

## Demo 3: Repair Story

Show the failed proof idea:

```lean
exact hUC hHat
```

Explain:

> This fails because `hUC hHat` is a pair of inequalities, but the proof needs one direction.

Show the repaired line:

```lean
uniform_true_le_empirical_plus P eps hUC hHat
```

Say:

> The repair makes the hidden direction explicit.

## Demo 4: Presentation Tie-In

Open:

```text
presentation/annotated_proof_walkthrough.md
```

Say:

> This is where verification becomes explanation. The Lean proof checks correctness, while the walkthrough explains why each line exists.
