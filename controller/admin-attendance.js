const adminAttendance = require("../models/AdminAttendence");
const { addMinutes, isAfter } = require("date-fns");
const error = require("../utils/error");

const getEnable = async (req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw error("already running ", 400);
    }
    const attendance = new adminAttendance();
    await attendance.save();
    return res.status(201).json({ message: "success", attendance });
  } catch (e) {
    next(e);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("not running ", 400);
    }
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};
const getDisable = async (req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("not running ", 400);
    }
    running.status = "COMPLETED";
    await running.save();
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getDisable,
  getEnable,
  getStatus,
};
