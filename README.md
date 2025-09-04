# Full-Stack Agentic App Template (Python + LangGraph + Next.js)

This GitHub Template bootstraps a production-minded monorepo for building full‑stack, 12‑factor, agentic applications using Python (FastAPI, optional LangGraph) and Next.js.

Focus: crawl → walk → run. Start POCs quickly, grow to production with clear seams, feature-first organization, and agent-friendly guidance.

## Repository Structure

- `backend/`: FastAPI backend with a single top-level package `app/` and a nested `app/agent/` for agentic code.
  - `src/app/main.py`: ASGI app factory; mounts feature routers.
  - `src/app/config/settings.py`: env-based settings ( 12‑factor ).
  - `src/app/common/observability/`: JSON logging to stdout; request correlation.
  - `src/app/features/health/`: first feature slice (routes/service/models).
  - `src/app/agent/`: agentic code only (graph, tools, memory, retrieval, messaging, contracts, observability).
  - `tests/`: unit/integration tests.
- `web/`: Next.js App Router app (TypeScript, strict) organized by features.
  - `app/`: routes; `features/`: vertical slices; `lib/`: API helpers; `components/` (and `components/ui` for shared UI).
- `packages/`: reserved for future shared packages (empty by default).
  - Schemas and prompts have been relocated into the backend:
    - Contracts (schemas): `backend/src/app/contracts/{api,agent}`
    - Prompts: `backend/src/app/agent/prompts/registry`
  - UI components now live under the web app: `web/components/ui`
- `ops/`: Docker Compose and operational scripts for local dev.
- `docs/`: architecture notes and ADRs.
- `evals/`: offline eval harness, tasks, and golden traces.
- `data/`: sample fixtures and input data for local/dev and tests.
- `log/`: committed folder for local log capture; contents ignored.
- `.github/workflows/`: CI for backend/web and a tag-based release flow.

See `AGENTS.md` (root and subfolders) for agent-focused coding guidelines. Agent workflow guidance:
- Graph per workflow: `backend/src/app/agent/graph/<workflow>/` with `state.py`, `nodes/`, `build.py`.
- Cross-workflow reuse: `backend/src/app/agent/graph/common/` for generic nodes; `backend/src/app/agent/tools/` for tools.
- Feature-specific workflows: feature routes call the matching workflow entrypoint.

## Getting Started

Prerequisites: Python 3.12+, Node.js 20+, uv (`pip install uv`) and Docker (optional).

1) Backend
- `cd backend`
- `uv venv .venv && source .venv/bin/activate`
- `uv pip install -e ".[dev]"`
- `uvicorn app.main:app --reload --host ${BACKEND_HOST:-0.0.0.0} --port ${BACKEND_PORT:-8000}`

2) Web
- `cd web`
- `npm install`
- `npm run dev`

4) Diagnostics (end-to-end smoke)
- Visit http://localhost:3000/diagnostics to see the live SSE stream.
- Click "Emit test event" to POST to `/diagnostics/emit` and see events flow.

3) Environment
- Copy `.env.example` to `.env` at repo root and adjust values as needed.

## Logging (12‑factor friendly)
- All logs are emitted as JSON to stdout.
- During development, capture to local files via tee while still writing to stdout:
  - Backend: `uvicorn app.main:app --reload 2>&1 | tee -a log/backend-dev.log`
  - Web: `npm run dev 2>&1 | tee -a log/web-dev.log`
- The `log/` folder is committed but the contents are ignored (see `.gitignore`).

## CI & Releases
- CI runs on PRs to `main`:
  - Python: lint (ruff), tests (pytest), build wheel/sdist in `backend/`.
  - Node/Next: install, lint, typecheck, build in `web/`.
- Releases: push a tag like `v0.1.0` (must match `VERSION`). A release workflow validates tag vs `VERSION` and publishes build artifacts.

## Crawl → Walk → Run
- Crawl: `health` feature, basic JSON logging, minimal web app. LangGraph dependency commented.
- Walk: add first `app/agent/graph` and `tools` with typed IO; add SSE streaming endpoint and a simple agent‑timeline UI.
- Run: observability expansion, messaging if needed, resilience policies, versioned contracts (`v1`, `v2`), infra adapters.

## Conventions
- Feature-first: group code by feature (routes/service/models) instead of large global folders.
- 12‑factor: no hardcoded secrets; everything via env.
- Tests first for new services and agent nodes; keep routes thin.
- Prefer SSE for agent progress streaming; WebSocket optional later.

## Architecture Diagram

```mermaid
flowchart TD
  A[ASGI Entry\napp.main:app] --> B[Settings.from_env\nconfig/settings.py]
  A --> C[setup_logging\ncommon/observability/logging.py\n(JSON to stdout)]
  A --> D[Mount Routers]
  D --> H[features/health/routes.py]
  D --> I[features/diagnostics/routes.py\nSSE /diagnostics/stream]
  I --> J[agent/observability/emitter\nInProcessEventEmitter]
  J --> K[AgentEvent\ncontracts/agent/*.json]
  K --> L[web/scripts/generate-types.mjs\n(openapi + schemas -> web/types)]
  B <-- .env/.env.example --> E[Environment]
  C --> M[stdout] --> N[tee -> log/*.log\n(dev only)]
  H --> S[service.py & models.py]
  subgraph Backend
    A
    B
    C
    D
    H
    I
    J
    K
  end
  subgraph Frontend
    L
  end
```

## Using This Template
- Click “Use this template” to make a new repo.
- Update `README.md`, `VERSION`, and `.env`.
- Keep AGENTS.md guides up to date as you grow features and agents.
