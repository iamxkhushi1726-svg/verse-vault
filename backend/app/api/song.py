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


@router.get("/")
def get_all_songs(
    db: Session = Depends(get_db)
):
    songs = db.query(Song).all()
    return songs


@router.get("/{song_id}")
def get_song(
    song_id: int,
    db: Session = Depends(get_db)
):
    song = (
        db.query(Song)
        .filter(Song.id == song_id)
        .first()
    )

    if not song:
        return {
            "message": "Song not found"
        }

    return song


@router.delete("/{song_id}")
def delete_song(
    song_id: int,
    db: Session = Depends(get_db)
):
    song = (
        db.query(Song)
        .filter(Song.id == song_id)
        .first()
    )

    if not song:
        return {
            "message": "Song not found"
        }

    db.delete(song)
    db.commit()

    return {
        "message": "Song deleted"
    }