from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from app.db.database import Base


class Song(Base):
    __tablename__ = "songs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    artist = Column(
        String,
        nullable=False
    )

    album = Column(
        String,
        nullable=True
    )

    duration = Column(
        Float,
        nullable=False
    )

    file_url = Column(
        String,
        nullable=True
    )