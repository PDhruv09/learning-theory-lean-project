/-!
Basic definitions for finite-class learning guarantees.

The project intentionally keeps risk and probability abstract. The formalized
core is the deterministic relationship between true risk, empirical risk, ERM,
and uniform convergence.
-/

namespace LearningTheoryProject

universe u

/-- A small abstract risk type. Using `Nat` keeps the project independent of
Mathlib while still supporting the order reasoning needed for the deterministic
ERM theorem. -/
abbrev Risk := Nat

/-- Binary labels for the classification story. The main theorems keep
hypotheses abstract, but this type records the intended learning setting. -/
inductive BinaryLabel where
  | zero
  | one
deriving DecidableEq, Repr

/-- A concrete classifier shape for binary classification. The core learning
theorems are generic over `Hypothesis`, so a hypothesis can be a classifier or
another abstract representation. -/
structure Classifier (Input : Type u) where
  predict : Input -> BinaryLabel

/-- A learning problem packages true risk, empirical risk, and membership in the
finite hypothesis class. The actual sample space and probability distribution
are abstracted away. -/
structure LearningProblem (Hypothesis : Type u) where
  trueRisk : Hypothesis -> Risk
  empiricalRisk : Hypothesis -> Risk
  classMember : Hypothesis -> Prop
  classSize : Nat

/-- Named class-membership predicate for readability in theorem statements. -/
def InClass {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (h : Hypothesis) : Prop :=
  P.classMember h

/-- The finite class is nonempty. In the abstract model this is represented by
the recorded class size. -/
def NonemptyClass {Hypothesis : Type u} (P : LearningProblem Hypothesis) : Prop :=
  0 < P.classSize

/-- A hypothesis is consistent when its empirical risk is zero. -/
def Consistent {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (h : Hypothesis) : Prop :=
  P.empiricalRisk h = 0

/-- A hypothesis is bad for tolerance `eps` when its true risk is larger than
the target tolerance. -/
def BadHypothesis {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (eps : Risk) (h : Hypothesis) : Prop :=
  eps < P.trueRisk h

/-- The realizable setting: some class member has zero true risk. -/
def Realizable {Hypothesis : Type u} (P : LearningProblem Hypothesis) : Prop :=
  Exists fun h => P.classMember h /\ P.trueRisk h = 0

/-- Uniform convergence: for every hypothesis, true and empirical risks are
within `eps` in both directions. This avoids absolute values and keeps the
statement elementary. -/
def UniformConvergence {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (eps : Risk) : Prop :=
  forall h,
    P.trueRisk h <= P.empiricalRisk h + eps /\
    P.empiricalRisk h <= P.trueRisk h + eps

/-- An empirical risk minimizer has empirical risk no larger than any comparator
hypothesis. -/
def EmpiricalRiskMinimizer {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (hHat : Hypothesis) : Prop :=
  forall h, P.empiricalRisk hHat <= P.empiricalRisk h

/-- A true-risk optimal hypothesis has true risk no larger than any comparator
hypothesis. This is useful for explaining the agnostic theorem as competition
with the best hypothesis in the class. -/
def TrueRiskOptimal {Hypothesis : Type u} (P : LearningProblem Hypothesis)
    (hStar : Hypothesis) : Prop :=
  forall h, P.trueRisk hStar <= P.trueRisk h

/-- Abstract sample-size condition for the realizable finite-class guarantee.
This stands in for the usual logarithmic condition. -/
def RealizableSampleCondition {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps delta m : Nat) : Prop :=
  P.classSize + delta <= m * (eps + 1)

/-- Abstract sample-size condition for the agnostic finite-class guarantee.
The quadratic dependence on `eps + 1` records the worse agnostic rate. -/
def AgnosticSampleCondition {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps delta m : Nat) : Prop :=
  P.classSize + delta <= m * ((eps + 1) * (eps + 1))

/-- The conclusion of the realizable theorem: every class member that is
consistent with the sample has true risk at most `eps`. -/
def RealizableConclusion {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk) : Prop :=
  forall h, InClass P h -> Consistent P h -> P.trueRisk h <= eps

/-- The conclusion of the deterministic agnostic theorem for a chosen ERM and
comparator hypothesis. -/
def AgnosticConclusion {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hHat hStar : Hypothesis) : Prop :=
  P.trueRisk hHat <= P.trueRisk hStar + (eps + eps)

theorem uniform_true_le_empirical_plus {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hUC : UniformConvergence P eps) (h : Hypothesis) :
    P.trueRisk h <= P.empiricalRisk h + eps :=
  (hUC h).left

theorem uniform_empirical_le_true_plus {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (eps : Risk)
    (hUC : UniformConvergence P eps) (h : Hypothesis) :
    P.empiricalRisk h <= P.trueRisk h + eps :=
  (hUC h).right

theorem consistent_empirical_zero {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (h : Hypothesis)
    (hConsistent : Consistent P h) :
    P.empiricalRisk h = 0 :=
  hConsistent

theorem class_member_iff_inClass {Hypothesis : Type u}
    (P : LearningProblem Hypothesis) (h : Hypothesis) :
    P.classMember h <-> InClass P h :=
  Iff.rfl

end LearningTheoryProject
