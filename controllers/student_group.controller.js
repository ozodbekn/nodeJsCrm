const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addStudentGroup = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;

    const newStudentGroup = await pool.query(
      `INSERT INTO student_group      
      (    student_id, group_id) 
      VALUES ($1, $2) RETURNING*`,
      [student_id, group_id]
    );

    res.status(201).json(newStudentGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudentGroups = async (_, res) => {
  try {
    const student_groups = await pool.query(`SELECT * FROM student_group`);
    return res.status(200).json(student_groups.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const student_group = await pool.query(
      `SELECT * FROM student_group WHERE id = $1`,
      [id]
    );

    if (student_group.rows.length === 0) {
      return res.status(404).json({ message: "StudentGroup not found" });
    }

    res.status(200).json(student_group.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, group_id } = req.body;

    const Newstudent_group = await pool.query(
      `UPDATE student_group SET       
      student_id = $1, group_id = $2
      WHERE id=$3 RETURNING *`,
      [student_id, group_id]
    );

    res.status(200).json(Newstudent_group.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM student_group WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "StudentGroup not found" });
    }

    return res.status(200).json({
      message: "StudentGroup deleted successfully",
      deletedStudentGroup: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudentGroup,
  getAllStudentGroups,
  getStudentGroupById,
  updateStudentGroupById,
  deleteStudentGroupById,
};
