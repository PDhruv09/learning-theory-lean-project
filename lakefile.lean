import Lake
open Lake DSL

package «learning-theory-lean-project» where
  version := v!"0.1.0"

lean_lib LearningTheoryProject where

@[default_target]
lean_exe learning_theory_lean_project where
  root := `Main
