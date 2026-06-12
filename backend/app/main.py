from fastapi import FastAPI

from app.db.database import Base
from app.db.database import engine

from app.models.user import User

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Database tables created.")

app = FastAPI(
    title="Verse Vault API",
    version="1.0.0"
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