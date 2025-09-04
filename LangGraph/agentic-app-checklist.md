# Agentic App Checklist

## Multi-Agent App Foundations

### 1. Orchestration Layer
**Definition**: A control layer that manages how agents interact, pass tasks, and complete workflows.  
**Why it matters**: Provides structure and prevents chaos in multi-agent systems.  
**Example**: Using LangGraph to define nodes (Planner → Retriever → Worker → Reviewer) and edges for transitions.

### 2. Tooling Interface & Sandboxing
**Definition**: Standardized way to define and run tools that agents can call safely.  
**Why it matters**: Prevents unpredictable behaviors, enforces limits.  
**Example**: A tool schema in Pydantic with fields for `input_text` and `output_summary`, plus timeout and retry logic.

### 3. Memory Architecture
**Definition**: Mechanism for agents to recall context over short or long time spans.  
**Why it matters**: Allows coherent multi-step reasoning and persistence.  
**Example**: Short-term in a scratchpad, long-term in Redis vector store.

### 4. Planning & Decomposition
**Definition**: Breaking big goals into visible smaller steps and subgoals.  
**Why it matters**: Improves explainability, reduces agent “flailing.”  
**Example**: Plan: “(1) retrieve docs, (2) summarize, (3) check accuracy, (4) produce final answer.”

### 5. Observation & Tracing
**Definition**: Logging and tracing system to monitor agent steps, inputs, outputs, and performance.  
**Why it matters**: Enables debugging and optimization.  
**Example**: Logging JSON lines with `{run_id, agent_id, tool, tokens, latency}` for every step.

### 6. Eval Harness
**Definition**: A framework to test agents systematically on predefined tasks.  
**Why it matters**: Ensures reliability and prevents silent regressions.  
**Example**: Run 10 sample tasks; assert at least 8 produce correct results.

### 7. Safety & Permissions
**Definition**: Mechanisms to restrict what each agent or tool can access.  
**Why it matters**: Protects secrets and prevents harmful actions.  
**Example**: An agent only has permission to query a database, not to write files.

### 8. Messaging & Events Backbone
**Definition**: Communication layer for agents to share messages asynchronously.  
**Why it matters**: Decouples agents and enables scaling.  
**Example**: Agents publish/subscribe to Redis Streams to coordinate tasks.

### 9. Retrieval & Knowledge Layer
**Definition**: System to fetch and rank relevant documents/data for context.  
**Why it matters**: Provides agents with accurate, timely knowledge.  
**Example**: Load PDFs, chunk into embeddings, search with cosine similarity, rerank with LLM.

### 10. Fallbacks & Model Routing
**Definition**: Mechanisms to handle failures and route requests to different models.  
**Why it matters**: Improves reliability and reduces cost.  
**Example**: If GPT-4 times out, retry with GPT-3.5 and log fallback.

### 11. Frontend for Agentic UX
**Definition**: Interfaces for humans to monitor and guide agent workflows.  
**Why it matters**: Builds trust and allows intervention.  
**Example**: A dashboard showing each step in a plan with live updates.

### 12. Deployment & Ops
**Definition**: Infrastructure practices to run agent systems reliably in production.  
**Why it matters**: Ensures smooth transition from POC to prod.  
**Example**: Dockerized FastAPI app with Kubernetes autoscaling.

### 13. Data & Schema Contracts
**Definition**: Typed definitions for agent-tool inputs/outputs.  
**Why it matters**: Prevents schema drift and runtime errors.  
**Example**: JSON schema for a summarization tool: `{ "input": string, "summary": string }`.

### 14. Testing Patterns
**Definition**: Test designs to validate agents under normal and adverse conditions.  
**Why it matters**: Ensures resilience.  
**Example**: Chaos test by simulating a tool timeout; agent retries gracefully.

### 15. Cost & Latency Budgets
**Definition**: Defined budgets for token usage, latency, and cost per feature.  
**Why it matters**: Prevents runaway costs and keeps performance predictable.  
**Example**: Alert if an agent run exceeds 5 seconds or 5,000 tokens.

### 16. Prompt/Policy Registry
**Definition**: Version-controlled repository of prompts and policies.  
**Why it matters**: Treats prompts like code; allows rollback.  
**Example**: Store `planner_prompt_v1`, `planner_prompt_v2` in Git with changelogs.

### 17. Security Surface
**Definition**: Security measures around agent interactions with external systems.  
**Why it matters**: Reduces attack surface.  
**Example**: Signed webhooks for external calls, SSRF protection for URL fetch tool.

### 18. Lifecycle Jobs
**Definition**: Background jobs to keep the system healthy over time.  
**Why it matters**: Maintains stability and reliability.  
**Example**: Scheduled cleanup of old trace logs and vector embeddings.

---

## How to Use This Checklist
1. Start with orchestration + tool schemas.  
2. Add logging/tracing from day one.  
3. Layer safety (permissions, sandboxing) early.  
4. Add eval harness + tests before scaling.  
5. Keep prompt/policy registry under version control.  
6. Treat deployment as a 12-Factor service for smooth POC→prod.

