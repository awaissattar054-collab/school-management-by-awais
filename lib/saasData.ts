export const saasStats = [
  { title: "Total Students", value: "1,250", change: "+4.2%", trend: [40, 50, 45, 60, 55, 70, 65] },
  { title: "Monthly Revenue", value: "$45,000", change: "+12.1%", trend: [30, 35, 40, 38, 45, 48, 50] },
  { title: "Avg. Attendance", value: "96%", change: "+0.5%", trend: [94, 95, 94, 96, 95, 96, 97] },
  { title: "Pending Invoices", value: "$2,850", change: "-15.3%", trend: [100, 80, 60, 70, 50, 40, 30] },
];

export const saasStudents = [
  { id: "ST-001", name: "Ali Khan", grade: "10th", section: "A", status: "Active", email: "ali.k@edu.com" },
  { id: "ST-002", name: "Sara Ahmed", grade: "9th", section: "B", status: "Active", email: "sara.a@edu.com" },
  { id: "ST-003", name: "Zain Malik", grade: "11th", section: "A", status: "Inactive", email: "zain.m@edu.com" },
  { id: "ST-004", name: "Usman Raza", grade: "12th", section: "C", status: "Active", email: "usman.r@edu.com" },
  { id: "ST-005", name: "Fatima Noor", grade: "10th", section: "B", status: "Probation", email: "fatima.n@edu.com" },
];

export const saasSchedule = [
  { id: 1, time: '08:30', title: 'Mathematics', teacher: 'Dr. Robert', room: '302' },
  { id: 2, time: '10:15', title: 'Biology Lab', teacher: 'Ms. Alice', room: 'Lab 1' },
  { id: 3, time: '12:00', title: 'History', teacher: 'Ms. Sarah', room: 'Hall A' },
];

export const saasFinance = [
  { id: 'INV-102', date: '2026-04-12', entity: 'Ali Khan', amount: '$1,200', status: 'Paid' },
  { id: 'INV-103', date: '2026-04-14', entity: 'Sara Ahmed', amount: '$1,200', status: 'Pending' },
  { id: 'INV-104', date: '2026-04-15', entity: 'School Supplies', amount: '$450', status: 'Approved' },
];

export const saasMessages = [
  { id: 1, from: 'Principal Office', subject: 'Academic Calendar Update', time: '10 min ago' },
  { id: 2, from: 'IT Dept', subject: 'System Maintenance', time: '1 hr ago' },
  { id: 3, from: 'Ms. Sarah', subject: 'Grade 12 Reports Ready', time: '3 hrs ago' },
];

export function getSaaSResponse(query: string) {
  if (query.includes("performance")) return "Performance index synchronized at 92.4% with positive velocity.";
  return "All systems nominal. Neural node 0x90A active.";
}
