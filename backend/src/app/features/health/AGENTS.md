# Agents Guide (feature: health)

Small example feature slice showing routes/service/models separation.
- Keep routes thin: parse inputs, call service, return models.
- Keep services pure and testable.
- Add tests under `backend/tests/unit/features/health`.
- Health remains minimal (liveness/readiness). End-to-end demo lives under `features/diagnostics`.
