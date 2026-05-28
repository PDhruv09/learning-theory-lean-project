# Claude Generated Proofs

This folder stores Claude Code outputs generated from the same blind theorem prompt used for Codex.

The intended workflow is:

```powershell
claude -p "$(Get-Content theorem_prompts/agnostic_erm_theorem.md -Raw)"
```

The output is then saved as:

- `agnostic_attempt_1.lean`
- `agnostic_attempt_2_repaired.lean`
- `simplified_attempt.lean`

Only compiling repaired/simplified attempts should be used as verified evidence.
