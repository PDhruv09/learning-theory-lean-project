import LearningTheoryProject.Agnostic

namespace LearningTheoryProject

theorem generated_agnostic_erm_deterministic {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis)
    (hUC : UniformConvergence P eps)
    (hERM : EmpiricalRiskMinimizer P hHat) :
    AgnosticConclusion P eps hHat hStar := by
  show P.trueRisk hHat ≤ P.trueRisk hStar + (eps + eps)
  have h1 : P.trueRisk hHat ≤ P.empiricalRisk hHat + eps   := (hUC hHat).left
  have h2 : P.empiricalRisk hHat ≤ P.empiricalRisk hStar   := hERM hStar
  have h3 : P.empiricalRisk hStar ≤ P.trueRisk hStar + eps := (hUC hStar).right
  calc P.trueRisk hHat
      ≤ P.empiricalRisk hHat + eps     := h1
    _ ≤ P.empiricalRisk hStar + eps    := by omega
    _ ≤ P.trueRisk hStar + eps + eps   := by omega
    _ = P.trueRisk hStar + (eps + eps) := by omega

end LearningTheoryProject
