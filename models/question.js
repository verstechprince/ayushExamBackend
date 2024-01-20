const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  correctAnswer: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  questionText: String,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
