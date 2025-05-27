const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addGroupStuff = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;

    const newGroupStuff = await pool.query(
      `INSERT INTO group_stuff      
      ( group_id, stuff_id ) 
      VALUES ($1, $2) RETURNING*`,
      [group_id, stuff_id]
    );

    res.status(201).json(newGroupStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllGroupStuffs = async (_, res) => {
  try {
    const group_stuffs = await pool.query(`SELECT * FROM group_stuff`);
    return res.status(200).json(group_stuffs.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getGroupStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const group_stuff = await pool.query(
      `SELECT * FROM group_stuff WHERE id = $1`,
      [id]
    );

    if (group_stuff.rows.length === 0) {
      return res.status(404).json({ message: "GroupStuff not found" });
    }

    res.status(200).json(group_stuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateGroupStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const { group_id, stuff_id } = req.body;

    const Newgroup_stuff = await pool.query(
      `
      UPDATE group_stuff SET       
      group_id = $1,
      stuff_id = $2
      WHERE id=$3 RETURNING *`,
      [group_id, stuff_id, id]
    );

    res.status(200).json(Newgroup_stuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteGroupStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM group_stuff WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "GroupStuff not found" });
    }

    return res.status(200).json({
      message: "GroupStuff deleted successfully",
      deletedGroupStuff: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addGroupStuff,
  getAllGroupStuffs,
  getGroupStuffById,
  updateGroupStuffById,
  deleteGroupStuffById,
};
