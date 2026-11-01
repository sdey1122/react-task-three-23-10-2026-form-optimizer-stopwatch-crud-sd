const Student = require("../models/student.model");
const httpStatusCode = require("../utils/httpStatusCode");
class StudentController {
  async createStudent(req, res) {
    try {
      const { name, email, age, course } = req.body;
      if (!name || !email || age === undefined || !course)
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Name, email, age and course are required",
        });
      const student = await Student.create({ name, email, age, course });
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Student created successfully",
        data: student,
      });
    } catch (error) {
      return res
        .status(
          error.name === "ValidationError"
            ? httpStatusCode.BAD_REQUEST
            : httpStatusCode.SERVER_ERROR,
        )
        .json({ success: false, message: error.message });
    }
  }
  async getAllStudents(req, res) {
    try {
      const students = await Student.find().sort({ createdAt: -1 });
      return res
        .status(httpStatusCode.OK)
        .json({ success: true, count: students.length, data: students });
    } catch (error) {
      return res
        .status(httpStatusCode.SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
  async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      if (!student)
        return res
          .status(httpStatusCode.NOT_FOUND)
          .json({ success: false, message: "Student not found" });
      return res
        .status(httpStatusCode.OK)
        .json({ success: true, data: student });
    } catch (error) {
      return res
        .status(
          error.name === "CastError"
            ? httpStatusCode.BAD_REQUEST
            : httpStatusCode.SERVER_ERROR,
        )
        .json({ success: false, message: error.message });
    }
  }
  async updateStudent(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!student)
        return res
          .status(httpStatusCode.NOT_FOUND)
          .json({ success: false, message: "Student not found" });
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Student updated successfully",
        data: student,
      });
    } catch (error) {
      return res
        .status(
          error.name === "CastError" || error.name === "ValidationError"
            ? httpStatusCode.BAD_REQUEST
            : httpStatusCode.SERVER_ERROR,
        )
        .json({ success: false, message: error.message });
    }
  }
  async deleteStudent(req, res) {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student)
        return res
          .status(httpStatusCode.NOT_FOUND)
          .json({ success: false, message: "Student not found" });
      return res
        .status(httpStatusCode.OK)
        .json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
      return res
        .status(
          error.name === "CastError"
            ? httpStatusCode.BAD_REQUEST
            : httpStatusCode.SERVER_ERROR,
        )
        .json({ success: false, message: error.message });
    }
  }
}
module.exports = new StudentController();
