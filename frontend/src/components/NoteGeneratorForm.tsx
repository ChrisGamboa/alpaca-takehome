'use client'

import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import ListOfNotes from './ListOfNotes';

const typeOptions = [
  'Discrete Trial Training (DTT)',
  'Early Intensive Behavioral Intervention (EIBI)',
  'Early Start Denver Model (ESDM)',
  'Natural Environment Training',
  'Comprehensive ABA Therapy',
  'Focused ABA Therapy',
];

interface FormData {
  date: string;
  timeRange: string;
  type: string;
  therapistName: string;
  patientName: string;
}

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    timeRange: '',
    type: '',
    therapistName: '',
    patientName: '',
  });
  const [observationNotes, setObservationNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState<string>('');

  const handleChange = (
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
      setObservationNotes((prev) => [...prev, currentNote.trim()]);
      setCurrentNote('');
    }
  };

  const handleEditNote = (index: number, newNote: string) => {
    setObservationNotes((prev) =>
      prev.map((note, i) => (i === index ? newNote : note))
    );
  };

  const handleDeleteNote = (index: number) => {
    setObservationNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Transform date and time range
    const [startTime, endTime] = formData.timeRange.split(' - ');
    const requestPayload = {
      date: formData.date,
      timeRange: {
        startTime: startTime,
        endTime: endTime,
      },
      type: formData.type,
      therapistName: formData.therapistName,
      patientName: formData.patientName,
      observationNotes,
    };

    console.log('Request Payload:', requestPayload);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200 flex">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Appointment Form
        </h1>
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
      <ListOfNotes
        notes={observationNotes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default AppointmentForm;

