const {
  addDevice,
  getAllDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
} = require("../controllers/device.controller");

const router = require("express").Router();

router.get("/", getAllDevices);
router.post("/", addDevice);
router.get("/:id", getDeviceById);
router.put("/:id", updateDeviceById);
router.delete("/:id", deleteDeviceById);

module.exports = router;
