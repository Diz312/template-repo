Feature code lives here. Organize by domain feature and import into routes under `src/app/<feature>`.

Goals
- Keep `src/app` thin and declarative (routing/UI entrypoints only)
- Make components/hooks reusable across routes
- Enable vertical slices without coupling domain logic to URL structure

Recommended structure per feature `X`
```
features/x/
  components/        # UI (mark leaf files with 'use client' when needed)
  hooks/             # React hooks
  utils/             # Pure utilities
  types/             # Type definitions
  README.md          # Feature docs (optional)
```

Usage from a route page
```tsx
// src/app/x/page.tsx
// Prefer a tsconfig path alias (e.g. "@features/*": ["./features/*"]) or use a relative import
import { TodoList } from '../../../features/x/components/TodoList'

export default function Page() {
  return <TodoList />
}
```

Notes
- Avoid importing files from `src/app` into `features/*`. Keep dependency direction one-way to preserve reusability and testability.
