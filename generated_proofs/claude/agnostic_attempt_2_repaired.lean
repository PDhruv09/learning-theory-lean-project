import LearningTheoryProject.Agnostic

namespace LearningTheoryProject

-- Repair: replaced omega (which cannot reason about abstract Nat-valued
-- functions) with explicit Nat.add_le_add_right and Nat.add_assoc.
theorem generated_agnostic_erm_deterministic {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis)
    (hUC : UniformConvergence P eps)
    (hERM : EmpiricalRiskMinimizer P hHat) :
    AgnosticConclusion P eps hHat hStar := by
  unfold AgnosticConclusion
  have h1 : P.trueRisk hHat ≤ P.empiricalRisk hHat + eps   := (hUC hHat).left
  have h2 : P.empiricalRisk hHat ≤ P.empiricalRisk hStar   := hERM hStar
  have h3 : P.empiricalRisk hStar ≤ P.trueRisk hStar + eps := (hUC hStar).right
  calc P.trueRisk hHat
      ≤ P.empiricalRisk hHat + eps     := h1
    _ ≤ P.empiricalRisk hStar + eps    := Nat.add_le_add_right h2 eps
    _ ≤ P.trueRisk hStar + eps + eps   := Nat.add_le_add_right h3 eps
    _ = P.trueRisk hStar + (eps + eps) := Nat.add_assoc _ _ _

end LearningTheoryProject
