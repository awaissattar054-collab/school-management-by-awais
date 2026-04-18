-- Seed script to populate the School Management System with mock data

-- Insert Mock Data into Students
INSERT INTO Students (Name, Grade, Guardian_Name, Contact_Number, Enrollment_Date, Balance_Fees) VALUES
('Alice Johnson', '10th Grade', 'Robert Johnson', '+1-555-0101', '2025-08-15', 50.00),
('Bob Smith', '10th Grade', 'Martha Smith', '+1-555-0102', '2025-08-15', 0.00),
('Charlie Brown', '9th Grade', 'David Brown', '+1-555-0103', '2025-08-16', 150.00),
('Diana Prince', '11th Grade', 'Hippolyta Prince', '+1-555-0104', '2024-08-20', 0.00),
('Evan Wright', '12th Grade', 'George Wright', '+1-555-0105', '2023-08-22', 300.00);

-- Insert Mock Data into Attendance
INSERT INTO Attendance (Student_ID, Date, Status, Auto_Notification_Sent) VALUES
(1, '2026-04-18', 'Present', FALSE),
(2, '2026-04-18', 'Present', FALSE),
(3, '2026-04-18', 'Late', TRUE),
(4, '2026-04-18', 'Absent', TRUE),
(5, '2026-04-18', 'Present', FALSE);

-- Insert Mock Data into Fees
INSERT INTO Fees (Student_ID, Amount_Due, Amount_Paid, Due_Date, Status) VALUES
(1, 500.00, 450.00, '2026-05-01', 'Pending'),
(2, 500.00, 500.00, '2026-05-01', 'Paid'),
(3, 500.00, 350.00, '2026-05-01', 'Pending'),
(4, 500.00, 500.00, '2026-05-01', 'Paid'),
(5, 600.00, 300.00, '2026-05-01', 'Pending');

-- Insert Mock Data into AI_Reports
INSERT INTO AI_Reports (Student_ID, Teacher_Comments, AI_Summary, Performance_Score) VALUES
(1, 'Alice is doing great in her math classes and actively participates.', 'Student shows consistent engagement and high comprehension in STEM subjects.', 92.50),
(2, 'Bob occasionally distracted but generally performs well on tests.', 'Average participation, but testing metrics indicate good grasp of material. Focus needs slight improvement.', 85.00),
(3, 'Charlie struggles with punctuality but puts effort into creative writing.', 'Creative skills are excellent. Punctuality is a recurring issue affecting overall class harmony.', 78.00),
(4, 'Diana is a natural leader and excels in history.', 'Top of the class in liberal arts. Exhibits strong leadership qualities during group assignments.', 98.00),
(5, 'Evan needs to focus on finalizing his senior project. Behind on current obligations.', 'Risk of falling behind. Requires immediate intervention for successful course completion.', 65.50);

-- Populate Sentiment_Logs
INSERT INTO Sentiment_Logs (Student_ID, Sentiment_Score, Happiness_Level) VALUES
(1, 92.5, 'Very Happy'),
(1, 85.0, 'Happy'),
(2, 45.0, 'Sad'),
(3, 75.0, 'Happy');

-- Populate Counselor_Alerts
INSERT INTO Counselor_Alerts (Student_ID, Alert_Type, Reason) VALUES
(2, 'Sentiment Drop', 'Student sentiment score dropped below 50% threshold.'),
(2, 'Performance Drop', 'Exam score dropped by 15% in the last month.');

