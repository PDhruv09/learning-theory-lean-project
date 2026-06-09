from __future__ import annotations

import hashlib
import os
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "multi_model_workflow" / "comparison_report.md"
HANDOFF_PATH = ROOT / "multi_model_workflow" / "repair_recommendations_for_models.md"


FILES = [
    ("Codex", "Blind attempt", "generated_proofs/codex/agnostic_attempt_1.lean"),
    ("Codex", "Repaired attempt", "generated_proofs/codex/agnostic_attempt_2_repaired.lean"),
    ("Codex", "Simplified attempt", "generated_proofs/codex/simplified_attempt.lean"),
    ("Claude", "Blind attempt", "generated_proofs/claude/agnostic_attempt_1.lean"),
    ("Claude", "Repaired attempt", "generated_proofs/claude/agnostic_attempt_2_repaired.lean"),
    ("Claude", "Simplified attempt", "generated_proofs/claude/simplified_attempt.lean"),
]


@dataclass
class ComparisonRow:
    model: str
    stage: str
    path: str
    compiles: bool
    exit_code: int
    output: str
    lines: int
    sha_prefix: str
    uses_calc: bool
    uses_omega: bool
    uses_add_right: bool
    uses_assoc: bool
    calls_main_theorem: bool
    extracts_conjunction: bool

    @property
    def score(self) -> int:
        """Heuristic score for ranking verified proof candidates."""
        if not self.compiles:
            return 0
        value = 50
        if self.uses_calc:
            value += 15
        if self.uses_add_right:
            value += 10
        if self.uses_assoc:
            value += 10
        if self.extracts_conjunction:
            value += 5
        if self.calls_main_theorem:
            value += 15
        if self.uses_omega:
            value -= 20
        if self.lines <= 20:
            value += 10
        elif self.lines <= 28:
            value += 5
        elif self.lines >= 36:
            value -= 5
        return value


def lake_command() -> str:
    winget_lake = (
        Path(os.environ.get("LOCALAPPDATA", ""))
        / "Microsoft"
        / "WinGet"
        / "Packages"
        / "Lean.Lean_Microsoft.Winget.Source_8wekyb3d8bbwe"
        / "lean-4.29.1-windows"
        / "bin"
        / "lake.exe"
    )
    if winget_lake.exists():
        return str(winget_lake)
    return "lake"


def strip_comments(text: str) -> str:
    without_block_comments = re.sub(r"/-!?.*?-/", "", text, flags=re.DOTALL)
    lines = []
    for line in without_block_comments.splitlines():
        stripped = line.strip()
        if stripped.startswith("--"):
            continue
        lines.append(line)
    return "\n".join(lines)


def sha_prefix(path: Path) -> str:
    digest = hashlib.sha256(path.read_bytes()).hexdigest().upper()
    return digest[:12]


