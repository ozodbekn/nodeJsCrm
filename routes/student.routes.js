const {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/student.controller");

const router = require("express").Router();

router.post("/", addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudentById);
router.delete("/:id", deleteStudentById);

module.exports = router;
