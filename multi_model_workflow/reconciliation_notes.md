# Reconciliation Notes

## Reconciliation Rule

The final proof is chosen by verifier-backed correctness first, then readability.

Priority order:

1. Compiles with Lean.
2. Preserves theorem meaning.
3. Keeps assumptions explicit.
4. Uses readable intermediate names.
5. Avoids unavailable automation.

## Current Reconciliation

The current verified project proof uses the strongest ideas from the Codex repair:

- explicit extraction of uniform convergence directions,
- explicit ERM comparator step,
- monotonicity after adding `eps`,
- final `calc` chain,
- associativity rewrite.

Claude comparison will be added once Claude's blind output is saved.
