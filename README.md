# Formalizing Finite-Class Learning Guarantees in Lean 4

**Full title:** Formalizing Finite-Class Learning Guarantees in Lean 4 with an MA-LoT-Inspired Proof Repair Workflow

This project formalizes learning guarantees for finite hypothesis classes in Lean 4. It covers the realizable setting, where a perfect classifier exists, and the agnostic setting, where empirical risk minimization competes with the best hypothesis in the class.

The project also studies an MA-LoT-inspired proof repair workflow:

```text
paper proof -> Lean theorem statement -> AI proof attempt -> Lean verifier feedback
-> repair iteration -> verified theorem -> human-readable explanation
```

The central communication theme is:

> Verification is not the same as understanding.

Lean checks whether a proof is correct. The notes and presentation artifacts explain why the proof works, what assumptions were hidden in the paper proof, and how failed AI-generated proof attempts were repaired.

## Minimum Viable Success Criteria

- A compiling Lean project with `BasicDefinitions.lean`, `AssumedResults.lean`, `Realizable.lean`, `Agnostic.lean`, and `MainTheorem.lean`.
- A fully proved deterministic agnostic ERM theorem.
- Realizable and probabilistic learning guarantees stated using clearly labeled assumed concentration results.
- Notes explaining the realizable and agnostic proof ideas.
- MA-LoT-inspired workflow logs showing failed AI proof attempts, Lean feedback, repairs, and final verified proofs.
- Presentation artifacts explaining the proof in human terms, especially an annotated proof walkthrough and dependency graph.

## Non-Goals

- This project does not fully formalize measure theory or probability concentration from scratch.
- This project does not implement the full MA-LoT system.
- This project does not aim to become a large learning-theory theorem library.
- This project does not hide assumptions inside vague wording; assumed probability results are isolated in `LearningTheoryProject/AssumedResults.lean`.

## Guiding Questions

- What does the informal learning-theory proof assume without saying explicitly?
- What does Lean force us to name, quantify, or prove?
- Which parts of the proof are verified by Lean, and which parts are assumed?
- Where did AI-generated proofs fail?
- What repairs were needed?
- How does human-readable explanation add understanding beyond formal verification?

## Repository Structure

```text
LearningTheoryProject/
  BasicDefinitions.lean
  AssumedResults.lean
  Realizable.lean
  Agnostic.lean
  DemoExamples.lean
  MainTheorem.lean
notes/
  math_overview.md
  proof_realizable.md
  proof_agnostic.md
  lean_translation_notes.md
  day*_checkpoint.md
malot_workflow/
  README.md
  malot_overview.md
  agnostic_repair_case_study.md
  proof_attempt_log.md
  verifier_feedback_log.md
  repair_iterations.md
  success_failure_table.md
  pattern_analysis.md
  final_reflection.md
presentation/
  annotated_proof_walkthrough.md
  proof_dependency_graph.md
  paper_vs_lean_table.md
  visual_theorem_flow.md
  final_demo_examples.md
  final_presentation_outline.md
  slide_deck_draft.md
  live_demo_script.md
  slide_asset_index.md
ai_workflow/
  CLAUDE.md
  AGENTS.md
  prompt_log.md
final_report/
  final_writeup.md
  submission_checklist.md
```

## How to Build

This project was verified with Lean 4.29.1 and Lake 5.0.0.

After Lean 4 and Lake are available:

```powershell
lake build
```

Expected result:

```text
Build completed successfully (16 jobs).
```

On this Windows machine, the VS Code extension was configured through a local Elan override named `local-lean-4.29.1`, backed by the Winget Lean installation. This avoided a Windows certificate revocation issue that blocked Elan downloads.

## Main Lean Results

- `realizable_learning_guarantee`: states the realizable finite-class guarantee using an explicit assumed concentration theorem.
- `agnostic_erm_deterministic`: fully proves the deterministic agnostic ERM guarantee under uniform convergence.
- `agnostic_high_probability_guarantee`: combines the assumed uniform-convergence theorem with the verified deterministic agnostic theorem.
- `DemoExamples.lean`: contains small examples for the live presentation.

## Presentation Entry Points

- Start with `presentation/slide_deck_draft.md`.
- Use `presentation/live_demo_script.md` for the live build and InfoView demonstration.
- Use `presentation/annotated_proof_walkthrough.md` for the key agnostic proof explanation.
- Use `malot_workflow/agnostic_repair_case_study.md` for the MA-LoT-inspired repair story.
