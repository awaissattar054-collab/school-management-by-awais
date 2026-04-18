# 🎓 AI School Manager Pro

A modern, AI-powered School Management System featuring real-time student sentiment tracking, automated parental notifications, and a premium administrative dashboard.

## 🚀 Key Features

### 🧠 Student Sentiment Tracker (AI-Powered)
- **Deep Analysis**: Uses **Google Gemini Pro** to analyze teacher remarks and exam scores.
- **Happiness & Growth Chart**: Interactive visual trends of student well-being.
- **Counselor Alerts**: Automatic risk detection for sharp drops in sentiment or performance.

### 📝 Smart Attendance System
- **Teacher Portal**: Easy interface to mark Attendance (Present/Absent/Late).
- **Automated Notifications**: Instant simulated WhatsApp/SMS alerts for parents when a student is absent.
- **Notification Logs**: Complete history of all outgoing alerts.

### 📊 Modern Admin Dashboard
- **Rich Aesthetics**: Mint Green and Navy Blue theme with Glassmorphism effects.
- **Shareable Achievements**: One-click generation of branded certificate cards for parents to share on social media.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **AI**: Google Generative AI (Gemini API)
- **Frontend**: Vanilla JS, Chart.js, HTML5 Canvas, CSS Grid/Flexbox

## 🚦 Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/school-management-ai.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment**:
   Create a `.env` file and add your credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=school_management
   GEMINI_API_KEY=your_api_key_here
   ```
4. **Initialize Database**:
   Import `schema.sql` and `seed.sql` into your MySQL instance.
5. **Run the App**:
   ```bash
   node server.js
   ```

---
*Created with ❤️ by Awais*
