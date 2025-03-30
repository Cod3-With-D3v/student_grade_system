// DOM Elements
const studentTableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const totalStudentsEl = document.getElementById('totalStudents');
const avgGradeEl = document.getElementById('avgGrade');
const totalAssignmentsEl = document.getElementById('totalAssignments');

// Initialize the dashboard
function initializeDashboard() {
    updateStats();
    renderStudentTable(students);
    setupEventListeners();
}

// Update statistics
function updateStats() {
    const stats = getClassStats();
    totalStudentsEl.textContent = stats.totalStudents;
    avgGradeEl.textContent = stats.avgGrade;
    totalAssignmentsEl.textContent = stats.totalAssignments;
}

// Render student table
function renderStudentTable(studentsToRender) {
    studentTableBody.innerHTML = '';
    studentsToRender.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.averageGrade}%</td>
            <td>${student.attendance}%</td>
            <td>${student.assignmentsCompleted}</td>
            <td>
                <a href="student-details.html?id=${student.id}" class="btn">
                    <i class="fas fa-eye"></i> View
                </a>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(searchTerm)
        );
        renderStudentTable(filteredStudents);
    });

    // Sorting functionality
    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        const sortedStudents = [...students].sort((a, b) => {
            switch(sortBy) {
                case 'grade':
                    return b.averageGrade - a.averageGrade;
                case 'attendance':
                    return b.attendance - a.attendance;
                default:
                    return a.name.localeCompare(b.name);
            }
        });
        renderStudentTable(sortedStudents);
    });
}

function filterByGrade() {
    let gradeFilterInput = document.getElementById("gradeFilterInput");
    let gradeThreshold = parseFloat(gradeFilterInput.value);
    let rows = document.querySelectorAll("#studentTableBody tr");

    rows.forEach(row => {
        let gradeCell = row.querySelector("td:nth-child(2)"); // Selects the grade column
        if (gradeCell) {
            let studentGrade = parseFloat(gradeCell.textContent);
            if (isNaN(gradeThreshold)) {
                row.style.display = ""; // Show all rows if input is empty or invalid
            } else {
                row.style.display = studentGrade >= gradeThreshold ? "" : "none";
            }
        }
    });
}


// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', initializeDashboard);
