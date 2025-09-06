from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import time

from .config.settings import Settings
from .common.observability.logging import setup_logging, logger
from .features.health.routes import router as health_router
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:
    settings = Settings.from_env()
    setup_logging(settings.log_level)

    app = FastAPI(title="Backend", version="0.1.0")

    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start = time.time()
        response = await call_next(request)
        duration_ms = int((time.time() - start) * 1000)
        logger.info(
            "request",
            extra={
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration_ms": duration_ms,
            },
        )
        return response

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(_: Request, exc: Exception):
        logger.error("unhandled_exception", extra={"type": type(exc).__name__})
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

    # Dev CORS for local Next.js app
    if settings.env != "production":
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=False,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    app.include_router(health_router)

    return app


app = create_app()
