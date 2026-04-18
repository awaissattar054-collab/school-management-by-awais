const express = require('express');
const { logAttendance, generateMonthlyReport, analyzeStudentSentiment } = require('./automation_logic');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// API Route to fetch all students (for Teacher View)
app.get('/api/students', async (req, res) => {
    try {
        const [students] = await db.execute('SELECT ID, Name, Grade FROM Students');
        res.send(students);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API Route to log attendance with notification logic
app.post('/api/attendance', async (req, res) => {
    const { studentID, status } = req.body;
    if (!studentID || !status) return res.status(400).send("Missing studentID or status");
    
    try {
        const [student] = await db.execute('SELECT Name, Guardian_Name FROM Students WHERE ID = ?', [studentID]);
        if (student.length === 0) return res.status(404).send("Student not found");

        const date = new Date().toISOString().split('T')[0];
        let notificationSent = false;
        let notificationMsg = "";

        if (status === 'Absent') {
            notificationSent = true;
            notificationMsg = `Parent Notification: ${student[0].Name} was absent today.`;
            
            // Log to Notifications table
            await db.execute(
                'INSERT INTO Notifications (Student_ID, Message, Type) VALUES (?, ?, ?)',
                [studentID, notificationMsg, 'WhatsApp']
            );
        }

        await db.execute(
            'INSERT INTO Attendance (Student_ID, Date, Status, Auto_Notification_Sent) VALUES (?, ?, ?, ?)',
            [studentID, date, status, notificationSent]
        );

        res.send({ 
            message: `Attendance processed for ${student[0].Name}`,
            notification: notificationSent ? notificationMsg : null
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API Route to generate AI report
// Example POST: { "studentID": 1, "comments": "Alice is a brilliant student but needs to speak up more in group discussions." }
app.post('/api/reports/generate', async (req, res) => {
    const { studentID, comments } = req.body;
    if (!studentID || !comments) return res.status(400).send("Missing studentID or comments");

    const summary = await generateMonthlyReport(studentID, comments);
    res.send({ studentID, aiSummary: summary });
});

// API Route for Sentiment Analysis
app.post('/api/student/sentiment/analyze', async (req, res) => {
    const { studentID, remarks, examScore } = req.body;
    if (!studentID || !remarks || examScore === undefined) return res.status(400).send("Missing parameters");

    const result = await analyzeStudentSentiment(studentID, remarks, examScore);
    res.send(result);
});

// API Route to fetch Sentiment Logs for Chart
app.get('/api/student/:id/sentiment-logs', async (req, res) => {
    const studentID = req.params.id;
    try {
        const [logs] = await db.execute(
            'SELECT Sentiment_Score as score, Happiness_Level as level, DATE_FORMAT(Analysis_Date, "%Y-%m-%d") as date FROM Sentiment_Logs WHERE Student_ID = ? ORDER BY Analysis_Date ASC',
            [studentID]
        );
        res.send(logs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`SMS Automation Server running on http://localhost:${PORT}`);
    console.log(`Cron job scheduled for daily Fee Reminders.`);
});
