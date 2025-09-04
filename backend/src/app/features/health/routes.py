from fastapi import APIRouter

from ...config.settings import Settings
from .service import get_health
from .models import HealthResponse


router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=HealthResponse)
def health() -> HealthResponse:
    settings = Settings.from_env()
    return get_health(settings)

