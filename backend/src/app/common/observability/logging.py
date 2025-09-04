import json
import logging
import sys
from datetime import datetime, timezone


def _json_default(obj):
    try:
        return str(obj)
    except Exception:
        return "<non-serializable>"


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        base = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname.lower(),
            "name": record.name,
            "msg": record.getMessage(),
        }
        # Merge extra keys (anything custom attached to the record)
        extras = {
            k: v
            for k, v in record.__dict__.items()
            if k
            not in {
                "name",
                "msg",
                "args",
                "levelname",
                "levelno",
                "pathname",
                "filename",
                "module",
                "exc_info",
                "exc_text",
                "stack_info",
                "lineno",
                "funcName",
                "created",
                "msecs",
                "relativeCreated",
                "thread",
                "threadName",
                "processName",
                "process",
            }
        }
        base.update(extras)
        return json.dumps(base, default=_json_default)


def setup_logging(level: str = "info") -> None:
    root = logging.getLogger()
    root.setLevel(getattr(logging, level.upper(), logging.INFO))

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JsonFormatter())

    # Clear existing handlers to avoid duplicates with reload
    root.handlers = [handler]


logger = logging.getLogger("app")

