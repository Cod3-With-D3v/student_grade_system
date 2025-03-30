// Get student ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// DOM Elements
const studentNameEl = document.getElementById('studentName');
const studentIdEl = document.getElementById('studentId');
const studentAvgGradeEl = document.getElementById('studentAvgGrade');
const studentAttendanceEl = document.getElementById('studentAttendance');
const assignmentHistoryEl = document.getElementById('assignmentHistory');
const performanceChart = document.getElementById('performanceChart');

// Initialize the page
function initializeStudentDetails() {
    if (!studentId) {
        window.location.href = 'index.html';
        return;
    }

    const student = getStudentById(parseInt(studentId));
    if (!student) {
        window.location.href = 'index.html';
        return;
    }

    displayStudentInfo(student);
    displayAssignmentHistory(student);
    createPerformanceChart(student);
}

// Display student information
function displayStudentInfo(student) {
    studentNameEl.textContent = student.name;
    studentIdEl.textContent = student.id;
    studentAvgGradeEl.textContent = `${student.averageGrade}%`;
    studentAttendanceEl.textContent = `${student.attendance}%`;
}

// Display assignment history
function displayAssignmentHistory(student) {
    assignmentHistoryEl.innerHTML = '';
    student.assignments.forEach(assignment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${assignment.name}</td>
            <td>${assignment.date}</td>
            <td>${assignment.grade}%</td>
            <td><span class="badge badge-${assignment.status}">${assignment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewSubmission('${assignment.name}')">
                    <i class="fas fa-file-alt"></i> View
                </button>
            </td>
        `;
        assignmentHistoryEl.appendChild(row);
    });
}

// Create performance chart
function createPerformanceChart(student) {
    const ctx = performanceChart.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: student.assignments.map(a => a.name),
            datasets: [{
                label: 'Assignment Grades',
                data: student.assignments.map(a => a.grade),
                borderColor: '#0d6efd',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// View submission (placeholder function)
function viewSubmission(assignmentName) {
    alert(`Viewing submission for ${assignmentName}`);
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', initializeStudentDetails);
