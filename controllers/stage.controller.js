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

const addStage = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newStage = await pool.query(
      `INSERT INTO stage (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );

    res.status(201).json(newStage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStages = async (req, res) => {
  try {
    const userAgent = req.headers["user-agent"];
    console.log(userAgent);

    const result = detector.detect(userAgent);
    console.log("result parse:", result);
    console.log(DeviceHelper.isMobile(result));
    console.log(DeviceHelper.isSmartphone(result));
    console.log(DeviceHelper.isDesktop(result));
    console.log(DeviceHelper.isIOS(result));
    const stages = await pool.query(`SELECT * FROM stage`);
    return res.status(200).json(stages.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStageById = async (req, res) => {
  try {
    const { id } = req.params;
    const stage = await pool.query(`SELECT * FROM stage WHERE id = $1`, [id]);

    if (stage.rows.length === 0) {
      return res.status(404).json({ message: "Stage not found" });
    }

    res.status(200).json(stage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const Newstage = await pool.query(
      `UPDATE stage SET name = $1, description = $2 WHERE id=$3 RETURNING *`,
      [name, description, id]
    );

    res.status(200).json(Newstage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStageById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM stage WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Stage not found" });
    }

    return res.status(200).json({
      message: "Stage deleted successfully",
      deletedStage: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStage,
  getAllStages,
  getStageById,
  updateStageById,
  deleteStageById,
};
