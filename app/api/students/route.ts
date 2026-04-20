import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Try to fetch from real DB
    const students = await query('SELECT * FROM Students ORDER BY Name ASC');
    
    if (students) {
      return NextResponse.json(students);
    }

    // Fallback to Mock Data if DB is not setup or connection fails
    const mockStudents = [
      { id: 1, name: 'Alice Johnson', grade: '10th', status: 'Active', guardian: 'Mark Johnson', balance: 450.00 },
      { id: 2, name: 'Bob Smith', grade: '10th', status: 'On Probation', guardian: 'Linda Smith', balance: 0.00 },
      { id: 3, name: 'Charlie Brown', grade: '9th', status: 'Active', guardian: 'Sally Brown', balance: 120.00 },
      { id: 4, name: 'Diana Prince', grade: '11th', status: 'Active', guardian: 'Bruce Prince', balance: 0.00 },
      { id: 5, name: 'Evan Wright', grade: '12th', status: 'Active', guardian: 'Sarah Wright', balance: 250.00 },
    ];

    return NextResponse.json(mockStudents);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
