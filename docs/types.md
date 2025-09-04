# Frontend Type Generation

This template keeps a single source of truth for IO contracts in the backend and generates frontend types.

- API: FastAPI exposes `/openapi.json`. Generate types into `web/types/openapi.d.ts`:
  - `cd web && npm run types:openapi`
- Agent: JSON Schemas under `backend/src/app/contracts/agent/`. Generate types into `web/types/*.d.ts`:
  - `cd web && npm run types:agent`
- All: `cd web && npm run types:all`

Note: These commands require `openapi-typescript` and `json-schema-to-typescript` which are included as devDependencies in the web app.

