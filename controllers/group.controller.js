const { sendErrorResponse } = require("../helpers/send_error_response");
const pool = require("../config/db");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require("node-device-detector/helper");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});


const addGroup = async (req, res) => {
  try {
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lesson_week_day,
      stage_id,
      branch_id,
      room_frool,
      room,
      lessons_quantity,
    } = req.body;

    const newGroup = await pool.query(
      `INSERT INTO "group" (name, lesson_start_time, lesson_end_time , lesson_week_day, stage_id, branch_id, room_frool,room, lessons_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lesson_week_day,
        stage_id,
        branch_id,
        room_frool,
        room,
        lessons_quantity,
      ]
    );
    res.status(201).json(newGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllGroups = async (_, res) => {
  try {
    const groups = await pool.query(`SELECT * FROM group`);
    return res.status(200).json(groups.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await pool.query(`SELECT * FROM group WHERE id = $1`, [id]);

    if (group.rows.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lesson_week_day,
      stage_id,
      branch_id,
      room_frool,
      room,
      lessons_quantity,
    } = req.body;

    const Newgroup = await pool.query(
      `UPDATE "group" SET 
        name = $1,
        lesson_start_time = $2,
        lesson_end_time = $3,
        lesson_week_day = $4,
        stage_id = $5,
        branch_id = $6,
        room_frool = $7,
        room = $8,
        lessons_quantity = $9
       WHERE id = $10
       RETURNING *`,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lesson_week_day,
        stage_id,
        branch_id,
        room_frool,
        room,
        lessons_quantity,
        id,
      ]
    );

    res.status(200).json(Newgroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM group WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json({
      message: "Group deleted successfully",
      deletedGroup: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
};
