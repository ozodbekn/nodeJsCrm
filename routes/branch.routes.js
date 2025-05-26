const {
  addBranch,
  getAllBranchs,
  getBranchById,
  updateBranchById,
  deleteBranchById,
} = require("../controllers/branch.controller");

const router = require("express").Router();

router.get("/", getAllBranchs);
router.post("/", addBranch);
router.get("/:id", getBranchById);
router.put("/:id", updateBranchById);
router.delete("/:id", deleteBranchById);

module.exports = router;
