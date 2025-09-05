# Agents Guide (web/lib)

Centralize API calls and helpers to keep features/components lean.
- Use `NEXT_PUBLIC_*` env vars only on the client.
- Keep thin wrappers around fetch with consistent error handling.

API base:
- `API_BASE` is read from `NEXT_PUBLIC_API_BASE_URL` with a default of `http://localhost:8000` (see `web/lib/api.ts`).
- Prefer importing `API_BASE` instead of hardcoding URLs in features/components.
