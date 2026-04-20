import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // 1. Total Students
    const studentCountResult: any = await query('SELECT COUNT(*) as count FROM Students');
    const totalStudents = studentCountResult?.[0]?.count || 0;

    // 2. Monthly Revenue (Sum of Amount_Paid in current month)
    const revenueResult: any = await query("SELECT SUM(Amount_Paid) as total FROM Fees WHERE Status = 'Paid'");
    const revenue = revenueResult?.[0]?.total || 0;

    // 3. Avg Attendance (Percentage)
    const attendanceResult: any = await query("SELECT (SELECT COUNT(*) FROM Attendance WHERE Status = 'Present') / COUNT(*) * 100 as avg_pct FROM Attendance");
    const avgAttendance = attendanceResult?.[0]?.avg_pct || 0;

    // 4. Deficit Index (Sum of Pending Fees)
    const deficitResult: any = await query("SELECT SUM(Amount_Due - Amount_Paid) as deficit FROM Fees WHERE Status = 'Pending'");
    const deficit = deficitResult?.[0]?.deficit || 0;

    const stats = [
      { id: 'students', title: "Total Students", value: totalStudents.toLocaleString(), change: "+0%", chartTitle: "Student Enrollment Acceleration" },
      { id: 'revenue', title: "Total Revenue", value: `$${Number(revenue).toLocaleString()}`, change: "+0%", chartTitle: "Revenue Velocity Sync" },
      { id: 'attendance', title: "Avg. Attendance", value: `${Number(avgAttendance).toFixed(1)}%`, change: "+0%", chartTitle: "Attendance Reliability Index" },
      { id: 'deficit', title: "Outstanding Fees", value: `$${Number(deficit).toLocaleString()}`, change: "-0%", chartTitle: "Outstanding Liability Registry" },
    ];

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API Error:', error);
    // Return demo data if DB query fails
    return NextResponse.json([
      { id: 'students', title: "Total Students [DEMO]", value: "1,250", change: "+12%", chartTitle: "Student Enrollment Acceleration" },
      { id: 'revenue', title: "Monthly Revenue [DEMO]", value: "$45,000", change: "+8%", chartTitle: "Revenue Velocity Sync" },
      { id: 'attendance', title: "Avg. Attendance [DEMO]", value: "96.4%", change: "+2%", chartTitle: "Attendance Reliability Index" },
      { id: 'deficit', title: "Deficit Index [DEMO]", value: "$2,850", change: "-15%", chartTitle: "Outstanding Liability Registry" },
    ]);
  }
}
