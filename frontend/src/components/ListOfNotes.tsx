import React from 'react';

interface ListOfNotesProps {
  notes: string[];
  onEdit: (index: number, newNote: string) => void;
  onDelete: (index: number) => void;
}

const ListOfNotes: React.FC<ListOfNotesProps> = ({ notes, onEdit, onDelete }) => (
  <div className="w-1/3 pl-6 h-full">
    <h2 className="text-2xl font-bold mb-4 text-gray-900">Current Observation Notes</h2>
    <ul className="space-y-4 overflow-y-auto max-h-full border p-4 rounded-lg shadow-inner bg-gray-50">
      {notes.map((note, index) => (
        <li
          key={index}
          className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
        >
          <span className="text-gray-800">{note}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const newNote = prompt('Edit note:', note);
                if (newNote !== null) onEdit(index, newNote);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ListOfNotes;
