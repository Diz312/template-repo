import asyncio
import json
from dataclasses import asdict
from datetime import datetime, timezone

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from ...agent.observability.emitter import emitter
from ...agent.observability.events import AgentEvent, STEP_MESSAGE


router = APIRouter(prefix="/diagnostics", tags=["diagnostics"])


@router.get("/stream")
async def stream_events() -> StreamingResponse:
    async def event_source():
        while True:
            yielded = False
            for ev in emitter.drain():
                # add timestamp field to align with schema
                ev_dict = asdict(ev)
                ev_dict["ts"] = datetime.now(timezone.utc).isoformat()
                data = json.dumps(ev_dict)
                yield f"data: {data}\n\n"
                yielded = True
            if not yielded:
                await asyncio.sleep(0.5)

    headers = {
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
    }
    return StreamingResponse(event_source(), media_type="text/event-stream", headers=headers)


@router.post("/emit")
async def emit_sample(message: str = "hello from diagnostics") -> dict:
    ev = AgentEvent(type=STEP_MESSAGE, node=None, payload={"message": message})
    emitter.emit(ev)
    return {"status": "queued"}

