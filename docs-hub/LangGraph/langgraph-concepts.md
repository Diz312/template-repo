# langgraph_concepts.md


# Core Concepts

- **Graphs**
  - Includes: StateGraph, Compile, START/END Nodes, Edges (normal/conditional), Send, Command, Visualization, Recursion Limit
  - See: [Graphs](#graphs), [StateGraph](#stategraph), [Compile](#compile), [START / END Nodes](#start--end-nodes), [Edges](#edges), [Send](#send), [Command](#command), [Visualization](#visualization), [Recursion Limit](#recursion-limit)

- **Schema**
  - Includes: State, Schema, Multiple Schemas, Reducers, Messages in Graph State
  - See: [State](#state), [Schema](#schema), [Multiple Schemas](#multiple-schemas), [Reducers](#reducers), [Messages in Graph State](#messages-in-graph-state)

- **Nodes**
  - Includes: Nodes, Node Caching, Runtime Context
  - See: [Nodes](#nodes), [Node Caching](#node-caching), [Runtime Context](#runtime-context)

- **Edges**
  - Includes: Edges (fixed and conditional), Send, START/END Nodes
  - See: [Edges](#edges), [Send](#send), [START / END Nodes](#start--end-nodes)

---
---

## Graphs

**Definition**  
Agent workflows are graphs with three parts: **State** (shared data), **Nodes** (do work), **Edges** (decide next). Execution uses message passing in discrete "super-steps" (Pregel-style) until all nodes are inactive and no messages are in flight.

**Why it Matters**
- Clear orchestration for complex, looping workflows
- Parallelism when multiple edges fire

**Quick Recall**
- Nodes do work; edges choose what runs next
- Super-step = one iteration; parallel nodes share a step
- Nodes activate on new messages; halt when quiet

---

## StateGraph

**Definition**  
Primary builder. Parameterized by your `State`; add nodes/edges; `.compile()` to validate and set runtime options (checkpointer, breakpoints).

**Quick Recall**
- Define state → add nodes/edges → `graph = builder.compile(...)`
- Must compile before use

---

## Compile

**Definition**  
Validates structure (no orphaned nodes), attaches runtime args, returns a runnable graph.

**Quick Recall**
- Required step before `.invoke`/`.stream`

---

## State

**Definition**  
Typed data + reducers (merge rules). Shapes all node/edge IO.

**Why it Matters**
- Predictable updates and concurrency-safe merges

**Quick Recall**
- Use `TypedDict` (fast); dataclass for defaults; Pydantic for validation (slower)
- Reducers apply updates per key

---

## Schema

**Definition**  
How you define state keys/types.

**Quick Recall**
- Default: single schema for input/output
- Can specify explicit `input_schema` and `output_schema`

---

## Multiple Schemas

**Definition**  
Internal overall schema + optional `input_schema`/`output_schema` filters + optional private channels for internal chatter.

**Quick Recall**
- Nodes can write to any channel in the overall state
- Nodes may introduce channels if the type is defined (e.g., `PrivateState`)
- Input/Output are filtered views of the internal schema

---

## Reducers

**Definition**  
Rules for applying updates to each state key.

**Quick Recall**
- Default: last write wins (no annotation)
- Annotated: `Annotated[list[T], operator.add]` appends instead of overwrites

---

## Messages in Graph State

**Definition**  
Keep conversation history in a `messages` channel with a message-aware reducer.

**Quick Recall**
- Use `add_messages` to append new and overwrite by ID
- Accepts objects or dicts and normalizes to Message objects
- `MessagesState` is a ready-made state with `messages`

---

## Nodes

**Definition**  
Python functions (sync/async) that read state and return updates.

**Quick Recall**
- Can accept `state`, `config` (RunnableConfig) and `runtime` (context/deps)
- If no name supplied, uses function name

---

## START / END Nodes

**Definition**  
Virtual markers for entry and termination.

**Quick Recall**
- `add_edge(START, first_node)`; `add_edge(node, END)`

---

## Node Caching

**Definition**  
Skip re-running nodes when inputs haven’t changed.

**Quick Recall**
- Configure cache at compile; set per-node TTL/policy

---

## Edges

**Definition**  
Routing between nodes. Fixed or conditional; entry can be static or conditional from `START`.

**Quick Recall**
- Normal: `add_edge("a", "b")`
- Conditional: `add_conditional_edges("a", route_fn, mapping?)`
- Multiple targets run in parallel next super-step

---

## Send

**Definition**  
Dynamic fan-out for map-reduce: conditional edges can return `[Send(node, per_item_state), ...]`.

**Quick Recall**
- Spawns parallel work with per-item state

---

## Command

**Definition**  
Return `Command` from a node to both update state and route.

**Quick Recall**
- Add return type: `Command[Literal["next"]]`
- Use when you need update + routing together
- `graph=Command.PARENT` to hop to parent graph
- Works inside tools; supports human-in-the-loop resume

---

## Graph Migrations

**Definition**  
Evolve nodes/edges/state with a checkpointer, with rules per thread status.

**Quick Recall**
- Completed threads: topology changes allowed
- Interrupted threads: avoid renaming/removing nodes
- State keys: add/remove OK; renames lose old data

---

## Runtime Context

**Definition**  
Per-run dependencies via `context_schema`; passed on invoke and available in nodes.

**Quick Recall**
- `graph.invoke(inputs, context={...})`; read via `runtime.context`

---

## Recursion Limit

**Definition**  
Max super-steps per run (default 25) before `GraphRecursionError`.

**Quick Recall**
- Set per-run: `config={"recursion_limit": N}` (top-level key)

---

## Visualization

**Definition**  
Built-in renderers to visualize nodes/edges/routes.

**Quick Recall**
- Helpful for debugging and complex graphs

---

# Tools

**Definition**  
Tools are typed, documented Python functions exposed to the model. They become the model’s way of performing external actions.

**Mature Tool Pattern (what “good” looks like)**
- Use **`@tool`** with a **Pydantic args schema** (types + constraints + `Field(..., description=...)`).
- **Docstring** acts as the model-facing spec (see template below).
- Prefer **small, verb-based names** (`retrieve_passages`, `create_ticket`).
- Limit parameters; use **enums, ranges, defaults** to reduce ambiguity.
- Return **compact, structured JSON/dicts** with stable keys (easy for the model to reason with).
- Add **timeouts, retries, rate limits, circuit breakers** as appropriate.
- Emit **structured logs** (inputs, outputs, latency, errors) for observability.

**Docstring Template (fill all sections)**
```
PURPOSE:
  One sentence on what action this tool performs.

WHEN TO USE:
  2–4 bullets that signal the right situations/queries.

DO NOT USE:
  2–4 bullets to disqualify misuse (answers available in context, destructive ops without approval, etc.).

INPUTS (args):
  - param_a (type): what it is, constraints, defaults.
  - param_b (type): ...

OUTPUT (shape):
  JSON with keys and meanings. Include units/scales and any possible nulls/empties.

SIDE EFFECTS / COST:
  External API calls? Writes? Tokens/latency expectations.

SLO & GUARDRAILS:
  Timeout budget, retries/backoff, max items, rate limits, idempotency key if applicable.

QUALITY POLICY:
  Source preference rules, ranking heuristics, dedup rules, safety filters.

EXAMPLES:
  - Good: realistic positive example with parameters
  - Good: another
  - Bad: a misuse case that should be avoided

FAILURE MODES:
  Enumerate known errors + how they are surfaced in the output contract.
```

**Model Affordances (to improve tool-choice)**
- Clear **verbs** + unambiguous **param descriptions** 
- Provide **examples** that mirror real queries.
- Incorporate **negative examples** to discourage misuse.
- Use **narrow return shapes**; avoid free-form prose.
- Prefer **deterministic behavior**; make idempotent where possible.

**Runtime Guardrails**
- **Timeouts** per tool; **retries** with capped backoff.
- **Budget checks** (token, cost, step) before/after calls.
- **Access control** (allow-list which agents/phases can call the tool).
- **Schema validation** on both inputs and outputs.
- **Circuit breakers** on repeated failures.

---

## ToolNodes: One vs. Many
- **Single ToolNode (bucket of tools)**
  - **Pros**: simpler topology, fewer hops → lower latency/cost; easy to give an agent a broad toolkit.
  - **Cons**: coarse observability; bigger blast radius; coarse access control; mixed SLOs.
  - **Use when**: tools are low-risk and have similar latency/cost profiles; you optimize for throughput and simplicity.

- **Multiple ToolNodes (per tool or per family)**
  - **Pros**: fine-grained metrics, failure isolation, least-privilege wiring, per-tool SLOs/guardrails, easy node-level tests.
  - **Cons**: more nodes/edges; slightly higher hop overhead; router logic required.
  - **Use when**: tools differ in SLO/risk/cost; you need governance or per-tool dashboards; sensitive writes.

- **Hybrid (recommended default)**
  - **Group by intent** (e.g., `retrieval_tools`, `analysis_tools`, `actuation_tools`).
  - Phase-gate exposure: only the tools needed in that graph phase are reachable.

---

## ToolNodes vs. ReAct Agent
- **ToolNodes**
  - Deterministic, predictable, cheaper. Best for **fixed pipelines** and well-defined steps.
  - You control routing; the model doesn’t “ponder” tool choice.

- **ReAct agent**
  - Flexible planner that selects tools in Thought→Action→Observation loops.
  - **Pros**: handles open-ended tasks and multi-hop reasoning.
  - **Cons**: higher token/latency cost; less deterministic; requires guardrails (max steps, budgets, allow-lists).

- **Hybrid Pattern (pragmatic)**
  - Use **ReAct for planning/exploration** within a constrained tool *family*.
  - Execute **sensitive/expensive actions** via explicit **ToolNodes** (optionally with approvals in state).

---

## Architecture Choices – What to consider (practical checklist)
1. **Task Uncertainty**: If the next action is unknown → include a ReAct phase; if known → ToolNodes.
2. **Risk & Side Effects**: Writes/destructive or costly ops → isolate in their own ToolNode with approvals.
3. **SLOs**: Different latency/cost profiles → separate nodes or families with tailored timeouts/retries.
4. **Observability Needs**: Need per-tool metrics/alerts → separate nodes; else a bucket node may suffice.
5. **Governance & Access**: Regulated/PII boundaries → least-privilege wiring; remove tools from phases that don’t need them.
6. **Cost/Latency Budgets**: Optimize hops/tokens; bucket for speed, split for control.
7. **Human-in-the-Loop**: Insert gates before actuation nodes; capture approvals in state.
8. **Scaling & Evolution**: Expect tool growth? Start with **intent-family buckets**, split out hot or risky tools later.
9. **State & Reducers**: Choose **commutative reducers** (lists→`operator.add`, sets→`union`, dicts→`operator.or_`) so parallel tool outputs merge safely.

**Design Patterns**
- **Phase-Gated Exposure**: plan → retrieve → analyze → (approve?) → act.
- **Intent-Family Buckets**: retrieval vs. actuation nodes with distinct SLOs.
- **Per-Tool Isolation for Writes**: `create_ticket`, `update_db` each in their own node.
- **Plan-then-Execute**: ReAct (derive intent) → specific ToolNode(s).
- **Budget & Step Limits**: cap ReAct steps; enforce per-call token/cost ceilings.
- **Telemetry First**: structured logs and traces from day one; tag runs with `{tool, latency_ms, tokens}`.

**Quick Recall**
- Define tools like **public APIs**: schema + precise docstring + examples + guardrails.
- **One ToolNode** for simplicity; **many ToolNodes** for isolation/metrics/governance.
- **ReAct** for adaptive planning; **ToolNodes** for controlled execution.
- Keep sensitive writes **out of ReAct**; gate them behind dedicated nodes with approvals and SLOs.

--

