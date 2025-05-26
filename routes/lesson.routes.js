const {
  getAllLessons,
  addLesson,
  getLessonById,
  updateLessonById,
  deleteLessonById,
} = require("../controllers/lesson.controller");

const router = require("express").Router();

router.post("/", addLesson);
router.get("/", getAllLessons);
router.get("/:id", getLessonById);
router.put("/:id", updateLessonById);
router.delete("/:id", deleteLessonById);

module.exports = router;
