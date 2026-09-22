import os
from pathlib import Path
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

KNOWLEDGE_DIR = BASE_DIR.parent / "knowledge" / "documents"

class Settings(BaseModel):
    APP_NAME: str = "AgriSathi API"
    APP_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/agrisathi.db")
    DEMO_MODE: bool = True
    UPLOAD_DIR: Path = UPLOAD_DIR
    KNOWLEDGE_DIR: Path = KNOWLEDGE_DIR
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]

settings = Settings()
