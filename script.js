let sentimentChart;
const ctx = document.getElementById('sentimentChart').getContext('2d');

// Initialize the chart
function initChart(data) {
    if (sentimentChart) {
        sentimentChart.destroy();
    }

    sentimentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(log => log.date),
            datasets: [{
                label: 'Happiness & Growth',
                data: data.map(log => log.score),
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#2ecc71',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { display: false }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Score: ${context.parsed.y}%`;
                        }
                    }
                }
            }
        }
    });
}

// Fetch sentiment data with Fallback
async function fetchSentimentData(studentID) {
    try {
        const response = await fetch(`/api/student/${studentID}/sentiment-logs`);
        if (!response.ok) throw new Error("API Offline");
        const logs = await response.json();
        
        if (logs.length > 0) {
            initChart(logs);
            updateBadge(logs[logs.length - 1].level);
        } else {
            showMockSentiment();
        }
    } catch (error) {
        console.warn("Database connection unavailable. Showing professional demo data.");
        showMockSentiment();
    }
}

function showMockSentiment() {
    const mockData = [
        { date: '2026-04-10', score: 85, level: 'Happy' },
        { date: '2026-04-12', score: 78, level: 'Happy' },
        { date: '2026-04-15', score: 92, level: 'Very Happy' }
    ];
    initChart(mockData);
    updateBadge('Very Happy');
}

// Fetch Students with Fallback
async function fetchStudents() {
    try {
        const response = await fetch('/api/students');
        if (!response.ok) throw new Error("API Offline");
        const students = await response.json();
        renderStudentList(students);
    } catch (error) {
        const mockStudents = [
            { ID: 1, Name: 'Alice Johnson', Grade: '10th' },
            { ID: 2, Name: 'Bob Smith', Grade: '10th' },
            { ID: 3, Name: 'Charlie Brown', Grade: '9th' }
        ];
        renderStudentList(mockStudents);
    }
}

function renderStudentList(students) {
    const list = document.getElementById('attendanceList');
    list.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${student.Name}</strong></td>
            <td><span class="tag info">${student.Grade}</span></td>
            <td>
                <button class="attendance-btn btn-present" onclick="markAttendance(${student.ID}, 'Present')">Present</button>
                <button class="attendance-btn btn-absent" onclick="markAttendance(${student.ID}, 'Absent')">Absent</button>
            </td>
        `;
        list.appendChild(row);
    });
}

function updateBadge(level) {
    const badge = document.getElementById('currentSentiment');
    const tag = badge.querySelector('.tag');
    tag.textContent = level;
    tag.className = 'tag ' + level.toLowerCase().replace(' ', '-');
}

// Student selection change
document.getElementById('studentSelect').addEventListener('change', (e) => {
    fetchSentimentData(e.target.value);
});

// Modal Logic
const modal = document.getElementById('shareModal');
const shareBtn = document.getElementById('shareBtn');
const closeBtn = document.getElementsByClassName('close')[0];

shareBtn.onclick = function() {
    const studentName = document.getElementById('studentSelect').selectedOptions[0].text;
    const score = sentimentChart.data.datasets[0].data[sentimentChart.data.datasets[0].data.length - 1];
    
    drawAchievement(studentName, score);
    modal.style.display = "block";
}

function drawAchievement(name, score) {
    const canvas = document.getElementById('achievementCanvas');
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#2ecc71';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Header
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 30px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF PROGRESS', canvas.width/2, 60);
    
    // Logo Icon (Mock)
    ctx.fillStyle = '#2ecc71';
    ctx.font = '50px FontAwesome';
    ctx.fillText('\uf19d', canvas.width/2, 120); 
    
    // Content
    ctx.fillStyle = '#34495e';
    ctx.font = '24px Outfit';
    ctx.fillText('This is to certify that', canvas.width/2, 180);
    
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 36px Outfit';
    ctx.fillText(name.toUpperCase(), canvas.width/2, 230);
    
    ctx.fillStyle = '#34495e';
    ctx.font = '20px Outfit';
    ctx.fillText(`has achieved a "Happiness & Growth" score of`, canvas.width/2, 280);
    
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 48px Outfit';
    ctx.fillText(`${score}%`, canvas.width/2, 340);
    
    // Footer
    ctx.fillStyle = '#bdc3c7';
    ctx.font = '14px Outfit';
    ctx.fillText('Issued by EduAdmin AI - Smart School Management', canvas.width/2, 380);
}

function downloadAchievement() {
    const canvas = document.getElementById('achievementCanvas');
    const link = document.createElement('a');
    link.download = 'achievement-card.png';
    link.href = canvas.toDataURL();
    link.click();
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Section Navigation
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Find the link and its parent li to mark as active
    const link = document.querySelector(`a[onclick="showSection('${sectionName}')"]`);
    if (link) link.parentElement.classList.add('active');

    if (sectionName === 'attendance') fetchStudents();
    if (sectionName === 'students') populateStudents();
    if (sectionName === 'fees') populateFees();
    if (sectionName === 'sentiment') populateSentimentDetail();
    if (sectionName === 'messages') populateChatList();
}

function populateStudents() {
    const list = document.getElementById('studentDirectoryList');
    list.innerHTML = '';
    const mocks = [
        { name: 'Alice Johnson', grade: '10th', parent: 'Robert Johnson', status: 'Active' },
        { name: 'Bob Smith', grade: '10th', parent: 'Martha Smith', status: 'On Probation' },
        { name: 'Charlie Brown', grade: '9th', parent: 'David Brown', status: 'Active' },
        { name: 'Diana Prince', grade: '11th', parent: 'Hippolyta Prince', status: 'Active' }
    ];
    mocks.forEach(s => {
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${s.name}</strong></td><td>${s.grade}</td><td>${s.parent}</td><td><span class="tag ${s.status === 'Active' ? 'happy' : 'sad'}">${s.status}</span></td>`;
        list.appendChild(row);
    });
}

