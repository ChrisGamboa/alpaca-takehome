import asyncio
from database import engine
from models import Base, GenerateNotes
from sqlalchemy.ext.asyncio import AsyncSession

async def insert_sample_data(session: AsyncSession):
    sample_data = [
        GenerateNotes(
            id=123,
            therapist_name="Dr. John Doe",
            patient_name="Jane Smith",
            date="2025-01-10T10:00:00",
            generated_notes="Patient showed improved focus and completed tasks with 80% accuracy."
        ),
        GenerateNotes(
            id=999,
            therapist_name="Dr. Emily Brown",
            patient_name="Mark Johnson",
            date="2025-01-11T14:00:00",
            generated_notes="Responded well to reinforcement cues and maintained attention for 15 minutes."
        ),
    ]
    session.add_all(sample_data)
    await session.commit()

async def init_db():
    async with engine.begin() as conn:
        # Drop all tables (optional)
        await conn.run_sync(Base.metadata.drop_all)
        
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSession() as session:
        await insert_sample_data(session)
    print("Database initialized!")

if __name__ == "__main__":
    asyncio.run(init_db())
