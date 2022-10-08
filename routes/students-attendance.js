const route = require("express").Router();
const {
  getAttendance,
  getAttendanceStatus,
} = require("../controller/student-attendance");

route.get("/status", getAttendanceStatus);
route.get("/:id", getAttendance);

module.exports = route;
