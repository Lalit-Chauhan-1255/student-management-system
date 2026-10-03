const form = document.getElementById("studentForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        dob: document.getElementById("dob").value,

        gender: document.getElementById("gender").value,

        address: document.getElementById("address").value,

        rollNumber:
            document.getElementById("rollNumber").value,

        course:
            document.getElementById("course").value,

        semester:
            document.getElementById("semester").value,

        marks:
            document.getElementById("marks").value || 0,

        attendance:
            document.getElementById("attendance").value || 0
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/students",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Student registered successfully");

            form.reset();

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert("Server error");

    }
});