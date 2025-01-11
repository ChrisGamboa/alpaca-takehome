from pydantic import BaseModel
from datetime import datetime
from typing import List

class FormData(BaseModel):
    date: str
    timeRange: dict
    type: str
    therapistName: str
    patientName: str
    observationNotes: list[str]

class GenerateNotesRequest(BaseModel):
    therapist: str
    patient: str
    date: datetime
    notes: str

class GenerateNotesResponse(BaseModel):
    id: int
    therapist: str
    patient: str
    date: datetime
    notes: str

class AllNotesResponse(BaseModel):
    notes: List[GenerateNotesResponse]
