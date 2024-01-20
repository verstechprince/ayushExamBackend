const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  hours: Number,
  minutes: Number,
  seconds: Number,
});

const TimeModel = mongoose.model("Time", timeSchema);

module.exports = TimeModel;
