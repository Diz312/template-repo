# Agents Guide (backend)

Principles
- Feature‑first: domain code under `src/app/features/<name>`; agent code under `src/app/agent` only.
- Thin routes: `routes.py` adapts HTTP ↔ service; logic lives in `service.py`.
- 12‑factor config: environment‑only via `src/app/config/settings.py`; never hardcode secrets.
- JSON logs to stdout; avoid logging secrets or PII.

Folder responsibilities
- `src/app/features/<name>`: vertical slice
  - `routes.py`: APIRouter; I/O validation; DI
  - `service.py`: core logic (pure, testable)
  - `models.py`: Pydantic request/response models
- `src/app/agent`: agent workflows & tools
  - `graph/<workflow>/{state.py,nodes/,build.py}`
  - `tools/`, `prompts/`, `observability/`
- `src/app/contracts`: API and agent schemas
- `src/app/common`: observability, utils

Do / Don’t
- Do mount routers in `main.py` and keep middleware centralized
- Do map domain models to contracts at the edge
- Don’t put agent code in `features/*`
- Don’t access env/config directly in tests; inject `Settings`

Checklists
- New feature
  - [ ] Create `features/<name>/{routes.py,service.py,models.py}`
  - [ ] Mount router in `main.py`
  - [ ] Unit tests for `service.py`; integration tests for `routes.py`
  - [ ] Define/align API contracts in `contracts/api`
- New agent workflow
  - [ ] Create `agent/graph/<workflow>/{state.py,nodes/,build.py}`
  - [ ] Define tool IO/contracts; version schemas
  - [ ] Add tests for nodes and critical paths
  - [ ] Provide a thin feature route that invokes the workflow
