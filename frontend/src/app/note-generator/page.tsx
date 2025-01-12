'use client'

import React, { useState } from "react";
import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextAreaField";
import SelectField from "../../components/SelectField";
import ListOfNotes from "../../components/ListOfNotes";
import GeneratedNotes from "../../components/GeneratedNotes";

const typeOptions = [
  "Discrete Trial Training (DTT)",
  "Early Intensive Behavioral Intervention (EIBI)",
  "Early Start Denver Model (ESDM)",
  "Natural Environment Training",
  "Comprehensive ABA Therapy",
  "Focused ABA Therapy",
];

interface FormData {
  date: string;
  timeRange: string;
  type: string;
  therapistName: string;
  patientName: string;
  observationNotes: string[];
}

const GenerateNotesPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    timeRange: "",
    type: "",
    therapistName: "",
    patientName: "",
    observationNotes: [],
  });
  const [currentNote, setCurrentNote] = useState<string>("");
  const [generatedNotes, setGeneratedNotes] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote(e.target.value);
  };

  const handleAddNote = () => {
    if (currentNote.trim()) {
      setFormData((prev) => ({
        ...prev,
        observationNotes: [...prev.observationNotes, currentNote.trim()],
      }));
      setCurrentNote("");
    }
  };

  const handleDeleteNote = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      observationNotes: prev.observationNotes.filter((_, i) => i !== index),
    }));
  };

  const fetchGeneratedNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generateNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate notes");
      }

      const data = await response.json();
      setGeneratedNotes(data.notes);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    await fetchGeneratedNotes();
  };

  const saveGeneratedNote = async () => {
    try {
      const saveData = {
        therapist: formData.therapistName,
        patient: formData.patientName,
        date: formData.date,
        notes: generatedNotes,
      };

      const response = await fetch("http://127.0.0.1:8000/saveNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        throw new Error("Failed to save notes");
      }

      alert("Notes saved successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while saving the notes.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200 flex h-[700px]">
      {/* Form Section */}
      <div className="w-2/3 pr-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Generate Notes
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <InputField
              id="therapistName"
              label="Therapist Name"
              value={formData.therapistName}
              onChange={handleInputChange}
              name="therapistName"
              placeholder="Enter therapist's name"
            />
            <InputField
              id="patientName"
              label="Patient Name"
              value={formData.patientName}
              onChange={handleInputChange}
              name="patientName"
              placeholder="Enter patient's name"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputField
              id="date"
              label="Date"
              value={formData.date}
              onChange={handleInputChange}
              name="date"
              type="date"
            />
            <InputField
              id="timeRange"
              label="Time Range"
              value={formData.timeRange}
              onChange={handleInputChange}
              name="timeRange"
              placeholder="e.g., 10:00 AM - 12:00 PM"
            />
          </div>
          <SelectField
            id="type"
            label="Type"
            value={formData.type}
            onChange={handleInputChange}
            name="type"
            options={typeOptions}
          />
          <TextAreaField
            id="currentNote"
            label="Add Observation Note"
            value={currentNote}
            onChange={handleNoteChange}
            placeholder="Enter a note"
          />
          <button
            type="button"
            onClick={handleAddNote}
            className="mt-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Note
          </button>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Notes
          </button>
        </form>
      </div>

      {/* List of Notes */}
      <ListOfNotes
        notes={formData.observationNotes}
        onEdit={(index, newNote) =>
          setFormData((prev) => ({
            ...prev,
            observationNotes: prev.observationNotes.map((note, i) =>
              i === index ? newNote : note
            ),
          }))
        }
        onDelete={handleDeleteNote}
      />

      {/* Generated Notes Section */}
      {generatedNotes && (
        <div className="mt-8 w-full">
          <GeneratedNotes
            notes={generatedNotes}
            onRegenerate={fetchGeneratedNotes}
          />
          <button
            onClick={saveGeneratedNote}
            className="mt-4 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save Note
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-600 mt-4 text-center w-full">{error}</p>
      )}
    </div>
  );
};

export default GenerateNotesPage;
