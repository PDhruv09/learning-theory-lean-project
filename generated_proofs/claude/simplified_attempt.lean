import LearningTheoryProject.Agnostic

namespace LearningTheoryProject

theorem generated_agnostic_erm_deterministic {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis)
    (hUC : UniformConvergence P eps)
    (hERM : EmpiricalRiskMinimizer P hHat) :
    AgnosticConclusion P eps hHat hStar := by
  unfold AgnosticConclusion
  calc P.trueRisk hHat
      ≤ P.empiricalRisk hHat + eps     := (hUC hHat).left
    _ ≤ P.empiricalRisk hStar + eps    := Nat.add_le_add_right (hERM hStar) eps
    _ ≤ P.trueRisk hStar + eps + eps   := Nat.add_le_add_right (hUC hStar).right eps
    _ = P.trueRisk hStar + (eps + eps) := Nat.add_assoc _ _ _

end LearningTheoryProject
