# Agents Guide (app package)

Non-agentic application package. Keep vertical features under `features/` and agent logic under `agent/`.

Structure
- features/: vertical slices (`routes.py`, `service.py`, `models.py`)
- config/: env‑backed settings
- common/: observability, resilience helpers
- agent/: graphs, tools, prompts, observability (no HTTP here)

Guidelines
- routes: thin controllers; map HTTP to services.
- services: business logic; keep pure where possible.
- models: Pydantic v2; strict validation; no side effects.
- Inject `Settings` for config; avoid reaching into `os.environ` inside services.
- Mount routers in `main.py`; avoid ad‑hoc global state.

Example blueprint
```
features/todos/
  routes.py   # APIRouter, binds endpoints to service
  service.py  # business logic
  models.py   # Pydantic request/response
```
