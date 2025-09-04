# Backend

FastAPI backend with `src/app` package and `app/agent` for agentic code.

Agent workflows:
- Graph per workflow under `src/app/agent/graph/<workflow>/`.
  - Inside each workflow: `state.py` (typed state), `nodes/` (one file per non-trivial node), and `build.py` to wire nodes + edges.
- Cross-workflow reuse: place reusable nodes under `src/app/agent/graph/common/` and tools under `src/app/agent/tools/`.
- Feature-specific workflows: the HTTP feature calls into its matching workflow entrypoint in `build.py`.

Contracts:
- HTTP contracts live under `src/app/contracts/api/` (OpenAPI-driven).
- Agent contracts live under `src/app/contracts/agent/` (JSON Schemas for SSE events, tool IO).

Diagnostics (end-to-end smoke):
- SSE: `GET /diagnostics/stream`
- Emit test event: `POST /diagnostics/emit?message=...`

Run locally:

```
uv venv .venv
source .venv/bin/activate
uv pip install -e ".[dev]"
uvicorn app.main:app --reload --host ${BACKEND_HOST:-0.0.0.0} --port ${BACKEND_PORT:-8000}
```
