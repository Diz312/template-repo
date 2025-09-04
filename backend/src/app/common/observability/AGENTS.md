# Agents Guide (observability)

Use JSON logs to stdout via `setup_logging` in `logging.py`.
- Do not log secrets or PII.
- Include context like method/path/status/duration for HTTP.
- Prefer structured fields using the `extra` parameter.

