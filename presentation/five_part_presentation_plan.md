# Five-Part Presentation Plan

## Part 1: Introduction And Background

Goal: motivate why learning theory needs generalization guarantees.

Slides:

- Title and thesis
- Roadmap
- Why training accuracy is not enough
- Why finite hypothesis classes are the right scope
- Project goal

## Part 2: Math Problem And Full Proof

Goal: present the learning-theory proof in a formula-first style, with fewer paragraphs and more displayed derivation.

Slides:

- Setup: `ℋ`, `S`, `L𝒟`, `Lₛ`, ERM
- Realizable assumption and consistency of ERM
- Bad-hypothesis event containment
- Fixed bad-hypothesis probability bound
- Union bound over the finite class
- Realizable sample-size algebra
- Final realizable theorem
- Agnostic setting and optimal comparator `h*`
- Deterministic uniform-convergence lemma
- Deterministic ERM proof chain
- Fixed-hypothesis Hoeffding bound
- Union-bound Hoeffding over `ℋ`
- Agnostic sample-size algebra
- Final agnostic theorem
- Rate comparison
- Lean formalization boundary

## Part 3: MA-LoT And Project Adaptation

Goal: explain MA-LoT as inspiration, not as a full implemented system.

Slides:

- MA-LoT idea
- What is adapted vs not implemented
- Codex/Claude blind generation
- Repair evidence

## Part 4: Workflow, Definitions, And Assumptions

Goal: clarify exactly what is proved, assumed, and explained.

Slides:

- Lean file map
- Lean definitions
- Assumptions boundary
- Human understanding layer

## Part 5: Visual Studio Code Demo

Goal: show that the project compiles and the workflow is reproducible.

Slides:

- Open `Agnostic.lean`
- Run `lake build`
- Run `python multi_model_workflow/run_comparison.py`
- Open `multi_model_workflow/comparison_report.md`
- Open `multi_model_workflow/repair_recommendations_for_models.md`
- Final takeaways
