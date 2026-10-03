const Student = require("../models/Student");

const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: "Student registered successfully",
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateStudent = async (req, res) => {
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

        res.status(200).json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const searchStudents = async (req, res) => {
    try {
        const { search } = req.query;

        const students = await Student.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { rollNumber: { $regex: search, $options: "i" } },
                { course: { $regex: search, $options: "i" } }
            ]
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const filterStudents = async (req, res) => {
    try {
        const { course, semester, gender } = req.query;

        let filter = {};

        if (course) {
            filter.course = course;
        }

        if (semester) {
            filter.semester = semester;
        }

        if (gender) {
            filter.gender = gender;
        }

        const students = await Student.find(filter);

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    searchStudents,
    filterStudents
};