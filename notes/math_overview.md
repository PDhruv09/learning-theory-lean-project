# Math Overview

This project studies binary classification with a finite hypothesis class.

We have an input space `X`, labels `{0, 1}`, and a finite class of hypotheses `H`. Each hypothesis is a classifier. Given a training sample, empirical risk minimization chooses a hypothesis with small training error. The goal is to prove that this chosen hypothesis also has small true error.

## Core Objects

| Object | Meaning |
| --- | --- |
| `X` | input space |
| `{0, 1}` | label space |
| `H` | finite hypothesis class |
| `h` | classifier |
| `D` | data distribution |
| `S` | training sample |
| `L_D(h)` | true risk |
| `L_S(h)` | empirical risk |
| ERM | hypothesis with minimum empirical risk |

## Realizable Setting

The realizable setting assumes there is a perfect hypothesis in the class:

```text
exists h* in H, L_D(h*) = 0
```

The standard finite-class guarantee says that with enough samples, every hypothesis consistent with the sample has small true risk. The rate is:

```text
m = O((log |H| + log(1/delta)) / epsilon)
```

The proof rules out bad hypotheses. A bad hypothesis has true risk greater than `epsilon`. A bad hypothesis is unlikely to fit every sample point, and because the class is finite, a union bound controls all bad hypotheses at once.

## Agnostic Setting

The agnostic setting does not assume a perfect hypothesis. Instead, ERM should compete with the best hypothesis in the class:

```text
L_D(h_hat) <= L_D(h_star) + 2 epsilon
```

This follows from uniform convergence:

```text
forall h in H, |L_D(h) - L_S(h)| <= epsilon
```

The sample complexity rate is:

```text
m = O((log |H| + log(1/delta)) / epsilon^2)
```

The worse rate comes from concentration inequalities such as Hoeffding's inequality.

## Formalization Boundary

The Lean project focuses on deterministic proof structure and explicit theorem statements. Probability concentration results are assumed in `LearningTheoryProject/AssumedResults.lean`.

This boundary is deliberate: the project is about formalizing the learning-theory argument and the proof-repair workflow, not rebuilding probability theory from scratch.
