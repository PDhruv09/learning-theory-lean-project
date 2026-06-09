# Speaker Notes For Five-Part Presentation

Use this as a spoken script. The slides can show formulas; your speaking should mostly explain the meaning in plain English.

## Slide 1
Say: My project is about formalizing a classical learning-theory result in Lean 4. The math side is finite hypothesis class learning. The workflow side is an MA-LoT-inspired proof repair process using Lean feedback and AI-generated proof attempts.

Say: The main theme is that verification is not the same as understanding. Lean can check that a proof is correct, but a human still needs to understand what the proof means and where the assumptions are.

Transition: I will start by giving the structure of the talk.

## Slide 2
Say: The talk has five parts. First, I give the background. Second, I explain the math problem and the proof. Third, I explain MA-LoT and how I adapted it. Fourth, I explain my repository workflow and assumptions. Fifth, I show the project live in VS Code.

Transition: Before getting into Lean, I want to explain why this learning-theory question matters.

## Slide 3
Say: In machine learning, we usually train on a finite sample, but we care about future examples. So the central question is: when does good performance on the training data tell us anything about good performance on unseen data?

Say: This project formalizes one clean answer for the case where the hypothesis class is finite.

Transition: To make that question precise, we need to separate training error from true error.

## Slide 4
Say: Training error is the error we can measure because we have the sample. True error is the error over the unknown distribution, which is what we actually care about.

Say: The danger is overfitting: a hypothesis might do well on the sample but badly on the distribution. Learning guarantees tell us when that danger is controlled.

Transition: The reason this project is manageable is that the hypothesis class is finite.

## Slide 5
Say: Since the hypothesis class is finite, we can reason about one hypothesis at a time and then combine the bounds across the whole class. This is where the union bound becomes the main proof tool.

Say: Intuitively, the more hypotheses we allow, the more chances there are for one of them to look good by accident.

Transition: That leads to the exact goal of the project.

## Slide 6
Say: The project has two deliverables. The first is a Lean formalization of the finite-class learning guarantee. The second is a proof-repair and explanation workflow inspired by MA-LoT.

Say: The strongest Lean result is the deterministic agnostic ERM theorem. The probability concentration results are stated clearly as assumptions instead of being hidden.

Transition: Now I will define the math objects used in the theorem.

## Slide 7
Say: This section is the math foundation. The slide shows the formal notation, but the idea is simple: we have classifiers, data, a distribution, a sample, and two ways to measure error.

Transition: I will start with the setup.

## Slide 8
Say: We have a finite set of possible classifiers, called the hypothesis class. Each classifier takes an input and predicts a binary label.

Read the setup formulas as: H is the finite list of classifiers we are allowed to choose from. Each h is one classifier. Each data point has an input and a label. The sample S is m independent training examples.

Say: A data point contains an input and a true label. The sample is a list of independent data points drawn from the unknown distribution.

Read true risk as: the true risk of h is the probability that h gives the wrong label on a fresh example from the distribution.

Say: True risk means the probability that a classifier is wrong on a fresh random example. Empirical risk means the fraction of mistakes it makes on the training sample.

Read empirical risk as: the empirical risk of h is the average number of mistakes h makes on the training sample.

Say: ERM, or empirical risk minimization, chooses a classifier with the smallest training error.

Read the ERM formula as: h-hat is chosen to be one of the hypotheses in H with minimum empirical risk.

Transition: With those definitions in place, we can look at the easier realizable setting first.

## Slide 9
Say: In the realizable setting, we assume the hypothesis class contains a perfect classifier. That means there is some classifier that makes no true mistakes.

Read the realizability formula as: there exists a hypothesis h-star in H whose true risk is zero.

Say: If a classifier has zero true error, then it also makes no mistakes on the training sample. Since ERM chooses a classifier with minimum training error, ERM can also achieve zero training error.

Read the ERM consistency line as: because h-star has zero training error and h-hat minimizes training error, h-hat must also have zero training error.

Say: So in the realizable case, ERM returns a classifier that is consistent with the sample.

Transition: The proof now asks what could still go wrong.

## Slide 10
Say: We call a classifier bad if its true error is larger than our target accuracy level.

Read the bad set formula as: B is the set of hypotheses in H whose true risk is greater than epsilon.

