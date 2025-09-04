# Agents Guide (backend)

You are working in the FastAPI backend. Keep non-agentic code under `src/app/` and agentic code under `src/app/agent/`.

- Features: vertical slices under `src/app/features/<name>` with `routes.py`, `service.py`, `models.py`.
- Config: env-backed settings in `src/app/config/settings.py`; no hard-coded values.
- Observability: use JSON logs to stdout via `common/observability/logging.py`.
- Agentic code: graphs/tools/memory/retrieval/messaging/contracts under `src/app/agent/` only.
  - Graph per workflow: `src/app/agent/graph/<workflow>/` with `state.py`, `nodes/`, `build.py`.
  - Cross-workflow reuse: `src/app/agent/graph/common/` for generic nodes; tools under `src/app/agent/tools/`.
  - Feature-specific workflows: feature routes/services invoke the matching workflow entry.
- Tests: unit under `backend/tests/unit`, integration under `backend/tests/integration`.

Checklist before adding a feature:
- Define or reuse input/output models.
- Write a unit test for the service/graph node.
- Add route only as a thin adapter.
- Validate errors and unhappy paths.
