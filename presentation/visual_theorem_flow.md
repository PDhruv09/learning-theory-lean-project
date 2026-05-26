# Visual Theorem Flow

## Realizable Learning

```mermaid
flowchart LR
  A["Perfect h* exists"] --> B["Bad hypotheses have true risk > eps"]
  B --> C["Bad hypotheses unlikely to fit all samples"]
  C --> D["Union bound over finite H"]
  D --> E["Assumed concentration theorem"]
  E --> F["HighProbabilityEvent RealizableConclusion"]
  F --> G["Every in-class consistent h has true risk <= eps"]
```

## Realizable Lean Flow

```mermaid
flowchart TD
  A["hClassNonempty : NonemptyClass P"] --> D["realizable_learning_guarantee"]
  B["hSampleLarge : RealizableSampleCondition P eps delta m"] --> D
  C["hRealizable : Realizable P"] --> D
  D --> E["HighProbabilityEvent (RealizableConclusion P eps) delta"]
  F["hInClass : InClass P h"] --> G["realizable_conclusion_for_consistent_hypothesis"]
  H["hConsistent : Consistent P h"] --> G
  I["hConclusion : RealizableConclusion P eps"] --> G
  G --> J["P.trueRisk h <= eps"]
```

## Agnostic Learning

```mermaid
flowchart LR
  A["Uniform convergence"] --> B["True and empirical risks are close"]
  C["ERM"] --> D["hHat has minimal empirical risk"]
  B --> E["Compare hHat to hStar"]
  D --> E
  E --> F["trueRisk hHat <= trueRisk hStar + 2 eps"]
```

## MA-LoT-Inspired Workflow

```mermaid
flowchart LR
  A["Paper proof"] --> B["AI-generated Lean proof"]
  B --> C["Lean verifier feedback"]
  C --> D["Repair iteration"]
  D --> E["Verified theorem"]
  E --> F["Human-readable explanation"]
```

## Agnostic Repair Case Study

```mermaid
flowchart TD
  A["Informal proof: LD(hHat) <= LD(hStar) + 2 eps"] --> B["AI attempt uses hUC hHat directly"]
  B --> C["Lean feedback: hUC hHat is a conjunction"]
  C --> D["Repair: use .left for hHat"]
  D --> E["ERM step fails with missing + eps"]
  E --> F["Repair: Nat.add_le_add_right"]
  F --> G["Arithmetic automation unavailable"]
  G --> H["Repair: calc chain + Nat.add_assoc"]
  H --> I["agnostic_erm_deterministic verified"]
```

## Verification vs Understanding

Lean answers: "Does this proof check?"

The presentation answers: "Why does this proof make sense?"
