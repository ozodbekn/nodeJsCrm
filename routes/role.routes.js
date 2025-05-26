const {
  addRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
} = require("../controllers/role.controller");

const router = require("express").Router();

router.get("/", getAllRoles);
router.post("/", addRole);
router.get("/:id", getRoleById);
router.put("/:id", updateRoleById);
router.delete("/:id", deleteRoleById);

module.exports = router;

