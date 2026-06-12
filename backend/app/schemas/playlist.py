from pydantic import BaseModel


class PlaylistCreate(BaseModel):
    name: str
    description: str | None = None