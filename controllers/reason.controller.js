const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addReason = async (req, res) => {
  try {
    const { reason_lid } = req.body;

    const newReason = await pool.query(
      `INSERT INTO reason      
      (reason_lid) 
      VALUES ($1) RETURNING*`,
      [reason_lid]
    );

    res.reason(201).json(newReason.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllReasons = async (_, res) => {
  try {
    const reasons = await pool.query(`SELECT * FROM reason`);
    return res.reason(200).json(reasons.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getReasonById = async (req, res) => {
  try {
    const { id } = req.params;
    const reason = await pool.query(`SELECT * FROM reason WHERE id = $1`, [id]);

    if (reason.rows.length === 0) {
      return res.reason(404).json({ message: "Reason not found" });
    }

    res.reason(200).json(reason.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateReasonById = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason_lid } = req.body;

    const Newreason = await pool.query(
      `UPDATE reason SET reason_lid = $1 WHERE id=$2 RETURNING *`,
      [reason_lid, id]
    );

    res.reason(200).json(Newreason.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteReasonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.reason(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM reason WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.reason(404).json({ message: "Reason not found" });
    }

    return res.reason(200).json({
      message: "Reason deleted successfully",
      deletedReason: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addReason,
  getAllReasons,
  getReasonById,
  updateReasonById,
  deleteReasonById,
};
