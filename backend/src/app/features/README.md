Features live here as vertical slices. Each feature exposes an APIRouter, a service layer, and Pydantic models.

Recommended layout for feature `x`
```
src/app/features/x/
  routes.py   # APIRouter (HTTP ↔ service mapping)
  service.py  # business logic (pure, testable)
  models.py   # Pydantic request/response types
  README.md   # optional feature docs
```

Conventions
- Keep `routes.py` thin; validate inputs and call `service`.
- Map domain models to API contracts close to the edge.
- Inject `Settings` for configuration.
- Add unit tests (service) and integration tests (routes).
