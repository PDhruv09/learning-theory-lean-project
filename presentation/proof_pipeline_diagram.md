# Proof Pipeline Diagram

```mermaid
flowchart TD
  A["English theorem prompt"] --> B["Codex proof attempt"]
  A --> C["Claude proof attempt"]
  B --> D["Lean verifier"]
  C --> E["Lean verifier"]
  D --> F["Codex errors/logs"]
  E --> G["Claude errors/logs"]
  F --> H["Codex repair loop"]
  G --> I["Claude repair loop"]
  H --> J["Comparison and reconciliation"]
  I --> J
  J --> K["Final verified Lean proof"]
  K --> L["Simplification/refactoring"]
  L --> M["lake build verifier"]
  M --> N["Human-readable explanation"]
```

## Presentation Point

The key research idea is that Lean acts as the verifier for both generation and simplification. Without the verifier, simplification can silently remove necessary assumptions or change theorem meaning.
