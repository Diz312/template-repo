# AppDev Key Concepts

## 12-Factor App
**Definition**: A methodology for building scalable, maintainable, cloud-native apps.  
**Why it matters**: Keeps even POCs “future-ready” so they can graduate into production.  

### The 12 Factors

1. **Codebase** – One codebase tracked in version control, many deploys.  
   *Example*: One Git repo per microservice, multiple environments (dev, staging, prod).

2. **Dependencies** – Explicitly declare and isolate dependencies.  
   *Example*: Use `requirements.txt` or `pyproject.toml` for Python dependencies.

3. **Config** – Store config in environment variables, not in code.  
   *Example*: `REDIS_URL` set via `.env`, not hardcoded.

4. **Backing services** – Treat external services as attached resources.  
   *Example*: Redis, Postgres, or S3 should be swappable with minimal config changes.

5. **Build, release, run** – Strictly separate build, release, and run stages.  
   *Example*: CI/CD builds Docker images (build), tags/releases them (release), deploys containers (run).

6. **Processes** – Execute app as one or more stateless processes.  
   *Example*: No session state stored in local memory; use Redis or DB.

7. **Port binding** – Export services via port binding.  
   *Example*: FastAPI app listens on `$PORT` without needing Apache/Nginx baked in.

8. **Concurrency** – Scale out via process model.  
   *Example*: Run multiple worker processes with Gunicorn/Uvicorn.

9. **Disposability** – Fast startup and graceful shutdown.  
   *Example*: Containers spin up quickly, handle `SIGTERM`, and exit cleanly.

10. **Dev/prod parity** – Keep development, staging, production as similar as possible.  
   *Example*: Use Docker Compose locally to mirror production setup.

11. **Logs** – Treat logs as event streams.  
   *Example*: Log to stdout/stderr, let Kubernetes/ELK stack handle storage/aggregation.

12. **Admin processes** – Run admin/management tasks as one-off processes.  
   *Example*: Database migrations run as `python manage.py migrate`, not baked into long-running service.

## Data Contracts (Protocols)
**Definition**: Typed, minimal interfaces that adapters implement, using Python `Protocol` to enable pluggable backends without tight coupling.  
**Why it matters**: Keeps storage/LLM choices swappable across environments and over time.  

- **GraphStore**: `load_turtle(turtle_text, graph_iri?)`, `upsert_jsonld(graph_json)`, `query_sparql(query) -> rows`, `get_subgraph(ids, depth)`.  
  Interfaces RDF operations; start with rdflib (in-memory), later swap to GraphDB.
- **VectorIndex**: `upsert([{id, vector, metadata?}])`, `search(vector, k, filter?) -> [{id, score, metadata}]`.  
  Shields the app from vendor-specific vector DB APIs.
- **Embedder**: `embed_texts([text,...]) -> [[float,...], ...]`.  
  Allows switching between OpenAI and offline/mock embedders deterministically.

**Guidelines**  
- Keep return types JSON-serializable (dicts, lists, primitives).  
- No side effects outside interface contracts.  
- Add new methods only when needed; prefer extension via new adapters.

## Logging & Initialization
**Definition**: Centralized, environment-driven logging that all modules inherit, with module-level loggers named by their module path.  
**Why it matters**: Predictable, 12‑Factor compliant logs; avoids duplicate handlers and hard-to-debug output.

- **Module loggers**: Use `logger = logging.getLogger(__name__)` in each module.  
- **Single init point**: Configure logging once at process entry using `LOG_LEVEL` (e.g., `logging.basicConfig(level=...)`).  
- **Handler guard**: Only call `basicConfig` if the root logger has no handlers to avoid double-configuring when embedded in another app.  
- **Levels**: Let modules inherit level/handlers; do not set per-module levels/handlers.  
- **Output**: Log to stdout/stderr; structure logs if/when needed; no secrets.
