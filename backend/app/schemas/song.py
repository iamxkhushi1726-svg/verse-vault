from pydantic import BaseModel


class SongCreate(BaseModel):
    title: str
    artist: str
    album: str | None = None
    duration: float


class SongResponse(BaseModel):
    id: int
    title: str
    artist: str
    album: str | None
    duration: float

    class Config:
        from_attributes = True