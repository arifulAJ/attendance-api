const mongoose = require("mongoose");
function connectionDB(connectionSti) {
  return mongoose.connect(connectionSti);
}

module.exports = connectionDB;
