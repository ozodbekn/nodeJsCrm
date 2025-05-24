const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addBranch = async (req, res) => {
  try {
    const { name, address, phone_number } = req.body;

    const newBranch = await pool.query(
      `INSERT INTO "branch"      
      (name, address, phone_number) 
      VALUES ($1, $2, $3) RETURNING*`,
      [name, address, phone_number]
    );

    res.status(201).json(newBranch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllBranchs = async (_, res) => {
  try {
    const branchs = await pool.query(`SELECT * FROM branch`);
    return res.status(200).json(branchs.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await pool.query(`SELECT * FROM branch WHERE id = $1`, [id]);

    if (branch.rows.length === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.branch(200).json(branch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone_number } = req.body;

    const Newbranch = await pool.query(
      `UPDATE branch SET name = $1, address = $2, phone_number = $3 WHERE id=$4 RETURNING *`,
      [name, address, phone_number, id]
    );

    res.status(200).json(Newbranch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM branch WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    return res.status(200).json({
      message: "Branch deleted successfully",
      deletedBranch: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBranch,
  getAllBranchs,
  getBranchById,
  updateBranchById,
  deleteBranchById,
};
