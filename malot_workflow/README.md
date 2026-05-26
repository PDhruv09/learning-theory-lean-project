# MA-LoT-Inspired Workflow

This folder documents the proof-development workflow used in the project.

The project is **MA-LoT-inspired** because it combines:

- natural-language proof planning,
- AI-generated Lean proof attempts,
- Lean verifier feedback,
- repair iterations,
- final verified proofs,
- human-readable explanations.

This project does **not** implement the full MA-LoT system.

## Workflow

```text
paper proof
-> Lean theorem statement
-> AI-generated proof attempt
-> Lean compiler feedback
-> repair iteration
-> final verified proof
-> human-readable explanation
```

The goal is to show that verification and understanding are related but different. Lean verifies correctness. The notes and presentation explain the proof.

## Main Case Study

The main repair case study is:

```text
malot_workflow/agnostic_repair_case_study.md
```

It follows the deterministic agnostic ERM theorem from a broken AI-generated proof to the final verified Lean proof.
