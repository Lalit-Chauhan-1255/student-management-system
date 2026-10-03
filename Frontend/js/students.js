const API_URL = "http://localhost:5000/api/students";

let allStudents = [];

async function loadStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load students");
        }

        allStudents = await response.json();

        displayStudents(allStudents);

    } catch (error) {
        console.error(error);
        alert("Unable to load students");
    }
}

function displayStudents(students) {
    const studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = "<p>No students found.</p>";
        return;
    }

    students.forEach(student => {
        const div = document.createElement("div");

        div.className = "student-card";

        div.innerHTML = `
            <h3>${student.name}</h3>

            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Phone:</strong> ${student.phone}</p>
            <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
            <p><strong>Course:</strong> ${student.course}</p>
            <p><strong>Semester:</strong> ${student.semester}</p>
            <p><strong>Marks:</strong> ${student.marks}</p>
            <p><strong>Attendance:</strong> ${student.attendance}%</p>
            <p><strong>Gender:</strong> ${student.gender}</p>
            <p><strong>Address:</strong> ${student.address}</p>

            <button onclick="editStudent('${student._id}')">
                Edit
            </button>

            <button onclick="deleteStudent('${student._id}')">
                Delete
            </button>
        `;

        studentList.appendChild(div);
    });
}


/* SEARCH STUDENTS */

function searchStudents() {
    const searchValue = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    if (searchValue === "") {
        displayStudents(allStudents);
        return;
    }

    const filteredStudents = allStudents.filter(student => {
        return (
            student.name.toLowerCase().includes(searchValue) ||
            student.email.toLowerCase().includes(searchValue) ||
            student.phone.includes(searchValue) ||
            student.rollNumber.toLowerCase().includes(searchValue) ||
            student.course.toLowerCase().includes(searchValue)
        );
    });

    displayStudents(filteredStudents);
}


/* FILTER STUDENTS */

function filterStudents() {
    const course = document.getElementById("courseFilter").value;
    const semester = document.getElementById("semesterFilter").value;
    const gender = document.getElementById("genderFilter").value;

    const filteredStudents = allStudents.filter(student => {

        const courseMatch =
            course === "" || student.course === course;

        const semesterMatch =
            semester === "" ||
            String(student.semester) === semester;

        const genderMatch =
            gender === "" || student.gender === gender;

        return courseMatch && semesterMatch && genderMatch;
    });

    displayStudents(filteredStudents);
}


/* EDIT STUDENT */

function editStudent(id) {
    window.location.href = `edit-student.html?id=${id}`;
}


/* DELETE STUDENT */

async function deleteStudent(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Delete failed");
        }

        alert("Student deleted successfully");

        loadStudents();

    } catch (error) {
        console.error(error);
        alert("Delete error: " + error.message);
    }
}


/* LOAD STUDENTS WHEN PAGE OPENS */

loadStudents();