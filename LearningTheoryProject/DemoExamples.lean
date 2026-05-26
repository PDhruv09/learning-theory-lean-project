import LearningTheoryProject.Agnostic

/-!
Small Lean examples for the final presentation.

These examples support the MA-LoT-inspired workflow story: start with tiny
verified examples, then show how failed proof attempts are repaired.
-/

namespace LearningTheoryProject

theorem demo_equality (x : Nat) : x = x := by
  rfl

theorem demo_add_right {a b c : Nat} (h : a <= b) : a + c <= b + c := by
  exact Nat.add_le_add_right h c

theorem demo_uniform_left {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hUC : UniformConvergence P eps) (h : Hypothesis) :
    P.trueRisk h <= P.empiricalRisk h + eps := by
  exact (hUC h).left

theorem demo_uniform_right {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hUC : UniformConvergence P eps) (h : Hypothesis) :
    P.empiricalRisk h <= P.trueRisk h + eps := by
  exact (hUC h).right

end LearningTheoryProject
