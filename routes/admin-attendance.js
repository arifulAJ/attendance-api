const route = require("express").Router();
const {
  getDisable,
  getEnable,
  getStatus,
} = require("../controller/admin-attendance");

route.get("/enable", getEnable);
route.get("/disable", getDisable);
route.get("/status", getStatus);   

module.exports = route;
