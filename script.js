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

// Fetch sentiment data for a specific student
async function fetchSentimentData(studentID) {
    try {
        const response = await fetch(`/api/student/${studentID}/sentiment-logs`);
        const logs = await response.json();
        
        if (logs.length > 0) {
            initChart(logs);
            const latest = logs[logs.length - 1];
            updateBadge(latest.level);
        } else {
            console.log("No logs found for this student.");
            initChart([{ date: 'No Data', score: 0 }]);
        }
    } catch (error) {
        console.error("Error fetching sentiment:", error);
    }
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
