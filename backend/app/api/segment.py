from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.segment import Segment
from app.schemas.segment import SegmentCreate

router = APIRouter()


@router.post("/")
def create_segment(
    segment: SegmentCreate,
    db: Session = Depends(get_db)
):
    db_segment = Segment(
        song_id=segment.song_id,
        start_time=segment.start_time,
        end_time=segment.end_time,
        segment_type=segment.segment_type
    )

    db.add(db_segment)
    db.commit()
    db.refresh(db_segment)

    return {
        "message": "Segment created",
        "id": db_segment.id
    }


@router.get("/")
def get_segments(
    db: Session = Depends(get_db)
):
    return db.query(Segment).all()


@router.get("/song/{song_id}")
def get_song_segments(
    song_id: int,
    db: Session = Depends(get_db)
):
    segments = (
        db.query(Segment)
        .filter(Segment.song_id == song_id)
        .all()
    )

    return segments


@router.delete("/{segment_id}")
def delete_segment(
    segment_id: int,
    db: Session = Depends(get_db)
):
    segment = (
        db.query(Segment)
        .filter(Segment.id == segment_id)
        .first()
    )

    if not segment:
        return {
            "message": "Segment not found"
        }

    db.delete(segment)
    db.commit()

    return {
        "message": "Segment deleted"
    }