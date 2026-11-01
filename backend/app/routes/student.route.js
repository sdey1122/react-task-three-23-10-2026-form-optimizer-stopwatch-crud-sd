const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const {
  validateStudent,
} = require("../middleware/validation/student.validation");

router.post("/", validateStudent, studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", validateStudent, studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
