const {
  addGroupStuff,
  getAllGroupStuffs,
  getGroupStuffById,
  updateGroupStuffById,
  deleteGroupStuffById,
} = require("../controllers/group_stuff.controller");

const router = require("express").Router();

router.post("/", addGroupStuff);
router.get("/", getAllGroupStuffs);
router.get("/:id", getGroupStuffById);
router.put("/:id", updateGroupStuffById);
router.delete("/:id", deleteGroupStuffById);

module.exports = router;
