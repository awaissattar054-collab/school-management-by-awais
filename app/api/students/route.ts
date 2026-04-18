import { NextResponse } from 'next/server';

export async function GET() {
  // Demo Data fallback (Always works even if DB is offline)
  const mockStudents = [
    { id: 1, name: 'Alice Johnson', grade: '10th', status: 'Active' },
    { id: 2, name: 'Bob Smith', grade: '10th', status: 'On Probation' },
    { id: 3, name: 'Charlie Brown', grade: '9th', status: 'Active' },
  ];

  return NextResponse.json(mockStudents);
}
