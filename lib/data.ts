export const stats = [
  { title: "Total Students", value: "1,284", change: "+12%" },
  { title: "Revenue", value: "$12.5k", change: "+8%" },
  { title: "Attendance", value: "94%", change: "+2%" },
  { title: "Pending Fees", value: "$2.1k", change: "-3%" },
];

export const students = [
  { name: "Ali Khan", grade: "10th", status: "Active" },
  { name: "Sara Ahmed", grade: "9th", status: "Active" },
  { name: "Zainab Malik", grade: "11th", status: "On Leave" },
  { name: "Usman Raza", grade: "12th", status: "Active" },
  { name: "Fatima Noor", grade: "10th", status: "On Probation" }
];

export const analyticsData = [
  { month: 'Jan', performance: 85, attendance: 92 },
  { month: 'Feb', performance: 88, attendance: 90 },
  { month: 'Mar', performance: 92, attendance: 94 },
  { month: 'Apr', performance: 89, attendance: 95 },
  { month: 'May', performance: 94, attendance: 96 },
  { month: 'Jun', performance: 96, attendance: 97 },
];

export const scheduleEvents = [
  { id: 1, time: '09:00 AM', title: 'Calculus Advanced', teacher: 'Dr. Robert', room: 'Room 302', type: 'Lecture' },
  { id: 2, time: '11:30 AM', title: 'Biology Lab', teacher: 'Ms. Alice', room: 'Lab 12', type: 'Practical' },
  { id: 3, time: '02:00 PM', title: 'History of Art', teacher: 'Ms. Sarah', room: 'Hall A', type: 'Seminar' },
];

export const transactions = [
  { id: 'TX-9001', date: 'Oct 12, 2026', student: 'Ali Khan', amount: '$450', status: 'Paid', method: 'Visa' },
  { id: 'TX-9002', date: 'Oct 14, 2026', student: 'Sara Ahmed', amount: '$300', status: 'Pending', method: 'Bank Transfer' },
  { id: 'TX-9003', date: 'Oct 15, 2026', student: 'Usman Raza', amount: '$520', status: 'Paid', method: 'Mastercard' },
];

export const messages = [
  { id: 1, sender: 'Principal Office', preview: 'The annual sports week has been rescheduled...', time: '2h ago', unread: true },
  { id: 2, sender: 'Ms. Sarah', preview: 'Please check the assignment for Grade 12...', time: '5h ago', unread: false },
  { id: 3, sender: 'IT Support', preview: 'System maintenance scheduled for midnight...', time: '1d ago', unread: false },
];

export function getAIResponse(query: string) {
  if (query.includes("performance")) {
    return "Overall student performance is improving. AI models predict a 5% increase in GPA across Grade 10.";
  }
  if (query.includes("attendance")) {
    return "Attendance is stable at 94%. Minor drops detected in Grade 12 during Friday sessions.";
  }
  return "Neural nodes synchronized. School management system operational at peak efficiency.";
}
