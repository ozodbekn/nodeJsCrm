const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addRole = async (req, res) => {
  try {
    const { name } = req.body;

    const newRole = await pool.query(
      `INSERT INTO role      
      (name) 
      VALUES ($1) RETURNING*`,
      [name]
    );

    res.status(201).json(newRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllRoles = async (_, res) => {
  try {
    const roles = await pool.query(`SELECT * FROM role`);
    return res.status(200).json(roles.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await pool.query(`SELECT * FROM role WHERE id = $1`, [id]);

    if (role.rows.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(role.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_lid } = req.body;

    const Newrole = await pool.query(
      `UPDATE role SET role_lid = $1 WHERE id=$2 RETURNING *`,
      [role_lid, id]
    );

    res.role(200).json(Newrole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM role WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({
      message: "Role deleted successfully",
      deletedRole: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
