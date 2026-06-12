import os

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.database import get_db
from app.models.song import Song
from app.models.segment import Segment

from app.services.highlight_service import (
    detect_highlights
)

router = APIRouter()


@router.post("/detect")
async def detect_song_highlights(
    file: UploadFile = File(...)
):

    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    highlights = detect_highlights(
        file_path
    )

    return {
        "filename": file.filename,
        "highlights": highlights
    }

@router.post("/detect-and-save")
async def detect_and_save(
    title: str,
    artist: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(
            await file.read()
        )

    song = Song(
        title=title,
        artist=artist,
        album="AI Imported",
        duration=0,
        file_url=file_path
    )

    db.add(song)
    db.commit()
    db.refresh(song)

    highlights = detect_highlights(
        file_path
    )

    created_segments = 0

    for timestamp in highlights:

        segment = Segment(
            song_id=song.id,
            start_time=timestamp,
            end_time=timestamp + 10,
            segment_type="highlight"
        )

        db.add(segment)
        created_segments += 1

    db.commit()

    return {
        "song_id": song.id,
        "segments_created": created_segments,
        "highlights": highlights
    }