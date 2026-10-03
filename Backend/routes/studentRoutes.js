const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// Register student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();

        res.status(201).json({
            message: "Student registered successfully",
            student: savedStudent
        });
    } catch (error) {
        console.log("Registration error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });

        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Get one student
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Update student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully",
            student: student
        });
    } catch (error) {
        console.log("Update error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Delete student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        console.log("Delete error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;