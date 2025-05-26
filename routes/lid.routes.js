const {
  getAllLids,
  addLid,
  getLidById,
  updateLidById,
  deleteLidById,
} = require("../controllers/lid.controller");

const router = require("express").Router();

router.post("/", addLid);
router.get("/", getAllLids);
router.get("/:id", getLidById);
router.put("/:id", updateLidById);
router.delete("/:id", deleteLidById);

module.exports = router;
