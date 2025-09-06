Backend service using FastAPI. Feature‑first structure with agentic logic isolated under `src/app/agent`.

Folder layout
- src/app: application package (FastAPI app)
  - main.py: app factory + middleware and router mounting
  - features/<name>: vertical feature slices (routes/service/models)
  - agent/: agent workflows, tools, prompts (no HTTP here)
  - config/: env‑backed settings
  - common/: observability, resilience, infra helpers
  - contracts/: API and agent schemas

Feature‑first pattern
- Add a feature under `src/app/features/<name>` with:
  - routes.py: FastAPI `APIRouter` (only I/O mapping + dependency wiring)
  - service.py: business logic (pure, testable)
  - models.py: Pydantic request/response models
- Mount the router in `src/app/main.py`.
- Add tests under `backend/tests` (unit for service; integration for routes).

Agentic separation
- Graph per workflow under `src/app/agent/graph/<workflow>/` with:
  - `state.py` (typed state), `nodes/` (one file per node), `build.py` (wiring)
- Reuse nodes in `src/app/agent/graph/common/` and tools in `src/app/agent/tools/`.
- Feature routes call into the appropriate workflow entrypoint; keep agent code out of `features/`.

Contracts
- API contracts: `src/app/contracts/api/` (exposed via OpenAPI)
- Agent contracts: `src/app/contracts/agent/` (JSON Schemas for events/tool IO)
- Keep domain models separate from contracts. Map domain↔contract in routes/services.

Observability & logging
- JSON logs to stdout; no secrets in logs.
- Basic request logging middleware is set up in `main.py`.

Run locally
```bash
uv venv .venv
source .venv/bin/activate
uv pip install -e ".[dev]"
uvicorn app.main:app --reload --host ${BACKEND_HOST:-0.0.0.0} --port ${BACKEND_PORT:-8000}
```

Adding a new feature (checklist)
- Create `src/app/features/<name>/{routes.py,service.py,models.py}`
- Mount router in `main.py`
- Add unit test(s) and integration test(s)
- Document the endpoints and contracts
