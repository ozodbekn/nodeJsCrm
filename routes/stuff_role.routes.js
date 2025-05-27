const {
  getAllStuffRoles,
  addStuffRole,
  getStuffRoleById,
  updateStuffRoleById,
  deleteStuffRoleById,
} = require("../controllers/stuff_role.controller");

const router = require("express").Router();

router.post("/", addStuffRole);
router.get("/", getAllStuffRoles);
router.get("/:id", getStuffRoleById);
router.put("/:id", updateStuffRoleById);
router.delete("/:id", deleteStuffRoleById);

module.exports = router;
