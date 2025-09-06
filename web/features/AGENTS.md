Contributor rules for `features/` (UI + logic slices):

- Scope: Only reusable domain code (components, hooks, utils). No routing files here.
- Client vs server: Add `'use client'` only to leaf components that require it (event handlers, state, effects). Keep most code server-compatible.
- Imports: Do not import from `src/app`. Routes depend on features, not vice versa.
- Env: Never access secrets directly. If necessary, define server adapters and call them from route handlers or Server Actions.

Checklist for a new feature
- [ ] Create `features/<name>/components`, `hooks`, `utils` as needed
- [ ] Expose a page at `src/app/<name>/page.tsx` that imports your feature UI
- [ ] Add endpoints under `src/app/<name>/**/route.ts` if feature-specific
- [ ] Add tests/docs under this folder (optional)
