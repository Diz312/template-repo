Purpose: document the vertical, feature-first FE pattern and guardrails for contributors (including AI agents).

Principles
- Feature-first: domain code lives under `features/<name>` and is imported into routes under `src/app/<name>`.
- Thin routes: files in `src/app` define URLs and compose feature code; avoid embedding complex logic here.
- Server boundaries: long‑running work, secrets, and agent orchestration belong in the backend. Frontend routes call backend APIs or trigger Server Actions.
- Config via env: do not hardcode secrets. Only `NEXT_PUBLIC_*` is client-visible.

Folder responsibilities
- `src/app/<feature>`: route surface only
  - `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` for UI surface
  - `route.ts` for HTTP handlers (GET/POST/etc) when needed
  - `actions.ts` for `'use server'` functions tied to this route
- `features/<feature>`: reusable UI + logic
  - `components/` (add `'use client'` only where needed)
  - `hooks/`, `utils/`, `types/`, optional `server/` adapters
- `src/lib/`: cross‑feature helpers (e.g., `api.ts`, `sse()`)

Do / Don’t
- Do import UI from `features/*` into `src/app/*/page.tsx`
- Do place feature‑specific endpoints under `src/app/<feature>/*/route.ts`
- Do place generic endpoints under `src/app/api/*/route.ts`
- Don’t put reusable components under `src/app` (they won’t be discoverable/reusable)
- Don’t log secrets; don’t export server values to the client

Runtime & streaming
- Prefer Node.js runtime in route handlers that touch DB/SDKs: `export const runtime = 'nodejs'`
- Use `ReadableStream` (SSE) from `route.ts` for incremental updates; consume via `sse()` from `src/lib/api.ts`

Example blueprint
```
features/todos/
  components/TodoList.tsx
  hooks/useTodos.ts
src/app/todos/page.tsx        // imports features/todos/components/TodoList
src/app/todos/stream/route.ts // SSE for live updates (feature-specific)
src/app/api/health/route.ts   // cross-cutting endpoint
```

