from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.services.security import verify_token

router = APIRouter()


@router.get("/me")
def get_current_user(
    payload=Depends(verify_token),
    db: Session = Depends(get_db)
):
    username = payload.get("sub")

    print("JWT Payload:", payload)
    print("Username from token:", username)

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if not user:
        return {
            "message": "User not found",
            "token_username": username
        }

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }