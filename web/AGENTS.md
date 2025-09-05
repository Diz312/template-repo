# Agents Guide (web)

Next.js App Router application.

- routes: `web/app/*`
- features: `web/features/<name>` vertical slices
- lib: `web/lib/*` API helpers
- components: shared presentation components (shared UI under `components/ui`)
- Env: only access `NEXT_PUBLIC_*` on the client

Types and contracts:
- Generate API types from backend OpenAPI: `npm run types:openapi`.
- Generate agent schema types from JSON Schemas: `npm run types:agent`.

Diagnostics page:
- `/diagnostics` subscribes to `GET /diagnostics/stream` via EventSource and offers a test emitter button.

Path aliases:
- Use `@/*` to import from the app root (configured in `tsconfig.json`).
  - Example: `import Viewer from "@/features/agent-timeline/Viewer"`.
  - If you edit `tsconfig.json`, restart the dev server to pick up changes.

API base URL:
- Backend base comes from `NEXT_PUBLIC_API_BASE_URL` (see `web/lib/api.ts`).
- Default is `http://localhost:8000`. Override by creating `web/.env.local`:
  - `NEXT_PUBLIC_API_BASE_URL=http://localhost:8001`

Checklist:
- Keep server/client boundaries explicit ("use client").
- Call backend via `lib/api.ts`; avoid duplicating base URLs.
- Build accessible, testable components; minimal client state unless needed.
