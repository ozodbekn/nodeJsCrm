const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addStudent = async (req, res) => {
  try {
    const { lid_id, first_name, last_name, phone_number, birthday, gender } =
      req.body;

    const newStudent = await pool.query(
      `INSERT INTO student(
      lid_id,
      first_name,
      last_name,
      phone_number,
      birthday, 
      gender) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING*`,
      [lid_id, first_name, last_name, phone_number, birthday, gender]
    );

    res.status(201).json(newStudent.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudents = async (_, res) => {
  try {
    const students = await pool.query(`SELECT * FROM student`);
    return res.status(200).json(students.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await pool.query(`SELECT * FROM student WHERE id = $1`, [
      id,
    ]);

    if (student.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lid_id, first_name, last_name, phone_number, birthday, gender } =
      req.body;

    const Newstudent = await pool.query(
      `UPDATE student SET       
      lid_id = $1,
      first_name = $2,
      last_name = $3,
      phone_number = $4,
      birthday = $5, 
      gender = $6
      WHERE id=$7 RETURNING *`,
      [lid_id, first_name, last_name, phone_number, birthday, gender, id]
    );

    res.status(200).json(Newstudent.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM student WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
