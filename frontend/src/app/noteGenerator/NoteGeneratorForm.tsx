'use client'

import React, { useState } from 'react';

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
  observations: string;
}

const InputField = ({ id, label, value, onChange, type = "text", placeholder = "" }: any) => (
  <div>
    <label htmlFor={id} className="block text-lg font-bold text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-base text-gray-900 p-2"
      placeholder={placeholder}
    />
  </div>
);

const TextAreaField = ({ id, label, value, onChange, placeholder = "" }: any) => (
  <div>
    <label htmlFor={id} className="block text-lg font-bold text-gray-700">{label}</label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-base text-gray-900 p-2"
      placeholder={placeholder}
      rows={4}
    ></textarea>
  </div>
);

const SelectField = ({ id, label, value, onChange, options }: any) => (
  <div>
    <label htmlFor={id} className="block text-lg font-bold text-gray-700">{label}</label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-base text-gray-900 p-2"
    >
      <option value="">Select type</option>
      {options.map((option: string, index: number) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    timeRange: '',
    type: '',
    therapistName: '',
    patientName: '',
    observations: '',
  });
  const [observationNotes, setObservationNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote(e.target.value);
  };

  const handleAddNote = () => {
    if (currentNote.trim()) {
      setObservationNotes([...observationNotes, currentNote.trim()]);
      setCurrentNote('');
    }
  };

  const handleEditNote = (index: number, newNote: string) => {
    const updatedNotes = [...observationNotes];
    updatedNotes[index] = newNote;
    setObservationNotes(updatedNotes);
  };

  const handleDeleteNote = (index: number) => {
    setObservationNotes(observationNotes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Observation Notes:', observationNotes);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200 flex">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Appointment Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <InputField
              id="therapistName"
              label="Therapist Name"
              value={formData.therapistName}
              onChange={handleChange}
              placeholder="Enter therapist's name"
            />
            <InputField
              id="patientName"
              label="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient's name"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputField
              id="date"
              label="Date"
              value={formData.date}
              onChange={handleChange}
              type="date"
            />
            <InputField
              id="timeRange"
              label="Time Range"
              value={formData.timeRange}
              onChange={handleChange}
              placeholder="e.g., 10:00 AM - 12:00 PM"
            />
          </div>
          <SelectField
            id="type"
            label="Type"
            value={formData.type}
            onChange={handleChange}
            options={typeOptions}
          />
          <TextAreaField
            id="observations"
            label="Observations"
            value={currentNote}
            onChange={handleNoteChange}
            placeholder="Enter observations"
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
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="w-1/3 pl-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Current Observation Notes</h2>
        <ul className="space-y-4 overflow-y-auto max-h-80">
          {observationNotes.map((note, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
              <span className="text-gray-800">{note}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const newNote = prompt('Edit note:', note);
                    if (newNote !== null) handleEditNote(index, newNote);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteNote(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentForm;
