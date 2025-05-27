const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addStuff = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;

    const newStuff = await pool.query(
      `INSERT INTO stuff      
      (
      first_name,
      last_name,
      phone_number,
      login,
      parol,
      is_active
      ) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING*`,
      [first_name, last_name, phone_number, login, parol, is_active]
    );

    res.status(201).json(newStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStuffs = async (_, res) => {
  try {
    const stuffs = await pool.query(`SELECT * FROM stuff`);
    return res.status(200).json(stuffs.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const stuff = await pool.query(`SELECT * FROM stuff WHERE id = $1`, [id]);

    if (stuff.rows.length === 0) {
      return res.status(404).json({ message: "Stuff not found" });
    }

    res.status(200).json(stuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;

    const Newstuff = await pool.query(
      `UPDATE stuff SET       
      first_name = $1,
      last_name = $2,
      phone_number = $3,
      parol = $4,
      parol = $5,
      is_active = $6,
      WHERE id=$7 RETURNING *`,
      [first_name, last_name, phone_number, login, parol, is_active, id]
    );

    res.status(200).json(Newstuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM stuff WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Stuff not found" });
    }

    return res.status(200).json({
      message: "Stuff deleted successfully",
      deletedStuff: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStuff,
  getAllStuffs,
  getStuffById,
  updateStuffById,
  deleteStuffById,
};
