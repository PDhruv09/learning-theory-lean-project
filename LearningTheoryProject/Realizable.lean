import LearningTheoryProject.AssumedResults

/-!
The realizable finite-class learning guarantee.

The probability-heavy step is imported as an assumed concentration result. This
file formalizes the surrounding theorem shape and the vocabulary used in the
human proof.
-/

namespace LearningTheoryProject

universe u

theorem bad_hypothesis_has_large_trueRisk {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk) (h : Hypothesis)
    (hBad : BadHypothesis P eps h) :
    eps < P.trueRisk h :=
  hBad

theorem realizable_has_zero_risk_witness {Hypothesis : Type u}
    (P : LearningProblem Hypothesis)
    (hRealizable : Realizable P) :
    Exists fun h => InClass P h /\ P.trueRisk h = 0 :=
  hRealizable

theorem realizable_conclusion_for_consistent_hypothesis {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hConclusion : RealizableConclusion P eps)
    (h : Hypothesis)
    (hInClass : InClass P h)
    (hConsistent : Consistent P h) :
    P.trueRisk h <= eps :=
  hConclusion h hInClass hConsistent

/-- Main realizable theorem wrapper.

The theorem says that, assuming the finite-class concentration result, enough
samples imply that every consistent class member has true risk at most `eps`
with high probability.
-/
theorem realizable_learning_guarantee {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps delta m : Nat)
    (hClassNonempty : NonemptyClass P)
    (hSampleLarge : RealizableSampleCondition P eps delta m)
    (hRealizable : Realizable P) :
    HighProbabilityEvent (RealizableConclusion P eps) delta :=
  finiteClass_realizable_concentration P eps delta m
    hClassNonempty hSampleLarge hRealizable

end LearningTheoryProject
