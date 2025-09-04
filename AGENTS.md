# Agents Guide (Monorepo)

Purpose: help code-generating agents work safely and effectively in this template.

- Boundaries: Backend code in `backend/`, Web code in `web/`, shared assets in `packages/`, ops in `ops/`, docs in `docs/`, evals in `evals/`, data in `data/`.
- 12‑factor: configuration only via env; do not hardcode secrets.
- Feature-first: add features under `backend/src/app/features/<name>` and `web/features/<name>`.
- Agentic separation: put agent logic only under `backend/src/app/agent/`.
  - Graph per workflow: use `backend/src/app/agent/graph/<workflow>/` with `state.py`, `nodes/`, and `build.py`.
  - Feature-specific workflows: put the workflow under the same `<feature>` name and invoke it from the corresponding route/service.
- CI: Python job targets `backend/`; Node job targets `web/`. Keep structure stable.

Checklists:
- Add API endpoint: create a feature slice with `routes.py`, `service.py`, `models.py`; mount router in `main.py`; write tests.
- Add agent tool/graph: put nodes/graphs under `app/agent/graph/<workflow>/` and tools under `app/agent/tools/`; define IO models; update contracts.
- Add FE feature: use `web/features/<name>`; keep API calls in `web/lib/api.ts`.
  - Diagnostics: the `/diagnostics` page demonstrates SSE subscription to `/diagnostics/stream` and a test emitter.
- Add prompt: `backend/src/app/agent/prompts/registry/*` with clear versioning.
- Logging: stdout JSON only; see README for `tee` during dev; do not log secrets.
