# Proof Simplification Prompt

You are given a Lean proof that already compiles.

Simplify the proof as much as possible while preserving:

- the theorem statement,
- the assumptions,
- readability,
- successful `lake build`.

Rules:

1. Do not change theorem meaning.
2. Do not introduce new assumptions.
3. Do not use Mathlib-only tactics.
4. Prefer short proofs only if they remain understandable.
5. The simplified proof must be checked by Lean.

Verifier:

```powershell
lake build
```
