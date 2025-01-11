import React from "react";

interface GeneratedNotesProps {
  notes: string;
  onRegenerate: () => void;
}

const GeneratedNotes: React.FC<GeneratedNotesProps> = ({ notes, onRegenerate }) => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Generated Notes</h2>
      <p className="mt-2 text-gray-700 whitespace-pre-line">{notes || "No notes generated yet."}</p>
      <button
        onClick={onRegenerate}
        className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Regenerate
      </button>
    </div>
  );
};

export default GeneratedNotes;
