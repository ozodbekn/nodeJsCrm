const {
  getAllStudentLessons,
  addStudentLesson,
  getStudentLessonById,
  updateStudentLessonById,
  deleteStudentLessonById,
} = require("../controllers/student_lesson.controller");

const router = require("express").Router();

router.post("/", addStudentLesson);
router.get("/", getAllStudentLessons);
router.get("/:id", getStudentLessonById);
router.put("/:id", updateStudentLessonById);
router.delete("/:id", deleteStudentLessonById);

module.exports = router;
