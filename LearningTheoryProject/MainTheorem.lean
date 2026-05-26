import LearningTheoryProject.BasicDefinitions
import LearningTheoryProject.AssumedResults
import LearningTheoryProject.Realizable
import LearningTheoryProject.Agnostic
import LearningTheoryProject.DemoExamples

/-!
Main project entry point.

This file imports the formalized definitions, assumed concentration results,
realizable theorem wrapper, and agnostic deterministic theorem.
-/

namespace LearningTheoryProject

/-!
Project summary:

* `realizable_learning_guarantee` states the finite-class realizable guarantee
  using an explicit assumed concentration result.
* `agnostic_erm_deterministic` is fully proved in Lean and captures the core
  deterministic ERM argument under uniform convergence.
* `agnostic_high_probability_guarantee` combines the assumed uniform convergence
  theorem with the deterministic ERM theorem.
* `DemoExamples.lean` contains small examples for the final live demonstration.

Suggested presentation order:

1. Open `BasicDefinitions.lean` to show the learning vocabulary.
2. Open `AssumedResults.lean` to show what probability facts are assumed.
3. Open `Realizable.lean` to show the realizable theorem wrapper.
4. Open `Agnostic.lean` to show the fully verified deterministic ERM proof.
5. Open `DemoExamples.lean` to show tiny live examples of proof checking.
-/

end LearningTheoryProject
