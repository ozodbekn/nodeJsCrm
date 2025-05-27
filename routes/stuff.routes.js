const {
  getAllStuffs,
  addStuff,
  getStuffById,
  updateStuffById,
  deleteStuffById,
} = require("../controllers/stuff.controller");

const router = require("express").Router();

router.post("/", addStuff);
router.get("/", getAllStuffs);
router.get("/:id", getStuffById);
router.put("/:id", updateStuffById);
router.delete("/:id", deleteStuffById);

module.exports = router;
