import fs from "node:fs";
import path from "node:path";

const slides = [
  {
    kicker: "Final project",
    title: "Formalizing finite-class learning guarantees in Lean 4",
    subtitle: "with an MA-LoT-inspired multi-LLM proof repair workflow",
    type: "title",
    body: [
      "A Lean formalization of realizable and agnostic finite-class learning results.",
      "A proof-repair study showing how generated Lean attempts are verified, repaired, compared, simplified, and explained.",
      "Core theme: verification is not the same as understanding.",
    ],
  },
  {
    kicker: "Roadmap",
    title: "The presentation has five connected parts.",
    type: "list",
    body: [
      "1. Introduction and background",
      "2. The math problem and full proof",
      "3. MA-LoT and how I adapted it",
      "4. My workflow, definitions, and assumptions",
      "5. VS Code demo of the verified project",
    ],
  },
  { kicker: "Part 1", title: "Introduction and background", type: "divider", body: ["Why learning theory needs generalization guarantees."] },
  {
    kicker: "Motivation",
    title: "Training accuracy does not by itself prove future performance.",
    type: "cards",
    cards: [
      ["Training data", "A classifier can fit examples it has already seen."],
      ["Future data", "The real goal is performance on new samples from the same distribution."],
      ["Learning theory", "A theorem states when empirical success transfers to true success."],
    ],
  },
  {
    kicker: "Finite classes",
    title: "Finite hypothesis classes are the clean first place to prove learnability.",
    type: "flow",
    nodes: ["finite ℋ", "sample S", "Lₛ(h)", "ERM", "L𝒟 guarantee"],
    body: ["The finite-class assumption lets the proof union-bound over all hypotheses in ℋ."],
  },
  {
    kicker: "Project goal",
    title: "The project formalizes the learning result and studies how proofs become understandable.",
    type: "split",
    leftTitle: "Lean formalization",
    left: ["Definitions for ℋ, risks, ERM, realizability, and uniform convergence.", "A fully proved deterministic agnostic ERM theorem."],
    rightTitle: "Explainability study",
    right: ["Generated Lean proof attempts are checked by Lean.", "Failures are logged, repaired, compared, simplified, and explained."],
  },

  { kicker: "Part 2", title: "The math problem and full proof", type: "divider", body: ["Formula-first: setup, realizable proof, agnostic proof, and rates."] },
  {
    kicker: "Setup",
    title: "Finite-class binary classification.",
    type: "math",
    math: [
      "ℋ = {h₁, h₂, …, h_N}",
      "h : 𝒳 → {0,1}",
      "z = (x,y),   x ∈ 𝒳,   y ∈ {0,1}",
      "𝒟 = unknown distribution on 𝒳 × {0,1}",
      "S = (z₁,…,z_m),   z_i ∼ 𝒟 independently",
      "",
      "L𝒟(h) = ℙ₍ₓ,ᵧ₎∼𝒟[h(x) ≠ y]",
      "Lₛ(h) = (1/m) Σᵢ₌₁ᵐ 𝟙[h(xᵢ) ≠ yᵢ]",
      "ĥ ∈ argmin_{h∈ℋ} Lₛ(h)",
    ],
    body: ["Goal: prove ERM generalizes for finite ℋ."],
  },
  {
    kicker: "Realizable",
    title: "Assumption and target guarantee.",
    type: "math",
    math: [
      "∃ h* ∈ ℋ,   L𝒟(h*) = 0",
      "",
      "L𝒟(h*) = 0  ⇒  Lₛ(h*) = 0",
      "ERM:  Lₛ(ĥ) ≤ Lₛ(h*) = 0",
      "Nonnegativity:  Lₛ(ĥ) ≥ 0",
      "",
      "Therefore:",
      "  Lₛ(ĥ) = 0",
      "",
      "Target:",
      "  ℙ[L𝒟(ĥ) > ε] ≤ δ",
      "  ℙ[L𝒟(ĥ) ≤ ε] ≥ 1 − δ",
    ],
    body: ["ERM is consistent when the class contains a perfect hypothesis."],
  },
  {
    kicker: "Realizable proof",
    title: "Bad hypotheses and event containment.",
    type: "math",
    math: [
      "B = {h ∈ ℋ : L𝒟(h) > ε}",
      "",
      "{L𝒟(ĥ) > ε}",
      "  ⊆ {∃h ∈ B : Lₛ(h)=0}",
      "",
      "Therefore:",
      "",
      "ℙ[L𝒟(ĥ) > ε]",
      "  ≤ ℙ[∃h ∈ B : Lₛ(h)=0]",
    ],
    body: ["If ERM is bad, some bad hypothesis fit the sample perfectly."],
  },
  {
    kicker: "Realizable proof",
    title: "One fixed bad hypothesis.",
    type: "math",
    math: [
      "Fix h ∈ B.  Then L𝒟(h) > ε.",
      "",
      "ℙ[h(x) ≠ y] = L𝒟(h) > ε",
      "ℙ[h(x) = y] = 1 − L𝒟(h) < 1 − ε",
      "",
      "ℙ[Lₛ(h)=0]",
      "  = (1 − L𝒟(h))ᵐ",
      "  ≤ (1 − ε)ᵐ",
      "  ≤ e^(−εm)",
    ],
    body: ["A bad h is exponentially unlikely to make zero sample mistakes."],
  },
  {
    kicker: "Realizable proof",
    title: "Union bound over the finite class.",
    type: "math",
    math: [
      "ℙ[∃h ∈ B : Lₛ(h)=0]",
      "  ≤ Σ_{h∈B} ℙ[Lₛ(h)=0]",
      "  ≤ Σ_{h∈B} e^(−εm)",
      "  = |B|e^(−εm)",
      "  ≤ |ℋ|e^(−εm)",
      "",
      "Thus:",
      "  ℙ[L𝒟(ĥ) > ε] ≤ |ℋ|e^(−εm)",
    ],
    body: ["The finite-class assumption enters exactly at the union bound."],
  },
  {
    kicker: "Realizable proof",
    title: "Choose m so the failure probability is at most δ.",
    type: "math",
    math: [
      "|ℋ|e^(−εm) ≤ δ",
      "",
      "log |ℋ| − εm ≤ log δ",
      "−εm ≤ log δ − log |ℋ|",
      "εm ≥ log |ℋ| + log(1/δ)",
      "",
      "m ≥ (1/ε)(log |ℋ| + log(1/δ))",
    ],
    body: ["This is the realizable sample complexity."],
  },
  {
    kicker: "Realizable theorem",
    title: "Final realizable finite-class guarantee.",
    type: "math",
    math: [
      "If",
      "  ∃h* ∈ ℋ,  L𝒟(h*) = 0",
      "  m ≥ (1/ε)(log |ℋ| + log(1/δ))",
      "",
      "then",
      "",
      "  ℙ[L𝒟(ĥ) > ε] ≤ δ",
      "",
      "equivalently",
      "",
      "  ℙ[L𝒟(ĥ) ≤ ε] ≥ 1 − δ.",
    ],
    body: ["In Lean, the probability-heavy bound is an explicit assumed result."],
  },
  {
    kicker: "Agnostic",
    title: "No perfect classifier is assumed.",
    type: "math",
    math: [
      "Maybe:  ∀h ∈ ℋ,  L𝒟(h) > 0",
      "",
      "h* ∈ argmin_{h∈ℋ} L𝒟(h)",
      "ĥ  ∈ argmin_{h∈ℋ} Lₛ(h)",
      "",
      "Goal:",
      "",
      "  L𝒟(ĥ) ≤ L𝒟(h*) + 2ε",
      "",
      "with high probability.",
    ],
    body: ["ERM should compete with the best hypothesis in ℋ."],
  },
  {
    kicker: "Agnostic lemma",
    title: "Deterministic assumption: uniform convergence.",
    type: "math",
    math: [
      "Assume:",
      "",
      "∀h ∈ ℋ,   |L𝒟(h) − Lₛ(h)| ≤ ε",
      "",
      "So for every h ∈ ℋ:",
      "",
      "L𝒟(h) ≤ Lₛ(h) + ε",
      "Lₛ(h) ≤ L𝒟(h) + ε",
      "",
      "ERM:",
      "∀h ∈ ℋ,   Lₛ(ĥ) ≤ Lₛ(h)",
    ],
    body: ["This deterministic lemma is the theorem fully proved in Lean."],
  },
  {
    kicker: "Agnostic lemma",
    title: "Deterministic ERM proof.",
    type: "math",
    math: [
      "L𝒟(ĥ)",
      "  ≤ Lₛ(ĥ) + ε          uniform convergence on ĥ",
      "  ≤ Lₛ(h*) + ε         ERM",
      "  ≤ L𝒟(h*) + ε + ε     uniform convergence on h*",
      "  = L𝒟(h*) + 2ε",
      "",
      "Therefore:",
      "",
      "L𝒟(ĥ) ≤ L𝒟(h*) + 2ε.",
    ],
    body: ["This is the cleanest formal Lean proof in the project."],
  },
  {
    kicker: "Agnostic probability",
    title: "For fixed h, empirical risk concentrates.",
    type: "math",
    math: [
      "Lₛ(h) = (1/m)Σᵢ₌₁ᵐ 𝟙[h(xᵢ) ≠ yᵢ]",
      "",
      "𝔼[Lₛ(h)] = L𝒟(h)",
      "",
      "Hoeffding:",
      "",
      "ℙ(|Lₛ(h) − L𝒟(h)| > ε)",
      "  ≤ 2e^(−2mε²)",
    ],
    body: ["This concentration fact is scoped out as an assumption in Lean."],
  },
  {
    kicker: "Agnostic probability",
    title: "Union bound gives uniform convergence over ℋ.",
    type: "math",
    math: [
      "ℙ(∃h ∈ ℋ : |Lₛ(h) − L𝒟(h)| > ε)",
      "  ≤ Σ_{h∈ℋ} ℙ(|Lₛ(h) − L𝒟(h)| > ε)",
      "  ≤ Σ_{h∈ℋ} 2e^(−2mε²)",
      "  = 2|ℋ|e^(−2mε²)",
      "",
      "Therefore:",
      "",
      "ℙ(∀h ∈ ℋ : |Lₛ(h) − L𝒟(h)| ≤ ε)",
      "  ≥ 1 − 2|ℋ|e^(−2mε²)",
    ],
    body: ["Uniform convergence is the high-probability event."],
  },
  {
    kicker: "Agnostic rate",
    title: "Choose m for the agnostic guarantee.",
    type: "math",
    math: [
      "2|ℋ|e^(−2mε²) ≤ δ",
      "",
      "log(2|ℋ|) − 2mε² ≤ log δ",
      "2mε² ≥ log(2|ℋ|) + log(1/δ)",
      "",
      "m ≥ (1/(2ε²))(log(2|ℋ|) + log(1/δ))",
      "",
      "m ≥ (1/(2ε²)) log(2|ℋ|/δ)",
    ],
    body: ["The agnostic rate has 1/ε² because Hoeffding has e^(−2mε²)."],
  },
  {
    kicker: "Agnostic theorem",
    title: "Final agnostic finite-class guarantee.",
    type: "math",
    math: [
      "If",
      "  m ≥ (1/(2ε²)) log(2|ℋ|/δ),",
      "",
      "then with probability at least 1 − δ:",
      "",
      "  ∀h ∈ ℋ, |Lₛ(h) − L𝒟(h)| ≤ ε",
      "",
      "and hence",
      "",
      "  L𝒟(ĥ) ≤ L𝒟(h*) + 2ε",
      "        = min_{h∈ℋ} L𝒟(h) + 2ε.",
    ],
    body: ["The deterministic implication is proved; the probability theorem is assumed."],
  },
  {
    kicker: "Rate comparison",
    title: "Why the rates are different.",
    type: "math",
    math: [
      "Realizable:",
      "  ℙ[bad h fits all samples] ≤ e^(−mε)",
      "  m = O((log |ℋ| + log(1/δ)) / ε)",
      "",
      "Agnostic:",
      "  ℙ[|Lₛ(h) − L𝒟(h)| > ε] ≤ 2e^(−2mε²)",
      "  m = O((log |ℋ| + log(1/δ)) / ε²)",
      "",
      "Realizable: consistency.",
      "Agnostic: concentration.",
    ],
    body: ["Same finite-class union bound, different decay in ε."],
  },
  {
    kicker: "Lean target",
    title: "What is fully proved in Lean.",
    type: "math",
    math: [
      "Assume:",
      "  ∀h ∈ ℋ, |L𝒟(h) − Lₛ(h)| ≤ ε",
      "  ∀h ∈ ℋ, Lₛ(ĥ) ≤ Lₛ(h)",
      "",
      "Lean proves:",
      "",
      "  L𝒟(ĥ) ≤ L𝒟(h*) + 2ε",
      "",
      "Assumed in AssumedResults.lean:",
      "  realizable finite-class bound",
      "  agnostic uniform convergence bound",
    ],
    body: ["This is the project’s formalization boundary."],
  },

  { kicker: "Part 3", title: "MA-LoT and my adaptation", type: "divider", body: ["How the project uses a theorem-proving workflow idea without claiming to implement the full system."] },
  {
    kicker: "MA-LoT idea",
    title: "MA-LoT combines natural-language reasoning, Lean verification, and proof repair.",
    type: "flow",
    nodes: ["paper proof", "LLM attempt", "Lean verifier", "repair loop", "verified theorem"],
    body: ["I use this as inspiration for a smaller workflow inside my project."],
  },
  {
    kicker: "Scope wording",
    title: "My project is MA-LoT-inspired, not a full MA-LoT implementation.",
    type: "split",
    leftTitle: "What I do",
    left: ["Generate proof attempts.", "Check them with Lean.", "Log errors.", "Repair and simplify after verification."],
    rightTitle: "What I do not do",
    right: ["No full multi-agent system.", "No benchmark-scale automation.", "No replacement for human explanation."],
  },
  {
    kicker: "Multi-model extension",
    title: "Codex and Claude receive the same theorem prompt and generate independent Lean attempts.",
    type: "parallel",
    nodes: ["same theorem prompt", "Codex attempt", "Claude attempt", "Lean verifier", "comparison + reconciliation"],
    body: ["This follows the professor's advice: blind generation first, comparison second."],
  },
  {
    kicker: "Repair evidence",
    title: "The failed attempts are useful because Lean turns them into concrete feedback.",
    type: "cards",
    cards: [
      ["Codex failure", "Used a conjunction where one inequality was needed."],
      ["Claude failure", "Relied on omega where no usable constraints were visible."],
      ["Repair pattern", "Extract directions, add monotonicity, make arithmetic explicit."],
    ],
  },

  { kicker: "Part 4", title: "Workflow, definitions, and assumptions", type: "divider", body: ["What is in the repo, what is proved, and what is scoped out."] },
  {
    kicker: "Lean files",
    title: "The Lean project separates definitions, assumptions, realizable results, and agnostic results.",
    type: "table",
    rows: [
      ["File", "Role", "Status"],
      ["BasicDefinitions.lean", "learning vocabulary", "defined in Lean"],
      ["AssumedResults.lean", "probability boundary", "axioms/assumptions"],
      ["Realizable.lean", "realizable wrapper theorem", "uses assumption"],
      ["Agnostic.lean", "deterministic ERM theorem", "fully proved"],
    ],
  },
  {
    kicker: "Definitions",
    title: "Lean forces informal objects to become explicit definitions.",
    type: "code",
    code: "LearningProblem:\n  trueRisk : Hypothesis → Risk\n  empiricalRisk : Hypothesis → Risk\n  classMember : Hypothesis → Prop\n\nUniformConvergence P ε:\n  ∀ h, two directed inequalities",
    body: ["The proof uses abstract Nat-valued risks to focus on proof structure."],
  },
  {
    kicker: "Assumptions",
    title: "Probability-heavy results are isolated instead of hidden.",
    type: "split",
    leftTitle: "Fully proved",
    left: ["Helper lemmas.", "Deterministic agnostic ERM theorem.", "Wrappers from assumptions to conclusions."],
    rightTitle: "Assumed/scoped out",
    right: ["Hoeffding-style concentration.", "Measure-theoretic probability.", "Exact real-valued sample complexity proof."],
  },
  {
    kicker: "Understanding layer",
    title: "The presentation artifacts explain what Lean verifies.",
    type: "cards",
    cards: [
      ["Annotated proof walkthrough", "Lean line next to human explanation."],
      ["Paper vs Lean table", "Hidden assumptions become explicit."],
      ["Dependency graph", "Shows theorem dependencies and assumed probability facts."],
    ],
  },

  { kicker: "Part 5", title: "Showing the project in Visual Studio Code", type: "divider", body: ["Live demo of the theorem, the build, the comparison report, and the model-facing repair handoff."] },
  {
    kicker: "Demo step 1",
    title: "Open Agnostic.lean and show the verified deterministic theorem.",
    type: "code",
    code: "LearningTheoryProject/Agnostic.lean\n\ntheorem agnostic_erm_deterministic\n  ...\n  P.trueRisk hHat ≤ P.trueRisk hStar + (eps + eps)",
    code: "LearningTheoryProject/Agnostic.lean\n\ntheorem agnostic_erm_deterministic\n  ...\n  P.trueRisk hHat <= P.trueRisk hStar + (eps + eps)",
    body: ["Click inside the proof and point to Lean InfoView showing hypotheses and goals."],
  },
  {
    kicker: "Demo step 2",
    title: "Run the full Lean build.",
    type: "code",
    code: "lake build\n\nExpected:\nBuild completed successfully (16 jobs).",
    body: ["This verifies the whole Lean formalization, not just one file."],
  },
  {
    kicker: "Demo step 3",
    title: "Run the comparison script to show the proof-repair study is reproducible.",
    type: "code",
    code: "python multi_model_workflow/run_comparison.py\n\nOutput:\nWrote multi_model_workflow\\comparison_report.md\nWrote multi_model_workflow\\repair_recommendations_for_models.md",
    body: ["The script verifies attempts, ranks candidates, and writes both human-facing and model-facing artifacts."],
  },
  {
    kicker: "Demo step 4",
    title: "Open the comparison report and explain the reconciliation layer.",
    type: "code",
    code: "multi_model_workflow/comparison_report.md\n\nSections to show:\n- Reconciliation Ranking\n- Consensus Recommendation\n- Cross-Model Repair Suggestions",
    body: ["This is where the project compares generated Lean attempts instead of trusting one model blindly."],
  },
  {
    kicker: "Demo step 5",
    title: "Open the model-facing repair handoff.",
    type: "code",
    code: "multi_model_workflow/repair_recommendations_for_models.md\n\nUse this file as the instruction sheet for:\n- Codex repair\n- Claude repair\n- final simplification",
    body: ["This makes the professor's idea concrete: compare attempts, extract useful differences, and feed targeted repair instructions back to the models."],
  },
  {
    kicker: "Final takeaway",
    title: "The project is complete when Lean verifies the core and the explanation makes the proof understandable.",
    type: "cards",
    cards: [
      ["Formal result", "A compiling Lean project with a fully proved agnostic deterministic theorem."],
      ["Honest boundary", "Probability concentration is explicit in AssumedResults.lean."],
      ["Research layer", "MA-LoT-inspired proof repair shows where AI failed and how humans repaired it."],
    ],
  },
];

