import LearningTheoryProject.BasicDefinitions

/-!
Assumed probability and concentration results.

The project focuses on the learning-theory proof structure. Probability
concentration theorems such as finite-class union bounds and Hoeffding-style
uniform convergence are stated here as explicit assumptions.
-/

namespace LearningTheoryProject

universe u

/-- Abstract marker for a proposition holding with probability at least
`1 - delta`. The project does not formalize the underlying probability space. -/
axiom HighProbabilityEvent : Prop -> Nat -> Prop

/-- Monotonicity of high-probability events. This is an assumed probability
interface: if event `p` implies event `q`, then a high-probability guarantee for
`p` also gives one for `q`. -/
axiom highProbability_mono :
  forall {p q : Prop} {delta : Nat},
    (p -> q) -> HighProbabilityEvent p delta -> HighProbabilityEvent q delta

/-- Assumed finite-class realizable concentration theorem.

Informally: when the class is finite, the sample is large enough, and the
problem is realizable, then with high probability every class member that is
consistent with the sample has true risk at most `eps`.
-/
axiom finiteClass_realizable_concentration :
  forall {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (eps delta m : Nat),
    NonemptyClass P ->
    RealizableSampleCondition P eps delta m ->
    Realizable P ->
    HighProbabilityEvent (RealizableConclusion P eps) delta

/-- Assumed finite-class agnostic uniform-convergence theorem.

Informally: for a finite class and sufficiently many samples, all empirical
risks uniformly approximate their corresponding true risks.
-/
axiom finiteClass_agnostic_uniform_convergence :
  forall {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (eps delta m : Nat),
    NonemptyClass P ->
    AgnosticSampleCondition P eps delta m ->
    HighProbabilityEvent (UniformConvergence P eps) delta

end LearningTheoryProject
