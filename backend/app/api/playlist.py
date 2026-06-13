from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.playlist import Playlist
from app.schemas.playlist import PlaylistCreate

from app.models.song import Song
from app.models.playlist_song import PlaylistSong

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

@router.get("/{playlist_id}/songs")
def get_playlist_with_songs(
    playlist_id: int,
    db: Session = Depends(get_db)
):

    playlist = (
        db.query(Playlist)
        .filter(
            Playlist.id == playlist_id
        )
        .first()
    )

    if not playlist:
        return {
            "message": "Playlist not found"
        }

    songs = (
        db.query(Song)
        .join(
            PlaylistSong,
            Song.id == PlaylistSong.song_id
        )
        .filter(
            PlaylistSong.playlist_id
            == playlist_id
        )
        .all()
    )

    return {
        "playlist": playlist.name,
        "songs": songs
    }