function escaped(value) {
  return JSON.stringify(value ?? "");
}

function moduleFor(s) {
  const lines = [
    'import { body, card, codeBox, colors, slideBase, thinArrow } from "./deck_helpers.mjs";',
    "",
    `export async function slide${String(s.n).padStart(2, "0")}(presentation, ctx) {`,
    "  const C = colors();",
  ];

  if (s.type === "divider") {
    lines.push(`  const slide = slideBase(presentation, ctx, ${escaped(s.kicker)}, ${escaped(s.title)});`);
    lines.push('  ctx.addShape(slide, { x: 0, y: 0, w: ctx.W, h: ctx.H, fill: C.dark });');
    lines.push('  ctx.addShape(slide, { x: 0, y: 0, w: 18, h: ctx.H, fill: C.gold });');
    lines.push(`  body(slide, ctx, ${escaped(s.kicker)}, 88, 112, 420, 30, { size: 18, color: C.gold, bold: true });`);
    lines.push(`  body(slide, ctx, ${escaped(s.title)}, 88, 210, 940, 110, { size: 47, color: "#ffffff", bold: true, face: ctx.fonts.title });`);
    lines.push(`  body(slide, ctx, ${escaped(s.body?.[0] ?? "")}, 92, 382, 850, 42, { size: 24, color: "#d8dde7" });`);
    lines.push(`  body(slide, ctx, String(ctx.slideNumber).padStart(2, "0"), 1100, 630, 60, 32, { size: 17, color: "#d8dde7", bold: true, align: "right" });`);
  } else {
    lines.push(`  const slide = slideBase(presentation, ctx, ${escaped(s.kicker)}, ${escaped(s.title)}, ${escaped(s.subtitle ?? "")});`);
    if (s.type === "title") {
      lines.push('  const steps = ["paper proof", "Lean attempt", "verifier feedback", "repair", "human explanation"];');
      lines.push('  steps.forEach((step, i) => { const y = 214 + i * 54; ctx.addShape(slide, { x: 690, y, w: 340, h: 38, fill: i === 2 ? C.paleGold : C.paleBlue, line: { style: "solid", fill: C.line, width: 1 } }); body(slide, ctx, `${i + 1}. ${step}`, 712, y + 9, 296, 18, { size: 15, color: i === 3 ? C.red : C.ink, bold: true }); if (i < steps.length - 1) thinArrow(slide, ctx, 860, y + 39, 860, y + 50, C.blue); });');
      lines.push(`  body(slide, ctx, ${escaped(s.body[0])}, 74, 252, 560, 78, { size: 24, color: C.ink, bold: true });`);
      lines.push(`  body(slide, ctx, ${escaped(s.body[2])}, 74, 532, 880, 42, { size: 31, color: C.green, bold: true, face: ctx.fonts.title });`);
    } else if (s.type === "list") {
      lines.push("  const items = " + JSON.stringify(s.body) + ";");
      lines.push('  items.forEach((item, i) => body(slide, ctx, item, 120, 222 + i * 70, 880, 38, { size: 28, color: i === 0 ? C.blue : C.ink, bold: true, face: ctx.fonts.title }));');
    } else if (s.type === "cards") {
      lines.push("  const cards = " + JSON.stringify(s.cards) + ";");
      lines.push("  const fills = [C.paleBlue, C.paleGreen, C.paleGold];");
      lines.push('  cards.forEach((c, i) => card(slide, ctx, 82 + i * 350, 236, 300, 220, c[0], c[1], { fill: fills[i % fills.length], accent: i === 1 ? C.green : i === 2 ? C.gold : C.blue, size: 18 }));');
    } else if (s.type === "flow") {
      lines.push("  const nodes = " + JSON.stringify(s.nodes) + ";");
      lines.push('  nodes.forEach((node, i) => { const x = 58 + i * 216; card(slide, ctx, x, 250, 176, 124, String(i + 1), node, { fill: i % 2 ? C.paleGold : C.paleBlue, size: 18, titleSize: 14 }); if (i < nodes.length - 1) thinArrow(slide, ctx, x + 182, 312, x + 208, 312, C.blue); });');
      lines.push(`  body(slide, ctx, ${escaped(s.body?.[0] ?? "")}, 104, 490, 920, 56, { size: 24, color: C.ink, bold: true });`);
    } else if (s.type === "split") {
      lines.push(`  card(slide, ctx, 92, 230, 440, 268, ${escaped(s.leftTitle)}, ${escaped(s.left.join("\n"))}, { fill: C.paleGreen, accent: C.green, size: 19 });`);
      lines.push(`  card(slide, ctx, 612, 230, 440, 268, ${escaped(s.rightTitle)}, ${escaped(s.right.join("\n"))}, { fill: C.paleBlue, accent: C.blue, size: 19 });`);
    } else if (s.type === "math") {
      lines.push(`  const mathLines = ${s.math.length};`);
      lines.push("  const mathHeight = Math.min(410, Math.max(260, 52 + mathLines * 25));");
      lines.push("  const mathSize = mathLines > 11 ? 17 : 19;");
      lines.push("  const lineGap = mathLines > 11 ? 24 : 28;");
      lines.push('  ctx.addShape(slide, { x: 82, y: 186, w: 980, h: mathHeight, fill: "#ffffff", line: { style: "solid", fill: C.line, width: 1 } });');
      lines.push('  ctx.addShape(slide, { x: 82, y: 186, w: 8, h: mathHeight, fill: C.blue });');
      lines.push(`  const mathText = ${JSON.stringify(s.math)};`);
      lines.push('  mathText.forEach((line, i) => {');
      lines.push('    const isHeading = line && !line.startsWith("  ") && !line.includes("≤") && !line.includes("=") && !line.includes("∈") && !line.includes("∀") && !line.includes("∃") && !line.includes("⇒") && !line.includes("ℙ") && !line.includes("Σ");');
      lines.push('    body(slide, ctx, line, 110, 208 + i * lineGap, 910, lineGap + 4, { size: isHeading ? Math.max(15, mathSize - 2) : mathSize, color: isHeading ? C.blue : C.ink, bold: isHeading, face: isHeading ? undefined : "Cambria Math" });');
      lines.push('  });');
      lines.push(`  body(slide, ctx, ${escaped(s.body?.[0] ?? "")}, 92, 224 + mathHeight, 930, 54, { size: 20, color: C.green, bold: true });`);
    } else if (s.type === "parallel") {
      lines.push(`  card(slide, ctx, 438, 204, 250, 82, "Input", ${escaped(s.nodes[0])}, { fill: C.paleBlue, accent: C.blue, size: 17, titleSize: 14 });`);
      lines.push(`  card(slide, ctx, 190, 358, 250, 96, "Codex", ${escaped(s.nodes[1])}, { fill: C.paleGold, accent: C.gold, size: 17, titleSize: 14 });`);
      lines.push(`  card(slide, ctx, 690, 358, 250, 96, "Claude", ${escaped(s.nodes[2])}, { fill: C.paleGreen, accent: C.green, size: 17, titleSize: 14 });`);
      lines.push(`  card(slide, ctx, 438, 498, 250, 82, "Verifier", ${escaped(s.nodes[3])}, { fill: C.paleRed, accent: C.red, size: 17, titleSize: 14 });`);
      lines.push(`  card(slide, ctx, 776, 498, 270, 82, "Output", ${escaped(s.nodes[4])}, { fill: "#ffffff", accent: C.blue, size: 16, titleSize: 14 });`);
      lines.push('  ctx.addShape(slide, { x: 562, y: 286, w: 2, h: 48, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 314, y: 334, w: 438, h: 2, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 314, y: 334, w: 2, h: 24, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 752, y: 334, w: 2, h: 24, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 314, y: 454, w: 2, h: 36, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 314, y: 490, w: 250, h: 2, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 752, y: 454, w: 2, h: 36, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 562, y: 490, w: 192, h: 2, fill: C.blue });');
      lines.push('  ctx.addShape(slide, { x: 688, y: 538, w: 86, h: 2, fill: C.blue });');
      lines.push(`  body(slide, ctx, ${escaped(s.body?.[0] ?? "")}, 128, 620, 920, 34, { size: 22, color: C.ink, bold: true });`);
    } else if (s.type === "code") {
      lines.push(`  const codeLines = ${escaped(s.code)}.split("\\n").length;`);
      lines.push("  const codeHeight = codeLines >= 8 ? 260 : 190;");
      lines.push("  const codeSize = codeLines >= 8 ? 17 : 20;");
      lines.push(`  codeBox(slide, ctx, 108, 228, 860, codeHeight, ${escaped(s.code)}, { size: codeSize });`);
      lines.push(`  body(slide, ctx, ${escaped(s.body?.[0] ?? "")}, 116, 268 + codeHeight, 900, 56, { size: 24, color: C.ink, bold: true });`);
    } else if (s.type === "table") {
      lines.push("  const rows = " + JSON.stringify(s.rows) + ";");
      lines.push("  const x = 76, y = 220, w = 1000;");
      lines.push("  const rowH = 64; const colW = w / rows[0].length;");
      lines.push('  rows.forEach((row, r) => { row.forEach((cell, c) => { ctx.addShape(slide, { x: x + c * colW, y: y + r * rowH, w: colW, h: rowH, fill: r === 0 ? C.dark : (r % 2 ? C.paleBlue : "#ffffff"), line: { style: "solid", fill: "#ffffff", width: 2 } }); body(slide, ctx, cell, x + c * colW + 12, y + r * rowH + 17, colW - 24, 34, { size: r === 0 ? 13 : 15, color: r === 0 ? "#ffffff" : C.ink, bold: r === 0 || c === 0 }); }); });');
    }
  }

  lines.push("  return slide;");
  lines.push("}");
  return lines.join("\n");
}

const outDir = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, "$1");
slides.forEach((slide, index) => {
  slide.n = index + 1;
});

for (const slide of slides) {
  const filename = path.join(outDir, `slide-${String(slide.n).padStart(2, "0")}.mjs`);
  fs.writeFileSync(filename, moduleFor(slide), "utf8");
}

console.log(`Wrote ${slides.length} slide modules.`);