Say: If ERM fails, that means ERM returned a bad classifier. But ERM is consistent in the realizable case, so this bad classifier must have fit the entire training sample perfectly.

Read the event-containment formula as: if the true risk of h-hat is greater than epsilon, then there exists some bad hypothesis that has zero empirical risk on the sample.

Say: Therefore, the failure event is contained in the event that some bad classifier happens to fit all the training data.

Transition: Next we bound the probability of that happening for one fixed bad classifier.

## Slide 11
Say: Fix one bad classifier. Since it is bad, it makes mistakes with probability more than our target error level.

Read the first probability line as: the probability that this bad hypothesis fits the whole sample is the probability that it is correct on all m examples.

Say: So the chance that it is correct on one random example is less than one minus that target error. To fit the entire sample, it has to be correct on every independent example.

Read the exponential bound as: because the hypothesis is bad, the probability it fits all m examples is at most e to the negative epsilon times m.

Say: That probability shrinks exponentially with the sample size.

Transition: Now we extend that one-classifier bound to the whole hypothesis class.

## Slide 12
Say: There may be many bad classifiers, so we use the union bound. The chance that any bad classifier fits the sample is at most the sum of the chances for each bad classifier.

Read the union-bound formula as: the probability that at least one bad hypothesis fits the sample is at most the sum of the probabilities that each individual bad hypothesis fits the sample.

Say: Since the set of bad classifiers is no larger than the whole hypothesis class, the final bound depends on the size of the hypothesis class.

Read the final bound as: the total failure probability is at most the size of H times e to the negative epsilon times m.

Transition: Once we have that bound, we choose the sample size so the failure probability is small enough.

## Slide 13
Say: The slide solves the inequality that makes the failure probability at most delta.

Read the first line as: we want the size of H times e to the negative epsilon m to be at most delta.

Say: In words, the sample size needs to grow with the log of the number of hypotheses and the log of one over the failure probability. It also grows like one over the target accuracy level.

Read the final sample-size formula as: m should be at least one over epsilon times log size of H plus log one over delta.

Transition: That gives the final realizable learning theorem.

## Slide 14
Say: The final realizable theorem says: if there is a perfect classifier in the finite class, and the sample size is large enough, then with high probability ERM returns a classifier whose true error is at most the target error.

Read the final probability statement as: with probability at least one minus delta, the true risk of h-hat is at most epsilon.

Say: In my Lean project, the probability bound behind this theorem is stated as an explicit assumed result.

Transition: Now we remove the perfect-classifier assumption and move to the agnostic setting.

## Slide 15
Say: In the agnostic setting, the hypothesis class may not contain any perfect classifier. Every classifier might make some mistakes.

Read the no-perfect-classifier statement as: we are no longer assuming there is any hypothesis with zero true risk.

Say: So instead of comparing ERM to perfection, we compare ERM to the best classifier inside the hypothesis class.

Read the h-star formula as: h-star is a hypothesis in H with the smallest true risk among hypotheses in H.

Say: The goal is to prove that ERM performs almost as well as that best classifier.

Read the goal formula as: the true risk of h-hat is at most the true risk of h-star plus two epsilon.

Transition: The key condition that makes this work is uniform convergence.

## Slide 16
Say: Uniform convergence means that for every classifier in the class, its training error is close to its true error.

Read the uniform convergence formula as: for every hypothesis h, the difference between true risk and empirical risk is at most epsilon.

Say: This gives us two useful directions. True error can be bounded by training error plus a small amount, and training error can be bounded by true error plus a small amount.

Read the two consequences as: true risk is at most empirical risk plus epsilon, and empirical risk is at most true risk plus epsilon.

Say: We also use the ERM property: the classifier chosen by ERM has training error no larger than the training error of the comparison classifier.

Read the ERM assumption as: the empirical risk of h-hat is at most the empirical risk of h-star.

Transition: Now we combine these facts into the deterministic agnostic proof.

## Slide 17
Say: This is the central proof that I fully formalized in Lean.

Read the first inequality as: the true risk of h-hat is at most the empirical risk of h-hat plus epsilon.

Say: Start with the true error of the ERM classifier. By uniform convergence, this is at most its training error plus a small amount.

Read the second inequality as: the empirical risk of h-hat is at most the empirical risk of h-star, because h-hat is ERM.

