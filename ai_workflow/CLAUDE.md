# CLAUDE.md

This project uses AI assistance for planning, Lean proof attempts, explanation drafting, and repair logging.

Important constraints:

- Do not claim that AI output is verified until Lean checks it.
- Keep assumed probability results explicit.
- Prefer small, readable Lean proofs over opaque automation.
- Preserve the distinction between formal verification and human understanding.

## Claude Role in the Multi-LLM Workflow

Claude is used as an independent proof generator and repair assistant. Its outputs live in:

```text
generated_proofs/claude/
```

The blind generation prompt is:

```text
theorem_prompts/agnostic_erm_theorem.md
```

For the first blind attempt, Claude should receive the theorem prompt but not the final verified proof in `LearningTheoryProject/Agnostic.lean`.

## Reproduction Commands

Verify Claude's blind attempt:

```powershell
lake env lean generated_proofs/claude/agnostic_attempt_1.lean
```

Verify Claude's repaired attempt:

```powershell
lake env lean generated_proofs/claude/agnostic_attempt_2_repaired.lean
```

Verify Claude's simplified attempt:

```powershell
lake env lean generated_proofs/claude/simplified_attempt.lean
```

Run the cross-model comparison:

```powershell
python multi_model_workflow/run_comparison.py
```

The generated report is:

```text
multi_model_workflow/comparison_report.md
```
