from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Dict

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model from frontend form
class FormData(BaseModel):
    date: str
    timeRange: str
    type: str
    therapistName: str
    patientName: str
    observations: str

# Response model 
class NotesResponse(BaseModel):
    Therapist: str
    Patient: str
    Date: datetime
    Notes: str


@app.get("/")
async def health_check():
    return {"status": "healthy"}

@app.post("/generateNotes", response_model=NotesResponse)
async def submit_data(form_data: FormData):
    try:
        # Simulate generating IDs and procrcessing data
        response_data = NotesResponse(
            Therapist=form_data.therapistName,
            Patient=form_data.patientName,
            Date=form_data.date,
            Notes=form_data.observations,
        )
        return response_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
