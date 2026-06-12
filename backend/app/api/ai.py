import os

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

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
