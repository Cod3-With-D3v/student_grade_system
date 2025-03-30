// Sample student data
const students = [
    {
        id: 1,
        name: "Vijay Meena",
        averageGrade: 85,
        attendance: 95,
        assignmentsCompleted: 8,
        assignments: [
            { name: "Math Quiz 1", date: "2025-03-20", grade: 88, status: "submitted" },
            { name: "English Essay", date: "2025-03-15", grade: 92, status: "submitted" },
            { name: "Science Project", date: "2025-03-10", grade: 85, status: "submitted" }
        ]
    },
    {
        id: 2,
        name: "Utkarsh Tailor",
        averageGrade: 92,
        attendance: 98,
        assignmentsCompleted: 9,
        assignments: [
            { name: "Math Quiz 1", date: "2025-03-20", grade: 95, status: "submitted" },
            { name: "English Essay", date: "2025-03-15", grade: 90, status: "submitted" },
            { name: "Science Project", date: "2025-03-10", grade: 94, status: "submitted" }
        ]
    },
    {
        id: 3,
        name: "Annu Baby",
        averageGrade: 78,
        attendance: 85,
        assignmentsCompleted: 7,
        assignments: [
            { name: "Math Quiz 1", date: "2025-03-20", grade: 75, status: "submitted" },
            { name: "English Essay", date: "2025-03-15", grade: 82, status: "submitted" },
            { name: "Science Project", date: "2025-03-10", grade: 80, status: "late" }
        ]
    }
];

// Function to get student by ID
function getStudentById(id) {
    return students.find(student => student.id === parseInt(id));
}

// Function to calculate class statistics
function getClassStats() {
    const totalStudents = students.length;
    const avgGrade = students.reduce((sum, student) => sum + student.averageGrade, 0) / totalStudents;
    const totalAssignments = students[0].assignments.length;

    return {
        totalStudents,
        avgGrade: avgGrade.toFixed(1),
        totalAssignments
    };
}
