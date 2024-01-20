const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  correctAnswers: { type: Number, required: true },
  attempted: { type: Number, required: true },
  skipped: { type: Number, required: true },
  questionsLength: { type: Number, required: true },
  marksPerQuestion: { type: Number, required: true },
  examStartTime: { type: Date, required: true },
  timeTaken: { type: String, required: true },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
