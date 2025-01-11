from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class FormDataTable(Base):
    __tablename__ = "form_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    time_range_start = Column(String, nullable=False)
    time_range_end = Column(String, nullable=False)
    type = Column(String, nullable=False)
    therapist_name = Column(String, nullable=False)
    patient_name = Column(String, nullable=False)

class GenerateNotes(Base):
    __tablename__ = "generate_notes"
    id = Column(Integer, primary_key=True, index=True)
    therapist_name = Column(String, nullable=False)
    patient_name = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    generated_notes = Column(Text, nullable=False)
