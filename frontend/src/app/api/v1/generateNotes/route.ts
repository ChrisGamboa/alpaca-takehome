// pages/api/v1/generateNotes/route.ts

import { NextResponse } from 'next';
import { responseCookiesToRequestCookies } from '../../../../../node_modules/next/dist/server/web/spec-extension/adapters/request-cookies';

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

export async function POST(request: Request) {
    try {
      const formData = await request.json()
  
      const response = await fetch('http://127.0.0.1:8000/generateNotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
  
      const data = await response.json()
      return response.json(data)
    } catch (error: any) {
        console.error(error);
        let errResponse = new Response();
        return errResponse;;
    }
  }
  