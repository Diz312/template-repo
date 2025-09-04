# Architecture

This template follows a feature-first structure and separates agentic logic clearly under `app/agent/` to enable crawl → walk → run growth.

- Crawl: minimal health feature, JSON logging to stdout, no infra deps.
- Walk: introduce LangGraph nodes/tools under `app/agent/`, add SSE streaming and a basic agent timeline in `web/`.
- Run: add observability depth, messaging, resilience policies, and versioned contracts.

