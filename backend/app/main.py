from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.core.database import engine, Base, SessionLocal
from app.core.seed import seed_database
from app.api.endpoints import router as api_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Seed initial agricultural data
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AgriSathi Multimodal AI Agricultural Assistant API"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory for images
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include API Router
app.include_router(api_router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "app": "AgriSathi API",
        "version": settings.APP_VERSION,
        "status": "online",
        "demo_mode": settings.DEMO_MODE,
        "documentation": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "agrisathi-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
