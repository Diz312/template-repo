# Python Key Concepts

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
