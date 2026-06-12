from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User

from app.schemas.auth import LoginRequest

from app.services.security import (
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/login")
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(
            User.username == credentials.username
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        credentials.password,
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }