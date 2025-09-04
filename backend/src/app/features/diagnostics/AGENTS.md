# Agents Guide (feature: diagnostics)

Diagnostics is an end-to-end smoke feature to validate wiring:
- SSE stream at `/diagnostics/stream`.
- Emit endpoint at `/diagnostics/emit` (demo/testing only).

Use this feature to verify:
- JSON logging, routing, and middleware.
- Agent event emission path via `agent/observability/emitter`.
- Frontend SSE subscription workflow.

