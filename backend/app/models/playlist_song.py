from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from app.db.database import Base


class PlaylistSong(Base):
    __tablename__ = "playlist_songs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    playlist_id = Column(
        Integer,
        ForeignKey("playlists.id"),
        nullable=False
    )

    song_id = Column(
        Integer,
        ForeignKey("songs.id"),
        nullable=False
    )