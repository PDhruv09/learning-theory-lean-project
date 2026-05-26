# Proof Attempt Log

## Attempt 1: Equality Demo

**Lemma:** prove `x = x`.

**Prompt:** Given a variable `x`, prove reflexive equality in Lean.

**AI output:**

```lean
theorem demo_eq (x : Nat) : x = x := by
  rfl
```

**Result:** Expected to compile.

**Lesson:** Simple reflexive goals are handled well by direct proof generation.

## Attempt 2: Broken Agnostic Proof

**Lemma:** ERM deterministic agnostic guarantee.

**Prompt:** Given uniform convergence and ERM, prove `trueRisk h_hat <= trueRisk h_star + 2 * eps`.

**AI output sketch:**

```lean
calc
  trueRisk h_hat <= empiricalRisk h_hat + eps := by exact hUC h_hat
  _ <= empiricalRisk h_star + eps := by exact hERM
  _ <= trueRisk h_star + 2 * eps := by linarith
```

**Result:** Did not compile.

**Issue:** The proof treated `hUC h_hat` as a single inequality, but the formal definition returns a pair of inequalities. It also used `linarith`, which is not available in a core-only Lean project.

**Repair:** Extract `.left` and `.right` from uniform convergence, use explicit `Nat.add_le_add_right`, and rewrite addition associativity.

**Full case study:** See `agnostic_repair_case_study.md`.

## Attempt 3: Uniform Convergence Direction Demo

**Lemma:** extract the first half of uniform convergence.

**Prompt:** Given `hUC : UniformConvergence P eps`, prove `P.trueRisk h <= P.empiricalRisk h + eps`.

**AI output:**

```lean
exact hUC h
```

**Result:** Did not compile.

**Issue:** `hUC h` has type:

```lean
P.trueRisk h <= P.empiricalRisk h + eps /\
P.empiricalRisk h <= P.trueRisk h + eps
```

but the goal only asks for the first conjunct.

**Repair:**

```lean
exact (hUC h).left
```

**Final status:** Captured in `demo_uniform_left`.

## Attempt 4: Project Build Repair

**Lemma/task:** build the whole project.

**Prompt:** Run `lake build`.

**Verifier feedback:**

```text
invalid 'import' command, it must be used in the beginning of the file
```

**Repair:** Move imports above module comments.

**Second verifier feedback:**

```text
HighProbabilityEvent is unknown
```

**Repair:** Replace `constant HighProbabilityEvent` with `axiom HighProbabilityEvent`.

**Final status:** `lake build` completed successfully.
