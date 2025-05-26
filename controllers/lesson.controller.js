const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");

const addLesson = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const newLesson = await pool.query(
      `INSERT INTO lesson      
      ( lesson_theme, lesson_number, group_id, lesson_date) 
      VALUES ($1, $2, $3, $4) RETURNING*`,
      [lesson_theme, lesson_number, group_id, lesson_date]
    );

    res.status(201).json(newLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLessons = async (_, res) => {
  try {
    const lessons = await pool.query(`SELECT * FROM lesson`);
    return res.status(200).json(lessons.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await pool.query(`SELECT * FROM lesson WHERE id = $1`, [id]);

    if (lesson.rows.length === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const Newlesson = await pool.query(
      `UPDATE lesson SET       
      lesson_theme = $1, lesson_number = $2, group_id = $3, lesson_date = $4
      WHERE id=5 RETURNING *`,
      [lesson_theme, lesson_number, group_id, lesson_date, id]
    );

    res.status(200).json(Newlesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM lesson WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    return res.status(200).json({
      message: "Lesson deleted successfully",
      deletedLesson: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById,
};
