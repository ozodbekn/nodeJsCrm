const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addStuffRole = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;

    const newStuffRole = await pool.query(
      `INSERT INTO stuff_role      
      (stuff_id, role_id) 
      VALUES ($1, $2) RETURNING*`,
      [stuff_id, role_id]
    );

    res.status(201).json(newStuffRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStuffRoles = async (_, res) => {
  try {
    const stuff_roles = await pool.query(`SELECT * FROM stuff_role`);
    return res.status(200).json(stuff_roles.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getStuffRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const stuff_role = await pool.query(
      `SELECT * FROM stuff_role WHERE id = $1`,
      [id]
    );

    if (stuff_role.rows.length === 0) {
      return res.status(404).json({ message: "StuffRole not found" });
    }

    res.status(200).json(stuff_role.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStuffRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { stuff_id, role_id } = req.body;

    const Newstuff_role = await pool.query(
      `
    UPDATE stuff_role SET       
    stuff_id = $1,
    role_id = $2
    WHERE id=$3 RETURNING *
    `,
      [stuff_id, role_id, id]
    );

    res.status(200).json(Newstuff_role.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStuffRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM stuff_role WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "StuffRole not found" });
    }

    return res.status(200).json({
      message: "StuffRole deleted successfully",
      deletedStuffRole: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStuffRole,
  getAllStuffRoles,
  getStuffRoleById,
  updateStuffRoleById,
  deleteStuffRoleById,
};
