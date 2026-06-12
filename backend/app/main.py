from fastapi import FastAPI

from app.db.database import Base
from app.db.database import engine

from app.models.user import User

from app.api.user import router as user_router
from app.api.auth import router as auth_router

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Database tables created.")

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