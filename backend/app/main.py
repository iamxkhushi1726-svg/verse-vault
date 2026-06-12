from fastapi import FastAPI

from app.db.database import Base
from app.db.database import engine

from app.models.user import User

from app.api.user import router as user_router
from app.api.auth import router as auth_router
from app.api.profile import router as profile_router

from app.services.security import verify_token
from fastapi import Depends

from app.models.song import Song
from app.api.song import router as song_router
from app.models.segment import Segment
from app.api.segment import router as segment_router

from app.api.ai import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Verse Vault API",
    version="1.0.0"
)

app.include_router(
    user_router,
    prefix="/api/users",
    tags=["Users"]
)

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

app.include_router(
    profile_router,
    prefix="/api/profile",
    tags=["Profile"]
)

app.include_router(
    song_router,
    prefix="/api/songs",
    tags=["Songs"]
)

app.include_router(
    segment_router,
    prefix="/api/segments",
    tags=["Segments"]
)

app.include_router(
    ai_router,
    prefix="/api/ai",
    tags=["AI"]
)

@app.get("/")
def root():
    return {
        "message": "Verse Vault API Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/debug-token")
def debug_token(payload=Depends(verify_token)):
    return payload