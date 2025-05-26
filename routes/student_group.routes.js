const {
  getAllStudentGroups,
  addStudentGroup,
  getStudentGroupById,
  updateStudentGroupById,
  deleteStudentGroupById,
} = require("../controllers/student_group.controller");

const router = require("express").Router();

router.post("/", addStudentGroup);
router.get("/", getAllStudentGroups);
router.get("/:id", getStudentGroupById);
router.put("/:id", updateStudentGroupById);
router.delete("/:id", deleteStudentGroupById);

module.exports = router;
