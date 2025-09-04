# Agents Guide (app package)

Non-agentic backend package. Keep vertical features under `features/`.

- routes: thin controllers; map HTTP to services.
- services: business logic; keep pure where possible.
- models: Pydantic v2; strict validation; no side effects.
- common: observability/policies/resilience/infra helpers shared across features.
- agent: reserved for agentic logic (LangGraph, tools, memory, retrieval, messaging, contracts, observability).

