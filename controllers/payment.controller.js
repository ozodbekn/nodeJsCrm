const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addPayment = async (req, res) => {
  try {
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attend,
    } = req.body;

    const newPayment = await pool.query(
      `INSERT INTO payment(          
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid, 
      total_attend
    ) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING*`,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attend,
      ]
    );

    res.status(201).json(newPayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllPayments = async (_, res) => {
  try {
    const payments = await pool.query(`SELECT * FROM payment`);
    return res.status(200).json(payments.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await pool.query(`SELECT * FROM payment WHERE id = $1`, [
      id,
    ]);

    if (payment.rows.length === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attend,
    } = req.body;

    const Newpayment = await pool.query(
      `UPDATE payment SET       
      student_id = $1,
      payment_last_date = $2,
      payment_date = $3,
      price = $4,
      is_paid = $5, 
      total_attend = $6
    
      WHERE id=$7 RETURNING *`,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attend,
        id,
      ]
    );

    res.status(200).json(Newpayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM payment WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({
      message: "Payment deleted successfully",
      deletedPayment: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
