const {
  getAllPayments,
  addPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/", addPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentById);
router.delete("/:id", deletePaymentById);

module.exports = router;
