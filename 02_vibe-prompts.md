# Vibe Code Prompts

A starter set of reusable prompts to replace most of Cursor’s paid agents when using Codex directly.

# Global Guardrails
Append to any prompt:  
**Constraints**: 12-Factor principles, type hints, structured logs, no hardcoding, small PR-sized changes.  
**Output**: (1) plan, (2) code/diff, (3) rationale, (4) tests or plan.

---

## 1. Project Scaffolder (12-Factor)
**Prompt**:  
"Scaffold a best-practice [language/framework] service for [problem].  
Include: folder layout, entrypoint, `.env.example`, logging, config separation, minimal tests.  
Output: tree + starter files + rationale."  

**Purpose**: Quickly set up clean, production-ready project structure.  
**Example**: Scaffold FastAPI + Redis app with healthcheck + env config.

---

## 2. API Contract & Routes Designer
**Prompt**:  
"Design an OpenAPI spec for [feature] with [entities].  
Include endpoints, schemas, errors, pagination, filtering, auth.  
Generate server stubs for [framework]."  

**Purpose**: Define APIs up front; ensures clarity.  
**Example**: User management API with JWT, pagination, error codes.

---

## 3. Data/Storage Layer Planner
**Prompt**:  
"For [use case], propose 2–3 storage patterns (e.g., Redis, Postgres).  
Compare consistency, latency, ops; recommend one.  
Scaffold connection handling + pooling."  

**Purpose**: Choose scalable storage strategy.  
**Example**: Compare Redis (KV) vs Postgres (relational).

---

## 4. Refactor & Modularize
**Prompt**:  
"Refactor this code for readability and scalability.  
- Extract functions/classes  
- Add type hints + docstrings  
- Keep behavior identical  
- Add minimal tests"  

**Purpose**: Improve maintainability and quality.  
**Example**: Split monolithic function into smaller testable functions.

---

## 5. Test Writer (pytest)
**Prompt**:  
"Generate pytest unit tests for [module/function].  
Cover happy paths, edge cases, failure modes.  
Use fixtures/mocks as needed."  

**Purpose**: Increase reliability with automated testing.  
**Example**: Tests for Redis client wrapper.

---

## 6. Bug Hunter & Invariants
**Prompt**:  
"Review [file/function] for bugs/anti-patterns.  
Add guards/invariants, safer defaults, targeted fixes.  
Output: annotated diff + reasoning."  

**Purpose**: Proactively catch subtle bugs.  
**Example**: Add retry + timeout to API client.

---

## 7. Security & Hardening Review
**Prompt**:  
"Threat-model [feature].  
Checklist: authN/Z, validation, secrets mgmt, rate limiting, dependency safety.  
Output: risk table + fixes + diffs."  

**Purpose**: Secure early and often.  
**Example**: Secure FastAPI endpoints with JWT + rate limiting.

---

## 8. Performance Profiler & Optimizer
**Prompt**:  
"Profile [endpoint/function] under [workload].  
Identify hotspots; propose 2–3 optimizations.  
Add basic benchmarks + before/after diffs."  

**Purpose**: Improve speed + efficiency.  
**Example**: Batch DB queries; add async.

---

## 9. CI/CD + Containerizer
**Prompt**:  
"Add Dockerfile + Compose + CI workflow for [stack].  
Pipeline: lint, type-check, tests, build, scan.  
Container: non-root, healthcheck, env config."  

**Purpose**: Automate build/test/deploy.  
**Example**: GitHub Actions workflow + Docker Compose for FastAPI app.

---

## 10. “What Am I Missing?” Senior Review
**Prompt**:  
"Given [repo/tree/feature], list what a senior engineer would check for production readiness.  
Areas: reliability, observability, migrations, error budgets, docs.  
Output: prioritized checklist."  

**Purpose**: Surface blind spots and production gaps.  
**Example**: Identify missing observability and backup plan.

---

## 11. Orchestration Skeleton (LangGraph)
**Prompt**:  
"Scaffold a LangGraph orchestration for a multi-agent workflow with nodes: Planner, Retriever, Worker, Reviewer.  
Include clear node boundaries, typed inputs/outputs, and transitions.  
Output: graph code + rationale for design."  

**Purpose**: Start any multi-agent app with a structured orchestration layer.  
**Example**: Planner → Retriever (docs) → Worker (summarize) → Reviewer (validate).

---

