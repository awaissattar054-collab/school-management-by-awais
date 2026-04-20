import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { studentId, status } = body;

  console.log(`[Next.js API] Attendance logged for ${studentId}: ${status}`);

  // In a real production app, you would connect to a DB here.
  // For Vercel demo stability, we return a success response instantly.
  return NextResponse.json({ 
    success: true, 
    message: `Attendance marked as ${status}`,
    notificationTriggered: status === 'Absent' 
  });
}
