const { newOtp, verifyOtp } = require("../controllers/otp.controller");

const router = require("express").Router();

router.post("/new", newOtp);
router.post("/verifyClient", verifyOtp);
module.exports = router;
