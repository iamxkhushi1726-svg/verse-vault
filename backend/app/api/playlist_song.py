from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.playlist_song import PlaylistSong
from app.schemas.playlist_song import PlaylistSongCreate

router = APIRouter()


@router.post("/")
def add_song_to_playlist(
    data: PlaylistSongCreate,
    db: Session = Depends(get_db)
):
    item = PlaylistSong(
        playlist_id=data.playlist_id,
        song_id=data.song_id
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.get("/")
def get_playlist_songs(
    db: Session = Depends(get_db)
):
    return db.query(PlaylistSong).all()