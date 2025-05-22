const {
  addStage,
  getAllStages,
  getStageById,
  updateStageById,
  deleteStageById,
} = require("../controllers/stage.controller");

const router = require("express").Router();

router.get("/", getAllStages);
router.post("/", addStage);
router.get("/:id", getStageById);
router.put("/:id", updateStageById);
router.delete("/:id", deleteStageById);

module.exports = router;
