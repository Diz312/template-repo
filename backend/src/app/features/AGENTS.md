Contributor rules for `features/`:

- Scope: HTTP adapters (`routes.py`), business logic (`service.py`), and `models.py`.
- Separation: do not put agent code here. Call into `src/app/agent` workflows from services if needed.
- Testing: unit test `service.py`; integration test `routes.py`.
- Config: use `Settings` injection; avoid global env access.
- Logging: JSON logs only; no secrets or PII.

Checklist for a new feature
- [ ] Create `features/<name>/{routes.py,service.py,models.py}`
- [ ] Mount router in `src/app/main.py`
- [ ] Add tests under `backend/tests`
- [ ] Update contracts in `src/app/contracts/api/` if applicable
