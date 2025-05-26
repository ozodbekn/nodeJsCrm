const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_group_id,
      trial_lesson_time,
      lid_status_id,
      cancel_reason_id,
    } = req.body;

    const newLid = await pool.query(
      `INSERT INTO lid      
      (      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_group_id,
      trial_lesson_time,
      lid_status_id,
      cancel_reason_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING*`,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_group_id,
        trial_lesson_time,
        lid_status_id,
        cancel_reason_id,
      ]
    );

    res.status(201).json(newLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLids = async (_, res) => {
  try {
    const lids = await pool.query(`SELECT * FROM lid`);
    return res.status(200).json(lids.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getLidById = async (req, res) => {
  try {
    const { id } = req.params;
    const lid = await pool.query(`SELECT * FROM lid WHERE id = $1`, [id]);

    if (lid.rows.length === 0) {
      return res.status(404).json({ message: "Lid not found" });
    }

    res.status(200).json(lid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLidById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_group_id,
      trial_lesson_time,
      lid_status_id,
      cancel_reason_id,
    } = req.body;

    const Newlid = await pool.query(
      `UPDATE lid SET       
      first_name = $1,
      last_name = $2,
      phone_number = $3,
      target_id = $4,
      lid_stage_id = $5,
      test_date = $6,
      trial_lesson_date = $7,
      trial_lesson_group_id = $8,
      trial_lesson_time = $9,
      lid_status_id = $10,
      cancel_reason_id = $11
      WHERE id=$12 RETURNING *`,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_group_id,
        trial_lesson_time,
        lid_status_id,
        cancel_reason_id,
        id,
      ]
    );

    res.status(200).json(Newlid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteLidById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM lid WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Lid not found" });
    }

    return res.status(200).json({
      message: "Lid deleted successfully",
      deletedLid: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addLid,
  getAllLids,
  getLidById,
  updateLidById,
  deleteLidById,
};
