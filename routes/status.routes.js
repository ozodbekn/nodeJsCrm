const {
  getAllStatus,
  addStatus,
  getStatusById,
  updateStatusById,
  deleteStatusById,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", addStatus);
router.get("/", getAllStatus);
router.get("/:id", getStatusById);
router.put("/:id", updateStatusById);
router.delete("/:id", deleteStatusById);

module.exports = router;
