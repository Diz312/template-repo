Application package root for the FastAPI backend.

Structure
- main.py: app factory, middleware, and router mounting
- features/: vertical slices (routes/service/models)
- agent/: agent workflows, tools, prompts (no HTTP here)
- config/: env‑backed settings and helpers
- common/: observability and utilities
- contracts/: API and agent schemas

Conventions
- Keep routes thin (I/O only). Put logic in `service.py`.
- Mount each feature router in `main.py`.
- Map domain models to API contracts at the edge (routes/services).
- Use `Settings.from_env()` for configuration; do not hardcode secrets.

Adding a feature
1) Create `features/<name>/{routes.py,service.py,models.py}`
2) Mount its router in `main.py`
3) Add tests (unit + integration)
