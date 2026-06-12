from pydantic import BaseModel


class SegmentCreate(BaseModel):
    song_id: int
    start_time: float
    end_time: float
    segment_type: str


class SegmentResponse(BaseModel):
    id: int
    song_id: int
    start_time: float
    end_time: float
    segment_type: str

    class Config:
        from_attributes = True