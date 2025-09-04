# Agents Guide (agent)

Agentic logic only. Keep graphs and tools typed and testable.

- Graph per workflow: create `graph/<workflow>/` with:
  - `state.py`: typed state (Pydantic/dataclass)
  - `nodes/`: one file per non-trivial node
  - `build.py`: wire nodes and edges/routing
- Cross-workflow reuse: put generic nodes in `graph/common/`; tools live in `tools/`.
- Feature-specific workflows: create the workflow under `<feature>` and invoke from the corresponding HTTP feature slice.
- Tools: typed Pydantic IO; validate; safe to retry when possible.
- Memory/Retrieval: swappable adapters; explicit parameters.
- Messaging: SSE/WebSocket or pub-sub adapters.
- Contracts: version schemas (`v1`, `v2`); no breaking changes.
- Observability: agent events, token/cost tracking, and streaming emitter.
