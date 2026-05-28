import LearningTheoryProject.Agnostic

/-!
Codex repaired attempt.

This version compiles and mirrors the final verified proof structure while
using a generated theorem name so it can be checked independently.
-/

namespace LearningTheoryProject

theorem codex_agnostic_attempt_2_repaired {Hypothesis : Type u}
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

end LearningTheoryProject
