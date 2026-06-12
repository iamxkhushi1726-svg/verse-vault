from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import ForeignKey

from app.db.database import Base


class Segment(Base):
    __tablename__ = "segments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    song_id = Column(
        Integer,
        ForeignKey("songs.id"),
        nullable=False
    )

    start_time = Column(
        Float,
        nullable=False
    )

    end_time = Column(
        Float,
        nullable=False
    )

    segment_type = Column(
        String,
        nullable=False
    )