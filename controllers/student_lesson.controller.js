const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addStudentLesson = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const newStudentLesson = await pool.query(
      `INSERT INTO student_lesson      
      (     lesson_id,student_id, is_there, reason, be_paid) 
      VALUES ($1, $2, $3, $4, $5) RETURNING*`,
      [lesson_id, student_id, is_there, reason, be_paid]
    );

    res.status(201).json(newStudentLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudentLessons = async (_, res) => {
  try {
    const student_lessons = await pool.query(`SELECT * FROM student_lesson`);
    return res.status(200).json(student_lessons.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getStudentLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const student_lesson = await pool.query(
      `SELECT * FROM student_lesson WHERE id = $1`,
      [id]
    );

    if (student_lesson.rows.length === 0) {
      return res.status(404).json({ message: "StudentLesson not found" });
    }

    res.status(200).json(student_lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const Newstudent_lesson = await pool.query(
      `UPDATE student_lesson SET       
      lesson_id = $1,student_id = $2, is_there = $3, reason = $4, be_paid = $5
      WHERE id=$6 RETURNING *`,
      [lesson_id, student_id, is_there, reason, be_paid, id]
    );

    res.status(200).json(Newstudent_lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM student_lesson WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "StudentLesson not found" });
    }

    return res.status(200).json({
      message: "StudentLesson deleted successfully",
      deletedStudentLesson: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudentLesson,
  getAllStudentLessons,
  getStudentLessonById,
  updateStudentLessonById,
  deleteStudentLessonById,
};
