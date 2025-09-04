# Agents Guide (contracts)

Unify IO boundary definitions here.

- `api/`: HTTP request/response contracts exposed via FastAPI (OpenAPI). Frontend types are generated from `/openapi.json`.
- `agent/`: Contracts for agent message/event schemas (e.g., SSE events) and tool IO. Frontend types are generated from JSON Schemas.

Guidance:
- Keep domain models separate from contracts. Map domain→contract in routes/services.
- Version carefully (`v1`, `v2`) to avoid breaking changes.
- Don’t duplicate the same schema in multiple places.