function populateFees() {
    const list = document.getElementById('feeList');
    list.innerHTML = '';
    const mocks = [
        { id: '#INV-001', student: 'Alice Johnson', amount: '$500', status: 'Paid' },
        { id: '#INV-002', student: 'Bob Smith', amount: '$450', status: 'Pending' },
        { id: '#INV-003', student: 'Charlie Brown', amount: '$550', status: 'Overdue' }
    ];
    mocks.forEach(f => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${f.id}</td><td>${f.student}</td><td>${f.amount}</td><td><span class="tag ${f.status === 'Paid' ? 'happy' : 'sad'}">${f.status}</span></td>`;
        list.appendChild(row);
    });
}

function populateSentimentDetail() {
    const content = document.getElementById('sentimentDetailContent');
    content.innerHTML = `
        <div class="sentiment-detail-card" style="margin-top:20px; padding:20px; background:var(--mint-light); border-radius:15px;">
            <h4>AI Cognitive Report (Sample)</h4>
            <p style="margin:10px 0;"><strong>Emotional Baseline:</strong> Stable - High Enthusiasm</p>
            <p><strong>Social Integration Score:</strong> 88% (Exceeds Peers)</p>
            <p><strong>Growth Trend:</strong> Upward (Positive reinforcement recommended)</p>
            <div style="margin-top:15px; font-style:italic;">"Student exhibits strong leadership in group settings but requires more complex challenges in math."</div>
        </div>
    `;
}

function populateChatList() {
    const list = document.getElementById('chatList');
    list.innerHTML = '';
    const chats = [
        { name: 'Parent: Alice', lastMsg: 'Thank you for the update!' },
        { name: 'Parent: Bob', lastMsg: 'Why was he absent?' },
        { name: 'Parent: Charlie', lastMsg: 'I will pay the fee soon.' }
    ];
    chats.forEach(c => {
        const item = document.createElement('div');
        item.className = 'chat-list-item';
        item.innerHTML = `<div><strong>${c.name}</strong><p style="font-size:0.8rem;color:gray;">${c.lastMsg}</p></div>`;
        item.onclick = () => {
            document.getElementById('activeChatName').textContent = c.name;
        };
        list.appendChild(item);
    });
}

// Fetch Students for Attendance
async function fetchStudents() {
    try {
        const response = await fetch('/api/students');
        const students = await response.json();
        const list = document.getElementById('attendanceList');
        list.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.Name}</td>
                <td>${student.Grade}</td>
                <td>
                    <button class="attendance-btn btn-present" onclick="markAttendance(${student.ID}, 'Present')">Present</button>
                    <button class="attendance-btn btn-absent" onclick="markAttendance(${student.ID}, 'Absent')">Absent</button>
                    <button class="attendance-btn btn-late" onclick="markAttendance(${student.ID}, 'Late')">Late</button>
                </td>
            `;
            list.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

// Mark Attendance
async function markAttendance(studentID, status) {
    try {
        const response = await fetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentID, status })
        });
        const result = await response.json();

        if (status === 'Absent' && result.notification) {
            showToast(result.notification);
            addSimulatedMessage(result.notification);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error marking attendance:", error);
    }
}

// Notification Simulation
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function addSimulatedMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg sent';
    msgDiv.textContent = message;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initial Load
window.onload = () => {
    fetchSentimentData(1);
}
