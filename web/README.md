Web app for this monorepo. Uses Next.js App Router, TypeScript, ESLint, Tailwind 4, and Turbopack.

Folder layout (feature-first)
- src/app: routing surface. Folders here map to URLs. Keep files thin (page.tsx, layout.tsx, route.ts, actions.ts) and import feature code.
- features: reusable feature slices (components, hooks, utils). No routing inside this folder.
- src/lib: shared helpers (e.g., API wrapper, SSE helper).
- public: static assets served from root (e.g., public/file.svg → /file.svg).

Deafult route in this template - for heatlh check only 
- GET /api/health → src/app/health/route.ts

Conventions
- Put pages/route handlers under src/app/<feature>/... and import UI/logic from features/<feature>/...
- Use /api/* for cross‑cutting endpoints; co‑locate endpoints under a feature path if they’re feature-specific.
- Prefer Node.js runtime for server work in route handlers: export const runtime = 'nodejs'
- Keep secrets/config in env; only expose NEXT_PUBLIC_* to the client.

Getting started
```bash
cd web
npm run dev
```
Open http://localhost:3000

Where to add new features
1) Create feature code under features/<your-feature> (components, hooks, utils).
2) Expose a route: add src/app/<your-feature>/page.tsx or src/app/<your-feature>/<child>/route.ts and import from features/<your-feature>.

Docs for contributors
- Read web/AGENTS.md for guardrails and best practices.
