import pytest
from httpx import AsyncClient
from app.main import app


@pytest.mark.anyio
async def test_health_endpoint() -> None:
    async with AsyncClient(app=app, base_url="http://test") as ac:
        res = await ac.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert data["env"] in {"development", "test", "production"}

