from ..health.models import HealthResponse
from ...config.settings import Settings


def get_health(settings: Settings) -> HealthResponse:
    return HealthResponse(env=settings.env)

