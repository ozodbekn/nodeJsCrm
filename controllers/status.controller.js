const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const newStatus = await pool.query(
      `INSERT INTO status      
      (name) 
      VALUES ($1) RETURNING*`,
      [name]
    );

    res.status(201).json(newStatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStatus = async (_, res) => {
  try {
    const statuss = await pool.query(`SELECT * FROM status`);
    return res.status(200).json(statuss.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await pool.query(`SELECT * FROM status WHERE id = $1`, [id]);

    if (status.rows.length === 0) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json(status.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const Newstatus = await pool.query(
      `UPDATE status SET name = $1  WHERE id=$2 RETURNING *`,
      [name, id]
    );

    res.status(200).json(Newstatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM status WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Status not found" });
    }

    return res.status(200).json({
      message: "Status deleted successfully",
      deletedStatus: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStatus,
  getAllStatus,
  getStatusById,
  updateStatusById,
  deleteStatusById,
};
