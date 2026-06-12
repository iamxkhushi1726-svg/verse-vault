from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.playlist import Playlist
from app.schemas.playlist import PlaylistCreate

router = APIRouter()


@router.post("/")
def create_playlist(
    playlist: PlaylistCreate,
    db: Session = Depends(get_db)
):
    db_playlist = Playlist(
        name=playlist.name,
        description=playlist.description
    )

    db.add(db_playlist)
    db.commit()
    db.refresh(db_playlist)

    return db_playlist


@router.get("/")
def get_playlists(
    db: Session = Depends(get_db)
):
    return db.query(Playlist).all()