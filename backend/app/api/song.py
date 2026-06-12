from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.song import Song
from app.schemas.song import SongCreate

router = APIRouter()


@router.post("/")
def create_song(
    song: SongCreate,
    db: Session = Depends(get_db)
):
    db_song = Song(
        title=song.title,
        artist=song.artist,
        album=song.album,
        duration=song.duration
    )

    db.add(db_song)
    db.commit()
    db.refresh(db_song)

    return {
        "message": "Song created",
        "id": db_song.id
    }