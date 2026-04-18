-- Database generation script for School Management System

-- Create Students Table
CREATE TABLE Students (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Grade VARCHAR(50) NOT NULL,
    Guardian_Name VARCHAR(255) NOT NULL,
    Contact_Number VARCHAR(50) NOT NULL,
    Enrollment_Date DATE NOT NULL,
    Balance_Fees DECIMAL(10, 2) DEFAULT 0.00,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Attendance Table
CREATE TABLE Attendance (
    Attendance_ID INT AUTO_INCREMENT PRIMARY KEY,
    Student_ID INT NOT NULL,
    Date DATE NOT NULL,
    Status ENUM('Present', 'Absent', 'Late') NOT NULL,
    Auto_Notification_Sent BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Student_ID) REFERENCES Students(ID) ON DELETE CASCADE
);

-- Create Fees Table
CREATE TABLE Fees (
    Fee_ID INT AUTO_INCREMENT PRIMARY KEY,
    Student_ID INT NOT NULL,
    Amount_Due DECIMAL(10, 2) NOT NULL,
    Amount_Paid DECIMAL(10, 2) DEFAULT 0.00,
    Due_Date DATE NOT NULL,
    Status ENUM('Paid', 'Pending') DEFAULT 'Pending',
    FOREIGN KEY (Student_ID) REFERENCES Students(ID) ON DELETE CASCADE
);

-- Create AI_Reports Table
CREATE TABLE AI_Reports (
    Report_ID INT AUTO_INCREMENT PRIMARY KEY,
    Student_ID INT NOT NULL,
    Teacher_Comments TEXT,
    AI_Summary TEXT,
    Performance_Score DECIMAL(5, 2) CHECK (Performance_Score >= 0 AND Performance_Score <= 100),
    Report_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Student_ID) REFERENCES Students(ID) ON DELETE CASCADE
);

-- Create Sentiment_Logs Table
CREATE TABLE Sentiment_Logs (
    Log_ID INT AUTO_INCREMENT PRIMARY KEY,
    Student_ID INT NOT NULL,
    Sentiment_Score DECIMAL(5, 2) CHECK (Sentiment_Score >= 0 AND Sentiment_Score <= 100),
    Happiness_Level ENUM('Very Happy', 'Happy', 'Neutral', 'Sad', 'Very Sad') NOT NULL,
    Analysis_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Student_ID) REFERENCES Students(ID) ON DELETE CASCADE
);

-- Create Notifications Table
CREATE TABLE Notifications (
    Notification_ID INT AUTO_INCREMENT PRIMARY KEY,
    Student_ID INT NOT NULL,
    Type ENUM('SMS', 'WhatsApp') DEFAULT 'SMS',
    Message TEXT NOT NULL,
    SENT_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Student_ID) REFERENCES Students(ID) ON DELETE CASCADE
);

-- Create Counselor_Alerts Table
CREATE TABLE Counselor_Alerts (
    Alert_ID INT AUTO_INCREMENT PRIMARY KEY,
    Student_ID INT NOT NULL,
    Alert_Type VARCHAR(100) NOT NULL,
    Reason TEXT,
    Alert_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('New', 'Reviewed', 'Resolved') DEFAULT 'New',
    FOREIGN KEY (Student_ID) REFERENCES Students(ID) ON DELETE CASCADE
);

-- Create indexes to optimize queries based on the Student_ID
CREATE INDEX idx_attendance_student_id ON Attendance(Student_ID);
CREATE INDEX idx_fees_student_id ON Fees(Student_ID);
CREATE INDEX idx_ai_reports_student_id ON AI_Reports(Student_ID);
CREATE INDEX idx_sentiment_logs_student_id ON Sentiment_Logs(Student_ID);
CREATE INDEX idx_counselor_alerts_student_id ON Counselor_Alerts(Student_ID);
CREATE INDEX idx_notifications_student_id ON Notifications(Student_ID);
