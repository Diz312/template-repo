from dataclasses import dataclass
from typing import Any, Dict, Optional


@dataclass
class AgentEvent:
    type: str
    payload: Dict[str, Any]
    node: Optional[str] = None


# Examples (extend as needed)
NODE_STARTED = "node_started"
NODE_FINISHED = "node_finished"
TOOL_CALLED = "tool_called"
TOOL_ERROR = "tool_error"
TOKEN_USAGE = "token_usage"
STEP_MESSAGE = "step_message"

