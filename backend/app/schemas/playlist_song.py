from pydantic import BaseModel


class PlaylistSongCreate(BaseModel):
    playlist_id: int
    song_id: int