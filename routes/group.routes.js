const {
  addGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
} = require("../controllers/group.controller");

const router = require("express").Router();

router.get("/", getAllGroups);
router.post("/", addGroup);
router.get("/:id", getGroupById);
router.put("/:id", updateGroupById);
router.delete("/:id", deleteGroupById);

module.exports = router;
