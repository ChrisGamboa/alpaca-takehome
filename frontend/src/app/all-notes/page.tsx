'use client'

import React, { useEffect, useState } from "react";

interface Note {
  id: number;
  therapist: string;
  patient: string;
  date: string; // ISO string
  notes: string;
}

interface AllNotesResponse {
  notes: Note[];
}

const AllNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes from the API
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/getAllNotes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes.");
      }
      const data: AllNotesResponse = await response.json();
      setNotes(data.notes);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        All Notes
      </h1>

      {loading && <p className="text-center text-gray-600">Loading notes...</p>}
      {error && (
        <p className="text-center text-red-600">
          Failed to load notes: {error}
        </p>
      )}

      {!loading && !error && notes.length === 0 && (
        <p className="text-center text-gray-600">No notes found.</p>
      )}

      {!loading && !error && notes.length > 0 && (
        <ul className="space-y-6">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Therapist: {note.therapist}
                </h2>
                <h3 className="text-lg font-semibold text-gray-700">
                  Patient: {note.patient}
                </h3>
                <p className="text-sm text-gray-600">
                  Date: {new Date(note.date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{note.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllNotesPage;
