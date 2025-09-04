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

Checklist:
- Keep server/client boundaries explicit ("use client").
- Call backend via `lib/api.ts`; avoid duplicating base URLs.
- Build accessible, testable components; minimal client state unless needed.
