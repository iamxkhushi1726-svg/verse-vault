from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate
from app.services.security import hash_password

router = APIRouter()


@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    try:
        db_user = User(
            username=user.username,
            email=user.email,
            password=hash_password(user.password)
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return {
            "message": "User created",
            "id": db_user.id
        }

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Username or email already exists"
        )