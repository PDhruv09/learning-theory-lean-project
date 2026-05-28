# Consensus Pipeline

This project extends the MA-LoT-inspired workflow with a multi-LLM proof comparison layer.

## Pipeline

```text
English theorem prompt
        |
        v
Codex proof attempt        Claude proof attempt
        |                         |
        v                         v
Lean verifier              Lean verifier
        |                         |
        v                         v
errors/logs                errors/logs
        |                         |
        v                         v
repair loop                repair loop
        \                         /
         \                       /
          v                     v
        comparison and reconciliation
                  |
                  v
        final verified Lean proof
                  |
                  v
        simplification/refactoring
                  |
                  v
        human-readable explanation
```

## Integrity Checks

- Blind generation: each model receives the same theorem prompt without seeing the final proof first.
- Verification: every Lean attempt is checked with Lean or `lake build`.
- Reconciliation: differences are logged before choosing the final proof.
- Refactoring safety: simplifications are kept only if the verifier still passes.
- Idempotence check: passing the verified proof through the simplifier should return an equivalent proof or a direct call to the verified theorem.

## How Comparison Actually Happens

The Markdown files are the human-readable record. The comparison itself is performed by:

```powershell
python multi_model_workflow/run_comparison.py
```

The script runs Lean on each generated proof file, records compile success or failure, captures verifier errors, computes a SHA256 hash prefix, counts lines, detects proof-strategy features, and writes:

```text
multi_model_workflow/comparison_report.md
```

This means the project does not rely on a hand-written Markdown table alone. The table is backed by a repeatable Python verifier/comparison script.