Say: Because ERM minimizes training error, its training error is at most the training error of the best comparison classifier.

Read the third inequality as: the empirical risk of h-star is at most the true risk of h-star plus epsilon.

Say: By uniform convergence again, the comparison classifier's training error is at most its true error plus a small amount.

Read the conclusion as: putting the inequalities together, the true risk of h-hat is at most the true risk of h-star plus two epsilon.

Say: Combining the two small error terms, ERM's true error is at most the best classifier's true error plus twice the tolerance.

Transition: That proof is deterministic. To get a high-probability theorem, we need concentration.

## Slide 18
Say: For one fixed classifier, empirical risk is an average of independent mistake indicators. Hoeffding's inequality tells us that this average is close to its expectation with high probability.

Read the Hoeffding formula as: for a fixed h, the probability that empirical risk and true risk differ by more than epsilon is at most two times e to the negative two m epsilon squared.

Say: In this setting, the expectation is the true risk.

Transition: But we need the statement to hold for every classifier, not just one.

## Slide 19
Say: Since the hypothesis class is finite, we use the union bound again. We apply the fixed-classifier concentration result to every classifier in the class.

Read the bad-uniform-convergence event as: there exists some h in H whose empirical risk and true risk differ by more than epsilon.

Say: This gives a high-probability uniform convergence guarantee over the whole class.

Read the final probability bound as: the probability that uniform convergence fails is at most two times the size of H times e to the negative two m epsilon squared.

Transition: Then we solve the sample-size condition for the agnostic case.

## Slide 20
Say: The sample size now depends on one over the accuracy level squared. That square comes from Hoeffding's inequality.

Read the sample-size condition as: m should be at least one over two epsilon squared times log of two times the size of H divided by delta.

Say: This is the main reason the agnostic setting has a worse rate than the realizable setting.

Transition: Combining uniform convergence with the deterministic lemma gives the final agnostic theorem.

## Slide 21
Say: The agnostic theorem says that, with high probability, ERM performs within twice the tolerance of the best classifier in the hypothesis class.

Read the final agnostic statement as: with probability at least one minus delta, the true risk of h-hat is at most the minimum true risk over H plus two epsilon.

Say: In the Lean formalization, the deterministic part of this implication is fully proved. The concentration result that gives uniform convergence is stated as an explicit assumption.

Transition: Now we can directly compare the two rates.

## Slide 22
Say: In the realizable case, we only need to rule out bad classifiers that fit the sample perfectly. That probability decays faster in the target error level, so the rate uses one over epsilon.

Read the realizable rate as: the sample complexity grows like log size of H plus log one over delta, divided by epsilon.

Say: In the agnostic case, we need empirical and true risks to be close for all classifiers. That relies on concentration of averages, so the rate uses one over epsilon squared.

Read the agnostic rate as: the sample complexity grows like log size of H plus log one over delta, divided by epsilon squared.

Transition: This comparison tells us exactly what the Lean project should prove and what it should assume.

## Slide 23
Say: The Lean target is intentionally scoped. I prove the deterministic agnostic ERM theorem, because that is the core learning-theory reasoning.

Say: I state the probability-heavy concentration results separately in the assumed-results file. This keeps the project honest and complete within the course timeline.

Transition: Now I will explain the proof-repair workflow layer.

## Slide 24
Say: MA-LoT is relevant because it studies Lean theorem proving with natural-language reasoning, verification, and repair.

Say: My project borrows that workflow idea and applies it to this learning-theory formalization.

Transition: Here is the loop I adapted.

## Slide 25
Say: The workflow starts from a paper proof or theorem prompt. Then an AI model generates a Lean proof attempt. Lean checks it. If it fails, the compiler feedback becomes the repair signal. After repair, the final proof is verified and then explained in human language.

Transition: I want to be careful about what I did and did not implement.

## Slide 26
Say: I did not implement the full MA-LoT system. My project is MA-LoT-inspired.

Say: The adapted version focuses on blind proof generation, Lean verification, repair logs, comparison between models, and human-readable explanation.

Transition: The blind generation step is important because it avoids simply copying my final proof.

## Slide 27
Say: Codex and Claude receive the same theorem prompt. Their outputs are saved separately. Then the Lean verifier checks whether each generated proof compiles.

