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

const addDevice = async (req, res) => {
  try {
    const { user_id, token } = req.body;
    const userAgent = req.headers["user-agent"];
    const result = detector.detect(userAgent);
    const { device, os, client } = result;

    const newDevice = await pool.query(
      `INSERT INTO "device_tokens" (user_id, device, os, client, token) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, device, os, client, token]
    );
    res.status(201).json(newDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDevices = async (_, res) => {
  try {
    const device_tokens = await pool.query(`SELECT * FROM device_tokens`);
    return res.status(200).json(device_tokens.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const device_token = await pool.query(
      `SELECT * FROM device_tokens WHERE id = $1`,
      [id]
    );

    if (device_token.rows.length === 0) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json(device_token.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, device, os, client, token } = req.body;

    const Newdevice_token = await pool.query(
      `UPDATE "device_tokens" SET
        user_id = $1,
        device = $2,
        os = $3,
        client = $4,
        token = $5
       WHERE id = $6
       RETURNING *`,
      [user_id, device, os, client, token, id]
    );

    res.status(200).json(Newdevice_token.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM device_token WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Device not found" });
    }

    return res.status(200).json({
      message: "Device deleted successfully",
      deletedDevice: result.rows[0],
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDevice,
  getAllDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
};
