# Final Reflection

The project shows that AI proof generation is useful but not self-certifying. The Lean verifier identified missing assumptions, incorrect uses of hypotheses, and arithmetic gaps. Human intervention was needed to repair theorem statements, choose an appropriate abstraction boundary, and translate verified code into understandable mathematical explanation.

The most important lesson is that verification is not the same as understanding. Lean can confirm that a proof term checks, but readers still need diagrams, annotated walkthroughs, and plain-language proof explanations to see why the theorem matters.

Future work could formalize richer probability infrastructure, replace assumed concentration results with Mathlib-based theorems, and build a more automated MA-LoT-style repair loop.

## What the Workflow Revealed

The most common failures were not deep mathematical failures. They were translation failures:

- paper proofs used implicit objects,
- AI proofs guessed theorem shapes,
- Lean required each direction of a conjunction,
- arithmetic steps needed exact expressions.

This supports the project's research-communication layer. AI assistance helped produce candidate proof structure, Lean supplied reliable verification feedback, and human repair connected the two into an understandable proof.
