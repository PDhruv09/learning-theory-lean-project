# Success and Failure Table

| Lemma | AI First Attempt | Lean Error | Human Fix | Final Status |
| --- | --- | --- | --- | --- |
| Project build | Failed | Imports not at beginning of file | Moved imports before module comments | Success |
| Assumed probability marker | Failed | `constant` rejected; `HighProbabilityEvent` unknown | Replaced `constant` with `axiom` | Success |
| Reflexive equality | Worked | None | None | Success |
| Simple inequality | Partial | Needed explicit monotonicity | Used `Nat.add_le_add_right` | Success |
| Agnostic ERM bound | Failed | Uniform convergence treated as one inequality | Used `.left` and `.right` | Success |
| Agnostic arithmetic | Failed | Relied on unavailable automation | Replaced `linarith` with explicit steps | Success |
| Agnostic repair case study | Failed then repaired | Wrong conjunction use, missing `+ eps`, unavailable automation | Named intermediate facts and `calc` chain | Success |
| Probability bound | Too ambitious | Would require probability formalization | Moved to `AssumedResults.lean` | Scoped out |
