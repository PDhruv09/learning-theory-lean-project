# MA-LoT Overview

MA-LoT motivates a workflow where natural-language mathematical reasoning is connected to Lean verification and repair. The key idea for this project is not to reproduce the full framework, but to adapt its structure:

1. Start with a paper proof.
2. Ask an AI assistant to translate the proof into Lean.
3. Run Lean as the verifier.
4. Treat error messages as diagnostic feedback.
5. Repair the theorem statement or proof.
6. Produce a final verified theorem.
7. Translate the verified proof back into a human-readable explanation.

This project uses that loop to study finite-class learning guarantees.

## Important Wording

Use:

```text
MA-LoT-inspired workflow
```

Do not claim:

```text
I implemented MA-LoT.
```
