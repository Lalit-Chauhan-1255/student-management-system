const API_URL = "http://localhost:5000/api/students";

const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

const form = document.getElementById("editForm");

async function loadStudent() {
    try {
        const response = await fetch(`${API_URL}/${studentId}`);

        const student = await response.json();

        if (!response.ok) {
            throw new Error(student.message || "Student not found");
        }

        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("phone").value = student.phone;

        if (student.dob) {
            document.getElementById("dob").value =
                new Date(student.dob).toISOString().split("T")[0];
        }

        document.getElementById("gender").value = student.gender;
        document.getElementById("address").value = student.address;
        document.getElementById("rollNumber").value = student.rollNumber;
        document.getElementById("course").value = student.course;
        document.getElementById("semester").value = student.semester;
        document.getElementById("marks").value = student.marks;
        document.getElementById("attendance").value = student.attendance;

    } catch (error) {
        console.error(error);
        alert("Unable to load student: " + error.message);
    }
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const updatedStudent = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value,
        rollNumber: document.getElementById("rollNumber").value,
        course: document.getElementById("course").value,
        semester: Number(document.getElementById("semester").value),
        marks: Number(document.getElementById("marks").value) || 0,
        attendance: Number(document.getElementById("attendance").value) || 0
    };

    try {
        const response = await fetch(`${API_URL}/${studentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedStudent)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Update failed");
        }

        alert("Student updated successfully!");

        window.location.href = "students.html";

    } catch (error) {
        console.error(error);
        alert("Update error: " + error.message);
    }
});

loadStudent();