def verify_lean_file(lake: str, path: str) -> tuple[bool, int, str]:
    completed = subprocess.run(
        [lake, "env", "lean", path],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    output = completed.stdout.strip()
    return completed.returncode == 0, completed.returncode, output


def compare_file(lake: str, model: str, stage: str, rel_path: str) -> ComparisonRow:
    path = ROOT / rel_path
    text = path.read_text(encoding="utf-8")
    code = strip_comments(text)
    compiles, exit_code, output = verify_lean_file(lake, rel_path)

    return ComparisonRow(
        model=model,
        stage=stage,
        path=rel_path,
        compiles=compiles,
        exit_code=exit_code,
        output=output,
        lines=len(text.splitlines()),
        sha_prefix=sha_prefix(path),
        uses_calc="calc" in code,
        uses_omega="omega" in code,
        uses_add_right="Nat.add_le_add_right" in code,
        uses_assoc="Nat.add_assoc" in code,
        calls_main_theorem="agnostic_erm_deterministic P" in code,
        extracts_conjunction=(".left" in code or ".right" in code),
    )


def yes_no(value: bool) -> str:
    return "Yes" if value else "No"


def true_false(value: bool) -> str:
    return "True" if value else "False"


def recommendation_reason(row: ComparisonRow) -> str:
    if not row.compiles:
        if row.uses_omega:
            return "Fails; automation cannot see the abstract inequalities."
        if not row.extracts_conjunction:
            return "Fails; missing a uniform-convergence direction or arithmetic lift."
        return "Fails Lean verification."

    strengths: list[str] = []
    if row.calls_main_theorem:
        strengths.append("short verified refactor")
    if row.uses_calc:
        strengths.append("readable inequality chain")
    if row.uses_add_right and row.uses_assoc:
        strengths.append("explicit Nat arithmetic")
    if row.extracts_conjunction:
        strengths.append("explicit UC directions")
    if not strengths:
        strengths.append("compiles")
    return "; ".join(strengths)


def build_report(rows: list[ComparisonRow]) -> str:
    report: list[str] = []
    report.append("# Generated Proof Comparison Report")
    report.append("")
    report.append("Generated by `multi_model_workflow/run_comparison.py`.")
    report.append("")
    report.append("## Verification Summary")
    report.append("")
    report.append("| Model | Stage | File | Compiles? | Exit | Lines | SHA256 prefix |")
    report.append("| --- | --- | --- | --- | --- | ---: | --- |")
    for row in rows:
        report.append(
            f"| {row.model} | {row.stage} | `{row.path}` | "
            f"{yes_no(row.compiles)} | {row.exit_code} | {row.lines} | `{row.sha_prefix}` |"
        )

    report.append("")
    report.append("## Structural Feature Comparison")
    report.append("")
    report.append(
        "| Model | Stage | calc | omega | add_right | assoc | "
        "calls main theorem | extracts conjunction |"
    )
    report.append("| --- | --- | --- | --- | --- | --- | --- | --- |")
    for row in rows:
        report.append(
            f"| {row.model} | {row.stage} | {true_false(row.uses_calc)} | "
            f"{true_false(row.uses_omega)} | {true_false(row.uses_add_right)} | "
            f"{true_false(row.uses_assoc)} | {true_false(row.calls_main_theorem)} | "
            f"{true_false(row.extracts_conjunction)} |"
        )

    report.append("")
    report.append("## Failure Outputs")
    report.append("")
    for row in rows:
        if row.compiles:
            continue
        report.append(f"### {row.model} - {row.stage}")
        report.append("")
        report.append("```text")
        report.append(row.output if row.output else "(no output)")
        report.append("```")
        report.append("")

    report.append("## Reconciliation Ranking")
    report.append("")
    report.append("| Model | Stage | Compiles? | Score | Main reason |")
    report.append("| --- | --- | --- | ---: | --- |")
    for row in sorted(rows, key=lambda item: item.score, reverse=True):
        report.append(
            f"| {row.model} | {row.stage} | {yes_no(row.compiles)} | "
            f"{row.score} | {recommendation_reason(row)} |"
        )

    repaired = [row for row in rows if row.stage == "Repaired attempt" and row.compiles]
    simplified = [row for row in rows if row.stage == "Simplified attempt" and row.compiles]
    best_repaired = max(repaired, key=lambda item: item.score) if repaired else None
    best_simplified = max(simplified, key=lambda item: item.score) if simplified else None

    report.append("")
    report.append("## Consensus Recommendation")
    report.append("")
    if best_repaired:
        report.append(
            f"- Best explanatory repaired proof: `{best_repaired.path}` "
            f"({best_repaired.model}, score {best_repaired.score})."
        )
    if best_simplified:
        report.append(
            f"- Best verified simplification/refactor: `{best_simplified.path}` "
            f"({best_simplified.model}, score {best_simplified.score})."
        )
    report.append(
        "- Use a repaired proof for explanation, because it exposes the proof steps."
    )
    report.append(
        "- Use a simplified proof only after the main theorem is verified, because direct theorem calls can hide the reasoning."
    )

    report.append("")
    report.append("## Cross-Model Repair Suggestions")
    report.append("")
    report.append(
        "- Codex blind attempt should borrow Claude's explicit extraction of uniform-convergence directions with `.left` and `.right`."
    )
    report.append(
        "- Claude blind attempt should borrow Codex's explicit arithmetic repair strategy: `Nat.add_le_add_right` and `Nat.add_assoc` instead of `omega`."
    )
    report.append(
        "- The reconciled proof should keep the readable `calc` chain, show the three mathematical inequalities, and use automation only after the proof structure is clear."
    )

    report.append("## Interpretation")
    report.append("")
    report.append(
        "- Blind attempts are allowed to fail; their failures are the verifier feedback used for repair."
    )
    report.append(
        "- Repaired and simplified attempts must compile before they are treated as verified artifacts."
    )
    report.append(
        "- Hashes and line counts catch exact-file differences; structural features capture proof-strategy differences."
    )
    report.append(
        "- Semantic equivalence is approximated here by matching theorem type plus successful Lean verification."
    )
    report.append(
        f"- Model-facing repair instructions are generated separately in `{HANDOFF_PATH.relative_to(ROOT)}`."
    )
    report.append("")
    return "\n".join(report)


def build_model_handoff(rows: list[ComparisonRow]) -> str:
    repaired = [row for row in rows if row.stage == "Repaired attempt" and row.compiles]
    simplified = [row for row in rows if row.stage == "Simplified attempt" and row.compiles]
    best_repaired = max(repaired, key=lambda item: item.score) if repaired else None
    best_simplified = max(simplified, key=lambda item: item.score) if simplified else None

    lines: list[str] = []
    lines.append("# Repair Recommendations For Codex And Claude")
    lines.append("")
    lines.append("Use this file as the model-facing handoff after running `multi_model_workflow/run_comparison.py`.")
    lines.append("")
    lines.append("## Verified Reference Points")
    lines.append("")
    if best_repaired:
        lines.append(f"- Best explanatory repaired proof: `{best_repaired.path}`.")
    if best_simplified:
        lines.append(f"- Best verified simplification/refactor: `{best_simplified.path}`.")
    lines.append("- The final project theorem remains the source of truth: `LearningTheoryProject/Agnostic.lean`.")
    lines.append("")
    lines.append("## Instructions For Codex")
    lines.append("")
    lines.append("- Repair the blind attempt by explicitly extracting the needed uniform-convergence direction.")
    lines.append("- Use `.left` for `P.trueRisk h <= P.empiricalRisk h + eps`.")
    lines.append("- Use `.right` for `P.empiricalRisk h <= P.trueRisk h + eps`.")
    lines.append("- When adding the same `eps` to both sides, use `Nat.add_le_add_right`.")
    lines.append("- Finish associativity with `Nat.add_assoc`.")
    lines.append("- Prefer a readable `calc` chain over a compressed proof.")
    lines.append("")
    lines.append("## Instructions For Claude")
    lines.append("")
    lines.append("- Do not rely on `omega` for this proof; the risks are abstract Nat-valued functions.")
    lines.append("- Borrow Codex's explicit arithmetic repair pattern:")
    lines.append("  - `Nat.add_le_add_right h eps`")
    lines.append("  - `Nat.add_assoc _ _ _`")
    lines.append("- Keep Claude's useful `.left` / `.right` extraction of uniform convergence.")
    lines.append("- Keep a readable `calc` chain that mirrors the paper proof.")
    lines.append("")
    lines.append("## Reconciled Proof Strategy")
    lines.append("")
    lines.append("The final proof should combine both models' useful ideas:")
    lines.append("")
    lines.append("1. Apply uniform convergence to `hHat`.")
    lines.append("2. Use ERM to compare `hHat` with `hStar`.")
    lines.append("3. Apply uniform convergence to `hStar`.")
    lines.append("4. Use `Nat.add_le_add_right` for adding `eps` to inequalities.")
    lines.append("5. Use `Nat.add_assoc` for the final arithmetic shape.")
    lines.append("6. Avoid hiding the proof behind automation until the explanatory proof is verified.")
    lines.append("")
    lines.append("## Simplification Rule")
    lines.append("")
    lines.append("Only simplify after Lean verification passes. A direct call to `agnostic_erm_deterministic` is acceptable as a refactor, but the explanatory proof should remain available for presentation.")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    lake = lake_command()
    rows = [compare_file(lake, model, stage, path) for model, stage, path in FILES]
    OUTPUT_PATH.write_text(build_report(rows), encoding="utf-8")
    HANDOFF_PATH.write_text(build_model_handoff(rows), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"Wrote {HANDOFF_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
