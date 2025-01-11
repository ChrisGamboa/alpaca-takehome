from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db
from models import GenerateNotes
from schemas import FormData, GenerateNotesRequest, GenerateNotesResponse, AllNotesResponse
import openai
import os
from datetime import datetime
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load OpenAI API key from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_ai_prompt(form_data: FormData):
    # Combine observation notes into a single string
    short_notes = "\n".join(form_data.observationNotes)

    ai_prompt = f"""
        I am a professional ABA therapist/clinician. I need to convert the following small notes into professional ones using clinical terminology that I would
        use as a therapist. My name is {form_data.therapistName}, and my patient's name is {form_data.patientName}.

        Here's a list of observations I made during our session on {form_data.date}:
        {short_notes}
        """


@app.post("/generateNotes")
async def generate_notes(form_data: FormData):
    try:
        ai_prompt = create_ai_prompt(form_data)

        # Generate professional notes using OpenAI
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[(
                {"role": "developer", "content": "Write professional, clinical notes in a style used by ABA therapists."},
                {
                    "role": "user",
                    "content": ai_prompt
                }
            )],
            max_tokens=150,
            temperature=0.7
        )

        generated_notes = response.choices[0].message

        return {"notes": generated_notes}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating notes: {e}")


@app.post("/saveNotes")
async def save_notes(request: GenerateNotesRequest, db: AsyncSession = Depends(get_db)):
    try:
        note_entry = GenerateNotes(
            therapist=request.therapist,
            patient=request.patient,
            date=request.date,
            notes=request.notes
        )
        db.add(note_entry)
        await db.commit()
        return {"message": "Notes saved successfully!"}

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving notes: {e}")


@app.get("/getAllNotes", response_model=AllNotesResponse)
async def get_all_notes(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(GenerateNotes))
        notes = result.scalars().all()

        return {"notes": notes}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving notes: {e}")
