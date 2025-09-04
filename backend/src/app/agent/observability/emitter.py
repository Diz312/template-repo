from collections import deque
from typing import Deque, Iterable

from .events import AgentEvent


class InProcessEventEmitter:
    """Simple in-memory queue emitter for SSE/Web subscribers."""

    def __init__(self) -> None:
        self._q: Deque[AgentEvent] = deque()

    def emit(self, event: AgentEvent) -> None:
        self._q.append(event)

    def drain(self) -> Iterable[AgentEvent]:
        while self._q:
            yield self._q.popleft()


# Global emitter instance for app usage (simple template-friendly approach)
emitter = InProcessEventEmitter()