## 12. Tool Schema & Sandbox
**Prompt**:  
"Define a new tool interface using Pydantic for inputs/outputs.  
Add timeout, retry, and rate-limit decorators.  
Explain how to safely expose only the minimum needed functions."  

**Purpose**: Standardizes how agents call tools.  
**Example**: A `SearchTool` that accepts `{query: str}` and returns `{results: List[str]}`.

---

## 13. Agent Memory Manager
**Prompt**:  
"Add memory to an agent with: short-term scratchpad, long-term vector store, and episodic recall.  
Show how to store/retrieve context and clear memory safely."  

**Purpose**: Makes agents coherent across tasks and sessions.  
**Example**: Store retrieved docs in Redis vector store, recall on follow-up queries.

---

## 14. Structured Tracing & Logs
**Prompt**:  
"Add structured tracing to the agent system.  
Log: run_id, agent, step, tool, tokens, latency, cost.  
Emit JSON lines for each step and explain how to visualize traces."  

**Purpose**: Debugging and observability.  
**Example**: Every tool call logs `{“tool”: “search”, “latency”: 120ms}`.

---

## 15. Eval Harness
**Prompt**:  
"Create an eval harness to test this agent on N sample tasks.  
Include expected outputs, assertions, and report pass/fail.  
Explain how to add regression tests for new tasks later."  

**Purpose**: Prevents silent drift when prompts/models change.  
**Example**: 10 Q&A tasks → 80% must match expected answers.

---

## 16. Safety & Permissions
**Prompt**:  
"Add a permission system for agents.  
Define which tools/data each agent can access.  
Show how to deny/allow actions dynamically."  

**Purpose**: Principle of least privilege.  
**Example**: Worker agent can write to DB, Reviewer can only read.

---

## 17. Resilience (Fallbacks & Routing)
**Prompt**:  
"Add model routing and fallback logic.  
Primary: GPT-4. Fallback: GPT-3.5.  
Log when fallback occurs.  
Explain trade-offs of routing by cost/latency/accuracy."  

**Purpose**: Reliability and cost control.  
**Example**: If GPT-4 times out, retry with GPT-3.5.

---

## 18. Agentic UX Timeline
**Prompt**:  
"Add a streaming endpoint (WebSocket or SSE) that emits agent step events.  
Each event should include: step_id, agent, action, status.  
Show example frontend timeline that visualizes workflow progress."  

**Purpose**: Human-in-the-loop trust and monitoring.  
**Example**: Dashboard showing Planner → Retriever → Worker steps in real time.

---

## 19. Study & Learn Agent

You are a **Study & Learn Companion Agent**.  
Your purpose is to help the user deeply understand technical concepts by guiding them step-by-step.  

1. **Tone & Approach**  
   - Be warm, approachable, and plain-spoken.  
   - Keep explanations clear and concise.  
   - Avoid essay-length answers; favor dialogue and back-and-forth.  

2. **Teaching Method**  
   - Act like a dynamic teacher, not a search engine.  
   - Explain concepts at a level suitable for a high-school or university student unless the user specifies otherwise.  
   - Use analogies, mnemonics, examples, and quick recaps to reinforce learning.  
   - Ask **one guiding question at a time** to involve the user in reasoning.  

3. **Do Not Do the Work For the User**  
   - Never directly solve homework/test questions.  
   - Instead, break problems into steps, guide thinking, and let the user attempt answers.  
   - Provide corrections and nudges only after the user tries.  

4. **Variety of Engagement**  
   - Mix explanations, practice rounds, role-play, and quick quizzes.  
   - Encourage the user to “teach back” concepts to check understanding.  

5. **Structure & Output**  
   - Use Markdown for all outputs.  
   - Create **succinct summaries of key concepts**.  
   - Include Mermaid diagrams **only when the user requests a workflow or relationship visualization**.  
   - Append new notes to the user’s designated study file (e.g., `langgraph_concepts.md`).  

6. **Boundaries**  
   - If the user requests visuals, create diagrams or tables.  
   - If the user requests definitions or explanations, keep them succinct and structured.  
   - If the user uploads official documentation links, extract and summarize concepts clearly.  

---

**Quick Recall Principles**
- **Guide, don’t answer.**  
- **One question at a time.**  
- **Summarize, don’t overwhelm.**  
- **Encourage the user’s reasoning.**  
- **Check and reinforce after hard parts.**  

---

