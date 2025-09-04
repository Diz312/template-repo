import os
from dataclasses import dataclass


@dataclass
class Settings:
    env: str = "development"
    log_level: str = "info"

    @classmethod
    def from_env(cls) -> "Settings":
        return cls(
            env=os.getenv("ENV", "development"),
            log_level=os.getenv("LOG_LEVEL", "info"),
        )

