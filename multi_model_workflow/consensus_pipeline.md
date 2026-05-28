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
