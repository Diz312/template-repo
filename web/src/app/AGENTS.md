Routes are thin. Use them to wire URLs to feature code and to define server boundaries.

Routing
- Each folder under `src/app` maps to a path segment.
- Add `page.tsx` for UI pages, `route.ts` for endpoints, and `actions.ts` for `'use server'` functions co-located with the page that uses them.

Composition
- Import UI and logic from `features/<feature>`.
- Keep pages small and declarative; avoid heavy logic in `src/app` to prevent client bundle bloat and tight coupling to route structure.

APIs
- Use `/api/*` for generic endpoints.
- Put feature-specific endpoints under the feature path (e.g., `src/app/diagnostics/stream/route.ts`).

Security & env
- Never leak secrets to the client. Only `NEXT_PUBLIC_*` vars are safe in browser code.
- Prefer Node.js runtime for server integration: `export const runtime = 'nodejs'` in route handlers.

Streaming
- For long-running operations, stream responses (SSE) from `route.ts` and consume with the `sse()` helper in `src/lib/api.ts`.
