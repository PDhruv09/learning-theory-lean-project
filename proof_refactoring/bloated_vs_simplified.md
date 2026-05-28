# Bloated vs Simplified Proofs

The professor's workflow suggests simplifying only after a verifier exists.

In this project, the verifier is:

```powershell
lake build
```

or, for generated standalone files:

```powershell
lake env lean generated_proofs/codex/simplified_attempt.lean
```

## Example

| Version | Description |
| --- | --- |
| Bloated/repaired | Repeats the full `calc` chain with named intermediate facts. |
| Simplified | Calls the already verified project theorem directly. |

The simplified version is acceptable only because the full theorem has already been verified and `lake env lean` checks the file.
