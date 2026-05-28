# Claude Code Handoff

Use this file to run the Claude side of the multi-LLM workflow honestly.

## Goal

Generate Claude proof attempts from the same blind theorem prompts used for Codex, without showing Claude the final verified proof first.

## Important Rule

Do not give Claude the final verified proof for the first blind attempt.

For the blind attempt, use the prompt file:

```text
theorem_prompts/agnostic_erm_theorem.md
```

## Step 1: Blind Agnostic Generation

Open Claude Code in this repo and give it this prompt:

```text
You are helping with a Lean 4 formalization project.

Use the theorem prompt in:
theorem_prompts/agnostic_erm_theorem.md

Generate a Lean 4 file proving the target theorem.

Do not inspect the existing final proof in LearningTheoryProject/Agnostic.lean.
Do not use Mathlib-only tactics such as linarith.
Return only Lean code.
```

Save Claude's output as:

```text
generated_proofs/claude/agnostic_attempt_1.lean
```

## Step 2: Verify Claude Attempt

Run:

```powershell
lake env lean generated_proofs/claude/agnostic_attempt_1.lean
```

If it fails, copy the exact error into:

```text
malot_workflow/verifier_feedback_log.md
multi_model_workflow/blind_generation_results.md
```

## Step 3: Claude Repair

Give Claude this prompt:

```text
This Lean proof failed with the following error:

[PASTE EXACT ERROR]

Repair only the failing proof. Do not change theorem meaning.
Keep assumptions explicit. Avoid Mathlib-only tactics.
Return only Lean code.
```

Save the repaired output as:

```text
generated_proofs/claude/agnostic_attempt_2_repaired.lean
```

Verify:

```powershell
lake env lean generated_proofs/claude/agnostic_attempt_2_repaired.lean
```

## Step 4: Claude Simplification

Once the repaired file compiles, give Claude:

```text
This Lean proof compiles. Simplify it as much as possible while preserving theorem meaning.
Do not introduce new assumptions.
Do not use Mathlib-only tactics.
Return only Lean code.
```

Save as:

```text
generated_proofs/claude/simplified_attempt.lean
```

Verify:

```powershell
lake env lean generated_proofs/claude/simplified_attempt.lean
```

## Step 5: Comparison

Update:

```text
multi_model_workflow/codex_vs_claude_comparison.md
presentation/codex_vs_claude_table.md
proof_refactoring/verified_refactors.md
proof_refactoring/failed_simplifications.md
```

## What To Send Back To Codex

Send:

1. Claude's `agnostic_attempt_1.lean`
2. any Lean error output,
3. Claude's repaired attempt,
4. Claude's simplified attempt,
5. the result of each verification command.
