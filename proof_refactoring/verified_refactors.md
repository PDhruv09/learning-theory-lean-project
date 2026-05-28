# Verified Refactors

| Version | Model | Compiles? | Simpler? | Kept? | Reason |
| --- | --- | --- | --- | --- | --- |
| `generated_proofs/codex/simplified_attempt.lean` | Codex | Yes | Yes | Yes | Calls the verified theorem directly and preserves theorem meaning. |
| `generated_proofs/claude/simplified_attempt.lean` | Claude | Yes | Yes | Yes | Inlines the repaired proof into a compact single `calc` chain. |
