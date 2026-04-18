const cron = require('node-cron');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('./db');
require('dotenv').config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * 1. ATTENDANCE TRIGGER
 * Logs attendance and triggers SMS/WhatsApp notification if student is 'Absent'.
 */
async function logAttendance(studentID, status) {
    try {
        const [student] = await db.execute('SELECT Name, Contact_Number, Guardian_Name FROM Students WHERE ID = ?', [studentID]);
        
        if (student.length === 0) throw new Error("Student not found");

        const date = new Date().toISOString().split('T')[0];
        let notificationSent = false;

        if (status === 'Absent') {
            console.log(`Triggering notification for ${student[0].Name}...`);
            // Mocking the SMS API Call
            await sendSMS(student[0].Contact_Number, `Dear ${student[0].Guardian_Name}, ${student[0].Name} is marked Absent today.`);
            notificationSent = true;
        }

        await db.execute(
            'INSERT INTO Attendance (Student_ID, Date, Status, Auto_Notification_Sent) VALUES (?, ?, ?, ?)',
            [studentID, date, status, notificationSent]
        );

        console.log(`Attendance logged for ${student[0].Name}: ${status}`);
    } catch (error) {
        console.error("Error logging attendance:", error.message);
    }
}

/**
 * 2. FEE TRIGGER (Scheduled Task)
 * Checks daily at 8:00 AM for fees due in 3 days.
 */
cron.schedule('0 8 * * *', async () => {
    console.log("Running scheduled Fee Reminders check...");
    try {
        // Query for Pending fees due exactly 3 days from now
        const [fees] = await db.execute(`
            SELECT f.*, s.Name, s.Contact_Number, s.Guardian_Name 
            FROM Fees f
            JOIN Students s ON f.Student_ID = s.ID
            WHERE f.Status = 'Pending' 
            AND f.Due_Date = CURDATE() + INTERVAL 3 DAY
        `);

        for (const fee of fees) {
            await sendSMS(fee.Contact_Number, `Reminder: ${fee.Name}'s fee of ${fee.Amount_Due} is due on ${fee.Due_Date}.`);
            console.log(`Sent fee reminder to ${fee.Guardian_Name} for student ${fee.Name}`);
        }
    } catch (error) {
        console.error("Error in Fee Reminder cron job:", error.message);
    }
});

/**
 * 3. AI INTEGRATION
 * Generates a Monthly Progress Summary using Gemini API.
 */
async function generateMonthlyReport(studentID, teacherComments) {
    try {
        console.log(`Generating AI summary for student ${studentID}...`);
        
        const prompt = `Act as a professional academic advisor. Based on these teacher comments: "${teacherComments}", 
        generate a professional, encouraging, and detailed 'Monthly Progress Summary' for the parents. Keep it within 3-4 sentences.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiSummary = response.text();

        // Assuming a performance score is calculated elsewhere, or we set a default
        const performanceScore = 85.0; 

        await db.execute(
            'INSERT INTO AI_Reports (Student_ID, Teacher_Comments, AI_Summary, Performance_Score) VALUES (?, ?, ?, ?)',
            [studentID, teacherComments, aiSummary, performanceScore]
        );

        console.log("AI Report successfully generated and saved.");
        return aiSummary;
    } catch (error) {
        console.error("Error generating AI report:", error.message);
    }
}

/**
 * 4. STUDENT SENTIMENT TRACKER
 * Analyzes teacher remarks and exam scores using AI to track student happiness and growth.
 * Alerts counselor if scores or sentiment drop significantly.
 */
async function analyzeStudentSentiment(studentID, remarks, examScore) {
    try {
        console.log(`Analyzing sentiment for student ${studentID}...`);

        // Get student name for context
        const [student] = await db.execute('SELECT Name FROM Students WHERE ID = ?', [studentID]);
        if (student.length === 0) throw new Error("Student not found");

        const prompt = `Act as an expert Educational Psychologist and Academic Advisor. 
        Analyze the following student data for ${student[0].Name}:
        - Teacher Remarks: "${remarks}"
        - Recent Exam Score: ${examScore}/100

        Please perform a deep analysis across these dimensions:
        1. Emotional State: Identify signs of stress, burnout, enthusiasm, or indifference.
        2. Academic Growth: Compare the score to usual expectations (high/med/low).
        3. Social Integration: Look for mentions of peer interaction in remarks.

        Respond with a JSON object containing:
        - "score": (0-100) overall sentiment score.
        - "level": (Very Happy, Happy, Neutral, Sad, Very Sad) overall mood.
        - "growth_index": (Positive, Stagnant, Negative) based on score and remarks.
        - "alert_needed": (true/false) if psychological intervention is recommended.
        - "summary": (2 sentences) professional summary for parents.
        - "internal_notes": (1 sentence) specific detail for the counselor.

        Ensure the JSON is perfectly formatted.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        
        // Extract JSON
        const jsonMatch = text.match(/\{.*\}/s);
        const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 70, level: 'Neutral' };

        // Save to logs with extended data if needed (keeping it simple for now but using the core stats)
        await db.execute(
            'INSERT INTO Sentiment_Logs (Student_ID, Sentiment_Score, Happiness_Level) VALUES (?, ?, ?)',
            [studentID, data.score, data.level]
        );

        // Enhanced Alert Logic
        if (data.alert_needed || data.score < 45 || examScore < 35) {
            await triggerCounselorAlert(studentID, 'Psychological/Academic Risk', `${data.internal_notes}. Context: ${data.summary}`);
        }

        console.log(`Sentiment analysis complete for ${student[0].Name}. Result: ${data.level}`);
        return data;
    } catch (error) {
        console.error("Error analyzing student sentiment:", error.message);
    }
}

async function triggerCounselorAlert(studentID, type, reason) {
    try {
        const [student] = await db.execute('SELECT Name FROM Students WHERE ID = ?', [studentID]);
        console.log(`[ALERT] Counselor Notified for ${student[0].Name}: ${type} - ${reason}`);
        
        await db.execute(
            'INSERT INTO Counselor_Alerts (Student_ID, Alert_Type, Reason) VALUES (?, ?, ?)',
            [studentID, type, reason]
        );

        // Also mock sending an email/message to the counselor
        await sendSMS(process.env.COUNSELOR_CONTACT || '+1-000-0000', `ALERT: Student ${student[0].Name} requires attention. Reason: ${reason}`);
    } catch (error) {
        console.error("Error triggering counselor alert:", error.message);
    }
}

// Utility function for Mock SMS
async function sendSMS(number, message) {
    console.log(`[SMS SENT to ${number}]: ${message}`);
    // In production, use axios.post(process.env.SMS_API_ENDPOINT, { number, message, key: process.env.SMS_API_KEY });
    return true;
}

module.exports = { logAttendance, generateMonthlyReport, analyzeStudentSentiment };
