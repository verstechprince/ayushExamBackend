const mongoose = require("mongoose");

const quetimeSchema = new mongoose.Schema({
  innerHours: Number,
  innerMinutes: Number,
  innerSeconds: Number,
});

const queTimeModel = mongoose.model("QTime", quetimeSchema);
//ye model dekh ok
module.exports = queTimeModel;