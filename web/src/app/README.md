This folder defines your routing surface. Folders here map to URLs.

What belongs here
- `page.tsx` per route segment
- `layout.tsx`, `loading.tsx`, `error.tsx` as needed
- `route.ts` for HTTP handlers (GET/POST/etc.)
- `actions.ts` for `'use server'` functions (tied to this route)

What does not belong here
- Reusable components, hooks, or utilities → put them in `features/<feature>` or `src/lib`

Patterns
- Feature-specific routes: `src/app/<feature>/*`
- Cross-cutting APIs: `src/app/api/<name>/route.ts`
- Co-located endpoints: prefer `src/app/<feature>/<child>/route.ts` when the URL is feature-owned (e.g., `/diagnostics/stream`)

Runtime guidance
- Prefer Node.js runtime in route handlers that access DB/SDKs:
  ```ts
  export const runtime = 'nodejs'
  ```

Thin-route example
```tsx
// src/app/example/page.tsx
// Prefer a tsconfig path alias (e.g. "@features/*": ["./features/*"]) or use a relative import
import { Example } from '../../../features/example/components/Example'

export default function Page() {
  return <Example />
}
```
