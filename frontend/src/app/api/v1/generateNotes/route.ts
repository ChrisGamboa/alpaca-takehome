// pages/api/v1/generateNotes/route.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface FormData {
  date: string;
  timeRange: string;
  type: string;
  therapistName: string;
  patientName: string;
  observations: string;
}

interface NotesResponse {
  Therapist: string;
  TherapistID: number;
  Patient: string;
  PatientID: number;
  Date: string; // Date in ISO format
  Notes: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const formData: FormData = req.body;

    try {
      const response = await fetch('http://127.0.0.1:8000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: NotesResponse = await response.json();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