Say: This makes the workflow closer to an experiment: same prompt, different model attempts, same verifier.

Transition: The useful part is not only whether the models succeed, but how they fail.

## Slide 28
Say: Failed proof attempts reveal hidden assumptions and weak spots in the theorem statement. For example, a model may forget an optimality assumption, use a nonexistent lemma, or skip an arithmetic step.

Say: Lean turns those vague issues into exact errors, and those errors guide the repair.

Transition: Next I will show how the repository is organized around that workflow.

## Slide 29
Say: This part explains what is in the project, what each file means, and how the assumptions are separated from the fully proved result.

Transition: I will start with the Lean file map.

## Slide 30
Say: The Lean files are separated by role. Basic definitions are in one file. Assumed probability results are in another. The realizable theorem wrapper is separate from the agnostic theorem. The main theorem file imports the complete formalization.

Say: This separation makes it clear which setting is being discussed and which results are proved versus assumed.

Transition: Now I will describe the core definitions.

## Slide 31
Say: The Lean definitions are abstract on purpose. True risk and empirical risk are functions. Uniform convergence is a condition saying those functions are close. ERM is represented as a minimization assumption over empirical risk.

Say: This lets the project focus on the proof structure instead of rebuilding probability theory.

Transition: That brings us to the proof boundary.

## Slide 32
Say: The fully proved part is the deterministic agnostic theorem. The scoped-out parts are Hoeffding, finite-class concentration, and the probability wrappers.

Say: These assumptions are not hidden; they are named in the Lean code and explained in the README and notes.

Transition: The project also includes explanation artifacts so the proof is understandable.

## Slide 33
Say: The annotated proof walkthrough explains Lean code line by line in human terms. The paper-versus-Lean table shows what informal proofs hide. The dependency graph shows which theorem uses which definitions and assumptions.

Say: This is where the theme comes back: verification checks correctness, but explanation supports understanding.

Transition: Now I will switch to the live VS Code demo.

## Slide 34
Say: In the demo, I will show the verified theorem, run the Lean build, run the comparison script, and open the generated comparison and repair files.

Transition: First, I will open the strongest Lean theorem.

## Slide 35
Do: Open `LearningTheoryProject/Agnostic.lean`.

Say: This is the main fully verified theorem. It proves that under uniform convergence and the ERM assumption, the ERM classifier performs almost as well as the best classifier in the class.

Say: If I click inside the proof, Lean InfoView shows the current hypotheses and goals. That shows Lean is actively checking the proof, not just displaying text.

Transition: Next I will verify the whole project, not just this file.

## Slide 36
Do: In the VS Code terminal, run:

```powershell
lake build
```

Say: The expected output is that the build completes successfully with sixteen jobs. This checks the definitions, assumed-result interfaces, realizable wrapper, agnostic proof, and main import file.

Transition: Now I will run the workflow script that compares generated proof attempts.

## Slide 37
Do: Run:

```powershell
python multi_model_workflow/run_comparison.py
```

Say: This script regenerates two markdown files. One is the human-facing comparison report. The other is the model-facing repair recommendation file.

Say: This makes the workflow reproducible instead of just described in the presentation.

Transition: First I will open the human-facing comparison report.

## Slide 38
Do: Open `multi_model_workflow/comparison_report.md`.

Say: This file ranks proof attempts, records the consensus recommendation, and lists cross-model repair suggestions.

Say: This implements the professor's comparison idea: do not trust one generated proof attempt blindly. Compare attempts, find useful differences, and use those differences to improve the final proof.

Transition: Then I will show the file that can be handed back to the models.

## Slide 39
Do: Open `multi_model_workflow/repair_recommendations_for_models.md`.

Say: This is the model-facing handoff. After comparing Codex and Claude, this file turns the comparison into instructions for repair and simplification.

Say: So the workflow does not stop at logging failures. It produces actionable guidance for the next proof attempt.

Transition: I will close with the main lesson of the project.

## Slide 40
Say: The final takeaway is that Lean verifies the proof core, but explanation makes the proof understandable.

Say: The project proves the deterministic learning-theory logic, states the probability assumptions honestly, and uses an MA-LoT-inspired workflow to study how AI proof attempts can be checked, repaired, compared, and explained.

Say: So the project is both a Lean formalization and a small study in AI-assisted theorem proving and proof explainability.
