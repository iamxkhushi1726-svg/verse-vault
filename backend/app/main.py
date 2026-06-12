from fastapi import FastAPI

app = FastAPI(
    title="Verse Vault API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to Verse Vault"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }