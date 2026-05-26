import LearningTheoryProject.AssumedResults

/-!
The agnostic finite-class ERM guarantee.

The deterministic theorem in this file is the strongest fully verified Lean
result in the project. It proves that uniform convergence plus empirical risk
minimization implies that ERM competes with any comparator hypothesis, and in
particular with a true-risk optimal hypothesis.
-/

namespace LearningTheoryProject

universe u

/-- Deterministic agnostic ERM guarantee against any comparator.

Paper proof:

`trueRisk hHat <= empiricalRisk hHat + eps
              <= empiricalRisk hStar + eps
              <= trueRisk hStar + eps + eps`
-/
theorem agnostic_erm_deterministic {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis)
    (hUC : UniformConvergence P eps)
    (hERM : EmpiricalRiskMinimizer P hHat) :
    AgnosticConclusion P eps hHat hStar := by
  have hHatUC : P.trueRisk hHat <= P.empiricalRisk hHat + eps :=
    uniform_true_le_empirical_plus P eps hUC hHat
  have hERMStar : P.empiricalRisk hHat <= P.empiricalRisk hStar :=
    hERM hStar
  have hStepERM :
      P.empiricalRisk hHat + eps <= P.empiricalRisk hStar + eps :=
    Nat.add_le_add_right hERMStar eps
  have hStarUC :
      P.empiricalRisk hStar + eps <= (P.trueRisk hStar + eps) + eps :=
    Nat.add_le_add_right
      (uniform_empirical_le_true_plus P eps hUC hStar) eps
  calc
    P.trueRisk hHat <= P.empiricalRisk hHat + eps := hHatUC
    _ <= P.empiricalRisk hStar + eps := hStepERM
    _ <= (P.trueRisk hStar + eps) + eps := hStarUC
    _ = P.trueRisk hStar + (eps + eps) := by
      rw [Nat.add_assoc]

/-- Same theorem, stated with an explicit optimal hypothesis. The optimality
hypothesis documents the mathematical role of `hStar`, even though the stronger
comparator theorem above already proves the needed bound for any `hStar`. -/
theorem agnostic_erm_against_optimal {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis)
    (hUC : UniformConvergence P eps)
    (hERM : EmpiricalRiskMinimizer P hHat)
    (_hOptimal : TrueRiskOptimal P hStar) :
    AgnosticConclusion P eps hHat hStar :=
  agnostic_erm_deterministic P eps hHat hStar hUC hERM

/-- High-probability agnostic wrapper.

This combines the assumed finite-class uniform-convergence theorem with the
verified deterministic ERM theorem.
-/
theorem agnostic_high_probability_guarantee {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps delta m : Nat)
    (hHat hStar : Hypothesis)
    (hClassNonempty : NonemptyClass P)
    (hSampleLarge : AgnosticSampleCondition P eps delta m)
    (hERM : EmpiricalRiskMinimizer P hHat)
    (hOptimal : TrueRiskOptimal P hStar) :
    HighProbabilityEvent (AgnosticConclusion P eps hHat hStar) delta :=
  highProbability_mono
    (p := UniformConvergence P eps)
    (q := AgnosticConclusion P eps hHat hStar)
    (delta := delta)
    (fun hUC => agnostic_erm_against_optimal P eps hHat hStar hUC hERM hOptimal)
    (finiteClass_agnostic_uniform_convergence P eps delta m
      hClassNonempty hSampleLarge)

end LearningTheoryProject
