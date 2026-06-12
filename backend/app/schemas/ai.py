from pydantic import BaseModel


class SongMetadata(BaseModel):
    title: str
    artist: str
    album: str | None = None